import React, { useState, useEffect } from "react";
// import { Link, Route, Routes } from "react-router-dom";

export default function Login() {
  const initialValues = { username: "", email: "", password: "" };
  const [FormValues, setFormValues] = useState(initialValues);
  const [FormErrors, setFormErrors] = useState({});
  const [IsSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(FormValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    // console.log(FormErrors);
    if (Object.keys(FormErrors).length === 0 && IsSubmit) {
      // console.log(FormValues);
    }
  }, [FormErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(FormErrors).length === 0 && IsSubmit ? (
        <div className="ui message success">Logged In....</div>
      ) : (
        <pre>{JSON.stringify(FormValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              value={FormValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{FormErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Email"
              value={FormValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{FormErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={FormValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{FormErrors.password}</p>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
