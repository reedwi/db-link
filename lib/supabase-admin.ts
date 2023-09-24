import supabase from "@/lib/supabase";
import { cache } from "react";

export const revalidate = 300;

export const getHubspotPortalId = cache(async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('hubspot_portal_id')
      .eq('clerk_id', userId)
      .single();

    if (error) throw error;

    return data?.hubspot_portal_id;
  } catch (error) {
    console.error("Failed to fetch hubspot_portal_id:", error);
    throw error; // This will propagate the error up to the calling function
  }
})

export const createDatabaseConnection = async (dbData: object) => {
  try {
    const { data, error } = await supabase
      .from('databases')
      .insert(dbData)
      .select()

    if (error) throw error;

    return data[0]?.id;
  } catch (error) {
    console.error("Failed to create database connection:", error);
    throw error; // This will propagate the error up to the calling function
  }
}

export const createRecord = async (table:string, recordData: object) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .insert(recordData)
      .select()

    if (error) throw error;

    return data[0]?.id;
  } catch (error) {
    console.error("Failed to create database connection:", error);
    throw error; // This will propagate the error up to the calling function
  }
}

export const deleteRecord = async (table: string, id: string) => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) throw error;

  } catch (error) {
    console.error("Failed to delete record:", error);
    throw error; // This will propagate the error up to the calling function
  }
}

export const updateRecord = async (table: string, id: string, recordData: object) => {
  try {
    const { error } = await supabase
      .from(table)
      .update(recordData)
      .eq('id', id)

    if (error) throw error;

  } catch (error) {
    console.error("Failed to update record:", error);
    throw error; // This will propagate the error up to the calling function
  }
}

export const getRecord = async (table: string, id: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Failed to get record:", error);
    throw error; // This will propagate the error up to the calling function
  }
}

export const getAllConnections = async (table: string, portalId: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('hubspot_portal_id', portalId)

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Failed to get records:", error);
    throw error; // This will propagate the error up to the calling function
  }
}

export const getAllRecords = async (table: string, portalId: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*, databases(*)')
      .eq('hubspot_portal_id', portalId)
      // .eq('databases.connection_status', 'valid')

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Failed to get records:", error);
    throw error; // This will propagate the error up to the calling function
  }
}