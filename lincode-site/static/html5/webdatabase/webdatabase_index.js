
function WebDatabaseIndex(webDatabase){
	this.html5Db = webDatabase.html5Db;
	this.viewPage = ViewPage;
}

//Start the test
WebDatabaseIndex.prototype.startIndexTest = function()
{
	this.testIndex();
}

//Start the test
WebDatabaseIndex.prototype.startNormalTest = function()
{
	this.testNormal();
}

WebDatabaseIndex.prototype.createIndexTable = function()
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("DROP INDEX IF EXISTS idx_index_table ;");
				pTransaction.executeSql("DROP TABLE IF EXISTS index_table ;");
				
				pTransaction.executeSql("CREATE TABLE index_table ("
							+ "id INTEGER PRIMARY KEY, "
							+ "name TEXT, " 
							+ "i_index INTEGER); "						
				);
				
				pTransaction.executeSql("CREATE INDEX idx_index_table ON index_table(i_index);");
				
				for(var i = 0; i < 1000; i++){
					var random = parseInt(Math.random()*10000+1);
					pTransaction.executeSql("insert into index_table (id, name, i_index) values (?, ?, ?);",
						[i , "Lin " + i, random ]
					);
				}								

			}.bind(this),
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_INDEX);
				}else{
					var message = "Error: index:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_INDEX);
				}
			}.bind(this),
			function(){
				var message = "Success: add index:" ;
				this.viewPage.testSuccess(message, this.viewPage.ID_INDEX);
			}.bind(this)
	);
}


WebDatabaseIndex.prototype.createNormalTable = function()
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("DROP TABLE IF EXISTS normal_table ;");
				pTransaction.executeSql("CREATE TABLE normal_table ("
						+ "id INTEGER PRIMARY KEY, "
						+ "name TEXT, " 
						+ "i_index INTEGER); "						
				);
				
				for(var i = 0; i < 1000; i++){
					var random = parseInt(Math.random()*10000+1);
					pTransaction.executeSql("insert into normal_table (id, name, i_index) values (?, ?, ?);",
						[i , "Lin " + i, random ]
					);
				}		
				
				
				pTransaction.executeSql("DROP TABLE IF EXISTS normal_table_2 ;");
				pTransaction.executeSql("CREATE TABLE normal_table_2 ("
						+ "id INTEGER PRIMARY KEY, "
						+ "name TEXT, " 
						+ "i_index INTEGER); "						
				);
				
				for(var i = 0; i < 1000; i++){
					var random = parseInt(Math.random()*10000+1);
					pTransaction.executeSql("insert into normal_table_2 (id, name, i_index) values (?, ?, ?);",
						[i , "Lin " + i, random ]
					);
				}		
				
				
			}.bind(this),
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_NORMAL);
				}else{
					var message = "Error: prepare normal:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_NORMAL);
				}
			}.bind(this),
			function(){
				var message = "Success: add normal:" ;
				this.viewPage.testSuccess(message, this.viewPage.ID_NORMAL);
			}.bind(this)
	);
}


WebDatabaseIndex.prototype.testNormal = function()
{
	var compId = this.viewPage.ID_NORMAL;
	var dt = (new Date()).getTime();
	this.html5Db.transaction(
			function (pTransaction) {
				var query = "select * from normal_table_2, normal_table "
					+   "where normal_table_2.i_index = normal_table.i_index";
				pTransaction.executeSql(query, [],
				       function(pTransaction, pResults) {
							var message = "Success:" + pResults.rows.length +":";
							this.viewPage.testSuccess(message, compId, dt);
					   }.bind(this),
					   function(pTransaction, pError){
						    var message = "Error:"+pError.message+ "(Code "+pError.code+")";
						    this.viewPage.testError(message, compId);	
					   }.bind(this)
				);
			}.bind(this)
	);
}

WebDatabaseIndex.prototype.testIndex = function()
{
	var compId = this.viewPage.ID_INDEX;
	var dt = (new Date()).getTime();
	this.html5Db.transaction(
			function (pTransaction) {
				var query = "select * from normal_table, index_table "
						+   "where index_table.i_index = normal_table.i_index";
				pTransaction.executeSql(query,[],
				       function(pTransaction, pResults) {
							var message = "Success:" + pResults.rows.length +":";
							this.viewPage.testSuccess(message, compId, dt);
					   }.bind(this),
					   function(pTransaction, pError){
						    var message = "Error:"+pError.message+ "(Code "+pError.code+")";
						    this.viewPage.testError(message, compId);	
					   }.bind(this)
				);
			}.bind(this)
	);
}

