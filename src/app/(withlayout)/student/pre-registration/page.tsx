"use client";
import UMCollapse, { ItemProps } from "@/components/Forms/UMCollapse";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useConfirmMyRegistrationMutation,
  useEnrollIntoCourseMutation,
  useMySemesterRegistrationCoursesQuery,
  useWithdrawFromCourseMutation,
} from "@/redux/api/semesterRegistrationApi";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import React from "react";

const ViewPreregistrationPage = () => {
  const { data, isLoading } = useMySemesterRegistrationCoursesQuery({});
  const [enrollIntoCourse] = useEnrollIntoCourseMutation();
  const [withdrawFromCourse] = useWithdrawFromCourseMutation();
  const [confirmMyRegistration] = useConfirmMyRegistrationMutation();

  const handleEnroll = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }) => {
    try {
      await enrollIntoCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
    } catch (error: any) {
      message.error(error);
    }
  };

  const handleWithdraw = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }) => {
    try {
      await withdrawFromCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const handleConfirmRegistration = async () => {
    try {
      const res = await confirmMyRegistration({});
      if(res?.data){
        message.success(res?.data?.message);
      }  
      if(res?.error?.error){
        message.error(res?.error?.error);
      }
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const availableCourses: ItemProps[] = data?.map(
    (availableCourse: any, index: number) => {
      const obj = {
        key: index,
        label: availableCourse?.course?.title,
        isTaken: availableCourse.isTaken,
        children: (
          <table
            style={{
              padding: "0px 10px",
              borderRadius: "10px 15px",
              width: "100%",
            }}
          >
            {availableCourse?.offeredCourseSections?.map(
              (section: any, index: number) => {
                return (
                  <tr
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      margin: "10px 0",
                    }}
                  >
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        Sec - {section?.title}{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        Enrolled - ({section?.currentlyEnrolledStudent}/
                        {section?.maxCapacity})
                      </span>
                    </td>
                    <td>
                      <table
                        style={{
                          border: "1px solid #d9d9d9",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid black",
                            textTransform: "capitalize",
                          }}
                          colSpan={3}
                        >
                          class schedule
                        </th>
                        {section?.offeredCourseClassSchedules?.map(
                          (el: any, index: number) => {
                            return (
                              <tr key={index} style={{ width: "30%" }}>
                                <td
                                  style={{
                                    fontWeight: 700,
                                    marginRight: "10px",
                                    textTransform: "capitalize",
                                    textAlign: "right",
                                  }}
                                >
                                  {el?.dayOfWeek}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "0px 15px",
                                  }}
                                >
                                  {el?.startTime} - {el?.endTime}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </table>
                    </td>
                    <td>
                      {availableCourse?.isTaken && section?.isTaken ? (
                        <Button
                          type="primary"
                          danger
                          onClick={() =>
                            handleWithdraw({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Withdraw
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          disabled={availableCourse?.isTaken}
                          onClick={() =>
                            handleEnroll({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Enroll
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </table>
        ),
      };
      return obj;
    }
  );

  const isAtLeastOneCourseTaken =
    availableCourses?.filter((el: ItemProps) => el.isTaken === true).length > 0
      ? true
      : false;

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  const base = "student";
  return (
    <>
      <UMBreadCrumb items={[{ label: `${base}`, link: `/${base}` }]} />
      <ActionBar title="Course Pre-registration" />
      <UMCollapse
        items={availableCourses}
        defaultActiveKey={availableCourses?.map((item) => item.key)}
      />
      <div style={{ margin: "10px 0" }}></div>
      {isAtLeastOneCourseTaken && (
        <Popconfirm
          title="Confirm Registration?"
          description="Are you sure! You want to confirm registration!"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => handleConfirmRegistration()}
        >
          <Button type="primary">
            Confirm Registration
          </Button>
        </Popconfirm>
      )}
    </>
  );
};

export default ViewPreregistrationPage;
