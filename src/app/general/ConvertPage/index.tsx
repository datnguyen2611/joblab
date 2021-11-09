import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
//import DefaultLayout from "../../components/Layout/DefaultLayout";
import Header from "./Header";
import SectionConvert from "./SectionConvert";
import SectionGetPaidMore from "./SectionGetPaidMore";
import useStyles from "./styles";
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'

const ConvertPage = (props: any) => {
  const { updateHeaderStyle } = props;
  const styles = useStyles();
  const history = useHistory();
  const queryString = require("query-string");
  const parsed = queryString.parse(history.location.search);
  const [data, setData] = useState({
    salary: 300000,
    start: 'year',
    end: 'hour',
  });
  
  const [converts, setConverts] = useState({
    yearly: 0,
    monthly: 0,
    biweekly: 0,
    weekly: 0,
    daily: 0,
    hourly: 0,
    hours_week: 40,
  })

  useEffect(() => {
    updateHeaderStyle(VERTICAL_NAVIGATION, false);
    const data = {
      salary: parsed.salary || 300000,
      start: parsed.start || 'year',
      end: parsed.end || 'hour',
    }
    
    if (data.start === 'hour') {
      const values = {
        yearly: Number(parsed.salary)*40*4.333333*12 || 300000*40*4.333333*12,
        monthly: Number(parsed.salary)*40*4.333333 || 300000*40*4.333333,
        biweekly: Number(parsed.salary)*40*4.333333/2 || 300000*40*4.333333/2,
        weekly: Number(parsed.salary)*40 || 300000*40,
        daily: Number(parsed.salary)*Number(40/5) || 300000*(40/5),
        hourly: Number(parsed.salary) || 300000,
        hours_week: 40,
      };
      setConverts(values)
    } else {
      const values = {
        yearly: Number(parsed.salary) || 300000,
        monthly: Number(parsed.salary)/12 || 300000/12,
        biweekly: Number(parsed.salary)/12/2 || 300000/12/2,
        weekly: Number(parsed.salary)/12/4.333333 || 300000/12/4.333333,
        daily: Number(parsed.salary)/12/4.333333/5 || 300000/12/4.333333/5,
        hourly: Number(parsed.salary)/12/4.333333/5/40 || 300000/12/4.333333/5/40,
        hours_week: 40,
      };
      setConverts(values)
    }
    setData(data);
  }, [updateHeaderStyle, history, parsed.end, parsed.salary, parsed.start]);


  const onChangeCovert = (value: number, nameCover: string) => {
    let convertsClone = {...converts};
    var str = value.toLocaleString();  
    var num = str.replace(/\D/g,'');

    switch (nameCover) {
      case "hours_week":
        convertsClone = {
          yearly: converts.yearly,
          monthly: converts.monthly,
          biweekly: converts.biweekly,
          weekly: converts.weekly,
          daily: converts.daily,
          hourly: converts.hourly,
          hours_week: value,
        }
        break;
      case "hourly":
        convertsClone = {
          yearly: Number(parseFloat(`${Number(num)*Number(converts?.hours_week)*4.333333*12}`).toFixed(0)) || 0,
          monthly: Number(parseFloat(`${Number(num)*Number(converts?.hours_week)*4.333333}`).toFixed(2)) || 0,
          biweekly: Number(parseFloat(`${Number(num)*Number(converts?.hours_week)*4.333333/2}`).toFixed(2)) || 0,
          weekly: Number(parseFloat(`${Number(num)*Number(converts?.hours_week)}`).toFixed(2)) || 0,
          daily: Number(parseFloat(`${Number(num)*Number(converts?.hours_week/5)}`).toFixed(2)) || 0,
          hourly: value,
          hours_week: converts?.hours_week,
        }
        break;
      case "daily":
        convertsClone = {
          yearly: Number(parseFloat(`${Number(num)*5*4.333333*12}`).toFixed(0)) || 0,
          monthly: Number(parseFloat(`${Number(num)*5*4.333333}`).toFixed(2)) || 0,
          biweekly: Number(parseFloat(`${Number(num)*5*4.333333/2}`).toFixed(2)) || 0,
          weekly: Number(parseFloat(`${Number(num)*5}`).toFixed(2)) || 0,
          daily: value,
          hourly: Number(parseFloat(`${Number(num)*5/converts?.hours_week}`).toFixed(2)) || 0,
          hours_week: converts?.hours_week,
        }
        break;
      case "weekly":
        convertsClone = {
          yearly: Number(parseFloat(`${Number(num)*4.333333*12}`).toFixed(0)) || 0,
          monthly: Number(parseFloat(`${Number(num)*4.333333}`).toFixed(2)) || 0,
          biweekly: Number(parseFloat(`${Number(num)*4.333333/2}`).toFixed(2)) || 0,
          weekly: value,
          daily: Number(parseFloat(`${Number(num)/5}`).toFixed(2)) || 0,
          hourly: Number(parseFloat(`${Number(num)/converts?.hours_week}`).toFixed(2)) || 0,
          hours_week: converts?.hours_week,
        }
        break;
      case "biweekly":
        convertsClone = {
          yearly: Number(parseFloat(`${Number(num)*2*12}`).toFixed(0)) || 0,
          monthly: Number(parseFloat(`${Number(num)*2}`).toFixed(2)) || 0,
          biweekly: value,
          weekly: Number(parseFloat(`${Number(num)*2/4.333333}`).toFixed(2)) || 0,
          daily: Number(parseFloat(`${Number(num)*2/4.333333/5}`).toFixed(2)) || 0,
          hourly: Number(parseFloat(`${Number(num)*2/converts?.hours_week}`).toFixed(2)) || 0,
          hours_week: converts?.hours_week,
        }
        break;
      case "monthly":
        convertsClone = {
          yearly: Number(parseFloat(`${Number(num)*12}`).toFixed(0)) || 0,
          monthly: value,
          biweekly: Number(parseFloat(`${Number(num)/2}`).toFixed(2)) || 0,
          weekly: Number(parseFloat(`${Number(num)/4.333333}`).toFixed(2)) || 0,
          daily: Number(parseFloat(`${Number(num)/4.333333/5}`).toFixed(2)) || 0,
          hourly: Number(parseFloat(`${Number(num)/4.333333/converts?.hours_week}`).toFixed(2)) || 0,
          hours_week: converts?.hours_week,
        }
        break;
      case "yearly":
        convertsClone = {
          yearly: value,
          monthly: Number(parseFloat(`${Number(num)/12}`).toFixed(2)) || 0,
          biweekly: Number(parseFloat(`${Number(num)/12/2}`).toFixed(2)) || 0,
          weekly: Number(parseFloat(`${Number(num)/12/4.333333}`).toFixed(2)) || 0,
          daily: Number(parseFloat(`${Number(num)/12/4.333333/5}`).toFixed(2)) || 0,
          hourly: Number(parseFloat(`${Number(num)/12/4.333333/converts?.hours_week}`).toFixed(2)) || 0,
          hours_week: converts?.hours_week,
        }
    }

    setConverts(convertsClone)
  };

  

  return (
    <div>
      <Header data={data} />
      <div className={styles.contentConvertPage}>
        <Container maxWidth="lg" className="clearfix" style={{overflow: 'hidden'}}>
          <SectionConvert converts={converts} onChangeCovert={(value: number, nameCover: string) => onChangeCovert(value, nameCover)}/>
          <SectionGetPaidMore />
        </Container>
      </div>
    </div>
  );
};

export default withRouter(ConvertPage);
