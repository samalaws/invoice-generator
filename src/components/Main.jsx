import '../../css/elements/main.css';
import Header from './Header.jsx';
import { useLocation } from 'wouter';

/*
 * 	App Home page.
 */

export default function Main() {
	const [, setLocation] = useLocation();
	const linkTarget = '/company-info';

	// Handle
	const handleStartClick = () => {
		setLocation(linkTarget);
	};

	return (
		<>
			<Header />
			<div className="main">
				<div>
					<p className="title p-with-line-height">
						Hallo, gerne helfen wir Ihnen eine neue Rechnung zu generieren.
					</p>
				</div>

				<div>
					<div className="cards">
						<div id="en" onClick={handleStartClick} className="card">
							<p className="p-main bold">Generieren neue Rechnung</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
