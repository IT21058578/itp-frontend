import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "flowbite-react";

const GenericPdfDownloader = ({ rootElementId, downloadFileName }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <Button color="success" onClick={downloadPdfDocument}>
      Download
    </Button>
  );

  // return <button onClick={downloadPdfDocument}>Download Pdf</button>;
};

export default GenericPdfDownloader;
