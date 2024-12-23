/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import apiService from '../services/ApiService';
import filterData from '../utils/filterData';

// style
import { radarFill } from '../utils/variable';

/* -------------------------------------------------------------------------- */
/*                                CUSTOMIZATION                               */
/* -------------------------------------------------------------------------- */

/* eslint-disable react/prop-types */
/* the eslint is disable to avoid prop type warning, the props used by custom
component are recharts props, and are implicitly passed to functions */

/**
 * Customize the polar axis tick by replacing the default value
 *
 * Default value (payload.value) are numbers from 1 to 6, 'kind' property of
 * performance data provide matching string for each number
 *
 * @param {object} props
 * @param {number} props.x
 * @param {number} props.y
 * @param {number} props.index
 * @param {object} props.kindData
 * @param {object} props.payload
 *
 * @returns {JSX.Element}
 */
function CustomAxisTick({ x, y, index, kindData, payload }) {
  const commonStyle = {
    fontSize: '12px',
    fontWeight: '500',
    fill: '#fff',
    textTransform: 'capitalize',
  };
  const coordOffsetAndStyle = [
    { offX: 0, offY: 5, style: { ...commonStyle, textAnchor: 'end' } }, // cardio
    { offX: 0, offY: 0, style: { ...commonStyle, textAnchor: 'end' } }, // energy
    { offX: 0, offY: 10, style: { ...commonStyle, textAnchor: 'middle' } }, // endurance
    { offX: 0, offY: 0, style: { ...commonStyle, textAnchor: 'start' } }, // strength
    { offX: 0, offY: 5, style: { ...commonStyle, textAnchor: 'start' } }, // speed
    { offX: 0, offY: -3, style: { ...commonStyle, textAnchor: 'middle' } }, // intensity
  ];
  return (
    <g>
      <text
        x={x}
        y={y}
        dx={coordOffsetAndStyle[index].offX}
        dy={coordOffsetAndStyle[index].offY}
        style={coordOffsetAndStyle[index].style}
      >
        {kindData[payload.value]}
      </text>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

/* eslint-enable react/prop-types */
function Performance({ queryId }) {
  const [userPerformanceData, setPerformanceData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.get('userPerformance.json');
        const performanceData = filterData(data, queryId);
        setPerformanceData(performanceData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [queryId]);

  if (error) {
    return <p>Performance: {error}</p>;
  }

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <RadarChart
        outerRadius={85}
        data={userPerformanceData.data}
        startAngle={-150} // negative value spread data anti-clockwise around the radar
        endAngle={210} // -150° & 210° to rotate the radar to match the design
      >
        <PolarGrid radialLines={false} stroke="#fff" />
        <PolarAngleAxis
          dataKey="kind"
          tick={<CustomAxisTick kindData={userPerformanceData.kind} />}
        />
        <Radar dataKey="value" fill={radarFill} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PROPTYPES                                 */
/* -------------------------------------------------------------------------- */

Performance.propTypes = {
  queryId: PropTypes.string.isRequired,
};

export default Performance;
