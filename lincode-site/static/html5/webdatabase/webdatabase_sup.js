
function WebDatabaseSup(webDatabase){
	this.html5Db = webDatabase.html5Db;
	this.viewPage = ViewPage;
	
	this.webDatabaseForeignKey = new WebDatabaseForeignKey(webDatabase);
	
}

WebDatabaseSup.prototype.createSupportTable = function(){
	this.createDataTypeTestTable();
	this.createTechniciensTable();
	this.createConsommesTable();
	
	this.webDatabaseForeignKey.createForeignKeyTable();
	this.webDatabaseForeignKey.createTriggerTable();
}

//Start the test
WebDatabaseSup.prototype.startTest = function(){
		
	// this.testErrorCallback();
	// this.testSuccessCallback();
	this.testRollback();
	
	this.testSQLString();
	this.testSQLLocate();
	this.testSQLAlias();
	this.testSQLCast();
	this.testSQLSubrequest();
	this.testSQLLike();
	this.testSQLLikeNumber();
	
	this.webDatabaseForeignKey.startTest();
}

//
//Prepare data in table "data_type_test"
WebDatabaseSup.prototype.prepareDataTypeTestData = function(){
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("insert into data_type_test (t, nu, i, no) values (?, ?, ?, ?);",
							['500.0', '500.0', '500.0', '500.0']
				);					
				pTransaction.executeSql("insert into data_type_test (t, nu, i, no) values (?, ?, ?, ?);",
							[500.0, 500.0, 500.0, 500.0]
				);
			},
			function(pError){
				var message = "Error:" + pError.message;
				this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_4);	
			}.bind(this), 
			function(){
	
				this.html5Db.transaction(
						function (pTransaction) {
							pTransaction.executeSql("select * from data_type_test",[],
								function(pTransaction, pResults) {
									var row_1 = pResults.rows.item(0);
									var row_2 = pResults.rows.item(1);
									var equal = true;
									if (row_1.t != row_2.t)
										equal = false;
									if (row_1.nu != row_2.nu)
										equal = false;
									if (row_1.i != row_2.i)
										equal = false;
									if (row_1.no != row_2.no)
										equal = false;
									
									if (equal){
										var message = "Success: same value with different type";
										this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLE_4);
									}else{
										var message = "Error: has different value";
										this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_4);	
									}
								}.bind(this),
								function(pTransaction, pError){
									var message = "Error:"+pError.message+ "(Code "+pError.code+")";
									this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_4);	
								}.bind(this)			
							);
						}.bind(this)
				);					
			}.bind(this)
	);
}

WebDatabaseSup.prototype.createDataTypeTestTable = function() {
	this.html5Db.transaction(
			function (pTransaction){
				pTransaction.executeSql("drop table if exists data_type_test");
				pTransaction.executeSql("create table data_type_test (" +
					    				"t  TEXT," +
					    				"nu NUMERIC, " +
					    				"i  INTEGER," +
					    				"no BLOB );"
				);	
			},
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_4);	
				}else{
					var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_4);
				}
			}.bind(this), 
			function(){
				this.prepareDataTypeTestData();
			}.bind(this)
	);
}

// Create table "techniciens"
WebDatabaseSup.prototype.createTechniciensTable = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("drop table if exists techniciens");
				pTransaction.executeSql("create table techniciens (" +
						"id integer primary key autoincrement, " +
						"name text not null," +
						"tel text null," +
						"globalid integer not null,"+
						"mluser text null);"
				);
			},
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLE_3);
				}else{
					var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_3);
				}
			}.bind(this), 
			function(){
				this.prepareTechniciensData();
			}.bind(this)
	);
}

WebDatabaseSup.prototype.prepareTechniciensData = function()
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("insert into techniciens (id, name, tel, globalid, mluser) values (?, ?, ?, ?, ?);",
						[1001, "techniciens test", "555-555", 10001, "grout@otis"]
				);
				
				pTransaction.executeSql("insert into techniciens (id, name, tel, globalid, mluser) values (?, ?, ?, ?, ?);",
						[1002, "techniciens test 2", "666-666", 10002, "jean@otis"]
				);
				
				pTransaction.executeSql("insert into techniciens (id, name, tel, globalid, mluser) values (?, ?, ?, ?, ?);",
						[1003, "techniciens test 3", "777-777", 10003, "pierrie@otis"]
				);
				
				pTransaction.executeSql("insert into techniciens (id, name, tel, globalid, mluser) values (?, ?, ?, ?, ?);",
						[1004, "techniciens test 4", "888-888", 10004, "martin@otis"]
				);
			},
			function(pError){
				var message = "Error:" + pError.message;
				this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_3);	
			}.bind(this), 
			function(){
				var message = "Success" ;
				this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLE_3);
			}.bind(this)
	);
}

