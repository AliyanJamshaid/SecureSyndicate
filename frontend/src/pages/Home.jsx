import useSocket from "../hooks/useSocket";
import PieProgress from "../components/PieProgress";
import LineChartComponent from "../components/LineChartcomponent";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
          <PieProgress value={data.smokeLevel} maxValue={10000} label="Smoke" />
        </div>

        {/* Display Smoke Status */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">
            Smoke Status: {data.smokeStatus}
          </h2>
        </div>

        {/* Lottie Animation */}
        <div className="flex justify-center mb-10">
          <DotLottieReact
            src="https://lottie.host/a322fdac-c447-4834-8bd8-2681060be640/2tCceGcbVM.lottie"
            loop
            autoplay
            style={{ width: "150px", height: "150px" }} // Adjusted size for animation
          />
        </div>

        {/* Historical Data Chart */}
        <LineChartComponent historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Home;
