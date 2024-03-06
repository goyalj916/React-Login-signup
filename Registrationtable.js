import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Registrationtable() {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location)

  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(-1);
  const [uname, setName] = useState("");
  const [ufname, setFname] = useState("");
  const [ucontact, setContact] = useState("");
  const [uemail, setEmail] = useState("");
  const [uclass, setClass] = useState("");
  const [unote, setNote] = useState("");
  const [ustatus, setstatus] = useState("");
  // const [Data, setData] = useState({
  //   stdname: "",
  //   fathername: "",
  //   contact: "",
  //   email: "",
  //   class: "",
  //   note: "",
  //   stdstatus: "",
  // });

  // const [data , setData ] = useState([])

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = details.slice(firstIndex, lastIndex);
  const npage = Math.ceil(details.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchAlldetails = async () => {
      try {
        const res = await axios.get("http://localhost:7700/registration");
        setDetails(res.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlldetails();

    
  }, []);

  const handleDelete = async (stdid) => {
    try {
      await axios.delete("http://localhost:7700/registration/" + stdid);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };



  


 


  return (
    <div>
      <div class="d-flex bd-highlight">
        <div class="p-2 w-100 bd-highlight">
          <h2>Student Details</h2>
        </div>
        <div class="p-2 flex-shrink-1 bd-highlight">
          <Link to="/Registration">
            <button type="button" class="btn btn-info">
              Add+
            </button>
          </Link>
        </div>
      </div>
      <div className="table-responsive ">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">fname</th>
              <th scope="col">contact</th>
              <th scope="col">email</th>
              <th scope="col">class</th>
              <th scope="col">gender</th>
              <th scope="col">terms</th>
              <th scope="col">note</th>
              <th scope="col">dob</th>
              <th scope="col">created</th>

              <th scope="col">status</th>
              <th scope="col">created_by</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((detail, id) =>(
              
                <tr key={id}>
                  <td scope="col">{detail.stdid}</td>
                  <td scope="col">{detail.stdname}</td>
                  <td scope="col">{detail.fathername}</td>
                  <td scope="col">{detail.contact}</td>
                  <td scope="col">{detail.email}</td>
                  <td scope="col">{detail.class}</td>
                  <td scope="col">{detail.gender}</td>
                  <td scope="col">{detail.terms}</td>
                  <td scope="col">{detail.note}</td>
                  <td scope="col">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(detail.dob)
                    )}
                  </td>
                  <td scope="col">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(detail.created)
                    )}
                  </td>

                  <td scope="col">
                    <span
                      class={`badge ${
                        detail.stdstatus === "active"
                          ? "text-bg-success"
                          : "text-bg-secondary"
                      }`}
                    >
                      {detail.stdstatus}
                    </span>
                  </td>
                  <td scope="col">{detail.created_by}</td>
                  <td scope="col">
                    <div class="d-flex bd-highlight mb-3">
                      <div class="p-1 bd-highlight">
                        <Link to={`/Update/${detail.stdid}`}>
                          <button
                            type="button"
                            // onClick={handleEdit(detail.stdid)}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                      <div class="p-1 bd-highlight">
                        <button
                          type="button"
                          onClick={() => handleDelete(detail.stdid)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item ">
            <a className="page-link" href="#" onClick={prePage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {numbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? "active" : ""}`}>
              <a
                className="page-link"
                key={i}
                onClick={() => changeCPage(n)}
                href="#"
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
  function changeCPage(id) {
    setCurrentPage(id);
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}
