import { Outlet } from "react-router-dom";
import { FooterCopyright } from "./FooterCopyright";
import { ToastContainer } from "react-toastify";

export function Layout() {
	return (
		<div>
			<main>
				<Outlet></Outlet>
			</main>
			<footer>
				<FooterCopyright></FooterCopyright>
				<ToastContainer limit={2}></ToastContainer>
			</footer>
		</div>
	);
}
