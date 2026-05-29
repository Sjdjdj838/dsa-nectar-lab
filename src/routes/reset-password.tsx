import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/reset-password")({ component: ResetPassword });

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!z.string().min(8).safeParse(password).success) { toast.error("Min 8 characters"); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="hero-grid min-h-screen">
      <div className="container mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
        <Card className="border-border/60 bg-card/70 backdrop-blur">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Choose a new password</h1>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="np">New password</Label>
                <Input id="np" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "Updating..." : "Update password"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
