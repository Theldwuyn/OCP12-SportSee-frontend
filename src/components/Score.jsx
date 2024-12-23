/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */

import PropTypes from 'prop-types';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useRef, useState } from 'react';

// style
import {
  primaryColor,
  radialChartSecondaryColor,
  secondaryColor,
} from '../utils/variable';

/* -------------------------------------------------------------------------- */
/*                                CUSTOMIZATION                               */
/* -------------------------------------------------------------------------- */

/* eslint-disable react/prop-types */
/* the eslint is disable to avoid prop type warning, the props used by custom
component are recharts props, and are implicitly passed to functions */
/**
 * Customize the radialBar label by replacing the default value by {value * 100}%
 * and add text to complete the label
 * @param {number} value score value
 * @returns {JSX.Element}
 */
function CustomLabel({ value }) {
  return (
    <g>
      <text
        x={'50%'}
        y={'50%'}
        textAnchor="middle"
        style={{ fontSize: 26, fontWeight: 'bold', fill: secondaryColor }}
      >
        {`${value * 100}%`}
      </text>
      <text
        x={'50%'}
        y={'58%'}
        textAnchor="middle"
        style={{
          fontSize: 16,
          fontWeight: 500,
          fill: radialChartSecondaryColor,
        }}
      >
        de votre
      </text>
      <text
        x={'50%'}
        y={'66%'}
        textAnchor="middle"
        style={{
          fontSize: 16,
          fontWeight: 500,
          fill: radialChartSecondaryColor,
        }}
      >
        objectif
      </text>
    </g>
  );
}

/* eslint-enable react/prop-types */

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

function Score({ userData, error }) {
  let ref = useRef(null);
  const [bgRadius, setBgRadius] = useState(0);

  useEffect(() => {
    // Recharts component are virtual component, they render an SVG path, and
    // are not rendered directly as DOM Element. Therefore, the useRef hooks
    // may not always populate ref.current after the initial render.
    // To ensure ref.current is populated, and because of the asynchronous rendering
    // of react, we set a time out as a work around before reading the properties
    const timer = setTimeout(() => {
      if (ref.current) {
        const radius = ref.current.props.data[0].background.innerRadius;
        setBgRadius(radius);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return <p>Score: {error}</p>;
  }

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <RadialBarChart
        data={[userData]}
        innerRadius={'70%'}
        outerRadius={'80%'}
        barSize={10}
        startAngle={90}
        endAngle={450}
      >
        <g>
          <circle cx={'50%'} cy={'50%'} r={bgRadius} fill="#fff" />
        </g>
        {/*As the score is the only data displayed here, we need a domain to
        provide a range of value as scale */}
        <PolarAngleAxis type="number" domain={[0, 1]} tick={false} />
        <RadialBar
          minAngle={15}
          dataKey="score"
          fill={primaryColor}
          clockWise
          cornerRadius={5}
          ref={ref}
          label={<CustomLabel />}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PROPTYPES                                 */
/* -------------------------------------------------------------------------- */

Score.propTypes = {
  userData: PropTypes.object,
  error: PropTypes.string,
};

export default Score;
