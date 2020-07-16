import React, { FunctionComponent } from "react";
import LangageList from "./pages/langage-list";
import LangagesDetail from "./pages/langage-detail";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import LangageEdit from "./pages/langage-edit";
import LangageAdd from "./pages/langage-add";
import PrivateRoute from "./PrivateRoute";

const App: FunctionComponent = () => {
	return (
		<Router>
			<div>
				<nav>
					<div className='nav-wrapper indigo darken-4'>
						<Link to='/' className='brand-logo center'>
							Développeur
						</Link>
					</div>
				</nav>

				<Switch>
					<PrivateRoute exact path='/' component={LangageList} />
					<Route exact path='/langages' component={LangageList} />
					<Route exact path='/langages/edit/:id' component={LangageEdit} />
					<Route exact path='/langages/add' component={LangageAdd} />
					<Route path='/langages/:id' component={LangagesDetail} />
					<Route component={PageNotFound} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
