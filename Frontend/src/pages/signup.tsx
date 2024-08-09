import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import axios from "axios"
const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role
      });
      if (response.data.success) {
        navigate("/landing"); // Redirect to login page after successful signup
      } else {
        alert(response.data.message);
        navigate("/landing");
      }
    } catch (error) {
      console.error('Error during signup', error);
      alert('An error occurred. Please try again later.');
    }
  };
  return (
    <div className='login'>
      <div className="container">
        <div className="center">
          <h1 className='signup-heading'>Sign Up</h1>
          <form style={{textAlign:"left",color:"b87854"}} onSubmit={handleSubmit}>
              <label>Username</label>
            <div className="txt_field">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span></span>
            </div>
              <label>Password</label>
            <div className="txt_field">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <input name="submit" type="submit"  value="Sign Up" />
            <div className="signup_link">
              Already a Member? <Link to="/">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
