import React, { useState } from "react";
import TableCountries from "../TableCountries";
import useStyles from "./styles";


const dataCountries = [
  {
    id: 1,
    country: "Kazakhstan",
    net_pay: 107951626,
    average_tax: 10.0,
    rank: 1,
    acronym: "kz",
  },
  {
    id: 2,
    country: "Hong Kong",
    net_pay: 99625500,
    average_tax: 17.0,
    rank: 2,
    acronym: "hk",
  },
  {
    id: 3,
    country: "Singapore",
    net_pay: 93686009,
    average_tax: 21.9,
    rank: 3,
    acronym: "sg",
  },
  {
    id: 4,
    country: "Indonesia",
    net_pay: 82349042,
    average_tax: 31.4,
    rank: 4,
    acronym: "id",
  },
  {
    id: 5,
    country: "New Zealand",
    net_pay: 80440158,
    average_tax: 33.0,
    rank: 5,
    acronym: "nz",
  },
  {
    id: 6,
    country: "Pakistan",
    net_pay: 78223280,
    average_tax: 34.8,
    rank: 6,
    acronym: "pk",
  },
  {
    id: 7,
    country: "Thailand",
    net_pay: 78113201,
    average_tax: 34.9,
    rank: 7,
    acronym: "th",
  },
  {
    id: 8,
    country: "Vietnam",
    net_pay: 78030870,
    average_tax: 35.0,
    rank: 8,
    acronym: "vn",
  },
  {
    id: 9,
    country: "Philippines",
    net_pay: 74563133,
    average_tax: 37.9,
    rank: 9,
    acronym: "ph",
  },
  {
    id: 10,
    country: "Malaysia",
    net_pay: 70954212,
    average_tax: 40.9,
    rank: 10,
    acronym: "my",
  },
  {
    id: 11,
    country: "China",
    net_pay: 66203387,
    average_tax: 44.8,
    rank: 11,
    acronym: "cn",
  },
  {
    id: 12,
    country: "Japan",
    net_pay: 65870634,
    average_tax: 45.1,
    rank: 12,
    acronym: "jp",
  },
  {
    id: 13,
    country: "Australia",
    net_pay: 63767819,
    average_tax: 46.9,
    rank: 13,
    acronym: "au",
  },
  {
    id: 14,
    country: "India",
    net_pay: 62567721,
    average_tax: 47.9,
    rank: 14,
    acronym: "in",
  },
  {
    id: 15,
    country: "South Korea",
    net_pay: 55032428,
    average_tax: 54.1,
    rank: 15,
    acronym: "kr",
  },
  {
    id: 16,
    country: "Taiwan",
    net_pay: 48598650,
    average_tax: 59.5,
    rank: 16,
    acronym: "tw",
  },
];

const SectionAsiaPacific = (props: any) => {
  const styles = useStyles();
  const [data] = useState(dataCountries);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>Asia / Pacific</div>
      <div className={styles.contentCountries}>
        <TableCountries dataCountries={data}/>
      </div>
    </section>
  );
};

export default SectionAsiaPacific;
