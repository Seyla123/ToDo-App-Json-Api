import { createContext } from "react";

const todosContext = createContext(null);

function Provider({children}){

    return (
        <todosContext.Provider>
            {children}
        </todosContext.Provider>
    )
}

export default useTodosContext;