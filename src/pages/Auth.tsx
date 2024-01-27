import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/user.slice";

export const Auth = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState<boolean>(false);

	const registrationHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const data = await AuthService.registration({
				email: email,
				password: password,
			});

			if (data) {
				toast.success("Account has been created.");

				setIsLogin(!isLogin);
			}
		} catch (err: any) {
			console.log(err);

			const error = err.response?.data.message;
			if (!error) {
				return;
			}

			toast.error(error.toString());
		}
	};

	const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const data = await AuthService.login({
				email: email,
				password: password,
			});

			if (data) {
				setTokenToLocalStorage("token", data.token);
				dispatch(login(data));
				setIsLogin(!isLogin);

				toast.success("You logged in.");
				navigate("/transactions");
			}
		} catch (err: any) {
			console.log(err);

			const error = err.response?.data.message;
			if (!error) {
				return;
			}

			toast.error(error.toString());
		}
	};

	return (
		<div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
			<h1 className="text-center text-xl mb-10">
				{isLogin ? "Login" : "Registration"}
			</h1>
			<form
				className="flex w-1/3 flex-col mx-auto gap-5"
				onSubmit={isLogin ? loginHandler : registrationHandler}
			>
				<input
					type="text"
					className="input"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="btn btn-green mx-auto">
					Submit
				</button>
			</form>
			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You don`t have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	);
};
