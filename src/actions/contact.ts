"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(formData: FormData) {
  const supabase = supabaseAdmin;
  
  const messageData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const { error } = await supabase.from("contact_messages").insert([messageData]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function updateMessageStatus(id: string, status: string) {
  const supabase = supabaseAdmin;
  const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function getContactMessages() {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
