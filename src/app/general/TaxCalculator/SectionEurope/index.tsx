import React, { useState } from "react";
import TableCountries from "../TableCountries";
import useStyles from "./styles";

const dataCountries = [
  {
    id: 1,
    country: "Russia",
    net_pay: 104400000,
    average_tax: 13.0,
    rank: 1,
    acronym: "ru",
  },
  {
    id: 2,
    country: "Ukraine",
    net_pay: 96600000,
    average_tax: 19.5,
    rank: 2,
    acronym: "ua",
  },
  {
    id: 3,
    country: "Hungary",
    net_pay: 79800000,
    average_tax: 33.5,
    rank: 3,
    acronym: "hu",
  },
  {
    id: 4,
    country: "Poland",
    net_pay: 78141472,
    average_tax: 34.9,
    rank: 4,
    acronym: "pl",
  },
  {
    id: 5,
    country: "Czech Republic",
    net_pay: 74280000,
    average_tax: 38.1,
    rank: 5,
    acronym: "cz",
  },
  {
    id: 6,
    country: "Romania",
    net_pay: 70200000,
    average_tax: 41.5,
    rank: 6,
    acronym: "ro",
  },
  {
    id: 7,
    country: "Italy",
    net_pay: 64599804,
    average_tax: 46.2,
    rank: 7,
    acronym: "it",
  },
  {
    id: 8,
    country: "Norway",
    net_pay: 64437614,
    average_tax: 46.3,
    rank: 8,
    acronym: "no",
  },
  {
    id: 9,
    country: "United Kingdom",
    net_pay: 63720097,
    average_tax: 46.9,
    rank: 9,
    acronym: "gb",
  },
  {
    id: 10,
    country: "Luxembourg",
    net_pay: 63408816,
    average_tax: 47.2,
    rank: 10,
    acronym: "lu",
  },
  {
    id: 11,
    country: "Spain",
    net_pay: 62513116,
    average_tax: 47.9,
    rank: 11,
    acronym: "es",
  },
  {
    id: 12,
    country: "Switzerland",
    net_pay: 62154138,
    average_tax: 48.2,
    rank: 12,
    acronym: "ch",
  },
  {
    id: 13,
    country: "Netherlands",
    net_pay: 60678059,
    average_tax: 49.4,
    rank: 13,
    acronym: "nl",
  },
  {
    id: 14,
    country: "Sweden",
    net_pay: 59061931,
    average_tax: 50.8,
    rank: 14,
    acronym: "se",
  },
  {
    id: 15,
    country: "Austria",
    net_pay: 59044635,
    average_tax: 50.8,
    rank: 15,
    acronym: "at",
  },
  {
    id: 16,
    country: "Germany",
    net_pay: 58278583,
    average_tax: 51.4,
    rank: 16,
    acronym: "de",
  },
  {
    id: 17,
    country: "Ireland",
    net_pay: 57724132,
    average_tax: 51.9,
    rank: 17,
    acronym: "ie",
  },
  {
    id: 18,
    country: "Greece",
    net_pay: 54989291,
    average_tax: 54.2,
    rank: 18,
    acronym: "gr",
  },
  {
    id: 19,
    country: "Denmark",
    net_pay: 52007073,
    average_tax: 56.7,
    rank: 19,
    acronym: "dk",
  },
  {
    id: 20,
    country: "France",
    net_pay: 50123030,
    average_tax: 58.2,
    rank: 20,
    acronym: "fr",
  },
  {
    id: 21,
    country: "Belgium",
    net_pay: 48590782,
    average_tax: 59.5,
    rank: 21,
    acronym: "be",
  },
  {
    id: 22,
    country: "Portugal",
    net_pay: 46737386,
    average_tax: 61.1,
    rank: 22,
    acronym: "pt",
  },
  {
    id: 23,
    country: "Finland",
    net_pay: 44036366,
    average_tax: 63.3,
    rank: 23,
    acronym: "fi",
  },
];

const SectionEurope = (props: any) => {
  const styles = useStyles();
  const [data] = useState(dataCountries);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>Europe</div>
      <div className={styles.contentCountries}>
        <TableCountries dataCountries={data}/>
      </div>
    </section>
  );
};

export default SectionEurope;
