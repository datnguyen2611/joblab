import React from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import { FIND_COUNTRY } from "../constants";
import useStyles from "./styles";

const SectionTheTaxberg = (props: any) => {
  const styles = useStyles();
  const history = useHistory();
  const queryString = require("query-string");
  const parsed = queryString.parse(history.location.search);
  const { dataRender, paramsSearch, currencyUnit } = props;
  const real_tax_rate =
    ((Number(dataRender?.total_tax) + Number(dataRender?.mpf)) /
      Number(dataRender?.salary)) *
    100;

  const real_tax_rate_is_actually =
    Math.abs(real_tax_rate - Number(dataRender.average_tax_rate)) < 0.01
      ? 0
      : Math.abs(real_tax_rate - Number(dataRender.average_tax_rate));

  return (
    <section className={styles.sectionTheTaxberg}>
      <div className={styles.titleSection}>The Taxberg</div>
      <div className={styles.taxBergHolder}>
        <div className={styles.taxBergCloudLeft}>
          <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/cloud_left.png" alt="" />
        </div>
        <div className={styles.taxBergCloudRight}>
          <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/cloud_right.png" alt="" />
        </div>

        <div className={styles.taxBergFrame}>
          {!!dataRender?.net_pay && (
            <div
              className={styles.taxBergDash}
              style={{
                bottom: `calc(24% - ${Number(
                  dataRender.average_tax_rate <= 100
                    ? dataRender.average_tax_rate
                    : 100
                )}px + 230px)`,
              }}
            >
              <div className={styles.taxBergDotsContainer}>
                <div className={styles.taxBergDots}></div>
              </div>
            </div>
          )}

          {!!dataRender?.net_pay && (
            <div
              className={
                styles.taxBergTextHolder + " " + styles.taxBergTaxTextDark
              }
              style={{
                bottom: `calc(24% - ${Number(
                  dataRender.average_tax_rate <= 100
                    ? dataRender.average_tax_rate
                    : 100
                )}px - 30px  + 230px)`,
                right: 30,
              }}
            >
              <NumberFormat
                className={styles.taxBergTaxText}
                value={dataRender?.net_pay}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currencyUnit}
                decimalScale={0}
              />
              <div className={styles.taxBergSubTitle}>Net pay</div>
            </div>
          )}

          {dataRender?.total_tax > 0 && (
            <div
              className={styles.taxBergDash}
              style={{
                bottom: `calc(24% - ${Number(
                  dataRender.average_tax_rate <= 100
                    ? dataRender.average_tax_rate
                    : 100
                )}px + 130px)`,
              }}
            >
              <div className={styles.taxBergDotsContainer}>
                <div className={styles.taxBergDots}></div>
              </div>
            </div>
          )}

          {dataRender && (
            <div
              className={styles.taxBergTextHolder}
              style={{
                bottom: `calc(24% - ${Number(
                  dataRender.average_tax_rate <= 100
                    ? dataRender.average_tax_rate
                    : 100
                )}px - 30px  + 130px)`,
                right: 30,
              }}
            >
              <NumberFormat
                className={styles.taxBergTaxText}
                value={dataRender?.total_tax}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currencyUnit}
                decimalScale={0}
              />
              <div className={styles.taxBergSubTitle}>Tax you pay</div>
            </div>
          )}

          {dataRender?.mpf > 0 && (
            <div
              className={styles.taxBergDash}
              style={{
                bottom: `calc(24% - ${Number(
                  dataRender.average_tax_rate <= 100
                    ? dataRender.average_tax_rate
                    : 100
                )}px + 30px)`,
                right: "auto",
                left: "38%",
                transform: "translate(-38%, 0)",
              }}
            >
              <div
                className={styles.taxBergDotsContainer}
                style={{
                  left: "auto",
                  right: -10,
                  float: "right",
                }}
              >
                <div className={styles.taxBergDots}></div>
              </div>
            </div>
          )}

          {dataRender?.mpf > 0 && (
            <div
              className={styles.taxBergTextHolder + " " + styles.empPayText}
              style={{
                bottom: `calc(24% - ${Number(
                  dataRender.average_tax_rate <= 100
                    ? dataRender.average_tax_rate
                    : 100
                )}px)`,
                left: 30,
              }}
            >
              <NumberFormat
                className={styles.taxBergTaxText}
                value={dataRender?.mpf}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currencyUnit}
                decimalScale={0}
              />
              {currencyUnit === "HK$" && (
                <div className={styles.taxBergSubTitle}>
                  MPF the employer pays
                </div>
              )}
            </div>
          )}

          <div
            className={styles.taxBergIceImg}
            style={{
              bottom: `${
                dataRender.average_tax_rate
                  ? `calc(24% - ${Number(dataRender.average_tax_rate)}px)`
                  : "calc(30%)"
              }`,
            }}
          >
            <div className={styles.taxBergBoat}>
              <img
                className={styles.taxBergFlag}
                src={`https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/flags_16/${
                  FIND_COUNTRY.find(
                    (i) => i.name === (parsed.country || "Hong Kong")
                  )?.acronym
                }.png`}
                alt=""
              />
              <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/iceberg3.png" alt="" />
            </div>
          </div>

          <div className={styles.taxBergWaterTop}></div>
          <div
            className={styles.taxBergWaterMiddle}
            style={{ bottom: `0` }}
          ></div>
        </div>
        <div className={styles.taxBergWaterBottom}></div>

        <div className={styles.totalTax}>
          <div className={styles.totalTaxTex}>
            <div className={styles.totalTaxTitle}>Total tax paid</div>
            <div className={styles.totalTaxNumber}>
              <NumberFormat
                className={styles.totalTaxNumber}
                value={Number(dataRender?.total_tax) + Number(dataRender?.mpf)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currencyUnit}
                decimalScale={0}
              />
            </div>
            <div className={styles.totalTaxInfo}>
              Did you know your employer also pays tax on your salary? It costs
              the employer{" "}
              {currencyUnit === "HK$" ? (
                <>
                  <NumberFormat
                    value={dataRender?.mpf}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currencyUnit}
                    decimalScale={2}
                  />{" "}
                  to pay you{" "}
                  <NumberFormat
                    value={dataRender?.salary}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currencyUnit}
                    decimalScale={2}
                  />
                </>
              ) : (
                <>
                  an extra 5% to 25% in taxes to pay you {" "}
                  <NumberFormat
                    value={dataRender?.salary}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currencyUnit}
                    decimalScale={2}
                  />
                </>
              )}
              . In other words, every time you spend {currencyUnit}10 of your
              hard-earned money, {currencyUnit}
              {Number(dataRender.margin_tax_rate) / 10} goes to the government.
            </div>
          </div>
          <div className={styles.totalTaxTex}>
            <div className={styles.totalTaxTitle}>Real tax rate</div>
            <NumberFormat
              className={styles.totalTaxNumber}
              value={real_tax_rate}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"%"}
              decimalScale={2}
            />
            <div className={styles.totalTaxInfo}>
              So, with you and the employer both paying tax, what used to be a{" "}
              <NumberFormat
                value={dataRender.average_tax_rate}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"%"}
                decimalScale={2}
              />{" "}
              tax rate now rises to{" "}
              <NumberFormat
                value={real_tax_rate}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"%"}
                decimalScale={2}
              />
              , meaning your real tax rate is actually{" "}
              <NumberFormat
                value={real_tax_rate_is_actually}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"%"}
                decimalScale={2}
              />{" "}
              higher than what it seemed at first.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTheTaxberg;
