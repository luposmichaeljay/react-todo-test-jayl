import React, { useEffect, useMemo, useState } from "react";
import { tasksList } from "../../constants/tasks";
import { Task } from "../../types/Task";
import { Todo } from "./Todo";
import { TodoFilters } from "./TodoFilters";
import { TodoForm } from "./TodoForm";

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(tasksList);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
        },
      ]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleRemoveCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    switch (filter) {
      case "completed":
        filtered = filtered.filter((task) => task.completed);
        break;
      case "active":
        filtered = filtered.filter((task) => !task.completed);
        break;
      case "multiword":
        filtered = filtered.filter(
          (task) => task.text.trim().split(/\s+/).length >= 2
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [tasks, filter]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div className="todo-list">
      <h1 className="todo-list__title">To-Do List</h1>
      <h2 className="todo-list__counter">Items: {totalCount}</h2>

      <TodoForm
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />

      <TodoFilters
        filter={filter}
        setFilter={setFilter}
        tasks={tasks}
        handleRemoveCompleted={handleRemoveCompleted}
      />

      {filteredTasks.length === 0 ? (
        <div className="todo-list__empty">
          {filter === "all"
            ? "No tasks yet. Add one above!"
            : filter === "multiword"
            ? "No tasks with multiple words found."
            : `No ${filter} tasks found.`}
        </div>
      ) : (
        <ul className="todo-list__items">
          {filteredTasks.map((task) => (
            <li key={task.id} className="todo-list__item">
              <Todo
                task={task}
                handleToggleComplete={handleToggleComplete}
                handleRemoveTask={handleRemoveTask}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
