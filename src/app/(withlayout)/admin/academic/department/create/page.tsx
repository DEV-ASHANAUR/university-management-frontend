"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "@/components/Forms/FormSelectField";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";

const CreateACDepartmentPage = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });
  const { role } = getUserInfo() as any;

  const academicFaculties = data?.academicFaculties;
  const acFacultiesOptions = academicFaculties?.map((faculty) => {
    return {
      label: faculty?.title,
      value: faculty?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("creating....");
    try {
      const result: any = await addAcademicDepartment(data);
      if (result?.data) {
        message.success("Academic Department create successFully!");
      }
      if (result?.error?.status) {
        message.error(result.error.error);
      }
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
    }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          {
            label: "academic-department",
            link: `/${role}/academic/department`,
          },
        ]}
      />
      <h1>Create Academic Deprtment</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput type="text" name="title" label="Title" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              size="large"
              name="academicFacultyId"
              options={acFacultiesOptions as SelectOptions[]}
              label="Academic Faculty"
              placeholder="Select"
            />
          </Col>
        </Row>
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateACDepartmentPage;
