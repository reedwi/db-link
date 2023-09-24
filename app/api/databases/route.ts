import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createDatabaseConnection, getAllRecords } from "@/lib/supabase-admin";


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { username, password, host, port, type, database_name, name, hubspot_portal_id } = body;

    if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!username) {
      return new NextResponse("Username is required", { status: 400 })
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 })
    }

    if (!host) {
      return new NextResponse("Host is required", { status: 400 })
    }

    if (!port) {
      return new NextResponse("Port is required", { status: 400 })
    }

    if (!type) {
      return new NextResponse("Database type is required", { status: 400 })
    }

    const dbData = {
      username,
      password,
      port,
      host,
      type,
      database_name,
      name,
      hubspot_portal_id: hubspot_portal_id,
    }

    const dbConnectionId = await createDatabaseConnection(dbData);
    return NextResponse.json({id: dbConnectionId});
  } catch (error) {
    console.log('[DATABASES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  { params }: { params: { portalId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbRecords = getAllRecords('databases', params.portalId)
    return NextResponse.json(dbRecords);
  } catch (error) {
    console.log('[DATABASES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}