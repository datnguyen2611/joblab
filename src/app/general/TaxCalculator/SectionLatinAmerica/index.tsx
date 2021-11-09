import React, { useState } from "react";
import TableCountries from "../TableCountries";
import useStyles from "./styles";


const dataCountries = [
  {
    id: 1,
    country: "Guatemala",
    net_pay: 105810033,
    average_tax: 11.8,
    rank: 1,
    acronym: "gt",
  },
  {
    id: 2,
    country: "Brazil",
    net_pay: 87005767,
    average_tax: 27.5,
    rank: 2,
    acronym: "br",
  },
  {
    id: 3,
    country: "Colombia",
    net_pay: 80476005,
    average_tax: 32.9,
    rank: 3,
    acronym: "co",
  },
  {
    id: 4,
    country: "Mexico",
    net_pay: 78046744,
    average_tax: 35.0,
    rank: 4,
    acronym: "mx",
  },
  {
    id: 5,
    country: "Puerto Rico",
    net_pay: 77628653,
    average_tax: 35.3,
    rank: 5,
    acronym: "pr",
  },
  {
    id: 6,
    country: "Costa Rica",
    net_pay: 77470280,
    average_tax: 35.4,
    rank: 6,
    acronym: "cr",
  },
  {
    id: 7,
    country: "Panama",
    net_pay: 76851723,
    average_tax: 36.0,
    rank: 7,
    acronym: "pa",
  },
  {
    id: 8,
    country: "Uruguay",
    net_pay: 73128133,
    average_tax: 39.1,
    rank: 8,
    acronym: "uy",
  },
  {
    id: 9,
    country: "Chile",
    net_pay: 71470374,
    average_tax: 40.4,
    rank: 9,
    acronym: "cl",
  },
  {
    id: 10,
    country: "Argentina",
    net_pay: 70803934,
    average_tax: 41.0,
    rank: 10,
    acronym: "ar",
  },
  {
    id: 11,
    country: "Peru",
    net_pay: 69069673,
    average_tax: 42.4,
    rank: 11,
    acronym: "pe",
  },
  {
    id: 12,
    country: "Ecuador",
    net_pay: 66798413,
    average_tax: 44.3,
    rank: 12,
    acronym: "ec",
  },
];

const SectionLatinAmerica = (props: any) => {
  const styles = useStyles();
  const [data] = useState(dataCountries);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>Latin America</div>
      <div className={styles.contentCountries}>
        <TableCountries dataCountries={data}/>
      </div>
    </section>
  );
};

export default SectionLatinAmerica;
