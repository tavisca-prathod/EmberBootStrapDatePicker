App = Em.Application.create();

App.LOG_TRANSITIONS_INTERNAL = true;

App.Router.map(function(){
	this.resource('datePicker',{path : '/'});
});

App.DatePickerView = Em.View.extend({
	tagName : 'input',
	didInsertElement : function (){
		var options = {
			multidate : true
		};
		this.$().datepicker(options);
		var self = this;
		this.$().datepicker().on('changeDate',function(e){
			var selectedDates = self.$().datepicker('getDates');
			if(selectedDates.length > 2) {				
			var maxDate = new Date(Math.max.apply(null,selectedDates));
			var minDate = new Date(Math.min.apply(null,selectedDates));

			selectedDates.forEach(
				function(dateVal) {
					var date = new Date(dateVal);
					if((date < maxDate) && (date > minDate)) {
						$('td').filter(function(){
							if($(this).text() === date.getDate().toString() && ($(this).attr('class') === 'day active')){
								console.log();
								$(this).css({background : '#F00'});
							}
						});
						//$("td:contains('"+date.getDate()+"')").css({background : '#F00'});
						//console.log($('td[value="'+date.getDate()+'"]'));
						//self.$(jqElement).className += 'selected-excluded-date';
					}
				}
			);	
			}
		});
	},

	beforeShowDay : function(date) {
		return {classes : 'selected-excluded-date'};
	}
});