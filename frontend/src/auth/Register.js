import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

const Register = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
  });

  const { email, password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.email]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      await axios.post(
        "/api/auth/register",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.history.push("/login");
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <h4 className="text-muted text-center mb-5">Create an account</h4>

        <div className="card p-5 shadow">
          <form>
           
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Register
              </button>

              <br />
              <p>Already have Account ? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  );
};

export default Register;
