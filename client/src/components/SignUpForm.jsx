import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
// TODO - import auth here

// mutations/queries
import { ADD_USER } from "../utils/mutations";

function SignUpForm() {
  // set the initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);

  //   add user mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  //   handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //   handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      //   add authentication here
    } catch (error) {
      console.error(error);
    }
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
    console.log(userFormData);
  };

  return (
    <>
      {/* creating a user */}
      <form onSubmit={handleFormSubmit}>
        {/* username */}
        <input
          value={userFormData.username}
          placeholder="username"
          name="username"
          onChange={handleInputChange}
          required
        ></input>
        {/* email */}
        <input
          value={userFormData.email}
          placeholder="email"
          name="email"
          onChange={handleInputChange}
          required
        ></input>
        {/* password */}
        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={handleInputChange}
          required
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}

export default SignUpForm;
