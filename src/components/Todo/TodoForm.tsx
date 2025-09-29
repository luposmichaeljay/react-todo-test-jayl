export function TodoForm({
  newTask,
  handleAddTask,
  handleInputChange,
}: {
  newTask: string;
  handleAddTask: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form
      className="todo-list__form"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
    >
      <input
        className="todo-list__input"
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
        aria-label="New task input"
      />
      <button className="btn btn--cta" type="submit" aria-label="Add new task">
        Add Task
      </button>
    </form>
  );
}
