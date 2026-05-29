import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pin, PinOff, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/notes")({ component: Notes });

function Notes() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState({ title: "", content: "" });

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("notes").select("*").eq("user_id", user!.id).order("pinned", { ascending: false }).order("updated_at", { ascending: false });
      return data ?? [];
    },
  });

  const add = async () => {
    if (!draft.title.trim()) { toast.error("Title required"); return; }
    const { error } = await supabase.from("notes").insert({ user_id: user!.id, title: draft.title, content: draft.content });
    if (error) { toast.error(error.message); return; }
    setDraft({ title: "", content: "" });
    qc.invalidateQueries({ queryKey: ["notes", user?.id] });
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await supabase.from("notes").update({ pinned: !pinned }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["notes", user?.id] });
  };

  const remove = async (id: string) => {
    await supabase.from("notes").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["notes", user?.id] });
  };

  const filtered = (notes ?? []).filter((n) =>
    !q || n.title.toLowerCase().includes(q.toLowerCase()) || (n.content ?? "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My notes</h1>
        <p className="mt-2 text-sm text-muted-foreground">Capture quick takeaways, patterns, and reminders.</p>

        <Card className="mt-6 border-border/60">
          <CardContent className="space-y-3 p-5">
            <Input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            <Textarea placeholder="Write your note..." rows={4} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
            <Button onClick={add}><Plus className="mr-1.5 h-4 w-4" /> Add note</Button>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Input placeholder="Search notes..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="mt-4 space-y-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)
            : filtered.map((n) => (
                <Card key={n.id} className="border-border/60">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{n.title}</h3>
                        {n.content && <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{n.content}</p>}
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <Button size="icon" variant="ghost" onClick={() => togglePin(n.id, n.pinned)}>
                          {n.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => remove(n.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          {!isLoading && filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No notes yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
