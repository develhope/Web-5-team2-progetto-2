export const FooterCopyright = () => {
	return (
		<div className="footer-copyright-container flex flex-col w-full items-center">
			{/* Prende l'anno attuale */}
			<p className="footer-app-name">&copy; {new Date().getFullYear()} GuildGate</p>
			{/* Prende la versione attuale dell'app da package.json */}
			<p className="footer-app-version text-sm">v{import.meta.env.APP_VERSION}</p>
		</div>
	);
};
