var createCarTableSQL = "CREATE TABLE IF NOT EXISTS tblCar (PK_fldName TEXT PRIMARY KEY, fldRego TEXT, fldMake TEXT, fldModel TEXT, fldTransmission TEXT, fldPower TEXT);";
var insertCarSQL = "INSERT into tblCar (PK_fldName, fldRego, fldMake, fldModel, fldTransmission, fldPower) VALUES (?,?,?,?,?,?);";
var showCarSQL = "SELECT * FROM tblCar;";
var deleteCarSQL = "DELETE from tblCar WHERE PK_fldName=?;";
var deleteAllCarSQL = "DELETE from tblCar;";
var findRecordCarSQL = "SELECT * FROM tblCar WHERE PK_fldName=?;";
var updateRecordCarSQL = "UPDATE tblCar SET fldRego=?, fldMake=?, fldModel=?, fldTransmission=?, fldPower=? WHERE PK_fldName=?;";

var createSupTableSQL = "CREATE TABLE IF NOT EXISTS tblSup (PK_fldLicense TEXT PRIMARY KEY, fldFirst TEXT, fldLast TEXT, fldPhone TEXT, fldDate DATE, fldSig TEXT);";
var insertSupSQL = "INSERT into tblSup (PK_fldLicense, fldFirst, fldLast, fldPhone, fldDate, fldSig) VALUES (?,?,?,?,?,?);";
var showSupSQL = "SELECT * FROM tblSup;";
var deleteSupSQL = "DELETE from tblSup WHERE PK_fldLicense=?;";
var deleteAllSupSQL = "DELETE from tblSup;";
var findRecordSupSQL = "SELECT * FROM tblSup WHERE PK_fldLicense = ?;";
var updateRecordSupSQL = "UPDATE tblSup SET fldFirst=?, fldLast=?, fldPhone=?, fldDate=?, fldSig=? WHERE PK_fldLicense=?;";

var createLearnerTableSQL = "CREATE TABLE IF NOT EXISTS tblLearner (PK_fldPermitNo TEXT PRIMARY KEY, fldFirst TEXT, fldLast TEXT, fldPhone TEXT, fldBirthday DATE, fldPermit DATE);";
var insertLearnerSQL = "INSERT into tblLearner (PK_fldPermitNo, fldFirst, fldLast, fldPhone, fldBirthday, fldPermit) VALUES (?,?,?,?,?,?);";
var showLearnerSQL = "SELECT * FROM tblLearner;";
var deleteLearnerSQL = "DELETE from tblLearner WHERE PK_fldPermitNo=?;";
var deleteAllLearnerSQL = "DELETE from tblLearner;";
var findRecordLearnerSQL = "SELECT * FROM tblLearner WHERE PK_fldPermitNo = ?;";
var updateRecordLearnerSQL = "UPDATE tblLearner SET fldFirst=?, fldLast=?, fldPhone=?, fldBirthday=?, fldPermit=? WHERE PK_fldPermitNo=?;";

var db = null;

$(document).ready(function(e) {
	
    document.addEventListener("deviceready", onDeviceReady(), false);
	
	db.transaction(function (trans){
		trans.executeSql(showLearnerSQL, [], function(trans, result){
			if(result.rows.length == 0)
			{
				$("#edit").hide();
				$("#found1").hide();
				$("#found2").hide();
				$("#found3").hide();
				$("#found4").hide();
			}
			else
			{
				$("#enter").hide();
				$("#edit").show();
				$("#found1").show();
				$("#found2").show();
				$("#found3").show();
				$("#found4").show();
			}
		});
	});
	
	$("#saveDriver").on('click', function(){
		db.transaction(function (trans){
		  trans.executeSql(showLearnerSQL, [], function(trans, result){
			if(result.rows.length == 0)
			{
				addLearnerRecord();
			}
			else
			{
				saveLearnerRecord();
			}
		  });
		});
		saveLearnerRecord();	
	});
	
	$("#saveCar").on('click', function(){
		addCarRecord();
	});
	
});

var onDeviceReady = function(){
	try{
		// test to see if web app supposrts databases
		if(!window.openDatabase)
			alert("This device does NOT support databases");
		else
		{
			var shortName = "Logbook";
			var version = "";
			var displayName = "Learner Driver Logbook";
			var maxSize = 1000;
			
			db = window.openDatabase(shortName, version, displayName, maxSize);
			console.log("Opened database");
			db.transaction(populateDB, onError);
		}	
	}
	catch(err)
	{
		alert("Error: " + err);
	}
};

