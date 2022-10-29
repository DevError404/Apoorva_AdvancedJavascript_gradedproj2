function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var creds = [];
	$.getJSON("../data/Creds.json", function (data) {
		$.each(data.credentials, function (key, value) {
			creds.push(value);
		});
		$.each(creds, function (key, value) {
			if (value.username == username && value.password == password) {
				window.location.href = "../pages/resume.html";
			}
		});
	});
}
