// src/pages/UserModule.jsx

import React, { useEffect, useState, useMemo } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { getUsers } from "../api/userApi";

const UserModule = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [editingUser, setEditingUser] = useState(null);

  // ------- GET USERS -------
  useEffect(() => {
    (async () => {
      const data = await getUsers();

      const formatted = data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        gender: "Male",
        country: u.address?.city || "Unknown",
      }));

      setUsers(formatted);
    })();
  }, []);

  // ------- ADD USER -------
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  // ------- DELETE USER -------
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // ------- START EDIT -------
  const startEdit = (user) => {
    setEditingUser(user);
  };

  // ------- APPLY UPDATE -------
  const editUser = (updated) => {
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
  };

  // ------- FILTER + SEARCH -------
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const s =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const c = country === "All" ? true : u.country === country;
      return s && c;
    });
  }, [users, search, country]);

  return (
    <div style={{ width: "650px", margin: "auto", padding: "20px" }}>
      <h2>User Module (Full CRUD + API)</h2>

      <UserForm
        addUser={addUser}
        editUser={editUser}
        editingUser={editingUser}
      />

      <hr />

      <input
        placeholder="Search user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <select
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="All">All</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="UK">UK</option>
      </select>

      <UserList
        users={filtered}
        deleteUser={deleteUser}
        startEdit={startEdit}
      />
    </div>
  );
};

export default UserModule;
