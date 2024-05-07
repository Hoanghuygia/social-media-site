import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/index.js';
import { Fragment } from 'react';


function App() {
  return (
      <Router>
      	{/* <PageLayout> */}
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
	      {/* </PageLayout> */}
      </Router>

    )
}

export default App
