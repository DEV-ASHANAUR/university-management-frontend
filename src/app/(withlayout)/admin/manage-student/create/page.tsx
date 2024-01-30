"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import GuardianInfo from "@/components/StudentForms/GuardianInfo";
import LocalGuardianInfo from "@/components/StudentForms/LocalGuardianInfo";
import StudentBasicInfo from "@/components/StudentForms/StudentBasicInfo";
import StudentInfo from "@/components/StudentForms/StudentInfo";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddStudentWithFormDataMutation } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";

const CreateStudentPage = () => {
  const [addStudentWithFormData] = useAddStudentWithFormDataMutation();
  const { role } = getUserInfo() as any;
  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInfo />,
    },
  ];

  const handleStudentSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      const result: any = await addStudentWithFormData(formData)
      if (result?.data) {
        message.success("Student created successFully!");
      }
      if (result?.error?.status) {
        message.error(result?.error?.error);
      }
    } catch (error: any) {
      console.log("errror is:", error);
      console.log("error page", error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `${role}`,
          },
          {
            label: `manage-student`,
            link: `/admin/manage-student`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Create Student</h1>
      <StepperForm
        submitHandler={(value) => {
          handleStudentSubmit(value);
        }}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
