import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "Small progress is still progress.",
    author: "Unknown"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  }
];

export const MotivationalQuote = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card className="p-6 shadow-card gradient-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
          <span className="text-sm font-medium text-primary-foreground/90">Daily Motivation</span>
        </div>
        <blockquote className="text-lg font-medium text-primary-foreground mb-2">
          "{quote.text}"
        </blockquote>
        <p className="text-sm text-primary-foreground/80">— {quote.author}</p>
      </div>
    </Card>
  );
};
