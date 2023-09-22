import supabase from "@/lib/supabase";

export const getHubspotPortalId = async (userId: string) => {
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
}