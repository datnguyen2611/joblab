import React, {Component} from 'react';
import {Bar, BarChart, ResponsiveContainer, XAxis, Tooltip} from "recharts";
//import {Area, AreaChart, ResponsiveContainer, Tooltip} from 'recharts';

const salaryData = [
  {name: '1', 'Web Developer': 15000},
  {name: '2', 'Web Developer': 22500},
	{name: '3', 'Web Developer': 26700},
	{name: '4', 'Web Developer': 30000},
	{name: '5', 'Web Developer': 35000},
	{name: '6', 'Web Developer': 40000},
	{name: '7', 'Web Developer': 41700},
	{name: '8', 'Web Developer': 45000},
	{name: '9', 'Web Developer': 47100},
	{name: '10', 'Web Developer': 50000},
	{name: '11', 'Web Developer': 0},
	{name: '12', 'Web Developer': 0},
	{name: '13', 'Web Developer': 0},
	{name: '14', 'Web Developer': 0},
	{name: '15+', 'Web Developer': 0}
];

class SalarySurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: salaryData,
    };
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.dataset1 !== prevProps.dataset1) {
      let array = [...this.state.chartData];
      array.forEach((obj,index) => {
        obj[this.props.datakey1] = Math.round(this.props.dataset1[index]/12/1000)*1000;
      });
      this.setState({chartData: array});
    }
    if (this.props.dataset2 !== prevProps.dataset2) {
      let array = [...this.state.chartData];
      array.forEach((obj,index) => {
        obj[this.props.datakey2] = Math.round(this.props.dataset2[index]/12/1000)*1000;
      });
      this.setState({chartData: array});
    }
  }
  
  render() {
    const {chartData} = this.state;
    const {datakey1, datakey2} = this.props;
    
    return (
      <ResponsiveContainer width="100%" height={192}>
        <BarChart data={chartData} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
    
          <Tooltip/>
          {/*<defs>
            <linearGradient id="expanse" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#FF9800" stopOpacity={1}/>
              <stop offset="95%" stopColor="#FF9800" stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="income" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#3BB4A3" stopOpacity={1}/>
              <stop offset="95%" stopColor="#3BB4A3" stopOpacity={1}/>
            </linearGradient>
          </defs>*/}
          <XAxis dataKey="name"/>
          <Bar dataKey={datakey1 ? datakey1 : "Web Developer"} stackId="a" fill="#FF9800" barSize={15}/>
          <Bar dataKey={datakey2} stackId="b" fill="#3BB4A3" barSize={15}/>
          {/*
          <Area type="monotone" dataKey="Expanse" strokeWidth={3} stroke="#3BB4A3" fillOpacity={0.2} fill="url(#income)"/>
          <Area type="monotone" dataKey="Income" strokeWidth={3} stroke="#FF9800" fillOpacity={0.2} fill="url(#expanse)"/>
          */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default SalarySurvey;