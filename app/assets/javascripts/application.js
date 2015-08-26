// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function switchOnOff(i,hue,sat,bri) {
	drawLamp(i,hue,sat,bri);
	changeUrl = "/lights/" + parseInt(i) + "/switchOnOff"
	$.ajax({
		url: changeUrl,
		type: 'GET'
	});
}
//Converts to color HSB object (code from here http://www.csgnetwork.com/csgcolorsel4.html with some improvements)
function rgb2hsb(r, g, b){    
	r /= 255; g /= 255; b /= 255; // Scale to unity.   
	var minVal = Math.min(r, g, b),
	maxVal = Math.max(r, g, b),
	delta = maxVal - minVal,
	HSB = {hue:0, sat:0, bri:maxVal},
	del_R, del_G, del_B;

	if( delta !== 0 ){
		HSB.sat = delta / maxVal;
		del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
		del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
		del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

		if (r === maxVal) {HSB.hue = del_B - del_G;}
		else if (g === maxVal) {HSB.hue = (1 / 3) + del_R - del_B;}
		else if (b === maxVal) {HSB.hue = (2 / 3) + del_G - del_R;}

		if (HSB.hue < 0) {HSB.hue += 1;}		
		if (HSB.hue > 1) {HSB.hue -= 1;}
	}

	HSB.hue *= 65535;
	HSB.sat *= 254;
	HSB.bri *= 254;

	return HSB;
}

function setSliders(id) {
	var canvas = document.getElementById("color_shower_" + id);
	var ctx = canvas.getContext("2d");
	var imgd = ctx.getImageData(7,7,1,1);
	var r = imgd.data[0];
	var g = imgd.data[1];
	var b = imgd.data[2];
	var HSB = rgb2hsb(r,g,b);
	var hueSlider = document.getElementById("hue_range");
	var hueText = document.getElementById("hue_text");
	hueSlider.value = Math.round(HSB.hue);
	hueText.value = Math.round(HSB.hue);
	var satSlider = document.getElementById("sat_range");
	var satText = document.getElementById("sat_text");
	satSlider.value = Math.round(HSB.sat);
	satText.value = Math.round(HSB.sat);
	var briSlider = document.getElementById("bri_range");
	var briText = document.getElementById("bri_text");
	briSlider.value = Math.round(HSB.bri);
	briText.value = Math.round(HSB.bri);

}