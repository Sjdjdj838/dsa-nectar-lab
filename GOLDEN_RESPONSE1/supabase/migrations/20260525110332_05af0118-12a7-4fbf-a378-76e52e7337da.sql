
-- 1. Notes: add explicit SELECT policy scoped to authenticated owners
DROP POLICY IF EXISTS "Users manage own notes" ON public.notes;
CREATE POLICY "Users select own notes" ON public.notes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own notes" ON public.notes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own notes" ON public.notes
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own notes" ON public.notes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 2. Contact requests: validation + length limits to prevent abuse
ALTER TABLE public.contact_requests
  ADD CONSTRAINT contact_requests_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_requests_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_requests_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT contact_requests_subject_len CHECK (char_length(subject) BETWEEN 1 AND 200),
  ADD CONSTRAINT contact_requests_message_len CHECK (char_length(message) BETWEEN 1 AND 5000),
  ADD CONSTRAINT contact_requests_phone_len CHECK (phone IS NULL OR char_length(phone) BETWEEN 3 AND 30);

-- 3. Problems: move test_cases into a restricted admin-only table
CREATE TABLE IF NOT EXISTS public.problem_test_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  test_cases jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (problem_id)
);
ALTER TABLE public.problem_test_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage test cases" ON public.problem_test_cases
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

INSERT INTO public.problem_test_cases (problem_id, test_cases)
SELECT id, COALESCE(test_cases, '[]'::jsonb) FROM public.problems
WHERE test_cases IS NOT NULL AND test_cases <> '[]'::jsonb
ON CONFLICT (problem_id) DO NOTHING;

ALTER TABLE public.problems DROP COLUMN IF EXISTS test_cases;

-- 4. user_achievements: remove self-insert, grant only via SECURITY DEFINER
DROP POLICY IF EXISTS "Users insert own achievements" ON public.user_achievements;

CREATE OR REPLACE FUNCTION public.grant_achievement(_achievement_slug text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _aid uuid;
  _xp int;
  _existing uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  SELECT id, xp_reward INTO _aid, _xp FROM public.achievements WHERE slug = _achievement_slug;
  IF _aid IS NULL THEN
    RAISE EXCEPTION 'Unknown achievement';
  END IF;
  SELECT id INTO _existing FROM public.user_achievements WHERE user_id = _uid AND achievement_id = _aid;
  IF _existing IS NOT NULL THEN
    RETURN _existing;
  END IF;
  -- TODO: validate unlock conditions per achievement here
  INSERT INTO public.user_achievements (user_id, achievement_id) VALUES (_uid, _aid)
  RETURNING id INTO _existing;
  UPDATE public.profiles SET xp = xp + COALESCE(_xp, 0) WHERE id = _uid;
  RETURN _existing;
END;
$$;

REVOKE ALL ON FUNCTION public.grant_achievement(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.grant_achievement(text) TO authenticated;
