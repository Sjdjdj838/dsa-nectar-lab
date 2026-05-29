import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  BookOpen, Code2, LineChart, Map, MessagesSquare, Sparkles, ArrowRight, Trophy, Brain, Zap, Award,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/")({ component: Landing });

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-80px" },
};

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Paths />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-grid relative overflow-hidden">
      <div className="container mx-auto px-4 pb-24 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" /> 100% free, forever
          </div>
          <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
            Master DSA the <span className="bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">structured</span> way.
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
            Learn Data Structures & Algorithms with guided modules, LeetCode-style practice, progress tracking, and a community of learners.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/auth">Start learning free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link to="/problems">Browse problems</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: "500+", l: "Practice problems" },
    { v: "24", l: "DSA topics" },
    { v: "4", l: "Roadmaps" },
    { v: "12k+", l: "Active learners" },
  ];
  return (
    <section className="border-y border-border/40 bg-card/30">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {items.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="text-center"
          >
            <div className="text-3xl font-bold tracking-tight md:text-4xl">{s.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { i: BookOpen, t: "DSA Learning", d: "Comprehensive theory, visualizations, and complexity analysis for every topic." },
    { i: Code2, t: "Coding Practice", d: "Solve real interview problems with a built-in editor and curated test cases." },
    { i: LineChart, t: "Progress Tracking", d: "Heatmaps, streaks, and topic-by-topic mastery analytics." },
    { i: Map, t: "Roadmaps", d: "Guided paths from beginner to FAANG-interview ready." },
    { i: MessagesSquare, t: "Community", d: "Discuss approaches, share notes, and learn from peers." },
    { i: Award, t: "Certificates", d: "Earn verifiable certificates when you complete a learning track." },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Everything you need to master DSA</h2>
          <p className="mt-4 text-muted-foreground">A complete platform built on what actually works for interview prep.</p>
        </motion.div>
        <motion.div {...stagger} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {feats.map(({ i: Icon, t, d }) => (
            <motion.div key={t} variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }}>
              <Card className="group h-full border-border/60 bg-card/50 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="mb-4 inline-grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Paths() {
  const paths = [
    { i: Brain, t: "Beginner DSA", d: "Start with arrays, strings, and the fundamentals.", n: "Beginner", h: "~30h" },
    { i: Zap, t: "Intermediate DSA", d: "Trees, graphs, recursion, and dynamic programming.", n: "Intermediate", h: "~60h" },
    { i: Trophy, t: "FAANG Interview Prep", d: "75 most-asked problems with patterns explained.", n: "Advanced", h: "~80h" },
  ];
  return (
    <section className="bg-card/30 py-24">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Guided learning paths</h2>
          <p className="mt-4 text-muted-foreground">Structured journeys with milestones, so you never wonder what's next.</p>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {paths.map((p, i) => (
            <motion.div key={p.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
              <Card className="h-full overflow-hidden border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{p.n}</span>
                    <span className="text-xs text-muted-foreground">{p.h}</span>
                  </div>
                  <div className="mt-6 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-chart-5 text-primary-foreground">
                    <p.i className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                  <Button asChild variant="ghost" className="mt-4 px-0 text-primary hover:bg-transparent hover:text-primary">
                    <Link to="/roadmaps">Explore path <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Priya S.", r: "SDE @ Google", q: "The structured roadmaps got me from confused to confident in 3 months. Best free resource I've used." },
    { n: "Marcus L.", r: "CS student", q: "The complexity breakdowns are gold. Finally understand why my brute force fails." },
    { n: "Aiko T.", r: "SWE @ Stripe", q: "Heatmap streaks kept me consistent. Cleared FAANG loops thanks to the prep tracks." },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Loved by learners</h2>
        </motion.div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div key={t.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
              <Card className="h-full border-border/60 bg-card/50">
                <CardContent className="p-6">
                  <p className="text-sm leading-relaxed text-foreground">"{t.q}"</p>
                  <div className="mt-6">
                    <div className="font-medium">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is AlgoForge really free?", a: "Yes — 100% free, no subscriptions, no paywalls, no credit card." },
    { q: "Which languages are supported?", a: "Java, Python, JavaScript, TypeScript, C++, C#, and Go in the practice editor." },
    { q: "Do I need an account?", a: "You can browse topics and problems freely. An account unlocks progress tracking, notes, and certificates." },
    { q: "How is progress tracked?", a: "We track problems solved, topics completed, daily streaks, and weekly activity — visible on your dashboard." },
    { q: "Can I get a certificate?", a: "Yes — completing any learning track issues a verifiable certificate with a unique ID and QR code." },
  ];
  return (
    <section id="faq" className="bg-card/30 py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Frequently asked</h2>
        </motion.div>
        <motion.div {...fadeUp} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`i${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Required").max(150),
  message: z.string().trim().min(5, "Tell us a bit more").max(2000),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_requests").insert(parsed.data);
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Message sent — we'll be in touch!");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto grid max-w-5xl gap-12 px-4 md:grid-cols-2">
        <motion.div {...fadeUp}>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Get in touch</h2>
          <p className="mt-4 text-muted-foreground">Questions, feedback, or partnership ideas? Drop us a line.</p>
          <div className="mt-8 space-y-3 text-sm">
            <div><span className="text-muted-foreground">Email — </span>hello@algoforge.dev</div>
            <div><span className="text-muted-foreground">Response time — </span>within 24h</div>
          </div>
        </motion.div>
        <motion.form {...fadeUp} onSubmit={submit} className="space-y-4 rounded-2xl border border-border/60 bg-card/50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Sending..." : "Send message"}</Button>
        </motion.form>
      </div>
    </section>
  );
}
