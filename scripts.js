var map;
var markers = [];
var infowindow;


function initMap() {
	var moscow = {lat: 55.7558, lng: 37.6173};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: moscow
	});

	$.getJSON(Flask.url_for("initMap"), function(data){
		update(data);
	});
}


function update(data) {

	//var contentString;
	infowindow = new google.maps.InfoWindow();

	for (var i = 0; i < data.length; i++) {
		var gps  = {
			lat: parseFloat(data[i]["image_lat"]),
			lng: parseFloat(data[i]["image_lon"]) //,
			// img_name: String(data[i]["image_key"]),
			// username: String(data[i]["username"]),
			// desc: String(data[i]["description"]),
			// thumb: "<img src=\"/static/thumbnails/" + String(data[i]["username"]) + "/" +
			// 	String(data[i]["image_key"]).replace(".", ".thumbnail.") + "\" />" ,
		};
		markers.push(gps);
	}

	for (var i = 0; i < markers.length; i++) {
		var marker = new google.maps.Marker({
	    	position: {lat: markers[i]["lat"], lng: markers[i]["lng"]},
	    	// contentString: markers[i]["contentString"],
	    	// title:  markers[i]["img_name"],
	    	// thumbnail: markers[i]["thumb"],
	    	// desc: markers[i]["desc"],
	    	map: map
		});

	console.log(markers)
	// event listener for clicks on markers
    	google.maps.event.addListener(marker, 'click', function () {
    		//infowindow.setContent("<div>" + "<img src=\"static/ajax-loader.gif\" />" + "</div>");

        	infowindow.setContent('<div id="content">' + this.title + '</div>');

        	// opens infowindow; infowindow is a global variable and only one will be open at any one time

        	var detail = document.getElementById("detail");
        	var content = '<div class="outer"><div class="inner"><div class="content">' +
        	'<table class="table"><thead><tr><th>' +
        	'<h3>' + this.title + '</h3>' +
        	'</th></tr></thead>' +
        	'<tbody><tr><td align="center">' +
        	this.thumbnail +
        	'</td></tr><tr><td>' +
        	'<p>' + this.desc + '</p>' +
        	//'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
        	//'<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
        	'</td>' +
        	'<td><button type="submit" class="btn btn-primary btn-xs" id="edit" name="edit" value="ed_button">Edit</button></td>' +
        	'</tr></tbody>' +
        	'</table>' +
        	'</div></div></div>';


			detail.innerHTML = content;

	    	infowindow.open(map, this);

    	});
    	// another event listener if user clicks on map - also closes window
    	google.maps.event.addListener(map, 'click', function () {
    		content = '<div id="content"></div>';
			detail.innerHTML = content;
        	infowindow.close();
		});
	}
	return markers;
}

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
    // CSS classes for navigation arrows

document.getElementById("edit").addEventListener("click", function() {
        $("#main_window").load(Flask.url_for("hist"));
    });
});