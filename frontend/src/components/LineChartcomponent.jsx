
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ historicalData }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="bg-blue-100 p-3">
      <h2 className="text-blue-800 font-semibold">Historical Data</h2>
    </div>
    <div className="p-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="timestamp" stroke="#1e40af" />
          <YAxis stroke="#1e40af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#e6f2ff",
              borderColor: "#3b82f6",
            }}
            labelStyle={{ color: "#1e40af" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Temperature (°C)"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#60a5fa"
            strokeWidth={2}
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default LineChartComponent;
