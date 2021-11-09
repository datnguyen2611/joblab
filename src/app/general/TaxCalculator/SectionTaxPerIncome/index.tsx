import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import useStyles from "./styles";

const numberWithCommas = (x: number) => {
  if (x > 9999 && x <= 9999999999) {
    return Math.floor((x <= 1900000 ? x : 1900000) / 1000);
  } else {
    return 0;
  }
};

const SectionTaxPerIncome = (props: any) => {
  const styles = useStyles();
  const history = useHistory();
  const { income, onSearch, currencyUnit } = props;
  const [incomes, setIncomes] = useState<number[]>([]);
  const queryString = require("query-string");
  const parsed = queryString.parse(history.location.search);

  useEffect(() => {
    let data = [];
    const value = numberWithCommas(Number(parsed.income) || 30000);
    for (let i = 0; i < 20; i++) {
      data.push(
        value < 5 ? 5000 + 5000 * i : value * 1000 + (5000 + 5000 * i)
      );
    }
    setIncomes(data);
  }, [income, parsed.income]);

  return (
    <section className={styles.sectionEurope}>
      <div className={styles.title}>Tax per income</div>
      <div className={styles.contentCountries}>
        <div className={styles.containerIncome}>
          {incomes?.map((item, index) => {
            return (
              <div key={index} className={styles.itemIncome} onClick={() => onSearch(item)}>
                {currencyUnit}
                <NumberFormat
                  value={item}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionTaxPerIncome;
