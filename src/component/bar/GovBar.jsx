import React from "react";
import "./GovBar.css";

export default class GovBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id="GovBar" className="govbar">
				<a
					href="//gouvernement.lu"
					target="_blank"
					className="govbar-logo"
					rel="noreferrer"
					title="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)">
					<img
						src="//cdn.public.lu/pictures/logos/gov/gov-light.png"
						srcSet="//cdn.public.lu/pictures/logos/gov/gov-light-hdpi.png 1.5x,//cdn.public.lu/pictures/logos/gov/gov-light-xhdpi.png 2x,//cdn.public.lu/pictures/logos/gov/gov-light-xxhdpi.png 3x"
						alt="Gouvernement du Grand-Duché de Luxembourg (Nouvelle fenêtre)"
					/>
				</a>

				<ul className="govbar-links">
					<li>
						<a
							href="https://luxembourg.public.lu"
							target="_blank"
							rel="noreferrer"
							title="luxembourg.lu - Nouvelle fenêtre"
							className="govbar-link">
							luxembourg.lu
						</a>
					</li>
					<li>
						<a
							href="https://guichet.public.lu"
							target="_blank"
							rel="noreferrer"
							title="guichet.lu - Nouvelle fenêtre"
							className="govbar-link">
							guichet.lu
						</a>
					</li>
					<li>
						<a
							href="https://gouvernement.lu"
							target="_blank"
							rel="noreferrer"
							title="gouvernement.lu - Nouvelle fenêtre"
							className="govbar-link">
							gouvernement.lu
						</a>
					</li>
					<li>
						<a
							href="https://crossgov.public.lu"
							target="_blank"
							rel="noreferrer"
							title="crossgov.lu - Nouvelle fenêtre"
							className="govbar-link">
							crossgov.lu
						</a>
					</li>
					<li>
						<a
							href="https://etat.public.lu"
							target="_blank"
							rel="noreferrer"
							title="Autres sites - Nouvelle fenêtre"
							className="govbar-link govbar-more">
							Autres sites
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
