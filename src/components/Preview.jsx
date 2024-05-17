import React, { useState, useEffect, forwardRef } from 'react';
import getTodayDate from '../hooks/getTodayDate.js';
import CreatePdfPage from './CreatePdfPage.jsx';
import '../../css/elements/invoice.css';

const Preview = forwardRef((invoice, ref) => {
	const [generatePDF, setGeneratePDF] = useState(false);
	const [data, setData] = useState({});
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const todayDate = getTodayDate();

	// useEffect to handle data from local storage
	useEffect(() => {
		// get company data from local storage
		const companyInfo = localStorage.getItem('companyInfo');

		// get customer data from local storage
		const customerInfo = localStorage.getItem('customerInfo');

		// parse data in json from
		const parsedCompanyInfo = JSON.parse(companyInfo) || {};
		const parsedCustomerInfo = JSON.parse(customerInfo) || {};

		// marge company data & customer data in one Object
		const combinedData = {
			...parsedCompanyInfo,
			...parsedCustomerInfo,
		};
		// set marged data in state
		setData(combinedData);
	}, []);

	// useEffect to handle products data from local storage
	useEffect(() => {
		const productsInfo = localStorage.getItem('productsInfo');
		const parsedProductsInfo = JSON.parse(productsInfo) || {};
		setProducts(parsedProductsInfo);
	}, []);

	// function to calculate total
	const calculateTotal = () => {
		const newTotal = Object.values(products).reduce((acc, product) => {
			return acc + product.price * product.quantity;
		}, 0);
		setTotal(newTotal);
	};

	// useEffect to calculate total
	useEffect(() => {
		calculateTotal();
	}, [products]);

	// function to handle price format
	const localPrice = (price) => {
		return new Intl.NumberFormat('de-DE', {}).format(price);
	};

	// useEffect to generate pdf
	useEffect(() => {
		if (generatePDF) {
			CreatePdfPage(ref.current, `${invoice}.pdf`);
			setGeneratePDF(false);
		}
	}, [generatePDF]);

	return (
		<>
			<div ref={ref} className="invoice">
				{/* Your content here */}
				<div>
					<p className="right companyName">{data.name}</p>
					<p className="right">{`${data.street} ${data.number}`}</p>
					<p className="right">{`${data.postcode} ${data.city}`}</p>
					<p className="right">{data.phone}</p>
					<p className="right">{data.email}</p>
					<p className="right">{data.website}</p>
					<p className="right">Invoice Number: {data.invoceNumber}</p>
					<p className="right">Date: {todayDate}</p>
				</div>
				<div className="customer-info">
					<p className="left small">{`${data.name}, ${data.street} ${data.number}, ${data.postcode} ${data.city}`}</p>
					<p className="left">{data.customerName}</p>
					<p className="left">{`${data.customerStreet} ${data.customerNumber}`}</p>
					<p className="left">{`${data.customerPostcode} ${data.customerCity}`}</p>
				</div>
				<p className="right">{`${data.city} ${todayDate}`}</p>
				<p className="left bold big-size">Rechnung</p>
				<p className="left">Sehr geehrte Damen und Herren</p>
				<p className="left">
					entsprechend Ihres Auftrages, erlauben wir uns folgende Arbeiten in
					rechnung zu stellen:
				</p>
				<table className="table">
					<thead>
						<tr>
							<th>Produkt</th>
							<th>Anzahl</th>
							<th>Einzelpreis</th>
							<th>Gesamtpreis</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(products).map((key) => (
							<tr key={key}>
								<td>{products[key].productName}</td>
								<td>{products[key].quantity}</td>
								<td>{localPrice(products[key].price)} €</td>
								<td>
									{localPrice(products[key].price) * products[key].quantity} €
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td
								className="center bold"
								colSpan="4"
							>{`Total Price: ${localPrice(total)} €`}</td>
						</tr>
					</tfoot>
				</table>
				<p className="left">
					Bitte überweisen Sie den Betrag{' '}
					<span className="bold">{localPrice(total)}</span> €
				</p>
				<p className="p-with-line-height left">
					Zahlung innerhalb von 14 Tagen ab Rechnungseingang ohne Abzüge an die
					unten angegebene Bankverbindung.
				</p>
				<p className="bold">{`IBAN: ${data.iban} - BIC: ${data.bic}`}</p>
				<p className="left"></p>
				<p className="left">Mit freundlichen Grüßen</p>
			</div>
		</>
	);
});

export default Preview;
