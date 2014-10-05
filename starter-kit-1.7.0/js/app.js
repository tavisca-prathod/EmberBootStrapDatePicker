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
						var startDate = new Date(dateRangeValue.split("-")[0]);
						self.startDate = new Date(startDate.getYear(),startDate.getMonth(),startDate.getDate());
						var endDate = new Date(dateRangeValue.split("-")[1]);
						self.endDate = new Date(endDate.getYear(),endDate.getMonth(),endDate.getDate());
					}
					else if((dateRangeValue.split("-").length-1)>3){
						var startDate = new Date(dateRangeValue.split("-")[0]);
						self.startDate = new Date(startDate.getYear(),startDate.getMonth(),startDate.getDate());
						var endDate = new Date(dateRangeValue.split("-")[1]);
						self.endDate = new Date(endDate.getYear(),endDate.getMonth(),endDate.getDate());
					}
				}

				//console.log((self.$('td[data-month="'+self.startDate.getMonth()+'"[data-year="'+self.startDate.getYear()+'"]')).length);
				if(self.startDate !== undefined && self.endDate !== undefined) {
					var count = 0;
					console.log((self.$('td[data-month="'+self.startDate.getMonth()+'"]'+'[data-year="'+self.startDate.getFullYear()+'"]')).length);
					console.log(self.startDate);
					console.log(self.endDate);
					console.log(self.startDate.getDate());
					console.log(self.startDate.setDate(self.endDate.getDate()+1));
					for(self.startDate;self.startDate <= self.endDate; self.startDate.setDate(self.endDate.getDate()+1)){
						//$("td[data-month='9'][data-year='2014']").children("a:contains(9)");
						console.log("running for "+count);
						if(count >10)
							break;
					}
				}
			}
		};
		this.$().daterange(opts);
	}
});