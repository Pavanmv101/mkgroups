import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'mkagrilandprojects@gmail.com';

    // Verify current password
    const { data: adminUser, error: fetchError } = await supabaseAdmin
      .from('admin_credentials')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (fetchError || !adminUser) {
      return NextResponse.json({ error: 'Admin account not found' }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, adminUser.password_hash);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
    }

    // Hash the new password and update
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const { error: updateError } = await supabaseAdmin
      .from('admin_credentials')
      .update({ password_hash: newPasswordHash, updated_at: new Date().toISOString() })
      .eq('email', adminEmail);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Password update error:', err);
    return NextResponse.json({ error: 'Server error while updating password' }, { status: 500 });
  }
}
