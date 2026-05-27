import { X } from "lucide-react";

type FormErrorPopupProps = {
	isOpen: boolean;
	errorMessage: string;
	onClose: () => void;
};

export const FormErrorPopup = ({ isOpen, errorMessage, onClose }: FormErrorPopupProps) => {
	if (!isOpen) {
		return null;
	} else {
		return (
			<div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs">
				<div className="error-popup-container flex flex-col border gap-2 rounded-md p-4 max-w-90">
					<div className="flex justify-between">
						<h2 className="font-bold">Error!</h2>
						<X className="size-4" onClick={onClose}></X>
					</div>

					<p>{errorMessage}</p>
				</div>
			</div>
		);
	}
};
