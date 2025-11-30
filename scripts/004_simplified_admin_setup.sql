-- Simplified Admin Setup
-- This script checks if there are any admin users, and if not, makes the first registered user an admin

DO $$
DECLARE
  first_user_id UUID;
  admin_count INT;
BEGIN
  -- Check if there are any admins
  SELECT COUNT(*) INTO admin_count FROM admin_users;
  
  -- If no admins exist, make the first user an admin
  IF admin_count = 0 THEN
    SELECT id INTO first_user_id 
    FROM auth.users 
    ORDER BY created_at ASC 
    LIMIT 1;
    
    IF first_user_id IS NOT NULL THEN
      INSERT INTO admin_users (id, created_at)
      VALUES (first_user_id, NOW())
      ON CONFLICT (id) DO NOTHING;
      
      RAISE NOTICE 'First user (%) has been made an admin', first_user_id;
    ELSE
      RAISE NOTICE 'No users found in the system yet';
    END IF;
  ELSE
    RAISE NOTICE 'Admin users already exist (%). Skipping auto-admin creation.', admin_count;
  END IF;
END $$;
