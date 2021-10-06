import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Switch, 
	Route 
} from "react-router-dom";
import Header from './Header';
import Invoices from './Invoices';
import InvoicePage from './InvoicePage';

function App() {
	return (
		<Router>
			<Header />
			<Switch>
					<Route exact path="/">
							<Invoices />
					</Route>
					<Route exact path="/invoices/:id">
							<InvoicePage />
					</Route>
			</Switch>
		</Router>
	);
}

export default App;

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
