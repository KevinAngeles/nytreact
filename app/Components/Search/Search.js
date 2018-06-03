import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from "moment";
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';

moment.locale('en');
const displayFormatDate = 'MM/DD/YYYY';
const today = moment().format(displayFormatDate); 

class Search extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateDate = this.validateDate.bind(this);
		this.checkBeginBeforeEndDate = this.checkBeginBeforeEndDate.bind(this);
	}
	validateDate(dt) {
		const dateFormatPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

		// Check that date is not empty and has the correct format
		if(!dateFormatPattern.test(dt))
			return false;

		// Parse the date parts to integers
		let parts = dt.split("/");
		let day = parseInt(parts[1], 10);
		let month = parseInt(parts[0], 10);
		let year = parseInt(parts[2], 10);

		// Check the ranges of month and year
		if(year < 1000 || year > 3000 || month == 0 || month > 12)
			return false;

		let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

		// Adjust for leap years
		if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	}
	checkBeginBeforeEndDate(formattedBeginDate, formattedEndDate) {
		// Check first endDate is less than or equals to beginDate
		return formattedBeginDate <= formattedEndDate;
	}
	// Get the values from the form and update the react state
	handleSubmit(event) {
		event.preventDefault();
		let beginDate = document.getElementById("startYear").value;
		let endDate = document.getElementById("endYear").value;
		let formattedBeginDate = moment(beginDate, "MM/DD/YYYY").format("YYYYMMDD");
		let formattedEndDate = moment(endDate, "MM/DD/YYYY").format("YYYYMMDD");
		
		let newTerm = {
			"topic": document.getElementById("topic").value,
			"beginDate": formattedBeginDate,
			"endDate": formattedEndDate,
			"errors": {
				"topic": {
					"status": false,
					"msg": "" 
				},
				"beginDate": {
					"status": false,
					"msg": "" 
				},
				"endDate": {
					"status": false,
					"msg": "" 
				}
			}
		}
		// Check errors and update newTerm
		if (document.getElementById("topic").value.trim().length == 0)
		{
			newTerm.errors.topic.status = true;
			newTerm.errors.topic.msg = "Topic cannot be empty.";
		}
		if (!this.validateDate(beginDate)){
			newTerm.errors.beginDate.status = true;
			newTerm.errors.beginDate.msg = "Format should be MM/DD/YYYY.";
		}
		else if (!this.checkBeginBeforeEndDate(formattedBeginDate,formattedEndDate)){
			newTerm.errors.beginDate.status = true;
			newTerm.errors.beginDate.msg = "Begin Date should be older than End Date.";
		}
		if (!this.validateDate(endDate)){
			newTerm.errors.endDate.status = true;
			newTerm.errors.endDate.msg = "Format should be MM/DD/YYYY.";
		}
		else if (!this.checkBeginBeforeEndDate(formattedBeginDate,formattedEndDate)){
			newTerm.errors.endDate.status = true;
			newTerm.errors.endDate.msg = "Begin Date should be older than End Date.";
		}
		
		this.props.setTerm(newTerm);
	}

	render() {
		return (
			<div id="searchSection" className="row">
				<div className="page-header">
					<h2>Search</h2>
				</div>
				<div className="panel panel-primary">
					<div className="panel-heading">
						<h3 className="panel-title">Search articles on The New York Times</h3>
					</div>
					<form className="panel-body text-center" onSubmit={this.handleSubmit}>

						<div className="panel-form-group">
							<label htmlFor="topic">Topic</label>
							<input type="text" className="form-control" id="topic" placeholder="Topic" />
							{this.props.searchTerm.hasOwnProperty("errors") && this.props.searchTerm.errors.topic.status == true ? <div className="alert alert-danger"><strong>Error!</strong> {this.props.searchTerm.errors.topic.msg}</div>:""}
						</div>
						<div className="form-group">
							<label htmlFor="startYear">Start Year</label>
							<div>
								<SingleDatePicker
									id="startYear"
									date={this.props.date1} // momentPropTypes.momentObj or null
									onDateChange={ e => this.props.setDate1(e)} // PropTypes.func.isRequired
									focused={this.props.focused1} // PropTypes.bool
									onFocusChange={({ focused }) => this.props.setFocused1(focused)} // PropTypes.func.isRequired
									enableOutsideDays={false}
									isOutsideRange={day => isInclusivelyAfterDay(day, this.props.date2)}
									readOnly={true}
									displayFormat={displayFormatDate}
									numberOfMonths={1} 
									placeholder={today}
								/>
							</div>
							{this.props.searchTerm.hasOwnProperty("errors") && this.props.searchTerm.errors.beginDate.status == true ? <div className="alert alert-danger"><strong>Error!</strong> {this.props.searchTerm.errors.beginDate.msg}</div>:""}
						</div>
						<div className="form-group">
							<label htmlFor="endYear">End Year</label>
							<div>	
								<SingleDatePicker
									id="endYear"
									date={this.props.date2} // momentPropTypes.momentObj or null
									onDateChange={ e => this.props.setDate2(e)} // PropTypes.func.isRequired
									focused={this.props.focused2} // PropTypes.bool
									onFocusChange={({ focused }) => this.props.setFocused2(focused)} // PropTypes.func.isRequired
									enableOutsideDays={false}
									isOutsideRange={ day => 
										!isInclusivelyAfterDay(day, this.props.date1) || isInclusivelyAfterDay(day, moment().add(1, 'days'))
									}
									readOnly={true}
									displayFormat={displayFormatDate}
									numberOfMonths={1}
									placeholder={today}
								/>
							</div>
							{this.props.searchTerm.hasOwnProperty("errors") && this.props.searchTerm.errors.endDate.status == true ? <div className="alert alert-danger"><strong>Error!</strong> {this.props.searchTerm.errors.endDate.msg}</div>:""}
						</div>
						<button type="submit" className="btn btn-primary">Search</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Search;
