import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const MyTaskComponent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/service/todo/get_all");
      setTodos(response.data);
    } catch (error) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.todo_name);
    setUpdatedDescription(task.todo_desc);
    document.getElementById("update-modal").showModal();
  };

  const handleUpdateTask = async () => {
    if (!selectedTask) return;

    try {
      await axios.patch(`/service/todo/update_todo/${selectedTask._id}`, {
        todo_name: updatedTitle,
        todo_desc: updatedDescription,
        todo_status: selectedTask.todo_status,
        todo_image: selectedTask.todo_image
      });

      toast.success("Task updated successfully!");
      fetchTodos();
      document.getElementById("update-modal").close();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/service/todo/delete_todo/${taskId}`);
      toast.success("Task deleted successfully!");
      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex flex-col gap-2 mt-2 p-3 text-white bg-green-700 rounded-md shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{todo.todo_name}</h3>
            <p className="text-sm text-gray-100">{todo.todo_desc}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-xs ${
                todo.todo_status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {todo.todo_status}
              </span>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
                  onClick={() => handleEdit(todo)}
                >
                  <FaRegEdit className="text-base" />
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
                  onClick={() => handleDelete(todo._id)}
                >
                  <MdDeleteOutline className="text-lg" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      <dialog id="update-modal" className="modal">
        <div className="modal-box bg-white p-6 rounded-lg shadow-xl">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Update Task</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                className="input input-bordered w-full bg-white text-gray-800"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                className="textarea textarea-bordered w-full bg-white text-gray-800"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-action mt-6">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={handleUpdateTask}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={() => document.getElementById("update-modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTaskComponent;