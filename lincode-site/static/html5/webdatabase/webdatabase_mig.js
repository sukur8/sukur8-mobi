

// Database test
var WebDatabaseMig = {
	
	html5Db : null,
	
	// Open or create database
	initAndMigrateDb: function() {
		
		var name = "migrite_" + ((new Date()).getTime());
		// empty version string means "I don't care what version the db is"
		html5Db = openDatabase(name, "", "Example Database", 100000);

	    var M = new Migrator(html5Db);
	    M.setDebugLevel(Migrator.DEBUG_HIGH);
	    
	    M.migration(1, function(t){
	        t.executeSql("create table user(id integer primary key, name text)");
	        t.executeSql("insert into user(name) values(?)", [WebDatabaseMig.USER_1]);
	    });
	    M.migration(2, function(t){
	        t.executeSql("alter table user add column phone text");
	        t.executeSql("update user set phone = ? where name == ?",[WebDatabaseMig.PHONE_1, WebDatabaseMig.USER_1]);
	    });
	    M.migration(3, function(t){
	        t.executeSql("insert into user(name, phone) values(?, ?)",[WebDatabaseMig.USER_2, WebDatabaseMig.PHONE_2]);
	    });

	    // This executes the applicable transactions
	    M.execute();
	 
	    M.whenDone(function(){
			html5Db.transaction(
					function(t){
						 t.executeSql("select id, name, phone from user order by id", [], 
								 function(pTransaction, pResults){
									var result = false; 
									var rows = pResults.rows;
									var row = rows.item(0);
									if (row["name"] == WebDatabaseMig.USER_1 &&
										row["phone"] == WebDatabaseMig.PHONE_1)
										result = true;
									row = rows.item(1);
									if (row["name"] == WebDatabaseMig.USER_2 &&
										row["phone"] == WebDatabaseMig.PHONE_2)
										result = true;
									if( result ){
										var message = "Success";	
										ViewPage.testSuccess( message, ViewPage.ID_MIGRITE);
								    }else{
								    	var message = "Error";
								    	ViewPage.testError( message, ViewPage.ID_MIGRITE);
									}
									
								 },
								 function(pTransaction, pError){
										var message = "Error:"+pError.message+ "(Code "+pError.code+")";
										ViewPage.testError(message, ViewPage.ID_MIGRITE);	
								}
						 );
					},
					function(pError){
						alert("Error :" + pError);
					});
	    });

	},
}


WebDatabaseMig.USER_1 = "max";
WebDatabaseMig.PHONE_1 = "555-5555";
WebDatabaseMig.USER_2 = "jeremy";
WebDatabaseMig.PHONE_2 = "555-1234";

// End of WebDatabaseMig
