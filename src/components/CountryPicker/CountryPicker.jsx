import { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@mui/material";
import styles from "./CountryPicker.module.css";
import { countries } from "../../api/index";
export default function CountryPicker({ diffUrl, countryName }) {
  const [country, setCountry] = useState([]);
  useEffect(() => {
    async function countryfetcher() {
      const country = await countries();

      country.map(({ location: { countryOrRegion, isoCode } }) =>
        setCountry((pre) => [...pre, { countryOrRegion, isoCode }])
      );
    }
    countryfetcher();
  }, []);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => diffUrl(e.target.value)}>
        <option value="">Gobal</option>
        {country.map((item, i) => (
          <option key={i} value={item.isoCode}>
            {item.countryOrRegion}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