//Create table "consommes"
WebDatabaseSup.prototype.createConsommesTable = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("drop table if exists consommes;");
				pTransaction.executeSql("create table consommes ("
						+ "id integer primary key autoincrement, "
						+ "interv_id integer, "
						+ "name text not null, "
						+ "price text null," 
						+ "description blob null); "						
				);
			},
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_2);
				}else{
					var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_2);
				}
			}.bind(this), 
			function(){
				this.prepareConsommesData();
			}.bind(this)
	);
}

WebDatabaseSup.prototype.prepareConsommesData = function()
{
	this.html5Db.transaction(
			function (pTransaction) {
				
				pTransaction.executeSql("insert into consommes (interv_id, name, price, description) values (?, ?, ?, ?);",
						[1000035, "consommes test " , "15.25", "description test " ]
				);

				pTransaction.executeSql("insert into consommes (interv_id, name, price, description) values (?, ?, ?, ?);",
						[1000036, "consommes test 2", "0.25", "description test 2"]
				);
				
				pTransaction.executeSql("insert into consommes (interv_id,name, price, description) values (?, ?, ?, ?);",
						[1000037, "consommes test 3", "1.05", "description test 3"]
				);
			},
			function(pError){
				var message = "Error:" + pError.message;
				this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_2);	
			}.bind(this), 
			function(){
				var message = "Success" ;
				this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLE_2);
			}.bind(this)
	);
}



//Test request error sql callback
/*
WebDatabaseSup.prototype.testErrorCallback = function() 
{
	this.dt = null;
	this.html5Db.transaction(
		function(pTransaction){
			pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
					[4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", "callbacktest", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0], 
					function(pTransaction, pResults) {
						var message = "Error:" + "wrong callback";
						this.viewPage.testError(message, this.viewPage.ID_ERROR_CALLBACK);
					}.bind(this),
					function(pTrasaction, pError){
						var message = "Success" ;
						if (this.dt != null)
							message += (" (" + ((new Date()).getTime() - this.dt) + " ms)");
						this.viewPage.testSuccess(message, this.viewPage.ID_ERROR_CALLBACK);
					}.bind(this)
			);
		}.bind(this)
	);		
}

// Test request success sql callback
WebDatabaseSup.prototype.testSuccessCallback = function() 
{
	this.dt = null;
	this.html5Db.transaction(
		function(pTransaction){
			pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
					[1000035, 5, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", "Callback test", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0], 
					function(pTransaction, pResults) {
						var message = "Success" ;
						this.viewPage.testSuccess(message, this.viewPage.ID_SUCCESS_CALLBACK);
					}.bind(this),
					function(pTrasaction, pError){
						var message = "Error:" + pError.message +'(code: '+ pError.code+') ';
						this.viewPage.testError(message, this.viewPage.ID_SUCCESS_CALLBACK);
					}.bind(this)
			);
		}.bind(this)
	);		
}
*/

