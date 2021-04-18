import { Avatar, Tooltip } from '@material-ui/core'
import seedrandom from 'seedrandom'
import { withStyles } from '@material-ui/core/styles';

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: theme.typography.pxToRem(14),
    },
}))(Tooltip);

// helper function to display each language in a different static color
const stringToColor = (sString) => {
	seedrandom(sString);
	const rand = Math.random() * Math.pow(255,3);
	seedrandom();

	let sColor = "#";
	for (let i = 0; i < 3; sColor += ("00" + ((rand >> i++ * 8) & 0xFF).toString(16)).slice(-2));
	return sColor;
}

const GetRepoLanguage = (props) => {
    let sLanguage = props.language
	let sLanguageShort = "N/A"
	let sFontSize
	let alignItem = props.alignItem

	if (sLanguage) {
		sLanguageShort = sLanguage;
		if(sLanguageShort.length > 4) {
			// smart length reduction
			if ( sLanguageShort.match(/[A-Z][a-z]+/g) && sLanguageShort.match(/[A-Z][a-z]+/g).length > 1){
				// abbreviate by capital letters and cut off at 4 letters
				sLanguageShort = sLanguageShort.match(/[A-Z][a-z]+/g).reduce(
          (x, y) => x.substr(0,1) + y.substr(0, 1)
        )
			} else if (sLanguageShort.match(/[auoie]+/g)) {
				// remove vowels
				while(sLanguageShort.match(/[auoie]+/g) && sLanguageShort.length > 4) {
					sLanguageShort = sLanguageShort.replace(/[auoie]{1}/, "");
				}
			}
			// shorten to 4 letters
			sLanguageShort = sLanguageShort.substr(0, 4);
		} else {
			// short enough
			sLanguageShort = sLanguage;
		}
		// scale down size with length of string
		if (sLanguageShort.length > 2) {
			sFontSize = 100 - (sLanguageShort.length - 2) * 10 + "%";
		}
	} else {
		sLanguage = "not available";
	}

	// a pseudo-random color coding and the shortened text
	return (
        <CustomTooltip title={`Language: ${sLanguage}`} arrow placement="top-start" >
            <Avatar
                style={{
					backgroundColor: (sLanguageShort !== "N/A" ?  stringToColor(sLanguage) : ""),
					fontSize: sFontSize,
					width: '2rem',
					height: '2rem',
					padding: '0.05rem',
					marginLeft: alignItem
                }}
            >
                {sLanguageShort}
            </Avatar>
        </CustomTooltip>
	)
}

export default GetRepoLanguage
