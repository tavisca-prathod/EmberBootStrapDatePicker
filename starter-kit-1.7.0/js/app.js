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
	selectDateRange : 3,
	dateFormat : 'mm/dd/yy',
	rangeSeparator : ' - ',
	disableDateFrom : '10/9/2014',
	disableDateTo : '10/17/2014',
	disabledRangeincludibleDatesArray : [],
	dateSeperator : '/',

	init : function() {
		this._super();
		//validate disable from and to date
		//Accept disableDateFrom and disableDateTo in mm/dd/yy format 
		if(this.get('disableDateFrom') !== null && this.get('disableDateTo') !== null) {
			var disableDateFrom = $.datepicker.parseDate('mm/dd/yy',this.get('disableDateFrom'));
			var disableDateTo = $.datepicker.parseDate('mm/dd/yy',this.get('disableDateTo'));
			this.addDisableDatesFromRangeToDisableDatesArray(disableDateFrom,disableDateTo);		
		}
		//getting the date separator from the date format
		this.set('dateSeperator',this.getSepararterFromDateOrFormat(this.get('dateFormat')));
	},

	getSepararterFromDateOrFormat : function(dateOrFormat) {
		var dateFormatCharIndex = 0;
		var regex = /[a-zA-Z0-9]/;
		var dateSeperator = ' ';
		for(dateFormatCharIndex;dateFormatCharIndex < dateOrFormat.length;dateFormatCharIndex++) {
			if(!dateOrFormat.charAt(dateFormatCharIndex).match(regex)){
				dateSeperator = dateOrFormat.charAt(dateFormatCharIndex);
				break;
			}
		}
		return dateSeperator;
	},
	addDisableDatesFromRangeToDisableDatesArray : function(disableDateFrom,disableDateTo) {
		if(disableDateTo > disableDateFrom) {
				for(disableDateFrom; disableDateFrom <= disableDateTo;disableDateFrom.setDate(disableDateFrom.getDate()+1)) {	
					(this.get('disableDatesArray')).addObject(this.convertDateToString(disableDateFrom,'/'));
				}
			}
	},
	onRangeSelect : function(dataText,inst){
				var self = this;
				inst.inline = true;
				var dateRangeValue = inst.input.val();
				(self.set('disabledRangeincludibleDatesArray',[]));
				if(self.get('selectDateRange') === 0) {
					if(dateRangeValue !== null && dateRangeValue !== undefined && (dateRangeValue.split(self.get('rangeSeparator')).length-1)>=1) {
						var startDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split(self.get('rangeSeparator'))[0]));
						self.set('startDate',startDate);
						var endDate = $.datepicker.parseDate(self.get('dateFormat'),(dateRangeValue.split(self.get('rangeSeparator'))[1]));
						self.set('endDate',endDate);
					}
				}
				else {
					var fromDate = $.datepicker.parseDate(self.get('dateFormat'),dateRangeValue);
					var endDate = new Date(fromDate.getFullYear(),fromDate.getMonth(),(fromDate.getDate()+self.get('selectDateRange')-1));

					for(fromDate;fromDate<=endDate;fromDate.setDate(fromDate.getDate()+1)) {
						if(this.isInDisableDatesArray(fromDate) || this.isInDisableDaysArray(fromDate)) {
							(self.get('disabledRangeincludibleDatesArray')).addObject(self.convertDateToString(fromDate,self.get('dateSeperator')));
						}
					}
					var endDateSpecifiedDateFormat = ($.datepicker.parseDate(self.get('dateFormat'),self.convertDateToString(endDate,self.get('dateSeperator'))));
					var rangeVal = dateRangeValue + self.get('rangeSeparator') + endDateSpecifiedDateFormat.toLocaleDateString().split(self.getSepararterFromDateOrFormat(endDateSpecifiedDateFormat.toLocaleDateString())).join(self.get('dateSeperator'));
					inst.input.val(rangeVal);
					inst.rangeStart = null;
					self.set('startDate',$.datepicker.parseDate(self.get('dateFormat'),dateRangeValue));
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
					if(self.isInArray(self.convertDateToString(formattedDate,self.get('dateSeperator')),self.get('disabledRangeincludibleDatesArray'))) {
						return [false,'selected-excluded-date',''];	
					}
					return [false, '', ''];	
				}

				if(self.get('startDate') !== null && self.get('endDate')!==null) {
					if(formattedDate >= self.get('startDate') && formattedDate <= self.get('endDate')) {
						if(!self.isInDisableDatesArray(formattedDate) && !self.isInDisableDaysArray(formattedDate)){
							return [true,'selected-excluded-date',''];	
						}
					}
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
		return this.isInArray(this.convertDateToString(date,'/'),this.get('disableDatesArray'));
	},

	isInDisableDaysArray : function(date) {
		return (this.isInArray((this.get('days'))[date.getDay()],this.get('disableDaysArray')) || this.isInArray((this.get('daysMin'))[date.getDay()],this.get('disableDaysArray')));
	},

	convertDateToString : function(date,dateSeperator) {
		return (date.getMonth()+1)+dateSeperator+date.getDate()+dateSeperator+date.getFullYear();
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
		for(var i=0; i < this.get('selectDateRange');i++) {
			//var maxNumberOfMonths = this.k
		}
	}
});