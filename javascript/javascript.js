// JavaScript Document
$(document).ready(function(e){
	
	$("#edit").hide(); //link to edit driver rather than enter a new one, only one driver allowed in app
	
	var circleLoad = false; //circle progress bar has not been loaded yet
	
	//when to show circle progress bar
	$(document).on("pagecontainershow", function() {
		var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
    	var activePageId = activePage[0].id;

    	if( activePageId == "page5" && !circleLoad ) {
    	  circleBar();
		  nightBar();
		  circleLoad = true;
		}
	});
	
	//function for circle progress bar
	function circleBar() {
    var n, id, progress;
    progress = new CircularProgress({
      radius: 50,
      strokeStyle: 'green',
      lineCap: 'square',
      lineJoin: 'round',
      lineWidth: 5,
      shadowBlur: 0,
      shadowColor: 'yellow',
      text: {
        font: 'bold 15px arial',
        shadowBlur: 0
      },
      initial: {
        strokeStyle: 'white',
        lineCap: 'square',
        lineJoin: 'round',
        lineWidth: 5,
        shadowBlur: 10,
        shadowColor: 'black'
      }
    });

    document.getElementById("totalProgress").appendChild(progress.el);
    n = 0;
    id = setInterval(function () {
      if (n == 65) clearInterval(id);
      progress.update(n++);
    }, 30);
  }
  
  //function for night circle progress bar
  function nightBar() {
    var n, id, progress;
    progress = new CircularProgress({
      radius: 50,
      strokeStyle: 'blue',
      lineCap: 'square',
      lineJoin: 'round',
      lineWidth: 5,
      shadowBlur: 0,
      shadowColor: 'yellow',
      text: {
        font: 'bold 15px arial',
        shadowBlur: 0
      },
      initial: {
        strokeStyle: 'white',
        lineCap: 'square',
        lineJoin: 'round',
        lineWidth: 5,
        shadowBlur: 10,
        shadowColor: 'black'
      }
    });

    document.getElementById("nightProgress").appendChild(progress.el);
    n = 0;
    id = setInterval(function () {
      if (n == 40) clearInterval(id);
      progress.update(n++);
    }, 30);
  }
	
	//example array of logbook entries
    var logbooks = [
        { "Car": 0, "Driver": 0, "Start Odometer": 10000, "End Odometer": 10050, "Start Date": "5/5/18", "End Date": "5/5/18", "Start Time": "5:00", "End Time": "7:00", "Night Hours": 2, "Parking": true, "Traffic": 1, "Weather": 0, "Road Type": 4, "Light": 2, "Signature": "Joe Smith" }
    ];
 
 	//building table of logbook entries
    $("#jsGridLogbook").jsGrid({
        width: "100%",
        height: "400px",
 
        inserting: false,
        editing: true,
        sorting: true,
        paging: true,
 
        data: logbooks,
		
		deleteConfirm: "Are you sure you want to delete this logbook entry?",
 
        fields: [
            { name: "Car", type: "select", items: ["My Honda"], width: 80, validate: "required" },
            { name: "Driver", type: "select", items: ["Joe Smith"], width: 80, validate: "required" },
            { name: "Start Odometer", type: "number", width: 80, validate: "required" },
			{ name: "End Odometer", type: "number", width: 80, validate: "required" },
			{ name: "Start Date", type: "text", width: 80, editable: false, },
			{ name: "End Date", type: "text", width: 80, editable: false },
			{ name: "Start Time", type: "text", width: 50, editable: false },
			{ name: "End Time", type: "text", width: 50, editable: false },
			{ name: "Night Hours", type: "number", width: 50,  validate: "required"  },
            { name: "Parking", type: "checkbox", title: "Parked", sorting: false,  validate: "required"  },
			{ name: "Traffic", type: "select", items: ["Light", "Moderate", "Heavy"], width: 60, validate: "required" },
			{ name: "Weather", type: "select", items: ["Wet", "Dry"], width: 80, validate: "required" },
			{ name: "Road Type", type: "select", items: ["Local Road", "Main Road", "Inner City", "Freeway", "Rural", "Other Road", "Gravel"], width: 50, validate: "required" },
			{ name: "Light", type: "select", items: ["Day", "Dawn/Dusk", "Night"], width: 60, validate: "required" },
			{ name: "Signature", type: "text", width: 80, validate: "required" },
            { type: "control" }
        ]
    });
	
	//example array of cars
	 var cars = [
        { "Name": "My Honda", "Registration Number": "12345", "Make": "Honda", "Model": "Accord", "Transmission": 1, "Power": "110" }
    ];
	
	//building table of cars
	$("#jsGridCar").jsGrid({
        width: "100%",
        height: "400px",
 
        inserting: false,
        editing: true,
        sorting: true,
        paging: true,
		
		deleteConfirm: "Are you sure you want to delete this car?",
 
        data: cars,
 
        fields: [
            { name: "Name", type: "text", width: 100, validate: "required" },
            { name: "Registration Number", type: "text", width: 100, validate: "required" },
            { name: "Make", type: "text", width: 80, validate: "required" },
            { name: "Model", type: "text", width: 80, validate: "required" },
			{ name: "Transmission", type: "select", items: ["Manual", "Automatic"], width: 130, validate: "required" },
			{ name: "Power", type: "text", width: 70, validate: "required" },
            { type: "control" }
        ]
    });
	
	//example array of drivers
	var drivers = [
        { "First Name": "Joe", "Last Name": "Smith", "Phone": "12345678", "Date": "5/5/18", "Signature": "Joe Smith" }
    ];
	
	//building table of drivers
	$("#jsGridDriver").jsGrid({
        width: "100%",
        height: "400px",
 
        inserting: false,
        editing: true,
        sorting: true,
        paging: true,
		
		deleteConfirm: "Are you sure you want to delete this driver?",
 
        data: drivers,
 
        fields: [
            { name: "First Name", type: "text", width: 80, validate: "required" },
			{ name: "Last Name", type: "text", width: 80, validate: "required" },
            { name: "Phone", type: "text", width: 90, validate: "required" },
            { name: "Date", type: "text", width: 70, editing: false },
			{ name: "Signature", type: "text", width: 100, validate: "required" },
            { type: "control" }
        ]
    });
});