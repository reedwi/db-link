
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { DatabaseConnection } from "@/types/supabase";
import { Client } from "pg";
import { Connection, createConnection } from 'mysql2/promise';
import { ConnectionPool } from 'mssql';
import { updateRecord } from "@/lib/supabase-admin";
import { table } from "console";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
      const body = await req.json();
      const databaseConnection: DatabaseConnection = body.database;

      const connectionHandlers: Record<string, (db: DatabaseConnection) => Promise<{ success: boolean, message: string }>> = {
          'PostgreSQL': testPostgresConnection,
          'SQL Server': testSQLServerConnection,
          'MySQL': testMySQLConnection
      };

      const testFunction = connectionHandlers[databaseConnection.type!];

      if (!testFunction) {
          return new NextResponse("Unsupported database type", { status: 400 });
      }

      const connectionResult = await testFunction(databaseConnection);
    
      if (!connectionResult.success) {
        updateRecord('databases', databaseConnection.id, { 'connection_status': 'invalid', 'connection_message': connectionResult.message})
        return NextResponse.json(connectionResult, { status: 400 });
      }

      updateRecord('databases', databaseConnection.id, { 'connection_status': 'valid', 'connection_message': null})
      return NextResponse.json(connectionResult, { status: 204 });

  } catch (error) {
      return new NextResponse("Internal error", { status: 500 });
  }
}


async function testPostgresConnection(database: DatabaseConnection): Promise<{ success: boolean, message: string }> {
  const config = {
    host: database.host || undefined,
    port: database.port || undefined,
    user: database.username || undefined, // Remember to change 'username' to 'user'
    password: database.password || undefined,
    database: database.database_name || undefined
  };
  const client = new Client(config);
  try {
      await client.connect();
      return { success: true, message: 'Connected successfully!' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
        // Handle or return a generic error message if the caught object is not an instance of Error
        return { success: false, message: "An unexpected error occurred." };
    }
  } finally {
      await client.end();
  }
}


async function testMySQLConnection(database: DatabaseConnection) {
    let connection: Connection | null = null;
    try {
        connection = await createConnection({
            host: database.host!,
            port: database.port!,
            user: database.username!,
            password: database.password!,
            database: database.database_name!,
        });

        await connection.ping();

        return { success: true, message: 'Connected successfully!' };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: "An unexpected error occurred." };
        }
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}



async function testSQLServerConnection(database: DatabaseConnection): Promise<{ success: boolean, message: string }> {
    let pool: ConnectionPool | null = null;
    const config = {
        server: database.host!,
        port: Number(database.port!),
        user: database.username!,
        password: database.password!,
        database: database.database_name!,
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    try {
        pool = new ConnectionPool(config);
        await pool.connect();

        return { success: true, message: 'Connected successfully!' };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: "An unexpected error occurred." };
        }
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}


