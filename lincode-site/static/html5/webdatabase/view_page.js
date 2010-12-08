
// Database test
var ViewPage = {
	
	ID_CREATE_TABLE_1 : "td_webdatabase_init_createTable_1",
	ID_CREATE_TABLE_2 : "td_webdatabase_init_createTable_2",	
	ID_CREATE_TABLE_3 : "td_webdatabase_init_createTable_3",	
	ID_CREATE_TABLE_4 : "td_webdatabase_init_createTable_4",

	ID_CREATE_TABLES : "td_webdatabase_createTables",
	ID_DROP_TABLES : "td_webdatabase_dropTables",
	ID_ADD : "td_webdatabase_add",
	ID_SELECT : "td_webdatabase_select",
	ID_UPDATE : "td_webdatabase_update",
	ID_DELETE : "td_webdatabase_delete",
	ID_LIMIT : "td_webdatabase_limit",
	
	ID_ERROR_CALLBACK : "td_webdatabase_testErrorCallback", 
	ID_SUCCESS_CALLBACK : "td_webdatabase_testSuccessCallback",		
	ID_ROLLBACK : "td_webdatabase_testRollback",

	ID_SQL_STRING : "td_webdatabase_sql_string",
	ID_SQL_LOCATE : "td_webdatabase_sql_locate",
	ID_SQL_ALIAS : "td_webdatabase_sql_alias",
	ID_SQL_CAST : "td_webdatabase_sql_cast",
	ID_SQL_SUBREQUEST : "td_webdatabase_sql_subrequest",
	ID_SQL_LIKE : "td_webdatabase_sql_like",
	ID_SQL_LIKE_NUM : "td_webdatabase_sql_like_number",
	
	ID_FOREIGN_KEY : "td_foreign_key",
	ID_TRIGGER_INSERT : "td_trigger_insert",
	ID_TRIGGER_UPDATE : "td_trigger_update",
	ID_TRIGGER_DELETE : "td_trigger_delete",
	
	ID_INDEX : "td_index",
	ID_NORMAL : "td_normal",
	ID_MIGRITE : "td_webdatabase_migration",
	
	testError : function(pErrorText, pId){
		document.getElementById(pId).innerHTML= pErrorText ;
		document.getElementById(pId).style.backgroundColor="#FF0000";
	},
	
	testSuccess : function(pSuccessText, pId, pDt){
		if (pDt != null)
			pSuccessText += (" (" + ((new Date()).getTime() - pDt) + " ms)") ;
	    document.getElementById(pId).innerHTML =  pSuccessText;
		document.getElementById(pId).style.backgroundColor="#00FF00";
	}
}

//End of ViewPage
