-- Strengthen donations table RLS policies
-- This ensures donations can only be added through Stripe webhook, never deleted or modified

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view donations" ON donations;
DROP POLICY IF EXISTS "Service role can insert donations" ON donations;

-- Public can only view donation totals (SELECT only)
CREATE POLICY "Public can view donations"
  ON donations FOR SELECT
  TO public, anon, authenticated
  USING (true);

-- Only service role can insert donations (webhook only)
-- No UPDATE or DELETE allowed by anyone
CREATE POLICY "Service role only can insert donations"
  ON donations FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Explicitly deny all UPDATE operations
CREATE POLICY "No one can update donations"
  ON donations FOR UPDATE
  TO public, anon, authenticated, service_role
  USING (false);

-- Explicitly deny all DELETE operations  
CREATE POLICY "No one can delete donations"
  ON donations FOR DELETE
  TO public, anon, authenticated, service_role
  USING (false);

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE tablename = 'donations'
ORDER BY policyname;
