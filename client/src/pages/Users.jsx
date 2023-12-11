import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/login");
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <div className="users">
        {users.map((user) => (
          <div className="user">
            <h2>{user.email}</h2>
            <h2>{user.nome}</h2>
            <h2>{user.senha}</h2>
            <h2>{user.tipo_usuario}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
