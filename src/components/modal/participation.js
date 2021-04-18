import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: '15rem',
        width: '15rem',
        textAlign: 'center',
        display: "flex",
        fontSize: '28px',
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: '#eee',
        border: '1px solid #bbb'
    },
    paperSmall: {
        height: '4.175rem',
        width: '4.175rem',
        textAlign: 'center',
        display: "flex",
        fontSize: '16px',
        flexDirection: "column",
        justifyContent: "center",
        border: '1px solid #bbb',
        backgroundColor: '#eee',
    },
    customSpacing: {
        paddingBottom: '1.1rem'
    },
    xCustomSpacing: {
        padding: '0.25rem'
    },
    paperXSmall: {
        height: '1.4rem',
        width: '1.4rem',
        fontSize: '11px',
        textAlign: 'center',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: '1px solid #bbb',
        backgroundColor: '#eee',
    },
}))

// calculations a color for the participation value
const getParticipationColor = (iValue) => {
	let iOpacity;
	if (!iValue) {
		return false;
	}
	if (iValue === 0) {
		iOpacity = 0;
	} else {
		iOpacity = Math.log(iValue)/4 + 0.03; // 50 = 1, scale logarithmically below
	}
	iOpacity = Math.min(1, iOpacity);
	return "rgba(50, 205, 50, " + iOpacity + ")";
}

// creates an HTMl-based heatmap for the current week and the previous 12 weeks from participation stats
const CreateParticipationChart = (props) => {
    const classes = useStyles()
	let aParticipation = props._InnerSourceMetadata.participation;
	const aPrevious12Weeks = aParticipation.slice(aParticipation.length - 13, aParticipation.length - 1).reverse();

	// this week
	let iValue = aParticipation[aParticipation.length - 1];
	let oContext = {
		thisWeek: {
			"commits": iValue,
			"color": getParticipationColor(iValue)
		},
		"weeksPreviousLabel": undefined,
		"weeksPrevious": [],
		"weeksBeforeLabel": undefined,
		"weeksBefore": []
	};

	// previous 12 weeks
	const iCreatedWeeksAgo = Math.ceil((Date.now() - new Date(props.created_at).getTime()) / 1000 / 86400 / 7) - 1
	let iCommitsWeeksBefore = 0;
	aPrevious12Weeks.forEach((iValue, iIndex) => {
		// don't print boxes for new repos
		if (iIndex >= iCreatedWeeksAgo) {
			return;
		}
		iCommitsWeeksBefore += iValue;

		oContext.weeksPrevious.push({
			"commits": iValue,
			"color": getParticipationColor(iValue)
		});
	});
	oContext.weeksPreviousLabel = Math.min(12, iCreatedWeeksAgo) + " weeks: " + iCommitsWeeksBefore;

	// 9 months before in weeks
	const aPrevious9months = aParticipation.slice(1, aParticipation.length - 13).reverse();
	let iWeeksBefore = 0;
	let iCommitsMonthBefore = 0;
	aPrevious9months.forEach((iValue, iIndex) => {
		// don't print boxes for new repos
		if (iIndex >= iCreatedWeeksAgo - 13) {
			return;
		}
		iCommitsMonthBefore += iValue;
		iWeeksBefore++;

		oContext.weeksBefore.push({
			"commits": iValue,
			"color": getParticipationColor(iValue)
		});
	});
	oContext.weeksBeforeLabel = (Math.floor(iWeeksBefore / 4) <= 1 ? iWeeksBefore + " weeks before: " : Math.floor(iWeeksBefore / 4) + " months before: ") + iCommitsMonthBefore;

	// return window._globals.templates.participation(oContext);
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid xs={5} item className={classes.customSpacing}>
                            <Paper 
                                className={classes.paper}
                                style={{ 
                                    backgroundColor: oContext.thisWeek.color,
                                    border: `1px solid ${oContext.thisWeek.color}`
                                }}
                                elevation={0}
                            >
                                <b>{oContext.thisWeek.commits}</b>
                            </Paper><br />
                            <Typography align="center">
                                This Week
                            </Typography>
                        </Grid>
                        <Grid xs={7} item>
                            <Grid container>
                            {
                                oContext.weeksPrevious.map( (item, index) =>
                                    <Grid key={index} xs={3} item className={classes.customSpacing}>
                                        <Paper 
                                            className={classes.paperSmall}
                                            style={{ 
                                                backgroundColor: item.color,
                                                border: `1px solid ${item.color}`
                                            }}
                                            elevation={0}
                                        >
                                            <b>{item.commits}</b>
                                        </Paper>
                                    </Grid>
                                )
                            }
                            </Grid>
                            <Typography align="center">
                                In previous {oContext.weeksPreviousLabel}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12}>
                    <Grid container>
                    {
                        oContext.weeksBefore.map( (ele, index) => (
                            <Grid key={index} xs={false} item className={classes.xCustomSpacing}>
                                <Paper 
                                    className={classes.paperXSmall}
                                    style={{ 
                                        backgroundColor: ele.color,
                                        border: `1px solid ${ele.color}`
                                    }}
                                    elevation={0}
                                >
                                    <b>{ele.commits}</b>
                                </Paper>
                            </Grid>
                        ))
                    }
                    </Grid>
                    <br />
                    <Typography align="center">
                        In the {oContext.weeksBeforeLabel}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateParticipationChart