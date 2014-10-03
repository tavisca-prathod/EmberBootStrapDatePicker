App = Em.Application.create();

App.LOG_TRANSITIONS_INTERNAL = true;

App.Router.map(function(){
	this.resource('datePicker',{path : '/'});
});

App.DatePickerView = Em.View.extend({
	tagName : 'input',
	self: this,
	startDate : null,
	endDate : null,
	didInsertElement : function (){
		var opts = {
			onSelect : function(dateText,inst){
				inst.inline = true;
				var dateRangeValue = inst.input.val();
				if(dateRangeValue !== null && dateRangeValue !== undefined && (dateRangeValue.split("-").length-1)>=1) {
					if((dateRangeValue.split("-").length-1)==1) {
						self.startDate = dateRangeValue.split("-")[0];
						self.endDate = dateRangeValue.split("-")[1];
					}
					else if((dateRangeValue.split("-").length-1)>3){
						self.startDate = dateRangeValue.split("-")[0];
						self.endDate = dateRangeValue.split("-")[1];
					}
				}


			}
		};
		this.$().daterange(opts);
	}
});