import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  const fetchTodos = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/todos",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return;
    await axios.post(
      import.meta.env.VITE_API_URL + "/todos",
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Todos</h2>
          <button
            onClick={logout}
            className="text-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        <div className="flex mb-3">
          <input
            className="border p-2 flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New todo..."
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 ml-2"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((t) => (
            <li
              key={t._id}
              className="border-b py-2"
            >
              {t.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
