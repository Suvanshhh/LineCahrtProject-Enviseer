import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { data } from '../data';
import './LineChartComponent.css';


const AnomalyDot = (props) => {
  const { cx, cy, payload } = props;
  
  // Checking foor anamoly:
  if (payload.anomaly === 1) {
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.6 19L12 16.18L8.4 19L9.5 13.14L5 9.27L10.91 8.26L12 2Z" />
      </svg>
    );
  }

  return null;
};

// Custom tooltip component for showing anomaly status and timestamp:
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value, anomaly, timestamp } = payload[0].payload; // Destructuring value, anomaly, and timestamp from the point data

    return (
      <div className="custom-tooltip">
        <p>{`Time: ${timestamp}`}</p> {/*To Show timestamp */}
        <p>{`Value: ${value}`}</p>
        <p>{anomaly === 1 ? 'Anomaly: Yes' : 'Anomaly: No'}</p> {/*To Show anomaly status */}
      </div>
    );
  }

  return null;
};


const LineChartComponent = () => {
  return (
    <div className="chart-container">
      <h2>Line Chart Visualization</h2>
      {/* Responsive container that makes the container responsive automatically */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} /> {/* Using CustomTooltip */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={<AnomalyDot />}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
