import { Typography, Tooltip } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    iconGroup: {
        float: 'left',
    },
    icon: {
        display: 'block',
        color: '#444444',
        textAlign: 'center',
        fontSize: '1.35em',
        "&:hover": {
            cursor: 'pointer'
        },
        marginTop: '0.25rem'
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

// fetches the corresponding image for the activity score
const getActivityLogo = (iScore) => {
	let sActivityLevel = "None", imgSrc=""

	if (iScore > 2500) {
        imgSrc = "5.png"
		sActivityLevel = "Extremely High";
	} else if (iScore > 1000) {
        imgSrc = "4.png"
		sActivityLevel = "Very High";
	} else if (iScore > 300) {
        imgSrc = "3.png"
		sActivityLevel = "High";
	} else if (iScore > 150) {
        imgSrc = "2.png"
		sActivityLevel = "Moderate";
	} else if (iScore > 50) {
        imgSrc = "1.png"
		sActivityLevel = "Low";
	} else if (iScore > 5) {
        imgSrc = "0.png"
		sActivityLevel = "Very Low";
	} else {
        imgSrc = "0.png"
		sActivityLevel = "None";
    }
	return [sActivityLevel, imgSrc]
}

// get a visual representation of the Activity Score of the repo.
// - if Activity Score exists: an image representing how active the repo is
// - if Activity Score doesn't exist: a placeholder
const GetRepoActivity = (props) => {

    const classes = useStyles()

    let _InnerSourceMetadata = props._InnerSourceMetadata
    let score = props._InnerSourceMetadata.score
	let sScoreIndicator = ""

	if (_InnerSourceMetadata && typeof score === "number") {
		sScoreIndicator = getActivityLogo(score)
	}
    
    return (
        <Typography component='div' className={classes.iconGroup}>
            <Typography 
                className={classes.icon} 
                style={{ padding: props.customPadding }}
            >
                <CustomTooltip title={`Activity: ${sScoreIndicator[0]}`} arrow placement="top-start">
                    <img 
                        src={`./images/activity/${sScoreIndicator[1]}`} 
                        alt={sScoreIndicator[1]} 
                        width="80%" 
                    />
                </CustomTooltip>
            </Typography>
        </Typography>
    )
}

export default GetRepoActivity