"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
} from "@/redux/api/academic/departmentApi";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";

import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditACDepartmentPage = ({ params }: IDProps) => {
  const { id } = params;
  const { data: acDepdata, isLoading } = useAcademicDepartmentQuery(params?.id);
  const { data: facultyData } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });
  const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();

  const academicFaculties = facultyData?.academicFaculties;
  const acFacultiesOptions = academicFaculties?.map((faculty: any) => {
    return {
      label: faculty?.title,
      value: faculty?.id,
    };
  });
  // @ts-ignore
  const defaultValues = {
    title: acDepdata?.title || "",
    academicFacultyId: acDepdata?.academicFaculty?.id,
  };

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating.....");
    try {
      //   console.log(data);
      const res: any = await updateAcademicDepartment({ id, body: values });
      if (res?.data?.id) {
        message.success("Academic Department updated successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "academic-department",
            link: "/admin/academic/department",
          },
        ]}
      />
      <ActionBar title="Update Academic Department"></ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditACDepartmentPage;
