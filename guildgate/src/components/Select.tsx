import type { SelectHTMLAttributes } from "react";
import { Globe, Shield, ChevronDown } from "lucide-react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label: string;
	onChange?: () => void;
};

type SelectOption = {
	value: string;
	label: string;
};

// Tutte le options per i campi select
const DEFAULT_OPTIONS: Record<string, SelectOption[]> = {
	server: [
		{ value: "europe", label: "Europe" },
		{ value: "america", label: "America" },
		{ value: "asia", label: "Asia" },
		{ value: "oceania", label: "Oceania" },
	],
	objective: [
		{ value: "dwarves", label: "Dwarves' Mine" },
		{ value: "falkor", label: "Falkor the Worldbreaker" },
		{ value: "shadows", label: "The Dark Shadows" },
	],
};

export const Select = ({ label, name, value = "", className, onChange }: SelectProps) => {
	// Cambia l'icona in base al name della select
	const getSelectIcon = () => {
		const iconClass = "h-5 w-5";
		switch (name) {
			case "server":
				return <Globe className={iconClass} />;
			case "objective":
				return <Shield className={iconClass} />;
		}
	};

	const selectOptions = name ? DEFAULT_OPTIONS[name] : [];

	return (
		<div className={`select-container ${className}`}>
			<label className="select-label block mb-2 text-lg">{label}</label>
			<div className="relative flex items-center">
				<div className="select-icon-container absolute left-3 flex items-center">{getSelectIcon()}</div>
				<select
					name={name}
					className="select-field w-full pl-10 pr-10 py-2 border rounded-md text-sm"
					value={value}
					onChange={onChange}
				>
					{/* Option usata come placeholder */}
					<option value="" disabled hidden>
						{name === "objective" ? "Select an objective for your party" : "Pick your server"}
					</option>
					{selectOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<div className="select-arrow-container absolute right-3 flex items-center">
					<ChevronDown className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
};
