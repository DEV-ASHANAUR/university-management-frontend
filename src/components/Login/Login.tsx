"use client";
import { Col, Row, Button, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import Link from "next/link";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res: any = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        router.push("/profile");
        message.success("User logged in successfully!");
      } else {
        message.error("Wrong credential!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (error: any) {
      // console.log(error);
      message.error("Wrong credential!");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col sm={12} md={16} lg={10}>
        <Image
          src={loginImage}
          width={500}
          height={500}
          alt="login image"
          style={{ width: "100%" }}
        />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="id"
                type="text"
                size="large"
                label="User Id"
                placeholder="Enter id"
              />
            </div>

            <div style={{ margin: "15px 0" }}>
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                placeholder="Enter Password"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0px",
              }}
            >
              <div style={{ marginLeft: "auto" }}>
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
