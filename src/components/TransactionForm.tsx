import { FaPlus } from "react-icons/fa";
import { Form } from "react-router-dom";

export const TransactionForm = () => {
	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form className="grid gap-2" method="post" action="/transactions">
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
					<span>Title</span>
					<input
						type="number"
						className="input border-slate-700"
						placeholder="Amount..."
						name="amount"
						required
					/>
				</label>
				<label htmlFor="category" className="grid">
					<span>Category</span>
					<select
						name="category"
						className="input border-slate-700"
						required
					>
						<option value="1">Salary</option>
						<option value="2">Gift</option>
						<option value="3">Grocery</option>
					</select>
				</label>
				<button
					className="mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
					onClick={() => {}}
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
				<button type="submit" className="btn btn-green max-w-fit mt-2">
					Submit
				</button>
			</Form>
		</div>
	);
};
