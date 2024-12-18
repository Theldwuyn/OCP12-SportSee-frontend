import {
  Bar,
  BarChart,
  CartesianGrid,
  //ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { primaryColor } from '../utils/variable';
import PropTypes from 'prop-types';

function Activity({ activityData }) {
  console.log(activityData);
  return (
    <BarChart
      data={activityData}
      width={795}
      height={280}
      barGap={-56}
      margin={[0, 0, 0, 0]}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey="day" axisLine={false} />
      <YAxis axisLine={false} orientation="right" tickLine={false} />
      <Bar
        dataKey="kilogram"
        fill="#000000"
        maxBarSize={7}
        radius={[7, 7, 0, 0]}
      />
      <Bar
        dataKey="calories"
        fill={primaryColor}
        maxBarSize={7}
        radius={[7, 7, 0, 0]}
      />
    </BarChart>
  );
}

Activity.propTypes = {
  activityData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Activity;
