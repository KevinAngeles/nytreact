import React from "react";

// Import sub-components
import Saved from "./Saved/Saved";
import Search from "./Search/Search";
import Results from "./Results/Results";

// Helper Function
import helpers from "./utils/helpers";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: {},
			savedArticles: [],
			results: []
		};
		this.setTerm = this.setTerm.bind(this);
        this.addArticle = this.addArticle.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchTerm.topic !== this.state.searchTerm.topic || prevState.searchTerm.beginDate !== this.state.searchTerm.beginDate || prevState.searchTerm.endDate !== this.state.searchTerm.endDate ) {
			helpers.getArticles(this.state.searchTerm.topic,this.state.searchTerm.beginDate,this.state.searchTerm.endDate).then((data) => {
				if (data !== this.state.results) {
					this.setState({ results: data });
				}
			});
		}
	}

	setTerm(term) {
		this.setState({
			searchTerm: term
		});
	}

	addArticle(article) {
        this.setState({
            savedArticles: this.state.savedArticles.concat(article)
        });
	}

	componentWillMount(prevProps, prevState) {
		helpers.getSavedArticles().then((data) => {
			this.setState({ savedArticles: data });
		});
	}

	render() {
		return (
			<div className="container">
				<Search setTerm={this.setTerm} />
				<Results results={this.state.results} addArticle={this.addArticle} />
				<Saved savedArticles={this.state.savedArticles} />
			</div>
		);
	}
}

// Export the component back for use in other files
export default Main;
