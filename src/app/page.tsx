"use client";




import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Trash icon import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { nanoid } from "nanoid";

function Home() {
  const [tasks, settasks] = useState<{ title: string; id: string }[]>([]);
  const inputRefrence = useRef<HTMLInputElement>(null);


  const addtask = () => {
    if (inputRefrence.current) {
      const inputvalue = inputRefrence.current.value.trim();

      if (!inputvalue) {
        toast.error("Task cannot be empty!"); // 🛑 Empty task error
        return;
      }

      settasks([{ title: inputvalue, id: nanoid() }, ...tasks]);
      toast.success("Task added successfully! ✅"); // ✅ Success message
      inputRefrence.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addtask();
    }
  };

  const deletetask = (id: string) => {
    settasks(tasks.filter((task) => task.id !== id));
    toast.info("Task deleted 🗑️"); // ℹ️ Deletion message
  };


      

  return (
    <div className="p-4">
      {/* Toast Notification Container (Outside the Button) */}
      <ToastContainer position="top-center" autoClose={3000} />

      <input
        ref={inputRefrence}
        onChange={(e) => {
          console.log(e.target.value || "no value");
        }}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Enter text here"
        className="border-2 border-gray-700 w-[80%] flex mx-auto rounded px-3 py-2"
      />
      
      <button
        onClick={addtask}
        className="border-2 border-black bg-gray-300 mt-4 flex w-[70%] justify-center mx-auto p-2"
      >
        Add Task
      </button>

      <ul className="mt-4">
        {tasks.map((elem) => (
          <li key={elem.id} className="flex justify-between w-64 bg-gray-100 p-2 rounded">
            {elem.title}
            <button onClick={() => deletetask(elem.id)} className="text-red-500">
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
