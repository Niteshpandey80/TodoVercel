import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // loading todos
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Helper to handle 401 errors
  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch todos
  const fetchTodos = async () => {
    if (!token) return handleUnauthorized();
    setFetching(true);
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleUnauthorized();
      } else {
        alert("Failed to fetch todos. Try again later.");
      }
    } finally {
      setFetching(false);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!text) return;
    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/todos",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchTodos(); // refresh todos
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) handleUnauthorized();
      else alert("Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + `/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) handleUnauthorized();
      else alert("Failed to delete todo.");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (fetching) return <div className="p-6 text-center">Loading todos...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Todos</h2>
          <button onClick={logout} className="text-red-600 text-sm">
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
            disabled={loading}
            className="bg-blue-600 text-white px-4 ml-2 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet</p>
        ) : (
          <ul>
            {todos.map((t) => (
              <li key={t._id} className="border-b py-2 flex justify-between items-center">
                <span>{t.text}</span>
                <button
                  onClick={() => deleteTodo(t._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
