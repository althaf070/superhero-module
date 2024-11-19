import { SERVER_URL } from "@/lib/server_url";
import axios from "axios";
import { useEffect, useState } from "react";

const RecentUsers = () => {
  const [recentCases, setRecentCases] = useState([]);
// fetching recent cases
  const fetchCases = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/recent-cases`);
      if (response.data.success) {
        setRecentCases(response.data.grievences); 
      }
    } catch (error) {
      console.error("Error fetching recent cases:", error);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div className="flex flex-col self-start bg-slate-600 p-3 lg:p-6 rounded-xl shadow-xl md:min-h-[70vh]">
      <h1 className="font-semibold text-2xl lg:text-3xl text-white">Recent Cases</h1>
      
      {recentCases.length > 0 ? (
        <div className="mt-4 space-y-4">
          {recentCases.map((grievance) => (
            <div
              key={grievance._id} 
              className="flex justify-between items-center p-2 bg-slate-700 rounded-lg shadow"
            >
              <div>
                <p className="text-white font-medium">Username: {grievance.userId.username}</p>
                <p className="text-gray-300">Email: {grievance.userId.email}</p>
              </div>
              <div className="text-right">
                <p className="text-white">Type: {grievance.grievanceType}</p>
                <p className="text-gray-300">Status: {grievance.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 mt-4">No recent cases available.</p>
      )}
    </div>
  );
};

export default RecentUsers;
