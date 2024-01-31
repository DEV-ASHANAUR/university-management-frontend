"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import { useAddSemesterRegistrationsMutation } from "@/redux/api/semesterRegistrationApi";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import ACSemesterField from "@/components/Forms/ACSemesterField";
import { useAddOfferedCourseSectionMutation } from "@/redux/api/offeredCourseSectionApi";
import SemesterRegistrationField from "@/components/Forms/SemesterRegistrationField";
import ACDepartmentField from "@/components/Forms/ACDepartmentField";
import { useState } from "react";
import {
  useOfferedCourseQuery,
  useOfferedCoursesQuery,
} from "@/redux/api/offeredCourseApi";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormDynamicFields from "@/components/ui/FormDynamicFields";
import ACDepartmentFieldId from "@/components/Forms/ACDepartmentFieldId";

const CreateOfferedCourseSectionPage = () => {
  const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();

  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>();
  const [acDepartmentId, setAcDepartmentId] = useState<string>();

  const query: Record<string, any> = {};
  if (!!acDepartmentId) {
    query["academicDepartmentId"] = acDepartmentId;
  }
  if (!!semesterRegistrationId) {
    query["semesterRegistrationId"] = semesterRegistrationId;
  }

  const { data, isLoading } = useOfferedCoursesQuery({
    limit: 10,
    page: 1,
    ...query,
  });

  const offeredCourses = data?.offeredCourses;
  const offeredCoursesOptions = offeredCourses?.map((offerCourse) => {
    return {
      label: offerCourse?.course?.title,
      value: offerCourse?.id,
    };
  });

  const { role } = getUserInfo() as any;

  const onSubmit = async (data: any) => {
    // console.log("section values", data);
    data.maxCapacity = parseInt(data?.maxCapacity);
    message.loading("creating....");
    try {
      const result = await addOfferedCourseSection(data).unwrap();
    //   console.log("result",result)
      if (result?.id) {
        message.success("Offered Course Section Created successFully!");
      }else{
        message.error("Failed to Create? Please try Again");
      }
    } catch (error: any) {
      console.log(error?.errorMessages);
      message.error("Failed to Create? Please try Again");
    }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          {
            label: "offered-course-section",
            link: `/${role}/offered-course-section`,
          },
        ]}
      />
      <h1>Create Offered course section</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <SemesterRegistrationField
                name="semesterRegistration"
                label="Semester Registration"
                onChange={(el) => setSemesterRegistrationId(el)}
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <ACDepartmentFieldId
                name="academicDepartment"
                label="Academic department"
                onChange={(el) => setAcDepartmentId(el)}
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                name="offeredCourseId"
                label="Offered Course"
                options={offeredCoursesOptions as SelectOptions[]}
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="title" label="Section" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="maxCapacity" label="Max Capacity" />
            </div>
            <Button htmlType="submit" type="primary">
              Add
            </Button>
          </Col>
          <Col span={16} style={{margin:"10px 0"}}>
            <FormDynamicFields />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateOfferedCourseSectionPage;
