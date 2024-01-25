import { RouterProvider } from "react-router-dom";

import { router } from "./router/router";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/user.slice";
import { useEffect } from "react";

export const App = () => {
	const dispatch = useAppDispatch();

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();

		try {
			if (token) {
				const data = await AuthService.getProfile();

				if (data) {
					dispatch(login(data));
				} else {
					dispatch(logout());
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return <RouterProvider router={router} />;
};
