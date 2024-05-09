import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/index.js';
import { Fragment } from 'react';


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
					return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
				  })};
	          </Routes>
      </Router>

    )
}


export default App
