import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <GoogleOAuthProvider clientId="909968844049-uv33gt8o73ijr8ehsf8ucr8ho6uobrlj.apps.googleusercontent.com">
        <DndProvider backend={HTML5Backend}>
            <Toaster />
            <App />
        </DndProvider>
    </GoogleOAuthProvider>,
);

