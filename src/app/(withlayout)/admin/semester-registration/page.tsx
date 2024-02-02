"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";
import { Button, Input, Tooltip, message } from "antd";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import { useState } from "react";
import dayjs from "dayjs";
import {
  EditOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDebounce } from "@/redux/hooks";
import UMModal from "@/components/ui/UMModal";
import {
  useCoursesQuery,
  useDeleteCourseMutation,
} from "@/redux/api/courseApi";
import {
  useDeleteSemesterRegistrationsMutation,
  useSemesterRegistrationQuery,
  useSemesterRegistrationsQuery,
  useStartNewSemesterMutation,
} from "@/redux/api/semesterRegistrationApi";
import { start } from "repl";

const SemesterRegistrationPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteSemesterRegistrations] =
    useDeleteSemesterRegistrationsMutation();
  const [startNewSemester] = useStartNewSemesterMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useSemesterRegistrationsQuery({ ...query });

  const semesterRegistrations = data?.semesterRegistrations;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      await deleteSemesterRegistrations(id);
      message.success("Semester Registrations deleted successfully!");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleStartSemester = async (id: string) => {
    try {
      const res = await startNewSemester(id);
      console.log("message", res);
      if (res?.data?.message) {
        message.success(res?.data?.message);
      }
      if (res?.error?.error) {
        message.error(res?.error?.error);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Credit",
      render: function (data: any) {
        return (
          <>
            Min-{data?.minCredit} Max-{data?.maxCredit}
          </>
        );
      },
    },
    {
      title: "Semester",
      dataIndex: "academicSemester",
      render: function (data: any) {
        return (
          <>
            {data?.title}-{data?.year}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
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
            <Link href={`/admin/semester-registration/edit/${data.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>

            {data?.status === "ENDED" &&
              data?.academicSemester?.isCurrent == false && (
                <Tooltip title="Start Semester" placement="bottom">
                  <Button
                    type="primary"
                    onClick={() => handleStartSemester(data?.id)}
                    style={{
                      margin: "0px 5px",
                    }}
                  >
                    <PlayCircleOutlined />
                  </Button>
                </Tooltip>
              )}

            <UMModal
              id={data?.id}
              description="Are You sure you want to delete this Registration?"
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
      <ActionBar title="Semester Registration List">
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
          <Link href="/admin/semester-registration/create">
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
        dataSource={semesterRegistrations}
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

export default SemesterRegistrationPage;
