// src/components/UserList.jsx

import React from "react";

const UserList = ({ users, deleteUser, startEdit }) => {
  if (!users.length) return <p>No users found</p>;

  return (
    <table width="100%" border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>{u.gender}</td>
            <td>{u.country}</td>
            <td>
              <button onClick={() => startEdit(u)}>Edit</button>
              <button onClick={() => deleteUser(u.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
