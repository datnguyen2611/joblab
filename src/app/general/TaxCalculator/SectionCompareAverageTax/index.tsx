import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import useStyles from "./styles";

const SectionCompareAverageTax = (props: any) => {
  const styles = useStyles();
  const options = {
    chart: {
      type: "area",
    },

    title: {
      text: null,
    },

    yAxis: {
      title: {
        text: null,
      },
    },

    xAxis: {
      visible: false,
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      area: {
        stacking: "normal",
        lineWidth: 2,
      },
      series: {
        states: {
          inactive: {
            enabled: false,
          },
        },
      },
    },

    tooltip: {
      enabled: false,
    },

    series: [
      {
        name: "Asia",
        lineColor: '#a2eaf6',
        marker: {
          lineWidth: 2,
          lineColor: '#a2eaf6',
          fillColor: '#FFFFFF',
          symbol: 'circle',
        },
        fillColor: {
          linearGradient: [0, 0, 0, 390],
          stops: [
            [0, "#a2eaf6"],
            [1, "rgb(162 234 246 / 0%)"],
          ],
        },
        data: [
          50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000,
          450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000,
          850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000,
          1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000,
        ],
      },
      {
        name: "Asia2",
        lineColor: '#3f89b4',
        marker: {
          lineWidth: 2,
          lineColor: '#3f89b4',
          fillColor: '#FFFFFF',
          symbol: 'circle',
        },
        fillColor: {
          linearGradient: [0, 0, 0, 380],
          stops: [
            [0, "#3f89b4"],
            [1, "rgb(63 137 180 / 0%)"],
          ],
        },
        threshold: Math.min(...[]),
        data: [
          50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000,
          450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000,
          850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000,
          1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000,
        ],
      },
    ],
  };

  return (
    <section className={styles.sectionCompareAverageTax}>
      <div className={styles.title}>Compare average tax</div>
      <div className={styles.boxChartCompareAverageTax}>
        <div className={styles.nameChart}>Salary</div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </section>
  );
};

export default SectionCompareAverageTax;
