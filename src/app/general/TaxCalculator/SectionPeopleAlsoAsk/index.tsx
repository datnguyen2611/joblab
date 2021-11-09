import React from "react";
import { Link } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { convertNumberSalaryYear, convertNumberSalaryHour } from "../ultis";
import useStyles from "./styles";

const SectionPeopleAlsoAsk = (props: any) => {
  const styles = useStyles();
  const { dataCalculator, paramsSearch, currencyUnit } = props;

  return (
    <section className={styles.sectionPeopleAlsoAsk}>
      <div className={styles.title}>People also ask</div>
      <div className={styles.listPeople}>
        <Link
          className={styles.itemPeople}
          href={`/salary/converter?salary=${convertNumberSalaryYear(
            dataCalculator?.salary,
            paramsSearch.per
          )}&start=year&end=hour`}
        >
          <NumberFormat
            value={convertNumberSalaryYear(
              dataCalculator?.salary,
              paramsSearch.per
            )}
            displayType={"text"}
            thousandSeparator={true}
            prefix={currencyUnit}
            decimalScale={2}
            suffix={" a year is how much per hour?"}
          />
          <img
            className={styles.rightArrow}
            src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/arrow_right.png"
            alt=""
          />
        </Link>
        <Link
          className={styles.itemPeople}
          href={`/salary/converter?salary=${convertNumberSalaryHour(
            dataCalculator?.salary,
            paramsSearch.per
          )}&start=hour&end=year`}
        >
          <NumberFormat
            value={convertNumberSalaryHour(
              dataCalculator?.salary,
              paramsSearch.per
            )}
            displayType={"text"}
            thousandSeparator={true}
            prefix={currencyUnit}
            decimalScale={2}
            suffix={" an hour is how much per year?"}
          />
          <img
            className={styles.rightArrow}
            src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/arrow_right.png"
            alt=""
          />
        </Link>
      </div>
    </section>
  );
};

export default SectionPeopleAlsoAsk;
