"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import { useAddRoomMutation } from "@/redux/api/roomApi";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import { useAddCourseMutation, useCoursesQuery } from "@/redux/api/courseApi";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";

const CreateCoursePage = () => {
  const [addCourse] = useAddCourseMutation();
  const { role } = getUserInfo() as any;

  const { data, isLoading } = useCoursesQuery({ limit: 100, page: 1 });

  const courses = data?.courses;

  const coursesOptions = courses?.map((course: any) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.credits = parseInt(data?.credits);
    const coursePreRequisitesOptions = data?.preRequisiteCourses?.map(
      (id: string) => {
        return {
          courseId: id,
        };
      }
    );
    data.preRequisiteCourses = coursePreRequisitesOptions;

    console.log("values", data);
    message.loading("creating....");
    try {
      const result = await addCourse(data).unwrap();
      if (result?.id) {
        message.success("Course Created successFully!");
      } else {
        message.error("Failed to Create Course!");
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
            label: "course",
            link: `/${role}/course`,
          },
        ]}
      />
      <h1>Create Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="title" label="Course Title" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="code" label="Course Code" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="credits" label="Course Credits" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormMultiSelectField
                name="preRequisiteCourses"
                label="Pre Requisite Courses"
                options={coursesOptions as SelectOptions[]}
                placeholder="Select"
              />
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

export default CreateCoursePage;
