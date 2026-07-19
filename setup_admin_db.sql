CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: The password_hash below is for "mkgroup2024!" (hashed with bcrypt)
INSERT INTO public.admin_credentials (email, password_hash)
VALUES (
  'mkagrilandprojects@gmail.com',
  '$2a$10$tZ2EOM36NRY1wW140b/Hce1vC24X2zFhYd.aE8pM3P4aM6G2vE2QO'
) ON CONFLICT (email) DO NOTHING;

-- Set up Row Level Security (RLS) to prevent unauthorized access
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

-- Allow only the service role to read/write this table
CREATE POLICY "Allow service role full access to admin_credentials" 
ON public.admin_credentials 
TO service_role 
USING (true) 
WITH CHECK (true);
