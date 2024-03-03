import React, { useState } from "react";
import Papa from "papaparse";

const ApiToCsvConverter = () => {
  const [csvData, setCsvData] = useState("");

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();

      const csv = Papa.unparse(jsonData);

      setCsvData(csv);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([csvData], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  return (
    <div>
      <button
        onClick={fetchDataFromApi}
        style={{ color: "white", backgroundColor: "blue" }}
      >
        Fetch Data and Convert to CSV
      </button>
      {csvData && (
        <div>
          <button
            onClick={handleDownloadCsv}
            style={{ color: "white", backgroundColor: "blue" }}
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiToCsvConverter;
