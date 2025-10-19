import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onAddTask?: (taskText: string) => void;
}

export const AIAssistant = ({ onAddTask }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your AI productivity assistant. I can help you add tasks, prioritize your work, and stay motivated. Try asking me something like 'Add a task to finish the report' or 'What should I focus on?'",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    setInput("");
  };

  const generateResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    
    if (lower.includes("add") && lower.includes("task")) {
      return "I'd be happy to help you add that task! You can use the 'Add new task' button above to create it with all the details like priority and due date.";
    }
    if (lower.includes("focus") || lower.includes("priority")) {
      return "Focus on your high-priority tasks first! Start with the most important items on your list, and break them into smaller, manageable steps.";
    }
    if (lower.includes("motivat") || lower.includes("tired")) {
      return "You've got this! Remember, every completed task is a step forward. Take a short break if needed, then tackle one small task to build momentum.";
    }
    if (lower.includes("deadline") || lower.includes("due")) {
      return "For deadline management, I recommend: 1) Break large tasks into smaller ones, 2) Set realistic due dates, 3) Prioritize based on urgency and importance.";
    }
    
    return "I'm here to help with task management, prioritization, and motivation! Feel free to ask me about adding tasks, staying focused, or managing your time better.";
  };

  return (
    <Card className="flex flex-col h-[500px] shadow-card">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg gradient-primary">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="gradient-primary">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
