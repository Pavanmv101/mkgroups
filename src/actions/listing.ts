"use server";

import { createClient } from "@/lib/supabase.server";
import { revalidatePath } from "next/cache";

export async function addListing(formData: FormData) {
  const supabase = await createClient();
  
  const listingData = {
    title: formData.get("title"),
    location: formData.get("location"),
    size: formData.get("size"),
    price: formData.get("price"),
    zoning_type: formData.get("zoning_type"),
    description: formData.get("description"),
    status: formData.get("status") || "Available"
  };

  const { error } = await supabase.from("listings").insert([listingData]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/listings");
}

export async function getListings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
