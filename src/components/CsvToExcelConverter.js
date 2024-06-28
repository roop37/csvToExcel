import React, { useState } from "react";
import Papa from "papaparse";
import XLSX from "xlsx";

const CsvToExcelConverter = () => {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const convertCsvToExcel = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
          const data = result.data;
          const ws = XLSX.utils.aoa_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          XLSX.writeFile(wb, "output.xlsx");
        },
      });
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={convertCsvToExcel}
      >
        Convert CSV to Excel
      </button>
    </div>
  );
};

export default CsvToExcelConverter;
