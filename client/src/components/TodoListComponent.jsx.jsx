import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TodoListComponent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/service/todo/get_todos");
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

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <div 
          key={todo._id} 
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-green-800">{todo.todo_name}</h3>
          <p className="text-gray-600 mt-2">{todo.todo_desc}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className={`px-2 py-1 rounded-full text-xs ${
              todo.todo_status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {todo.todo_status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoListComponent;