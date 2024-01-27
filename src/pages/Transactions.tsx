import { toast } from "react-toastify";

import { instance } from "../api/axios.api";
import { TransactionForm } from "../components/TransactionForm";
import {
	ICategory,
	IResponseTransactionLoader,
	ITransaction,
} from "../types/types";
import { TransactionTable } from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { formatToUSD } from "../helpers/currency.helper";
import { Chart } from "../components/Chart";

export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>("/categories");
	const transactions = await instance.get<ITransaction[]>("/transactions");
	const totalIncome = await instance.get<number>("/transactions/income/find");
	const totalExpense = await instance.get<number>(
		"/transactions/expense/find",
	);

	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	};

	return data;
};

export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData();
			const newTransaction = {
				title: formData.get("title"),
				amount: +formData.get("amount"),
				category: formData.get("category"),
				type: formData.get("type"),
			};

			await instance.post("/transactions", newTransaction);
			toast.success("Transaction added.");

			return null;
		}
		case "DELETE": {
			const formData = await request.formData();
			const transactionId = formData.get("id");

			await instance.delete(`/transactions/transaction/${transactionId}`);
			toast.success("Transaction deleted.");

			return null;
		}
	}
};

export const Transactions = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader;

	return (
		<>
			<div className="grid grid-cols-3 gap-4 mt-4 items-start">
				<div className="grid col-span-2">
					<TransactionForm />
				</div>
				<div className="rounded-md bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Income:
							</p>
							<p className="bg-green-600 p-1 rounded-sm text-center mt-2">
								{formatToUSD.format(totalIncome)}$
							</p>
						</div>
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Expense:
							</p>
							<p className="bg-red-500 p-1 rounded-sm text-center mt-2">
								{formatToUSD.format(totalExpense)}$
							</p>
						</div>
					</div>
					<Chart
						totalIncome={totalIncome}
						totalExpense={totalExpense}
					/>
				</div>
			</div>
			<TransactionTable limit={5} />
		</>
	);
};
