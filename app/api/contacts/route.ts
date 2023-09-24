import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createDatabaseConnection, createRecord, getAllRecords } from "@/lib/supabase-admin";


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, query, database_id, hubspot_property, column_map, hubspot_portal_id } = body;

    if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if (!name) {
    //   return new NextResponse("Name is required", { status: 400 })
    // }

    // if (!query) {
    //   return new NextResponse("Password is required", { status: 400 })
    // }

    // if (!database_id) {
    //   return new NextResponse("Database connection is required", { status: 400 })
    // }

    // if (!hubspot_property) {
    //   return new NextResponse("HubSpot property is required", { status: 400 })
    // }

    // if (!column_map) {
    //   return new NextResponse("Column map is required", { status: 400 })
    // }

    console.log(body)
    const recordId = await createRecord('contacts', body);
    return NextResponse.json({id: recordId});
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

    const records = getAllRecords('contacts', params.portalId)
    return NextResponse.json(records);
  } catch (error) {
    console.log('[DATABASES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}