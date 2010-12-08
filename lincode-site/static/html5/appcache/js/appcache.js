// AppCache test
html5.tests.appcache = {
	// Display current date
	displayCurrentDate: function() {
		var el = document.getElementById("td_appcache_dt_current");
		el.innerHTML = html5.utils.date.formatDateAsFr_yMdHmsS_UTC(new Date());
	},

	// Update cache info
	updateAppCacheInfo: function() {
		this.updateBrowserStatus();
		this.updateFromCache();
		this.updateCacheStatus(null);
	},

	// Update browser status
	updateBrowserStatus: function() {
		document.getElementById("td_appcache_browser_status").innerHTML = window.navigator.onLine ? "Online" : "Offline";
	},

	// Update from cache
	updateFromCache: function() {
		document.getElementById("td_appcache_from_cache").innerHTML = (window.applicationCache.status == 0) ? "False" : "True";
	},

	// Update cache status
	updateCacheStatus: function(pStatus) {
		var statusText;
		var appcache = window.applicationCache;
		// Get cache status label
		switch (appcache.status) {
			case appcache.UNCACHED: statusText = "Uncached"; break;
			case appcache.IDLE: statusText = "Idle"; break;
			case appcache.CHECKING: statusText = "Checking"; break;
			case appcache.DOWNLOADING: statusText = "Downloading"; break;
			case appcache.UPDATEREADY: statusText = "UpdateReady"; break;
			case appcache.OBSOLETE: statusText = "Obsolete"; break;
			default: statusText = "Unknown"; break;
		}
		// Update cache status display
		document.getElementById("td_appcache_cache_status").innerHTML = statusText;
		// Log the update
		var tdLogs = document.getElementById("td_appcache_cache_logs_body");
		tdLogs.appendChild(document.createTextNode((pStatus == null ? "Current cache status = " : ("Event '" + pStatus + "' fired, new cache status = ")) + statusText));
		tdLogs.appendChild(document.createElement("br"));
	},

	// Add event listeners
	addEventListeners: function() {
		// Browser status
		window.addEventListener("online", this.updateBrowserStatus.bind(this), false);
		window.addEventListener("offline", this.updateBrowserStatus.bind(this), false);
		// Cache process
		window.applicationCache.addEventListener("checking", this.cacheStatusListenerChecking.bind(this), false);
		window.applicationCache.addEventListener("error", this.cacheStatusListenerError.bind(this), false);
		window.applicationCache.addEventListener("noupdate", this.cacheStatusListenerNoupdate.bind(this), false);
		window.applicationCache.addEventListener("downloading", this.cacheStatusListenerDownloading.bind(this), false);
		window.applicationCache.addEventListener("progress", this.cacheStatusListenerProgress.bind(this), false);
		window.applicationCache.addEventListener("updateready", this.cacheStatusListenerUpdateready.bind(this), false);
		window.applicationCache.addEventListener("cached", this.cacheStatusListenerCached.bind(this), false);
		window.applicationCache.addEventListener("obsolete", this.cacheStatusListenerObsolete.bind(this), false);
	},

	// Update cache
	updateCache: function() {
		try {
			window.applicationCache.update();
		} catch (e) {
			//alert(e == INVALID_STATE_ERR ? "Invalid state" : "Unknown error");
			alert("Error");
		}
	},

	// Swap cache
	swapCache: function() {
		try {
			window.applicationCache.swapCache();
		} catch (e) {
			//alert(e == INVALID_STATE_ERR ? "Invalid state" : "Unknown error");
			alert("Error");
		}
	},

	// Reset logs
	resetLogs: function() {
		document.getElementById("td_appcache_cache_logs_body").innerHTML = "";
	},

	// Cache status event listener - Checking
	cacheStatusListenerChecking: function() {
		this.updateCacheStatus("checking");
	},

	// Cache status event listener - Error
	cacheStatusListenerError: function() {
		this.updateCacheStatus("error");
	},

	// Cache status event listener - Noupdate
	cacheStatusListenerNoupdate: function() {
		this.updateCacheStatus("noupdate");
	},

	// Cache status event listener - Downloading
	cacheStatusListenerDownloading: function() {
		this.updateCacheStatus("downloading");
	},

	// Cache status event listener - Progress
	cacheStatusListenerProgress: function() {
		this.updateCacheStatus("progress");
	},

	// Cache status event listener - Updateready
	cacheStatusListenerUpdateready: function() {
		this.updateCacheStatus("updateready");
	},

	// Cache status event listener - Cached
	cacheStatusListenerCached: function() {
		this.updateCacheStatus("cached");
	},

	// Cache status event listener - Obsolete
	cacheStatusListenerObsolete: function() {
		this.updateCacheStatus("obsolete");
	}
};