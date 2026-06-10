import { createContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { ToastContentProps } from "react-toastify";
import mockUsers from "../data/mockUsers.json";
import mockParties from "../data/mockParties.json";
import { DEFAULT_OPTIONS, type SelectOption } from "../data/selectOptions";

interface User {
	nickname: string;
	level: string | number;
	server: string;
	avatar: string;
	class: string;
	password: string;
	confirmPassword?: string;
	joinedPartiesIDs: (string | number)[];
}

interface Party {
	id: string | number;
	objective: SelectOption | string;
	levelRequirement: string | number;
	server: string;
	partyCreator: string;
	partyStyle?: string;
	joinedClasses: string[];
	inputDate: string;
	inputTime: string;
	partyDate: string;
}

export const UserContext = createContext<any>({} as any);

export function UserProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	const [users, setUsers] = useState(() => {
		const savedUsers = localStorage.getItem("users");
		if (savedUsers) {
			return JSON.parse(savedUsers);
		} else {
			localStorage.setItem("users", JSON.stringify(mockUsers));
			return mockUsers;
		}
	});
	const [parties, setParties] = useState(() => {
		const savedParties = localStorage.getItem("parties");
		if (savedParties) {
			return JSON.parse(savedParties);
		} else {
			localStorage.setItem("parties", JSON.stringify(mockParties));
			return mockParties;
		}
	});
	const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false);
	const [userLogged, setUserLogged] = useState(() => {
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
	const [dashboardModalType, setDashboardModalType] = useState(null);

	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	useEffect(() => {
		localStorage.setItem("parties", JSON.stringify(parties));
	}, [parties]);

	type DefaultToastProps = ToastContentProps<{
		title: string;
		content: string;
	}>;

	type ConfirmationToastProps = ToastContentProps<{
		title: string;
		content: string;
		onPositive: () => void;
	}>;

	const TOAST_TITLES = {
		Success: "💪 Success!",
		Warning: "⚠️ Warning!",
		Error: "😠 Error!",
	};

	function DefaultToast({ data }: DefaultToastProps) {
		return (
			<div className="flex flex-col w-full">
				<h3 className="font-bold">{data.title}</h3>
				<div className="flex items-center justify-between">
					<p className="text-sm">{data.content}</p>
				</div>
			</div>
		);
	}

	function ConfirmationToast({ closeToast, data }: ConfirmationToastProps) {
		return (
			<div className="flex flex-col w-full">
				<h3 className="font-bold">{data.title}</h3>
				<div className="flex items-center justify-between">
					<p className="text-sm">{data.content}</p>
				</div>
				<div className="flex w-full mt-2 justify-around">
					<button
						className="primaryButton border rounded-md py-1 px-10 font-bold text-sm"
						onClick={() => {
							data.onPositive();
							closeToast();
						}}
					>
						Yes
					</button>
					<button className="secondaryButton border rounded-md py-1 px-10 font-bold text-sm" onClick={closeToast}>
						No
					</button>
				</div>
			</div>
		);
	}

	function displayToast(title: string, content: string) {
		toast(DefaultToast, {
			data: {
				title: title,
				content: content,
			},
			closeOnClick: true,
			position: "top-center",
		});
	}

	function displayConfirmationToast(title: string, content: string, onPositive: () => void) {
		toast(ConfirmationToast, {
			data: {
				title: title,
				content: content,
				onPositive: onPositive,
			},
			closeButton: false,
			autoClose: false,
			position: "top-center",
		});
	}

	function registerUser(user: User) {
		const userExists = users.find((u: User) => u.nickname === user.nickname);
		if (userExists) {
			displayToast(TOAST_TITLES.Error, "This nickname already exists.");
		} else if (user.nickname === "") {
			displayToast(TOAST_TITLES.Error, "Please insert your nickname.");
		} else if (user.level === "") {
			displayToast(TOAST_TITLES.Error, "Please insert your level.");
		} else if (user.server === "") {
			displayToast(TOAST_TITLES.Error, "Please select a server.");
		} else if (user.password === "" || user.confirmPassword === "") {
			displayToast(TOAST_TITLES.Error, "Password can't be empty.");
		} else if (user.password != user.confirmPassword) {
			displayToast(TOAST_TITLES.Error, "Passwords do not match.");
		} else {
			// Toglie confirm-password dallo user salvato
			const { confirmPassword: _, ...cleanUser } = user;
			const newUser: User = {
				...cleanUser,
				joinedPartiesIDs: [],
			};
			const updatedUsers = [...users, newUser];
			setUsers(updatedUsers);
			navigate("/");
			displayToast(TOAST_TITLES.Success, "Your registration is confirmed.");
		}
	}

	function loginUser(user: User) {
		const userExists = users.find((u: User) => u.nickname === user.nickname && u.password === user.password);
		if (userExists) {
			localStorage.setItem("isLoggedIn", JSON.stringify(true));
			setLoggedIn(true);
			localStorage.setItem("user", JSON.stringify(userExists));
			setUserLogged(userExists);
			navigate("/dashboard");
			displayToast(TOAST_TITLES.Success, "Your are now logged in.");
		} else {
			displayToast(TOAST_TITLES.Error, "The nickname or password you entered is incorrect.");
			localStorage.setItem("isLoggedIn", JSON.stringify(false));
			setLoggedIn(false);
			localStorage.removeItem("user");
			setUserLogged(null);
		}
	}

	function editUser(user: User) {
		if (userLogged.joinedPartiesIDs.length > 0) {
			displayToast(TOAST_TITLES.Error, "Delete/Leave all parties before editing your profile.");
		} else if (user.level === "") {
			displayToast(TOAST_TITLES.Error, "Please insert your level.");
		} else if (user.server === "") {
			displayToast(TOAST_TITLES.Error, "Please select a server.");
		} else if (user.password != user.confirmPassword) {
			displayToast(TOAST_TITLES.Error, "Passwords do not match.");
		} else {
			const editedUser: User = {
				...userLogged,
				level: user.level,
				server: user.server,
				avatar: user.avatar,
				class: user.class,
				password: user.password === "" && user.confirmPassword === "" ? userLogged.password : user.password,
			};
			setUserLogged(editedUser);
			localStorage.setItem("user", JSON.stringify(editedUser));
			const updatedUsers = users.map((u: User) => (u.nickname === editedUser.nickname ? editedUser : u));
			setUsers(updatedUsers);
			setDashboardModalVisible(false);
			setDashboardModalType(null);
			displayToast(TOAST_TITLES.Success, "You edited your user info.");
		}
	}

	function logout() {
		displayConfirmationToast(TOAST_TITLES.Warning, "Are you sure you want to logout?", () => {
			localStorage.setItem("isLoggedIn", JSON.stringify(false));
			setLoggedIn(false);
			localStorage.removeItem("user");
			setUserLogged(null);
			navigate("/");
			displayToast(TOAST_TITLES.Success, "You are now logged out.");
		});
	}

	function determinePartyStyle(user: User, partyID: string | number) {
		const currentParty = parties.find((p: Party) => p.id === partyID);
		if (user.joinedPartiesIDs.includes(partyID)) {
			return currentParty.partyCreator === user.nickname ? "created-party" : "joined-party";
		} else {
			if (
				user.server === currentParty.server &&
				user.level >= currentParty.levelRequirement &&
				!currentParty.joinedClasses.includes(user.class)
			) {
				return "available-party";
			} else {
				return "unavailable-party";
			}
		}
	}

	function createParty(party: Party) {
		if (party.objective === "") {
			displayToast(TOAST_TITLES.Error, "Please select an objective for your party.");
		} else if (party.levelRequirement === "") {
			displayToast(TOAST_TITLES.Error, "Please insert a level requirement for your party.");
		} else if (party.levelRequirement > userLogged.level) {
			displayToast(TOAST_TITLES.Error, "Level requirement cannot be higher than your current level.");
		} else if (party.inputDate === "") {
			displayToast(TOAST_TITLES.Error, "Please select a date for your party.");
		} else if (party.inputTime === "") {
			displayToast(TOAST_TITLES.Error, "Please select a time for your party.");
		} else if (new Date(`${party.inputDate} ${party.inputTime}`).getTime() < new Date().getTime()) {
			displayToast(TOAST_TITLES.Error, "You cannot select a date or time in the past.");
		} else {
			const objectives = DEFAULT_OPTIONS["objective"];
			const chosenObjective = objectives.find((option: any) => option.value === party.objective);
			const newParty: Party = {
				...party,
				id: parties.length + 1,
				objective: chosenObjective ? chosenObjective : party.objective,
				server: userLogged.server,
				partyCreator: userLogged.nickname,
				joinedClasses: [userLogged.class],
				partyDate: `${party.inputDate} ${party.inputTime}`,
			};
			// Rimuovo i gli input time e date dal party salvato
			const { inputDate: _, inputTime: __, ...partyWithoutInputs } = newParty;
			const updatedUserLogged = {
				...userLogged,
				joinedPartiesIDs: [...userLogged.joinedPartiesIDs, newParty.id],
			};
			localStorage.setItem("user", JSON.stringify(updatedUserLogged));
			setUserLogged(updatedUserLogged);
			const updatedUsers = users.map((u: User) => (u.nickname === updatedUserLogged.nickname ? updatedUserLogged : u));
			setUsers(updatedUsers);
			const updatedParties = [...parties, partyWithoutInputs];
			setParties(updatedParties);
			setDashboardModalVisible(false);
			setDashboardModalType(null);
			displayToast(TOAST_TITLES.Success, "You created a party.");
		}
	}

	function editParty(party: Party) {
		if (party.objective === "") {
			displayToast(TOAST_TITLES.Error, "Please select an objective for your party.");
		} else if (party.levelRequirement === "") {
			displayToast(TOAST_TITLES.Error, "Please insert a level requirement for your party.");
		} else if (party.levelRequirement > userLogged.level) {
			displayToast(TOAST_TITLES.Error, "Level requirement cannot be higher than your current level.");
		} else if (party.inputDate === "") {
			displayToast(TOAST_TITLES.Error, "Please select a date for your party.");
		} else if (party.inputTime === "") {
			displayToast(TOAST_TITLES.Error, "Please select a time for your party.");
		} else if (new Date(`${party.inputDate} ${party.inputTime}`).getTime() < new Date().getTime()) {
			displayToast(TOAST_TITLES.Error, "You cannot select a date or time in the past.");
		} else {
			const objectives = DEFAULT_OPTIONS["objective"];
			const chosenObjective = objectives.find((option: any) => option.value === party.objective);
			const editedParty: Party = {
				...party,
				objective: chosenObjective ? chosenObjective : party.objective,
				server: userLogged.server,
				partyCreator: userLogged.nickname,
				joinedClasses: [userLogged.class],
				partyDate: `${party.inputDate} ${party.inputTime}`,
			};
			const updatedUsers = users.map((u: User) => {
				return {
					...u,
					joinedPartiesIDs: u.joinedPartiesIDs.filter((pid: string | number) => pid !== editedParty.id),
				};
			});
			const updatedUsersWithLogged = updatedUsers.map((u: User) =>
				u.nickname === userLogged.nickname ? userLogged : u,
			);
			setUsers(updatedUsersWithLogged);
			// Rimuovo i gli input time e date dal party salvato
			const { inputDate: _, inputTime: __, ...partyWithoutInputs } = editedParty;
			const updatedParties = parties.map((p: Party) => (p.id === partyWithoutInputs.id ? partyWithoutInputs : p));
			setParties(updatedParties);
			setDashboardModalVisible(false);
			setDashboardModalType(null);
			displayToast(TOAST_TITLES.Success, "You edited your party.");
		}
	}

	function joinParty(party: Party) {
		const updatedParty = {
			...party,
			joinedClasses: [...party.joinedClasses, userLogged.class],
		};
		const updatedUserLogged = {
			...userLogged,
			joinedPartiesIDs: [...userLogged.joinedPartiesIDs, party.id],
		};
		localStorage.setItem("user", JSON.stringify(updatedUserLogged));
		setUserLogged(updatedUserLogged);
		const updatedUsers = users.map((u: User) => (u.nickname === updatedUserLogged.nickname ? updatedUserLogged : u));
		setUsers(updatedUsers);
		const updatedParties = parties.map((p: Party) => (p.id === party.id ? updatedParty : p));
		setParties(updatedParties);
		displayToast(TOAST_TITLES.Success, "You joined a party.");
	}

	function leaveParty(party: Party) {
		const updatedParty = {
			...party,
			joinedClasses: party.joinedClasses.filter((c: string) => c !== userLogged.class),
		};
		const updatedUserLogged = {
			...userLogged,
			joinedPartiesIDs: userLogged.joinedPartiesIDs.filter((id: string | number) => id !== party.id),
		};
		localStorage.setItem("user", JSON.stringify(updatedUserLogged));
		setUserLogged(updatedUserLogged);
		const updatedUsers = users.map((u: User) => (u.nickname === updatedUserLogged.nickname ? updatedUserLogged : u));
		setUsers(updatedUsers);
		const updatedParties = parties.map((p: Party) => (p.id === party.id ? updatedParty : p));
		setParties(updatedParties);
		displayToast(TOAST_TITLES.Success, "You left a party.");
	}

	function deleteParty(party: Party) {
		displayConfirmationToast(TOAST_TITLES.Warning, "Are you sure you want to delete this party?", () => {
			const updatedUserLogged = {
				...userLogged,
				joinedPartiesIDs: userLogged.joinedPartiesIDs.filter((id: string | number) => id !== party.id),
			};
			localStorage.setItem("user", JSON.stringify(updatedUserLogged));
			setUserLogged(updatedUserLogged);
			const updatedUsers = users.map((u: User) => {
				return {
					...u,
					joinedPartiesIDs: u.joinedPartiesIDs.filter((pid: string | number) => pid !== party.id),
				};
			});
			setUsers(updatedUsers);
			const updatedParties = parties.filter((p: Party) => p.id !== party.id);
			setParties(updatedParties);
			displayToast(TOAST_TITLES.Success, "You deleted your party.");
		});
	}

	function unavailablePartyClick() {
		displayToast(TOAST_TITLES.Error, "You don't meet the requirements to join this party.");
	}

	return (
		<UserContext.Provider
			value={{
				users,
				setUsers,
				parties,
				setParties,
				isLoggedIn,
				setLoggedIn,
				userLogged,
				setUserLogged,
				dashboardModalVisible,
				setDashboardModalVisible,
				dashboardModalType,
				setDashboardModalType,
				displayToast,
				registerUser,
				loginUser,
				editUser,
				logout,
				determinePartyStyle,
				createParty,
				editParty,
				joinParty,
				leaveParty,
				deleteParty,
				unavailablePartyClick,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
