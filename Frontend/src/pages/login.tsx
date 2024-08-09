import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from "axios"

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(username, password,role);
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
        role
      });
      const data=response.data
      localStorage.setItem("username",data.user.username)
      if (response.data.message === "Login successful") {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        console.log(response.data)
        if (response.data.user.role === 'admin') {
          navigate('/adminlanding'); // Redirect to the admin dashboard
        } else {
          navigate('/landing'); // Redirect to the landing page
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('An error occurred. Please try again later.');
    }
  };
  


  return (
    <div className='login'>
      <div className="container">
        <div className="center">
          <h1>Login</h1>
          <form style={{textAlign:"left",color:"b87854"}} onSubmit={handleSubmit} autoComplete="off">
            <label >Username</label>
            <div className="txt_field">
              <input
                type="text"
                id="username_123"
                name="username_123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
              />
              <span></span>
             
            </div>
              <label>Password</label>
            <div className="txt_field">
              <input
                type="password"
                id="password_123"
                name="password_123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span></span>
            </div>
            <div className="role_selection">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>
            <input name="submit" type="submit" value="Login" />
            <div className="signup_link">
              Not a Member? <Link to="/signup">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;