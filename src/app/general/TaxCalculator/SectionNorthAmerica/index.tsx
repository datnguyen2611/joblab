import React, { useState } from "react";
import TableCountries from "../TableCountries";
import useStyles from "./styles";


const dataCountries = [
  {
    id: 1,
    country: "USA",
    net_pay: 64224979,
    average_tax: 46.5,
    rank: 1,
    acronym: "us",
  },
  {
    id: 2,
    country: "Canada",
    net_pay: 55979645,
    average_tax: 53.4,
    rank: 2,
    acronym: "ca",
  },
];

const SectionNorthAmerica = (props: any) => {
  const styles = useStyles();
  const [data] = useState(dataCountries);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>North America</div>
      <div className={styles.contentCountries}>
        <TableCountries dataCountries={data}/>
      </div>
    </section>
  );
};

export default SectionNorthAmerica;
