import { createContext, useReducer } from "react"
import Reducer from './reducer'

const initialState = {
    data: [],
    filteredData: [],
    languages: [],
    loading: false,
    recordsCount: 0,
    listView: false,
    filteredLang: 'All',
    sortBy: 'Activity',
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = createContext(initialState)
export default Store
