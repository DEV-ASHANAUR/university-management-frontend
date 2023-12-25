"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";
import { Button, Input, Popconfirm, message } from "antd";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import { useState } from "react";

import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDebounce } from "@/redux/hooks";
import { useAdminsQuery, useDeletAdminMutation } from "@/redux/api/adminApi";
import { IDepartment } from "@/types";

const AdminPage = () => {
  const query: Record<string, any> = {};
  const [deletAdmin] = useDeletAdminMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");


  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useAdminsQuery({ ...query });

  const admins = data?.admins;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    // console.log("id",id)
    message.loading("Deleting...");
    try {
      await deletAdmin(id);
      message.success("Admins delete successfully!");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: function (data: Record<any,string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      }
    },{
      title: "Email",
      dataIndex: "email",
    },{
      title: "Department",
      dataIndex: "managementDepartment",
      render: function (data: IDepartment){
        return <>{data?.title}</>;
      }
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true
    },
    {
      title: "Contact no.",
      dataIndex:"contactNo",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/admin/details/${data.id}`}>
              <Button onClick={() => console.log(data)}
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </Link>

            <Link href={`/super_admin/admin/edit/${data.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this admin?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => deleteHandler(data)}
            >
              <Button type="primary" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;

    // console.log({order,field});
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb items={[{ label: "super_admin", link: "super_admin" }]} />
      <ActionBar title="Department List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{ width: "20%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href="/super_admin/admin/create">
            <Button type="primary">Create</Button>
          </Link>
          <Button
            type="primary"
            style={{ margin: "0px 5px" }}
            onClick={resetFilters}
          >
            <ReloadOutlined />
          </Button>
        </div>
      </ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={admins}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default AdminPage;
