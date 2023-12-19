import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const ExportDatePickerPopup = ({ value, setValue }) => {
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <>
      <div className="p-2">
        <Datepicker
          value={value}
          onChange={handleValueChange}
          showShortcuts={true}
        />
      </div>
    </>
  );
};

export default ExportDatePickerPopup;
