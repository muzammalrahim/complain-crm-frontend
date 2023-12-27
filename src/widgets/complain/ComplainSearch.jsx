import React, { useState } from "react";
import SelectStatus from "../htmlComponents/StatusSelect";
import { Button, Input } from "@material-tailwind/react";
import DateSelector from "../htmlComponents/DateSelector";
import SearchInput from "../htmlComponents/SearchInput";
import ExportPdfPopup from "./ExportPdfPopup";
import ExportCsvPopup from "./ExportCsvPopup";
import useAxios from "@/apiConfig/axiosInstance";

const ComplainSearch = ({ fetchComplains }) => {
  const api = useAxios();

  const [searchData, setsearchData] = useState({});

  const [userId, setuserId] = useState("");

  const handleSearch = () => {
    // console.log({ ...searchData, userId });
    // fetchComplains({ ...searchData, userId });
    if (userId) {
      fetchComplains({ userId });
    } else if (searchData) {
      fetchComplains({ ...searchData });
    } else {
      fetchComplains({ ...searchData, userId });
    }
    handleReset();
  };
  const handleReset = () => {
    setuserId("");
    setsearchData({});
  };

  return (
    <>
      <div className="flex  gap-6">
        <SelectStatus setSearch={setsearchData} />
        <DateSelector setSearch={setsearchData} />

        <SearchInput setuserId={setuserId} setSearch={setsearchData} />

        <Button onClick={handleSearch}>Search Complaints</Button>
        {/* <div className="flex justify-center">
          <Button
            onClick={() =>
              //  navigate("/complain-pdf")
              handleDownloadCSV()
            }
          >
            Export PDF
          </Button>
        </div> */}
        {/* <Button onClick={handleSearch}>Export as PDF</Button> */}
        <ExportPdfPopup />
        <ExportCsvPopup />
      </div>
    </>
  );
};

export default ComplainSearch;
