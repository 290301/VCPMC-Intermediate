import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                  <App />
            </PersistGate>
      </Provider>,
);
