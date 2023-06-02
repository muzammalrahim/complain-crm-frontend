import useUpdateStatus from "@/apiHooks/status/useUpdateStatus";
import { Option, Select } from "@material-tailwind/react";
import React from "react";

const StatusSelect = ({ setvalue, data, id, disable, complainId }) => {
  const updateStatus = useUpdateStatus();

  const defaultVal = data?.find((e) => e?._id === id);
  const statusChange = (status) => {
    // setvalue(status);
    // console.log({ _id: id, status });
    updateStatus({
      _id: complainId,
      status,
    });
  };
  return (
    <>
      <Select
        disabled={disable}
        label="Select Status"
        value={defaultVal?._id}
        className="rounded-lg  border-[1.5px] border-gray-500 px-2 py-1"
        onChange={statusChange}
      >
        {data?.map((e) => (
          <Option key={e?._id} value={e?._id}>
            {e?.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default StatusSelect;
