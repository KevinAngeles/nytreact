// Include React
var React = require("react");

class Results extends React.Component {
    constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="resultSection" className="row">
				<div className="col-md-8 col-md-offset-2">
					<div className="page-header">
						<h2>Results</h2>
					</div>
                    <ul id="news" className="list-group">
						{
							this.props.results.map(article => <li className="titleNews list-group-item row" key={article._id}>
	                                <div className="col-md-8"><a href={article.web_url}>{article.lead_paragraph}</a></div>
	                                <div className="col-md-4 text-center"><button type="button" className="btn btn-success pull-right">Save</button></div>
	                            </li>
                            )
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default Results;
