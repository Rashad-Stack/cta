import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { TeamsStatsType } from "../types";

interface TeamChartsProps {
  teamStats: TeamsStatsType[];
}

export default function TeamCharts({ teamStats }: TeamChartsProps) {
  const stats = teamStats.map((stat: TeamsStatsType) => ({
    name: stat.name,
    value: stat.completed,
  }));

  return (
    <div className="">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={50} height={50}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={stats}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
