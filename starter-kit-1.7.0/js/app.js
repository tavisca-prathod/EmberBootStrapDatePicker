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
						self.startDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate());
						var endDate = new Date(dateRangeValue.split("-")[1]);
						self.endDate = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate());
					}
					else if((dateRangeValue.split("-").length-1)>3){
						var startDate = new Date(dateRangeValue.split("-")[0]);
						self.startDate = new Date(startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate());
						var endDate = new Date(dateRangeValue.split("-")[1]);
						self.endDate = new Date(endDate.getFullYear(),endDate.getMonth()+1,endDate.getDate());
					}
				}

				//console.log((self.$('td[data-month="'+self.startDate.getMonth()+'"[data-year="'+self.startDate.getYear()+'"]')).length);
				if(self.startDate !== undefined && self.endDate !== undefined) {
					for(self.startDate;self.startDate <= self.endDate; self.startDate.setDate(self.startDate.getDate()+1)){
						//$("td[data-month='9'][data-year='2014']").children("a:contains(9)");
						//console.log(($('td[data-month="'+self.startDate.getMonth()+'"[data-year="'+self.startDate.getFullYear()+'"]')).length);
						//correct version console.log(($('td[data-month="'+self.startDate.getMonth()+'"]'+'[data-year="'+self.startDate.getFullYear()+'"]')));
					//	console.log((self.$('td[data-month="'+self.startDate.getMonth()+'"[data-year="'+self.startDate.getYear()+'"]')).length);
						var selectedDateanchorElement = ($('td[data-month="'+self.startDate.getMonth()+'"]'+'[data-year="'+self.startDate.getFullYear()+'"]')).children('a:eq("'+(self.startDate.getDate()-1)+'")');

						var tdElement = ($('td[data-month="'+self.startDate.getMonth()+'"]'+'[data-year="'+self.startDate.getFullYear()+'"]'));


						tdElement.children().filter(function() {
							if($(this).text()===self.startDate.getDate().toString()) {
								self.$(this).attr('class','selected-excluded-date');
							}
						});
						//(selectedDateanchorElement[0]).css({background : '#F00'});
						//var anchorTagWithDateValue = selectedDateanchorElement[0];
						//$(anchorTagWithDateValue).css('background','#F00');	
						//anchorTagWithDateValue.style.background = '#F00';

						//console.log(anchorTagWithDateValue.style.background);

					}
				}
			}
		};
		this.$().daterange(opts);
	}
});