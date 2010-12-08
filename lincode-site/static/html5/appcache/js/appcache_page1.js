// AppCache page 1 test
html5.tests.appcache.page1 = {
	// Page number
	PAGE_NUM_1: "#1",

	// Initialize page
	init: function() {
		// Set page number
		var el = document.getElementById("span_page_num1");
		el.innerHTML = this.PAGE_NUM_1;
		// Check AppCache support
		if (typeof(window.applicationCache) == "undefined" || window.applicationCache == null) {
			document.getElementById("td_appcache_support").innerHTML = "NOK";
			document.getElementById("tbody_appcache").style.display = "none";
		} else {
			document.getElementById("td_appcache_support").innerHTML = "OK";
            document.getElementById("td_appcache_support").style.backgroundColor="#00FF00";
			html5.tests.appcache.updateAppCacheInfo();
		}		
	}
};