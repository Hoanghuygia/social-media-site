import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/index.js';
import { Fragment } from 'react';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import { useState } from "react";


function App() {
	const [user, setUser] = useState(false);
	return (
		<Router>
				<Routes>
					<Route path='/login' element={<Login setUser={setUser}/>}/>
					<Route path='/signup' element={<Signup />}/>
					<Route element={<ProtectedRoutes name={user}/>} >
						{publicRoutes.map((route, index) =>{
							const Page = route.component;
							
							let Layout;
							if(route.layout === null)
								Layout = Fragment;
							else
								Layout = route.layout;
								return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
						})}
					</Route>
				</Routes>
		</Router>
	);
}


export default App
