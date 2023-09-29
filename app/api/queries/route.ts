
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { DecryptedDatabaseConnection } from "@/types";
import { Client } from "pg";
import { Connection, createConnection } from 'mysql2/promise';
import { ConnectionPool } from 'mssql';
import { getRecord, updateRecord } from "@/lib/supabase-admin";
import { table } from "console";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
      const body = await req.json();
      const { propertyValue, query, connectionId } = body;
      const database: DecryptedDatabaseConnection = await getRecord('decrypted_databases', connectionId);
      const updatedQuery = query.replace(/{{.*?}}/g, propertyValue);


      let result;
      switch(database.type) {  // Assuming your database object has a 'type' field to distinguish db types
          case "PostgreSQL":
              result = await runPostgresQuery(database, updatedQuery);
              break;
          case "MySQL":
              result = await runMySQLQuery(updatedQuery, query);
              break;
          case "SQL Server":
              result = await runSQLServerQuery(updatedQuery, query);
              break;
          default:
              return new NextResponse("Unsupported database type", { status: 400 });
      }
      console.log(result)
      if(result.success) {
          return NextResponse.json(result.data, { status: 200 });
      } else {
          return new NextResponse(result.message, { status: 500 });
      }


  } catch (error) {
      return new NextResponse("Internal error", { status: 500 });
  }
}


async function runPostgresQuery(database: DecryptedDatabaseConnection, sqlQuery: string): Promise<{ success: boolean, message: string, data?: any }> {
  const config = {
    host: database.host || undefined,
    port: database.port || undefined,
    user: database.username || undefined, // Remember to change 'username' to 'user'
    password: database.decrypted_password || undefined,
    database: database.database_name || undefined
  };
  const client = new Client(config);
  try {
    await client.connect();
    const res = await client.query(sqlQuery);
    return { success: true, message: 'Query executed successfully!', data: res.rows };
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


async function runMySQLQuery(database: DecryptedDatabaseConnection, sqlQuery: string): Promise<{ success: boolean, message: string, data?: any }> {
  let connection: Connection | null = null;
  try {
      connection = await createConnection({
          host: database.host!,
          port: database.port!,
          user: database.username!,
          password: database.decrypted_password!,
          database: database.database_name!,
      });

      const [rows, fields] = await connection.execute(sqlQuery);
      return { success: true, message: 'Query executed successfully!', data: rows };
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



async function runSQLServerQuery(database: DecryptedDatabaseConnection, sqlQuery: string): Promise<{ success: boolean, message: string, data?: any }> {
  let pool: ConnectionPool | null = null;
  const config = {
      server: database.host!,
      port: Number(database.port!),
      user: database.username!,
      password: database.decrypted_password!,
      database: database.database_name!,
      options: {
          encrypt: true // Use this if you're on Windows Azure
      }
  };

  try {
      pool = new ConnectionPool(config);
      await pool.connect();
      const result = await pool.request().query(sqlQuery);
      return { success: true, message: 'Query executed successfully!', data: result.recordset };
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


