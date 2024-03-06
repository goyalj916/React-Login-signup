import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Update() {
  // student id (primary) ~
  // student name~
  // father name~~
  // phone (unique)~
  // email (unique)~
  // class (dropdown) (1st to 12th)~
  // gender (Radio Button) (male/female)~~
  // term & condition  ( checkbox)~~
  // note (textarea)~~
  // date of birth (select from calender)
  // created datetime
  // updated datetime
  // status (active/inactive)
  // created_by (user id)

  const [Details, setDetails] = useState({
    stdid: "",
    stdname: "",
    fathername: "",
    contact: "",
    email: "",
    class: "",
    note: "",
    stdstatus: "active"
    
  });

  const navigate = useNavigate();
  const location = useLocation();

  const stddid = location.pathname.split("/")[2]
//   console.log(location.pathname.split("/")[2]);

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }; 

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:7700/update/"+stddid,Details);
      console.log("hello")
      navigate("/Registrationtable");
    } catch (err) {
      console.log(err);
    }console.log(Details);
  };

  return (
    <div className="container">
      <br />
      <h1 className="text-center">Update Details</h1>
      <br />
      <form className="row g-3">
        
        <div className="col-md-4">
          <label htmlFor="forSname" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="forSname"
            placeholder="eg. abc"
            onChange={handleChange}
            name="stdname"
          />
        </div>
        
        <div className="col-md-4">
          <label htmlFor="forFname" className="form-label">
            Father Name
          </label>
          <input
            type="text"
            className="form-control"
            id="forFname"
            placeholder="eg. Mr.Father name"
            onChange={handleChange}
            name="fathername"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="inputAddress" className="form-label">
            Contact No.
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="+91 123-456-7890"
            onChange={handleChange}
            name="contact"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            placeholder="Some@example.com"
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            Class
          </label>
          <select
            id="inputState"
            className="form-select"
            onChange={handleChange}
            name="class"
          >
            <option selected>Choose...</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
       
        <div className="col-md-4">
          <label htmlFor="inputStatus" className="form-label">
            Status
          </label>
          <select
            id="inputStatus"
            className="form-select"
            onChange={handleChange}
            name="stdstatus"
          >
            <option value="active">Active</option>
            <option value="in-active">In-Active</option>
          </select>
        </div>

        <div class="mb-3">
          <label htmlFor="inputNote" class="form-label">
            Note
          </label>
          <textarea
            class="form-control"
            id="inputNote"
            rows="3"
            onChange={handleChange}
            name="note"
          ></textarea>
        </div>
         
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-success col-1 btn-sm"
        >
          Update
        </button>
        {/* <button type="submit" className="btn btn-primary col-md-1 ms-2">
          Search
        </button>
        <button type="submit" className="btn btn-info col-md-1 ms-2">
          Update
        </button>
        <button type="submit" className="btn btn-danger col-md-1 ms-2">
          Delete
        </button> */}
      </form>
    </div>
  );
}
