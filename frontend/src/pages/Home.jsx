import useSocket from "../hooks/useSocket";
import PieProgress from "../components/PieProgress";
import LineChartComponent from "../components/LineChartcomponent";

const Home = () => {
  const { data, historicalData } = useSocket(
    "https://api.securesyndicate.tech"
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold font-sans text-blue-primary mb-4">
        ESP Sensor Dashboard
      </h1>

      <div className="flex flex-col justify-between">
        {/* PieChart Indicators */}
        <div className="bg-white rounded-lg shadow-md p-10 pb-16 flex justify-around items-center mb-10">
          <PieProgress
            value={data.temperature}
            maxValue={50}
            label="Temperature"
          />
          <PieProgress value={data.humidity} maxValue={100} label="Humidity" />
          <PieProgress value={data.co2} maxValue={1000} label="CO2" />
          <PieProgress value={data.nh4} maxValue={10} label="NH4" />
        </div>

        {/* Historical Data Chart */}
        <LineChartComponent historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Home;
