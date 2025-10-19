import { CheckCircle2, Circle, Clock, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export const TaskCard = ({ task, onToggleComplete, onDelete }: TaskCardProps) => {
  return (
    <Card 
      className={`p-4 shadow-card hover:shadow-card-hover transition-smooth ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-0.5 transition-bounce"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          )}
          
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Badge className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
              </div>
            )}
            
            {task.category && (
              <Badge variant="outline" className="text-xs">
                {task.category}
              </Badge>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
