import { Button, Row } from "antd";
import PForm from "../components/form/PFrom";
import PInput from "../components/form/PInput";
import { useState } from "react";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async () => {
    setErrorMessage("");
  };
  return (
    <div>
      {" "}
      <Row style={{ height: "100vh" }} justify={"center"} align={"middle"}>
        <PForm onSubmit={onSubmit}>
          <PInput type={"email"} name={"email"} label={"Email"} />
          <PInput type={"password"} name={"password"} label={"Password"} />
          {errorMessage && (
            <p style={{ color: "red", marginBottom: "7px" }}>{errorMessage}</p>
          )}

          <div>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#1677FF",
                color: "white",
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </div>
        </PForm>
      </Row>
    </div>
  );
};

export default Login;
