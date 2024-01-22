"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  bloodGroupOptions,
  genderOptions,
} from "@/constants/global";
import { Row, Col, Button, message } from "antd";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";

const EditAdminPage = ({params}:any) => {

  const {data:adminData,isLoading:loading} = useAdminQuery(params?.id);

  const [updateAdmin] = useUpdateAdminMutation();

  const { data } = useDepartmentsQuery({ limit: 100, page: 1 });

  //@ts-ignore
  const departments = data?.departments;

  const departmentOptions =
    departments &&
    departments?.map((department: { title: any; id: any }) => {
      return {
        label: department?.title,
        value: department?.id,
      };
    });
    
  const onSubmit = async (value: any) => {
    message.loading("Creating...");
    try {
      const result:any = await updateAdmin({id:params?.id,body:value}).unwrap();
      
      if(result?.id){
        message.success("Admin edited successFully!");
      }
      if(result?.error?.status){
          message.error(result.error.error)
      }
      
    } catch (error: any) {
      console.log("errror is:",error)
      console.log("error page",error.message);
    }

  };

  const defaultValues = {
    name: {
        firstName: adminData?.name?.firstName || "",
        lastName: adminData?.name?.lastName || "",
        middleName: adminData?.name?.middleName || "",
        },
        dateOfBirth: adminData?.dateOfBirth || "",
        email: adminData?.email || "",
        designation: adminData?.designation || "",
        contactNo: adminData?.contactNo || "",
        emergencyContactNo: adminData?.emergencyContactNo || "",
        permanentAddress: adminData?.permanentAddress || "",
        presentAddress: adminData?.presentAddress || "",
        bloodGroup: adminData?.bloodGroup || "",
        gender: adminData?.gender || "",
        managementDepartment: adminData?.managementDepartment?.id || "",

    }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "admin",
            link: "/super_admin/admin",
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Edit Admin</h1>
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
                <FormSelectField
                  size="large"
                  name="managementDepartment"
                  options={departmentOptions}
                  label="Department"
                  placeholder="Select"
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
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditAdminPage;
