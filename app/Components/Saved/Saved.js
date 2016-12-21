// Include React
var React = require("react");

var Saved = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div id="savedSection" className="col-md-12">
					<div className="page-header">
						<h2>Saved Articles</h2>
					</div>
				</div>
				<div className="col-md-12">
					<div className="row text-center">
						<div className="col-md-4"><h3>Texas Longhorns wins the national championship!</h3></div>
						<div className="col-md-4">Date Saved: 10/14/15</div>
						<div className="col-md-4"><button type="button" className="btn btn-danger">Remove</button></div>
					</div>
					<div className="row">
						<p className="col-md-12 text-center">Notes: What a wonderful achievement for mankind!</p>
					</div>
				</div>
				<div className="col-md-12">
					<div className="row text-center">
						<div className="col-md-4"><h3>UT Austin ranks as the best university in Texas!</h3></div>
						<div className="col-md-4">Date Saved: 10/14/15</div>
						<div className="col-md-4"><button type="button" className="btn btn-danger">Remove</button></div>
					</div>
					<div className="row">
						<p className="col-md-12 text-center">Notes: What a wonderful achievement for mankind!</p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Saved;
