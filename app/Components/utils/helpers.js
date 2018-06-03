// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// nyt API
const nytAPI = "909b1c1fe6514ff79c445af593f0348a";

// Helper Functions
const helpers = {
	getArticles: (keyWord,beginDate,endDate) => {
		const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
		 + keyWord + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + nytAPI;

		return axios.get(queryURL).then((response) => {
			//Filter all the articles that don't have snippets or articles that have null or empty snippets
            let articles = response.data.response.docs.filter( article => (article.hasOwnProperty('snippet') && typeof article['snippet'] === 'string' && article['snippet'].length) );
			return articles;
    	});
	},
	getSavedArticles: () => {
		const queryURL = "/api/saved";

		return axios.get(queryURL).then((savedArticles) => {
			return savedArticles.data;
		});
	},
	saveArticle: (title,url) => {
		const queryURL = "/api/saved";

		return axios.post(queryURL,{
			title: title,
			url: url
		}).then((res) => {
			return res.data;
		});
	},
	deleteArticle: (articleId) => {
		const queryURL = "/api/saved";
        return axios({
            method: "delete",
            url: queryURL,
            data: {articleId:articleId},
            params: {}
        }).then((res) => {
			return res;
		});
	},
	normalizeDate: (dt) => {
		return moment(dt).calendar();
	}
};

// Export helpers
export default helpers;
