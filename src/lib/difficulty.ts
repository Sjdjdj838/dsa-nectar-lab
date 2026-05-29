export const difficultyClass = (d: string) => {
  switch (d) {
    case "easy": return "text-success bg-success/10 border-success/20";
    case "medium": return "text-warning bg-warning/10 border-warning/20";
    case "hard": return "text-destructive bg-destructive/10 border-destructive/20";
    default: return "text-muted-foreground bg-muted border-border";
  }
};
