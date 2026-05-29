import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Trophy, Flame, Clock, Target, CheckCircle2, ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar,
} from "recharts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["dash-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: solved } = await supabase
        .from("user_problem_progress")
        .select("status, solved_at, problems(difficulty)")
        .eq("user_id", user!.id);
      const { count: topicsCompleted } = await supabase
        .from("user_topic_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("completed", true);
      return { solved: solved ?? [], topicsCompleted: topicsCompleted ?? 0 };
    },
  });

  const stats = useMemo(() => {
    const items = progress?.solved ?? [];
    const solved = items.filter((i) => i.status === "solved");
    const by = (d: string) => solved.filter((s: { problems: { difficulty?: string } | null }) => s.problems?.difficulty === d).length;
    return {
      total: solved.length,
      easy: by("easy"),
      medium: by("medium"),
      hard: by("hard"),
    };
  }, [progress]);

  // Weekly activity (last 7 days)
  const weekly = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      const count = (progress?.solved ?? []).filter(
        (s: { solved_at?: string | null }) => s.solved_at?.slice(0, 10) === key
      ).length;
      return { day: d.toLocaleDateString(undefined, { weekday: "short" }), solved: count };
    });
    return days;
  }, [progress]);

  const monthly = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().slice(0, 10);
      const count = (progress?.solved ?? []).filter(
        (s: { solved_at?: string | null }) => s.solved_at?.slice(0, 10) === key
      ).length;
      return { day: `${d.getMonth() + 1}/${d.getDate()}`, solved: count };
    });
  }, [progress]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto space-y-4 px-4 py-10">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  const cards = [
    { i: Target, l: "Solved", v: stats.total, c: "text-primary" },
    { i: CheckCircle2, l: "Easy", v: stats.easy, c: "text-success" },
    { i: CheckCircle2, l: "Medium", v: stats.medium, c: "text-warning" },
    { i: CheckCircle2, l: "Hard", v: stats.hard, c: "text-destructive" },
    { i: Flame, l: "Streak", v: profile?.current_streak ?? 0, c: "text-orange-500" },
    { i: Clock, l: "Hours", v: Math.round(stats.total * 0.5), c: "text-chart-5" },
    { i: Trophy, l: "Topics done", v: progress?.topicsCompleted ?? 0, c: "text-chart-3" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} 👋
          </h1>
          <p className="mt-2 text-muted-foreground">Here's your DSA progress at a glance.</p>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {cards.map((c, i) => (
            <motion.div key={c.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="border-border/60">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{c.l}</span>
                    <c.i className={`h-4 w-4 ${c.c}`} />
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{c.v}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card className="border-border/60 lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold">Weekly activity</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekly}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="solved" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold">Goals</h3>
              <div className="mt-5 space-y-5">
                <Goal label="Daily target" value={Math.min(weekly[6].solved, 3)} max={3} />
                <Goal label="Weekly target" value={weekly.reduce((a, b) => a + b.solved, 0)} max={15} />
                <Goal label="Monthly target" value={monthly.reduce((a, b) => a + b.solved, 0)} max={60} />
              </div>
              <Button asChild className="mt-6 w-full" variant="outline">
                <Link to="/problems">Solve a problem <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 border-border/60">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold">Last 30 days</h3>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={10} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="solved" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function Goal({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}/{max}</span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
