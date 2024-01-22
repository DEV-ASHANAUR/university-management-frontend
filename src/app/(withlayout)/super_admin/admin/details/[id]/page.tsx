"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery } from "@/redux/api/adminApi";
import Image from "next/image";
import React from "react";

const AdminDetails = ({ params }: any) => {
  const { data: adminData, isLoading: loading } = useAdminQuery(params?.id);
  console.log("daa", adminData);
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "admin",
            link: "/super_admin/admin",
          },
        ]}
      />
      <h1 style={{ margin: "10px 0" }}>Admin Details</h1>
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
              Designation: {adminData?.designation}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Management Department: {adminData?.managementDepartment?.title}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Permanent Address: {adminData?.permanentAddress}
            </h3>
            <h3 style={{ textTransform: "capitalize" }}>
              Present Address: {adminData?.presentAddress}
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
