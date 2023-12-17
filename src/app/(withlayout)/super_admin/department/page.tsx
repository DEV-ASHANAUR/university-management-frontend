"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";
import { Button } from "antd";
import ActionBar from "@/components/ui/ActionBar";

const ManageDepartmentPage = () => {
  return (
    <div>
      <UMBreadCrumb items={[{ label: "super_admin", link: "super_admin" }]} />

      <ActionBar title="Department List">
        <Link href="/super_admin/department/create">
          <Button type="primary">Create</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default ManageDepartmentPage;
