// Include React
var React = require("react");
import helpers from "./../utils/helpers";

class Saved extends React.Component {
    constructor(props) {
		super(props);
        this.deleteSavedArticle = this.deleteSavedArticle.bind(this);
	}

    // Remove article from the database
    deleteSavedArticle(event) {
        let articleIndex = parseInt(event.target.value);
        let article = this.props.savedArticles[articleIndex];
        let articleId = article["_id"];
        // Make a delete request and update the state savedArticles
        // only if it was succesfully removed from the database
        helpers.deleteArticle(articleId).then((data) => {
            this.props.deleteArticle(articleIndex);
        });
	}

	render() {
		return (
			<div id="savedSection" className="row">
				<div className="page-header">
					<h2>Saved Articles</h2>
				</div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Articles saved on the Database</h3>
                    </div>
                    <div className="panel-body">
                    {
                        this.props.savedArticles.map((article,articleIndex) => <div className="savedArticle col-md-12" key={article._id}>
            					<div className="row text-center">
            						<div className="col-md-4"><h3><a href={article.url}>{article.title}</a></h3></div>
            						<div className="col-md-4">Date Saved: {article.date}</div>
            						<div className="col-md-4"><button type="button" className="btn btn-danger" onClick={this.deleteSavedArticle} value={articleIndex}>Remove</button></div>
            					</div>
            					<div className="row">
            						<p className="col-md-12 text-center">Notes: What a wonderful achievement for mankind!</p>
            					</div>
            				</div>
                        )
                    }
                    </div>
                </div>
			</div>
		);
	}
}

export default Saved;
