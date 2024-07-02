import { Button, Row } from "antd";
import PForm from "../components/form/PFrom";
import PInput from "../components/form/PInput";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../types/responseType";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmit = async (values: FieldValues) => {
    setErrorMessage("");
    console.log(values);
    try {
      const loginInfo = {
        email: values.email,
        password: values.password,
      };
      const res = await login(loginInfo).unwrap();
      console.log(res);
      if (res.success) {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        toast.success("User login successfully");
        navigate("/");
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError?.data.errorMessage);
    }
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
