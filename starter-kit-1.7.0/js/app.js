App = Em.Application.create();

App.LOG_TRANSITIONS_INTERNAL = true;

App.Router.map(function(){
	this.resource('datePicker',{path : '/'});
});

App.DatePickerView = Em.View.extend({
	tagName : 'input',
	startDate : null,
	endDate : null,
	disableDatesArray : ['10/14/2014','10/17/2014'],
	days : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	daysMin : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
	disableDaysArray : ['Monday','Tu'],
	dateRange : 3,
	dateFormat : 'dd-mm-yy',
	didInsertElement : function (){
		var self = this;
		var opts = {
			dateFormat : self.get('dateFormat'),
			maxDate : new Date('11/6/2014'),
			minDate : new Date('10/6/2014'),
			onSelect : function(dataText,inst){
				inst.inline = true;
				var dateRangeValue = inst.input.val();
			//	self.getEndDateForRangeSpecified(dateRangeValue);
				if(dateRangeValue !== null && dateRangeValue !== undefined && (dateRangeValue.split("-").length-1)>=1) {
					if(((dateRangeValue.split("-").length-1)==1)) {
						var startDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split("-")[0]));
						self.set('startDate',startDate);
						var endDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split("-")[1]));
						self.set('endDate',endDate);
						//self.getEndDateForRangeSpecified(endDate);
					}
					else if(((dateRangeValue.split("-").length-1) > 3)) {
						var startDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split(" - ")[0]));
						self.set('startDate',startDate);
						var endDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split(" - ")[1]));
						self.set('endDate',endDate);
					}
				}
			},
			beforeShowDay : function(date){
				//format of formattedDate is in yy-mm-dd for comparison
				var formattedDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
				/* Conditions to make date disable are.
					1.Date should be in disableDatesArray in format mm/dd/yy
					2.Day should be in the disableDaysArray in format Monday or Mo 
				*/
				if(self.isInArray(self.convertDateToString(formattedDate),self.get('disableDatesArray')) || self.isInArray((self.get('days'))[formattedDate.getDay()],self.get('disableDaysArray')) || self.isInArray((self.get('daysMin'))[formattedDate.getDay()],self.get('disableDaysArray'))) {
					return [false, '', ''];	
				}

				if(self.get('startDate') !== null && self.get('endDate')!==null) {
					if(formattedDate >= self.get('startDate') && formattedDate <= self.get('endDate') && !self.isInArray(self.convertDateToString(formattedDate),self.get('disableDatesArray')) && !self.isInArray((self.get('days'))[formattedDate.getDay()],self.get('disableDaysArray')) && !self.isInArray((self.get('daysMin'))[formattedDate.getDay()],self.get('disableDaysArray')))
						return [true,'selected-excluded-date',''];	
					else
						return [true, '', ''];		
				}
				return [true, '', ''];
			}
		}
		this.$().daterange(opts);
	},

	/*This will return the string value of date in mm/dd/yy format
	  Incremented month by one as the months in javascript date object startes with index 0 
	  e.g -> January => 0,
	  		 February => 1	
	*/

	convertDateToString : function(date) {
		return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
	},

	isInArray : function(value,array) {
		return array.indexOf(value) !== -1;
	},
	numberOfDaysInMonth : function (year, month) {
    	var d = new Date(year, month, 0);
    	return d.getDate();
	},
	getEndDateForRangeSpecified : function(startDate){
		var date = $.datepicker.parseDate('mm/dd/yy',startDate.toString());
		var endDate = date;
		for(var i=0; i < this.get('dateRange');i++) {
			//var maxNumberOfMonths = this.k
		}
	}
});