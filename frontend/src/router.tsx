import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sobre',    element: <About /> },
      { path: 'projetos', element: <Projects /> },
      { path: 'contato',  element: <Contact /> },
    ],
  },
]);
