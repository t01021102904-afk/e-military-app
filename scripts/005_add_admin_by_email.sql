-- Make t01021102904@gmail.com an admin
-- Run this after you successfully log in with Google

-- First, find your user ID from auth.users
DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get the user ID for the email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 't01021102904@gmail.com';

  -- If user exists, make them an admin
  IF target_user_id IS NOT NULL THEN
    -- Insert into admin_users if not already there
    INSERT INTO admin_users (id)
    VALUES (target_user_id)
    ON CONFLICT (id) DO NOTHING;
    
    RAISE NOTICE 'Successfully made % an admin!', 't01021102904@gmail.com';
  ELSE
    RAISE NOTICE 'User % not found. Please log in with Google first.', 't01021102904@gmail.com';
  END IF;
END $$;
