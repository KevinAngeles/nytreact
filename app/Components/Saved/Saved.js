// Include React
var React = require("react");

class Saved extends React.Component {
    constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<div id="savedSection" className="col-md-12">
					<div className="page-header">
						<h2>Saved Articles</h2>
					</div>
				</div>
                {
                    this.props.savedArticles.map(article => <div className="col-md-12" key={article._id}>
        					<div className="row text-center">
        						<div className="col-md-4"><h3><a href={article.url}>{article.title}</a></h3></div>
        						<div className="col-md-4">Date Saved: {article.date}</div>
        						<div className="col-md-4"><button type="button" className="btn btn-danger">Remove</button></div>
        					</div>
        					<div className="row">
        						<p className="col-md-12 text-center">Notes: What a wonderful achievement for mankind!</p>
        					</div>
        				</div>
                    )
                }
			</div>
		);
	}
}

export default Saved;
