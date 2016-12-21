// Include React
var React = require("react");

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
        var beginDate = document.getElementById("startYear").value;
        var formattedBeginDate = moment(beginDate, "MM/DD/YYYY").format("YYYYMMDD");
        var endDate = document.getElementById("endYear").value;
        var formattedEndDate = moment(endDate, "MM/DD/YYYY").format("YYYYMMDD");
		var newTerm = {
			"topic": document.getElementById("topic").value,
			"beginDate": formattedBeginDate,
			"endDate": formattedEndDate
		}
		this.props.setTerm(newTerm);
	}

	render() {
		return (
			<div id="searchSection" className="row">
				<div className="col-md-12">
					<div className="page-header">
						<h2>Search</h2>
					</div>
					<form className="text-center" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label forHtml="topic">Topic</label>
							<input type="text" className="form-control" id="topic" placeholder="Topic" />
						</div>
						<div className="form-group">
							<label forHtml="startYear">Start Year</label>
							<input type="text" className="form-control" id="startYear" placeholder="MM/DD/YYYY" />
						</div>
						<div className="form-group">
							<label forHtml="endYear">End Year</label>
							<input type="text" className="form-control" id="endYear" placeholder="MM/DD/YYYY" />
						</div>
						<button type="submit" className="btn btn-primary">Search</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Search;
