import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { difficultyClass } from "@/lib/difficulty";
import { Search, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/problems/")({ component: Problems });

function Problems() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const { data: problems, isLoading } = useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      const { data } = await supabase.from("problems").select("*").order("created_at");
      return data ?? [];
    },
  });

  const { data: solved } = useQuery({
    queryKey: ["my-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_problem_progress")
        .select("problem_id, status")
        .eq("user_id", user!.id);
      return new Map((data ?? []).map((r) => [r.problem_id, r.status]));
    },
  });

  const filtered = useMemo(() => {
    return (problems ?? []).filter((p) => {
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (status !== "all" && solved) {
        const s = solved.get(p.id) ?? "not_attempted";
        if (status === "solved" && s !== "solved") return false;
        if (status === "todo" && s === "solved") return false;
      }
      return true;
    });
  }, [problems, q, diff, status, solved]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Practice problems</h1>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} problems available</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search problems..." className="pl-9" />
          </div>
          <Select value={diff} onValueChange={setDiff}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="todo">To-do</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="w-12 px-4 py-3"></th>
                <th className="px-4 py-3">Title</th>
                <th className="hidden px-4 py-3 md:table-cell">Tags</th>
                <th className="px-4 py-3">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-t border-border/60"><td colSpan={4} className="p-3"><Skeleton className="h-8" /></td></tr>
                  ))
                : filtered.map((p) => {
                    const st = solved?.get(p.id);
                    return (
                      <tr key={p.id} className="border-t border-border/60 transition-colors hover:bg-muted/40">
                        <td className="px-4 py-3">
                          {st === "solved" ? <CheckCircle2 className="h-4 w-4 text-success" /> : <span className="block h-4 w-4 rounded-full border border-border" />}
                        </td>
                        <td className="px-4 py-3">
                          <Link to="/problems/$slug" params={{ slug: p.slug }} className="font-medium hover:text-primary">{p.title}</Link>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {(p.tags ?? []).slice(0, 3).map((t: string) => (
                              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={difficultyClass(p.difficulty)}>{p.difficulty}</Badge>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">No problems match your filters.</div>
          )}
        </div>

        {!user && (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
            <Link to="/auth" className="font-medium text-primary hover:underline">Sign in</Link>
            <span className="text-muted-foreground"> to track your progress and save your code.</span>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
