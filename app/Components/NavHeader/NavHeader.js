// Include React
const React = require("react");
import moment from "moment";

moment.locale('en');
const displayFormatDate = 'dddd MMMM DD, YYYY';
const today = moment().format(displayFormatDate); 

const Results = () => {
	return (
        <nav id="navHeader">
            <h1 id="pageTitle">New York Times Article Scrubber</h1>
            <h2 id="pageSubTitle">AUSTIN, TX - {today} - Search for and anotate articles of interest</h2>
        </nav>
    );
}

export default Results;
