import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ReadUserStatistics } from "../actions/read-user-statistics";

const COLORS = ["#154b2e", "#377a55", "#526e5f"];

type User = {
  role: string;
};

export default function UserStatistics() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    ReadUserStatistics()
      .then((response) => {
        const userList: User[] = Array.isArray(response.data)
          ? response.data.map((item) => ({ role: item.role }))
          : [];

        // Count the number of students and instructors
        const studentCount = userList.filter(
          (user) => user.role === "Student"
        ).length;
        const instructorCount = userList.filter(
          (user) => user.role === "Instructor"
        ).length;
        const adminCount = userList.filter(
          (user) => user.role === "Admin"
        ).length;

        // Update state
        setData([
          { name: "Students", value: studentCount },
          { name: "Instructors", value: instructorCount },
          { name: "Admin", value: adminCount },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching user statistics:", error);
      });
  }, []); // Run only on component mount

  return (
    <div className="bg-white rounded-xl py-8 px-20 flex-initial">
      <h2 className="text-lg font-bold text-center">User Statistics</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <p className="text-center text-2xl font-medium mt-2">
        Total users: {data.reduce((total, entry) => total + entry.value, 0)}{" "}
      </p>
    </div>
  );
}
