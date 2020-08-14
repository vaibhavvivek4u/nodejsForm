import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL =
  process.env.REACT_APP_BE_URL || "http://localhost:5000";

const Register = () => {
  const [users, setUsers] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = () => {
    axios
      .get(`https://demo-merns.herokuapp.com/get-all`)
      .then((users) => {
        console.log(users.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { firstname, lastname, email, phone, image } = users;
  const onChangeHandler = (e, type = "text") => {
    if (type === "text") {
      setUsers({ ...users, [e.target.name]: e.target.value });
    } else {
      setUsers({ ...users, image: e.target.files[0] });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      phone === "" ||
      image === ""
    ) {
      return alert("Enter all field");
    }
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", image);
    axios
      .post(`/register`, formData)
      .then((users) => {
        console.log(users);
        getUsersData();
        alert("data inserted successfully");
        setUsers({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          image: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container px-5 mt-5">
      <h3 className="text-center">Register</h3>
      <div className="row">
        <div className="col-md-6 offset-3">
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                onChange={(e) => onChangeHandler(e)}
                value={firstname}
                placeholder="Enter Firstname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                onChange={(e) => onChangeHandler(e)}
                value={lastname}
                placeholder="Enter lastname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={(e) => onChangeHandler(e)}
                value={email}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                onChange={(e) => onChangeHandler(e)}
                value={phone}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={(e) => onChangeHandler(e, "image")}
                placeholder="Enter Image"
              />
            </div>
            <button type="submit" className="btn btn-primary" id="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
