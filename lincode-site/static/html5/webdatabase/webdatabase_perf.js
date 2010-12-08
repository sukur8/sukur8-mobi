
// Database test
function WebDatabasePerf(webDatabase)
{
	this.webDatabase = webDatabase;
	this.html5Db = webDatabase.html5Db;
	this.viewPage = ViewPage;
	this.testItems = [];
	this.webDatabaseIndex = new WebDatabaseIndex(this.webDatabase);
}

WebDatabasePerf.prototype.testItem = function(number, func)
{
	this.testItems[number] = func;
}

WebDatabasePerf.prototype.doTest = function(number)
{	
	if (this.testItems[number]){
		
		this.html5Db.transaction(
			function(pTransaction){
				this.testItems[number]();
			}.bind(this),
			function(pError){
				if(console.error) console.error("Error!: %o", pError);
			},function(){
				this.doTest(number+1);
			}.bind(this)
		);
	}
}

WebDatabasePerf.prototype.createPerformanceTable = function()
{
	this.createTechniciensRefTable();
	this.createWorkordersTable();
	this.webDatabaseIndex.createIndexTable();
	this.webDatabaseIndex.createNormalTable();
}

//Start the test
WebDatabasePerf.prototype.startTest = function()
{
	this.testItem(0, function(){ this.createTables(); }.bind(this) );
	this.testItem(1, function(){ this.FillTables(); }.bind(this) );
	this.testItem(2, function(){ this.dropTables(); }.bind(this) );
	
	this.testItem(3, function(){ this.addWOs(10, 1001, "Cust_1"); }.bind(this) );
	this.testItem(4, function(){ this.addWOs(300, 1002, "Cust_2"); }.bind(this) );
	this.testItem(5, function(){ this.addWOs(1000, 1003, "Cust_3"); }.bind(this) );

	this.testItem(6, function(){ this.selectByIdWOs(1001); }.bind(this) );
	this.testItem(7, function(){ this.selectByIdWOs(1002); }.bind(this) );
	this.testItem(8, function(){ this.selectByIdWOs(1003); }.bind(this) );
	
	this.testItem(9, function(){ this.selectWOs("Cust_1", true); }.bind(this) );
	this.testItem(10, function(){ this.selectWOs("Cust_2", true); }.bind(this) );
	this.testItem(11, function(){ this.selectWOs("Cust_3", true); }.bind(this) );

	this.testItem(12, function(){ this.selectWOs("Cust_1", false); }.bind(this) );
	this.testItem(13, function(){ this.selectWOs("Cust_2", false); }.bind(this) );
	this.testItem(14, function(){ this.selectWOs("Cust_3", false); }.bind(this) );
	
	this.testItem(15, function(){ this.selectByLikeWOs("Cust_1"); }.bind(this) );
	this.testItem(16, function(){ this.selectByLikeWOs("Cust_2"); }.bind(this) );
	this.testItem(17, function(){ this.selectByLikeWOs("Cust_3"); }.bind(this) );	

	this.testItem(18, function(){ this.insertByRefWOs(); }.bind(this) );
	this.testItem(19, function(){ this.selectByRefWOs(); }.bind(this) );

	this.testItem(20, function(){ this.updateWOs("Cust_new_1", "Cust_1"); }.bind(this) );
	this.testItem(21, function(){ this.updateWOs("Cust_new_2", "Cust_2"); }.bind(this) );
	this.testItem(22, function(){ this.updateWOs("Cust_new_3", "Cust_3"); }.bind(this) );
	
	this.testItem(23, function(){ this.deleteWOs("Cust_new_1"); }.bind(this) );
	this.testItem(24, function(){ this.deleteWOs("Cust_new_2"); }.bind(this) );
	this.testItem(25, function(){ this.deleteWOs("Cust_new_3"); }.bind(this) );

	this.testItem(26, function(){ this.webDatabaseIndex.startNormalTest(); }.bind(this) );
	this.testItem(27, function(){ this.webDatabaseIndex.startIndexTest(); }.bind(this) );
	
    var initialVersion = 0;
    try {
    	this.doTest(initialVersion);
    } catch(e) {
    	if(console.error) console.error(e);
    }

}