var populateDB = function(){
	db.transaction(function (trans){
		// create car table
		trans.executeSql(createCarTableSQL, []);
		console.log("Created car table");
		// create supervisor table
		trans.executeSql(createSupTableSQL, []);
		console.log("Created supervisor table");
		// create learner table
		trans.executeSql(createLearnerTableSQL, []);
		console.log("Created learner table");
	});
};

var addLearnerRecord = function(){
	var check = checkLearnerRecord();
	
	if(check)
	{
		var permit = $("#txtPermit").val();
		var first = $("#txtFirst").val();
		var last = $("#txtLast").val();
		var phone = $("#nmbPhone").val();
		var dob = $("#dtBirth").val();
		var dop = $("#dtPermit").val();
		
		db.transaction(function(trans){
			trans.executeSql(insertLearnerSQL, [permit, first, last, phone, dob, dop], onError);
		});
		$("#msgLD").html("Learner Driver Information Saved");
		$("#edit").show();
		$("#enter").hide();
		$("#found1").show();
		$("#found2").show();
		$("#found3").show();
		$("#found4").show();
	}
	clearText($("#msgLD"));
	return true;
};

var saveLearnerRecord = function(){
	var check = checkLearnerRecord();
	
	if(check)
	{
		var permit = $("#txtPermit").val();
		var first = $("#txtFirst").val();
		var last = $("#txtLast").val();
		var phone = $("#nmbPhone").val();
		var dob = $("#dtBirth").val();
		var dop = $("#dtPermit").val();
			
		db.transaction(function (trans){
			trans.executeSql(updateRecordLearnerSQL, [first, last, phone, dob, dop, permit], onError);
		});	
		$("#msgLD").html("Learner Driver Information Updated");
	}
	clearText($("#msgLD"));
	return true; 
};

var loadLearnerRecord = function(){
	db.transaction(function (trans){
		trans.executeSql(showLearnerSQL, [], function(trans, result){
			var row = result.rows.item(0);
			$("#txtPermit").val(row['PK_fldPermitNo']);
			$("#txtFirst").val(row['fldFirst']);
			$("#txtLast").val(row['fldLast']);
			$("#nmbPhone").val(row['fldPhone']);
			$("#dtBirth").val(row['fldBirthday']);
			$("#dtPermit").val(row['fldPermit']);
			$("#txtPermit").textinput('disable');
		});
	});
};

var checkLearnerRecord = function(){
	var permit = $("#txtPermit").val();
	var first = $("#txtFirst").val();
	var last = $("#txtLast").val();
	var phone = $("#nmbPhone").val();
	var dob = $("#dtBirth").val();
	var dop = $("#dtPermit").val();
	
	if(permit == "")
	{
		$("#msgLD").html("<em>You must enter a permit number</em>");
		clearText($("#msgLD"));
		$("#txtPermit").focus();
		return false;
	}
	else if(first == "")
	{
		$("#msgLD").html("<em>You must enter a first name</em>");
		clearText($("#msgLD"));
		$("#txtFirst").focus();
		return false;
	} 
	else if(last == "")
	{
		$("#msgLD").html("<em>You must enter a last name</em>");
		clearText($("#msgLD"));
		$("#txtLast").focus();
		return false;
	}
	else if(phone == "")
	{
		$("#msgLD").html("<em>You must enter a phone number</em>");
		clearText($("#msgLD"));
		$("#nmbPhone").focus();
		return false;
	}
	else if(dob == "")
	{
		$("#msgLD").html("<em>You must enter a birthday</em>");
		clearText($("#msgLD"));
		return false;
	}
	else if(dop == "")
	{
		$("#msgLD").html("<em>You must enter a permit date</em>");
		clearText($("#msgLD"));
		return false;
	}
	else
		return true;
};

var addCarRecord = function(){
	var check = checkCarRecord();
	
	if(check)
	{
		var name = $("#txtCName").val();
		var rego = $("#txtRego").val();
		var make = $("#txtMake").val();
		var model = $("#txtModel").val();
		var transmission = $("#radTrans:checked").val();
		var power = $("#txtPower").val();
		
		db.transaction(function(trans){
			trans.executeSql(insertCarSQL, [name, rego, make, model, transmission, power], onError);
		});
		$("#msgC").html("Car Information Saved");
	}
	clearText($("#msgC"));
	$("#txtCName").val("");
	$("#txtRego").val("");
	$("#txtMake").val("");
	$("#txtModel").val("");
	$("#radMan").attr('checked', true);
	$("#radTrans").checkboxradio('refresh');
	$("#txtPower").val("");
	return true;
};

