import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

function DonutChart({content}) {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [content.cashOnlineDonations, content.giftCardDonations, content.inKindDonations],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 2,
      },
    ],
  };

  const config = {
    plugins: {
      // show legends for our graph
      legend: {
        display: true,
      },
    },
    responsive: true,
  };

  return (
    <>
      <Doughnut data={data} options={config} />
    </>
  );
}

export default DonutChart;
