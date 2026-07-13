"use server";

import { createClient } from "@/lib/supabase.server";
import { revalidatePath } from "next/cache";

export async function submitSiteVisit(formData: FormData) {
  const supabase = await createClient();
  
  const visitData = {
    property_id: formData.get("property_id"),
    full_name: formData.get("full_name"),
    phone_number: formData.get("phone_number"),
    email: formData.get("email"),
    preferred_date: formData.get("preferred_date"),
    message: formData.get("message")
  };

  const { error } = await supabase.from("site_visits").insert([visitData]);

  if (error) {
    throw new Error(error.message);
  }

  // Not revalidating public paths because they don't show visits
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
