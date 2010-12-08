
// Database test
function WebDatabase() {
	//DB instance
	this.viewPage = ViewPage;
	this.html5Db = null;
}

WebDatabase.prototype.openCreateDb = function() 
{
	var name = document.getElementById("input_webdatabase_init_openCreate_name").value;
	var version = document.getElementById("input_webdatabase_init_openCreate_version").value;
	var displayName = document.getElementById("input_webdatabase_init_openCreate_displayName").value;
	var maxSize = +(document.getElementById("input_webdatabase_init_openCreate_maxSize").value);
	try {
		this.html5Db = openDatabase(name, version, displayName, maxSize);
	} catch(e) {
		var message = "ERROR: Open/Create database" ;
		this.viewPage.testError(message, "td_webdatabase_init_currentDb_name");
		return;
	}
	this.viewPage.testSuccess(name, "td_webdatabase_init_currentDb_name");
	this.viewPage.testSuccess(this.html5Db.version, "td_webdatabase_init_currentDb_version");
}
	
//End of WebDatabase
