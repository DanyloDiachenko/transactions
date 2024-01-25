import axios from "axios";

import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
	baseURL: /* process.env.REACT_BACKEND_URL || */ "http://localhost:3001/api",
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage() || ""}`,
	},
});
