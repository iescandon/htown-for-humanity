import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Doughnut } from "react-chartjs-2";

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
        // plugins: {
        //   deferred: {
        //     xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
        //     yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
        //     delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
        //   }
        // },
    responsive: true,
  };

  return (
    <>
      <Doughnut data={data} options={config} />
    </>
  );
}

export default DonutChart;
