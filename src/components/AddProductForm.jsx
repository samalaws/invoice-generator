import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import '../../css/elements/form.css';
import '../../css/elements/table.css';

export default function AddProduct() {
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [products, setProducts] = useState([]);
	const [, setLocation] = useLocation();
	const linkTarget = '/pdf';
	const backLink = '/customer-info';

	// useEffect to get stored data from local storage
	useEffect(() => {
		const storedData = localStorage.getItem('productsInfo');
		if (storedData) {
			setProducts(JSON.parse(storedData));
		}
	}, []);

	// handle change in inputs
	const handleChange = (event) => {
		const { name, value } = event.target;
		switch (name) {
			case 'productName':
				setProductName(value);
				break;
			case 'price':
				setPrice(parseFloat(value));
				break;
			case 'quantity':
				setQuantity(parseInt(value));
				break;
			default:
				break;
		}
	};

	// handle submit
	const handleSubmit = (event) => {
		event.preventDefault();

		const newProduct = {
			productName,
			price,
			quantity,
		};

		setProducts([...products, newProduct]);

		setProductName('');
		setPrice(0);
		setQuantity(1);
		// set products in local storage
		localStorage.setItem('productsInfo', JSON.stringify(products));
	};

	// Handle delete item
	const handleDelete = (index) => {
		const updatedProducts = [...products];
		updatedProducts.splice(index, 1);
		setProducts(updatedProducts);
	};

	// Handle save button
	const handleSave = () => {
		console.log('save');
		// set products in local storage
		// to save last item added in products table
		localStorage.setItem('productsInfo', JSON.stringify(products));
		setLocation(linkTarget);
	};

	// Handle back button
	const handleBack = () => {
		setLocation(backLink);
	};

	return (
		<>
			<form className="form" onSubmit={handleSubmit}>
				<label>Neues Produkt hinzufügen</label>
				<label htmlFor="productName">
					Produktname:
					<input
						type="text"
						name="productName"
						id="productName"
						value={productName}
						onChange={handleChange}
						required
					/>
				</label>

				<label htmlFor="price">
					Preis:{' '}
					<input
						type="number"
						name="price"
						id="price"
						value={price}
						onChange={handleChange}
						required
						min="0"
					/>
				</label>
				<label htmlFor="quantity">
					Menge:
					<input
						type="number"
						name="quantity"
						id="quantity"
						value={quantity}
						onChange={handleChange}
						required
						min="0"
					/>
				</label>
				<button type="submit" onClick={handleSubmit}>
					Produkt hinzufügen
				</button>
			</form>
			<div className="container">
				<p className="table-title">Produkttabelle</p>
				{products.length > 0 ? (
					<table>
						<thead>
							<tr>
								<td>Beschreibung</td>
								<td>Preis</td>
								<td>Menge</td>
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => (
								<tr className="row" key={index}>
									<td>{product.productName} </td>
									<td>{product.price.toFixed(2)} € </td>
									<td>{product.quantity}</td>
									<td
										className="table-button"
										onClick={() => handleDelete(index)}
									>
										Löschen
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="p-white">Keine Produkte gefunden</p>
				)}

				<div className="button-container">
					<button onClick={handleBack}>Zurück</button>
					<button onClick={handleSave}>Speichern</button>
				</div>
			</div>
		</>
	);
}
