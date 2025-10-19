import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/types/task";

interface ProgressOverviewProps {
  tasks: Task[];
}

export const ProgressOverview = ({ tasks }: ProgressOverviewProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const highPriorityTasks = tasks.filter(t => t.priority === "high" && !t.completed).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completed Tasks</p>
            <p className="text-3xl font-bold text-foreground">{completedTasks}</p>
            <p className="text-xs text-muted-foreground mt-1">out of {totalTasks}</p>
          </div>
          <div className="p-3 rounded-lg bg-success/10">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">High Priority</p>
            <p className="text-3xl font-bold text-foreground">{highPriorityTasks}</p>
            <p className="text-xs text-muted-foreground mt-1">pending tasks</p>
          </div>
          <div className="p-3 rounded-lg bg-destructive/10">
            <Target className="w-6 h-6 text-destructive" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Progress</p>
            <p className="text-3xl font-bold text-foreground">{Math.round(completionRate)}%</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
        </div>
        <Progress value={completionRate} className="h-2" />
      </Card>
    </div>
  );
};
