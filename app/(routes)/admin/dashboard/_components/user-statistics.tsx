import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ReadUserStatistics } from "../_actions/read-user-statistics";
import Loader from "@/components/loader";

const COLORS = ["#154b2e", "#377a55", "#526e5f"];

type User = {
  role: string;
};

export default function UserStatistics() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ReadUserStatistics()
      .then((response) => {
        const userList: User[] = Array.isArray(response.data)
          ? response.data.map((item) => ({ role: item.role }))
          : [];

        const studentCount = userList.filter(
          (user) => user.role === "Student"
        ).length;
        const instructorCount = userList.filter(
          (user) => user.role === "Instructor"
        ).length;
        const adminCount = userList.filter(
          (user) => user.role === "Admin"
        ).length;

        setData([
          { name: "Students", value: studentCount },
          { name: "Instructors", value: instructorCount },
          { name: "Admin", value: adminCount },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Error fetching user statistics: " + error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl flex-initial w-1/3 grid place-items-center py-4">
      <h2 className="text-lg font-bold text-center top-0 h-1/4">
        User Statistics
      </h2>
      {isLoading ? (
        <div className="h-[22rem]">
          <Loader />
        </div>
      ) : (
        <>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <p className="text-center text-2xl font-medium mt-2">
            Total users: {data.reduce((total, entry) => total + entry.value, 0)}{" "}
          </p>{" "}
        </>
      )}
    </div>
  );
}
