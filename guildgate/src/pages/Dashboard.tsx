import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { AvatarSelector } from "../components/AvatarSelector";
import { ClassSelector } from "../components/ClassSelector";
import { Button } from "../components/Button";
import { Party } from "../components/Party";
import { FooterCopyright } from "../components/FooterCopyright";
import { User, Users } from "lucide-react";

export function Dashboard() {
	const {
		userLogged,
		parties,
		dashboardModalVisible,
		setDashboardModalVisible,
		dashboardModalType,
		setDashboardModalType,
		editUser,
		logout,
		determinePartyStyle,
		createParty,
		editParty,
		joinParty,
		leaveParty,
		deleteParty,
		unavailablePartyClick,
	} = useContext(UserContext);

	const [userLoggedInfo, setUserLoggedInfo] = useState({
		level: userLogged.level,
		server: userLogged.server,
		avatar: userLogged.avatar,
		class: userLogged.class,
		password: "",
		confirmPassword: "",
	});

	const [partyInfo, setPartyInfo] = useState({
		objective: "",
		levelRequirement: "",
		inputDate: "",
		inputTime: "",
	});

	const [editPartyInfo, setEditPartyInfo] = useState({
		id: "",
		objective: "",
		levelRequirement: "",
		inputDate: "",
		inputTime: "",
	});

	function showEditProfilePopup() {
		setDashboardModalVisible(true);
		setDashboardModalType("editProfile");
	}

	function showCreatePartyPopup() {
		setDashboardModalVisible(true);
		setDashboardModalType("createParty");
		setPartyInfo({
			objective: "",
			levelRequirement: "",
			inputDate: "",
			inputTime: "",
		});
	}

	function showEditPartyPopup(party: any) {
		setDashboardModalVisible(true);
		setDashboardModalType("editParty");
		setEditPartyInfo({
			id: party.id,
			objective: party.objective.value,
			levelRequirement: party.levelRequirement,
			inputDate: party.partyDate.split(" ")[0],
			inputTime: party.partyDate.split(" ")[1],
		});
	}

	function onPopupCancel() {
		setDashboardModalVisible(false);
		setDashboardModalType(null);
		setUserLoggedInfo({
			level: userLogged.level,
			server: userLogged.server,
			avatar: userLogged.avatar,
			class: userLogged.class,
			password: "",
			confirmPassword: "",
		});
		setPartyInfo({
			objective: "",
			levelRequirement: "",
			inputDate: "",
			inputTime: "",
		});
	}

	function onEditUser() {
		editUser(userLoggedInfo);
	}

	function handleLogout() {
		logout();
	}

	function onCreateParty() {
		createParty(partyInfo);
	}

	function onEditParty() {
		editParty(editPartyInfo);
	}

	function onLeaveParty(party: any) {
		leaveParty(party);
	}

	function onJoinParty(party: any) {
		joinParty(party);
	}

	function onUnavailablePartyClick() {
		unavailablePartyClick();
	}

	function handlePartyClickAction(party: any) {
		const style = determinePartyStyle(userLogged, party.id);
		switch (style) {
			case "joined-party":
				onLeaveParty(party);
				break;
			case "created-party":
				showEditPartyPopup(party);
				break;
			case "available-party":
				onJoinParty(party);
				break;
			case "unavailable-party":
				onUnavailablePartyClick();
				break;
		}
	}

	function handleDeleteParty(party: any) {
		deleteParty(party);
	}

	function handleProfileChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
		const { name, value } = event.target;

		// Verifica del livello compreso tra 1 e 100
		if (name === "level") {
			// Campo vuoto per poter cancellare tutto il numero
			if (value === "") {
				setUserLoggedInfo((prev) => ({ ...prev, [name]: "" }));
				return;
			}
			const num = parseInt(value, 10);

			if (isNaN(num) || num < 1 || num > 100) {
				return;
			}

			setUserLoggedInfo((prev) => ({
				...prev,
				[name]: num.toString(),
			}));
			return;
		}

		setUserLoggedInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleAvatarSelect(avatarId: string) {
		setUserLoggedInfo((prev) => ({
			...prev,
			avatar: avatarId,
		}));
	}

	function handleClassSelect(classId: string) {
		setUserLoggedInfo((prev) => ({
			...prev,
			class: classId,
		}));
	}

	function handlePartyChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
		const { name, value } = event.target;

		let key: string = name;
		if (name === "level") key = "levelRequirement";
		if (name === "date") key = "inputDate";
		if (name === "time") key = "inputTime";

		// Verifica del livello compreso tra 1 e 100
		if (name === "level") {
			if (value === "") {
				setPartyInfo((prev) => ({ ...prev, [key]: "" }));
				return;
			}

			const num = parseInt(value, 10);
			if (isNaN(num) || num < 1 || num > 100) {
				return;
			}

			setPartyInfo((prev) => ({ ...prev, [key]: num.toString() }));
			return;
		}

		setPartyInfo((prev) => ({ ...prev, [key]: value }));
	}

	function handleEditPartyChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
		const { name, value } = event.target;

		let key: string = name;
		if (name === "level") key = "levelRequirement";
		if (name === "date") key = "inputDate";
		if (name === "time") key = "inputTime";

		// Verifica del livello compreso tra 1 e 100
		if (name === "level") {
			if (value === "") {
				setEditPartyInfo((prev) => ({ ...prev, [key]: "" }));
				return;
			}

			const num = parseInt(value, 10);
			if (isNaN(num) || num < 1 || num > 100) {
				return;
			}

			setEditPartyInfo((prev) => ({ ...prev, [key]: num.toString() }));
			return;
		}

		setEditPartyInfo((prev) => ({ ...prev, [key]: value }));
	}

	const filteredAndSortedParties = parties
		.filter((party: any) => {
			const style = determinePartyStyle(userLogged, party.id);
			return style !== "unavailable-party";
		})
		.sort((a: any, b: any) => {
			const styleA = determinePartyStyle(userLogged, a.id);
			const styleB = determinePartyStyle(userLogged, b.id);

			const getGroupPriority = (style: string) => {
				if (style === "created-party" || style === "joined-party") return 0;
				if (style === "available-party") return 1;
				return 2;
			};

			const priorityA = getGroupPriority(styleA);
			const priorityB = getGroupPriority(styleB);

			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			// Ordina per data più vicina
			const dateA = new Date(a.partyDate).getTime();
			const dateB = new Date(b.partyDate).getTime();

			return dateA - dateB;
		});

	return (
		<div>
			<div className="bg-image-container relative w-full">
				<img
					src="/src/assets/bg-images/user-bg-image.png"
					alt="Background Image"
					className="absolute h-[230px] w-full -z-1 opacity-40 object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_80px,black_calc(80%-50px),transparent_100%),linear-gradient(to_right,transparent_0%,black_80px,black_calc(100%-80px),transparent_100%)] [mask-composite:intersect]"
				/>
			</div>
			<div className="dashboard-container flex flex-col gap-7 mx-4 items-center">
				<div className="logo-container flex justify-center mt-8">
					<img src="/src/assets/logo/guildgate-text.png" alt="GuildGate Logo" className="w-70" />
				</div>

				{/* User Area */}
				<div className="user-area flex flex-col gap-2 border border-white/20 rounded-md items-center py-2 px-1 w-full min-w-90 max-w-120">
					<div className="flex w-full items-center">
						<div className="flex flex-col flex-1 items-center">
							<img src={`/src/assets/avatars/${userLogged.avatar}.png`} alt="User Avatar" className="size-16" />
						</div>
						<div className="flex flex-col grow">
							<h2 className="font-bold text-lg">{userLogged.nickname}</h2>
							<p className="opacity-70">{`Lvl. ${userLogged.level}`}</p>
						</div>
						<div className="flex flex-col flex-1 items-center">
							<img src={`/src/assets/icons/${userLogged.class}.png`} alt="User Class" className="size-14" />
						</div>
					</div>
					<div className="flex w-full justify-between px-5">
						<button className="user-button font-bold text-sm" onClick={showEditProfilePopup}>
							✎ Edit Profile
						</button>
						<button className="user-button font-bold text-sm" onClick={handleLogout}>
							⏻ Logout
						</button>
					</div>
				</div>

				{/* Create Party Button */}
				<div className="flex w-full gap-3 items-center justify-around">
					<div className="h-0.25 w-full bg-white/20"></div>
					<Button
						text="Create Party"
						buttonStyle="primaryButton"
						className="text-sm max-w-40"
						onClick={showCreatePartyPopup}
					></Button>
					<div className="h-0.25 w-full bg-white/20"></div>
				</div>

				{/* Available Parties */}
				<div className="flex flex-col items-center">
					<h2 className="font-bold text-lg">Available Parties</h2>
					<div className="flex items-center gap-2">
						<h3>{userLogged.server}</h3>
						<div className="server-dot-container">
							<div className="pulsing-ring"></div>
							<div className="dot"></div>
						</div>
					</div>
				</div>
				<div className="available-party-area flex flex-col gap-4 w-full max-w-150">
					{filteredAndSortedParties.length > 0 ? (
						filteredAndSortedParties.map((party: any) => (
							<Party
								objective={party.objective}
								server={party.server}
								partyCreator={party.partyCreator}
								levelRequirement={party.levelRequirement}
								partyStyle={determinePartyStyle(userLogged, party.id)}
								joinedClasses={party.joinedClasses}
								partyDate={party.partyDate}
								onPartyButtonClick={() => handlePartyClickAction(party)}
								onDeletePartyClick={() => handleDeleteParty(party)}
							></Party>
						))
					) : (
						<p className="text-center text-sm text-white/70">
							There are currently no available parties. You can create a party with the dedicated button above or try
							changing your user info.
						</p>
					)}
				</div>

				{/* Unavailable Parties */}
				<div className="flex flex-col items-center">
					<h2 className="font-bold text-lg">Unavailable Parties</h2>
				</div>
				<div className="unavailable-party-area flex flex-col gap-4 w-full max-w-150">
					{parties
						.slice()
						.filter((party: any) => {
							const style = determinePartyStyle(userLogged, party.id);
							return style === "unavailable-party";
						})
						.sort((a: any, b: any) => {
							// Ordina per data più vicina
							const dateA = new Date(a.partyDate).getTime();
							const dateB = new Date(b.partyDate).getTime();

							return dateA - dateB;
						})
						.map((party: any) => (
							<Party
								objective={party.objective}
								server={party.server}
								partyCreator={party.partyCreator}
								levelRequirement={party.levelRequirement}
								partyStyle={determinePartyStyle(userLogged, party.id)}
								joinedClasses={party.joinedClasses}
								partyDate={party.partyDate}
								onPartyButtonClick={() => handlePartyClickAction(party)}
							></Party>
						))}
				</div>
				<div className="flex flex-col items-center mt-2 gap-10 mb-2">
					<img src="/src/assets/logo/login-footer-icon.png" alt="Footer logo" />
					<FooterCopyright></FooterCopyright>
				</div>
			</div>

			{
				// Dashboard Modal Area
				dashboardModalVisible &&
					(() => {
						switch (dashboardModalType) {
							// Edit Profile Popup
							case "editProfile":
								return (
									<div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs">
										<div className="dashboard-popup-container flex flex-col border gap-4 rounded-md p-4 max-w-95">
											<div className="flex items-center">
												<User className="size-5" color="#bc9156"></User>
												<h2 className="font-bold text-lg ml-2">Edit Profile Info</h2>
											</div>
											<form className="form-wrapper flex gap-2">
												<Input
													label="Level"
													name="level"
													placeholder="1 - 100"
													className="flex-1"
													onChange={handleProfileChange}
													value={userLoggedInfo.level}
												></Input>
												<Select
													label="Server"
													name="server"
													className="flex-1"
													onChange={handleProfileChange}
													value={userLoggedInfo.server}
												></Select>
											</form>
											<AvatarSelector value={userLoggedInfo.avatar} onSelect={handleAvatarSelect}></AvatarSelector>
											<ClassSelector value={userLoggedInfo.class} onSelect={handleClassSelect}></ClassSelector>
											<Input
												label="Password"
												type="password"
												name="password"
												placeholder="Insert your password"
												showPasswordToggle
												value={userLoggedInfo.password}
												onChange={handleProfileChange}
											></Input>
											<Input
												label="Confirm Password"
												type="password"
												name="confirmPassword"
												placeholder="Confirm your password"
												showPasswordToggle
												value={userLoggedInfo.confirmPassword}
												onChange={handleProfileChange}
											></Input>
											<div className="flex gap-2">
												<Button
													text="Cancel"
													buttonStyle="secondaryButton"
													className="flex-1"
													onClick={onPopupCancel}
												></Button>
												<Button
													text="Save Changes"
													buttonStyle="primaryButton"
													className="flex-2"
													onClick={onEditUser}
												></Button>
											</div>
										</div>
									</div>
								);

							// Create new Party Popup
							case "createParty":
								return (
									<div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs">
										<div className="dashboard-popup-container flex flex-col border gap-4 rounded-md p-4 max-w-95">
											<div className="flex items-center">
												<Users className="size-5" color="#bc9156"></Users>
												<h2 className="font-bold text-lg ml-2">Create new Party</h2>
											</div>
											<Select
												label="Objective"
												name="objective"
												value={partyInfo.objective}
												onChange={handlePartyChange}
											></Select>
											<form className="form-wrapper flex gap-2">
												<Input
													label="Minimum Level"
													name="level"
													placeholder="1 - 100"
													className="flex-1"
													onChange={handlePartyChange}
													value={partyInfo.levelRequirement}
												></Input>
											</form>
											<div className="form-wrapper flex gap-2">
												<Input
													label="Date"
													name="date"
													type="date"
													className="flex-1"
													onChange={handlePartyChange}
													value={partyInfo.inputDate}
												></Input>
												<Input
													label="Time"
													name="time"
													type="time"
													className="flex-1"
													onChange={handlePartyChange}
													value={partyInfo.inputTime}
												></Input>
											</div>
											<div className="flex gap-2">
												<Button
													text="Cancel"
													buttonStyle="secondaryButton"
													className="flex-1"
													onClick={onPopupCancel}
												></Button>
												<Button
													text="Create Party"
													buttonStyle="primaryButton"
													className="flex-2"
													onClick={onCreateParty}
												></Button>
											</div>
										</div>
									</div>
								);

							// Edit Party Popup
							case "editParty":
								return (
									<div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs">
										<div className="dashboard-popup-container flex flex-col border gap-4 rounded-md p-4 max-w-95">
											<div className="flex items-center">
												<Users className="size-5" color="#bc9156"></Users>
												<h2 className="font-bold text-lg ml-2">Edit Party Info</h2>
											</div>
											<Select
												label="Objective"
												name="objective"
												value={editPartyInfo.objective}
												onChange={handleEditPartyChange}
											></Select>
											<form className="form-wrapper flex gap-2">
												<Input
													label="Minimum Level"
													name="level"
													placeholder="1 - 100"
													className="flex-1"
													value={editPartyInfo.levelRequirement}
													onChange={handleEditPartyChange}
												></Input>
											</form>
											<div className="form-wrapper flex gap-2">
												<Input
													label="Date"
													name="date"
													type="date"
													className="flex-1"
													value={editPartyInfo.inputDate}
													onChange={handleEditPartyChange}
												></Input>
												<Input
													label="Time"
													name="time"
													type="time"
													className="flex-1"
													value={editPartyInfo.inputTime}
													onChange={handleEditPartyChange}
												></Input>
											</div>
											<div className="flex gap-2">
												<Button
													text="Cancel"
													buttonStyle="secondaryButton"
													className="flex-1"
													onClick={onPopupCancel}
												></Button>
												<Button
													text="Save Changes"
													buttonStyle="primaryButton"
													className="flex-2"
													onClick={onEditParty}
												></Button>
											</div>
										</div>
									</div>
								);
						}
					})()
			}
			<ToastContainer limit={2}></ToastContainer>
		</div>
	);
}
