import React from 'react';
import { BrowserRouter as Router, Route, useHistory, Link } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';

import { Layout, Affix, Menu , Row, Col, Icon, Dropdown} from 'antd';
import Routes from './routes';
import './style.less';
import HomeSearch from './components/HomeSearch';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
//import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
const { Header, Content } = Layout;

 const cache = new InMemoryCache();
 const link = new HttpLink({
	 uri:'http://localhost:4200/graphql'
 })
const client = new ApolloClient({
	cache,
	link
})

function App() {

  return (
	 <ApolloProvider client={client}>
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
		  <Layout>
			<Affix offsetTop={0}>
			<Header className="header">
				<Row>
					<Col span={6}>
					<a href="/">
						<img className="logo" src="/logo.png" alt="Logo"/>
					</a>
					</Col>
					<Col span={16}>
						<HomeSearch/>
					</Col>
					<Col span={2}>
						<Link to="/mycart" style={{color: '#000'}}>
							<Icon type="shopping-cart" /> My Cart
						</Link>
					</Col>
				</Row>
			</Header>
		</Affix>
		  <Layout className="contentWrapper">
			<Content className="content">
				<div>
					{Routes.map((route, index) => {
					return (
						<Route
						key={index}
						path={route.path}
						exact
						component={(props) => {
							return (
							<route.component {...props} />
							);
						}}
						/>
					);
					})}
				</div>
			</Content>
			</Layout>
			</Layout>
  	</Router>
	  </ApolloProvider>
			
  );
}

export default App;
