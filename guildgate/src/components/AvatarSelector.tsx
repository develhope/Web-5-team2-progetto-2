type AvatarOptions = {
	id: string;
	alt: string;
	imageUrl: string;
};

type AvatarSelectorProps = {
	value: string;
	onSelect: (avatarId: string) => void;
};

const options: AvatarOptions[] = [
	{
		id: "avatar-1",
		alt: "avatar-1",
		imageUrl: "/src/assets/avatars/avatar-1.png",
	},
	{
		id: "avatar-2",
		alt: "avatar-2",
		imageUrl: "/src/assets/avatars/avatar-2.png",
	},
	{
		id: "avatar-3",
		alt: "avatar-3",
		imageUrl: "/src/assets/avatars/avatar-3.png",
	},
	{
		id: "avatar-4",
		alt: "avatar-4",
		imageUrl: "/src/assets/avatars/avatar-4.png",
	},
	{
		id: "avatar-5",
		alt: "avatar-5",
		imageUrl: "/src/assets/avatars/avatar-5.png",
	},
];

export const AvatarSelector = ({ value, onSelect }: AvatarSelectorProps) => {
	return (
		<div className="avatar-container">
			<label className="avatar-label block mb-2 text-lg">Avatar</label>
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
							>
								<img
									src={option.imageUrl}
									alt={option.alt}
									className={`w-full size-14 ${isChecked ? "grayscale-0" : "grayscale"}`}
								/>
							</button>
						</>
					);
				})}
			</div>
		</div>
	);
};
