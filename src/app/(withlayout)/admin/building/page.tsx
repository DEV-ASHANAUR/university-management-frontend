"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";
import { Button, Input, message } from "antd";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import { useState } from "react";
import dayjs from "dayjs";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDebounce } from "@/redux/hooks";
import UMModal from "@/components/ui/UMModal";
import { useBuildingsQuery, useDeleteBuildingMutation } from "@/redux/api/buildingApi";

const ManageBuilding = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteBuilding] = useDeleteBuildingMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useBuildingsQuery({ ...query });

  const buildings = data?.buildings;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      await deleteBuilding(id);
      message.success("Building deleted successfully!");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D,YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/building/edit/${data.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>

            <UMModal
              id={data?.id}
              description="Are You sure you want to delete this Building?"
              deleteHandler={deleteHandler}
            />
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
      <ActionBar title="Building List">
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
          <Link href="/admin/building/create">
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
        dataSource={buildings}
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

export default ManageBuilding;
