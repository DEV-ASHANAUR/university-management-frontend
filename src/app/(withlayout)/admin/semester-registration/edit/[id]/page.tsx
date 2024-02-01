"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import dayjs from "dayjs";
import {
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationsMutation,
} from "@/redux/api/semesterRegistrationApi";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import ACSemesterField from "@/components/Forms/ACSemesterField";
import { semesterRegistrationStatus } from "@/constants/global";
import FormSelectField from "@/components/Forms/FormSelectField";

const EditSemesterRegistrationPage = ({ params }: { params: any }) => {
  const { id } = params;
  const { data, isLoading } = useSemesterRegistrationQuery(id);

  const [updateSemesterRegistrations] =
    useUpdateSemesterRegistrationsMutation();
  const { role } = getUserInfo() as any;

  const onSubmit = async (values: any) => {
    const tempObject = { ...values };
    tempObject["startDate"] = dayjs(tempObject["startDate"]).toISOString();
    tempObject["endDate"] = dayjs(tempObject["endDate"]).toISOString();
    tempObject["minCredit"] = Number(tempObject["minCredit"]);
    tempObject["maxCredit"] = Number(tempObject["maxCredit"]);

    // console.log(tempObject);
    message.loading("updating....");
    try {
      const result = await updateSemesterRegistrations({
        id,
        body: tempObject,
      }).unwrap();
      if (result?.id) {
        message.success("Semester Registrations Updated successFully!");
      } else {
        message.error("failed!");
      }
    } catch (error: any) {
      console.log(error?.errorMessages);
      message.error("failed!");
    }
  };

  const statusOptions = semesterRegistrationStatus
    ?.map((status) => {
      return {
        label: status,
        value: status,
        disabled: false,
      };
    })
    .map((el) => {
      if (data?.status === "UPCOMING") {
        if (el.value === "ENDED") {
          el.disabled = true;
        }
      } else if (data?.status === "ONGOING") {
        if (el.value === "UPCOMING") {
          el.disabled = true;
        }
      } else if (data?.status === "ENDED") {
        if (el.value === "UPCOMING" || el.value === "ONGOING") {
          el.disabled = true;
        }
      }
      return el;
    });

  const defaultValues = {
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    academicSemesterId: data?.academicSemester?.id || "",
    minCredit: data?.minCredit || "",
    maxCredit: data?.maxCredit || "",
    status: data?.status || "",
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          {
            label: "semester-registration",
            link: `/${role}/semester-registration`,
          },
        ]}
      />
      <h1>Edit Semester Registration</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormDatePicker
                name="startDate"
                label="Start Date"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormDatePicker name="endDate" label="End Date" size="large" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <ACSemesterField
                name="academicSemesterId"
                label="Academic Semester"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="minCredit" label="Min Credit" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="maxCredit" label="Max Credit" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                options={statusOptions}
                name="status"
                label="status"
              />
            </div>
          </Col>
        </Row>
        <Button htmlType="submit" type="primary">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditSemesterRegistrationPage;
