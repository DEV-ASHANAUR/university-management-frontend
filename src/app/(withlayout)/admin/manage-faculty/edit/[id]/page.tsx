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
import { useFacultyQuery, useUpdateFacultyMutation } from "@/redux/api/facultyApi";

const EditAdminPage = ({ params }: any) => {
  const { data: facultyData, isLoading: loading } = useFacultyQuery(params?.id);

  const [updateFaculty] = useUpdateFacultyMutation();

  const onSubmit = async (value: any) => {
    console.log("up value,",value)
    message.loading("Creating...");
    try {
      const result: any = await updateFaculty({
        id: params?.id,
        body: value,
      }).unwrap();

      if (result?.id) {
        message.success("Faculty edited successFully!");
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
      firstName: facultyData?.name?.firstName || "",
      lastName: facultyData?.name?.lastName || "",
      middleName: facultyData?.name?.middleName || "",
    },
    dateOfBirth: facultyData?.dateOfBirth || "",
    email: facultyData?.email || "",
    designation: facultyData?.designation || "",
    contactNo: facultyData?.contactNo || "",
    emergencyContactNo: facultyData?.emergencyContactNo || "",
    permanentAddress: facultyData?.permanentAddress || "",
    presentAddress: facultyData?.presentAddress || "",
    bloodGroup: facultyData?.bloodGroup || "",
    gender: facultyData?.gender || "",
    academicDepartment: facultyData?.academicDepartment?.syncId || "",
    academicFaculty: facultyData?.academicFaculty?.syncId || "",
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
            label: "Manage-Faculty",
            link: "/admin/manage-faculty",
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Edit Faculty</h1>
      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d6",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Admin Infomation
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col
                className="gutter-row"
                span={6}
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
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name.middleName"
                  size="large"
                  label="Middle Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
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
                <FormSelectField
                  size="large"
                  name="gender"
                  options={genderOptions}
                  label="Gender"
                  placeholder="Select"
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
                <ACDepartmentField
                  name="academicDepartment"
                  label="Academic Department"
                />
              </Col>
            </Row>
          </div>
          {/** basic info */}
          <div
            style={{
              border: "1px solid #d9d9d6",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Basic Infomation
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
                  type="email"
                  name="email"
                  size="large"
                  label="Email address"
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
                  name="contactNo"
                  size="large"
                  label="Contact No."
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
                  name="emergencyContactNo"
                  size="large"
                  label="Emergency Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="dateOfBirth"
                  size="large"
                  label="Date of Birth"
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
                  name="bloodGroup"
                  options={bloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
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
                  size="large"
                  name="designation"
                  label="Designation"
                />
              </Col>
              <Col
                className="gutter-row"
                span={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  size="large"
                  name="presentAddress"
                  label="Present Address"
                  rows={4}
                />
              </Col>

              <Col
                className="gutter-row"
                span={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  size="large"
                  name="permanentAddress"
                  label="Permanent Address"
                  rows={4}
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
