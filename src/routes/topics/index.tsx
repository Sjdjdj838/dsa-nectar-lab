import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { difficultyClass } from "@/lib/difficulty";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/topics/")({ component: Topics });

function Topics() {
  const { data, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await supabase.from("topics").select("*").order("order_index");
      return data ?? [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">DSA Topics</h1>
          <p className="mt-3 text-muted-foreground">Pick a topic and dive into theory, examples, and complexity analysis.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-36" />)
            : data!.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link to="/topics/$slug" params={{ slug: t.slug }}>
                    <Card className="group h-full border-border/60 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{t.category ?? "Topic"}</span>
                          <Badge variant="outline" className={`text-xs ${difficultyClass(t.difficulty)}`}>{t.difficulty}</Badge>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">{t.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
                        <div className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Open <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>

        {!isLoading && data!.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">No topics yet — check back soon.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
