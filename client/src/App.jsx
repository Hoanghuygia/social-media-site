import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/index.js';
import { Fragment } from 'react';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';

function App() {

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
						return <Route key={index} path={route.path} element={<Layout><Page /></Layout>}/>
					})}
					{privateRoutes.map((route, index) =>{
						const Page = route.component;
						
						let Layout;
						if(route.layout === null)
							Layout = Fragment;
						else
							Layout = route.layout;
						return (
							<Route key={index} element={<ProtectedRoutes/>}>
								<Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
							</Route>
						)
						// return <Route key={index} path={route.path} element={<ProtectedRoutes name={user}><Layout><Page/></Layout></ProtectedRoutes>}/>
					})}

					
											
					{/* <Route path='/login' element={<Login setUser={setUser}/>}/>
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
					</Route> */}
				</Routes>
		</Router>
	);
}


export default App
