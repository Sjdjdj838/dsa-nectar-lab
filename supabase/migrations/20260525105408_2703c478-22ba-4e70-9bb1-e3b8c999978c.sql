
-- Pin search_path for set_updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Revoke direct execute from anon/authenticated for sensitive funcs (triggers still work)
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon, public;
-- has_role still needs to be callable by authenticated users for RLS policies (RLS bypasses EXECUTE check via security definer, but be safe)
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO authenticated;