//Create table "work_orders"

WebDatabasePerf.prototype.createWorkordersTable = function() 
{
	this.html5Db.transaction(
			function (pTransaction) {
				pTransaction.executeSql("drop table if exists work_orders;");
				this.createTableByName(pTransaction, "work_orders");
			}.bind(this),
			function(pError){
				if(pError.code == 1){
					var message = "Already exist" ;
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_1);
				}else{
					var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_1);
				}
			}.bind(this),
			function(){
				this.prepareWorkOrdersData();
			}.bind(this)
	);	
}

WebDatabasePerf.prototype.prepareWorkOrdersData = function()
{
	this.html5Db.transaction(
			function (pTransaction) {
				// data preexist
				for(var i=0; i < 500; i++ ){
					pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
							[100, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is init desc", "Pre data", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0]
					);					
				}
			
				pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
						[1004, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is init desc", "Cust 1", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0]
				);		 
				pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
						[1004, 5, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is init desc 2", "Cust 2", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 3ème !", "0607501496", "48.8", "2.40", "iphone", 0]
				);
			},
			function(pError){
				var message = "Error: work_orders:" + pError.message;
				this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLE_1);	
			}.bind(this), 
			function(){
				var message = "Success" ;
				this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLE_1);
			}.bind(this)
	);
}

WebDatabasePerf.prototype.createTechniciensRefTable = function()
{
	var compId = this.viewPage.ID_SELECT + "_insert_ref" ;
	this.html5Db.transaction(
		function (pTransaction) {
			pTransaction.executeSql("drop table if exists techniciens_ref");
			pTransaction.executeSql("create table techniciens_ref (" +
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
				this.viewPage.testSuccess(message, compId);
			}else{
				var message = "Error:" + pError.message+ "(code:"+ pError.code +")";
				this.viewPage.testError(message, compId);
			}
		}.bind(this), 
		function(){
			var message = "Success: add techniciens_ref:" ;
			this.viewPage.testSuccess(message, compId);
		}.bind(this)
	);
}

//Create a table using the given name
WebDatabasePerf.prototype.createTableByName = function(pTransaction, pTableName) 
{
	pTransaction.executeSql("create table " + pTableName + " ("
		+ "id integer primary key autoincrement, "
		+ "technician_id integer not null, "
		+ "status integer not null, "
		+ "num text not null, "
		+ "flags integer not null, "
		+ "priority integer not null, "
		+ "duration integer not null, "
		+ "creation_date timestamp not null, "
		+ "scheduling_date timestamp not null, "
		+ "expiration_date timestamp null, "
		+ "description text null, "
		+ "customer_name text not null, "
		+ "site_name text not null, "
		+ "site_address text not null, "
		+ "site_zip text null, "
		+ "site_city text not null, "
		+ "site_contact text null, "
		+ "site_description text null, "
		+ "site_phone text null, "
		+ "site_latitude text null, "
		+ "site_longitude text null, "
		+ "equipment_name text null, "
		+ "synchro integer not null);"
	);
}


// Create tables
WebDatabasePerf.prototype.createTables = function()
{
		var nb = 10;
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < nb; i++)
						this.createTableByName(pTransaction, "test_" + i);
				}.bind(this),
				function (pError){
					var message = "Error:" + pError.message;
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLES);
				}.bind(this), 
				function (){
					var message = "Success:" ;
					this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLES, dt);
				}.bind(this)
			);
}

//Fill tables
WebDatabasePerf.prototype.FillTables = function()
{
		var nb = 10;
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < nb; i++){
						for(var j = 0 ; j < 100; j++ ){
							this.addEntry(pTransaction, "test_"+ i, 100 + j, "tables_delete_test", false);
						}
					}
				}.bind(this),
				function (pError){
					var message = "Error:" + pError.message;
					this.viewPage.testError(message, this.viewPage.ID_CREATE_TABLES);
				}.bind(this), 
				function (){
					var message = "Success:" ;
					//this.viewPage.testSuccess(message, this.viewPage.ID_CREATE_TABLES, dt);
				}.bind(this)
			);
}

	// Drop tables
