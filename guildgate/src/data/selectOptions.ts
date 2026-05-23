export type SelectOption = {
	value: string;
	label: string;
	category: string;
	imageUrl: string;
	alt: string;
};

export const DEFAULT_OPTIONS: Record<string, SelectOption[]> = {
	server: [
		{ value: "europe", label: "Europe", category: "", imageUrl: "", alt: "" },
		{ value: "america", label: "America", category: "", imageUrl: "", alt: "" },
		{ value: "asia", label: "Asia", category: "", imageUrl: "", alt: "" },
		{ value: "oceania", label: "Oceania", category: "", imageUrl: "", alt: "" },
	],
	objective: [
		{
			value: "dwarves",
			label: "Dwarves' Mine",
			category: "Dungeon",
			imageUrl: "src/assets/objectives-images/dwarves.jpg",
			alt: "Dwarves Image",
		},
		{
			value: "sunken",
			label: "Sunken Keep",
			category: "Dungeon",
			imageUrl: "src/assets/objectives-images/sunken.jpg",
			alt: "Sunken Keep Image",
		},
		{
			value: "woods",
			label: "Whispering Woods",
			category: "Dungeon",
			imageUrl: "src/assets/objectives-images/woods.jpg",
			alt: "Whispering Woods Image",
		},
		{
			value: "obsidian",
			label: "Obsidian Rift",
			category: "Dungeon",
			imageUrl: "src/assets/objectives-images/obsidian.jpg",
			alt: "Obsidian Rift Image",
		},
		{
			value: "falkor",
			label: "Falkor the Worldbreaker",
			category: "Boss",
			imageUrl: "/src/assets/objectives-images/falkor.png",
			alt: "Falkor Image",
		},
		{
			value: "shadows",
			label: "The Dark Shadows",
			category: "Boss",
			imageUrl: "/src/assets/objectives-images/shadows.png",
			alt: "Shadows Image",
		},
		{
			value: "malakor",
			label: "Malakor the Voidborn",
			category: "Boss",
			imageUrl: "/src/assets/objectives-images/malakor.jpg",
			alt: "Malakor Image",
		},
		{
			value: "broodmother",
			label: "Broodmother Vexia",
			category: "Boss",
			imageUrl: "/src/assets/objectives-images/broodmother.jpg",
			alt: "Broodmother Image",
		},
		{
			value: "golem",
			label: "The Iron Golem",
			category: "Boss",
			imageUrl: "/src/assets/objectives-images/golem.jpg",
			alt: "Iron Golem Image",
		},
	],
};

export const getObjectiveByValue = (value: string): SelectOption | undefined => {
	return DEFAULT_OPTIONS.objective.find((item) => item.value === value);
};