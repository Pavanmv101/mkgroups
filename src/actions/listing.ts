"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function addListing(formData: FormData) {
  const supabase = supabaseAdmin;
  
  const listingData = {
    title: formData.get("title"),
    location: formData.get("location"),
    size: formData.get("size"),
    price: formData.get("price"),
    zoning_type: formData.get("zoning_type"),
    description: formData.get("description"),
    status: formData.get("status") || "Available",
    image_url: formData.get("image_url") || null,
    image_urls: formData.get("image_urls") ? JSON.parse(formData.get("image_urls") as string) : [],
  };

  const { error } = await supabase.from("listings").insert([listingData]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/listings");
}

export async function updateListing(id: string, formData: FormData) {
  const supabase = supabaseAdmin;
  
  const listingData = {
    title: formData.get("title"),
    location: formData.get("location"),
    size: formData.get("size"),
    price: formData.get("price"),
    zoning_type: formData.get("zoning_type"),
    description: formData.get("description"),
    status: formData.get("status"),
    ...(formData.get("image_url") ? { image_url: formData.get("image_url") } : {}),
    ...(formData.get("image_urls") ? { image_urls: JSON.parse(formData.get("image_urls") as string) } : {})
  };

  const { error } = await supabase.from("listings").update(listingData).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/listings");
  revalidatePath(`/listings/${id}`);
}

export async function deleteListing(id: string) {
  const supabase = supabaseAdmin;
  const { error } = await supabase.from("listings").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/listings");
}

export async function getListings() {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getListingById(id: string) {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
