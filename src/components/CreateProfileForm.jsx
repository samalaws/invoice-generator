import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import '../../css/elements/form.css';

export default function CreateProfileForm() {
	// useState hook to manage Company form data

	const [companyFormData, setcompanyFormData] = useState({
		name: '',
		street: '',
		number: '',
		city: '',
		postcode: '',
		phone: '',
		email: '',
		website: '',
		iban: '',
		bic: '',
	});
	const [, setLocation] = useLocation();
	const linkTarget = '/customer-info'; // link to next page
	const backLink = '/'; // link to previous page

	// useEffect to get store data from local storage
	useEffect(() => {
		const storedCompanyInfo = localStorage.getItem('companyInfo');
		if (storedCompanyInfo) {
			setcompanyFormData(JSON.parse(storedCompanyInfo));
		}
	}, []);

	// Handle Change inputs
	const handleChange = (event) => {
		setcompanyFormData({
			...companyFormData,
			[event.target.name]: event.target.value,
		});
	};

	// Handel Next Button
	const handleNext = (event) => {
		event.preventDefault();
		// set company info in local storage
		localStorage.setItem('companyInfo', JSON.stringify(companyFormData));
		setLocation(linkTarget); // link to next page
	};

	// handle Back Button
	const handleBack = () => {
		setLocation(backLink);
	};

	return (
		<>
			<form className="form">
				<label>Ihre Info hinzufügen:</label>
				<label htmlFor="name">
					Name:
					<input
						type="text"
						name="name"
						id="name"
						value={companyFormData.name}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="street">
					Straße:
					<input
						type="text"
						name="street"
						id="street"
						value={companyFormData.street}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="number">
					Hausnummer:
					<input
						type="text"
						name="number"
						id="number"
						value={companyFormData.number}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="city">
					Stadt:
					<input
						type="text"
						name="city"
						id="city"
						value={companyFormData.city}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="postcode">
					PLZ:
					<input
						type="text"
						name="postcode"
						id="postcode"
						value={companyFormData.postcode}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="phone">
					Telefonnummer:
					<input
						type="text"
						name="phone"
						id="phone"
						value={companyFormData.phone}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="email">
					Email:
					<input
						type="text"
						name="email"
						id="email"
						value={companyFormData.email}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="website">
					Website:
					<input
						type="text"
						name="website"
						id="website"
						value={companyFormData.website}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="iban">
					IBAN:
					<input
						type="text"
						name="iban"
						id="iban"
						value={companyFormData.iban}
						onChange={handleChange}
						required
					></input>
				</label>
				<label htmlFor="bic">
					BIC:
					<input
						type="text"
						name="bic"
						id="bic"
						value={companyFormData.bic}
						onChange={handleChange}
						required
					></input>
				</label>
				<div className="button-container">
					<button onClick={handleBack}>Zurück</button>
					<button onClick={handleNext}>Weiter</button>
				</div>
			</form>
		</>
	);
}
