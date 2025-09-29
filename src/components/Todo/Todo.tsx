import { Task } from "../../types/Task";

export function Todo({
  task,
  handleToggleComplete,
}: {
  task: Task;
  handleToggleComplete: (id: number) => void;
}) {
  return (
    <>
      <input
        className="todo-list__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleComplete(task.id)}
        aria-label={`Mark "${task.text}" as ${
          task.completed ? "incomplete" : "complete"
        }`}
      />
      <span
        className={`todo-list__text ${
          task.completed ? "todo-list__text--completed" : ""
        }`}
      >
        {task.text}
      </span>
    </>
  );
}
