import React, {useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Game from "./Pages/Game/Game";
import {Settings} from "./Types/Types";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () => {
    const formSettings = useRef<Settings>();
    const heading = "Tic Tac Toe";
    return (
        <div className='bg-gradient flex-col px-6 md:px-0 h-screen w-screen'>
            <div className='page-heading'>
                {heading.split('').map((char,index)=>{
                    return <span key={index} className={'hover:scale-75'}>{char}</span>
                })}
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage setFormSettings={(settings)=>{
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
