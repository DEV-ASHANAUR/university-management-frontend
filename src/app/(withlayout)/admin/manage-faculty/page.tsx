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
import { IDepartment } from "@/types";
import UMModal from "@/components/ui/UMModal";
import { useDeleteFacultyMutation, useFacultiesQuery } from "@/redux/api/facultyApi";

const AdminPage = () => {
  const query: Record<string, any> = {};
  const [deleteFaculty] = useDeleteFacultyMutation();

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

  const { data, isLoading } = useFacultiesQuery({ ...query });

  const faculties = data?.faculties;
  console.log("first",faculties)
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      await deleteFaculty(id);
      message.success("Faculty deleted successfully!");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  
  const columns = [
    {
      title: "Id",
      dataIndex: "facultyId",
      sorter: true,
    },
    {
      title: "Name",
      render: function (data: Record<any,string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      }
    },{
      title: "Email",
      dataIndex: "email",
    },{
      title: "Department",
      dataIndex: "academicDepartment",
      render: function (data: IDepartment){
        return <>{data?.title}</>;
      }
    },
    {
      title: "Designation",
      dataIndex: "designation"
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
      dataIndex: "facultyId",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/manage-faculty/details/${data}`}>
              <Button onClick={() => console.log(data)}
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </Link>

            <Link href={`/admin/manage-faculty/edit/${data}`}>
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
            <UMModal id={data} description="Are You sure you want to delete this Faculty?" deleteHandler={deleteHandler} />
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
      <UMBreadCrumb items={[{ label: "admin", link: "admin" }]} />
      <ActionBar title="Faculty List">
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
          <Link href="/admin/manage-faculty/create">
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
        dataSource={faculties}
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
