import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import App from '../src/app/App'
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import store from '../src/store/index.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </LocalizationProvider>
)
