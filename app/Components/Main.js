import React from "react";
import update from 'react-addons-update';

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
        this.deleteArticle = this.deleteArticle.bind(this);
		this.updateDisabledResults = this.updateDisabledResults.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
        // If the topic or beginDate or endDate are updated
		if (prevState.searchTerm.topic !== this.state.searchTerm.topic || prevState.searchTerm.beginDate !== this.state.searchTerm.beginDate || prevState.searchTerm.endDate !== this.state.searchTerm.endDate ) {
            // Get articles from the New York Times
            helpers.getArticles(this.state.searchTerm.topic,this.state.searchTerm.beginDate,this.state.searchTerm.endDate).then((data) => {
                let newData = data.map( (article) => {
					// Check if there is at least one saved article
					// with the same url that the article retrieved from the New York Times
                    let btnDisabled = this.state.savedArticles.some(function(savedArticle) {
                        return savedArticle["url"] === article["web_url"];
                    });
					// If the article is already stored in the database set button disabled
                    article["btnDisabled"] = btnDisabled;
					return article;
				});
				this.setState({ results: newData });
			});
		}
	}

	// Update the state searchTerm
	setTerm(term) {
		this.setState({
			searchTerm: term
		});
	}

    // Update the state results by disabling the article saved
    updateDisabledResults(index) {
		let updatedResults = this.state.results;
        updatedResults[parseInt(index)]["btnDisabled"] = true;
		// Update the state results
        this.setState({results:updatedResults});
    }

	// Update the state savedArticles by adding a new article
	addArticle(article) {
        this.setState({
            savedArticles: this.state.savedArticles.concat(article)
        });
	}

	// Update the state savedArticles by removing an article
    deleteArticle(articleIndex) {
        let updatedSavedArticles = update(this.state.savedArticles,  {
                $splice: [[articleIndex, 1]]
        });
		this.setState({
			savedArticles : updatedSavedArticles
		});
	}

	// Before the first render, get all the savedArticles from the db and update the state savedArticles
	componentWillMount(prevProps, prevState) {
		// Get all the savedArticles from the db
		helpers.getSavedArticles().then((data) => {
			// Update the state savedArticles
			this.setState({ savedArticles: data });
		});
	}

	render() {
		return (
			<div className="container">
				<Search setTerm={this.setTerm} />
				<Results results={this.state.results} addArticle={this.addArticle} updateDisabledResults={this.updateDisabledResults} />
				<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
			</div>
		);
	}
}

// Export the component back for use in other files
export default Main;
