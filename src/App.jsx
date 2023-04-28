import React, { createRef } from 'react'
import {
  createBrowserRouter,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import More from './pages/More.jsx'
import './styles/App.css'
import 'animate.css'

const routes = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  { path: '/more', name: 'More', element: <More />, nodeRef: createRef() },

]



export const AppRoutes = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}
  return (
    <>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={400}
            classNames="animate__backOutDown"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
    </>
  )
}

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppRoutes />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

const App = () => (
  <RouterProvider router={AppRouter} />
)
    


export default App

