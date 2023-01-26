import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from "react-redux";
import store from './app/store'

import { UserContextProvider } from "./context/UserContext";
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AuthContextProvider>
            <App />     
        </AuthContextProvider>
    </Provider>
)
