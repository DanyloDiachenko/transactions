import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface ChartProps {
	totalIncome: number;
	totalExpense: number;
}

interface IData {
	value: number;
	name: string;
}

const COLORS = ["#00C49F", "#FF9042"];

export const Chart = ({ totalIncome, totalExpense }: ChartProps) => {
	const data = new Array<IData>(
		{
			value: totalIncome,
			name: "Income",
		},
		{
			value: totalExpense,
			name: "Expense",
		},
	);

	return (
		<PieChart width={240} height={240}>
			<Pie
				data={data}
				cx="50%"
				cy="50%"
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				paddingAngle={2}
				dataKey="value"
			>
				{data.map((_, index) => (
					<Cell
						key={`cell-${index}`}
						fill={COLORS[index % COLORS.length]}
					/>
				))}
			</Pie>
			<Legend />
			<Tooltip />
		</PieChart>
	);
};
