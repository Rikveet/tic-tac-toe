import {FormManagerWrapperContextType} from "../HelperFunctions";
import React from "react";

const FormManagerContext = React.createContext<FormManagerWrapperContextType>({} as unknown as FormManagerWrapperContextType);

export default FormManagerContext;