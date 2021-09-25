import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CaptureProvider } from './components/CaptureContext';

ReactDOM.render(

    <React.StrictMode>
        <CaptureProvider>
            <App />
        </CaptureProvider>
    </React.StrictMode>,

document.getElementById('root')
);