// Test rollback
WebDatabaseSup.prototype.testRollback = function() 
{
	//get number of work_orders before rollback.
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select * from techniciens order by id;", [], 
					function(pTransaction, pResults) {
						this.testRollback.numbeforeRollBack = pResults.rows.length;
					}.bind(this)
				);
			}.bind(this)
	);
	
	this.html5Db.transaction(
		function (pTransaction) {
			// First insert: OK
			pTransaction.executeSql("insert into techniciens (name, tel, globalid, mluser) values (?, ?, ?, ?);",
					["RollBack test 1", "555-555", 1000, "grot@otis"]
			);
			// Second insert: NOK
			pTransaction.executeSql("insert into techniciens (name, tel, globalid, mluser) values (?, ?, ?);",
					["RollBack test 2", "555-555", 1001, "jean@otis"]
			);
			// Third insert: OK
			pTransaction.executeSql("insert into techniciens (name, tel, globalid, mluser) values (?, ?, ?, ?);",
					["RollBack test 3", "555-555", 1002, "martin@otis"]
			);
		}, function(pError) {
			this.html5Db.transaction(
					function (pTransaction) {

						pTransaction.executeSql("select * from techniciens;", [], 
							function(pTransaction, pResults) {
								if (this.testRollback.numbeforeRollBack == pResults.rows.length){
									var message = "Success" ;
									message += ( ": before and after same count "+ pResults.rows.length );
									this.viewPage.testSuccess(message, this.viewPage.ID_ROLLBACK);
								}else{
									var message = "Error:" + "wrong number of techniciens after rollback";
									this.viewPage.testError(message, this.viewPage.ID_ROLLBACK);
								}
							}.bind(this)
						);
					}.bind(this)
			);
		}.bind(this),
		function(){		
			var message = "Error:" + "wrong callback";
			this.viewPage.testError(message, this.viewPage.ID_ROLLBACK);
		}.bind(this)
	);
		
}

// Test String concatenate
WebDatabaseSup.prototype.testSQLString = function() 
{
	this.html5Db.transaction(
		function (pTransaction) {
			pTransaction.executeSql("select * from techniciens where name = ('techniciens' || ' ' || 'test');", [], 
				function(pTransaction, pResults) {
					if(pResults.rows.length == 1){
						var message = "Success" + pResults.rows.length;
						this.viewPage.testSuccess(message, this.viewPage.ID_SQL_STRING);							
					}else{
						var message = "Error: wrong number of string :" + pResults.rows.length;
						this.viewPage.testError(message, this.viewPage.ID_SQL_STRING);							
					}
				}.bind(this),
				function(pTrasaction, pError){
					var message = "Error:"+ pError.message + "(Code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_SQL_STRING);
				}.bind(this)
			);
		}.bind(this)
	);
}
	
// Test Substr
WebDatabaseSup.prototype.testSQLLocate = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select count(*) AS c from techniciens where substr(name, 1, length('techniciens'))='techniciens' ;", [], 
					function(pTransaction, pResults) {
						if( pResults.rows.item(0).c == 4){
							var message = "Success:" +pResults.rows.item(0).c; 
							this.viewPage.testSuccess(message, this.viewPage.ID_SQL_LOCATE);									
						}else{
							var message = "Error: wrong number:"+pResults.rows.item(0).c; 
							this.viewPage.testError(message, this.viewPage.ID_SQL_LOCATE);								
						}	
					}.bind(this),
					function(pTrasaction, pError){
						var message = "Error:" + pError.message +'(code: '+ pError.code+') ';
						this.viewPage.testError(message, this.viewPage.ID_SQL_LOCATE);
					}.bind(this)
				);
			}.bind(this)
	);
}
	
// Test alias
WebDatabaseSup.prototype.testSQLAlias = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select count(*) AS c from techniciens;", [], 
					function(pTransaction, pResults) {
					if ( pResults.rows.item(0).c > 0){
						var message = "Success" ;
						message +=  ": alias number: "+ pResults.rows.item(0).c;
						this.viewPage.testSuccess(message, this.viewPage.ID_SQL_ALIAS);
					}else{
						var message = "Error:" + "wrong number of work_order alias";
						this.viewPage.testError(message, this.viewPage.ID_SQL_ALIAS);
					}
					}.bind(this),
					function(pTrasaction, pError){
						var message = "Error:"+ pError.message + "(Code:"+ pError.code +")";
						this.viewPage.testError(message, this.viewPage.ID_SQL_ALIAS);
					}.bind(this)
				);
			}.bind(this)
	);
}
	
// Test Like
WebDatabaseSup.prototype.testSQLLike = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select * from techniciens where name LIKE 'techniciens%';", [], 
					function(pTransaction, pResults) {
						if (pResults.rows.length == 4){
							var message = "Success";
							this.viewPage.testSuccess(message, this.viewPage.ID_SQL_LIKE);								
						}else{
							var message = "Error: wrong number of result. has :"+ pResults.rows.length;
							this.viewPage.testError(message, this.viewPage.ID_SQL_LIKE);						
						}
					}.bind(this),
					function(pTransaction, pError){
						var message = "Error:"+ pError.message + "(Code:"+ pError.code +")";
						this.viewPage.testError(message, this.viewPage.ID_SQL_LIKE);
					}.bind(this)
				);
			}.bind(this)
		);
}

