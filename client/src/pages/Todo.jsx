import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Todos</h2>
          <button
            
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
            className="bg-blue-600 text-white px-4 ml-2"
          >
            Add
          </button>
        </div>

        <ul>
         <li>Todo</li>
        </ul>
      </div>
    </div>
  );
}
