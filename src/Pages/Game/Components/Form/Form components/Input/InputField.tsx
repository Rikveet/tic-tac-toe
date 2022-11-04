import React, {ChangeEvent, useEffect, useState} from "react";
import "./InputField.css";
import {IValidator} from "../../../../../../Types/Intefaces";

const InputField = (props: { iptT: string, htmF: string, plh: string, name: string, labelText: string, validate: IValidator }) => {
    const [error, setError] = useState("");
    const [errorExpand, setErrorExpand] = useState(false);
    const [storedValue, setStoredValue] = useState<string | undefined>();
    const maxErrorVisibleChars = 10;

    useEffect(() => {
        return () => {
            const storedVal = window.localStorage.getItem(props.name);
            if (storedVal != undefined) {
                setStoredValue(storedVal);
            }
        };
    }, []);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {

        const target = e.target as typeof e.target
            & {
            placeholder: { value: string },
            value: string
        }
        setStoredValue(target.value);
        const validR = props.validate(target.value);
        if (validR.result) {
            if (error.length > 0)
                setError("");
        } else {
            setError(validR.message);
        }
        window.localStorage.setItem(props.name, target.value);
    }
    return (
        <div className={'min-h-[45px] max-h-[55px] md:w-fill w-fit h-fit overflow-y-visible'}>
            <label className={'inputFieldTip -mt-3 top-0 hover:scale-[1.4] hover:translate-y-1/4 '}
                   htmlFor={props.htmF}>{props.labelText}</label>
            <input className={'h-full w-full bg-transparent border-4 rounded-xl py-6 px-4 text-white border-solid'}
                   type={props.iptT} placeholder={props.plh} name={props.name} value={storedValue && storedValue!=='' ? storedValue:''}
                   onChange={handleFormChange}/>
            <span
                className={
                    `inputFieldTip -mb-3 bottom-0 text-rose-600 hover:scale-[1.3] hover:-translate-y-1/4 
                ${(error.length > 0) ? 'opacity-100' : 'opacity-0'}
                `}
                onMouseEnter={() => {
                    setErrorExpand(true);
                }}
                onMouseLeave={() => {
                    setErrorExpand(false)
                }}
            >
                {
                    errorExpand ? error : error.length > maxErrorVisibleChars ?
                        error.substring(0, maxErrorVisibleChars - 2) + '..' : error
                }
            </span>
        </div>
    )
}

export default InputField;