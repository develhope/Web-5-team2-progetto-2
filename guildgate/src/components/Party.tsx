import { useEffect, useState } from "react";
import type { SelectOption } from "../data/selectOptions";
import { Button } from "./Button";
import { PartyTag } from "./PartyTag";

type Class = "warrior" | "tank" | "assassin" | "archer" | "druid";

type PartyProps = {
	objective: SelectOption | undefined;
	server: string;
	partyCreator: string;
	levelRequirement: string | number;
	partyStyle: "joined-party" | "created-party" | "available-party" | "unavailable-party";
	joinedClasses: Class[];
	partyDate: string | Date;
};

export const Party = ({
	objective,
	server,
	partyCreator,
	levelRequirement,
	partyStyle,
	joinedClasses,
	partyDate,
}: PartyProps) => {
	const renderButtons = () => {
		switch (partyStyle) {
			case "joined-party":
				return <Button text="Leave Party" buttonStyle="secondaryButton" className="text-xs"></Button>;
			case "created-party":
				return <Button text="Edit Party" buttonStyle="primaryButton" className="text-xs"></Button>;
			case "available-party":
				return <Button text="Join Party" buttonStyle="primaryButton" className="text-xs"></Button>;
			case "unavailable-party":
				return (
					<Button
						text="Join Party"
						buttonStyle="secondaryButton"
						className="text-xs opacity-50 pointer-events-none"
					></Button>
				);
		}
	};

	const getClassOpacity = (className: Class) => {
		return joinedClasses.includes(className) ? "opacity-100 filter-none" : "opacity-60 grayscale";
	};
	const [timeLeft, setTimeLeft] = useState("");
	const showCountdown = partyStyle === "joined-party" || partyStyle === "created-party";

	useEffect(() => {
		if (!showCountdown) return;

		const calculateTimeLeft = () => {
			const difference = new Date(partyDate).getTime() - new Date().getTime();

			if (difference <= 0) {
				setTimeLeft("Expired");
				return;
			}

			// Converte i millisecondi in cifre meglio leggibili
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((difference / 1000 / 60) % 60);

			// Se il countdown di giorni o di ore sono 0, vengono tolti
			const daysStr = days > 0 ? `${days}d ` : "";
			const hoursStr = hours > 0 || days > 0 ? `${hours}h ` : "";

			setTimeLeft(`${daysStr}${hoursStr}${minutes}m`);
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, [partyDate, showCountdown]);

	const formatStaticDate = (dateInput: string | Date) => {
		const date = new Date(dateInput);

		// padStart aggiunge uno 0 se la cifra ha meno di 2 caratteri
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0"); // + 1 perché i mesi partono da 0
		const year = date.getFullYear();

		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${day}/${month}/${year} - ${hours}:${minutes}`;
	};

	return (
		<div className="flex flex-col items-center">
			<div
				className={`party-container flex flex-col gap-1 border border-2 rounded-md w-full overflow-hidden ${partyStyle}`}
			>
				<div className="objective-image relative">
					<img
						src={objective?.imageUrl}
						alt={objective?.alt}
						className="absolute -z-1 w-full -top-10 object-cover opacity-30"
					/>
				</div>
				<div className="tag-wrapper flex gap-2 mx-3 mt-2">
					<PartyTag title={objective?.category}></PartyTag>
					<PartyTag title={server}></PartyTag>
				</div>
				<h2 className="font-bold text-xl mx-3 my-0">{objective?.label}</h2>
				<p className="text-sm mx-3">{`by ${partyCreator}`}</p>
				<div className="flex justify-between mx-3">
					<span className="level-req font-bold">{`Lvl. ${levelRequirement}+`}</span>
					<span className="font-bold text-sm"> {showCountdown ? timeLeft : formatStaticDate(partyDate)}</span>
				</div>
				<div className="party-bottom-area flex justify-between items-center px-3 py-2">
					<div className="party-class-area flex items-center gap-2">
						<div className="class-slots flex items-center gap-2">
							<img
								src="/src/assets/icons/warrior.png"
								alt="Warrior Slot"
								className={`size-8 p-0.5 border items-center justify-center ${getClassOpacity("warrior")}`}
							/>
							<img
								src="/src/assets/icons/tank.png"
								alt="Tank Slot"
								className={`size-8 p-0.5 border items-center justify-center ${getClassOpacity("tank")}`}
							/>
							<img
								src="/src/assets/icons/assassin.png"
								alt="Assassin Slot"
								className={`size-8 p-0.5 border items-center justify-center ${getClassOpacity("assassin")}`}
							/>
							<img
								src="/src/assets/icons/archer.png"
								alt="Archer Slot"
								className={`size-8 p-0.5 border items-center justify-center ${getClassOpacity("archer")}`}
							/>
							<img
								src="/src/assets/icons/druid.png"
								alt="Druid Slot"
								className={`size-8 p-0.5 border items-center justify-center ${getClassOpacity("druid")}`}
							/>
						</div>
						<div className="slots-number font-bold">{joinedClasses.length}/5</div>
					</div>
					<div className="party-button-area">{renderButtons()}</div>
				</div>
			</div>
		</div>
	);
};
