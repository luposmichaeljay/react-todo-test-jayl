import { Task } from "../../types/Task";

export function TodoFilters({
  filter,
  setFilter,
  tasks,
}: {
  filter: string;
  setFilter: (filter: string) => void;
  tasks: Task[];
}) {
  return (
    <div className="todo-list__filters">
      <div className="btn-group">
        <button
          className={`btn btn--secondary ${
            filter === "all" ? "btn--active" : ""
          }`}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          All ({tasks.length})
        </button>
        <button
          className={`btn btn--secondary ${
            filter === "active" ? "btn--active" : ""
          }`}
          onClick={() => setFilter("active")}
          aria-pressed={filter === "active"}
        >
          Active ({tasks.filter((task) => !task.completed).length})
        </button>
        <button
          className={`btn btn--secondary ${
            filter === "completed" ? "btn--active" : ""
          }`}
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
        >
          Completed ({tasks.filter((task) => task.completed).length})
        </button>
      </div>
    </div>
  );
}
