"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { Button, message } from "antd";

const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (values: { id: string }) => {
    message.loading("Sending....");
    try {
      await forgotPassword(values);
      message.success("Reset link has been sent to your email");
    } catch (error) {}
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit}>
        <h3 style={{ margin: "5px 0" }}>Forgot Password</h3>
        <div style={{ margin: "5px 0" }}>
          <FormInput type="text" name="id" placeholder="Enter your UserId" />
        </div>
        <div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
