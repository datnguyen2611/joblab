import React from "react";
import { Button, Container } from "@material-ui/core";
import { PERES, FIND_COUNTRY } from "../constants";
import useStyles from "./styles";

const SectionSearch = (props: any) => {
  const styles = useStyles();
  const {onChangeIncome, onChangePer, paramsSearch, onSearch, onChangeCountry} = props;

  const handleSubmit = (value: any) => {
    value.preventDefault();
    onSearch()
  }
  return (
    <section className={styles.sectionSearch}>
      <Container maxWidth="lg">
        <form className={styles.formSearch} onSubmit={(value) => handleSubmit(value)}>
          <img
            className={styles.iconMainHeader}
            src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/icon__main-header.png"
            alt=""
          />
          <div className={`${styles.boxGross} ${styles.mobile60}`}>
            <div className={styles.nameInput}>Enter your gross income</div>
            <div className={styles.groundGrossInput}>
              <img
                className={styles.iconInput}
                src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/input__salary-icon.png"
                alt=""
              />
              <input
                type="number"
                value={paramsSearch.income}
                onChange={(e) => onChangeIncome(e.target.value)}
                autoComplete="off"
                min="1"
                max="9999999999"
                step="any"
                className={styles.inputGross}
              />
            </div>
          </div>

          <div className={`${styles.boxGross} ${styles.mobile40}`}>
            <div className={styles.nameInput}>Per</div>
            <select className={styles.selectPer} value={paramsSearch.per} onChange={(e) => onChangePer(e.target.value)}>
              {PERES.map((item) => {
                return (
                  <option value={item.value} key={item.id}>{item.name}</option>
                )
              })}
            </select>
          </div>

          <div className={`${styles.boxGross} ${styles.mobile100}`}>
            <div className={styles.nameInput}>Where do you work?</div>
            <select className={styles.selectDoYou} value={paramsSearch.country} onChange={(e) => onChangeCountry(e.target.value)}>
              {FIND_COUNTRY.map((item) => {
                return (
                  <option value={item.name} key={item.id}>{item.name}</option>
                )
              })}
            </select>
          </div>

          <div className={`${styles.boxGross} ${styles.mobile100}`}>
            <Button variant="contained" className={styles.btnCalculate} type="submit">
              Calculate
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default SectionSearch;
