import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <div className="login-form-container">
      <form className="login-form-form" onSubmit={handleSubmit}>
        <h1>Welcome Back!</h1>
        <ul>
          {errors.map((error, idx) => (
            <div className="error-message validation-err" key={idx}>* {error}</div>
          ))}
        </ul>
        <label className="email-field">
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label id="password-field">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-form-button" type="submit">LogIn</button>
        <button className="demo-button" onClick={demoLogin}>Login as demo user</button>
      </form>
      <div className="form-welcometext">
        <h1>Log</h1>
        <h1>In</h1>
      </div>
    </div>
  );
}

export default LoginFormModal;
