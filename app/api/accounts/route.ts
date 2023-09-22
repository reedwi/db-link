import { NextResponse } from "next/server";

import supabase from "@/lib/supabase";

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    const headers = req.headers
    const clerkUser = body.data;

    const { data, error: supabaseError } = await supabase.from('accounts').insert([{
      clerk_id: clerkUser.id,
      email: clerkUser.email_addresses[0].email_address,
      first_name: clerkUser.first_name,
      last_name:clerkUser.last_name
    }]);

    if (supabaseError) {
      new NextResponse("Internal error", { status: 500 });
      throw supabaseError;
    } 
    console.log(`[ACCOUNTS_POST] New account created and inserted for ${clerkUser.id}.`);
    return new NextResponse("Successfully created account", { status: 201 });
    
  } catch (error) {
    console.log('[ACCOUNTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}