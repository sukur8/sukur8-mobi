
function WebDatabaseForeignKey(webDatabase){
	this.html5Db = webDatabase.html5Db;
	this.viewPage = ViewPage;
}

//Start the test
WebDatabaseForeignKey.prototype.startTest = function()
{
	this.testForeignKey();
	
	this.testTriggerInsert();
	this.testTriggerUpdate();
	this.testTriggerDelete();
}

WebDatabaseForeignKey.prototype.createForeignKeyTable = function()
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("DROP TABLE IF EXISTS artist;");
				pTransaction.executeSql("CREATE TABLE artist ("
						+ "artistid INTEGER PRIMARY KEY, "
						+ "artistname TEXT); "						
				);
				pTransaction.executeSql("insert into artist (artistid, artistname) values (?, ?);",
						[1 , "Lin" ]
				);
				pTransaction.executeSql("insert into artist (artistid, artistname) values (?, ?);",
						[2 , "Stephane" ]
				);	
				
				pTransaction.executeSql("DROP TABLE IF EXISTS track;");
				pTransaction.executeSql("CREATE TABLE track ("
						+ "trackid     INTEGER,  "
						+ "trackname   TEXT, " 
						+ "trackartist INTEGER, "
						+ "FOREIGN KEY(trackartist) REFERENCES artist(artistid)); "						
				);
				
			}.bind(this),
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_FOREIGN_KEY);
				}else{
					var message = "Error: prepare foreign key:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_FOREIGN_KEY);
				}
			}.bind(this),
			function(){
				var message = "Success: add foreign key:" ;
				this.viewPage.testSuccess(message, this.viewPage.ID_FOREIGN_KEY);
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.testForeignKey = function(){

	this.html5Db.transaction(
			function(pTransaction){				
				pTransaction.executeSql("insert into track (trackid, trackname, trackartist) values (?, ?, ?);",
							[12 , "That's Error ", 3 ]
				);				

			},
			function(pError){
				var message = "Success:forgeignkey msg:" + pError.message;
				this.viewPage.testSuccess(message, this.viewPage.ID_FOREIGN_KEY);	
			}.bind(this), 
			function(){
				this.html5Db.transaction(
					function(pTransaction){				
						pTransaction.executeSql("SELECT * FROM track; ",[],
							 function(pTransaction, pResults) {
							 	var count = pResults.rows.length;			
								if (count == 1){
									var message = "Error: foreignKey no effect." ;
									this.viewPage.testError(message, this.viewPage.ID_FOREIGN_KEY);
								}else{
									var message = "Success: forgeignkey constraint";
									this.viewPage.testSuccess(message, this.viewPage.ID_FOREIGN_KEY);
								}
							 }.bind(this)
						);				
					}.bind(this)
				);
			}.bind(this)
	);
}


WebDatabaseForeignKey.prototype.createTriggerTable = function()
{
	this.html5Db.transaction(
			function (pTransaction) {				
				pTransaction.executeSql("DROP TABLE IF EXISTS foo;");
				pTransaction.executeSql("CREATE TABLE foo ("
						+ "id INTEGER NOT NULL PRIMARY KEY);"				
				);
			
				pTransaction.executeSql("DROP TABLE IF EXISTS bar;");
				pTransaction.executeSql("CREATE TABLE bar ("
						+ "id INTEGER NOT NULL PRIMARY KEY, " 
						+ "foo_id INTEGER NOT NULL "
						+ "CONSTRAINT fk_foo_id REFERENCES foo(id) ON DELETE CASCADE);"				
				);	
				pTransaction.executeSql("insert into foo (id) values (?);", [1]);
				pTransaction.executeSql("insert into foo (id) values (?);", [2]);
				pTransaction.executeSql("insert into bar (id, foo_id) values (?, ?);", [11, 1]);
				pTransaction.executeSql("insert into bar (id, foo_id) values (?, ?);", [12, 2]);
				
				var query =   "CREATE TRIGGER fki_bar_foo_id "
							 + "BEFORE INSERT ON bar "
							 + "FOR EACH ROW BEGIN "
							 + 		"SELECT RAISE(ROLLBACK, 'insert on table \"bar\" violates foreign key constraint \"fk_foo_id\"') "
							 + 		"WHERE (SELECT id FROM foo WHERE id = NEW.foo_id) IS NULL; "
							 + "END;";
				pTransaction.executeSql( query, [],
						function(pTransaction, pResults){
							var message = "Success add Trigger insert:" ;
							this.viewPage.testSuccess(message, this.viewPage.ID_TRIGGER_INSERT);
						}.bind(this),
						function(pTrasaction, pError){
							var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
							this.viewPage.testError(message, this.viewPage.ID_TRIGGER_INSERT);
						}.bind(this)
				);
				
				query =   "CREATE TRIGGER fku_bar_foo_id "
						+ "BEFORE UPDATE ON bar " 
						+ "FOR EACH ROW BEGIN "
						+ "		SELECT RAISE(ROLLBACK, 'update on table \"bar\" violates foreign key constraint \"fk_foo_id\"') "
						+ "		WHERE(SELECT id FROM foo WHERE id = NEW.foo_id) IS NULL; "
						+ "END;";
				pTransaction.executeSql( query, [],
						function(pTransaction, pResults){
							var message = "Success add Trigger update:" ;
							this.viewPage.testSuccess(message, this.viewPage.ID_TRIGGER_UPDATE);
						}.bind(this),
						function(pTrasaction, pError){
							var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
							this.viewPage.testError(message, this.viewPage.ID_TRIGGER_UPDATE);
						}.bind(this)
				);
				
				
				query =   "CREATE TRIGGER fkd_bar_foo_id "
						+ "BEFORE DELETE ON foo "
						+ "FOR EACH ROW BEGIN "
				        + "		SELECT RAISE(ROLLBACK, 'delete on table \"foo\" violates foreign key constraint \"fk_foo_id\"') "
				        + "		WHERE (SELECT foo_id FROM bar WHERE foo_id = OLD.id) IS NOT NULL;"
				        + "END;"; 
				pTransaction.executeSql( query, [],
					function(pTransaction, pResults){
						var message = "Success add Trigger delete:" ;
						this.viewPage.testSuccess(message, this.viewPage.ID_TRIGGER_DELETE);
					}.bind(this),
					function(pTrasaction, pError){
						var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
						this.viewPage.testError(message, this.viewPage.ID_TRIGGER_DELETE);
					}.bind(this)
				);
				
				
			}.bind(this),
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_TRIGGER_INSERT);
				}else{
					var message = "Error prepare trigger:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_TRIGGER_INSERT);
				}
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.testTriggerInsert = function()
{
	var countBefore = -1;
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select * from bar;", [], 
					function(pTransaction, pResults) {
						countBefore = pResults.rows.length;
					}.bind(this)
				);
			}.bind(this)
	);
	
	this.html5Db.transaction(
			function (pTransaction) {
				// foot_id = 10 cann't be found on table foo
				pTransaction.executeSql("insert into bar (id , foo_id) values (?, ?);",
						[0 , 10]
				);
			},
			function(pError){
				this.checkTriggerInsertResult(countBefore);
			}.bind(this), 
			function(){
				this.checkTriggerInsertResult(countBefore);
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.checkTriggerInsertResult = function(countBefore)
{
	this.html5Db.transaction(
			function(pTransaction){				
				pTransaction.executeSql("select * from bar; ",[],
					 function(pTransaction, pResults) {
					 	var countCurrent = pResults.rows.length;			
					 	if (countCurrent == 1 + countBefore){
							var message = "Error check: trigger insert no effect." ;
							this.viewPage.testError(message, this.viewPage.ID_TRIGGER_INSERT);
						}else if (countCurrent == countBefore){
							var message = "Success check:trigger insert constraint.";
							this.viewPage.testSuccess(message, this.viewPage.ID_TRIGGER_INSERT);
						}
					 }.bind(this)
				);
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.testTriggerUpdate = function()
{
	var countBefore = -1;
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select * from bar;", [], 
					function(pTransaction, pResults) {
						countBefore = pResults.rows.length;
					}.bind(this)
				);
			}.bind(this)
	);
	
	this.html5Db.transaction(
			function (pTransaction) {
				//foot_id = 21 cann't be found on table foo
				pTransaction.executeSql("update bar set foo_id = ? where id = 11;",
						[21]
				);
			},
			function(pError){
				this.checkTriggerUpdateResult(countBefore, 11);
			}.bind(this), 
			function(){
				this.checkTriggerUpdateResult(countBefore, 11);
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.checkTriggerUpdateResult = function(countBefore, id)
{
	this.html5Db.transaction(
			function(pTransaction){				
				pTransaction.executeSql("select * from bar where id = ?; ",[id],
					 function(pTransaction, pResults) {
					 	var bar = pResults.rows.item(0);			
					 	if (bar.foo_id == 21){
							var message = "Error check: trigger update no effect." ;
							this.viewPage.testError(message, this.viewPage.ID_TRIGGER_UPDATE);
						}else if (bar.foo_id == 1){
							var message = "Success check:trigger update constraint.";
							this.viewPage.testSuccess(message, this.viewPage.ID_TRIGGER_UPDATE);
						}
					 }.bind(this)
				);
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.testTriggerDelete = function()
{	
	this.html5Db.transaction(
			function (pTransaction) {
				// foo whose id = 2 is associated with bar.id = 12
				pTransaction.executeSql("delete from foo where id = 2;", []
				);
			},
			function(pError){
				this.checkTriggerDelete(2);
			}.bind(this), 
			function(){
				this.checkTriggerDelete(2);
			}.bind(this)
	);
}

WebDatabaseForeignKey.prototype.checkTriggerDelete = function(id)
{
	this.html5Db.transaction(
			function(pTransaction){				
				pTransaction.executeSql("select * from foo where id = ?; ", [2],
					 function(pTransaction, pResults) {
					 	var length = pResults.rows.length;			
					 	if (length <= 0){
							var message = "Error check: trigger delete no effect." ;
							this.viewPage.testError(message, this.viewPage.ID_TRIGGER_DELETE);
						}else {
							var bar = pResults.rows.item(0);
							if( bar.id == id){
								var message = "Success check:trigger delete constraint.";
								this.viewPage.testSuccess(message, this.viewPage.ID_TRIGGER_DELETE);
							}
						}
					 }.bind(this)
				);
			}.bind(this)
	);
}

