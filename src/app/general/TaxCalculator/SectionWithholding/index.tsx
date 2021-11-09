import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import NumberFormat from "react-number-format";
import { PERES } from "../constants";
import useStyles from "./styles";

const SectionWithholding = (props: any) => {
  const styles = useStyles();
  const { dataRender } = props;
  const { salaryRateTime, onChangeSalaryRateTime, dataCalculator, currencyUnit } = props;

  const options = {
    chart: {
      type: "pie",
      plotBackgroundColor: "rgb(255 255 255 / 0%)",
      plotBorderWidth: 0,
      plotShadow: false,
      height: "300",
    },

    title: {
      text: null,
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },

    credits: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        dataLabels: {
          format: `
          {point.percentage:.0f}%<br/><span style="font-size: 12px;
              white-space: nowrap;
              max-width: 85px;
              overflow: hidden;
              text-overflow: ellipsis;
              color: var(--purple-dark);
              font-weight: 300;"
            >{point.name}</span>`,
          strokeWidth: 0,
          style: {
            color: "var(--purple-dark)",
            fontSize: "20px",
            fontWeight: "700",
          },
        },
        enableMouseTracking: true,
        borderWidth: 0,
        startAngle: -Number(dataCalculator?.average_tax_rate*1.7)
      },
      series: {
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            enabled: false,
          },
        },
      },
    },

    series: [
      {
        // size: "65%",
        data: [
          {
            name: "Total tax",
            y: Number(dataCalculator?.average_tax_rate),
            color: "#33EEF1",
          },
          {
            name: "Net pay",
            y: (100 - Number(dataCalculator?.average_tax_rate)),
            color: "#3f89b4",
          },
        ],
      },
    ],
  };

  return (
    <section className={styles.sectionWithholding}>
      <div className={styles.filterSalaryRate}>
        <div className={styles.labelFilter}>Salary rate</div>
        <ul className={styles.listFilter}>
          {PERES.map((item) => {
            return (
              <li
                className={`${styles.itemFilter} ${
                  item.value === salaryRateTime ? "active" : ""
                }`}
                onClick={() => onChangeSalaryRateTime(item.value)}
                key={item.id}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.infoSectionWithholding}>
        <div className={styles.title}>Withholding</div>

        <div className={styles.containerWithholding}>
          <div className={styles.deductionsHolder}>
            <div
              className={
                styles.cardDeduction + " " + styles.cardDeductionHighlight
              }
            >
              <div className={styles.cardDeductionName}>Salary</div>
              <NumberFormat
                className={styles.cardDeductionValue}
                value={dataRender?.salary}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currencyUnit}
                decimalScale={2}
              />
            </div>
            {dataRender.income_tax > 0 && (
              <div className={styles.cardDeduction}>
                <div className={styles.cardDeductionName}>Income Tax</div>
                <NumberFormat
                  className={styles.cardDeductionValue}
                  value={dataRender?.income_tax}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={`- ${currencyUnit}`}
                  decimalScale={2}
                />
              </div>
            )}
            {dataRender?.mpf > 0 && (
              <div className={styles.cardDeduction}>
                <div className={styles.cardDeductionName}>MPF</div>
                <NumberFormat
                  className={styles.cardDeductionValue}
                  value={dataRender?.mpf}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={`- ${currencyUnit}`}
                  decimalScale={2}
                />
              </div>
            )}
            <div className={styles.cardLineSplit}></div>
            <div
              className={
                styles.cardDeduction + " " + styles.cardDeductionHighlight
              }
            >
              <div className={styles.cardDeductionName}>Total tax</div>
              <NumberFormat
                className={styles.cardDeductionValue}
                value={dataRender?.total_tax}
                displayType={"text"}
                thousandSeparator={true}
                prefix={`- ${currencyUnit}`}
                decimalScale={0}
              />
            </div>
            <div
              className={
                styles.cardDeduction +
                " " +
                styles.cardDeductionHighlight +
                " " +
                styles.cardDeductionHighlightBig
              }
            >
              <div className={styles.cardDeductionName}>Net pay</div>
              <NumberFormat
                className={styles.cardDeductionValue}
                value={dataRender?.net_pay}
                displayType={"text"}
                thousandSeparator={true}
                prefix={`* ${currencyUnit}`}
                decimalScale={0}
              />
            </div>
            <div className={styles.cardLineSplit}></div>
            <div className={styles.cardDeduction}>
              <div className={styles.cardDeductionName}>
                Deductions
                <Tooltip
                  title="A deduction is a specific amount you can remove from your taxable income to lower it."
                  placement="top"
                  classes={{ tooltip: styles.styleTooltip }}
                >
                  <div className={styles.hyperQuestionIcon}>?</div>
                </Tooltip>
              </div>
              <NumberFormat
                className={styles.cardDeductionValue}
                value={dataRender?.deductions}
                displayType={"text"}
                thousandSeparator={true}
                prefix={`- ${currencyUnit}`}
                decimalScale={2}
              />
            </div>
            <div className={styles.cardLineSplit}></div>
            <div className={styles.cardDeduction}>
              <div className={styles.cardDeductionName}>Marginal tax rate</div>
              <NumberFormat
                className={styles.cardDeductionValue}
                value={dataCalculator?.margin_tax_rate}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"%"}
                decimalScale={2}
              />
            </div>
            <div className={styles.cardDeduction}>
              <div className={styles.cardDeductionName}>Average tax rate</div>
              <NumberFormat
                className={styles.cardDeductionValue}
                value={dataCalculator?.average_tax_rate}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"%"}
                decimalScale={2}
              />
            </div>
          </div>

          <div className={styles.chartWithholding}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWithholding;
