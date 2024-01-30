"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useStudentQuery } from "@/redux/api/studentApi";
import Image from "next/image";
import React from "react";

const AdminDetails = ({ params }: any) => {
  const { data: adminData, isLoading: loading } = useStudentQuery(params?.id);
  console.log("daa", adminData);
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "manage-student",
            link: "/admin/manage-student",
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Student Details</h1>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <h3>Id: {adminData?.id}</h3>
            <h3 style={{ textTransform: "capitalize" }}>
              FullName: {adminData?.name?.firstName}{" "}
              {adminData?.name?.middleName} {adminData?.name?.lastName}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Gender: {adminData?.gender}
            </h3>
            <h3>Email: {adminData?.email}</h3>
            <h3>Contact No: {adminData?.contactNo}</h3>
            <h3>Emergency Contact No: {adminData?.emergencyContactNo}</h3>
            <h3>Date of Birth: {adminData?.dateOfBirth}</h3>
            <h3>BloodGroup: {adminData?.bloodGroup}</h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Academic Semester: {adminData?.academicSemester?.title} - {adminData?.academicSemester?.year}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Academic Department: {adminData?.academicDepartment?.title}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Academic Faculty: {adminData?.academicFaculty?.title}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Permanent Address: {adminData?.permanentAddress}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Present Address: {adminData?.presentAddress}
            </h3>
            <h2>Guardian</h2>
            <h3 style={{ textTransform: "capitalize" }}>
              Father Name: {adminData?.guardian?.fatherName}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              father Contact No: {adminData?.guardian?.fatherContactNo}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Mother Name: {adminData?.guardian?.motherName}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Mother Contact No: {adminData?.guardian?.motherContactNo}
            </h3>
          </div>
          <Image
            src={adminData?.profileImage}
            width={200}
            height={200}
            alt="admin profile"
            style={{
              borderRadius: "10px",
              border: "2px solid #ddd",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
