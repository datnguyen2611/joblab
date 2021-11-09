import React from 'react';
import WidgetHeader from "components/WidgetHeader/index";
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer} from 'recharts';
//import data from './data';

const SimpleRadarChart = ({data}) => (
  <div className="jr-entry-sec">
    <WidgetHeader title={<span>Profile Rating</span>}/>
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart outerRadius={100} data={data}>
        <Radar name="Mike" dataKey="A" stroke="#3367d6" fill="#3367d6" fillOpacity={0.6} />
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{fontSize:10}}/>
        <PolarRadiusAxis tick={{fontSize:10}}/>
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

export default SimpleRadarChart;