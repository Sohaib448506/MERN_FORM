import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from "axios";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const submit = (e) => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const data = { name, email, password };
    console.log("Sign Up form Submitted", data);
    axios
      .post("http://localhost:3000/api/signup", data)
      .then((res) => {
        console.log("api success", res);
        window.localStorage.setItem("user", res.data);
      })
      .catch((err) => console.log("api error", err));
  };
  return (
    <BoxContainer>
      <FormContainer onSubmit={submit}>
        <Input type="text" placeholder="Full Name" id="name" required />
        <Input type="email" placeholder="Email" id="email" required />
        <Input type="password" placeholder="Password" id="password" required />
        {/* <Input type="password" placeholder="Confirm Password" /> */}
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
