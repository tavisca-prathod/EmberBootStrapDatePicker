App = Em.Application.create();

App.LOG_TRANSITIONS_INTERNAL = true;

App.Router.map(function(){
	this.resource('datePicker',{path : '/'});
});

App.DatePickerView = Em.View.extend({
	tagName : 'input',
	self : null,
	selectedDates : null,
	startDate : null,
	endDate : null,
	blackOutDate : function(e){
			var selectedDates = self.$().datepicker('getDates');
			self.selectedDates = selectedDates;
			if(selectedDates.length > 2) {				
			var maxDate = new Date(Math.max.apply(null,selectedDates));
			var minDate = new Date(Math.min.apply(null,selectedDates));
			self.startDate = minDate;
			self.endDate = maxDate;

			selectedDates.forEach(
				function(dateVal) {
					var date = new Date(dateVal);
					if((date < maxDate) && (date > minDate)) {
						$('td').filter(function(){
							if($(this).text() === date.getDate().toString()){
								var dateClassNames = ($(this).attr('class')).split(' ');
								console.log('classname length is '+dateClassNames.length);
								if(dateClassNames.length >=2 ) {
									if(dateClassNames.length == 2) {
										if(dateClassNames[0]==='day' && dateClassNames[1]==='active') {
											$(this).css({background : '#F00'});
										}
									}
									else {
										if(dateClassNames[0]==='day' && dateClassNames[1]==='active') {
											$(this).css({background : '#F00'});
										}	
									}
								}
							}
						});
						//$("td:contains('"+date.getDate()+"')").css({background : '#F00'});
						//console.log($('td[value="'+date.getDate()+'"]'));
						//self.$(jqElement).className += 'selected-excluded-date';
					}
				}
			);	
			}
		},

		blackOutDateOnChangeMonth : function(e) {
			if(self.selectedDates!=null)
			self.selectedDates.forEach(
				function(dateVal) {
					var date = new Date(dateVal);
					if((date < self.endDate) && (date > self.startDate)) {
						$('td').filter(function(){
							if($(this).text() === date.getDate().toString()){
								var dateClassNames = ($(this).attr('class')).split(' ');
								console.log('classname length is '+dateClassNames.length);
							}
						});
					}
				}

				);
		},
	didInsertElement : function (){
		var options = {
			multidate : true
		};
		self = this;
		this.$().datepicker(options);
		this.$().datepicker().on('changeMonth',self.blackOutDateOnChangeMonth);
		this.$().datepicker().on('changeDate',self.blackOutDate);
	},

	beforeShowDay : function(date) {
		return {classes : 'selected-excluded-date'};
	}
});