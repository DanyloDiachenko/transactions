import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBtc, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/user.slice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";

export const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isAuth = useAuth();

	const logoutHandler = () => {
		dispatch(logout());
		removeTokenFromLocalStorage("token");

		toast.success("You logged out.");

		navigate("/");
	};

	return (
		<header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
			<Link to="/">
				<FaBtc size={20} />
			</Link>
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to={"/"}
								className={({ isActive }) =>
									isActive ? "text-white" : "text-white/50"
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/transactions"}
								className={({ isActive }) =>
									isActive ? "text-white" : "text-white/50"
								}
							>
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/categories"}
								className={({ isActive }) =>
									isActive ? "text-white" : "text-white/50"
								}
							>
								Categories
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{isAuth ? (
				<button className="btn btn-red" onClick={logoutHandler}>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					to="/auth"
					className="py-2 text-white/50 hover:text-white ml-auto"
				>
					Log In / Sign In
				</Link>
			)}
		</header>
	);
};
