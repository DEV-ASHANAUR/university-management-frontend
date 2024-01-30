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

const CreateRoomPage = () => {
  const [addRoom] = useAddRoomMutation();
  const { role } = getUserInfo() as any;

  const { data, isLoading } = useBuildingsQuery({ limit: 100, page: 1 });

  const buildings = data?.buildings;

  const buildingsOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("creating....");
    try {
      await addRoom(data);
      message.success("Room Created successFully!");
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
            label: "room",
            link: `/${role}/room`,
          },
        ]}
      />
      <h1>Create Room</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="roomNumber" label="Room Number" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormInput type="text" name="floor" label="Floor" />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                name="buildingId"
                label="Building"
                options={buildingsOptions as SelectOptions[]}
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

export default CreateRoomPage;
