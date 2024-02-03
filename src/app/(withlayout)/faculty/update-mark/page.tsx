"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUpdateMarksMutation } from "@/redux/api/studentEnrollCourseMarkApi";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const UpdateMarksPage = () => {
  const searchParams = useSearchParams();
  const examType = searchParams.get("examType");
  const marks = searchParams.get("marks");
  const academicSemesterId = searchParams.get("academicSemesterId");
  const studentId = searchParams.get("studentId");
  const courseId = searchParams.get("courseId");
  const offeredCourseSectionId = searchParams.get("offeredCourseSectionId");

  const [updateMarks] = useUpdateMarksMutation();

  const onSubmit = async (values: any) => {
    values.marks = parseInt(values.marks);
    try {
      const res = await updateMarks(values);
      if (res?.data) {
        message.success("Marks updated");
      }
      if (res?.error?.message) {
        message.error(res?.error?.message);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    examType,
    marks,
    academicSemesterId,
    studentId,
    courseId,
    offeredCourseSectionId,
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: "faculty", link: "/faculty" },
          { label: "courses", link: "/faculty/courses" },
          {
            label: "students",
            link: "/faculty/courses/student",
          },
          {
            label: "result",
            link: `/faculty/student-result?studentId=${studentId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`,
          },
        ]}
      />
      <ActionBar title="Update mark"></ActionBar>
      <Form defaultValues={defaultValues} submitHandler={onSubmit}>
        <p>Exam type: {examType}</p>
        <Row>
          <Col
            span={10}
            style={{
              margin: "10px 0px",
            }}
          >
            <FormInput name="marks" label="Marks" />
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UpdateMarksPage;
