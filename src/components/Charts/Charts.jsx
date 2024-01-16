import { useEffect, useState } from "react";
import { fetchGobalData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Charts.module.css";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
export default function Charts({
  values: { confirmed, recovered, deaths },
  country,
}) {

  const [Gobaldata, setGobalData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const gobal = await fetchGobalData();
      setGobalData(gobal);
    };
    fetchAPI();
  }, []);

  const data = {
    labels: Gobaldata.map(({ date }) => {
      let a = new Date(date).toDateString();

      return a;
    }),
    datasets: [
      {
        label: "Infected",
        data: Gobaldata.map(({ confirmed }) => confirmed),
        borderColor: "#3333ff",
        fill: true,
      },
      {
        data: Gobaldata.map(({ deaths }) => deaths),
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.5)",
        fill: true,
      },
      {
        data: Gobaldata.map(({ recovered }) => recovered),
        label: "Recovered",
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.4)",
        fill: true,
      },
    ],
  };
  const options = {
    Plugin: {
      legend: true,
      filler: true,
    },
  };

  const data1 = {
    labels: ["Infected", "Recovered", "Deaths"],
    datasets: [
      {
        label: "People",
        backgroundColor: [
          "rgba(0,0,255,0.5)",
          "rgba(0,255,0,0.5)",
          "rgba(255,0,0,0.5)",
        ],
        data: [confirmed, recovered, deaths],
      },
    ],
  };

  const options1 = {
    legend: { display: false },
  };

  return (
    <div className={styles.container}>
      {country ? (
        <Bar  data={data1} options={options1}></Bar>
      ) : (
        <Line  data={data} options={options}></Line>
      )}
    </div>
  );
}

//   const barChart = confirmed ? (
//     <Bar
//       data={{
//         labels: ["Infected", "Recovered", "Deaths"],
//         datasets: [
//           {
//             label: "People",
//             backgroundColor: [
//               "rgba(0,0,255,0.5)",
//               "rgba(0,255,0,0.5)",
//               "rgba(255,0,0,0.5)",
//             ],
//             data: [confirmed, recovered, deaths],
//           },
//         ],
//       }}

//     />
//   ) : null;
