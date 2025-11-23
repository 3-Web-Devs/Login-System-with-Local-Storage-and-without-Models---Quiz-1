// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FileText, Clock, Users, BarChart3, Upload, FileUp, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    // Fetch user info
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          headers: { "auth-token": token },
        });
        const data = await res.json();
        if (!data.success) return logout();
        setUser(data.user);
      } catch {
        logout();
      }
    };

    // Fetch dashboard stats (optional)
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: { "auth-token": token },
        });
        const data = await res.json();
        if (!data.success) return logout();
        setDashboardData(data);
      } catch {
        // Ignore dashboard errors
      }
    };

    fetchUser();
    fetchDashboard();
  }, [navigate]);

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <div className="bg-[#F7F3EE] min-h-screen text-[#3C2F2F]">
      {/* Header */}
      <header className="bg-[#c5a690] text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" /> Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <p>Hello, <strong>{user.name}</strong></p>
          <button onClick={logout} className="bg-[#A88734] px-4 py-2 rounded-lg hover:bg-[#8B5E3C] transition">
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-10 px-6 space-y-16">
        {/* Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
            <FileText className="w-8 h-8 text-[#A88734] mb-3" />
            <h3 className="text-lg font-semibold">Total Conversions</h3>
            <p className="text-3xl font-bold mt-1">{dashboardData?.totalConversions || 0}</p>
            <p className="text-sm text-gray-500 mt-1">All-time conversions</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
            <Clock className="w-8 h-8 text-[#A88734] mb-3" />
            <h3 className="text-lg font-semibold">Avg. Conversion Time</h3>
            <p className="text-3xl font-bold mt-1">{dashboardData?.avgConversionTime || "0s"}</p>
            <p className="text-sm text-gray-500 mt-1">Average (last 7 days)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
            <Users className="w-8 h-8 text-[#A88734] mb-3" />
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold mt-1">{dashboardData?.activeUsers || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-bold mb-6 text-[#6F4E37] flex items-center gap-2">
            <Upload className="w-6 h-6" /> Quick Actions
          </h2>
          <div className="flex flex-wrap gap-6">
            <button className="bg-[#A88734] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8B5E3C] flex items-center gap-2">
              <FileUp className="w-5 h-5" /> Convert File
            </button>
            <button className="bg-[#6F4E37] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C3E2E] flex items-center gap-2">
              <Upload className="w-5 h-5" /> Upload New
            </button>
            <button className="bg-[#382110] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A1810] flex items-center gap-2">
              <Settings className="w-5 h-5" /> Export Report
            </button>
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-bold mb-6 text-[#6F4E37] flex items-center gap-2">
            <Settings className="w-6 h-6" /> Profile Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Profile</h3>
              <p className="text-sm text-gray-600">Name: <strong>{user.name}</strong></p>
              <p className="text-sm text-gray-600">Email: <strong>{user.email}</strong></p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}