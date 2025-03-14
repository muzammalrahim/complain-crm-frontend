import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAddComplain = () => {
  const api = useAxios();

  const nav = useNavigate();
  const addComplain = async (complain) => {
    console.log(complain);
    try {
      const { data, status } = await api.post("/complain", complain);
      if (status === 200) {
        toast.success("Your Complain is Added");
        nav("/dashboard/complain-list");
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return addComplain;
};

export default useAddComplain;
