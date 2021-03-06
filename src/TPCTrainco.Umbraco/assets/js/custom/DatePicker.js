'use strict';

// the site for the plugin used: http://ghusse.github.io/jQRangeSlider/index.html
function DatePicker() {
	// min start date of range and slider handle
	var _this = this;
	var minDate = new Date();


	minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
	this.minMonth = minDate.getMonth();

	// max date of range
	var monthOffset = 15;
	var maxDate = new Date(new Date(minDate).setMonth(minDate.getMonth() + monthOffset));
	maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
	this.maxMonth = maxDate.getMonth()

	// the right slider handle, add three months
	var maxRangeSelect = new Date(new Date(minDate).setMonth(minDate.getMonth() + 3));
	var minRangeSelect = new Date(new Date(minDate));

	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

	if($(window).width()<= 700) {
		var months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
	}

  	$('#date-range-slider').dateRangeSlider({

  		bounds: {
  			min: new Date(minDate),
  			max: new Date(maxDate)
  		},

	    defaultValues: {
	    	min: new Date(minRangeSelect),
	    	max: new Date(maxRangeSelect)
	    },

	    range: {
	    	min: {months: 2}
	    },

	    valueLabels: 'hide',

	    step: {
	    	months: 1
	    },

	    scales: [{
	    	first: function(value){
  			return value;
	  		},

	  		end: function(value) {
	  			return value;
	  		},

	  		next: function(value) {
	    		var next = new Date(value);
	    		return new Date(next.setMonth(value.getMonth() + 1));
	      	},

	      	label: function(value){

	      		// display year under january.
	      		var firstMonth = months[value.getMonth()];

	      		if(firstMonth === 'Jan' && $(window).width() >= 701) {
	      			return firstMonth + ' ' + value.getFullYear();
	      		}

	        	return months[value.getMonth()];
	      	},

	      	format: function(tickContainer, tickStart, tickEnd){
	        	tickContainer.addClass('month-label');
	        	var tickMonth = tickStart.getMonth();

	        	// add class to January because we display year too.
	        	var jan = months[tickMonth];
	        	if(jan === 'Jan') {
	        		tickContainer.addClass('first');
	        	}
	      	}
		}]
	});

	if($(window).width() >= 700) {
		this.addYearLabel();
	}

	// trigger a change so the slider handles display the month name
	this.valuesChanged(this.minMonth, this.maxMonth);

	setTimeout(function() {
		_this.fixWidth();
		if($(window).width() >= 700) {
			_this.sizeHandle();
		}
	}, 10);
}

DatePicker.prototype.addYearLabel = function() {
	$('.first').css({
		'line-height': 1.27,
		'marginTop': -7 + 'px',
		'position': 'relative',
		'top': 8 + 'px',
		'height': 42 + 'px'
	})
	.find('.ui-ruler-tick-label').css({
		display: 'inline-block',
		width: 84 + '%'
	});
};

DatePicker.prototype.sizeHandle = function() {
	var monthWidth = $($('.ui-ruler-tick-inner')[0]).outerWidth();
	$('.ui-rangeSlider-handle').css('width', monthWidth + 'px');
};

DatePicker.prototype.valuesChanged = function(startMonth, endMonth) {
	var rHandle = $('.ui-rangeSlider-rightHandle');
	var lHandle = $('.ui-rangeSlider-leftHandle');

	var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];

	// set initial values, dynamic based on date
	rHandle.text(months[this.maxMonth - 1]);
	lHandle.text(months[this.minMonth]);

	$('#date-range-slider').trigger

	// update slider as it's being dragged
	$('#date-range-slider').on("valuesChanging", function(e, data){
		var minMonth = new Date(data.values.min);
		var maxMonth = new Date(data.values.max);

		maxMonth.setDate(maxMonth.getDate() - 1);
		minMonth.setDate(minMonth.getDate());
		var maxMonthAbbr = months[maxMonth.getMonth()];
		var minMonthAbbr = months[minMonth.getMonth()];
	  	rHandle.text(maxMonthAbbr);
	  	lHandle.text(minMonthAbbr);
	});

	// update slider after page refresh
	$('#date-range-slider').on("valuesChanged", function(e, data){
		var minMonth = new Date(data.values.min);
		var maxMonth = new Date(data.values.max);

		maxMonth.setDate(maxMonth.getDate() - 1);
		minMonth.setDate(minMonth.getDate());
		var maxMonthAbbr = months[maxMonth.getMonth()];
		var minMonthAbbr = months[minMonth.getMonth()];

	  	rHandle.text(maxMonthAbbr);
	  	lHandle.text(minMonthAbbr);
	});
};

DatePicker.prototype.fixWidth = function() {
	var containerWidth = $('.ui-rangeSlider-container').width();
	$('.ui-rangeSlider-innerBar').css('width', containerWidth + 'px');

};
