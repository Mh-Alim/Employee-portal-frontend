import React, { useState } from "react";
import Papa from "papaparse";
import { IoMdCloudDownload } from "react-icons/io";
import { FaFileCsv } from "react-icons/fa6";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

const ApiToCsvConverter = () => {
  const [csvData, setCsvData] = useState("");

  const handleDownloadCsv = (csvData: string) => {
    const blob = new Blob([csvData], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  const fetchDataFromApi = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const user_email = getEmailFromLocalStorage();
      if (!token || !user_email) {
        alert("token or user email doesnt exist");
        return;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ user_email }), // Convert data to JSON string
      };

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-all`,
        options
      );
      const jsonData = await res.json();
      console.log("csv data: ", jsonData.data);
      const csvData = Papa.unparse(jsonData.data);

      handleDownloadCsv(csvData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button
        onClick={fetchDataFromApi}
        className=" bg-[#6e40c9] p-3  rounded-full "
      >
        <FaFileCsv />
      </button>
    </div>
  );
};

export default ApiToCsvConverter;
