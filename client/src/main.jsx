import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Your i18n configuration file


createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate persistor={persistor} loading={null} >
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>,
)
