// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Geocoder API
const nytAPI = "909b1c1fe6514ff79c445af593f0348a";

// Helper Functions (in this case the only one is runQuery)
const helpers = {
	runQuery: (keyWord,beginDate,endDate) => {
		console.log(keyWord,beginDate,endDate);
		// Figure out the geolocation
		const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
		 + keyWord + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + nytAPI;

		return axios.get(queryURL).then((response) => {
			console.log(response);
			return response.data.response.docs;
    	});
	}
};

// We export the helpers function (which contains getGithubInfo)
export default helpers;