WebDatabasePerf.prototype.dropTables = function() 
{
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < 500; i++)
						pTransaction.executeSql("drop table if exists test_" + i + ";");
				}, 
				function (pError){
					var message = "Error:" + pError.message;
					this.viewPage.testError(message, this.viewPage.ID_DROP_TABLES);
				}.bind(this), 
				function (){
					var message = "Success:" ;
					this.viewPage.testSuccess(message, this.viewPage.ID_DROP_TABLES, dt);
				}.bind(this)
		);
}

	
// Add work orders
WebDatabasePerf.prototype.addWOs = function(pNum, pTechnicien_id, pValue) 
{
		var compId = this.viewPage.ID_ADD + "_" + pNum;
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < pNum; i++)
						this.storeWO(pTransaction, pTechnicien_id, pValue, false);
				}.bind(this), 
				function (pError){
					var message = "Error:" + pError.message;
					this.viewPage.testError(message, compId);	
				}.bind(this),
				function (){
					var message = "Success:" ;
					this.viewPage.testSuccess(message, compId, dt);
				}.bind(this)
			);
}
	
WebDatabasePerf.prototype.addEntry = function(pTransaction, pTableName, pTechnicien_id, pValue, pAlert)
{
		pTransaction.executeSql("insert into "+ pTableName +" (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
			[pTechnicien_id, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", pValue, "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0], 
			function(pTransaction, pResults) {
				if (pAlert)
					alert("Insert ID: " + pResults.insertId);
			}
		);	
}
	
// Store a work order
WebDatabasePerf.prototype.storeWO = function(pTransaction, pTechnicien_id, pValue, pAlert) 
{
	this.addEntry(pTransaction, "work_orders", pTechnicien_id, pValue, pAlert);
}
	

