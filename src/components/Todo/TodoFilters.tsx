import { Task } from "../../types/Task";

export function TodoFilters({
  filter,
  setFilter,
  tasks,
  handleRemoveCompleted,
}: {
  filter: string;
  setFilter: (filter: string) => void;
  tasks: Task[];
  handleRemoveCompleted: () => void;
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
        <button
          className={`btn btn--secondary ${
            filter === "multiword" ? "btn--active" : ""
          }`}
          onClick={() => setFilter("multiword")}
          aria-pressed={filter === "multiword"}
        >
          Multi-word (
          {
            tasks.filter((task) => task.text.trim().split(/\s+/).length >= 2)
              .length
          }
          )
        </button>
      </div>

      {tasks.some((task) => task.completed) && (
        <div className="todo-list__actions">
          <button
            className="btn btn--primary"
            onClick={handleRemoveCompleted}
            aria-label="Remove all completed tasks"
          >
            Remove Completed ({tasks.filter((task) => task.completed).length})
          </button>
        </div>
      )}
    </div>
  );
}
