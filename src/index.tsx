import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Local from "./Pages/GameModes/Local/Local";

const route = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <h1> It seems like we have an error here. </h1>,
        children: []
    },
    {
        path:"local",
        element: <Local/>
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <div className='bg-gradient flex-col px-6 h-screen w-screen'>
            <div className='page-heading'>
                Tic Tac Toe
            </div>
            <RouterProvider router={route}/>
        </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
