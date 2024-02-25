"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { authKey } from "@/constants/storageKey";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { removeUserInfo, storeUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
type FormData = {
  id: string | string[] | undefined;
  token: string | string[] | undefined;
};
const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const id = searchParams.get("id");
  const token: any = searchParams.get("token");

  if (!id && !token) return null;

  storeUserInfo({ accessToken: token });

  const defaultValues: {
    id: any;
    newPassword: string;
  } = {
    id,
    newPassword: "",
  };

  const onSubmit = async (values: FormData) => {
    message.loading("processing....");

    try {
      await resetPassword(values);
      removeUserInfo(authKey);
      router.push("/login");

      message.success("Password reset successfully!");
    } catch (error) {}
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <h3 style={{ margin: "5px 0" }}>Reset Password</h3>
        <div style={{ margin: "10px 0" }}>
          <FormInput type="text" name="id" placeholder="Enter your UserId" />
        </div>
        <div style={{ margin: "10px 0" }}>
          <FormInput
            type="password"
            name="newPassword"
            placeholder="Enter new password"
          />
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

export default ResetPasswordPage;
