export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type TaskTypeFilters = "all" | "active" | "completed";
