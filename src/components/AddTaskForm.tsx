import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Priority } from "@/types/task";

interface AddTaskFormProps {
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: Priority;
    dueDate?: string;
    category?: string;
  }) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      category: category.trim() || undefined,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setCategory("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Card 
        className="p-4 shadow-card hover:shadow-card-hover transition-smooth cursor-pointer border-2 border-dashed"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add new task</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="text-base"
        />
        
        <Textarea
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[80px] resize-none"
        />
        
        <div className="grid grid-cols-3 gap-3">
          <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-sm"
          />
          
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="gradient-primary flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsExpanded(false);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
