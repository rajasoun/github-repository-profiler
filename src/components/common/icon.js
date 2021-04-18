import { Typography, Tooltip } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    icon: {
        display: 'block',
        color: '#444444',
        textAlign: 'center',
        fontSize: '1.35em',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    count: {
        display: 'block',
        textAlign: 'center',
        fontSize: '1.05em',
    }
})

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: theme.typography.pxToRem(14),
    },
}))(Tooltip);

const IconGroup = (props) => {
    const classes = useStyles(props)
    return (
        <Typography 
            component='div' 
            className={classes.iconGroup} 
            style={{ float: props.float, padding: props.customPadding}}
        >
            <Typography className={classes.icon}>
                <CustomTooltip title={props.tooltip} arrow placement="top-start">
                    <i className={`fa ${props.fontName}`}></i>
                </CustomTooltip>
            </Typography>
            <Typography className={classes.count}>
                {props.count}
            </Typography>
        </Typography>
    )
}

export default IconGroup