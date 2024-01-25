import { Form } from "react-router-dom";

interface CategoryModalProps {
	type: "post" | "patch";
	id?: number;
	setVisibilityModal: (visibility: boolean) => void;
}

export const CategoryModal = ({
	type,
	id,
	setVisibilityModal,
}: CategoryModalProps) => {
	return (
		<div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center z-10">
			<Form
				className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
				action="/categories"
				method={type}
				onSubmit={() => setVisibilityModal(false)}
			>
				<label htmlFor="title">
					<small>Category Title</small>
					<input
						className="input w-full"
						type="text"
						name="title"
						placeholder="Title..."
					/>
					<input type="hidden" name="id" value={id} />
				</label>
				<div className="flex items-center gap-2">
					<button className="btn btn-green" type="submit">
						{type === "patch" ? "Save" : "Create"}
					</button>
					<button
						className="btn btn-red"
						onClick={() => setVisibilityModal(false)}
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	);
};
