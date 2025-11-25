import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'


const appRouter = createBrowserRouter ([
  { path: '/', element: <Home/>},
  { path: '/Login', element: <Login/>},
  { path: '/Signup', element: <Signup/>},
  { path: '/Jobs' , element: <Jobs/>}
])

function App() {

  return (
    <>
      <RouterProvider  router={appRouter}/>
    </>
  )
}

export default App;
