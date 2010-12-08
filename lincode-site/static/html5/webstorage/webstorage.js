
// Storage test
html5.tests.storage = {
	// Initialize page
	initPage: function() {
		// Check session storage support
		if (typeof(sessionStorage) == "undefined" || sessionStorage == null) {
			document.getElementById("td_webstorage_session_support").innerHTML = "NOK";
			document.getElementById("tbody_webstorage_session").style.display = "none";
		} else {
			document.getElementById("td_webstorage_session_support").innerHTML = "OK";
            document.getElementById("td_webstorage_session_support").style.backgroundColor="#00FF00";
			this.updateStorageInfo("session");
		}
		// Check local storage support
		if (typeof(localStorage) == "undefined" || localStorage == null) {
			document.getElementById("td_webstorage_local_support").innerHTML = "NOK";
			document.getElementById("tbody_webstorage_local").style.display = "none";
		} else {
			document.getElementById("td_webstorage_local_support").innerHTML = "OK";
            document.getElementById("td_webstorage_local_support").style.backgroundColor="#00FF00";
			this.updateStorageInfo("local");
		}
	},

	// Add event listeners
	addEventListeners: function() {
		window.addEventListener("storage", this.storageEventHandler, false);
	},

	// Storage event handler
	storageEventHandler: function(pEvent) {
		var str = "Key = " + pEvent.key;
		str += "\nOld value = " + pEvent.oldValue;
		str += "\nNew value = " + pEvent.newValue;
		str += "\nURL = " + pEvent.url;
		str += "\nStorage area = " + pEvent.storageArea;
		str += "\nWindow = " + pEvent.source;
		alert(str);
	},

	// Update storage info
	updateStorageInfo: function(pStorage) {
		this.updateStorageLength(pStorage);
		this.listStorage(pStorage);
	},

	// Clear storage
	clearStorage: function(pStorage) {
		window[pStorage + "Storage"].clear();
		this.updateStorageInfo(pStorage);
	},

	// Update storage length
	updateStorageLength: function(pStorage) {
		document.getElementById("td_webstorage_" + pStorage + "_length").innerHTML = window[pStorage + "Storage"].length;
	},

	// Get storage key
	getKey: function(pStorage) {
		var index = document.getElementById("input_webstorage_" + pStorage + "_key_index").value;
		alert(window[pStorage + "Storage"].key(index));
	},

	// Set storage value
	setStorageValue: function(pStorage) {
		var key = document.getElementById("input_webstorage_" + pStorage + "_set_key").value;
		var value = document.getElementById("input_webstorage_" + pStorage + "_set_value").value;
		try {
			window[pStorage + "Storage"].setItem(key, value);
		} catch (e) {
			//alert(e == QUOTA_EXCEEDED_ERR ? "Quota exceeded" : "Unknown error");
			alert("Error");
		}
		this.updateStorageInfo(pStorage);
	},

	// Get storage value
	getStorageValue: function(pStorage) {
		var key = document.getElementById("input_webstorage_" + pStorage + "_get_key").value;
		alert(window[pStorage + "Storage"].getItem(key));
	},

	// Delete storage value
	deleteStorageValue: function(pStorage) {
		var key = document.getElementById("input_webstorage_" + pStorage + "_delete_key").value;
		window[pStorage + "Storage"].removeItem(key);
		this.updateStorageInfo(pStorage);
	},

	// List storage values
	listStorage: function(pStorage) {
		var str = "";
		for (var i = 0; i < window[pStorage + "Storage"].length; i++) {
			var key = window[pStorage + "Storage"].key(i);
			str += i + ":" + key + ":" + (key.indexOf("_bigKey", 0) >= 0 ? "_bigValue_" : window[pStorage + "Storage"].getItem(key));
			if (i < window[pStorage + "Storage"].length - 1)
				str += "<br />";
		}
		document.getElementById("td_webstorage_" + pStorage + "_list").innerHTML = str;
	},

	// Store x Ko
	store: function(pStorage) {
		var nb = +(document.getElementById("input_webstorage_" + pStorage + "_store_nb").value);
		var size = +(document.getElementById("input_webstorage_" + pStorage + "_store_size").value) * 1000;
		var value = "";
		for (var i = 0; i < size; i++)
			value += "x"; // So beautiful...
		var dt1 = (new Date()).getTime();
		for (var j = 0; j < nb; j++) {
			try {
				window[pStorage + "Storage"].setItem("_bigKey" + j + "_", value);
			} catch (e) {
				this.updateStorageInfo(pStorage);
				//alert(e == QUOTA_EXCEEDED_ERR ? "Quota exceeded" : "Unknown error");
				alert("Error");
				return;
			}
		}
		var dt2 = (new Date()).getTime();
		this.updateStorageInfo(pStorage);
		alert("Big storage SUCCESS (store: " + (dt2 - dt1) + " ms ; list: " + ((new Date()).getTime() - dt2) + " ms)");
	}
};
