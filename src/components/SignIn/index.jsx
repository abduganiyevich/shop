import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

export default function SignIN() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const [loading, setLoading] = useState(false);
  function valid() {
    if (!emailRef.current.value) {
      emailRef.current.style.outlineColor = "red";
      emailRef.current.focus();
      return ;
    }
    if (!passRef.current.value) {
      passRef.current.style.outlineColor = "red";
      passRef.current.focus();
      return;
    }
  }
  function handleClick() {
    valid();

    const user = {
      identifier: emailRef.current.value,
      password: passRef.current.value,
    };

    fetch('https://strapi-store-server.onrender.com/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Tarmoq xatosi:', response.status, response.statusText);
          throw new Error('Tarmoq javobi yaxshi emas');
        }
        return response.json();
      })
      .then((data) => {
        alert('Royxatdan otish muvaffaqiyatli:', data);
        navigate('/Homepage');
      })
      .catch((error) => {
        console.error('Royxatdan otishda xatolik:', error.message);
      })
      .finally(() => {
        setLoading(false);
      });

      setLoading(true);
  }

  return (
    <div className='login-wrapper'>
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input type="text" ref={emailRef} />
      </label>
      <label>
        <span>Password</span>
        <input type="password" ref={passRef} />
      </label>

      <button className='login-btn' onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
      <button className='guest-btn'>Guest User</button>

      <div className='direction-register'>
        <span>Not a member yet?</span>
        <Link to="/SignUP">Register</Link>
      </div>
    </div>
  );
}
