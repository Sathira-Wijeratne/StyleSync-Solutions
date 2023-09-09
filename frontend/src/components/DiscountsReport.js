import React from "react";
import backgroundImage from "../images/reports.jpg";

const DiscountsReport = () => {
  // Define hardcoded data for the report
  const reportData = [
    {
      productName: "Product A",
      discountRate: 0.1, // 10% discount rate
      Month: 1,
      revenueBeforeDiscount: 100, // $100 revenue before discount
    },
    {
      productName: "Product B",
      discountRate: 0.15, // 15% discount rate
      Month: 1,
      revenueBeforeDiscount: 150, // $150 revenue before discount
    },
    {
      productName: "Product C",
      discountRate: 0.05, // 5% discount rate
      Month: 1,
      revenueBeforeDiscount: 80, // $80 revenue before discount
    },
  ];

  // Calculate revenue after discount based on discount rate
  const reportDataWithRevenueAfterDiscount = reportData.map((data) => ({
    ...data,
    revenueAfterDiscount: data.revenueBeforeDiscount * (1 - data.discountRate),
  }));
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      <h1>Discounts Report</h1>
      <table className="table">
        <thead class="thead-dark">
          <tr>
            <th className="label-bold-black">Product Name</th>
            <th className="label-bold-black">Discount Rate</th>
            <th className="label-bold-black">Month</th>
            <th className="label-bold-black">Revenue Before Discount</th>
            <th className="label-bold-black">Revenue After Discount</th>
          </tr>
        </thead>
        <tbody>
          {reportDataWithRevenueAfterDiscount.map((data, index) => (
            <tr key={index}>
              <td className="label-bold-black">{data.productName}</td>
              <td className="label-bold-black">{`${(
                data.discountRate * 100
              ).toFixed(2)}%`}</td>
              <td className="label-bold-black">{data.Month}</td>
              <td className="label-bold-black">
                ${data.revenueBeforeDiscount.toFixed(2)}
              </td>
              <td className="label-bold-black">
                ${data.revenueAfterDiscount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountsReport;
