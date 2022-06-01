import React, { UseState } from "react";

function SignUpForm() {
  return (
    <>
    {/* creating a user */}
      <form>
        <input placeholder="username"></input>
        <input placeholder="email"></input>
        <input placeholder="password" type="password"></input>
      </form>
    </>
  );
}

export default SignUpForm;
