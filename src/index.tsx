import React from 'react';
import useState from 'react-usestateref';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Game from "./Pages/Game/Game";
import FormManagerContext from './Contexts/FormManagerContext';
import {FormHandler, FormManagerContextType, FormManagerWrapperContextType, GameTypes, Player, ReactSetState, Validator} from "./HelperFunctions";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () => {

    const [formHandler, setFormHandler, formHandlerRef] = useState<FormManagerContextType>({
        formHandler: {} as FormHandler,
        player: {} as Player,
        opponent: {} as Player,
        currentPlayer: {} as Player
    } as FormManagerContextType);

    const formHandlerContextWrapper = {
        context: formHandler,
        setContext: (params: {
            fType?: GameTypes;
            v?: Validator;
            fCompleted?: ReactSetState<boolean>;
            p?: Player;
            o?: Player;
            cP?: Player;
        }) => {
            console.log('change requested', params);
            const {fType, v, fCompleted, p, o, cP} = {...params};
            setFormHandler({
                formHandler: {
                    ...formHandlerRef.current.formHandler,
                    formType: fType ? fType : formHandlerRef.current.formHandler.formType,
                    validator: v ? v : formHandlerRef.current.formHandler.validator,
                    formCompleted: fCompleted ? fCompleted : formHandlerRef.current.formHandler.formCompleted
                },
                player: p ? p : formHandlerRef.current.player,
                opponent: o ? o : formHandlerRef.current.opponent,
                currentPlayer: cP ? cP : formHandlerRef.current.currentPlayer
            });
            console.log('After Change', formHandlerRef.current);
        }
    } as FormManagerWrapperContextType

    return (
        <FormManagerContext.Provider value={formHandlerContextWrapper}>
            <div className='bg-gradient flex-col px-6 h-screen w-screen'>
                <div className='page-heading'>
                    Tic Tac Toe
                </div>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<HomePage/>}/>
                        <Route path={'game'} element={<Game/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </FormManagerContext.Provider>
    );
}

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
