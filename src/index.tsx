import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './_index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as any
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
