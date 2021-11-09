import React, { useState } from "react";
import TableCountries from "../TableCountries";
import useStyles from "./styles";


const dataCountries = [
  {
    id: 1,
    country: "Angola",
    net_pay: 86401962,
    average_tax: 28.0,
    rank: 1,
    acronym: "ao",
  },
  {
    id: 2,
    country: "Kenya",
    net_pay: 84003575,
    average_tax: 30.0,
    rank: 2,
    acronym: "ke",
  },
  {
    id: 3,
    country: "Ivory Coast",
    net_pay: 81866968,
    average_tax: 31.8,
    rank: 3,
    acronym: "ci",
  },
  {
    id: 4,
    country: "Nigeria",
    net_pay: 78603932,
    average_tax: 34.5,
    rank: 4,
    acronym: "ng",
  },
  {
    id: 5,
    country: "Mozambique",
    net_pay: 78017261,
    average_tax: 35.0,
    rank: 5,
    acronym: "mz",
  },
  {
    id: 6,
    country: "Ghana",
    net_pay: 77420751,
    average_tax: 35.5,
    rank: 6,
    acronym: "gh",
  },
  {
    id: 7,
    country: "Zambia",
    net_pay: 73801986,
    average_tax: 38.5,
    rank: 7,
    acronym: "zm",
  },
  {
    id: 8,
    country: "Morocco",
    net_pay: 72738047,
    average_tax: 39.4,
    rank: 8,
    acronym: "ma",
  },
  {
    id: 9,
    country: "Cameroon",
    net_pay: 72608585,
    average_tax: 39.5,
    rank: 9,
    acronym: "cm",
  },
  {
    id: 10,
    country: "Senegal",
    net_pay: 72010100,
    average_tax: 40.0,
    rank: 10,
    acronym: "sn",
  },
  {
    id: 11,
    country: "South Africa",
    net_pay: 66094050,
    average_tax: 44.9,
    rank: 11,
    acronym: "za",
  },
  {
    id: 12,
    country: "Uganda",
    net_pay: 66029076,
    average_tax: 45.0,
    rank: 12,
    acronym: "ug",
  },
];

const SectionAfrica = (props: any) => {
  const styles = useStyles();
  const [data] = useState(dataCountries);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>Africa</div>
      <div className={styles.contentCountries}>
        <TableCountries dataCountries={data}/>
      </div>
    </section>
  );
};

export default SectionAfrica;
