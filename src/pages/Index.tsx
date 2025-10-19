import { useState } from "react";
import { Brain, ListTodo } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskForm } from "@/components/AddTaskForm";
import { ProgressOverview } from "@/components/ProgressOverview";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { AIAssistant } from "@/components/AIAssistant";
import { Task, Priority } from "@/types/task";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (taskData: {
    title: string;
    description?: string;
    priority: Priority;
    dueDate?: string;
    category?: string;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    toast.success("Task added successfully!");
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          toast.success("Great job completing that task! 🎉");
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task deleted");
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl gradient-primary shadow-primary">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Productivity Assistant
            </h1>
            <p className="text-muted-foreground">
              Your AI-powered task manager and motivation coach
            </p>
          </div>
        </div>

        {/* Motivational Quote */}
        <MotivationalQuote />

        {/* Progress Overview */}
        <ProgressOverview tasks={tasks} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Your Tasks</h2>
            </div>

            <AddTaskForm onAddTask={handleAddTask} />

            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Active ({activeTasks.length})
                </h3>
                {activeTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Completed ({completedTasks.length})
                </h3>
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No tasks yet. Add your first task to get started!
                </p>
              </div>
            )}
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
