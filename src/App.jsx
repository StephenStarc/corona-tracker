import { useEffect, useState } from "react";
import logo from "./assets/logo.jpg";
import styles from "./App.module.css";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Charts from "./components/Charts/Charts";
import { fetchData } from "./api";

function App() {
  const [data, setData] = useState({
    values: {},
    country: "",
  });

  useEffect(() => {
    async function receivedData() {
      const fetchedData = await fetchData();
      setData(() => ({
        values: fetchedData,
        country: "",
      }));
    }
    receivedData();
  }, []);

  async function diffUrl(country) {
    const newData = await fetchData(country);
    setData(() => ({
      values: newData,
      country: country,
    }));
  }
  const { values} = data;


  return (
    <div className={styles.container}>
      <img classname={styles.image} alt="covid-19 logo" src={logo}></img>
      <Cards data={values}></Cards>
      <CountryPicker diffUrl={diffUrl} />
      <Charts values={values} country={data.country} />
    </div>
  );
}

export default App;
