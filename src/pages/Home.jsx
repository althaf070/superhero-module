import { useEffect, useState } from "react";
import axios from "axios";
import NumberTicker from "@/components/ui/number-ticker";
import RecentUsers from "@/components/RecentUsers";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { SERVER_URL } from "@/lib/server_url";
import { BarChartComponent } from "@/components/Chart";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    resolved: 0,
    ongoing: 0,
    pending: 0,
    chartData: { labels: [], values: [] },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/dashboard`);
        const { resolved, pending, ongoing, typeCounts } = response.data.data;

        setDashboardData({
          resolved,
          ongoing,
          pending,
          chartData: {
            labels: Object.keys(typeCounts), 
            values: Object.values(typeCounts), 
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <section>
      <GradualSpacing
        className="font-display text-center text-4xl font-bold -tracking-widest text-[#E2F1E7] md:text-7xl md:leading-[5rem]"
        text="Welcome Aegis!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12  p-4 gap-5 w-full">
        <div className="col-span-1 sm:col-span-1 md:col-span-4 p-3 bg-green-700 lg:p-8 text-center rounded-lg shadow-xl w-full">
          <h4 className="text-lg md:text-xl lg:text-2xl">Total Resolved Cases</h4>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
            <NumberTicker value={dashboardData?.resolved || 0} className="text-[#E2F1E7]" />+
          </h1>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-4 p-3 bg-yellow-600 lg:p-8 text-center rounded-lg shadow-xl w-full">
          <h4 className="text-lg md:text-xl lg:text-2xl">Total Ongoing Cases</h4>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
            <NumberTicker value={dashboardData?.ongoing || 0} className="text-[#E2F1E7]" />+
          </h1>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-4 p-3 bg-red-600 lg:p-8 text-center rounded-lg shadow-xl w-full">
          <h4 className="text-lg md:text-xl lg:text-2xl">Total Pending Cases</h4>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
            <NumberTicker value={dashboardData?.pending || 0} className="text-[#E2F1E7]" />+
          </h1>
        </div>
        <div className="col-span-full sm:col-span-1 md:col-span-6 w-full">
          <BarChartComponent data={dashboardData?.chartData} />
        </div>
        <div className="col-span-full sm:col-span-1 md:col-span-6 w-full">
          <RecentUsers />
        </div>
      </div>
    </section>
  );
};

export default Home;
