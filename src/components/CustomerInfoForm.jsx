import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import '../../css/elements/form.css';

export default function CustomerInfoForm() {
	// useState hook to manage customer form data
	const [customerFormData, setCustomerFormData] = useState({
		customerName: '',
		customerStreet: '',
		customerNumber: '',
		customerCity: '',
		customerPostcode: '',
		invoceNumber: '',
	});
	const [, setLocation] = useLocation();
	const linkTarget = '/add-product'; // link to next page
	const backLink = '/company-info'; // link to previous page

	// handle change in inputs
	const handleChange = (event) => {
		setCustomerFormData({
			...customerFormData,
			[event.target.name]: event.target.value,
		});
	};

	// handle next button
	const handleNext = (event) => {
		console.log('click');
		event.preventDefault();
		// set customer info in local storage
		localStorage.setItem('customerInfo', JSON.stringify(customerFormData));
		setLocation(linkTarget);
	};

	// handle back button
	const handleBack = () => {
		setLocation(backLink);
	};
	// useEffect hook to get customer info from local storage
	useEffect(() => {
		const storedData = localStorage.getItem('customerInfo');
		if (storedData) {
			setCustomerFormData(JSON.parse(storedData));
		}
	}, []);

	return (
		<>
			<form>
				<label>Kundendaten hinzufügen:</label>
				<label>
					Name:
					<input
						type="text"
						name="customerName"
						value={customerFormData.customerName}
						onChange={handleChange}
						required
					></input>
				</label>

				<label>
					Straße:
					<input
						type="text"
						name="customerStreet"
						value={customerFormData.customerStreet}
						onChange={handleChange}
						required
					></input>
				</label>

				<label>
					Hausnummer:
					<input
						type="text"
						name="customerNumber"
						value={customerFormData.customerNumber}
						onChange={handleChange}
						required
					></input>
				</label>

				<label>
					Stadt:
					<input
						type="text"
						name="customerCity"
						value={customerFormData.customerCity}
						onChange={handleChange}
						required
					></input>
				</label>

				<label>
					PLZ:
					<input
						type="text"
						name="customerPostcode"
						value={customerFormData.customerPostcode}
						onChange={handleChange}
						required
					></input>
				</label>
				<label>
					Rechnungsnummer:
					<input
						type="text"
						name="invoceNumber"
						value={customerFormData.invoceNumber}
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
