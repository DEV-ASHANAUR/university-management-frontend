import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { USER_ROLE } from "@/constants/role";
import { sidebarItems } from "@/constants/sidebarItems";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const role = USER_ROLE.ADMIN;
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "1.rem",
          marginTop: "1rem",
          marginLeft:"1.7rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        {collapsed ? "PHU" : "PH-University"}
        
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;
