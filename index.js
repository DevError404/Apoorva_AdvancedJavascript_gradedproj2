var currentData = [];
var callOnce = true;
var goBack = false;

function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	console.log(username);
	var creds = [];
	$.getJSON("../Creds.json", function (data) {
		$.each(data.credentials, function (key, value) {
			creds.push(value);
		});
		var valid = false;
		$.each(creds, function (key, value) {
			if (value.username == username && value.password == password) {
				valid = true;
			}
		});
		if (valid) {
			goBack = true;
			window.location.href = "./resume.html";
		} else {
			alert("Invalid username or password");
		}
	});
}

if (callOnce) {
	$(document).ready(function () {
		readJSONData("");
		callOnce = false;
	});
}

function readJSONData(applyFor) {
	applyFor = applyFor.toLowerCase();
	var people = [];
	$.getJSON("../Data.json", function (data) {
		$.each(data.resume, function (i, f) {
			var person = {};
			person.basics = f.basics;
			person.id = f.id;
			person.name = f.basics.name;
			person.AppliedFor = f.basics.AppliedFor;
			person.email = f.basics.email;
			person.phone = f.basics.phone;
			person.location = f.basics.location;
			person.skills = f.skills;
			person.work = f.work;
			person.internship = f.Internship;
			person.projects = f.projects;
			person.education = f.education;
			person.achievements = f.achievements;
			person.interests = f.interests;
			people.push(person);
		});

		var filteredPeople = people.filter(function (person) {
			var personAppliedFor = person.AppliedFor.toLowerCase();
			return personAppliedFor.indexOf(applyFor) > -1;
		});

		if (filteredPeople.length == 0) {
			document.getElementById("error").style.display = "block";
			document.getElementById("mainDiv").style.display = "none";
		} else {
			document.getElementById("mainDiv").style.display = "block";
			document.getElementById("error").style.display = "none";
		}

		var filteredPeopleId = [];
		for (var i = 0; i < filteredPeople.length; i++) {
			filteredPeopleId.push(filteredPeople[i].id);
		}

		currentData = filteredPeople;

		readJSONDataID(filteredPeopleId[0]);
	});
}

function readJSONDataID(id) {
	var people = [];
	$.getJSON("../Data.json", function (data) {
		$.each(data.resume, function (i, f) {
			var person = {};
			person.basics = f.basics;
			person.id = f.id;
			person.name = f.basics.name;
			person.AppliedFor = f.basics.AppliedFor;
			person.email = f.basics.email;
			person.phone = f.basics.phone;
			person.location = f.basics.location;
			person.skills = f.skills;
			person.work = f.work;
			person.internship = f.Internship;
			person.projects = f.projects;
			person.education = f.education;
			person.achievements = f.achievements;
			person.interests = f.interests;
			people.push(person);
		});

		var filteredPeople = people.filter(function (person) {
			var personId = id.toString();
			return person.id == personId;
		});

		displayData(id);
	});
}

