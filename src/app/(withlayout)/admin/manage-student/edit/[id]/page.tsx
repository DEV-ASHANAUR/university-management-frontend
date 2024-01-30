"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { Row, Col, Button, message } from "antd";
import ACDepartmentField from "@/components/Forms/ACDepartmentField";
import ACFacultyField from "@/components/Forms/ACFacultyField";
import {
  useUpdateFacultyMutation,
} from "@/redux/api/facultyApi";
import { useStudentQuery, useUpdateStudentMutation } from "@/redux/api/studentApi";
import ACSemesterField from "@/components/Forms/ACSemesterField";

const EditAdminPage = ({ params }: any) => {
  const { data: studentData, isLoading: loading } = useStudentQuery(params?.id);

  const [updateStudent] = useUpdateStudentMutation();

  const onSubmit = async (value: any) => {
    message.loading("Creating...");
    try {
      const result: any = await updateStudent({
        id: params?.id,
        body: value,
      }).unwrap();

      if (result?.id) {
        message.success("Student edited successFully!");
      }
      if (result?.error?.status) {
        message.error(result.error.error);
      }
    } catch (error: any) {
      console.log("errror is:", error);
      console.log("error page", error.message);
    }
  };

  const defaultValues = {
    name: {
      firstName: studentData?.name?.firstName || "",
      lastName: studentData?.name?.lastName || "",
      middleName: studentData?.name?.middleName || "",
    },
    dateOfBirth: studentData?.dateOfBirth,
    gender: studentData?.gender,
    bloodGroup: studentData?.bloodGroup,
    email: studentData?.email,
    contactNo: studentData?.contactNo,
    emergencyContactNo: studentData?.emergencyContactNo,
    presentAddress: studentData?.presentAddress,
    permanentAddress: studentData?.permanentAddress,
    academicDepartment: studentData?.academicDepartment?.syncId || "",
    academicFaculty: studentData?.academicFaculty?.syncId || "",
    academicSemester: studentData?.academicSemester?.syncId || "",
    guardian: {
      fatherName: studentData?.guardian?.fatherName,
      fatherOccupation: studentData?.guardian?.fatherOccupation,
      fatherContactNo: studentData?.guardian?.fatherContactNo,
      motherName: studentData?.guardian?.motherName,
      motherOccupation: studentData?.guardian?.motherOccupation,
      motherContactNo: studentData?.guardian?.motherContactNo,
      address: studentData?.guardian?.address,
    },
    localGuardian: {
      name: studentData?.localGuardian?.name,
      occupation: studentData?.localGuardian?.occupation,
      contactNo: studentData?.localGuardian?.contactNo,
      address: studentData?.localGuardian?.address,
    },
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
            label: "manage-student",
            link: "/admin/manage-student",
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Edit Student</h1>
      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Student information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name.firstName"
                  size="large"
                  label="First Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name.middleName"
                  size="large"
                  label="First Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name.lastName"
                  size="large"
                  label="Last Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ACDepartmentField
                  name="academicDepartment"
                  label="Academic Department"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ACFacultyField
                  name="academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ACSemesterField
                  name="academicSemester"
                  label="Academic Semester"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="gender"
                  options={genderOptions}
                  label="Gender"
                  placeholder="Select"
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Student Basic information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  type="email"
                  name="email"
                  label="Email address"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput name="contactNo" label="Contact no." size="large" />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  name="emergencyContactNo"
                  label="Emergency contact no."
                  size="large"
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormDatePicker
                  name="dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="bloodGroup"
                  label="Blood group"
                  options={bloodGroupOptions}
                  size="large"
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="presentAddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="permanentAddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Guardian information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.fatherName"
                  label="Father name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.fatherOccupation"
                  label="Father occupation"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.fatherContactNo"
                  label="Father contact no."
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.motherName"
                  label="Mother name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.motherOccupation"
                  label="Mother occupation"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.motherContactNo"
                  label="Mother contact no."
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="guardian.address"
                  label="Address"
                  size="large"
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Local Guardian information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="localGuardian.name"
                  label="Local guardian name"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="localGuardian.occupation"
                  label="Local guardian occupation"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="localGuardian.contactNo"
                  label="Local guardian contact no."
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="localGuardian.address"
                  label="Local guardian address"
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditAdminPage;
