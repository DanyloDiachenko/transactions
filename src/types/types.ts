export interface IUser {
	id: number;
	email: string;
	token: string;
}

export interface IUserData {
	email: string;
	password: string;
}

export interface IResponseUser {
	createdAt: string;
	email: string;
	id: number;
	password: string;
	updatedAt: string;
}

export interface IResponseUserData {
	token: string;
	user: IResponseUser;
}

export interface ICategory {
	title: string;
	id: number;
	createdAt: string;
	updatedAt: string;
	transactions: [];
}

export interface IResponseTransactionLoader {
	categories: ICategory[];
}
