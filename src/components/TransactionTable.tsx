import { Form, useLoaderData } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { IResponseTransactionLoader } from "../types/types";
import { formatDate } from "../helpers/date.helper";
import { formatToUSD } from "../helpers/currency.helper";

export const TransactionTable = () => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader;

	console.log(transactions);
	return (
		<>
			<div className="bg-slate-800 px-4 py-1 mt-4 rounded-md">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold"> № </td>
							<td className="font-bold">Title</td>
							<td className="font-bold">Amount($)</td>
							<td className="font-bold">Category</td>
							<td className="font-bold">Date</td>
							<td className="text-right">Action</td>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{transaction.title}</td>
								<td
									className={
										transaction.type === "income"
											? "text-green-500"
											: "text-red-500"
									}
								>
									{transaction.type === "income"
										? `+ ${formatToUSD.format(transaction.amount)}`
										: `- ${formatToUSD.format(transaction.amount)}`}
								</td>
								<td>
									{transaction.category?.title || "Other"}
								</td>
								<td>{formatDate(transaction.createdAt)}</td>
								<td>
									<Form
										method="delete"
										action="/transactions"
									>
										<input
											type="hidden"
											name="id"
											value={transaction.id}
										/>
										<button className="btn hover:btn-red ml-auto">
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
