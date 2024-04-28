import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/login.module.css";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Signin() {
  const initialData = {
    email: "",
    password: ""
  };
  const [signInCreds, setSignInCreds] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInCreds({
      ...signInCreds,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signInCreds.email === "" || signInCreds.password === "") {
      alert("Please enter all required fields");
    } else {
      try {
        const response = await axios.post(
          "https://swami-travels-api.vercel.app/admin/login",
          signInCreds
        );
        if (response.data.status === "Failed") {
          alert(response.data.message);
        } else {
          alert(" Sign In Successfully");
          // Assuming the Dashboard component is imported and exists
          navigate("/dashboardlayout");
        }
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          alert(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          // The request was made but no response was received
          alert("Network Error: Please try again later");
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Error: " + err.message);
        }
      }
    }
  };

  return (
    <>
      <div className={styles.login}>
        <h1 className="h3 mb-3 fw-bold">Sign In</h1>
        <div>
          <p style={{ textAlign: "left", marginBottom: "0px" }}>Email</p>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            name="email"
            onChange={handleChange}
          />
        </div>
        <p style={{ textAlign: "left", marginBottom: "0px" }}>Password</p>
        <div className="form-floating">
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </div>
        <p style={{ textAlign: "right", marginTop: "-10px" }}>
          <Link to="/forgot-password">Forgot Password</Link>
        </p>
        <button
          className="w-100  btn btn-lg btn-primary"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" style={{ paddingLeft: 10, textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signin;
