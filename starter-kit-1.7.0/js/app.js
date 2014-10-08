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
	daysMin : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sat" ],
	disableDaysArray : ['Tu'],
	dateRange : 3,
	dateFormat : 'mm-dd-yy',
	rangeSeparator : '-',
	disabledDates : [],
	onRangeSelect : function(dataText,inst){
				var self = this;
				inst.inline = true;
				var dateRangeValue = inst.input.val();
				var datesSeparator = ' '+self.get('rangeSeparator')+' ';
				if(dateRangeValue !== null && dateRangeValue !== undefined && (dateRangeValue.split(datesSeparator).length-1)>=1) {
						var startDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split(datesSeparator)[0]));
						self.set('startDate',startDate);
						var endDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split(datesSeparator)[1]).trim());
						self.set('endDate',endDate);
				}
			},
	didInsertElement : function (){
		var self = this;
		var opts = {
			dateFormat : self.get('dateFormat'),
			maxDate : new Date('11/6/2014'),
			minDate : new Date('10/6/2014'),
			dayNames : self.get('days'),
			dayNamesMin : self.get('daysMin'),
			onSelect : $.proxy(self.onRangeSelect,self),
			beforeShowDay : function(date){

				//format of formattedDate is in yy-mm-dd for comparison
				var formattedDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
				/* Conditions to make date disable are.
					1.Date should be in disableDatesArray in format mm/dd/yy
					2.Day should be in the disableDaysArray in format Monday or Mo 
				*/
				if(self.isInDisableDatesArray(formattedDate) || self.isInDisableDaysArray(formattedDate)) {
					return [false, '', ''];	
				}

				if(self.get('startDate') !== null && self.get('endDate')!==null) {
					if(formattedDate >= self.get('startDate') && formattedDate <= self.get('endDate') && !self.isInDisableDatesArray(formattedDate) && !self.isInDisableDaysArray(formattedDate))
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

	isInDisableDatesArray : function (date) {
		return this.isInArray(this.convertDateToString(date),this.get('disableDatesArray'));
	},

	isInDisableDaysArray : function(date) {
		return (this.isInArray((this.get('days'))[date.getDay()],this.get('disableDaysArray')) || this.isInArray((this.get('daysMin'))[date.getDay()],this.get('disableDaysArray')));
	},

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