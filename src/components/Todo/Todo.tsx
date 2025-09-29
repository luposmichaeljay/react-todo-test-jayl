import { Task } from "../../types/Task";

export function Todo({
  task,
  handleToggleComplete,
  handleRemoveTask,
}: {
  task: Task;
  handleToggleComplete: (id: number) => void;
  handleRemoveTask: (id: number) => void;
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
      <a
        href="#"
        className="todo-list__remove"
        onClick={(e) => {
          e.preventDefault();
          handleRemoveTask(task.id);
        }}
        aria-label={`Remove "${task.text}" from list`}
        title="Remove task"
      >
        [×]
      </a>
    </>
  );
}
