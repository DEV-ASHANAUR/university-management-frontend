"use client";
import Form from "@/components/Forms/Form";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import { useAddOfferedCourseMutation } from "@/redux/api/offeredCourseApi";
import ACDepartmentField from "@/components/Forms/ACDepartmentField";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import OfferedCoursesField from "@/components/Forms/OfferedCoursesField";

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data, isLoading } = useSemesterRegistrationsQuery({
    limit: 100,
    page: 1,
  });

  const semesterRegistrations = data?.semesterRegistrations;

  const semesterRegistrationOptions = semesterRegistrations?.map(
    (semester: any) => {
      return {
        label: `${semester?.academicSemester?.title}  ${semester?.academicSemester?.year}`,
        value: semester?.id,
      };
    }
  );

  const { role } = getUserInfo() as any;

  const onSubmit = async (data: any) => {

    console.log("first",data)
    message.loading("creating....");
    // try {
    //   const result = await addOfferedCourse(data).unwrap();
    //   if (result?.length > 0) {
    //     message.success("Offered Course Created successFully!");
    //   } else {
    //     message.error("Failed to create! Maybe Already Have!");
    //   }
    // } catch (error: any) {
    //   console.log(error?.errorMessages);
    //   message.error("Error! Please try Again!");
    // }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          {
            label: "offered-course",
            link: `/${role}/offered-course`,
          },
        ]}
      />
      <h1>Create Offered Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <ACDepartmentField
                name="academicDepartmentId"
                label="Academic Department"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                name="semesterRegistrationId"
                label="Semester registration"
                options={semesterRegistrationOptions as SelectOptions[]}
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <OfferedCoursesField name="courseIds" label="Courses" />
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

export default CreateOfferedCoursePage;
