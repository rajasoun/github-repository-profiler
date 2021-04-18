import { useContext, useRef, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import IconGroup from '../common/icon'
import GetRepoActivity from '../common/getRepoActivity'
import GetRepoLanguage from '../common/getRepoLang'

import { Context } from '../../store/store'
import CustomDialog from '../modal/index'

const StyledTableCell = withStyles((theme) => ({
    head: {
        fontSize: '16px',
        fontWeight: 600,
    },
    body: {
        fontSize: 16,
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    transition: 'transform .2s',
    '&:hover': {
        MsTransform: 'scale(1.05)', 
        WebkitTransform: 'scale(1.05)', 
        transform: 'scale(1.05)',
        cursor: 'pointer'
    },
  },
}))(TableRow);

const useStyles = makeStyles({

    avatar: {
        display: 'block',
        margin: 'auto auto',
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        objectFit: 'cover',
        padding: '1rem'
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    link: {
        textDecoration: 'none',
        color: '#2196F3',
        "&:hover": {
            textDecoration: 'underline'
        }
    },
    footer: {
        borderRadius: '1rem',
        backgroundColor: '#2196F3',
        display: 'block',
        padding: '0.5rem 0.6rem',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        textDecoration: 'none',
        textTransform: 'uppercase',
        "&:hover":{
            textDecoration: 'underline'
        }
    },
    truncateDiv: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,  /* Number of lines displayed before it truncate */
        overflow: 'hidden'
    }
})

const ListView = () => {

    const classes = useStyles()

    const [state] = useContext(Context)
    const [record, setRecord] = useState()
    const customRef = useRef(null)

    const showModal = (data) => {
        setRecord(data)
        customRef.current.handleOpen()
    }

    const tableHeader = [
        { align: "center", header: "Logo", width: "10%" },
        { align: "left", header: "Name", width: "15%" },
        { align: "left", header: "Description", width: "45%" },
        { align: "left", header: "Stars", width: "3%" },
        { align: "left", header: "Issues", width: "3%" },
        { align: "left", header: "Forks", width: "3%" },
        { align: "left", header: "Score", width: "3%" },
        { align: "left", header: "Lang", width: "3%" },
        { align: "center", header: "Action", width: "15%" },
    ]

    let data = state.filteredData

    return (
        <Grid container>
            <Grid item xs={12}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <StyledTableRow>
                        { 
                            tableHeader.map( ele => 
                                <StyledTableCell 
                                    align={ele.align} 
                                    width={ele.width} 
                                    key={ele.header}
                                >
                                    {ele.header}
                                </StyledTableCell> 
                            ) 
                        }
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                {
                    data.map((row, index) => (
                        <StyledTableRow key={index} onClick={() => showModal(row)}>
                            <StyledTableCell scope="row">
                                <Typography 
                                    component='img' 
                                    src={row.owner.avatar_url} 
                                    alt="Avatar" 
                                    className={classes.avatar} 
                                />
                            </StyledTableCell>

                            <StyledTableCell>
                                <Typography className={classes.title}>
                                    {row.name}
                                </Typography>
                                <Typography 
                                    component='a' 
                                    className={classes.link}  
                                    href={row.html_url} 
                                    target="_blank"
                                >
                                    {row.full_name}
                                </Typography>
                            </StyledTableCell>

                            <StyledTableCell className={classes.content} padding="none">
                                <div className={classes.truncateDiv}>
                                    {row.description}
                                </div>
                            </StyledTableCell>

                            <StyledTableCell padding="none" align="center">
                                <IconGroup 
                                    tooltip='Stars' 
                                    fontName="fa-star" 
                                    count={row.stargazers_count} 
                                />
                            </StyledTableCell>

                            <StyledTableCell padding="none" align="center">
                                <IconGroup 
                                    tooltip='Issues' 
                                    fontName="fa-exclamation-circle" 
                                    count={row.open_issues_count} 
                                />
                            </StyledTableCell>

                            <StyledTableCell padding="none" align="center">
                                <IconGroup 
                                    tooltip='Forks' 
                                    fontName="fa-code-branch" 
                                    count={row.forks_count} 
                                />
                            </StyledTableCell>

                            <StyledTableCell padding="none" align="center">
                                <GetRepoActivity  
                                _InnerSourceMetadata={row._InnerSourceMetadata}  
                                customPadding='0 0 0 1.5rem' 
                            />
                            </StyledTableCell>

                            <StyledTableCell padding="none" align="center">
                                <GetRepoLanguage 
                                    language={row.language} 
                                    alignItem='1.5rem' 
                                />
                            </StyledTableCell>

                            <StyledTableCell padding="none">
                                <Typography 
                                    className={classes.footer} 
                                    component='a' 
                                    href={row.html_url}
                                >
                                    contribute
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                }
                </TableBody>
            </Table>
            <CustomDialog ref={customRef} data={record}/>
            </Grid>
        </Grid>
    )
}

export default ListView