// Test Like [0-9][0-9]
WebDatabaseSup.prototype.testSQLLikeNumber = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("select * from consommes where price LIKE '%[0-9]%';", [], 
					function(pTransaction, pResults) {
						if (pResults.rows.length > 2){
							var message = "Success";
							this.viewPage.testSuccess(message, this.viewPage.ID_SQL_LIKE_NUM);								
						}else{
							var message = "Error: wrong number of result. has :"+ pResults.rows.length;
							this.viewPage.testError(message, this.viewPage.ID_SQL_LIKE_NUM);						
						}
					}.bind(this),
					function(pTransaction, pError){
						var message = "Error:"+ pError.message + "(Code:"+ pError.code +")";
						this.viewPage.testError(message, this.viewPage.ID_SQL_LIKE_NUM);
					}.bind(this)
				);
			}.bind(this)
		);
}
		
// Test CAST
WebDatabaseSup.prototype.testSQLCast = function() 
{
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("select count(*) AS c from techniciens where globalid == CAST('1000' as INTEGER) order by id;", [], 
						function(pTransaction, pResults) {
							if( pResults.rows.length == 1 ){
								var message = "Success";
								this.viewPage.testSuccess(message, this.viewPage.ID_SQL_CAST);	
							}else{
								var message = "Error: wrong number of result"
								this.viewPage.testError(message, this.viewPage.ID_SQL_CAST);
							}	
						}.bind(this),
						function(pTrasaction, pError){
							var message = "Error:"+ pError.message + "(Code:"+ pError.code +")";
							this.viewPage.testError(message, this.viewPage.ID_SQL_CAST);
						}.bind(this)
					);
				}.bind(this)
			);
}
	
// Test Sub request
WebDatabaseSup.prototype.testSQLSubrequest = function()
{
	var beforeInsert = 0;
	var afterInsert = -1;
	// store number before insert
	this.html5Db.transaction(
			function (pTransaction){
				pTransaction.executeSql("select * from consommes",[] , 
					function(pTransaction, pResults){
						beforeInsert = pResults.rows.length;
					}.bind(this),
					function(pTransaction, pError){
						var message = "Error:"+ pError.message + "(Code:"+ pError.code +")";
						this.viewPage.testError(message, this.viewPage.ID_SQL_SUBREQUEST);
					}.bind(this)
				);
			}.bind(this)
	);
	
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("insert into consommes(interv_id, name ) select id, customer_name from work_orders where status == 4 order by id;", [], 
					function(pTransaction, pResults) {
						// store number after insert
						pTransaction.executeSql("select * from consommes;", [],
								function(pTrasaction, pResults){
									afterInsert = pResults.rows.length;
								}.bind(this),
								function(pTrasaction, pError){
									var message = "Error:"+pError.message+ "(Code "+pError.code+")";
									this.viewPage.testError(message, this.viewPage.ID_SQL_SUBREQUEST);	
								}.bind(this)
						);
						// get insert number
						pTransaction.executeSql("select customer_name from work_orders where status == 4 order by id;", [],
								function(pTransaction, pResults){
									var insert = pResults.rows.length;
									if ( beforeInsert + insert ==  afterInsert){
										var message = "Success";
										this.viewPage.testSuccess(message, this.viewPage.ID_SQL_SUBREQUEST);
									}else{
										var message = "Error:"+ "wrong number after insert";
										this.viewPage.testError(message, this.viewPage.ID_SQL_SUBREQUEST);											
									}											
								}.bind(this),
								function(pTrasaction, pError){
									var message = "Error:"+pError.message+ "(Code "+pError.code+")";
									this.viewPage.testError(message, this.viewPage.ID_SQL_SUBREQUEST);	
								}.bind(this)
								
						);
						
					}.bind(this), 
					function(pTransaction, pError){
						var message = "Error:"+pError.message+ "(Code "+pError.code+")";
						this.viewPage.testError(message, this.viewPage.ID_SQL_SUBREQUEST);	
					}.bind(this)
				);
			}.bind(this)
	);
}
	

