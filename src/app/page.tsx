"use client";

import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";

function Home() {
  const [tasks, setTasks] = useState<{ title: string; id: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value.trim();
      if (!inputValue) {
        toast.error("Task cannot be empty!");
        return;
      }
      setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);
      toast.success("Task added successfully!");
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.info("Task deleted");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent">🚀 Todo App</h1>

      <div className="flex w-full max-w-lg mb-6">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder="Enter your task..."
          className="flex-grow border border-gray-600 bg-gray-700 text-white rounded-l px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md"
        />
        <button
          onClick={addTask}
          className="bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-500 hover:to-gray-300 px-5 py-3 rounded-r text-white font-semibold shadow-lg transition-all"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-lg space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <span className="text-gray-200 font-medium">{task.title}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-500 transition"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
