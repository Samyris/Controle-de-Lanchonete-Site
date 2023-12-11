import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import styles from "./CreateUser.module.css";

const CreateUser = () => {
  const inputRef = useRef(null);
  const [eyeIsClosed, setEyeState] = useState(false);

  const [users, setUsers] = useState([]);
  const [createdUser, setCreatedUser] = useState({
    email: "",
    nome: "",
    senha: "",
    tipo_usuario: 1,
  });

  const toggleShow = () => {
    if (inputRef.current.type === "password") {
      setEyeState(true);
      inputRef.current.type = "text";
    } else {
      setEyeState(false);
      inputRef.current.type = "password";
    }
  };

  const navigate = useNavigate();

  function handleChange(ev) {
    setCreatedUser((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    // console.log(createdUser);
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (users.find((user) => user.email === createdUser.email)) {
        window.alert("Usuário já existe.");
      } else {
        await axios.post("http://localhost:8800/login", createdUser);
        window.alert("Usuário criado!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/login");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div className={styles.page}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className={styles.fieldsetWrapper}>
              <legend>Cadastrar Usuário</legend>
              <div className={styles.inputWrapper}>
                <label htmlFor="mail">E-mail:</label>
                <input
                  type="email"
                  id="mail"
                  autoComplete="off"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  required
                  name="nome"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="password">Senha:</label>
                <div className={styles.passwordBtnsWrapper}>
                  <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    required
                    name="senha"
                    onChange={handleChange}
                    ref={inputRef}
                  />
                  <button type="button" onClick={toggleShow}>
                    {eyeIsClosed ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
          <input type="submit" value="Cadastrar" className={styles.submit} />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
