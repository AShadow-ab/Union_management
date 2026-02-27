import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  const data = [
    { estate: "Tiko", members: 40 },
    { estate: "Spena", members: 30 },
    { estate: "Camp 7", members: 58 }
  ];

  

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">
          Admin Dashboard
        </h1>

        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </nav>

      <div className="p-8">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Members</h2>
            <p className="text-3xl font-bold text-green-700">128</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Forms</h2>
            <p className="text-3xl font-bold text-blue-700">96</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Estates</h2>
            <p className="text-3xl font-bold text-purple-700">3</p>
          </div>

        </div>

        {/* CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Members Per Estate
          </h2>

          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="estate" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="members" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}