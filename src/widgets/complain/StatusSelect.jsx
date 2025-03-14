import useUpdateStatus from "@/apiHooks/status/useUpdateStatus";
import { Option, Select } from "@material-tailwind/react";
import React from "react";

const StatusSelect = ({
  setvalue,
  data,
  id,
  disable,
  complainId,
  fetchComplains,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const defaultVal = data?.find((e) => e?._id === id);
  const updateStatus = useUpdateStatus();
  // console.log(userId)
  const statusChange = async (status) => {
    // setvalue(status);
    // console.log({ _id: id, status });
    const updated = await updateStatus({
      _id: complainId,
      status,
      officialId: userId,
    });
    if (updated) {
      fetchComplains();
    }
  };
  return (
    <>
      {defaultVal?.id && (
        <Select
          disabled={disable}
          label="Select Status"
          value={defaultVal?._id}
          className="rounded-lg px-2 py-1"
          onChange={statusChange}
        >
          {data?.map((e) => (
            <Option key={e?._id} value={e?._id}>
              {e?.name}
            </Option>
          ))}
        </Select>
      )}
      {!defaultVal?.id && (
        <Select
          disabled={disable}
          label="Select Status"
          value={defaultVal?._id}
          className="rounded-lg px-2 py-1"
          onChange={statusChange}
        >
          {data?.map((e) => (
            <Option key={e?._id} value={e?._id}>
              {e?.name}
            </Option>
          ))}
        </Select>
      )}
    </>
  );
};

export default StatusSelect;