function displayData(id) {
	var people = [];
	$.getJSON("../Data.json", function (data) {
		$.each(data.resume, function (i, f) {
			var person = {};
			person.basics = f.basics;
			person.id = f.id;
			person.name = f.basics.name;
			person.AppliedFor = f.basics.AppliedFor;
			person.email = f.basics.email;
			person.phone = f.basics.phone;
			person.location = f.basics.location;
			person.skills = f.skills;
			person.work = f.work;
			person.internship = f.Internship;
			person.projects = f.projects;
			person.education = f.education;
			person.achievements = f.achievements;
			person.interests = f.interests;
			people.push(person);
		});

		var filteredPeople = people.filter(function (person) {
			var personId = id.toString();
			return person.id == personId;
		});

		var previousId = 0;
		var nextId = 0;
		for (var i = 0; i < currentData.length; i++) {
			if (currentData[i].id == id) {
				if (i == 0) {
					previousId = currentData[currentData.length - 1].id;
				} else {
					previousId = currentData[i - 1].id;
				}
				if (i == currentData.length - 1) {
					nextId = currentData[0].id;
				} else {
					nextId = currentData[i + 1].id;
				}
			}
		}

		document.getElementById("previous").innerHTML =
			"<button class='btn btn-primary' onclick='readJSONDataID(" +
			previousId +
			")'>Previous</button>";
		document.getElementById("next").innerHTML =
			"<button class='btn btn-primary' onclick='readJSONDataID(" +
			nextId +
			")'>Next</button>";

		if (currentData.length == 1) {
			document.getElementById("previous").style.visibility = "hidden";
			document.getElementById("next").style.visibility = "hidden";
		} else {
			document.getElementById("previous").style.visibility = "visible";
			document.getElementById("next").style.visibility = "visible";
		}

		var personName = document.getElementById("personName");
		personName.innerHTML = filteredPeople[0].name;

		var personAppliedFor = document.getElementById("personAppliedFor");
		personAppliedFor.innerHTML = filteredPeople[0].AppliedFor;

		var personalInfo = document.getElementById("personalInfo");
		var urlText = filteredPeople[0].basics.profiles.network;
		var url = filteredPeople[0].basics.profiles.url;
		personalInfo.innerHTML =
			"Phone : " +
			filteredPeople[0].phone +
			"<br>" +
			"Email : " +
			filteredPeople[0].email +
			"<br>" +
			"URL : " +
			"<a href=" +
			url +
			">" +
			urlText +
			"</a>";

		var personSkills = document.getElementById("personalSkills");
		var skills = filteredPeople[0].skills.keywords;
		var skillsString = "";
		for (var i = 0; i < skills.length; i++) {
			skillsString += skills[i] + "<br>";
		}
		personSkills.innerHTML = skillsString;

		var personalHobbies = document.getElementById("personalHobbies");
		var hobbies = filteredPeople[0].interests.hobbies;
		var hobbiesString = "";
		for (var i = 0; i < hobbies.length; i++) {
			hobbiesString += hobbies[i] + "<br>";
		}
		personalHobbies.innerHTML = hobbiesString;

		var workExperience = document.getElementById("experience");
		var workExperienceString = "";
		var work = filteredPeople[0].work;
		workExperienceString +=
			"<div><p style='font-size:18' ><b>Company Name: </b>" +
			work["Company Name"] +
			"</p></div>";
		workExperienceString +=
			"<div><p style='font-size:18' ><b>Position: </b>" +
			work["Position"] +
			"</p></div>";
		workExperienceString +=
			"<div><p style='font-size:18' ><b>Start Date: </b>" +
			work["Start Date"] +
			"</p></div>";
		workExperienceString +=
			"<div><p style='font-size:18' ><b>End Date: </b>" +
			work["End Date"] +
			"</p></div>";
		workExperienceString +=
			"<div  style='text-align: justify;'><p style='font-size:18' ><b>Summary: </b>" +
			work["Summary"] +
			"</p></div>";
		workExperience.innerHTML = workExperienceString;

		var projects = document.getElementById("projects");
		var projectsString = "";
		var projectsArray = filteredPeople[0].projects;
		projectsString +=
			"<div style='text-align: justify;'><p style='font-size:18' ><b>" +
			projectsArray.name +
			" : </b>";
		projectsString += projectsArray.description + "</p></div>";
		projects.innerHTML = projectsString;

		var education = document.getElementById("education");
		var educationString = "";
		var educationArray = filteredPeople[0].education;
		var ug = educationArray["UG"];
		var ugString = "";
		for (var key in ug) {
			if (ug.hasOwnProperty(key)) {
				ugString += ug[key] + ", ";
			}
		}
		ugString = ugString.substring(0, ugString.length - 2);
		educationString +=
			"<div><p style='font-size:18' ><b>&#x2022 UG: </b>" +
			ugString +
			"</p></div>";

		var seniorSecondary = educationArray["Senior Secondary"];
		var seniorSecondaryString = "";
		for (var key in seniorSecondary) {
			if (seniorSecondary.hasOwnProperty(key)) {
				seniorSecondaryString += seniorSecondary[key] + ", ";
			}
		}
		seniorSecondaryString = seniorSecondaryString.substring(
			0,
			seniorSecondaryString.length - 2
		);
		educationString +=
			"<div><p style='font-size:18' ><b>&#x2022 PU: </b>" +
			seniorSecondaryString +
			"</p></div>";

		var highSchool = educationArray["High School"];
		var highSchoolString = "";
		for (var key in highSchool) {
			if (highSchool.hasOwnProperty(key)) {
				highSchoolString += highSchool[key] + ", ";
			}
		}
		highSchoolString = highSchoolString.substring(
			0,
			highSchoolString.length - 2
		);
		educationString +=
			"<div><p style='font-size:18' ><b>&#x2022 High School: </b>" +
			highSchoolString +
			"</p></div>";

		education.innerHTML = educationString;

		var internship = document.getElementById("internship");
		var internshipString = "";
		var internshipArray = filteredPeople[0].internship;
		for (var key in internshipArray) {
			if (internshipArray.hasOwnProperty(key)) {
				internshipString +=
					"<div><p style='font-size:18' ><b>&#x2022 " +
					key +
					": </b>" +
					internshipArray[key] +
					"</p></div>";
			}
		}
		internship.innerHTML = internshipString;

		var achievements = document.getElementById("achievements");
		var achievementsString = "";
		var achievementsArray = filteredPeople[0].achievements;
		var achievementsSummary = achievementsArray.Summary;
		for (var i = 0; i < achievementsSummary.length; i++) {
			achievementsString +=
				"<div><p style='font-size:18' >&#x2022 " +
				achievementsSummary[i] +
				"</p></div>";
		}
		achievements.innerHTML = achievementsString;

		return filteredPeople;
	});
}
