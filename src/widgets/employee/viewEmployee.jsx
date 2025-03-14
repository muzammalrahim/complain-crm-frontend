import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import useGetUsers from "@/apiHooks/user/userGetUsers";
import CustomTable from "../htmlComponents/CustomTable";

export const ViewEmployee = ({ committee }) => {
  const { loading, fetchUsers, users } = useGetUsers();

  useEffect(() => {
    fetchUsers({ role: committee ? "Committee" : "Official" });
  }, []);

  let headings = ["Name", "Email", "Designation", "Phone number"];
  if (committee) {
    headings = ["Name", "Email", "Phone number"];
  }
  return (
    <div>
      <table className="hidden w-full">
        <thead>
          <tr>
            {["Name", "Email", "Designation", "Phone number"].map((el) => (
              <th
                key={el}
                className="border-b border-blue-gray-50 py-3 px-5 text-left"
              >
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {el}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && <div>Loading...</div>}
          {users?.length === 0 && !loading && (
            <div className=" text-gray-700">No Employees Found</div>
          )}
          {users?.map((employee) => (
            <tr className="border-2 border-black" key={employee._id}>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.name}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.email}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.designation}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomTable headings={headings} tableData={users} />
    </div>
  );
};

export default ViewEmployee;
