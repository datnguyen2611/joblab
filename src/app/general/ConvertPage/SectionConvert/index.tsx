import React from "react";
import useStyles from "./styles";

const SectionConvert = (props: any) => {
  const styles = useStyles();
  const { converts, onChangeCovert } = props;

  return (
    <section className={styles.sectionConvert}>
      <div className={styles.title}>How much is your salary?</div>
      <div className={styles.contentSectionConvert}>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Yearly salary</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>HK$</div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              placeholder="Annual"
              min={0}
              maxLength={15}
              onChange={(e) => e.target.value.length <= 15 && onChangeCovert(e.target.value, 'yearly')}
              value={converts.yearly.toLocaleString("en-US")}
            />
          </div>
        </div>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Monthly salary</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>HK$</div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              placeholder="Month"
              min={0}
              maxLength={15}
              onChange={(e) => e.target.value.length <= 15 && onChangeCovert(e.target.value, 'monthly')}
              value={converts.monthly.toLocaleString("en-US")}
            />
          </div>
        </div>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Biweekly salary</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>HK$</div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              placeholder="Biweekly"
              min={0}
              maxLength={15}
              onChange={(e) => e.target.value.length <= 15 && onChangeCovert(e.target.value, 'biweekly')}
              value={converts.biweekly.toLocaleString("en-US")}
            />
          </div>
        </div>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Weekly salary</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>HK$</div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              placeholder="Weekly"
              min={0}
              maxLength={15}
              onChange={(e) => e.target.value.length <= 15 && onChangeCovert(e.target.value, 'weekly')}
              value={converts.weekly.toLocaleString("en-US")}
            />
          </div>
        </div>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Daily salary</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>HK$</div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              placeholder="Day"
              min={0}
              maxLength={15}
              onChange={(e) => e.target.value.length <= 15 && onChangeCovert(e.target.value, 'daily')}
              value={converts.daily.toLocaleString("en-US")}
            />
          </div>
        </div>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Hourly salary</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>HK$</div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              placeholder="Hour"
              min={0}
              maxLength={15}
              onChange={(e) => e.target.value.length <= 15 && onChangeCovert(e.target.value, 'hourly')}
              value={converts.hourly.toLocaleString("en-US")}
            />
          </div>
        </div>
        <div className={styles.groupInputConvert}>
          <div className={styles.nameConvert}>Your work hours per week</div>
          <div className={styles.boxInputConvert}>
            <div className={styles.iconConvert}>
              <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/timer.png" alt="" />
            </div>
            <input
              className={styles.inputConvert}
              type="text"
              autoComplete="off"
              min={0}
              maxLength={12}
              onChange={(e) => e.target.value.length <= 12 && onChangeCovert(e.target.value, 'hours_week')}
              value={converts.hours_week}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionConvert;
