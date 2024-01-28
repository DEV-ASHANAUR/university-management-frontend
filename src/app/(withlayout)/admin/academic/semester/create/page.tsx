"use client";
import Form from "@/components/Forms/Form";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import FormSelectField from "@/components/Forms/FormSelectField";
import { monthOptions } from "@/constants/global";
import FormYearPicker from "@/components/Forms/FormYearPicker";
import { useAddAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";

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

const CreateACSemesterPage = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const { role } = getUserInfo() as any;

  const onSubmit = async (data: any) => {
    message.loading("creating....");
    try {
      if (data?.title == "Autumn") data["code"] = "01";
      else if (data?.title == "Summer") data["code"] = "02";
      else data["code"] = "03";

      data.year = parseInt(data.year);

      const result: any = await addAcademicSemester(data);
      if (result?.data) {
        message.success("Academic Semester create successFully!");
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
            label: "academic-semester",
            link: `/${role}/academic/semester`,
          },
        ]}
      />
      <h1>Create Academic Semester</h1>
      <Form submitHandler={onSubmit}>
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
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateACSemesterPage;
