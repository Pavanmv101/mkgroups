-- Create listings table
CREATE TABLE public.listings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  size text NOT NULL,
  price numeric NOT NULL,
  zoning_type text NOT NULL CHECK (zoning_type IN ('Agricultural', 'Residential')),
  description text NOT NULL,
  status text NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Booked')),
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create site_visits table
CREATE TABLE public.site_visits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id uuid REFERENCES public.listings(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  preferred_date timestamp with time zone NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Confirmed', 'Cancelled')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Listings Policies
-- Public can read listings
CREATE POLICY "Public listings are viewable by everyone" ON public.listings FOR SELECT USING (true);
-- Only authenticated users (admins) can insert/update/delete listings
CREATE POLICY "Admins can insert listings" ON public.listings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update listings" ON public.listings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete listings" ON public.listings FOR DELETE TO authenticated USING (true);

-- Site Visits Policies
-- Public can insert site visit requests
CREATE POLICY "Public can request site visits" ON public.site_visits FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can request site visits (anon)" ON public.site_visits FOR INSERT TO anon WITH CHECK (true);
-- Only authenticated users (admins) can read/update/delete site visits
CREATE POLICY "Admins can view site visits" ON public.site_visits FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update site visits" ON public.site_visits FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete site visits" ON public.site_visits FOR DELETE TO authenticated USING (true);
