import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { difficultyClass } from "@/lib/difficulty";
import { ArrowLeft, BookOpen, Lightbulb, AlertTriangle, GaugeCircle, FileText } from "lucide-react";

export const Route = createFileRoute("/topics/$slug")({ component: TopicDetail });

function TopicDetail() {
  const { slug } = Route.useParams();
  const { data: topic, isLoading } = useQuery({
    queryKey: ["topic", slug],
    queryFn: async () => {
      const { data } = await supabase.from("topics").select("*").eq("slug", slug).maybeSingle();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto space-y-4 px-4 py-10">
          <Skeleton className="h-10 w-1/2" /><Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-semibold">Topic not found</h1>
          <Button asChild className="mt-4"><Link to="/topics">Back to topics</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <Link to="/topics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All topics
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{topic.title}</h1>
            <Badge variant="outline" className={difficultyClass(topic.difficulty)}>{topic.difficulty}</Badge>
            {topic.category && <Badge variant="secondary">{topic.category}</Badge>}
          </div>
          <p className="mt-3 text-muted-foreground">{topic.description}</p>
        </motion.div>

        <Tabs defaultValue="theory" className="mt-8">
          <TabsList className="flex w-full flex-wrap justify-start">
            <TabsTrigger value="theory"><BookOpen className="mr-1.5 h-4 w-4" />Theory</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="complexity"><GaugeCircle className="mr-1.5 h-4 w-4" />Complexity</TabsTrigger>
            <TabsTrigger value="tips"><Lightbulb className="mr-1.5 h-4 w-4" />Interview tips</TabsTrigger>
            <TabsTrigger value="mistakes"><AlertTriangle className="mr-1.5 h-4 w-4" />Common mistakes</TabsTrigger>
            <TabsTrigger value="notes"><FileText className="mr-1.5 h-4 w-4" />Revision notes</TabsTrigger>
          </TabsList>
          <Section value="theory" content={topic.theory} />
          <Section value="examples" content={topic.examples} />
          <Section value="complexity" content={topic.complexity} />
          <Section value="tips" content={topic.interview_tips} />
          <Section value="mistakes" content={topic.common_mistakes} />
          <Section value="notes" content={topic.revision_notes} />
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function Section({ value, content }: { value: string; content: string | null }) {
  return (
    <TabsContent value={value} className="mt-4">
      <Card className="border-border/60">
        <CardContent className="prose prose-invert max-w-none p-6 text-sm leading-relaxed dark:prose-invert">
          {content ? (
            <pre className="whitespace-pre-wrap font-sans text-foreground">{content}</pre>
          ) : (
            <p className="text-muted-foreground">No content yet for this section.</p>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
