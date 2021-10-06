

import { useState } from 'react';
import {ViewContext } from './context';


export function AuthContextProvider(props) {
    const [viewState, setViewState] = useState(null);

    const values = {
        viewState: viewState,
        setViewState: setViewState,
    }
    return(
        <ViewContext.Provider value={values} >
            {props.children}
        </ViewContext.Provider>
    )
}