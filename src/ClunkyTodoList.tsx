import React, { useEffect, useMemo, useState } from "react";
import { tasksList } from "./constants/tasks";
import { Task } from "./types/Task";

export function ClunkyTodoList() {
  //
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

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    switch (filter) {
      case "completed":
        filtered = filtered.filter((task) => task.completed);
        break;
      case "active":
        filtered = filtered.filter((task) => !task.completed);
        break;
      default:
        break;
    }

    return filtered;
  }, [tasks, filter]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
