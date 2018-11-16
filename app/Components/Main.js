import React from "react";
import update from 'react-addons-update';

// Import sub-components
import Saved from "./Saved/Saved";
import Search from "./Search/Search";
import Results from "./Results/Results";
import NavHeader from "./NavHeader/NavHeader";

// Helper Function
import helpers from "./utils/helpers";
import moment from "moment";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: {},
			savedArticles: [],
			results: [],
			calendar: {
				date1: moment().subtract(1, 'months'),
				date2: moment(),
				focused1: false,
				focused2: false,
			}
		};
		this.setTerm = this.setTerm.bind(this);
		this.setDate1 = this.setDate1.bind(this);
		this.setDate2 = this.setDate2.bind(this);
		this.setFocused1 = this.setFocused1.bind(this);
		this.setFocused2 = this.setFocused2.bind(this);
		this.addArticle = this.addArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.updateDisabledResults = this.updateDisabledResults.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		// If the topic or beginDate or endDate are updated
		if (
			!(this.state.searchTerm.hasOwnProperty("errors") && (this.state.searchTerm.errors.topic.status || this.state.searchTerm.errors.beginDate.status || this.state.searchTerm.errors.endDate.status)) 
			&&
			(prevState.searchTerm.topic !== this.state.searchTerm.topic || prevState.searchTerm.beginDate !== this.state.searchTerm.beginDate || prevState.searchTerm.endDate !== this.state.searchTerm.endDate)
		) {
			// Get articles from the New York Times
			helpers.getArticles(this.state.searchTerm.topic,this.state.searchTerm.beginDate,this.state.searchTerm.endDate).then((data) => {
				// If there is at least one result
				let newData = data.length ? data.map( (article) => {
					// Check if there is at least one saved article
					// with the same url that the article retrieved from the New York Times
					let btnDisabled = this.state.savedArticles.some(function(savedArticle) {
						return savedArticle["url"] === article["web_url"];
					});
					// If the article is already stored in the database set button disabled
					article["btnDisabled"] = btnDisabled;
					return article;
				}) : { error: "No articles found. Please, try with a new topic or date." };
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

	setDate1(dt) {
		this.setState( prev => { 
			let currentCalendarState = {...prev.calendar};
			currentCalendarState.date1 = dt;
			
			return {calendar: currentCalendarState};
		});
	}

	setDate2(dt) {
		this.setState( prev => {
			let currentCalendarState = {...prev.calendar};
			currentCalendarState.date2 = dt;
		
			return {calendar: currentCalendarState};
		});
	}

	setFocused1(f) {
		this.setState( prev => {
			let currentCalendarState = {...prev.calendar};
			currentCalendarState.focused1 = f;
			
			return {calendar: currentCalendarState};
		});
	}

	setFocused2(f) {
		this.setState( prev => {
			let currentCalendarState = {...prev.calendar};
			currentCalendarState.focused2 = f;
			
			return {calendar: currentCalendarState};
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
			savedArticles: [article].concat(this.state.savedArticles)
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
			<div>
				<NavHeader/>
				<div className="container">
					<Search 
						searchTerm={this.state.searchTerm}
						setTerm={this.setTerm}
						date1={this.state.calendar.date1}
						setDate1={this.setDate1}
						date2={this.state.calendar.date2}
						setDate2={this.setDate2}
						focused1={this.state.calendar.focused1}
						setFocused1={this.setFocused1}
						focused2={this.state.calendar.focused2}
						setFocused2={this.setFocused2}
					/>
					<Results results={this.state.results} addArticle={this.addArticle} updateDisabledResults={this.updateDisabledResults} />
					<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
				</div>
			</div>
		);
	}
}

// Export the component back for use in other files
export default Main;
