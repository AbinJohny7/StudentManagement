import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  createStudentData,
  deleteStudentData,
  getStudentData,
  editStudentData,
} from "./services/allApi";

const Student = () => {
  const [inputVal, setInputVal] = useState({
    name: "",
    age: "",
    address: "",
    course: "",
  });

  const [studentData, setStudentData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const onAddClick = async () => {
    let reqBody = {
      studentData: inputVal,
    };
    let apiresponse = await createStudentData(reqBody);
    console.log(apiresponse);
    if (apiresponse.status === 201) {
      alert("Successfully added");
      setInputVal({ name: "", age: "", address: "", course: "" });
      loadStudentData();
    } else {
      alert("error occured");
    }
  };

  const loadStudentData = async () => {
    let apiresponse = await getStudentData();
    console.log(apiresponse);

    if (apiresponse.status === 200) {
      //for storing loaded data
      setStudentData(apiresponse.data);
    } else {
      alert("something went wrong can't access data");
    }
  };
  
  const onDeleteClick = async (id) => {
    let apiresponse = await deleteStudentData(id);
    if (apiresponse.status === 200) {
      alert("successfully deleted");
      loadStudentData();
    } else {
      alert("error occured");
    }
  };
  
  const onSaveEditClick = async () => {
    let reqBody = {
      studentData: inputVal,
    };
    let apiResponse = await editStudentData(editId, reqBody);
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      alert("Successfully edited");
      setInputVal({ name: "", age: "", address: "", course: "" });
      loadStudentData();
      setEditId(null);
    } else {
      alert("Error occurred");
    }
  };

  const onEditClick = (eachData) => {
    setEditId(eachData.id);
    setInputVal(eachData.studentData);
  };

  return (
    <>
     <div className="bg">
       <Container>
        <h1 className="text-center  text-dark">Student Details</h1>
        
        {/* Styled Card */}
        <div className="card shadow-lg border-0" style={{ 
          maxWidth: '800px', 
          margin: '2rem auto', 
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <div className="card-body p-4">
            <h3 className="card-title text-center text-white mb-4">
              {editId ? "Edit Student" : "Add New Student"}
            </h3>
            <div className="d-flex flex-column align-items-center gap-4">
              <div className="d-flex w-100 align-items-center gap-3">
                <label className="form-label text-white fw-bold" style={{ minWidth: '150px' }}>
                  Student Name:
                </label>
                <input
                  onChange={(e) =>
                    setInputVal({ ...inputVal, name: e.target.value })
                  }
                  className="form-control"
                  type="text"
                  placeholder="Enter Student Name"
                  value={inputVal.name}
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="d-flex w-100 align-items-center gap-3">
                <label className="form-label text-white fw-bold" style={{ minWidth: '150px' }}>
                  Age
                </label>
                <input
                  onChange={(e) =>
                    setInputVal({ ...inputVal, age: e.target.value })
                  }
                  className="form-control"
                  type="number"
                  placeholder="Enter Age"
                  value={inputVal.age}
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="d-flex w-100 align-items-center gap-3">
                <label className="form-label text-white fw-bold" style={{ minWidth: '150px' }}>
                  Address
                </label>
                <input
                  onChange={(e) =>
                    setInputVal({ ...inputVal, address: e.target.value })
                  }
                  className="form-control"
                  type="text"
                  placeholder="Enter Address"
                  value={inputVal.address}
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="d-flex w-100 align-items-center gap-3">
                <label className="form-label text-white fw-bold" style={{ minWidth: '150px' }}>
                  Course
                </label>
                <select
                  className="form-control"
                  value={inputVal.course}
                  onChange={(e) =>
                    setInputVal({ ...inputVal, course: e.target.value })
                  }
                  style={{ borderRadius: '8px' }}
                >
                  <option value="">Select Course</option>
                  <option value="CS">CS</option>
                  <option value="ME">ME</option>
                  <option value="EC">EC</option>
                </select>
              </div>
              
              <div className="d-flex gap-3 mt-3">
                {editId ? (
                  <>
                    <button onClick={onSaveEditClick} className="btn btn-warning fw-bold px-4">
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        setEditId(null);
                        setInputVal({ name: "", age: "", address: "", course: "" });
                      }} 
                      className="btn btn-secondary fw-bold px-4"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={onAddClick} className="btn btn-success fw-bold px-4">
                    Add Student
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <table className="table mt-4 table-striped table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Address</th>
              <th scope="col">Course</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentData.length > 0 ? (
              <>
                {studentData.map((eachData, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{eachData.studentData.name}</td>
                    <td>{eachData.studentData.age}</td>
                    <td>{eachData.studentData.address}</td>
                    <td>{eachData.studentData.course}</td>
                    <td>
                      <button
                        onClick={() => onDeleteClick(eachData.id)}
                        className="btn btn-danger btn-sm me-2"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => onEditClick(eachData)} 
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  <h4 className="text-muted py-4">No student data available</h4>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
     </div>
    </>
  );
};

export default Student;