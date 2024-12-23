/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import apiService from '../services/ApiService';
import filterData from '../utils/filterData';

// style
import { primaryColor, secondaryColor, tooltipBg } from '../utils/variable';
import '../scss/components/activity.scss';

/* -------------------------------------------------------------------------- */
/*                                CUSTOMIZATION                               */
/* -------------------------------------------------------------------------- */

/* eslint-disable react/prop-types */
/* the eslint is disable to avoid prop type warning, the props used by custom
component are recharts props, and are implicitly passed to functions */

/**
 * Customize the tooltip by replacing the default value by {value}kg and
 * {value}kCal
 *
 * This function is passed as value of content prop of Tooltip component
 * @param {object} props
 * @param {boolean} props.active set to true when the value is hovered
 * @param {object} props.payload rechart object with all information from the chart
 *
 * payload[0] - kg bar information,
 * payload[1] - calories bar information
 * @returns {JSX.Element}
 */
function CustomToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip__barchart">
        <p>{`${payload[0].value}${payload[0].unit}`}</p>
        <p>{`${payload[1].value}${payload[1].unit}`}</p>
      </div>
    );
  }
}

/**
 * Customize the X axis tick by replacing the default value
 *
 * Replace the date by the payload index + 1
 *
 * This function is passed as value of tick prop of XAxis component
 * @param {object} props
 * @param {number} props.x x position of the tick
 * @param {number} props.y y position of the tick
 * @param {object} props.payload rechart object with all axis information
 * @returns {JSX.Element}
 */
function CustomAxisTick({ x, y, payload }) {
  return (
    <g>
      <text x={x} y={y} dx={-4} dy={12} fontSize={14} fill="#9b9eac">
        {payload.index + 1}
      </text>
    </g>
  );
}

/* eslint-enable react/prop-types */

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
function Activity({ queryId }) {
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
    <ResponsiveContainer width={'90%'} height={'80%'}>
      <BarChart
        data={userActivityData.sessions}
        barGap={-56}
        margin={[0, 0, 0, 0]}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="#dedede"
        />
        <XAxis
          dataKey="day"
          axisLine={{ stroke: '#dedede' }}
          tickLine={false}
          tickMargin={10}
          tick={<CustomAxisTick />}
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
    </ResponsiveContainer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PROPTYPE                                  */
/* -------------------------------------------------------------------------- */

Activity.propTypes = {
  queryId: PropTypes.string.isRequired,
};

export default Activity;
