import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { difficultyClass } from "@/lib/difficulty";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Lightbulb, Play, Send, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/problems/$slug")({ component: ProblemDetail });

const LANGS = ["Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go"] as const;
const STARTER: Record<string, string> = {
  Python: "def solution():\n    # Write your solution here\n    pass\n",
  JavaScript: "function solution() {\n  // Write your solution here\n}\n",
  TypeScript: "function solution(): void {\n  // Write your solution here\n}\n",
  Java: "class Solution {\n  public void solution() {\n    // Write your solution here\n  }\n}\n",
  "C++": "class Solution {\npublic:\n  void solution() {\n    // Write your solution here\n  }\n};\n",
  "C#": "public class Solution {\n  public void Solve() {\n    // Write your solution here\n  }\n}\n",
  Go: "func solution() {\n  // Write your solution here\n}\n",
};

function ProblemDetail() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const [lang, setLang] = useState<string>("Python");
  const [code, setCode] = useState<string>(STARTER.Python);

  const { data: problem, isLoading } = useQuery({
    queryKey: ["problem", slug],
    queryFn: async () => {
      const { data } = await supabase.from("problems").select("*").eq("slug", slug).maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    setCode((problem?.starter_code as Record<string, string> | null)?.[lang] ?? STARTER[lang]);
  }, [lang, problem]);

  const markSolved = async () => {
    if (!user || !problem) { toast.error("Sign in to submit"); return; }
    const { error } = await supabase.from("user_problem_progress").upsert({
      user_id: user.id,
      problem_id: problem.id,
      status: "solved",
      language: lang,
      last_code: code,
      solved_at: new Date().toISOString(),
      attempts: 1,
    }, { onConflict: "user_id,problem_id" });
    if (error) { toast.error(error.message); return; }
    toast.success("Marked as solved 🎉");
  };

  if (isLoading) {
    return (<div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto space-y-4 px-4 py-10"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-96" /></div>
    </div>);
  }
  if (!problem) {
    return (<div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">Problem not found</h1>
        <Button asChild className="mt-4"><Link to="/problems">Back to problems</Link></Button>
      </div></div>);
  }

  const hints = (problem.hints as string[]) ?? [];
  const examples = (problem.examples as Array<{ input: string; output: string; explanation?: string }>) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Link to="/problems" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All problems
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Left: description */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
                  <Badge variant="outline" className={difficultyClass(problem.difficulty)}>{problem.difficulty}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {(problem.tags ?? []).map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>

                <Tabs defaultValue="desc" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="desc">Description</TabsTrigger>
                    <TabsTrigger value="hints">Hints</TabsTrigger>
                    <TabsTrigger value="editorial">Editorial</TabsTrigger>
                  </TabsList>

                  <TabsContent value="desc" className="mt-4 space-y-5 text-sm">
                    <p className="whitespace-pre-wrap leading-relaxed">{problem.description}</p>
                    {examples.length > 0 && (
                      <div className="space-y-3">
                        {examples.map((ex, i) => (
                          <div key={i} className="rounded-lg border border-border/60 bg-muted/30 p-3 font-mono text-xs">
                            <div><span className="text-muted-foreground">Input: </span>{ex.input}</div>
                            <div><span className="text-muted-foreground">Output: </span>{ex.output}</div>
                            {ex.explanation && <div className="mt-1 text-muted-foreground">{ex.explanation}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                    {problem.constraints && (
                      <div>
                        <h4 className="text-sm font-semibold">Constraints</h4>
                        <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-border/60 bg-muted/30 p-3 font-mono text-xs">{problem.constraints}</pre>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="hints" className="mt-4 space-y-2">
                    {hints.length === 0 && <p className="text-sm text-muted-foreground">No hints provided.</p>}
                    {hints.map((h, i) => (
                      <Collapsible key={i}>
                        <CollapsibleTrigger asChild>
                          <button className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-left text-sm hover:bg-accent/30">
                            <span className="inline-flex items-center gap-2"><Lightbulb className="h-4 w-4 text-warning" /> Hint {i + 1}</span>
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="rounded-b-lg border-x border-b border-border/60 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                          {h}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </TabsContent>

                  <TabsContent value="editorial" className="mt-4">
                    {problem.editorial ? (
                      <pre className="whitespace-pre-wrap rounded-lg border border-border/60 bg-muted/30 p-3 text-sm">{problem.editorial}</pre>
                    ) : (<p className="text-sm text-muted-foreground">Editorial coming soon.</p>)}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: editor */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-border/60">
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b border-border/60 p-3">
                  <Select value={lang} onValueChange={setLang}>
                    <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LANGS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info("Code execution coming soon — wire up Judge0")}>
                      <Play className="mr-1.5 h-3.5 w-3.5" /> Run
                    </Button>
                    <Button size="sm" onClick={markSolved}>
                      <Send className="mr-1.5 h-3.5 w-3.5" /> Submit
                    </Button>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="block min-h-[480px] w-full resize-y bg-background p-4 font-mono text-sm leading-relaxed outline-none"
                />
                <div className="border-t border-border/60 p-3 text-xs text-muted-foreground">
                  Editor is a placeholder. Once Judge0 is wired up, Run/Submit will execute against the test cases.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
