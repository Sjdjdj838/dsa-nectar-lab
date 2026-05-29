import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Code2, ArrowLeft } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search.mode as "signin" | "signup" | undefined) ?? "signin",
  }),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(128),
});
const signinSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Required").max(128),
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">(mode);
  const [busy, setBusy] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // Form state
  const [su, setSu] = useState({ fullName: "", email: "", password: "" });
  const [si, setSi] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse(su);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Account created — welcome!");
    navigate({ to: "/dashboard" });
  };

  const onSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signinSchema.safeParse(si);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    navigate({ to: "/dashboard" });
  };

  const onGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (result.error) { toast.error("Google sign-in failed"); setBusy(false); return; }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  };

  const onForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!z.string().email().safeParse(forgotEmail).success) { toast.error("Invalid email"); return; }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Check your email for a reset link");
    setShowForgot(false);
  };

  return (
    <div className="hero-grid min-h-screen">
      <div className="container mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-6 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">AlgoForge</span>
          </div>
          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardContent className="p-6">
              {showForgot ? (
                <form onSubmit={onForgot} className="space-y-4">
                  <h2 className="text-xl font-semibold">Reset password</h2>
                  <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
                  <div>
                    <Label htmlFor="fe">Email</Label>
                    <Input id="fe" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={busy}>{busy ? "Sending..." : "Send reset link"}</Button>
                  <button type="button" onClick={() => setShowForgot(false)} className="block w-full text-center text-sm text-muted-foreground hover:text-foreground">Back to sign in</button>
                </form>
              ) : (
                <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign in</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="mt-6 space-y-4">
                    <form onSubmit={onSignin} className="space-y-4">
                      <div>
                        <Label htmlFor="ie">Email</Label>
                        <Input id="ie" type="email" autoComplete="email" value={si.email} onChange={(e) => setSi({ ...si, email: e.target.value })} required />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ip">Password</Label>
                          <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>
                        </div>
                        <Input id="ip" type="password" autoComplete="current-password" value={si.password} onChange={(e) => setSi({ ...si, password: e.target.value })} required />
                      </div>
                      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</Button>
                    </form>
                    <OAuthBlock onGoogle={onGoogle} busy={busy} />
                  </TabsContent>

                  <TabsContent value="signup" className="mt-6 space-y-4">
                    <form onSubmit={onSignup} className="space-y-4">
                      <div>
                        <Label htmlFor="un">Full name</Label>
                        <Input id="un" autoComplete="name" value={su.fullName} onChange={(e) => setSu({ ...su, fullName: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="ue">Email</Label>
                        <Input id="ue" type="email" autoComplete="email" value={su.email} onChange={(e) => setSu({ ...su, email: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="up">Password</Label>
                        <Input id="up" type="password" autoComplete="new-password" value={su.password} onChange={(e) => setSu({ ...su, password: e.target.value })} required />
                        <p className="mt-1 text-xs text-muted-foreground">Minimum 8 characters.</p>
                      </div>
                      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Creating..." : "Create account"}</Button>
                    </form>
                    <OAuthBlock onGoogle={onGoogle} busy={busy} />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function OAuthBlock({ onGoogle, busy }: { onGoogle: () => void; busy: boolean }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={onGoogle} disabled={busy}>
        <GoogleIcon /> Continue with Google
      </Button>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
