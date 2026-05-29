import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Trophy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/roadmaps")({ component: Roadmaps });

const ROADMAPS = [
  { i: Brain, t: "Beginner DSA", d: "Arrays, strings, hash tables, basic recursion. Build solid foundations.", n: "Beginner", h: "~30h", items: 28 },
  { i: Zap, t: "Intermediate DSA", d: "Trees, graphs, DP, sliding window, two pointers. Bridge to advanced topics.", n: "Intermediate", h: "~60h", items: 42 },
  { i: Trophy, t: "FAANG Interview Prep", d: "Top 75 most-asked problems with patterns and follow-ups.", n: "Advanced", h: "~80h", items: 75 },
  { i: Sparkles, t: "Advanced DSA", d: "Segment trees, Fenwick trees, union find, advanced graph algorithms.", n: "Expert", h: "~50h", items: 35 },
];

function Roadmaps() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Learning roadmaps</h1>
          <p className="mt-3 text-muted-foreground">Pick a guided path and we'll track your progress, milestones, and ETA.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ROADMAPS.map((r) => (
            <Card key={r.t} className="border-border/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">{r.n}</span>
                  <span className="text-muted-foreground">{r.items} items · {r.h}</span>
                </div>
                <div className="mt-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-chart-5 text-primary-foreground">
                  <r.i className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{r.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Detailed roadmap items + tracking coming in the next phase.
        </p>
      </main>
      <Footer />
    </div>
  );
}
