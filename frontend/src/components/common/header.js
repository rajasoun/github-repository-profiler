import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#2196F3'
    },
    typography: {
        flexGrow: 1,
        textAlign: 'center',
    },
    header: {
        margin: 0,
        fontWeight: 'bold',
        lineHeight: '1.8',
        fontSize: '2.1rem',
        letterSpacing: 0,
    },
    subHeader: {
        marginTop: 0,
        lineHeight: '0.625rem',
        fontSize: '1rem',
        fontWeight: 'normal',
        letterSpacing: 0,
    },
})

const Header = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <Typography className={classes.typography}>
                                <p className={classes.header}>
                                    InnerSource Project Portal
                                </p>
                                <p className={classes.subHeader}>
                                    Leverage, Reuse or Contribute to <b>{props.projectCount}</b> InnerSource projects
                                </p>
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
