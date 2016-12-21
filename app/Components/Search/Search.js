// Include React
var React = require("react");

var Search = React.createClass({
	render: function() {
		return (
			<div id="searchSection" className="row">
				<div className="col-md-12">
					<div className="page-header">
						<h2>Search</h2>
					</div>
					<form className="text-center">
						<div className="form-group">
							<label forHtml="formTopic">Topic</label>
							<input type="text" className="form-control" id="formTopic" placeholder="Topic" />
						</div>
						<div className="form-group">
							<label forHtml="formStartYear">Start Year</label>
							<input type="text" className="form-control" id="formStartYear" placeholder="MM/DD/YY" />
						</div>
						<div className="form-group">
							<label forHtml="formEndYear">End Year</label>
							<input type="text" className="form-control" id="formEndYear" placeholder="MM/DD/YY" />
						</div>
						<button type="button" className="btn btn-primary">Search</button>
					</form>
				</div>
			</div>
		);
	}
});

module.exports = Search;