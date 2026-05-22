export const FooterCopyright = () => {
	return (
		<div className="footer-copyright-container flex flex-col w-full items-center mb-5">
			{/* Prende l'anno attuale */}
			<p className="footer-app-name text-sm">&copy; {new Date().getFullYear()} GuildGate</p>
			{/* Prende la versione attuale dell'app da package.json */}
			<p className="footer-app-version text-xs">v{import.meta.env.APP_VERSION}</p>
		</div>
	);
};
