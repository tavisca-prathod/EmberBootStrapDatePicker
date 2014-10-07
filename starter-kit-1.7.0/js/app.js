App = Em.Application.create();

App.LOG_TRANSITIONS_INTERNAL = true;

App.Router.map(function(){
	this.resource('datePicker',{path : '/'});
});

App.DatePickerView = Em.View.extend({
	tagName : 'input',
	startDate : null,
	endDate : null,
	didInsertElement : function (){
		var self = this;
		var opts = {
			//dateFormat : 'dd-mm-yy',
			onSelect : function(dataText,inst){
				inst.inline = true;
				var dateRangeValue = inst.input.val();
				if(dateRangeValue !== null && dateRangeValue !== undefined && (dateRangeValue.split("-").length-1)>=1) {
					if(((dateRangeValue.split("-").length-1)==1)) {
						var startDate = new Date(dateRangeValue.split("-")[0]);
						self.set('startDate',new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()));
						var endDate = new Date(dateRangeValue.split("-")[1]);
						self.set('endDate',new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()));
					}
				}
			},
			beforeShowDay : function(date){
				//format is in yy-mm-dd for comparison
				var formattedDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
				if(self.get('startDate') !== null && self.get('endDate')!==null) {
					if(formattedDate >= self.get('startDate') && formattedDate <= self.get('endDate'))
						return [true,'selected-excluded-date',''];
					else
						return [true, '', ''];		
				}
				return [true, '', ''];
			}
		}
		this.$().daterange(opts);
	}
});