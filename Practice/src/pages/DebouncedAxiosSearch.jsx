import { useState, useEffect } from "react";
import axios from "axios";

export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]); // full list
  const [filtered, setFiltered] = useState([]); // search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1️⃣ Fetch full list on page load
  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function fetchAllUsers() {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
      setFiltered(res.data); // show full list initially
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  // 2️⃣ Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(users); // show full list when query empty
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, users]);

  function handleSearch(searchText) {
    const match = users.filter((u) =>
      u.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFiltered(match);
  }

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && filtered.length === 0 && <p>No results found</p>}

      <ul
        style={{
          marginTop: "10px",
          padding: 0,
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "6px",
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        {filtered.map((u) => (
          <li
            key={u.id}
            style={{
              listStyle: "none",
              padding: "10px",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>{u.name}</strong>
            <br />
            <small>{u.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
