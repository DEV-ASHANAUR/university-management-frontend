"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, { SelectOptions } from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useBuildingQuery,
  useBuildingsQuery,
  useUpdateBuildingMutation,
} from "@/redux/api/buildingApi";
import { useRoomQuery, useUpdateRoomMutation } from "@/redux/api/roomApi";
import { Button, Col, Row, message } from "antd";

type IDProps = {
  params: any;
};

const EditRoomPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useBuildingsQuery({ limit: 100, page: 1 });

  const buildings = data?.buildings;

  const buildingsOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  const { data: RoomData } = useRoomQuery(id);
  const [updateRoom] = useUpdateRoomMutation();
  // @ts-ignore
  const defaultValues = {
    roomNumber: RoomData?.roomNumber || "",
    floor: RoomData?.floor || "",
    buildingId: RoomData?.buildingId || "",
  };

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating.....");
    try {
      //   console.log(data);
      const result = await updateRoom({ id, body: values }).unwrap();
      if (result?.id) {
        message.success("Room updated successfully");
      } else {
        message.error("Something Went Wrong!");
      }
    } catch (err: any) {
      message.error(err.message);
    }
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
            label: "room",
            link: "/admin/room",
          },
        ]}
      />
      <ActionBar title="Update Room"></ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditRoomPage;
