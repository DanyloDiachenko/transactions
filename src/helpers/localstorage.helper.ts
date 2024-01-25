export const getTokenFromLocalStorage = (): string => {
	const tokenString = localStorage.getItem("token");
	const token = tokenString ? JSON.parse(tokenString) : "";

	return token;
};

export const setTokenToLocalStorage = (key: string, token: string): void => {
	localStorage.setItem(key, JSON.stringify(token));
};

export const removeTokenFromLocalStorage = (key: string): void => {
	localStorage.removeItem(key);
};
