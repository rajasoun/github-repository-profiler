import { useEffect, useContext } from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Header from './common/header'
import Card from './card/index'
import ListView from './list/index'
import Filter from './common/filter'
import { Context } from '../store/store'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '20px',
        [theme.breakpoints.up('md', 'lg')]: {
            width: '70%'
        },
        [theme.breakpoints.down('sm', 'xs')]: {
            width: '90%'
        },
    },
    textField: {
        marginTop: '0.4rem'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '25%',
        marginBottom: '4rem',
        marginRight: '2rem'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    viewOptionsContainer: {
        textAlign: 'center',
        marginTop: '1.5rem'
    },
    viewOptionsItem: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    iconSize: {
        fontSize: '1.2rem'
    }
}))

const App = (props) => {

    const [state, dispatch] = useContext(Context)

    const classes = useStyles()

    // Get the query params from URI
    const params = new URLSearchParams(props.location.search)
    let queryDisplay = params.get("display")
    let queryLang = params.get("lang")
    let querySort = params.get("sort")

    const sortList = [
        { name: 'Activity', value: 'score', isnumeric: true },
        { name: 'Name', value: 'name', isnumeric: false },
        { name: 'Organization', value: 'full_name', isnumeric: false },
        { name: 'Stars',  value: 'stargazers_count', isnumeric: true },
        { name: 'Watchers',  value: 'watchers_count',  isnumeric: true },
        { name: 'Issues', value: 'open_issues_count', isnumeric: true },
        { name: 'Forks', value: 'forks_count', isnumeric: true }
    ]

    useEffect(() => {

        dispatch({ type: 'IS_LOADING', payload: true })

        fetch('./repos.json').then(
            res => res.json()
        ).then(
            data => {
                // Get unique list of programing languages
                let languages = ["All"]

                data.map( lang => {
                    if ( lang.language ) languages.push(lang.language)
                })
                languages = [...new Set(languages)]

                dispatch({ type: 'SET_LANGUAGES', payload: languages })
                dispatch({ type: 'SET_DATA', payload: data })
                dispatch({ type: 'SET_FILTERED_DATA', payload: data })
                dispatch({ type: 'SET_RECORDS_COUNT', payload: data.length })

                let isDisplay = queryDisplay === "list" ? true : false
                dispatch({ type: 'IS_LIST', payload:  isDisplay })

                let filterData = []

                if( queryLang !== 'All' && data && queryLang  ){

                    let sortVal = sortList.filter( obj => obj.name === querySort )

                    data.map( item => {
                        if(item.language === queryLang){
                            filterData.push(item)
                        }
                    })

                    filterData = sortBy(filterData, sortVal[0].value)

                    dispatch({ type: 'UPDATE_FILTERED_LANG', payload: queryLang })
                    dispatch({ type: 'UPDATE_SORTBY', payload: querySort })
                    dispatch({ type: 'SET_FILTERED_DATA', payload: filterData})

                }
                dispatch({ type: 'IS_LOADING', payload: false })
            }
        ).catch(
            err => console.error(err)
        )

    }, [])

    const sortBy = (list, sortKey) => {
        return list.sort((a, b) => {
            var x = a[sortKey], y = b[sortKey]
            if( typeof x !==  'number' && x !== undefined ) x = x.toLowerCase()
            if( typeof y !== 'number' && x !== undefined ) y = y.toLowerCase()
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
    }

    return (
        <div>
            <Header projectCount={state.recordsCount} />
            <Container className={classes.container}>
                <Filter />
                {
                    state.loading ?
                        <CircularProgress /> :
                        !state.listView ? <Card /> : <ListView />
                }
            </Container>
        </div>
    )

}

export default App