// Select work orders
WebDatabasePerf.prototype.selectByIdWOs = function(pTechnician_id) 
{
		var compId = this.viewPage.ID_SELECT + "_" + pTechnician_id;
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					var query = "select * from work_orders where technician_id = ?;";
					pTransaction.executeSql(query, [pTechnician_id], 
							function(pTransaction, pResults) {
								var message = "Success: " +pResults.rows.length+":" ;
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

// Select work orders
WebDatabasePerf.prototype.selectByLikeWOs = function(pValue) 
{
		var compId = this.viewPage.ID_SELECT + "_like_" + pValue;

		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					var query = "select * from work_orders where customer_name LIKE ?;";
					pTransaction.executeSql(query, [pValue], 
							function(pTransaction, pResults) {
								var message = "Success:" +pResults.rows.length +":";
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

// Select work orders
WebDatabasePerf.prototype.selectWOs = function(pValue, pOrder) 
{
		var compId = this.viewPage.ID_SELECT + "_" + pValue;
		if (pOrder)
			compId += "_order";
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					var query = "select * from work_orders where customer_name = ?";
					if (pOrder)
						query += " order by num";
					query += ";";
					pTransaction.executeSql(query, [pValue], 
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

// Insert avec reference
WebDatabasePerf.prototype.insertByRefWOs = function(pTechnician_id, pGlobal_id, pOrder) 
{
	var compId = this.viewPage.ID_SELECT + "_insert_ref" ;
	var dt = (new Date()).getTime();
	var count = 0;
	var techician_ref_start_id = 1100;
	this.html5Db.transaction(
			function (pTransaction) {
				
				// insert techinciens
				for(var i = 0; i < 10; i++){
					
					var techician_id = techician_ref_start_id + i;
					var query = "insert into techniciens_ref (id, name, tel, globalid, mluser) values (?, ?, ?, ?, ?);";
					pTransaction.executeSql(query, [techician_id, "techniciens test", "555-555", techician_id * 10, "grout@otis"],
					    	function(pTransaction, pResults) {
								;
							}.bind(this),
							function(pTransaction, pError){
								alert("error :" + pError.message);
							}.bind(this)			
					);
					
					// insert worker_orders
					for(var i = 0; i < 5000; i++){
						var query = "insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
						pTransaction.executeSql(query, [techician_id, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is Ref wo", "Ref data" + i, "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0], 
								function(pTransaction, pResults) {
									count += 1;
								}.bind(this),
								function(pTransaction, pError){
									alert("error :" + pError.message);
								}.bind(this)
						);
					}			
				}

			}.bind(this),
			function (pError){
				var message = "Error:" + pError.message;
				this.viewPage.testError(message, compId);	
			}.bind(this),
			function(){
				var message = "Success:"+ count +":" ;
				this.viewPage.testSuccess(message, compId, dt);
			}.bind(this)
	);
}

// Seletec avec reference
WebDatabasePerf.prototype.selectByRefWOs = function() 
{
	var compId = this.viewPage.ID_SELECT + "_select_ref";
	var dt = (new Date()).getTime();
	var count = 0;
	var techician_ref_start_id = 1100;
	this.html5Db.transaction(
			function (pTransaction) {
			
					for(var i = 0; i < 10; i++ ){
						var techician_id = techician_ref_start_id + i;
						var query = "select t.id, t.name, wo.status, wo.customer_name from techniciens_ref t, work_orders wo where wo.technician_id = t.id and t.id = ?;";
						pTransaction.executeSql(query, [techician_id], 
								function(pTransaction, pResults) {
									count += pResults.rows.length;
								}.bind(this),
								function(pTransaction, pError){
									alert("error :" + pError.message);
								}.bind(this)
						);
					}
		
			}.bind(this),
			function (pError){
				var message = "Error:" + pError.message;
				this.viewPage.testError(message, compId);	
			}.bind(this),
			function (){
				var message = "Success:"+ count+ ":";
				this.viewPage.testSuccess(message, compId, dt);
			}.bind(this)
	);
}

// update
WebDatabasePerf.prototype.updateWOs = function(pNewValue, pOldValue) 
{
		var compId = this.viewPage.ID_UPDATE + "_" + pOldValue;
		var dt = (new Date()).getTime();

		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("update work_orders set customer_name = ? where customer_name = ?;", [pNewValue, pOldValue]);
				},
				function (pError){
					var message = "Error:" + pError.message;
					this.testError(message, compId);	
				}.bind(this),
				function (){
					var message = "Success:" ;
					this.viewPage.testSuccess(message, compId, dt);
				}.bind(this)
			);
}
	
// Delete work orders
WebDatabasePerf.prototype.deleteWOs = function(pValue) 
{
		var compId = this.viewPage.ID_DELETE + "_" + pValue;
		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("delete from work_orders where customer_name = ?;", [pValue]);
				},
				function (pError){
					var message = "Error:" + pError.message;
					this.testError(message, compId);
				}.bind(this), 
				function (){
					var message = "Success:" ;
					this.viewPage.testSuccess(message, compId, dt);
				}.bind(this)
			);
}

// Store big values
WebDatabasePerf.prototype.storeBig = function() 
{
		var nb = +(document.getElementById("input_webdatabase_supportPerfs_storeBig_nb").value);
		var size = +(document.getElementById("input_webdatabase_supportPerfs_storeBig_size").value) * 1000;
		var value = "";
	
		for (var i = 0; i < size; i++)
			value += "x"; // So beautiful...

		var dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var j = 0; j < nb; j++)
						this.storeWO(pTransaction, 1001, value, false);
				}.bind(this),
				function (pError){
					var message = "Message: "  + pError.message;
					alert(message);		
				}, 
				function (){
					var current = (new Date()).getTime();
					time = current - dt;
					alert("sucess" + "( " + time + " ms)");
				}.bind(this)
		);
	
}

// End of WebDatabasePerf
