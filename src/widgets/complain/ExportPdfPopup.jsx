import React, { useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import ExportDatePickerPopup from "./ExportDatePickerPopup";
import useAxios from "@/apiConfig/axiosInstance";
const ExportPdfPopup = () => {
  const api = useAxios();
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDownloadCSV = async () => {
    try {
      // Make a POST request to generate the CSV on button click
      const response = await api.post("/export-complains", { date });

      // Extract CSV data from the response
      const csvData = response.data;

      // Create a Blob and initiate the download
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${"output - " + Date.now() + ".csv"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleExportModal = () => {
    console.log("handleModal");
    handleDownloadCSV();
  };
  return (
    <>
      {/* <div onClick={() => handleUserModal(id)}>{userName}</div> */}
      <Popover
        placement="bottom"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button variant="text" onClick={() => {}}>
            Export as CSV
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <div className="">
            <p>Select Range</p>
            <ExportDatePickerPopup value={date} setValue={setDate} />
            <div className="flex justify-center">
              <Button onClick={() => handleExportModal()}>Export</Button>
            </div>
            {/* <button className="border border-gray-600 px-4 py-2">Export</button> */}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ExportPdfPopup;