var checkCarRecord = function(){
	var name = $("#txtCName").val();
	var rego = $("#txtRego").val();
	var make = $("#txtMake").val();
	var model = $("#txtModel").val();
	var power = $("#txtPower").val();
	
	var found = false;
	db.transaction(function(trans){
		trans.executeSql(findRecordCarSQL, [name], function(trans, result){
			if(result.rows.length != 0)
				found = true;
		});
	});
	
	if(name == "")
	{
		$("#msgC").html("<em>You must enter a car name</em>");
		clearText($("#msgC"));
		$("#txtName").focus();
		return false;
	}
	else if(found)
	{
		$("#msgC").html("<em>Car name is already in database</em>");
		clearText($("#msgC"));
		$("#txtName").focus();
	}
	else if(rego == "")
	{
		$("#msgC").html("<em>You must enter a rego number</em>");
		clearText($("#msgC"));
		$("#txtRego").focus();
		return false;
	} 
	else if(make == "")
	{
		$("#msgC").html("<em>You must enter a make</em>");
		clearText($("#msgC"));
		$("#txtMake").focus();
		return false;
	}
	else if(model == "")
	{
		$("#msgLD").html("<em>You must enter a model</em>");
		clearText($("#msgC"));
		$("#txtModel").focus();
		return false;
	}
	else if(power == "")
	{
		$("#msgC").html("<em>You must enter the power</em>");
		clearText($("#msgC"));
		$("#txtPower").focus();
		return false;
	}
	else
		return true;
};

var deletePlayerRecord = function(id){
	console.log(id);
	// check to see if player has games in the database
	db.transaction(function (trans){
		trans.executeSql(findPlayerGamesSQL, [id], function(trans, result){
			console.log("Here " + result.rows.length);
			var str = "";
			// if there are no records then confirm deleting the player
			
			
			// -------------------------------------------------------------------------
			
			
		}); // end of executeSql
	}); // end of transaction
};

// this permanently deletes ALL records from the database
var deleteAllPlayerRecords = function(){

	var q = confirm("Do you wish to delete ALL records?");
	
	if(q)
	{
		db.transaction(function(trans){
			trans.executeSql(deleteAllPlayerSQL, [], showPlayerRecords, onError);
		});
		
		$("#msg").html("ALL records deleted");
		clearText();
		return true;
	}
	else
	{
		$("#msg").html("ALL records NOT deleted");
		clearText();
		return false;
	}
};

var loadPlayers = function(){

	// get all the players from the database
	db.transaction(function (trans){
		trans.executeSql(showPlayerSQL, [], function(trans, result){
			
			var str = "";
			
			if( result.rows.length == 0 )
			{
				str += "<option value='none'>There are no players to display</option>";
				console.log("There are no players to get");
			}
			else
			{
				var noOfRecs = result.rows.length;
				
				/*<option value="option1">Option 1</option>*/
				str += "<option value='none'>Select a player...</option>";
				for(var i = 0 ; i < noOfRecs ; i++)
				{
					var row = result.rows.item(i);
					
					//str += "<option value='" + row['PK_fldId'] + "' onClick='displayPlayerGames('" + row['PK_fldId'] + "');>";
					str += "<option value='" + row['PK_fldId'] + "'>";
					str += row['fldFirstname'] + " " + row['fldLastname'] + "</option>";
				}
			} // end of if
			console.log(str);
			// put players in the select box
			$("#selPlayers").html(str);
			$("#selPlayers").selectmenu("refresh", true);
		}); // end of executeSql
	}); // end of transaction	
};

// function onError(err)
onError = function(err)
{
	var str = "";
	
	switch(err.code)
	{
		case	0:  str += "Non database error: " + err.message;
					break;
		case	1:	str += "Some database error: " + err.message;
					break;
		case	2:	str += "Wrong database version: " + err.message;
					break;
		case	3:	str += "Data set too large to return from query: " + err.message;
					break;
		case	4: 	str += "Storage limit exceeded: " + err.message;
					break;
		case	5:	str += "Lock contension error: " + err.message;
					break;
		case	6:	str += "Constraint failure: " + err.message;
					break;
		default	:	str += "Error: " + err.code + " " + err.message;
					break;
	}
	console.log(str);
}

// this clears out messages to the user
var clearText = function(msg)
{
	setTimeout( function(){ msg.html(""); }, 1000);
}