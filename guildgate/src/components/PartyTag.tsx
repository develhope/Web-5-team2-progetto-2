type PartyTagProps = {
	title?: string;
};

export const PartyTag = ({ title }: PartyTagProps) => {
	return <button className="party-tag border rounded bg-black/75 font-bold text-xs px-4 py-1">{title}</button>;
};
