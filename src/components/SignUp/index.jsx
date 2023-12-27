import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./index.css";

export default function SignUp() {
  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const [loading, setLoading] = useState(false);

  function validation() {
    if (!userRef.current.value) {
      userRef.current.style.outlineColor = "red";
      userRef.current.focus();
      return false;
    }
    if (!emailRef.current.value) {
      emailRef.current.style.outlineColor = "red";
      emailRef.current.focus();
      return false;
    }
    if (!passRef.current.value) {
      passRef.current.style.outlineColor = "red";
      passRef.current.focus();
      return false;
    }
    return true;
  }

  function click(e) {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const user = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    setLoading(true);

    fetch("https://strapi-store-server.onrender.com/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Tarmoq xatosi:", response.status, response.statusText);
          throw new Error("Tarmoq javobi yaxshi emas");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ro'yxatdan o'tish muvaffaqiyatli:", data);

        window.location.href = "/SignIn";
      })
      .catch((error) => {
        console.error("Ro'yxatdan o'tishda xatolik:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form>
      <div className="register-wrapper">
        <h2>Ro'yxatdan o'tish</h2>
        <label>
          <span>Foydalanuvchi nomi</span>
          <input type="text" ref={userRef} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" ref={emailRef} />
        </label>
        <label>
          <span>Parol</span>
          <input type="password" ref={passRef} />
        </label>

        <button onClick={click} disabled={loading}>
          {loading ? "Royxatdan otishda..." : "Royxatdan otish"}
        </button>

        <div className="direction-login">
          <h4>Already a member?</h4>
          <Link to="/SignIn">Login</Link>
        </div>
      </div>
    </form>
  );
}
