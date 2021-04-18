const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_FILTERED_DATA':
            return {
                ...state,
                filteredData: action.payload
            }
        case 'SET_LANGUAGES':
            return {
                ...state,
                languages: action.payload
            }
        case 'SET_RECORDS_COUNT':
            return {
                ...state,
                recordsCount: action.payload
            }
        case 'IS_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'IS_LIST':
            return {
                ...state,
                listView: action.payload
            }
        case 'UPDATE_FILTERED_LANG':
            return {
                ...state,
                filteredLang: action.payload
            }
        case 'UPDATE_SORTBY':
            return {
                ...state,
                sortBy: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;