import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  //ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { primaryColor, secondaryColor, tooltipBg } from '../utils/variable';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import apiService from '../services/ApiService';
import filterData from '../utils/filterData';

// style
import '../scss/components/activity.scss';

/* eslint-disable react/prop-types */
function CustomToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}${payload[0].unit}`}</p>
        <p className="label">{`${payload[1].value}${payload[1].unit}`}</p>
      </div>
    );
  }
}

/* eslint-enable react/prop-types */
function Activity({ queryId }) {
  console.log(queryId);
  const [userActivityData, setActivityData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.get('userActivity.json');
        const activityData = filterData(data, queryId);
        setActivityData(activityData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [queryId]);

  if (error) {
    return <p>Activity: {error} </p>;
  }

  return (
    <BarChart
      data={userActivityData.sessions}
      width={780}
      height={280}
      barGap={-56}
      margin={[0, 0, 0, 0]}
    >
      <text className="chart-title" x={0} y={15}>
        Activité quotidienne
      </text>
      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#dedede" />
      <XAxis
        dataKey="day"
        axisLine={{ stroke: '#dedede' }}
        tickLine={false}
        tickMargin={10}
        tick={{ color: '#9b9eac', fontSize: 14 }}
      />
      <YAxis
        axisLine={false}
        orientation="right"
        tickLine={false}
        tickMargin={25}
        tick={{ color: '#9b9eac', fontSize: 14 }}
      />
      <Tooltip
        content={<CustomToolTip />}
        offset={25}
        isAnimationActive={false}
        cursor={{ fill: tooltipBg }}
      />
      <Legend
        verticalAlign="top"
        align="right"
        iconType="circle"
        iconSize={8}
        formatter={(value) => <span className="text-legend">{value}</span>}
        height={60}
      />
      <Bar
        name=" Poids (kg)"
        unit="kg"
        dataKey="kilogram"
        fill={secondaryColor}
        maxBarSize={7}
        radius={[7, 7, 0, 0]}
      />
      <Bar
        name=" Calories brûlées (kCal)"
        unit="kCal"
        dataKey="calories"
        fill={primaryColor}
        maxBarSize={7}
        radius={[7, 7, 0, 0]}
      />
    </BarChart>
  );
}

Activity.propTypes = {
  queryId: PropTypes.string.isRequired,
};

export default Activity;
