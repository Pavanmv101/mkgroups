-- Insert dummy listings for testing
INSERT INTO public.listings (title, location, size, price, zoning_type, description, status, image_url)
VALUES 
  ('10 Acres Prime Agricultural Land', 'North Valley', '10 Acres', 500000, 'Agricultural', 'Fertile land suitable for various crops. Includes a functioning well and electricity access. Clear title and boundary markings completed.', 'Available', '/hero-bg.jpg'),
  ('Residential Plot in Gated Community', 'Westside Hills', '2400 sq ft', 120000, 'Residential', 'Clear title residential plot ready for construction. Amenities include paved roads and street lighting.', 'Available', '/hero-bg.jpg'),
  ('5 Guntas Farm Plot', 'East Riverside', '5 Guntas', 85000, 'Agricultural', 'Perfect for a weekend farmhouse. Adjacent to a perennial river stream.', 'Booked', '/hero-bg.jpg');
