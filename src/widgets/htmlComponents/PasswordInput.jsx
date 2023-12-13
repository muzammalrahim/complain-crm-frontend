import useUpdatePass from "@/apiHooks/user/useUpdatePass";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PasswordInput = ({ user }) => {
  const { loading, updatePassword } = useUpdatePass();
  const [password, setpassword] = useState("");
  const handlePasswordClick = () => {
    try {
      const { _id } = user;
      //   /update-password
      if (!password.match(/^.{8,}$/)) {
        toast.error("Password should be atleast 8 characters");
        return;
      }
      updatePassword({ _id, password }, setpassword);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center gap-2">
      <input
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Enter Password Here"
        className="rounded-lg border-2 border-[gray] px-3 py-1 "
      />
      <Button
        disabled={loading}
        onClick={handlePasswordClick}
        className="p-2 px-3"
      >
        {loading ? "Updating..." : "Update"}
      </Button>
    </div>
  );
};

export default PasswordInput;
