import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import IconGroup from '../common/icon'
import GetRepoActivity from '../common/getRepoActivity'
import GetRepoLanguage from '../common/getRepoLang'
import CreateParticipationChart from './participation'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
})

const useStyles = makeStyles((theme) => ({
    iconsContainer: {
        marginTop: '1rem',
        padding: '0.5rem 1.25rem'
    },
    large: {
        width: theme.spacing(35),
        height: theme.spacing(35),
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    link: {
        textDecoration: 'none',
        color: '#2196F3',
        fontSize: '1.08em',
        "&:hover":{
            textDecoration: 'underline'
        }
    },
    label: {
        borderRadius: '2em',
        padding: '4px 10px',
        marginBottom: '5px',
        marginRight: '0.5rem',
        backgroundColor: '#add8e6'
    },
    custtomBottomSpace: {
        marginBottom: '1.5rem'
    },
    footer: {
        borderRadius: '0.5rem',
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
    customSpacing: {
        paddingBottom: '1.1rem'
    },
    typoPaddingBottom: {
        paddingBottom: '0.35rem'
    }
}))

const DialogTitle = withStyles(styles)((props) => {

    const { children, classes, onClose, ...other } = props

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

const CustomDialog = (props, ref) => {

    const [open, setOpen] = useState(false)
    const customRef = useRef()
    const data = props

    const classes = useStyles()

    useImperativeHandle(ref, () => ({
        handleOpen: () => {
            setOpen(true)
        }
    }))

    const handleClose = () => {
        setOpen(false)
    }

    const getHumanReadableDate = (date) => {
        return (
            new Date(date).toLocaleString('default', { month: 'long' }) + ' ' + 
            new Date(date).getDate() + ' ' + 
            new Date(date).getFullYear()
        )
    }

    return (
        <div ref={customRef}>
            { props.data !== undefined &&
                <Dialog 
                    fullWidth={true}
                    onClose={handleClose} 
                    aria-labelledby="customized-dialog-title" 
                    open={open}
                    maxWidth='md'
                >
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}></DialogTitle>
                    <DialogContent>
                    <Grid container >
                        <Grid item xs={4}>
                            <Avatar 
                                alt={data.data.name} 
                                src={data.data.owner.avatar_url} 
                                className={classes.large}
                            />
                            <Typography component='div' className={classes.iconsContainer}>
                                {/* Star gazzers data */}
                                <IconGroup tooltip='Stars' fontName="fa-star" count={data.data.stargazers_count} float='left' customPadding='0 1.8rem 0 0' />
                                {/* Open Issues data */}
                                <IconGroup tooltip='Issues' fontName="fa-exclamation-circle" count={data.data.open_issues_count} float='left' customPadding='0 1.8rem 0 0' />
                                {/* Forks data */}
                                <IconGroup tooltip='Forks' fontName="fa-code-branch" count={data.data.forks_count} float='left' customPadding='0 1.8rem 0 0'/>
                                {/* Activity data */}
                                <GetRepoActivity _InnerSourceMetadata={data.data._InnerSourceMetadata} customPadding='0 1.5rem 0 0'/>
                                {/* Language data */}
                                <GetRepoLanguage language={data.data.language}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container >
                                <Grid item xs={12}>
                                    <Typography 
                                        component='h4' 
                                        variant='h4' 
                                        className={classes.capitalize}
                                    >
                                        {data.data.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.customSpacing} >
                                <Grid item xs={12}>
                                    <Typography 
                                        component='a' 
                                        className={classes.link} 
                                        href={data.data.html_url} 
                                        target="_blank"
                                    >
                                        {data.data.full_name}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.customSpacing} >
                                <Grid item xs={12}>
                                    <Typography>{data.data.description}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12} className={classes.customSpacing}>
                                    <Typography component='b' variant='b'>
                                        Topics:
                                    </Typography>
                                </Grid>
                                {
                                    data.data.topics ? data.data.topics.map( 
                                        (topic, index) => 
                                            <Grid 
                                                key={index} 
                                                xs={false} 
                                                item 
                                                className={classes.customSpacing}
                                            >
                                                <Typography className={classes.label}>{topic}</Typography>
                                            </Grid>
                                    )  : <Typography className={classes.label}>N/A</Typography>
                                }
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12} className={classes.typoPaddingBottom}>
                                    <Typography component='b' variant='b'>
                                        Skills required:
                                    </Typography>
                                </Grid>
                                {
                                    data.data._InnerSourceMetadata.skills ? 
                                    data.data._InnerSourceMetadata.skills.map( 
                                        (skill, index) => 
                                            <Grid 
                                                key={index} 
                                                xs={12} 
                                                item 
                                                className={classes.typoPaddingBottom}
                                            >
                                                <Typography variant='body1' component='p'>{skill}</Typography>
                                            </Grid>
                                    ) : <Typography>Any</Typography>
                                }
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12} className={classes.typoPaddingBottom}>
                                    <Typography component='b' variant='b'>
                                        Contributions wanted:
                                    </Typography>
                                </Grid>
                                {
                                    data.data._InnerSourceMetadata.contributions ? 
                                    data.data._InnerSourceMetadata.contributions.map( 
                                        (contrib, index) => 
                                            <Grid 
                                                key={index} 
                                                xs={12} 
                                                item 
                                                className={classes.typoPaddingBottom}
                                            >
                                                <Typography variant='body1' component='p'>{contrib}</Typography>
                                            </Grid>
                                    ) : <Typography>Any</Typography>
                                }
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12}>
                                    <Typography component='b' variant='b'>
                                        Created at: &nbsp;
                                    </Typography>
                                    <Typography component='span' variant='body1'>
                                        { getHumanReadableDate(data.data.created_at)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12}>
                                    <Typography component='b' variant='b'>
                                        Last updated: &nbsp;
                                    </Typography>
                                    <Typography component='span' variant='body1'>
                                        { getHumanReadableDate(data.data.updated_at)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12}>
                                    <Typography component='b' variant='b'>
                                        Activity Score: &nbsp;
                                    </Typography>
                                    <Typography component='span' variant='body1'>
                                        {data.data._InnerSourceMetadata.score}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.customSpacing}>
                                <Grid item xs={12} className={classes.customSpacing}>
                                    <Typography component='b' variant='b'>
                                        Average commits over the last year:
                                    </Typography>
                                </Grid>
                                <CreateParticipationChart 
                                    _InnerSourceMetadata={data.data._InnerSourceMetadata}
                                    created_at={data.data.created_at}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <br/>
                    <Typography 
                        className={classes.footer} 
                        component='a' 
                        href={data.data.html_url}
                    >
                        contribute
                    </Typography>
                    </DialogContent> 
                </Dialog>
            }
        </div>
    );
}

export default forwardRef(CustomDialog)