import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ScrollWrapper from 'hooks/scroll';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './styles/main.scss';

const root = document.getElementById('root') as HTMLElement

const app = (
  <BrowserRouter>
    <ScrollWrapper>
      <App />
    </ScrollWrapper>
  </BrowserRouter>
);

createRoot(root).render(app);

reportWebVitals();