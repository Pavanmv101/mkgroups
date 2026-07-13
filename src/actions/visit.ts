"use server";

import { createClient } from "@/lib/supabase.server";
import { revalidatePath } from "next/cache";

export async function submitSiteVisit(formData: FormData) {
  const supabase = await createClient();
  
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

  return { success: true };
}

export async function getSiteVisits() {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { error } = await supabase.from("site_visits").update({ status }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/admin");
}
