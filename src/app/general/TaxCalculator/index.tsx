import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Container, Modal } from "@material-ui/core";
//import DefaultLayout from "../../components/Layout/DefaultLayout";
import Header from './Header';
import SectionSearch from "./SectionSearch";
import SectionWithholding from "./SectionWithholding";
import SectionTheTaxberg from "./SectionTheTaxberg";
import SectionPeopleAlsoAsk from "./SectionPeopleAlsoAsk";
import SectionSummary from "./SectionSummary";
import SectionCompareAverageTax from "./SectionCompareAverageTax";
import SectionTaxPerIncome from "./SectionTaxPerIncome";
import SectionEurope from "./SectionEurope";
import SectionNorthAmerica from "./SectionNorthAmerica";
import SectionAsiaPacific from "./SectionAsiaPacific";
import SectionLatinAmerica from "./SectionLatinAmerica";
import SectionAfrica from "./SectionAfrica";
import SectionMiddleEast from "./SectionMiddleEast";
import SectionNote from "./SectionNote";
import { convertNumberSalaryRateTime, convertCurrencyUnit } from "./ultis";
import useStyles from "./styles";
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'

const server = "/api/taxCalculator/get/tax";

const TaxCalculator = (props: any) => {
  const { updateHeaderStyle } = props;
  const styles = useStyles();
  const history = useHistory();
  const [dataCalculator, setDataCalculator] = useState(Object);
  const [dataRender, setDataRender] = useState(Object);
  const [isLoading, setIsLoading] = useState(false);
  const [salaryRateTime, setSalaryRateTime] = useState("annual");
  const [currencyUnit, setCurrencyUnit] = useState("HK$");
  const [paramsSearch, setParamsSearch] = useState({
    income: 30000,
    per: "year",
    country: "Hong Kong",
  });

  const queryString = require("query-string");

  const getData = async (params: any) => {
    setIsLoading(true);
    axios
      .get(`${server}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        params: params,
      })
      .then(function (response) {
        const data = {
          average_tax_rate: Number(response?.data?.average_tax_rate),
          deductions: Number(response?.data?.deductions),
          income_tax: Number(response?.data?.income_tax),
          margin_tax_rate: Number(response?.data?.margin_tax_rate),
          mpf: Number(response?.data?.mpf),
          net_pay: Number(response?.data?.net_pay),
          salary: Number(response?.data?.salary),
          total_tax: Number(response?.data?.total_tax),
        }
        console.log(response);
        setIsLoading(false);
        setDataCalculator(data);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    updateHeaderStyle(VERTICAL_NAVIGATION, false);
    const parsed = queryString.parse(history.location.search);
    const unit = convertCurrencyUnit(parsed?.country);
    const params = {
      income: Number(parsed.income) || 300000,
      per: parsed.per || "year",
      country: parsed.country || "Hong Kong",
    };
    setParamsSearch(params);
    setSalaryRateTime(params.per);
    getData(params);
    setCurrencyUnit(unit || "HK$");
  }, [updateHeaderStyle, history, history.location.search, queryString]);

  const onPushSearch = (value: any) => {
    window.scrollTo(0, 0);
    history.push(
      `?income=${value}&per=${paramsSearch.per}&country=${paramsSearch.country}`
    );
  };

  useEffect(() => {
    const data = {
      average_tax_rate: dataCalculator?.average_tax_rate,
      deductions: convertNumberSalaryRateTime(
        dataCalculator?.deductions,
        paramsSearch.per,
        salaryRateTime
      ),
      income_tax: convertNumberSalaryRateTime(
        dataCalculator?.income_tax,
        paramsSearch.per,
        salaryRateTime
      ),
      margin_tax_rate: dataCalculator?.margin_tax_rate,
      mpf: convertNumberSalaryRateTime(
        dataCalculator?.mpf,
        paramsSearch.per,
        salaryRateTime
      ),
      net_pay: convertNumberSalaryRateTime(
        dataCalculator?.net_pay,
        paramsSearch.per,
        salaryRateTime
      ),
      salary: convertNumberSalaryRateTime(
        dataCalculator?.salary,
        paramsSearch.per,
        salaryRateTime
      ),
      total_tax: convertNumberSalaryRateTime(
        dataCalculator?.total_tax,
        paramsSearch.per,
        salaryRateTime
      ),
    };
    setDataRender(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCalculator, salaryRateTime]);

  return (
    <div>
      <Header {...props}/>
      <SectionSearch
        paramsSearch={paramsSearch}
        onSearch={() => onPushSearch(paramsSearch.income)}
        onChangeIncome={(value: number) =>
          setParamsSearch({ ...paramsSearch, income: value })
        }
        onChangePer={(value: string) =>
          setParamsSearch({ ...paramsSearch, per: value })
        }
        onChangeCountry={(value: string) =>
          setParamsSearch({ ...paramsSearch, country: value })
        }
      />

      <div className={styles.bodyPageTaxCalculator}>
        <Container maxWidth="lg">
          <SectionWithholding
            salaryRateTime={salaryRateTime}
            dataCalculator={dataCalculator}
            setDataRender={(data: any) => setDataRender(data)}
            dataRender={dataRender}
            onChangeSalaryRateTime={(value: string) => setSalaryRateTime(value)}
            currencyUnit={currencyUnit}
          />

          <SectionTheTaxberg
            dataRender={dataRender}
            paramsSearch={paramsSearch}
            currencyUnit={currencyUnit}
          />

          <SectionPeopleAlsoAsk
            dataCalculator={dataCalculator}
            paramsSearch={paramsSearch}
            currencyUnit={currencyUnit}
          />

          <SectionSummary
            dataCalculator={dataCalculator}
            paramsSearch={paramsSearch}
            country={paramsSearch?.country}
            currencyUnit={currencyUnit}
          />

          <SectionCompareAverageTax />

          <SectionTaxPerIncome
            income={paramsSearch.income}
            onSearch={(value: number) => onPushSearch(value)}
            currencyUnit={currencyUnit}
          />

          <SectionAsiaPacific />

          <SectionNorthAmerica />

          <SectionEurope />

          <SectionLatinAmerica />

          <SectionAfrica />

          <SectionMiddleEast />

          <SectionNote paramsSearch={paramsSearch} />
        </Container>
      </div>
      <Modal className={styles.loadingModal} open={isLoading}>
        <CircularProgress className={styles.circularProgress} />
      </Modal>
    </div>
  );
};

export default withRouter(TaxCalculator);
