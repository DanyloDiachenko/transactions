import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

import { CategoryModal } from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { ICategory } from "../types/types";

export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData();
			const title = { title: formData.get("title") };

			console.log(`Bearer ${getTokenFromLocalStorage() || ""}`);
			await instance.post("/categories", title);

			return null;
		}
		case "PATCH": {
			const formData = await request.formData();
			const category = {
				id: formData.get("id"),
				title: formData.get("title"),
			};

			await instance.patch(
				`/categories/category/${category.id}`,
				category,
			);

			return null;
		}
		case "DELETE": {
			const formData = await request.formData();
			const categoryId = formData.get("id");

			await instance.delete(`/categories/category/${categoryId}`);

			return null;
		}
	}
};

export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>("/categories");

	return data;
};

export const Categories = () => {
	const categories = useLoaderData() as ICategory[];

	const [visibilityModal, setVisibilityModal] = useState<boolean>(false);
	const [categoryId, setCategoryId] = useState<number>(-1);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<>
			{visibilityModal && (
				<CategoryModal
					type="post"
					id={1}
					setVisibilityModal={setVisibilityModal}
				/>
			)}
			{visibilityModal && isEdit && (
				<CategoryModal
					type="patch"
					id={categoryId}
					setVisibilityModal={setVisibilityModal}
				/>
			)}

			<div className="mt-10 p-4 rounded-md bg-slate-800">
				<h1>Your category list:</h1>
				<div className="mt-2 flex flex-wrap items-center gap-2">
					{categories.map((category, index) => (
						<div
							key={index}
							className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
						>
							{category.title}
							<div className="hidden absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
								<button
									onClick={() => {
										setVisibilityModal(true);
										setCategoryId(category.id);
										setIsEdit(true);
									}}
								>
									<AiFillEdit />
								</button>

								<Form
									method="delete"
									className="flex"
									action="/categories"
								>
									<input
										name="id"
										type="hidden"
										value={category.id}
									/>
									<button type="submit">
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>
				<button
					className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
					onClick={() => setVisibilityModal(true)}
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>
		</>
	);
};
