import { useLoaderData } from "react-router-dom";
import { instance } from "../api/axios.api";
import { TransactionForm } from "../components/TransactionForm";
import { ICategory, IResponseTransactionLoader } from "../types/types";

export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>("/categories");

	const data = {
		categories: categories.data,
	};

	return data;
};

export const transactionAction = async ({ reqest }: any) => {
	const data = {};

	return data;
};

export const Transactions = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader;

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
								1000$
							</p>
						</div>
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Expense:
							</p>
							<p className="bg-red-500 p-1 rounded-sm text-center mt-2">
								1000$
							</p>
						</div>
					</div>
					<>chart</>
				</div>
			</div>
			<h1>table</h1>
		</>
	);
};
