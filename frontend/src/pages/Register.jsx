import { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await registerUser(form);
    if (res.message) {
      navigate("/login");
    } else {
      alert(res.detail || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
