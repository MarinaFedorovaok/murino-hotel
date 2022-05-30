var Interval = {
	start: Number.NaN,
	end: Number.NaN,
	toArray: function() {
		if (isNaN(this.start))
			return [];
		if (isNaN(this.end))
			return [this.start];
		var dayLength = 86400000; // 1000*60*60*24
		var out = [];
		for (var today = this.start; today <= this.end; today += dayLength) {
			out.push(today);
		}
		return out; 	
	}
}
function jcalToIntervals(jcal) {
	var intervals = [];
	var vevents = jcal[2];
	for (i in vevents) {
		var veventFields = vevents[i][1];
		var interval = Object.create(Interval);
		// find start and end of the event
		for (j in veventFields) {
			var field = veventFields[j]
			if (field[0] == "dtstart") {
				interval.start = Date.parse(field[3]);
			}
			else if (field[0] == "dtend") {
				interval.end = Date.parse(field[3]);
			}
		}
		console.log(interval);
		intervals.push(interval);
	}
	return intervals;
}

document.addEventListener("DOMContentLoaded", function(event) {
	fetch(
	  calendar_url,
	  {
		method: 'GET',
		headers: { 'Content-Type': 'text/html' },
	  }
	).then(resp => resp.text()).then(function (ical_text) {
		var jcal = ICAL.parse(ical_text);
		var element = document.getElementById("calendar");
		//remove loading gif
		element.innerHTML = '';
		var calendar = jsCalendar.new(element);
		var bookedIntervals = jcalToIntervals(jcal);
		var bookedDates = bookedIntervals.map(x => x.toArray()).flat();
		calendar.select(bookedDates);
	});
});
