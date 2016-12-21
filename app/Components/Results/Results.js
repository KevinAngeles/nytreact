// Include React
var React = require("react");

var Results = React.createClass({

	render: function() {
		return (
			<div id="resultSection" className="row">
				<div className="col-md-8 col-md-offset-2">
					<div className="page-header">
						<h2>Results</h2>
					</div>
                    <ul id="news" className="list-group">
						<li className="titleNews list-group-item row">
							<div className="col-md-8">Longhorns beats aggies again</div>
							<div className="col-md-4 text-center"><button type="button" className="btn btn-success pull-right">Save</button></div>
						</li>
						<li className="titleNews list-group-item row">
							<div className="col-md-8">Aliens Invade Austin</div>
							<div className="col-md-4 text-center"><button type="button" className="btn btn-success pull-right">Save</button></div>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Results;
