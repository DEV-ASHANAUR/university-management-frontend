"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  bloodGroupOptions,
  departmentOptions,
  genderOptions,
} from "@/constants/global";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button } from "antd";

const CreateFacultyPage = () => {
  const { role } = getUserInfo() as any;
  const onSubmit = (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "manage-faculty",
            link: `/${role}/manage-faculty`,
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Create Faculty</h1>

      <Form submitHandler={onSubmit}>
        {/* Faculty Infomation */}
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
            Faculty Infomation
          </p>
          <Row gutter={{ xs: 24, xl: 8, md: 24, lg: 8 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="faculty.name.firstName"
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
                name="faculty.name.middleName"
                size="large"
                label="Middle Name"
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
                name="faculty.name.lastName"
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
              <FormInput
                type="password"
                name="password"
                size="large"
                label="Password"
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
                name="faculty.gender"
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
              <FormSelectField
                size="large"
                name="faculty.academicDepartment"
                options={departmentOptions}
                label="Academic Department"
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
              <UploadImage name="file" />
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
                name="faculty.email"
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
                name="faculty.contactNo"
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
                name="faculty.emergencyContactNo"
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
                name="faculty.dateOfBirth"
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
                name="faculty.bloodGroup"
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
                name="faculty.designation"
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
                name="faculty.presentAddress"
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
                name="faculty.permanentAddress"
                label="Permanent Address"
                rows={4}
              />
            </Col>
          </Row>
        </div>
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateFacultyPage;
