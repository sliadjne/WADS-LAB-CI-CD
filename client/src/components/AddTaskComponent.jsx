import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddTaskComponent = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!taskTitle || !taskDesc) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post("/service/todo/add_todo", {
        todo_name: taskTitle,
        todo_desc: taskDesc,
        todo_image: "https://api.dicebear.com/9.x/icons/svg?seed=Katherine", // Default image
        todo_status: "active"
      });

      if (response.data) {
        toast.success("Task added successfully!");
        // Clear form
        setTaskTitle("");
        setTaskDesc("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="flex flex-1/4 flex-col gap-2 bg-green-100 rounded-md p-4">
        <h1 className="text-green-900 font-semibold text-lg">Add Your Task</h1>
        <form onSubmit={handleAddTask} className="flex flex-col gap-3">
          <input
            type="text"
            id="taskTitle"
            placeholder="Task Title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="p-3 w-full text-white rounded-md border-gray-100 bg-green-800 shadow-xs text-sm placeholder:text-gray-300"
          />

          <textarea
            id="taskDesc"
            cols="30"
            rows="12"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="p-3 rounded-md text-sm w-full text-white border-gray-100 bg-green-800 placeholder:text-gray-300 resize-none"
            placeholder="Write your task here..."
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full px-4 py-2 text-sm text-white rounded-md bg-green-600 hover:bg-green-800 transition ease-in-out"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTaskComponent;
