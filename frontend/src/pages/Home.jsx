import useSocket from "../hooks/useSocket";
import PieProgress from "../components/PieProgress";
import LineChartComponent from "../components/LineChartcomponent";

const Home = () => {
  const { data, historicalData } = useSocket("http://localhost:5000");

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        ESP Sensor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PieChart Indicators */}
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-around items-center">
          <PieProgress
            value={data.temperature}
            maxValue={50}
            label="Temperature"
          />
          <PieProgress value={data.humidity} maxValue={100} label="Humidity" />
        </div>

        {/* Historical Data Chart */}
        <LineChartComponent historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Home;
