'use server';

import { createAdminSession, destroyAdminSession } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Admin credentials not configured');
  }

  if (email !== adminEmail || password !== adminPassword) {
    throw new Error('Invalid email or password');
  }

  await createAdminSession();
  redirect('/admin');
}

export async function adminLogout() {
  await destroyAdminSession();
  redirect('/admin/login');
}
