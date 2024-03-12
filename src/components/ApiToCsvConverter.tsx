import React, { useState } from "react";
import Papa from "papaparse";
import { IoMdCloudDownload } from "react-icons/io";
import { FaFileCsv } from "react-icons/fa6";

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
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();

      const csvData = Papa.unparse(jsonData);

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
