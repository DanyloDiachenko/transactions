import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { IResponseTransactionLoader } from "../types/types";
import { CategoryModal } from "./CategoryModal";

export const TransactionForm = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader;

	const [visibilityModal, setVisibilityModal] = useState<boolean>(false);

	return (
		<>
			{visibilityModal && (
				<CategoryModal
					setVisibilityModal={setVisibilityModal}
					type="post"
				/>
			)}
			<div className="rounded-md bg-slate-800 p-4">
				<Form
					className="grid gap-2"
					method="post"
					action="/transactions"
				>
					<label className="grid" htmlFor="title">
						<span>Title</span>
						<input
							type="text"
							className="input border-slate-700"
							placeholder="Title..."
							name="title"
							required
						/>
					</label>
					<label className="grid" htmlFor="amount">
						<span>Amount</span>
						<input
							type="number"
							className="input border-slate-700"
							placeholder="Amount..."
							name="amount"
							required
						/>
					</label>

					{categories.length ? (
						<label htmlFor="category" className="grid">
							<span>Category</span>
							<select
								name="category"
								className="input border-slate-700"
								required
							>
								{categories.map((category, index) => (
									<option key={index} value={category.id}>
										{category.title}
									</option>
								))}
							</select>
						</label>
					) : (
						<span className="mt-1 text-red-300">
							To continue create a category first
						</span>
					)}
					<button
						className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
						onClick={() => setVisibilityModal(true)}
					>
						<FaPlus />
						<span>Manage Categories</span>
					</button>
					<div className="flex gap-4 items-center">
						<label className="cursor-pointer flex items-center gap-2">
							<input
								type="radio"
								name="type"
								value="income"
								className="form-radio text-blue-600"
							/>
							<span>Income</span>
						</label>
						<label className="cursor-pointer flex items-center gap-2">
							<input
								type="radio"
								name="type"
								value="expense"
								className="form-radio text-blue-600"
							/>
							<span>Expense</span>
						</label>
					</div>
					<button
						type="submit"
						className="btn btn-green max-w-fit mt-2"
					>
						Submit
					</button>
				</Form>
			</div>
		</>
	);
};
