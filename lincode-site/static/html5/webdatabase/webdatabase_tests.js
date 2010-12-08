

// Database test
function WebDatabaseTest() {	
	this.webDatabase = new WebDatabase();
}

WebDatabaseTest.prototype.initWebDatabase = function()
{
	this.webDatabase.openCreateDb();
	this.html5Db = this.webDatabase.html5Db;
	
	this.webDatabasePerf = new WebDatabasePerf(this.webDatabase);
	this.webDatabaseSup = new WebDatabaseSup(this.webDatabase);

	this.webDatabasePerf.createPerformanceTable();
	this.webDatabaseSup.createSupportTable();
}

WebDatabaseTest.prototype.testStoreBig = function()
{
	this.webDatabasePerf.storeBig();
}

WebDatabaseTest.prototype.startSupportTest = function(){
	this.webDatabaseSup.startTest();
	WebDatabaseMig.initAndMigrateDb();
}

WebDatabaseTest.prototype.startPerformanceTest = function()
{
	this.webDatabasePerf.startTest();		
}

