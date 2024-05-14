import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/index.js';
import { Fragment, useState } from 'react';
import LoginPage from './LoginSignin/LoginPage.jsx';


function App() {
	const [isLogin, setIsLogin] = useState(false);

	if (isLogin)
		return (
			<Router>
					<Routes>
						{publicRoutes.map((route, index) =>{
							const Page = route.component;
							
							let Layout;
							if(route.layout === null)
								Layout = Fragment;
							else
								Layout = route.layout;
							return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
						})};
					</Routes>
			</Router>
    	);
	else
		return (
			<LoginPage Login={setIsLogin}/>
		);
}


export default App
