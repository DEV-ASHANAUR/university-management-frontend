"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useAcademicFacultyQuery,
  useUpdateAcademicFacultyMutation,
} from "@/redux/api/academic/facultyApi";
import {
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditACFacultyPage = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useAcademicFacultyQuery(params?.id);
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();
  // @ts-ignore
  const defaultValues = {
    title: data?.title || "",
  };

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating.....");
    try {
      //   console.log(data);
      const res:any = await updateAcademicFaculty({ id, body: values });
      if(res?.data?.id){
        message.success("Academic Faculty updated successfully");
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
            label: "academic-faculty",
            link: "/admin/academic/faculty",
          },
        ]}
      />
      <ActionBar title="Update Academic Faculty"></ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditACFacultyPage;
