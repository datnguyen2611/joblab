import React, {Component} from "react";
import Widget from "components/Widget";
//import WidgetHeader from "components/WidgetHeader/index";
import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from 'recharts';
import CardBox from 'components/CardBox';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />{/*
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>*/}
    </g>
  );
};

class Competitiveness extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0, competitiveness: 70};
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }
  
  render() {
    const data = [{name: this.state.competitiveness+"%", value: this.state.competitiveness},
    {name: 'empty', value: 100-this.state.competitiveness}];
    const COLORS = ['#00bcd4', 'transparent'];
    
    return (
      <div className="jr-entry-sec">
        <Widget styleName="jr-card-profile">
          <div className="d-flex">
            <h3 className="card-title mr-auto mb-1 mb-md-3">Profile Competitiveness</h3>
          </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
              <Pie dataKey="value"
               data={data}
               activeIndex={this.state.activeIndex}
               activeShape={renderActiveShape}
               //onMouseEnter={this.onPieEnter}
               cx="50%"
               cy="50%"
               innerRadius={60}
               outerRadius={100}
               fill="#00bcd4"
               paddingAngle={5}
              >
                {
                  data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
              </Pie>
              </PieChart>
            </ResponsiveContainer>
            
        </Widget>
      </div>
    )
  }
};

export default Competitiveness;