import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieProgress = ({ value, maxValue, label }) => {
  const chartSize = 100;

  const data = [
    { id: "1", name: "Progress", value: value || 0 },
    {
      id: "2",
      name: "Remaining",
      value: Math.max(maxValue - (value || 0), 0),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center relative">
      <PieChart width={chartSize} height={chartSize}>
        <text
          x={chartSize / 2}
          y={chartSize / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xl font-bold text-blue-800"
        >
          {value !== null
            ? `${value}${label === "Temperature" ? "°C" : "%"}`
            : "N/A"}
        </text>
        <Pie
          data={data}
          dataKey="value"
          innerRadius="80%"
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
      <span className="text-sm text-blue-600 absolute bottom-0">{label}</span>
    </div>
  );
};

export default PieProgress;
