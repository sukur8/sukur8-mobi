
		//global variables for mapApp and map object
		var myMapApp = new mapApp(false,undefined);
		var myMainMap;

		//pour button
		var buttonTextStyles = {"font-family":"Arial,Helvetica","fill":"dimgray","font-size":10};
		var buttonStyles = {"fill":"white"};
		var shadeLightStyles = {"fill":"rgb(235,235,235)"};
		var shadeDarkStyles = {"fill":"dimgray"};

		function init(evt) {
				init_controle();
		//dynamic layer array that allow loading from database
		var dynamicLayers = new Array();
		//initialize digiLayers (layers that allow digitizing)
		var digiLayers = new Array();

		//define some styles for the map object
	       var zoomRectStyles = {"fill":"none","stroke":"crimson","stroke-width":0.002,"stroke-dasharray":"0.012,0.002"};
	       var highlightStyles = {"stroke":"crimson","stroke-width":0.002};
	       var dragRectStyles = {"fill":"#FFFF00","fill-opacity":0.2};

		 //initialize myMainMap object, you need to adopt the parameters here
		myMainMap = new map("mainMap",16754,167.54,0.6,0,26911,"m",1,true,"coordX","coordY",dynamicLayers,digiLayers,"",zoomRectStyles,highlightStyles,dragRectStyles,"referenceMap","myDragCrossSymbol",4750);
		//create zoom slider
		//zoom slider styles

		var sliderStyles={"stroke":"dimgray","stroke-width":2};
		myMapApp.zoomSlider = new slider("mapZoomSlider","mapZoomSlider",800,75,myMainMap.minWidth,800,165,myMainMap.maxWidth,myMainMap.maxWidth,sliderStyles,10,"sliderSymbol",myMapApp.refMapDragger,true);
			
		//now initialize buttons
		myMapApp.buttons = new Array();
		//button styles, adopt the style settings to match your needs
//var myButton = new button(id,parentNode,functionToCall,buttonType,buttonText,buttonSymbolId,x,y,width,height,textStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,shadowOffset); 
		myMapApp.buttons["zoomIn"] = new button("zoomIn","zoomIn",zoomImageButtons,"rect",undefined,"magnifyerZoomIn",790,47,20,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
		myMapApp.buttons["zoomOut"] = new button("zoomOut","zoomOut",zoomImageButtons,"rect",undefined,"magnifyerZoomOut",790,173,20,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
			
	       myMapApp.buttons["infoButton"] = new switchbutton("infoButton","infoButton",zoomImageSwitchButtons,"rect",undefined,"infoBut",630,220,20,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
		myMapApp.buttons["infoButton"].setSwitchValue(true,false);
		
		myMapApp.buttons["zoomFull"] = new button("zoomFull","zoomFull",zoomImageButtons,"rect",undefined,"magnifyerFull",655,220,20,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
		myMapApp.buttons["zoomManual"] = new switchbutton("zoomManual","zoomManual",zoomImageSwitchButtons,"rect",undefined,"magnifyerManual",680,220,20,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
		myMapApp.buttons["panManual"] = new switchbutton("panManual","panManual",zoomImageSwitchButtons,"rect",undefined,"symbPan",705,220,20,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
			
		   //see if we need to disable buttons
		myMainMap.checkButtons();
			
			//create checkbox array
		myMapApp.checkBoxes = new Array();
			//labeltext styles

		var labeltextStyles = {"font-family":"Arial,Helvetica","fill":"dimgray","font-size":15};
			
			//load function specific to the current map project
	
			loadProjectSpecific();
		}//init
		
		//this function is called after each pan or zoom or change of map extent
		//you can place project specific functions here that need to react on the map extent, e.g. adopting line-widths, loading additional data, etc.

		function loadProjectSpecific() {
		//var curDynLayer="landcover_XinyuYU";
		//var myGeometryToAdd = document.getElementById(curDynLayer);
		//getSingleLayer();
		}



/////////////////////////////////////////////////////////////////////////////	
//		//this function toggles the visibility of a map layer
/////////////////////////////////////////////////////////////////////////////

//=================== Maplayer pour  =================================


		var valide = true;
		var status_capt=false;	//pour controler les actives des selectionlistes de capt et axe 
		var status_axe=false;

	function toggleMapLayer(id,checkStatus,labelText) {

		if(id=="capts")
	        {
		status_capt=checkStatus;
		}
		if(id=="axes")
		{
		status_axe=checkStatus;
		}

		if(valide == true)
		  {
			valide = false;
		        var nid="loadlayer_"+id;

		        var mapLayer = document.getElementById("loadlayer");
			var visibleStatus = "hidden";

			if (checkStatus) {
				visibleStatus = "visible";
		                     getSingleLayer(id);
			}
		        else{
				if(mapLayer.childNodes) {
				var laydlayer_supprimer = document.getElementById(nid);
					if(laydlayer_supprimer)
					mapLayer.removeChild(laydlayer_supprimer);
			    }
		               }
			mapLayer.setAttributeNS(null,"visibility",visibleStatus);      
		  }//if (valide)
		  valide = true;
		}// fin de toggleMaoLayer

		function getSingleLayer(id) {
		document.getElementById("loadingData").setAttributeNS(null,"visibility","visible");

		var myUrlString = "./document_xml/"+id+".xml";
		//alert(myUrlString);
		getNode(myUrlString,"loadlayer");
		}
	
		function getNode(myUrlString,parentID){
		if(window.getURL)
		{
			getURL(myUrlString,function (data) {
			//check if data has a success property
			if (data.success) {
			//parse content of the XML format to the variable "node"
			var string = '';
			string=data.content;
			var node = parseXML(string, document);
			addGeom(node,parentID);
			}
			else {
			alert("something went wrong with dynamic loading of geometry!");
			}
			});
		}
		else if (window.XMLHttpRequest) {

		function XMLHttpRequestCallback() {
		//alert(xmlRequest.responseXML);
		if(xmlRequest.readyState==4)
		{var node = document.importNode(xmlRequest.responseXML.documentElement,true);
		addGeom(node,parentID);
		}
		}
		var xmlRequest = null;
		xmlRequest = new XMLHttpRequest();
		xmlRequest.open("GET",myUrlString,true);
		xmlRequest.onreadystatechange = XMLHttpRequestCallback;
		xmlRequest.send(null);
		}
		//write an error message if either method is not available
		else {
		alert("your browser/svg viewer neither supports window.getURL nor window.XMLHttpRequest!");
		}
		}//getNode
		function addGeom(node,parentID) {
		var myGeometryToAdd = document.getElementById(parentID);
		myGeometryToAdd.appendChild(node);
		document.getElementById("loadingData").setAttributeNS(null,"visibility","hidden");
		//myGeometryToAdd.setAttributeNS(null,"visibility","visible");
		}

/////////////////////////////////////////////////////
//fonctionnalite: initialiser tabgroup
//////////////////////////////////////////////////////
            function init_controle() {
                window.setTimeout("initTabgroup()",0);
         }

            function initTabgroup() {
                //first a few style array literals
                var tabStyles = {"fill":"lightgray","stroke":"dimgray","stroke-width":1,"cursor":"pointer"};
                var tabwindowStyles = {"fill":"#C0C0FF","stroke":"dimgray","stroke-width":2,"fill-opacity":"0.2"};
                var tabtextStyles = {"font-family":"Arial,Helvetica","font-size":25,"fill":"dimgray","font-weight":"normal"};
		var tabtextStylesCenter = {"font-family":"Arial,Helvetica","font-size":25,"fill":"dimgray","font-weight":"normal","text-anchor":"middle"};
		//setting tabTitles
	    var tabTitlesMulti = new Array("Axes","Arcs","Capteurs");
	    tabgroupTriangle = new tabgroup("tabgroupTriangle","tabgroupTriangle",630,280,380,470,35,"rect","round",10,5,tabStyles,"rgb(130,130,255)",tabwindowStyles,tabtextStylesCenter,tabTitlesMulti,0,true,tabChanged);
		//add new content
	    tabgroupTriangle.addContent("listAxes",0,true);	
	    tabgroupTriangle.addContent("listArcs",1,true);
	    tabgroupTriangle.addContent("listCapteurs",2,true);
		//activate tab
	    tabgroupTriangle.activateTabByIndex(0,false);
		initAxes();
    	}//fin du initTabgroup
		

	   var init_Capteurs = true;
	   var init_Arcs = true;	
	   var init_Axes = true;

            function tabChanged(id,title,index) {
               // alert("tab nr "+index+" with title '"+title+"' was activated in tabgroup '"+id+"'");
		
		if(title=="Capteurs")
		{
			if(init_Capteurs)
			{
			initCapteurs();
			init_Capteurs = false;
			}
		}
		else if(title=="Arcs")
		{
			if(init_Arcs)
			{
			initArcs();
			init_Arcs = false;	
			}
		}
		else if(title=="Axes")
		{
			if(init_Axes)
			{
			initAxes();
			init_Axes = false;
			}	
		}

            }//fin du tabchange

//////////////////////////////////////////////////
//initialiser tab capteurs
/////////////////////////////////////////////////

var sliderStyles={"stroke":"dimgray","stroke-width":3};
var invisSliderWidth = 15;

	function initCapteurs(){

		//selectjour
		//checkedbox capteurs	
	var checkCapteurs = new checkBox("capts","checkCapteurs",260,55,"checkBoxRect","checkBoxCross",false,"Capts",labeltextStyles,labelDistance,labelYOffset,undefined,toggleMapLayer);

	var capts =   ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","202","203","204","205","206","207","208","209","210","211","212","213","214","215","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","235","237","238","239","240","241","242","243","244","245","248","249","252","253","254","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","273","274","275","276","277","278","279","280","281","282","283","284","285","286","287","288","289","290","291","292","293","294","297","298","299","300","301","302","303","306","307","308","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","335","336","337","338","339","340","341","342","343","344","345","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","375","376","377","378","379","380","381","382","383","384","385","386","387","388","389","390","391","392","393","394","395","396","397","398","399","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","416","417","418","419","420","421","422","423","424","426","427","428","429","430","431","435","439","440","442","443","444","455","457","458","460","461","462","463","483","484","489","828","845","846","847","848"];
var selIdsCapts = new selectionList("selIdsCapts","selectIdsCapt",capts,70,150,75,selBoxCellHeight,selBoxTextpadding,5,selBoxtextStyles,selBoxStyles,selBoxScrollbarStyles,selBoxSmallrectStyles,selBoxHighlightStyles,selBoxTriangleStyles,0,false,true,selectIdsCaptsActive);	
	var dates = ["2002-03-01","2002-03-02","2002-03-03","2002-03-04","2002-03-05","2002-03-06","2002-03-07","2002-03-08","2002-03-09","2002-03-10","2002-03-11","2002-03-12","2002-03-13","2002-03-15","2002-03-16","2002-03-17","2002-03-18","2002-03-19","2002-03-20","2002-03-21","2002-03-22","2002-03-23","2002-03-24","2002-03-25","2002-03-26","2002-03-27","2002-03-29","2002-03-30","2002-04-01","2002-04-02","2002-04-03","2002-04-04","2002-04-05","2002-04-06","2002-04-07","2002-04-08","2002-04-09","2002-04-10","2002-04-11","2002-04-12","2002-04-13","2002-04-14","2002-04-15","2002-04-16","2002-04-17","2002-04-18","2002-04-19","2002-04-20","2002-04-21","2002-04-22","2002-04-23","2002-04-24","2002-04-25","2002-04-26","2002-04-27","2002-04-28","2002-04-29","2002-04-30","2002-05-01","2002-05-04","2002-05-05","2002-05-06","2002-05-07","2002-05-08","2002-05-09","2002-05-10","2002-05-11","2002-05-12","2002-05-14","2002-05-15","2002-05-17","2002-05-18","2002-05-19","2002-05-20","2002-05-21","2002-05-22","2002-05-23","2002-05-24","2002-05-25","2002-05-26","2002-05-27","2002-05-28","2002-05-29","2002-05-30","2002-05-31"];
    var selDatesCapts = new selectionList("selDatesCapts","selectDatesCapts",dates,120,10,75,selBoxCellHeight,selBoxTextpadding,5,selBoxtextStyles,selBoxStyles,selBoxScrollbarStyles,selBoxSmallrectStyles,selBoxHighlightStyles,selBoxTriangleStyles,0,false,true,selectDatesCaptsActive);
//var myButton = new switchbutton(id,parentNode,functionToCall,buttonType,buttonText,buttonSymbolId,x,y,width,height,textStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,shadowOffset);
	
    var captbutton = new button("captbutton","captbuttons",captbuttonPressed,"rect","Valider",undefined,240,75,50,20,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
	//var slider = new slider(id,parentNode,x1,y1,value1,x2,y2,value2,startVal,sliderStyles,invisSliderWidth,sliderSymb,functionToCall,mouseMoveBool);

    var slider1 = new slider	("slider1","slidercapt",60,150,0,160,150,100,50,sliderStyles,invisSliderWidth,"sliderSymbol",showVal,true);
		
 }// fin du initCapteurs()

var date_capt="2002-03-01";
var id_capt= "1";
var capt_der;
function selectIdsCaptsActive(selBoxName,ordreNr,arrayVal){
	id_capt = arrayVal;
	if(status_capt)
	{
		if(capt_der)
		{
			capt_der.setAttribute("stroke","gery");	
			capt_der.setAttribute("stroke-width","1");
		}	

		var obj = document.getElementById("mainMapGroup");
		var capts = obj.getElementsByTagName("circle");
		for(var i = 0; i < capts.length; i++)
	  	{
		// ici c'est le probleme de IE, il peut pas retirer les id_capt dans svg.
			if(capts.item(i).getAttribute("id_capt") == arrayVal)
		   	{
			var capt = capts.item(i);
		   //alert(capts.item(i).getAttribute("cx")+" "+capts.item(i).getAttribute("cy"));
				capt.setAttribute("stroke","blue");
				capt.setAttribute("stroke-width","150");
				capt_der = capt;
		   	break ;
		   	}
	  	}	
	}//if
}

function selectDatesCaptsActive(selBoxName,ordreNr,arrayVal){

	date_capt = arrayVal;
	//document.getElementById("loadingData").setAttributeNS(null,"visibility","visible");
	//ajaxrequete("./controle_xml/arcs_list.php?jour="+arrayVal,1);

}

function captbuttonPressed(){
		var parentnode = document.getElementById("tabletrace");
		if(document.getElementById("reeltrace"))
		parentnode.removeChild(document.getElementById("reeltrace"));

	instant = 0;
	ajaxrequete("./controle_xml/capts_reel.php?jour="+date_capt+"&id="+id_capt,3);
}

var valsimulation = 50;

	function showVal(valType,groupId,value) {
		//valType can be "change" (on mouse move or click) or "release" (mouseup or mouseout)
		if (valType == "change") {
			valsimulation =	Math.round(value);
		statusChange(valsimulation);
			}
		if (valType == "release") {
			valsimulation = Math.round(value);
		statusChange(valsimulation);
		}
	}


////////////////////////////////////////////////////////////////////
//initialiser tab Axes
///////////////////////////////////////////////////////////
function initAxes(){

		var checkAxes = new checkBox("axes","checkAxes",250,55,"checkBoxRect","checkBoxCross",false,"Axes",labeltextStyles,labelDistance,labelYOffset,undefined,toggleMapLayer);

	var axes = ["AXE 1    Lafourcade-Jeanne D'arc","AXE 2    MONUMENT-ROGUET","AXE 3    Roosvelt-Capitole","AXE 4    Quai de la Daurade","AXE 5    Saint Pierre-Poids de L'huile","AXE 6    Monument Resistance-Arc-Bazacle","AXE 7    Verdier-Guesdes-Bazacle","AXE 8    Bazacle-Arc-Monument","AXE 9     Bazacle-Guesdes-Verdier","AXE 10    Rue la Pomme","AXE 11    Pt Jumeaux-Guilhemery","AXE 12    Pt Guilhemery-Jumeau","AXE 13    Bayonne-Demoiselles","AXE 14    Demoselles-Bayonne","AXE 15    Sabatier-Pont Montaudran","AXE 16    Demoiselles-Montaudran","AXE 17    Lasbordes-Monument","AXE 18    REVEL-Pt Guilhemery","AXE 19    Chaubet-Brunaud","AXE 20    Ormeau-Pt Demoiselles","AXE 22    C.Pujol-Rte Castres","Axe 23    Monument-Rieux-Revel","AXE 24    Brunaud Cretes - Plana Chaubet","AXE 25    St Exupery","AXE 26    Amidonier-Ecole de Commerce","AXE 27    Rn20-Minimes-A.Bernard","AXE 28    RN88-Pt Matabiau-J.Arc","AXE 29    Agde-Roseraie-Roosvelt","AXE 30    Heracles-Pt Jumeaux","AXE 31    A.Bernard-Minime-RN20","AXE 32    Pt Matabiau-RN88","AXE 33    Roosvelt-Rte Agde","AXE 34    Lardenne-Lombez-St Ciprien","AXE 35    Grande-Bretagne","AXE 36    St Simon-Cugnaux","AXE 37    Desbals-Arc St Cyprien","AXE 38    St Cyprien-Lombez-Lardenne","AXE 39    Gde Bretagne-Baylac","AXE 40    Cugnaux-St Simon","AXE 41    Gazagne-Desbals","AXE 43    Rte d'Espagne-Fer  Cheval","AXE 44    Demoiselles-Mistral","AXE 45     Palays-Lafourcade","AXE 46    La Plaine-Seysse","AXE 48    Fer  Cheval-Rte d'Espagne","AXE 49    Mistral-Demoiselles","AXE 50    Lafourcade-Palays","AXE  52    MARTINET-St CYPRIEN","AXE 53    SAINT CYPRIEN - CUGNAUX","AXE 54    CUGNAUX - SAINT CYPRIEN","AXE 55    Roguet-Martinet","AXE56    RAMIER - LAFOURCADE","AXE 57    LAFOURCADE - GUESDES  SACHET","AXE58    GUESDE TRIBUNAL - LAFOURCADE","AXE 59    LAFOURCADE - RAMIER","AXE 64    SABATIER - BOULINGRIN","AXE65    HERACLES - PONT BEARNAIS","AXE 66    St Cyprien-St Pierre","AXE 67     St Pierre-Vie","AXE 70    Seysse-La Plaine","AXE 71    Montaudran-Lespinet","AXE 72    CIGOGNE RAMONVILLE-ENTREE VILLE","AXE 73    SAUGES-SORTIE VERS RAMONVILLE","AXE 74    VIALA-MARNE","AXE 75    MARNE-VIALA","AXE 76    TASSIGNY- RAMIER","AXE 77    RAMIER-TASSIGNY","AXE 78    TOEC-GRANDE BRETAGNE","AXE 79    GRANDE BRETAGNE-TOEC","AXE 80    PONTS JUMEAUX-BARRIERE DE PARIS","AXE 81    BARRIERE DE PARIS-PONTS JUMEAUX","AXE 82    BARRIERE DE PARIS-CAZENEUVE","AXE 83    CAZENEUVE-BARRIERE DE PARIS","AXE 84    CAZENEUVE-NETWILLER","AXE 85    NETWILLER-CAZENEUVE","AXE 86    BARRIERE DE PARIS-MOULIS FRONTON","AXE 87    MOULIS-BARRIERE DE PARIS","AXE 88    CROIX BENITE-BATRHES CURIE","AXE 89    BARTHE CURIE-CROIX BENITE","AXE 90    AGDE ATLANTA - ALBI ATLANTA","AXE 91    ALBI ATLANTA -  AGDE ATLANTA","AXE 92    PLANA CHAUBET-ROSERAIE","AXE 93    ROSERAIE-PLANA GUILLAUMET","AXE 94    CRETES CHAUBET-CRETES CASTRES","AXE 95    CRETES CASTRES-CRETES GLOIRE","AXE 96    ABATTOIRS-Grde BRETAGNE","AXE 97    GRANDE BRETAGNE - ABATTOIRS"];

	var selAxes = new selectionList("selAxes","selectAxes",axes,300,10,80,selBoxCellHeight,selBoxTextpadding,5,selBoxtextStyles,selBoxStyles,selBoxScrollbarStyles,selBoxSmallrectStyles,selBoxHighlightStyles,selBoxTriangleStyles,0,false,true,selectAxesActive);
}

function checkAxesAct(id,status,label) {
		;		
}//fin du checkAxes

var axe_der;
function selectAxesActive(selBoxName,AxesNr,arrayVal){

	//alert(document.getElementById("libelle").firstChild);
	
	document.getElementById("libelle").removeChild(document.getElementById("libelle").firstChild);
	document.getElementById("libelle").appendChild(document.createTextNode(arrayVal));

	if(status_axe)	
	{
		if(axe_der)
		{
		axe_der.setAttribute("stroke","#0000FF");
		axe_der.setAttribute("stroke-width","8");
		}	
		var axe = document.getElementById(AxesNr+1);
	
		if(axe)
		{
		axe.setAttribute("stroke","#FF0000");
		axe.setAttribute("stroke-width","100");
		axe_der = axe;
		}
		else{
			alert("pas trouve!");
		}
	}
}

//////////////////////////////////////////////////////
//initialiser tab Arc
//////////////////////////////////////////////////////

//variable pour slider du selectlist
//var myMapApp = new mapApp(false,undefined);
	//variable pour checkbox

var labeltextStyles = {"fill":"dimgray","font-size":18};
	//variables for label placement
var labelDistance = 20;
var labelYOffset = 10;		
	//variable pour selectlist
var selBoxCellHeight = 20;
var selBoxTextpadding = 5;
var selBoxtextStyles = {"font-family":"Arial,Helvetica","font-size":15,"fill":"dimgray"};
var selBoxStyles = {"stroke":"dimgray","stroke-width":1,"fill":"white"};
var selBoxScrollbarStyles = {"stroke":"dimgray","stroke-width":1,"fill":"whitesmoke"};
var selBoxSmallrectStyles = {"stroke":"dimgray","stroke-width":1,"fill":"lightgray"};
var selBoxHighlightStyles = {"fill":"dimgray","fill-opacity":0.3};
var selBoxTriangleStyles = {"fill":"dimgray"};	


function initArcs(){
	setTimeout("init_selectDates()",0);
	var checkArcs = new checkBox("arcs","checkArcs",250,55,"checkBoxRect","checkBoxCross",true,"Arcs",labeltextStyles,labelDistance,labelYOffset,undefined,checkArcsAct);

}

	function init_selectDates(){
	ajaxrequete("./controle_xml/dates_list.php?",0);
	}

	function selectDatesActive(selBoxName,dateNr,arrayVal) {

	document.getElementById("loadingData").setAttributeNS(null,"visibility","visible");
       
	document.getElementById("date").removeChild(document.getElementById("date").firstChild);
	document.getElementById("date").appendChild(document.createTextNode(arrayVal));

	ajaxrequete("./controle_xml/arcs_list.php?jour="+arrayVal,1);
	}

	function selectArcsActive(selBoxName,captNr,arrayVal) {
		var st = arrayVal.split("\-");
		//alert(arrayVal);
		//alert(st[1]);
		ajaxrequete("./controle_xml/table_change.php?type="+st[1],2);
	}

	function checkArcsAct(id,status,label) {

        var svgobj = document.getElementById("s_arcs");
	if (status) {
		svgobj.setAttributeNS(null,"visibility", "visible");
	}	
	else{
		svgobj.setAttributeNS(null,"visibility", "hidden");
	}
}//fin du checkArcsAct
