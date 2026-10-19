-- Pirates of Grill Demo Seed Fixtures (Milestone 1)

INSERT INTO locations (id, name, address, timezone, currency, is_active)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Pirates of Grill - Connaught Place', 'Outer Circle, Connaught Place, New Delhi', 'Asia/Kolkata', 'INR', true),
  ('22222222-2222-2222-2222-222222222222', 'Pirates of Grill - Cyber Hub', 'DLF Cyber Hub, Phase 2, Gurugram', 'Asia/Kolkata', 'INR', true);

INSERT INTO restaurant_tables (location_id, table_number, capacity, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', 1, 4, 'available'),
  ('11111111-1111-1111-1111-111111111111', 2, 6, 'available'),
  ('11111111-1111-1111-1111-111111111111', 3, 2, 'available'),
  ('11111111-1111-1111-1111-111111111111', 4, 8, 'reserved'),
  ('22222222-2222-2222-2222-222222222222', 1, 4, 'available'),
  ('22222222-2222-2222-2222-222222222222', 2, 6, 'occupied');

INSERT INTO menu_items (location_id, name, description, category, price_minor, is_vegetarian, is_available)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Captain Barbecue Chicken Skewers', 'Smoky marinated grilled chicken skewers with pirate spices', 'grills', 69900, false, true),
  ('11111111-1111-1111-1111-111111111111', 'Blackbeard Butter Garlic Prawns', 'Jumbo prawns tossed in rich garlic butter and herbs', 'starters', 89900, false, true),
  ('11111111-1111-1111-1111-111111111111', 'Treasure Chest Paneer Tikka', 'Cottage cheese cubes charred with bell peppers and spices', 'starters', 54900, true, true),
  ('11111111-1111-1111-1111-111111111111', 'Buccaneer Biryani Special', 'Aromatic basmati rice cooked with tender meat and royal spices', 'mains', 74900, false, true),
  ('11111111-1111-1111-1111-111111111111', 'Scurvy Sizzling Brownie', 'Warm chocolate brownie served with vanilla ice cream and hot fudge', 'desserts', 34900, true, true),
  ('11111111-1111-1111-1111-111111111111', 'Kraken Rum Mocktail', 'Exotic tropical fruit blend with spice syrup and mint', 'beverages', 29900, true, true);

INSERT INTO offers (location_id, title, description, badge_text, valid_until, is_active)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Midweek Pirate Feast', 'Flat 20% off on all endless barbecue buffets every Tuesday and Wednesday.', '20% OFF', now() + INTERVAL '30 days', true),
  ('11111111-1111-1111-1111-111111111111', 'Weekend Buccaneer Brunch', 'Complimentary signature mocktail for every table booking of 4 or more.', 'Free Mocktail', now() + INTERVAL '14 days', true);
