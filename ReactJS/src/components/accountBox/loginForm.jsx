import React, { useContext, useEffect } from "react";
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

export function LoginForm(props) {
  useEffect(() => {
    const getToken = window.localStorage.getItem("user");

    if (getToken.length > 0) {
      axios
        .post("http://localhost:3000/api/auth", { token: getToken })
        .then((res) => console.log("api success", res))
        .catch((err) => console.log("api error", err));
    }
  }, []);
  const { switchToSignup } = useContext(AccountContext);
  const submit = (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const data = { email, password };
    console.log("Sign Up form Submitted", data);
    axios
      .post("http://localhost:3000/api/auth", data)
      .then((res) => console.log("api success", res))
      .catch((err) => console.log("api error", err));
  };
  return (
    <BoxContainer>
      <FormContainer onSubmit={submit}>
        <Input type="email" placeholder="Email" id="email" required />
        <Input type="password" placeholder="Password" id="password" required />
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Signin</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
