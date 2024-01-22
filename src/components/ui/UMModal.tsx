import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";

interface IModal {
    id: string;
    title?: string;
    description: string;
    deleteHandler: (id:string) => void;
}

const UMModal = ({id,title="Delete this Task?",description,deleteHandler}:IModal) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      onConfirm={() => deleteHandler(id)}
    >
      <Button type="primary" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default UMModal;
