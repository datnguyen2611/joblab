import React, { useState } from "react";
import TableCountries from "../TableCountries";
import useStyles from "./styles";


const dataCountries = [
  {
    id: 1,
    country: "Kuwait",
    net_pay: 119920027,
    average_tax: 0.1,
    rank: 1,
    acronym: "kw",
  },
  {
    id: 2,
    country: "Saudi Arabia",
    net_pay: 119813371,
    average_tax: 0.2,
    rank: 2,
    acronym: "sa",
  },
  {
    id: 3,
    country: "United Arab Emirates",
    net_pay: 114000000,
    average_tax: 5.0,
    rank: 3,
    acronym: "ae",
  },
  {
    id: 4,
    country: "Qatar",
    net_pay: 114000000,
    average_tax: 5.0,
    rank: 4,
    acronym: "qa",
  },
  {
    id: 5,
    country: "Bahrain",
    net_pay: 111600000,
    average_tax: 7.0,
    rank: 5,
    acronym: "bh",
  },
  {
    id: 6,
    country: "Oman",
    net_pay: 111600000,
    average_tax: 7.0,
    rank: 6,
    acronym: "om",
  },
  {
    id: 7,
    country: "Egypt",
    net_pay: 90009008,
    average_tax: 25.0,
    rank: 7,
    acronym: "eg",
  },
  {
    id: 8,
    country: "Turkey",
    net_pay: 71476561,
    average_tax: 40.4,
    rank: 8,
    acronym: "tr",
  },
  {
    id: 9,
    country: "Israel",
    net_pay: 60150330,
    average_tax: 49.9,
    rank: 9,
    acronym: "il",
  },
];

const SectionMiddleEast = (props: any) => {
  const styles = useStyles();
  const [data] = useState(dataCountries);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>Middle East</div>
      <div className={styles.contentCountries}>
        <TableCountries dataCountries={data}/>
      </div>
    </section>
  );
};

export default SectionMiddleEast;
