import React, {useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Game from "./Pages/Game/Game";
import {FormSettings} from "./Types/Types";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () => {
    const formSettings = useRef<FormSettings>();

    return (
        <div className='bg-gradient flex-col px-6 h-screen w-screen'>
            <div className='page-heading'>
                Tic Tac Toe
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage setFormSettings={(settings)=>{
                        console.log(formSettings,settings);
                        formSettings.current = {
                            ...formSettings,
                            ...settings
                        }
                    }}/>}/>
                    <Route path={'game'} element={<Game formSettings={formSettings}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
