import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const Login = () => {
  const inputRef = useRef(null);
  const [eyeIsClosed, setEyeState] = useState(false);

  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

  const toggleShow = () => {
    if (inputRef.current.type === "password") {
      setEyeState(true);
      inputRef.current.type = "text";
    } else {
      setEyeState(false);
      inputRef.current.type = "password";
    }
  };

  function handleLogin(ev) {
    ev.preventDefault();

    const currentUser = users.find((user) => user.email === userEmail);

    if (currentUser?.email === userEmail && currentUser?.senha === password) {
      localStorage.setItem("usuario", userEmail);
      currentUser.tipo_usuario === 0
        ? navigate("/Admin")
        : navigate("/Catalog");
    } else {
      window.alert("Usuário ou senha inválidos!");
    }
  }

  return (
    <div>
      <div className={styles.page}>
        <form onSubmit={handleLogin}>
          <fieldset>
            <div className={styles.fieldsetWrapper}>
              <legend>Fazer Login</legend>
              <div className={styles.inputWrapper}>
                <label htmlFor="mail">E-mail:</label>
                <input
                  type="email"
                  id="mail"
                  autoComplete="off"
                  required
                  onChange={(ev) => setUserEmail(ev.target.value)}
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
                    onChange={(ev) => setPassword(ev.target.value)}
                    ref={inputRef}
                  />
                  <button type="button" onClick={toggleShow}>
                    {eyeIsClosed ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
          <input type="submit" value="Entrar" className={styles.submit} />
        </form>
        <div className={styles.createUserCard}>
          <h2>
            Ainda não possue uma conta? Clique no botão a seguir para criar uma
            conta!
          </h2>
          <button onClick={() => navigate("/CreateUser")}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
