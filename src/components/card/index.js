import { useContext, useRef, useState  } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'

import IconGroup from '../common/icon'
import GetRepoActivity from '../common/getRepoActivity'
import GetRepoLanguage from '../common/getRepoLang'
import { Context } from '../../store/store'
import CustomDialog from '../modal/index'

const useStyles = makeStyles({
    container: {
        padding: '0.5rem 1.25rem'
    },
    card: {
        boxShadow: '0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%)',
        transition: '0.3s',
        width: '100%',
        borderRadius: '15px',
        "&:hover": {
            transform: 'scale3d(1.05, 1.05, 1)',
            transitionProperty: 'transform',
            transitionDuration: '0.15s',
            transitionTimingFunction: 'ease-out',
            boxShadow: '0 8px 17px 0 rgb(13 61 103 / 20%), 0 6px 20px 0 rgb(13 61 103 / 20%)',
            cursor: 'pointer'
        }
    },
    avatar: {
        display: 'block',
        margin: 'auto auto',
        width: '4.5rem',
        height: '4.5rem',
        borderRadius: '50%',
        objectFit: 'cover',
        padding: '1rem'
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '1.225em'
    },
    link: {
        textDecoration: 'none',
        color: '#2196F3',
        "&:hover":{
            textDecoration: 'underline'
        }
    },
    content: {
        overflowWrap: 'break-word',
        overflow: 'hidden',
        height: '6rem',
        display: '-webkit-box',
        wordBreak: 'break-word',
        marginBottom: '1rem',
        marginTop: '0.5rem',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
    },
    footer: {
        borderRadius: '0 0 15px 15px',
        backgroundColor: '#2196F3',
        display: 'block',
        padding: '0.7rem',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        textDecoration: 'none',
        textTransform: 'uppercase',
        "&:hover":{
            textDecoration: 'underline'
        }
    },
    iconsContainer: {
        textAlign: 'center',
        overflow: 'hidden'
    },
    
})
  
const Card = (props) => {
    const classes = useStyles();

    const [state] = useContext(Context);
    const [record, setRecord] = useState()
    const customRef = useRef(null)

    const showModal = (data) => {
        setRecord(data)
        customRef.current.handleOpen()
    }

    let data = state.filteredData
    
    return (
        <Grid container spacing={3}>
            { data.map( ele => (
                <Grid 
                    container 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={4} 
                    key={ele.id} 
                    onClick={() => showModal(ele)}
                >
                    <Typography component='div' className={classes.card}>
                        <Typography 
                            component='img' 
                            src={ele.owner.avatar_url} 
                            alt="Avatar" 
                            className={classes.avatar} 
                        />
                        <Typography component='div' className={classes.container}>
                            <Typography className={classes.title}>
                                {ele.name}
                            </Typography>
                            <Typography 
                                component='a' 
                                className={classes.link}  
                                href={ele.html_url} 
                                target="_blank"
                            >
                                {ele.full_name}
                            </Typography>
                            <Typography component='div' className={classes.content}>
                                { ele.description }
                            </Typography>
                            <Typography component='div' className={classes.iconsContainer}>
                                {/* Star gazzers data */}
                                <IconGroup tooltip='Stars' fontName="fa-star" count={ele.stargazers_count} float='left' customPadding='0 1.8rem 0 0' />
                                {/* Open Issues data */}
                                <IconGroup tooltip='Issues' fontName="fa-exclamation-circle" count={ele.open_issues_count} float='left' customPadding='0 1.8rem 0 0' />
                                {/* Forks data */}
                                <IconGroup tooltip='Forks' fontName="fa-code-branch" count={ele.forks_count} float='left' customPadding='0 1.8rem 0 0'/>
                                {/* Activity data */}
                                <GetRepoActivity _InnerSourceMetadata={ele._InnerSourceMetadata} customPadding='0 1.5rem 0 0'/>
                                {/* Language data */}
                                <GetRepoLanguage language={ele.language}/>
                            </Typography>
                        </Typography>
                        <Typography 
                            className={classes.footer} 
                            component='a' 
                            href={ele.html_url}
                        >
                            contribute
                        </Typography>
                    </Typography>
                </Grid>
            ))}
            <CustomDialog ref={customRef} data={record}/>
        </Grid>
    )
}

export default Card