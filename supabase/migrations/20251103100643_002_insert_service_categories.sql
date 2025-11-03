/*
  # Insert Initial Service Categories

  1. Data
    - Insert 11 predefined service categories as per PRD
    - Categories: Plumber, Electrician, Carpenter, Teacher, Driver, Cook, etc.

  2. Purpose
    - Provide default categories for service providers
    - Enable category-based filtering for customers
*/

INSERT INTO service_categories (name, description, icon_name) VALUES
  ('Plumbing', 'Plumbing repairs, pipe installation, and water system maintenance', 'pipe'),
  ('Electrical', 'Electrical repairs, installation, and maintenance services', 'zap'),
  ('Carpentry', 'Carpentry work, furniture repair, and woodwork services', 'hammer'),
  ('Teaching', 'Private tuition and educational services', 'book-open'),
  ('Driving', 'Professional driving services for various needs', 'navigation'),
  ('Cooking', 'Catering and professional cooking services', 'chef-hat'),
  ('Cleaning', 'Home and office cleaning services', 'sparkles'),
  ('Painting', 'Interior and exterior painting services', 'palette'),
  ('AC Repair', 'Air conditioning repair and maintenance', 'wind'),
  ('Mobile Repair', 'Phone and mobile device repair services', 'smartphone'),
  ('Home Appliance Repair', 'Repair services for home appliances', 'wrench')
ON CONFLICT DO NOTHING;