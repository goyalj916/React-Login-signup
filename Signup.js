import React, { useState, useEffect } from "react";
// import { Link, Route, Routes } from "react-router-dom";

export default function Signup() {
  const initialValues = { username: "", email: "",contact:"", password: "" , retypepassword:"", confirmpassword:"", };
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
    const eregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const cregex =/^[0-9\b\+\-\(\)]+$/;
    const pregex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    //--------user required--------
    if (!values.username) {
      errors.username = "Username is required!";
    }
    //------email required-------
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!eregex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.contact) {
      errors.contact = "Contact is required!";
    } else if (!cregex.test(values.contact)) {
      errors.contact = "This is not a valid contact format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!pregex.test(values.password)) {
      errors.password = "This is not a valid Password format!";
    }
    if (!values.retypepassword) {
      errors.retypepassword = "Rw-type Password is required!";
    }else if (values.retypepassword !== values.password ) {
      errors.retypepassword = "password does not match please check";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm Password is required!";
    }else if (values.confirmpassword !== values.retypepassword ) {
      errors.confirmpassword = "password does not match please check";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(FormErrors).length === 0 && IsSubmit ? (
        <div className="ui message success">Signed In....</div>
      ) : (
        <pre>{JSON.stringify(FormValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>
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
            <label>Contact</label>
            <input
              className="form-control"
              type="number"
              name="contact"
              placeholder="Contact"
              value={FormValues.contact}
              onChange={handleChange}
            />
          </div>
          <p>{FormErrors.contact}</p>
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
          <div className="field">
            <label>Retype Password</label>
            <input
              className="form-control"
              type="password"
              name="retypepassword"
              placeholder="Re-type Password"
              value={FormValues.retypepassword}
              onChange={handleChange}
            />
          </div>
          <p>{FormErrors.retypepassword}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={FormValues.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <p>{FormErrors.confirmpassword}</p>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

  