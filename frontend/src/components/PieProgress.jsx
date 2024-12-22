import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaTemperatureHigh, FaPercentage, FaCloud } from "react-icons/fa";

const PieProgress = ({ value, maxValue, label }) => {
  const chartSize = 200;

  const data = [
    { id: "1", name: "Progress", value: value || 0 },
    {
      id: "2",
      name: "Remaining",
      value: Math.max(maxValue - (value || 0), 0),
    },
  ];

  const renderIcon = () => {
    if (label === "Temperature") {
      return <FaTemperatureHigh className="text-4xl text-blue-600" />;
    } else if (label === "Humidity") {
      return <FaPercentage className="text-4xl text-green-600" />;
    } else if (label === "CO2") {
      return <FaCloud className="text-4xl text-gray-600" />;
    } else if (label === "NH4") {
      return <FaCloud className="text-4xl text-red-600" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <PieChart width={chartSize} height={chartSize}>
        <text
          x={chartSize / 2}
          y={chartSize / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold text-blue-primary"
        >
          {value !== null
            ? `${value}${label === "Temperature" ? "°C" : "%"}`
            : "N/A"}
        </text>
        <Pie
          data={data}
          dataKey="value"
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          blendStroke
        >
          <Cell key="progress" fill="#3b82f6" />
          <Cell key="remaining" fill="#bae6fd" />
        </Pie>
        <Tooltip />
      </PieChart>
      <span className="text-base text-blue-primary absolute font-semibold bottom-[-35px]">
        {label}
      </span>
    </div>
  );
};

export default PieProgress;
