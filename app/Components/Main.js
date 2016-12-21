import React from "react";

// Import sub-components
import Saved from "./Saved/Saved";
import Search from "./Search/Search";
import Results from "./Results/Results";


class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			articles: ""
		};
	}

	render() {
		return (
			<div className="container">
				<Search />
				<Results />
				<Saved />
			</div>
		);
	}
}

// Export the componen back for use in other files
export default Main;
