import { Route, Router } from 'wouter';
import Main from './components/Main.jsx';
import CreateProfile from './components/CreateProfile.jsx';
import CustomerInfo from './components/CustomerInfo.jsx';
import AddProduct from './components/AddProduct.jsx';
import CreatePdfPage from './components/CreatePdfPage.jsx';

export default function App() {
	return (
		<Router>
			<Route path="/" component={Main} />
			<Route path="/company-info" component={CreateProfile} />
			<Route path="/customer-info" component={CustomerInfo} />
			<Route path="/add-product" component={AddProduct} />
			<Route path="/pdf" component={CreatePdfPage} />
		</Router>
	);
}
