import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import BalanceSheets from './components/BalanceSheets'
import BalanceSheet from './components/BalanceSheet'

export default (
  <Route>
    <Route path="/" component={App}>
    	<IndexRoute component={BalanceSheets} />
    	<Route path="/BalanceSheets" component={BalanceSheets} />
    	<Route path="/BalanceSheets/:id" component={BalanceSheet} />
  	</Route>
    <Route path="*" status={404} component={NoMatch} />
  </Route>
)

