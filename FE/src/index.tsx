import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root') as HTMLElement

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

createRoot(root).render(app);

reportWebVitals();