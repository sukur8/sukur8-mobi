
// Database test
html5.tests.database = {
	// DB instance
	html5Db: null,

	// Date/time value used to compute action duration
	dt: null,

	// Initialize page
	initPage: function() {
		// Check database support
		if (!window.openDatabase) {
			document.getElementById("td_webdatabase_support").innerHTML = "NOK";
			document.getElementById("div_webdatabase_init").style.display = "none";
			document.getElementById("div_webdatabase_using").style.display = "none";
			document.getElementById("div_webdatabase_supportPerfs").style.display = "none";
		} else
			document.getElementById("td_webdatabase_support").innerHTML = "OK";
	},

	// Transaction error callback
	transactionErrorCallBack: function(pError) {
		alert("Transaction ERROR: " + pError);
	},

	// Transaction success callback
	transactionSuccessCallBack: function() {
		var txt = "Transaction SUCCESS";
		if (this.dt != null)
			txt += (" (" + ((new Date()).getTime() - this.dt) + " ms)");
		alert(txt);
	},

	// Open or create database
	openCreateDb: function() {
		var name = document.getElementById("input_webdatabase_init_openCreate_name").value;
		var version = document.getElementById("input_webdatabase_init_openCreate_version").value;
		var displayName = document.getElementById("input_webdatabase_init_openCreate_displayName").value;
		var maxSize = +(document.getElementById("input_webdatabase_init_openCreate_maxSize").value);
		try {
			this.dt = (new Date()).getTime();
			this.html5Db = openDatabase(name, version, displayName, maxSize);
   /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 			// TODO
			this.html5Db = openDatabase(name, version, displayName, maxSize, function(pDb) {
				alert("That was a database creation !");
			});
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
			alert("Open/Create database SUCCESS (" + ((new Date()).getTime() - this.dt) + " ms)");
		} catch(e) {
			alert("Open/Create database ERROR: " + e);
			return;
		}
		document.getElementById("td_webdatabase_init_currentDb").innerHTML = name;
	},

	// Change database version
	changeVersion: function() {
		this.dt = null;
		alert("TODO");
	},

	// Create table "work_orders"
	createTable: function(pTableName) {
		this.dt = null;
		try{
			this.html5Db.transaction(
					function (pTransaction) {
						pTransaction.executeSql("create table work_orders ("
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
			);
	
		}catch(err){
			alert("The creation of table has problem:" + err.message());
		}
		alert("The creation of table success" );	
	},
	
	// Create a table using the given name
	createTableByName: function(pTransaction, pTableName) {
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
	},

	// Drop table "work_orders"
	dropTable: function() {
		this.dt = null;
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("drop table if exists work_orders;");
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Add a work order
	addWO: function() {
		this.dt = null;
		var value = document.getElementById("input_webdatabase_using_addWO_value").value;
		this.html5Db.transaction(
				function (pTransaction) {
					this.storeWO(pTransaction, value, true);
				}.bind(this), this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Store a work order
	storeWO: function(pTransaction, pValue, pAlert) {
		pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
			[1000035, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", pValue, "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0], 
			function(pTransaction, pResults) {
				if (pAlert)
					alert("Insert ID: " + pResults.insertId);
			}
		);
	},

	// Select a work order
	selectWO: function() {
		this.dt = null;
		var key = document.getElementById("input_webdatabase_using_selectWO_key").value;
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("select * from work_orders where id = ?;", [key], 
						function(pTransaction, pResults) {
							alert(pResults.rows.length > 0 ? pResults.rows.item(0)["customer_name"] : "[NOT FOUND]");
						}
					);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Select a work order using a "read" transaction
	selectWORead: function() {
		this.dt = null;
		var key = document.getElementById("input_webdatabase_using_selectWORead_key").value;
		if (this.html5Db.readTransaction) {
			this.html5Db.readTransaction(
					function (pTransaction) {
						pTransaction.executeSql("select * from work_orders where id = ?;", [key], 
							function(pTransaction, pResults) {
								alert(pResults.rows.length > 0 ? pResults.rows.item(0)["customer_name"] : "[NOT FOUND]");
							}
						);
					}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
				);
		} else
			alert("[READ TRANSACTION NOT SUPPORTED]");
	},

	// Update a work order
	updateWO: function() {
		this.dt = null;
		var key = document.getElementById("input_webdatabase_using_updateWO_key").value;
		var value = document.getElementById("input_webdatabase_using_updateWO_value").value;
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("update work_orders set customer_name = ? where id = ?;", [value, key]);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Delete a work order
	deleteWO: function() {
		this.dt = null;
		var key = document.getElementById("input_webdatabase_using_deleteWO_key").value;
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("delete from work_orders where id = ?;", [key]);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// List work orders
	listWOs: function() {
		this.dt = null;
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("select * from work_orders order by id;", [], 
						function(pTransaction, pResults) {
							var str = "--- " + pResults.rows.length + " results ---";
							str += "<br />";
							for (var i = 0; i < pResults.rows.length; i++) {
								var row = pResults.rows.item(i);
								str += row["id"] + ":" + row["num"] + ":" + row["customer_name"];
								if (i < pResults.rows.length - 1)
									str += "<br />";
							}
							document.getElementById("td_webdatabase_using_listWOs").innerHTML = str;
						}
					);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Create tables
	createTables: function() {
		var nb = +(document.getElementById("input_webdatabase_supportPerfs_createTables_nb").value);
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < nb; i++)
						this.createTableByName(pTransaction, "test_" + i);
				}.bind(this), this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Drop tables
	dropTables: function() {
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < 500; i++)
						pTransaction.executeSql("drop table if exists test_" + i + ";");
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Add work orders
	addWOs: function() {
		var nb = +(document.getElementById("input_webdatabase_supportPerfs_addWOs_nb").value);
		var value = document.getElementById("input_webdatabase_supportPerfs_addWOs_value").value;
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var i = 0; i < nb; i++)
						this.storeWO(pTransaction, value, false);
				}.bind(this), this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Update work orders
	updateWOs: function() {
		var valueO = document.getElementById("input_webdatabase_supportPerfs_updateWOs_valueO").value;
		var valueN = document.getElementById("input_webdatabase_supportPerfs_updateWOs_valueN").value;
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("update work_orders set customer_name = ? where customer_name = ?;", [valueN, valueO]);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Delete work orders
	deleteWOs: function() {
		var value = document.getElementById("input_webdatabase_supportPerfs_deleteWOs_value").value;
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					pTransaction.executeSql("delete from work_orders where customer_name = ?;", [value]);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Select work orders
	selectWOs: function() {
		var value = document.getElementById("input_webdatabase_supportPerfs_selectWOs_value").value;
		var order = document.getElementById("input_webdatabase_supportPerfs_selectWOs_order").checked;
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					var query = "select * from work_orders where customer_name = ?";
					if (order)
						query += " order by num";
					query += ";";
					pTransaction.executeSql(query, [value], 
						function(pTransaction, pResults) {
							var str = "--- " + pResults.rows.length + " results ---";
							for (var i = 0; i < pResults.rows.length; i++) {
								var row = pResults.rows.item(i);
								str += row["id"] + ":" + row["num"] + ":" + row["customer_name"];
								if (i < pResults.rows.length - 1)
									str += "<br />";
							}
							document.getElementById("td_webdatabase_supportPerfs_selectWOs_results").innerHTML = str;
						}
					);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Select work orders using a "read" transaction
	selectWOsRead: function() {
		var value = document.getElementById("input_webdatabase_supportPerfs_selectWOsRead_value").value;
		var order = document.getElementById("input_webdatabase_supportPerfs_selectWOsRead_order").checked;
		this.dt = (new Date()).getTime();
		if (this.html5Db.readTransaction) {
			this.html5Db.readTransaction(
					function (pTransaction) {
						var query = "select * from work_orders where customer_name = ?";
						if (order)
							query += " order by num";
						query += ";";
						pTransaction.executeSql(query, [value], 
							function(pTransaction, pResults) {
								var str = "--- " + pResults.rows.length + " results ---";
								for (var i = 0; i < pResults.rows.length; i++) {
									var row = pResults.rows.item(i);
									str += row["id"] + ":" + row["num"] + ":" + row["customer_name"];
									if (i < pResults.rows.length - 1)
										str += "<br />";
								}
								document.getElementById("td_webdatabase_supportPerfs_selectWOsRead_results").innerHTML = str;
							}
						);
					}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
				);
		} else
			alert("[READ TRANSACTION NOT SUPPORTED]");
	},

	// Store big values
	storeBig: function() {
		var nb = +(document.getElementById("input_webdatabase_supportPerfs_storeBig_nb").value);
		var size = +(document.getElementById("input_webdatabase_supportPerfs_storeBig_size").value) * 1000;
		var value = "";
		for (var i = 0; i < size; i++)
			value += "x"; // So beautiful...
		this.dt = (new Date()).getTime();
		this.html5Db.transaction(
				function (pTransaction) {
					for (var j = 0; j < nb; j++)
						this.storeWO(pTransaction, value, false);
				}.bind(this), this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	},

	// Test callbacks
	testCallbacks: function() {
		this.dt = null;
		alert("TODO");
	},

	// Test commit
	testCommit: function() {
		this.dt = null;
		alert("TODO");
	},

	// Test rollback
	testRollback: function() {
		this.dt = null;
		this.html5Db.transaction(
				function (pTransaction) {
					// First insert: OK
					pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
							[1000035, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", "ROLLBACK_1", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0]
						);
					// Second insert: NOK
					pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
							[1000035, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", "ROLLBACK_2", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0]
						);
					// Third insert: OK
					pTransaction.executeSql("insert into work_orders (technician_id, status, num, flags, priority, duration, creation_date, scheduling_date, expiration_date, description, customer_name, site_name, site_address, site_zip, site_city, site_contact, site_description, site_phone, site_latitude, site_longitude, equipment_name, synchro) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
							[1000035, 4, Math.round(Math.random() * 100000), 4, 3, 120, (new Date()).getTime(), (new Date()).getTime(), (new Date()).getTime(), "This is a fake work order blablablabla blablablabla blablablabla...", "ROLLBACK_3", "PRAXEDO", "62 rue Saint-Lazare", "75009", "Paris", "DESCOS Stéphane", "C'est au 2ème !", "0607501495", "48.7", "2.39", "Samsung Wave (BADA)", 0]
						);
				}, this.transactionErrorCallBack, this.transactionSuccessCallBack.bind(this)
			);
	}
		
};