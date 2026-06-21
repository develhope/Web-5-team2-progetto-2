type ClassOptions = {
	id: string;
	name: string;
	alt: string;
	imageUrl: string;
};

type ClassSelectorProps = {
	value: string;
	onSelect: (classId: string) => void;
};

const options: ClassOptions[] = [
	{
		id: "warrior",
		name: "Warrior",
		alt: "warrior",
		imageUrl: "/src/assets/icons/warrior.png",
	},
	{
		id: "tank",
		name: "Tank",
		alt: "tank",
		imageUrl: "/src/assets/icons/tank.png",
	},
	{
		id: "assassin",
		name: "Assassin",
		alt: "assassin",
		imageUrl: "/src/assets/icons/assassin.png",
	},
	{
		id: "archer",
		name: "Archer",
		alt: "archer",
		imageUrl: "/src/assets/icons/archer.png",
	},
	{
		id: "druid",
		name: "Druid",
		alt: "druid",
		imageUrl: "/src/assets/icons/druid.png",
	},
];

export const ClassSelector = ({ value, onSelect }: ClassSelectorProps) => {
	// Soluzione temporanea per mostrare lo styling del checked
	return (
		<div className="class-container">
			<label className="class-label block mb-2 text-lg">Class</label>
			<div role="radio-group" className="flex flex-row w-full justify-between">
				{options.map((option) => {
					const isChecked = value === option.id;
					return (
						<>
							<button
								key={option.id}
								type="button"
								role="radio"
								aria-checked={isChecked}
								onClick={() => onSelect(option.id)}
								className={`flex flex-col border rounded size-15 items-center justify-center ${isChecked ? "class-selector-checked" : "class-selector-unchecked"}`}
							>
								<img
									src={option.imageUrl}
									alt={option.alt}
									className={`size-8 ${isChecked ? "grayscale-0" : "grayscale opacity-60"}`}
								/>
								<p className="text-xs">{option.name}</p>
							</button>
						</>
					);
				})}
			</div>
		</div>
	);
};
