import React from "react";
import { Layout, Row, Space, Avatar, Dropdown, MenuProps, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logout} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const {role} = getUserInfo() as any;
  return (
    <AntHeader style={{ background: "#fff" }}>
      <Row justify="end" align="middle" style={{ height: "100%" }}>
        <p style={{
            margin:"0px 5px",
            fontWeight:"bold",
            fontSize: "1rem"
        }}>
            {role}
        </p>
        <Dropdown menu={{items}}>
          <a>
            <Space>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
