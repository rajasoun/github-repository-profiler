import { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'

import { Context } from '../../store/store'

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

const CustomSwitch = withStyles({
    switchBase: {
      color: '#2196F3',
      '&$checked': {
        color: '#2196F3',
      },
      '&$checked + $track': {
        backgroundColor: '#2196F3',
      },
    },
    checked: {},
    track: {},
})(Switch)

const Filter = () => {

    const [state, dispatch] = useContext(Context)

    const classes = useStyles()
    const history = useHistory()

    const sortList = [
        { name: 'Activity', value: 'score', isnumeric: true },
        { name: 'Name', value: 'name', isnumeric: false },
        { name: 'Organization', value: 'full_name', isnumeric: false },
        { name: 'Stars',  value: 'stargazers_count', isnumeric: true },
        { name: 'Watchers',  value: 'watchers_count',  isnumeric: true },
        { name: 'Issues', value: 'open_issues_count', isnumeric: true },
        { name: 'Forks', value: 'forks_count', isnumeric: true }
    ]

    const sortBy = (list, sortKey) => {
        return list.sort((a, b) => {
            var x = a[sortKey], y = b[sortKey]
            if( typeof x !==  'number' && x !== undefined ) x = x.toLowerCase()
            if( typeof y !== 'number' && x !== undefined ) y = y.toLowerCase()
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
    }

    const updateHash = (scope, hashValue) => {
        dispatch({ type: 'IS_LOADING', payload: true })
        let hashURI, viewOption
        viewOption = state.listView ? "list" : "card"

        let filterData = []

        if (scope === "language") {

            let sortVal = sortList.filter( obj => obj.name === state.sortBy )

            if ( hashValue === 'All' ) {
                filterData = state.data
            }else {
                state.data.map( item => {
                    if(item.language === hashValue){
                        filterData.push(item)
                    }
                })
            }

            filterData = sortBy( filterData, sortVal[0].value )

            hashURI = '?display='+encodeURIComponent(viewOption)+'&sort='+encodeURIComponent(state.sortBy)+'&lang='+encodeURIComponent(hashValue)

            dispatch({ type: 'UPDATE_FILTERED_LANG', payload: hashValue })

        }else if (scope === "sortBy") {

            let sortVal = sortList.filter( obj => obj.name === hashValue )

            filterData = sortBy(state.filteredData, sortVal[0].value )

            hashURI = '?display='+encodeURIComponent(viewOption)+'&sort='+encodeURIComponent(hashValue)+'&lang='+encodeURIComponent(state.filteredLang)

            dispatch({ type: 'UPDATE_SORTBY', payload: hashValue })

        }
        dispatch({ type: 'SET_FILTERED_DATA', payload: filterData })
        dispatch({ type: 'IS_LOADING', payload: false })
        history.push({ pathname: '/', search: hashURI })
    }

    const toggleView = (isList) => {
        let viewOption = isList ? "list" : "card"
        dispatch({ type: 'IS_LIST', payload: isList })
        let hashURI = '?display='+encodeURIComponent(viewOption)+'&sort='+encodeURIComponent(state.sortBy)+'&lang='+encodeURIComponent(state.filteredLang)
        history.push({ pathname: '/', search: hashURI })
    }

    const filterList = (event) => {
        let filteredDataList
        if ( state.filteredLang !== 'All' ) {
            filteredDataList = state.data.filter( (item) => {
                if( state.filteredLang === item.language ){
                    return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
                }
            })
        }else {
            filteredDataList = state.data.filter((item) => {
                return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
            })
        }
        dispatch({ type: "SET_FILTERED_DATA" , payload: filteredDataList })
    }

    return (
        <div>
            <FormControl className={classes.formControl}>

            <FormHelperText>Filter by Languages:</FormHelperText>
                <Select
                    value={state.filteredLang}
                    onChange={(event) => updateHash('language', event.target.value)}
                    name="language"
                >
                    { state.languages.map( lang  => <MenuItem value={lang}>{lang}</MenuItem> ) }
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormHelperText>Sort by :</FormHelperText>
                <Select
                    value={state.sortBy}
                    onChange={(event) => updateHash('sortBy', event.target.value)}
                    name="sort"
                >
                    { sortList.map( data  => <MenuItem value={data.name}>{data.name}</MenuItem> ) }
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label={`Search ${state.filteredData.length} projects...`}
                    onChange={filterList}
                />
            </FormControl>

            <FormControl >
                <div className={classes.viewOptionsContainer}>
                    <i
                        className={`fa fa-th ${classes.iconSize} ${classes.viewOptionsItem}`}
                        style={{ color: !state.listView ? `#2196F3` : `#444444` }}
                    ></i>
                    <div className={classes.viewOptionsItem}>
                    <CustomSwitch
                        checked={state.listView}
                        onChange={() => toggleView(!state.listView)}
                        name="ListView"
                    />
                    </div>
                    <i
                        className={`fa fa-th-list ${classes.iconSize} ${classes.viewOptionsItem}`}
                        style={{ color: state.listView ? `#2196F3` : `#444444` }}
                    ></i>
                </div>
            </FormControl>
        </div>
    )
}

export default Filter
