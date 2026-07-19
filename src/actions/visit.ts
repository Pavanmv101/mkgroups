"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { sendVisitRequestEmail, sendVisitConfirmationEmail } from "@/lib/email";

export async function submitSiteVisit(formData: FormData) {
  const supabase = supabaseAdmin;
  
  const visitData = {
    listing_id: formData.get("listing_id"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    preferred_date: formData.get("preferred_date"),
    notes: formData.get("notes")
  };

  const { error } = await supabase.from("site_visits").insert([visitData]);

  if (error) {
    return { error: error.message };
  }
  
  try {
    // Attempt to fetch the listing title for the email
    const { data: listingData } = await supabase.from("listings").select("title").eq("id", visitData.listing_id).single();
    
    if (visitData.email && listingData?.title) {
      await sendVisitRequestEmail(
        visitData.email as string, 
        visitData.name as string, 
        listingData.title, 
        (visitData.preferred_date as string) || "Not specified"
      );
    }
  } catch (err) {
    console.error("Failed to send initial request email:", err);
  }

  return { success: true };
}

export async function getSiteVisits() {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.from("site_visits").select(`
    *,
    listings ( title )
  `).order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateVisitStatus(id: string, status: string) {
  const supabase = supabaseAdmin;
  const { error } = await supabase.from("site_visits").update({ status }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  
  if (status === "Confirmed") {
    try {
      // Fetch visit and listing info to send email
      const { data: visitInfo } = await supabase.from("site_visits").select(`
        email, name, listings ( title )
      `).eq("id", id).single();
      
      if (visitInfo?.email && visitInfo?.listings?.title) {
        await sendVisitConfirmationEmail(visitInfo.email, visitInfo.name, visitInfo.listings.title);
      }
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
    }
  }
  
  revalidatePath("/admin");
}
