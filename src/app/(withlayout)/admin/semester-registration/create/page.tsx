"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import { useAddSemesterRegistrationsMutation } from "@/redux/api/semesterRegistrationApi";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import ACSemesterField from "@/components/Forms/ACSemesterField";

const CreateSemesterRegistrationPage = () => {
  const [addSemesterRegistrations] = useAddSemesterRegistrationsMutation();
  const { role } = getUserInfo() as any;

  const onSubmit = async (data: any) => {
    data.minCredit = parseInt(data?.minCredit);
    data.maxCredit = parseInt(data?.maxCredit);

    message.loading("creating....");
    try {
      const result = await addSemesterRegistrations(data);
      if (result?.data?.id) {
        message.success("Semester Registrations Created successFully!");
      }
      if (result?.error?.error) {
        message.error(result?.error?.error);
      }
    } catch (error: any) {
      console.log(error?.errorMessages);
      message.error(error?.errorMessages);
    }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          {
            label: "semester-registration",
            link: `/${role}/semester-registration`,
          },
        ]}
      />
      <h1>Create Semester Registration</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormDatePicker
                name="startDate"
                label="Start Date"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormDatePicker name="endDate" label="End Date" size="large" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <ACSemesterField
                name="academicSemesterId"
                label="Academic Semester"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="minCredit" label="Min Credit" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="maxCredit" label="Max Credit" />
            </div>
          </Col>
        </Row>
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateSemesterRegistrationPage;
