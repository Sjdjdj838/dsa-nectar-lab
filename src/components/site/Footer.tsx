import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </span>
            AlgoForge
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Master Data Structures & Algorithms with structured learning, practice, and community — completely free.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/topics" className="hover:text-foreground">Topics</Link></li>
            <li><Link to="/roadmaps" className="hover:text-foreground">Roadmaps</Link></li>
            <li><Link to="/problems" className="hover:text-foreground">Practice</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Community</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><span>Privacy</span></li>
            <li><span>Terms</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AlgoForge — Built for learners.
      </div>
    </footer>
  );
}
