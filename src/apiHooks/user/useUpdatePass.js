import useAxios from "@/apiConfig/axiosInstance";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useUpdatePass = () => {
  const api = useAxios();

  const [loading, setloading] = useState(false);
  const updatePassword = async (payload, setpass) => {
    setloading(true);
    try {
      const { data, status } = await api.post("/update-password", payload);
      if (status === 200) {
        toast.success(data?.message);
        setpass("");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error While Updating Password!, Please Try Again");
    } finally {
      setloading(false);
    }
  };
  return { loading, updatePassword };
};

export default useUpdatePass;
