import React from "react";
import NumberFormat from "react-number-format";
import { convertNumberSalaryMonth, convertNumberSalaryYear } from "../ultis";
import useStyles from "./styles";

const SectionSummary = (props: any) => {
  const styles = useStyles();
  const { dataCalculator, paramsSearch, country, currencyUnit } = props;

  return (
    <section className={styles.sectionSummary}>
      <div className={styles.title}>Summary</div>
      <div className={styles.informationSummary}>
        If you make{" "}
        <NumberFormat
          value={convertNumberSalaryYear(
            Number(dataCalculator?.salary),
            paramsSearch.per
          )}
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          prefix={currencyUnit}
          decimalScale={0}
          renderText={(value) => <strong>{value}</strong>}
        />{" "}
        a year living in <strong>{country}</strong>, you will be taxed{" "}
        <NumberFormat
          value={convertNumberSalaryYear(
            Number(dataCalculator?.total_tax),
            paramsSearch.per
          )}
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          prefix={currencyUnit}
          decimalScale={0}
          renderText={(value) => <strong>{value}</strong>}
        />{" "}
        . That means that your net pay will be{" "}
        <NumberFormat
          value={convertNumberSalaryYear(
            Number(dataCalculator?.net_pay),
            paramsSearch.per
          )}
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          prefix={currencyUnit}
          decimalScale={0}
          renderText={(value) => <strong>{value}</strong>}
        />{" "}
        per year, or{" "}
        <NumberFormat
          value={convertNumberSalaryMonth(
            Number(dataCalculator?.net_pay),
            paramsSearch.per
          )}
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          prefix={currencyUnit}
          decimalScale={0}
          renderText={(value) => <strong>{value}</strong>}
        />{" "}
        per month. Your average tax rate is{" "}
        <strong>{dataCalculator.average_tax_rate}%</strong> and your marginal
        tax rate is{" "}
        <NumberFormat
          value={dataCalculator?.margin_tax_rate}
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          suffix={"%"}
          renderText={(value) => <strong>{value}</strong>}
        />
        . This marginal tax rate means that your immediate additional income
        will be taxed at this rate. For instance, an increase of{" "}
        <strong>{currencyUnit}100</strong> in your salary will be taxed{" "}
        <strong>
          {currencyUnit}
          {dataCalculator?.margin_tax_rate}
        </strong>
        , hence, your net pay will only increase by{" "}
        <strong>
          {currencyUnit}
          {(100 - dataCalculator?.margin_tax_rate) || ''}
        </strong>
        .
      </div>
      <div className={styles.title}>Bonus Example</div>
      <div className={styles.informationSummary}>
        A <strong>{currencyUnit}1,000</strong> bonus will generate an extra{" "}
        <NumberFormat
          value={1000 - (Number(dataCalculator.average_tax_rate) / 100) * 1000}
          displayType={"text"}
          thousandSeparator={true}
          prefix={currencyUnit}
          renderText={(value) => <strong>{value}</strong>}
        />{" "}
        of net incomes. A <strong>{currencyUnit}5,000</strong> bonus will
        generate an extra{" "}
        <NumberFormat
          value={5000 - (Number(dataCalculator.average_tax_rate) / 100) * 5000}
          displayType={"text"}
          thousandSeparator={true}
          prefix={currencyUnit}
          renderText={(value) => <strong>{value}</strong>}
        />{" "}
        of net incomes.
      </div>
    </section>
  );
};

export default SectionSummary;
