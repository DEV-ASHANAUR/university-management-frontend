"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormYearPicker from "@/components/Forms/FormYearPicker";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { acSemesterOptions, monthOptions } from "@/constants/global";
import {
  useAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
} from "@/redux/api/academic/departmentApi";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { useAcademicSemesterQuery, useUpdateAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";

import { Button, Col, Row, message } from "antd";

const semesterOptions = [
    {
      label: "Autumn",
      value: "Autumn",
    },
    {
      label: "Summer",
      value: "Summer",
    },
    {
      label: "Fall",
      value: "Fall",
    },
  ];

type IDProps = {
  params: any;
};

const EditACSemesterPage = ({ params }: IDProps) => {
  const { id } = params;
  const { data: acSemesterData, isLoading } = useAcademicSemesterQuery(
    params?.id
  );

  const [updateAcademicSemester] = useUpdateAcademicSemesterMutation();

  // @ts-ignore
  const defaultValues = {
    title: acSemesterData?.title || "",
    year: acSemesterData?.year?.toString() || "",
    startMonth: acSemesterData?.startMonth || "",
    endMonth: acSemesterData?.endMonth || "",
  };


  const onSubmit = async (data:any) => {
    message.loading("Updating.....");
    try {
      if (data?.title == "Autumn") data["code"] = "01";
      else if (data?.title == "Summer") data["code"] = "02";
      else data["code"] = "03";
      data.year = parseInt(data.year);

      console.log(data)

      const res: any = await updateAcademicSemester({ id, body: data });
      console.log("reslut",res)
      if (res?.data?.id) {
        message.success("Academic Semester updated successfully");
      }

      if (res?.error?.error) {
        message.success(res?.error?.error);
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
            label: "academic-semester",
            link: "/admin/academic/semester",
          },
        ]}
      />
      <ActionBar title="Update Academic Semester"></ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              size="large"
              name="title"
              options={semesterOptions}
              label="Title"
              placeholder="Select"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              size="large"
              name="startMonth"
              options={monthOptions}
              label="Start Month"
              placeholder="Select"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              size="large"
              name="endMonth"
              options={monthOptions}
              label="End Month"
              placeholder="Select"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormYearPicker name="year" label="Year" picker="year" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditACSemesterPage;
