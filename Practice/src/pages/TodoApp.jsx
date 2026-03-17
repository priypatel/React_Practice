// import { useState, useEffect } from "react";

// export default function TodoApp() {
//   const [input, setInput] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [filter, setFilter] = useState("all");

//   // Load todos from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("todos")) || [];
//     setTodos(saved);
//   }, []);

//   // Save todos to localStorage
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   // Add or Edit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!input.trim()) return;

//     if (editId) {
//       setTodos(
//         todos.map((todo) =>
//           todo.id === editId ? { ...todo, text: input } : todo,
//         ),
//       );
//       setEditId(null);
//     } else {
//       setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
//     }
//     setInput("");
//   };

//   // Delete
//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   // Toggle Complete
//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo,
//       ),
//     );
//   };

//   // Start Edit
//   const startEdit = (todo) => {
//     setEditId(todo.id);
//     setInput(todo.text);
//   };

//   // Filter Logic
//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "completed") return todo.completed;
//     if (filter === "pending") return !todo.completed;
//     return true;
//   });

//   return (
//     <div
//       style={{ width: "400px", margin: "40px auto", fontFamily: "sans-serif" }}
//     >
//       <h2>Todo App</h2>

//       {/* Input */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Add todo..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           }}
//         />
//       </form>

//       {/* Filters */}
//       <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//         <button onClick={() => setFilter("all")}>All</button>
//         <button onClick={() => setFilter("completed")}>Completed</button>
//         <button onClick={() => setFilter("pending")}>Pending</button>
//       </div>

//       {/* Todo List */}
//       <ul style={{ marginTop: "20px", padding: 0 }}>
//         {filteredTodos.map((todo) => (
//           <li
//             key={todo.id}
//             style={{
//               listStyle: "none",
//               padding: "10px",
//               marginBottom: "8px",
//               border: "1px solid #ddd",
//               borderRadius: "6px",
//               background: todo.completed ? "#e6ffe6" : "#fff",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <span
//               onClick={() => toggleComplete(todo.id)}
//               style={{
//                 textDecoration: todo.completed ? "line-through" : "none",
//                 cursor: "pointer",
//               }}
//             >
//               {todo.text}
//             </span>

//             <div style={{ display: "flex", gap: "10px" }}>
//               <button onClick={() => startEdit(todo)}>Edit</button>
//               <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function TodoApp() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD or UPDATE todo
  const handleAdd = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos(todos.map((t) => (t.id === editId ? { ...t, text: input } : t)));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    }

    setInput("");
  };

  // DELETE
  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // MARK COMPLETE/PENDING
  const handleStatus = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // EDIT
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setInput(todo.text);
  };

  // FILTER LOGIC
  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div
      style={{ width: "400px", margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Todo App</h2>

      {/* Input + Add Button */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Add todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button onClick={handleAdd} style={{ padding: "10px 20px" }}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* LIST */}
      <ul style={{ marginTop: "20px", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              listStyle: "none",
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: todo.completed ? "#e6ffe6" : "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                fontWeight: 500,
              }}
            >
              {todo.text}
            </span>

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleStatus(todo.id)}>
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
