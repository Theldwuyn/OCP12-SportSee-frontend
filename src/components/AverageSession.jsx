/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from 'react';
import apiService from '../services/ApiService';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';

/* -------------------------------------------------------------------------- */
/*                                CUSTOMIZATION                               */
/* -------------------------------------------------------------------------- */

/* eslint-disable react/prop-types */
/* the eslint is disable to avoid prop type warning, the props used by custom
component are recharts props, and are implicitly passed to functions */

/**
 * Customize the tooltip by replacing the default value by {value}min
 *
 * This function is passed as value of content prop of the Tooltip component
 * @param {object} props
 * @param {boolean} props.active
 * @param {object} props.payload rechart object with all information from the chart
 * @returns {JSX.Element}
 */
function CustomToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip__linechart">
        <p>{`${payload[0].value}${payload[0].unit}`}</p>
      </div>
    );
  }
}

/**
 * Customize the axis tick by replacing the default value by the corresponding day
 * The averageSession data are like {"sessions" : [{"day": 1, ...}, {"day: 2"}]}
 *
 * payload.value take the "day" value
 *
 * The function replace the payload.value by the corresponding day using
 * payload.value as index of the days list
 *
 * This function is passed as value of tick prop of XAxis component
 * @param {object} props
 * @param {number} props.x x position of the tick
 * @param {number} props.y y position of the tick
 * @param {object} props.payload rechart object with all information from the axis
 * @returns {JSX.Element}
 */
function CustomAxisTick({ x, y, index }) {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <g>
      <text x={x} y={y} dy={12} dx={-5} fontSize={12} fill="#FFF">
        {days[index]}
      </text>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

/* eslint-enable react/prop-types */
function AverageSession({ queryId }) {
  const [userAverageSession, setAverageSession] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.get(`${queryId}/average-sessions`);
        //console.log(data);
        setAverageSession(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [queryId]);

  if (error) {
    return <p>Average session: {error}</p>;
  }

  return (
    <ResponsiveContainer width={'90%'} height={'90%'}>
      <LineChart
        data={userAverageSession.sessions}
        // width={190}
        // height={190}
        margin={[0, 0, 0, 0]}
      >
        <defs>
          {/*define a linear gradient used by the line component to customize
        the color of the line*/}
          <linearGradient id="lineGradient">
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
          </linearGradient>
        </defs>
        {/*type, ticks and domain prop ensure the data are correctly displayed
        and not clipped off the chart*/}
        <XAxis
          dataKey="day"
          type="number"
          ticks={[1, 2, 3, 4, 5, 6, 7]}
          domain={['auto', 'auto']}
          tick={<CustomAxisTick />}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          interval={'preserveStartEnd'}
        />
        {/*type, ticks and domain prop ensure the data are correctly displayed
        and not clipped off the chart, plus the axe is hidden*/}
        <YAxis
          tickLine={false}
          axisLine={false}
          width={0}
          type="number"
          ticks={[10, 20, 30, 40, 50, 60, 70]}
          domain={['0', '70']}
        />
        <Tooltip content={<CustomToolTip />} cursor={false} />
        <Line
          type="monotone"
          dataKey="sessionLength"
          dot={false}
          unit="min"
          strokeWidth={2}
          stroke="url(#lineGradient)"
          activeDot={{ r: 4, fill: '#FFF' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

AverageSession.propTypes = {
  queryId: PropTypes.string.isRequired,
};

export default AverageSession;
