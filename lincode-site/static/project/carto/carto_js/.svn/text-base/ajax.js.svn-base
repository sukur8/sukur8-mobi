var xmlHttp;
function ajaxrequete(url, traitNbr) {
   xmlHttp = GetXmlHttpObject();
   if (xmlHttp == null)
   {
	alert ("votre navigateur ne support pas ajax!")
	return ;	
	}	
           xmlHttp.onreadystatechange  = function() {
		if(traitNbr == 0)
			jourlist();
		else if(traitNbr == 1)
			captlist();
		else if(traitNbr == 2)
			capttable();
		else if(traitNbr ==3)
			captreel();
		else alert("l'erreur du traitement");
		};
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
}

function GetXmlHttpObject()
{
	if(window.XMLHttpRequest)
	{
	return new XMLHttpRequest();
	}
	else{
               if(window.Ajax_XMLHttpRequestProgID){
	        return new ActiveXObject(window.Ajax_XMLHttpRequestProgID);
	       }
               else {
		var progIDs = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
		     for (var i = 0; i < progIDs.length; ++i) {
		       var progID = progIDs[i];
		        try{
			var x = new ActiveXObject(progID);
			 window.Ajax_XMLHttpRequestProgID = progID;
			 return x;	
			}catch(e){}
		      }//for
	          }
	 }
	return null;
}//fin du GetXmlHttpObject


var selArc;
function  jourlist(){
   		// only if req is "loaded"
      if (xmlHttp.readyState == 4) {
       		// only if "OK"
      if (xmlHttp.status == 200 || xmlHttp.status == 304) {
        var results = xmlHttp.responseText;
	var st = results.split("\,");
	       //arrays for selectionList data	
	var dates = st[0].split("\.");
	var arcs = st[1].split("\.");
	//usage: var newSelList = new selectionList(groupId,parentNode,elementsArray,width,xOffset,yOffset,cellHeight,textPadding,heightNrElements,textStyles,boxStyles,scrollbarStyles,smallrectStyles,highlightStyles,triangleStyles,preSelect,openAbove,putOnTopOfParent,functionToCall);
	var selDatesArc = new selectionList("selDatesArc","selectDatesArc",dates,130,50,50,selBoxCellHeight,selBoxTextpadding,5,selBoxtextStyles,selBoxStyles,selBoxScrollbarStyles,selBoxSmallrectStyles,selBoxHighlightStyles,selBoxTriangleStyles,0,false,true,selectDatesActive);
	selArc = new selectionList("selArc","selectArcs",arcs,140,50,260,selBoxCellHeight,selBoxTextpadding,5,selBoxtextStyles,selBoxStyles,selBoxScrollbarStyles,selBoxSmallrectStyles,selBoxHighlightStyles,selBoxTriangleStyles,0,false,true,selectArcsActive);
      	}
   else {
       	alert("ajax error:\n" + xmlHttp.statusText);
        } 
     }
}

function changercouleur(id_arc, couleur)
{
	var svgobj= document.getElementById("loadlayer_capts");
	var svg_arc = document.getElementsByTagName("polyline");
	//alert(svg_arc.item(0).getAttributeNS(null,"stroke", "false"));
	for(var i = 0; i < svg_arc.length; i++)
	  {
		// ici c'est le probleme de IE, il peut pas retirer les id_capt dans svg.
		if(svg_arc.item(i).getAttribute("id_arc") == id_arc)
		   {
		   svg_arc.item(i).setAttribute("stroke", couleur);

	           if(svgobj != null )
		    svgobj.childNodes.item(i).setAttribute("fill", couleur);
		   break ;
		   }
	  }

	//alert(svg_arc.item(0).getAttributeNS(null,"stroke", "false"));
}// changercouleur


function  captlist(){
   		// only if req is "loaded"
   if (xmlHttp.readyState == 4) {
       		// only if "OK"
      if (xmlHttp.status == 200 || xmlHttp.status == 304) {

        var results = xmlHttp.responseText;
	var st = results.split("\.");
	//arrays for selectionList data
	var arcs = st;
		//usage: var newSelList = new selectionList(groupId,parentNode,elementsArray,width,xOffset,yOffset,cellHeight,textPadding,heightNrElements,textStyles,boxStyles,scrollbarStyles,smallrectStyles,highlightStyles,triangleStyles,preSelect,openAbove,putOnTopOfParent,functionToCall)
		//--ici on ne supprime pas le selectlist avant, seulement le couverte
		//--groupid ???? 
     selArc.removeSelectionList();

     selArc = new selectionList("selArc","selectArcs",arcs,140,50,260,selBoxCellHeight,selBoxTextpadding,5,selBoxtextStyles,selBoxStyles,selBoxScrollbarStyles,selBoxSmallrectStyles,selBoxHighlightStyles,selBoxTriangleStyles,0,false,true,selectArcsActive);	
	for(var i=0; i< arcs.length; i++)
	{
	var arcinf =arcs[i].split("\-");
	var arcID = arcinf[0].split("\:");
	var ID = arcID[1];
	var arctype = arcinf[1];  
			 if(arctype == "Type 1")
				arctype = "#FF0000";
			else if(arctype == "Type 2")
				arctype = "#FF5555";
			else if(arctype == "Type 3")
				arctype = "#FF9999";
			else if(arctype == "Type 4")
				arctype = "#FFCCCC";
			else if(arctype == "Atypique 1")
				arctype ="#0000FF";
		    	else if(arctype == "Atypique 2")
				arctype ="#CCCCFF";
			else if(arctype == "Atypique 3")
				arctype ="#55FF44";
			if(arctype!="Inconnu")
               		{
			 changercouleur(ID,arctype);
			}
	}//fin du for	
document.getElementById("loadingData").setAttributeNS(null,"visibility","hidden");

    }//fin du if
   else {
       	alert("ajax error:\n" + xmlHttp.statusText);
        } 
  }//fin du if

}//

function  capttable(){
   		// only if req is "loaded"
   if (xmlHttp.readyState == 4) {
       		// only if "OK"
      if (xmlHttp.status == 200 || xmlHttp.status == 304) {
        var results = xmlHttp.responseText;
	//alert(results);
	var st = results.split("\|");

	var node_parent =document.getElementById("trace").parentNode;
	node_parent.removeChild(document.getElementById("trace"));

	var color = "#FF0000";
	if(st[0]=="Type 1") 
		color = "#FF0000";
	else if(st[0]=="Type 2")
		color = "#FF5555";
	else if(st[0]=="Type 3")
		color ="#FF9999";
	else if(st[0]=="Type 4")
		color ="#FFCCCC";
	else if(st[0]=="Atypique 1")
		color ="#0000FF";
	else if(st[0]=="Atypique 2")
		color ="#5555FF";
	else if(st[0]=="Atypique 3")
		color ="#55FF44";
	else if(st[0]=="Inconnu")
		{
	var newRect = document.createElementNS(svgNS,"polyline");
	newRect.setAttributeNS(null,"id", "trace");
	node_parent.appendChild(newRect);
		return;
		}
   	var newRect = document.createElementNS(svgNS,"polyline");
	newRect.setAttributeNS(null,"id", "trace");
        newRect.setAttributeNS(null,"points", st[1]);		
        newRect.setAttributeNS(null,"stroke",color);
        newRect.setAttributeNS(null,"stroke-width",3);	
        newRect.setAttributeNS(null,"fill","none");
	node_parent.appendChild(newRect);
		}		
   else {
       	alert("ajax error:\n" + xmlHttp.statusText);
        } 
  }
}

function captreel(){

      if (xmlHttp.readyState == 4) {
       		// only if "OK"
      if (xmlHttp.status == 200 || xmlHttp.status == 304) {

	var results = xmlHttp.responseText;
	//alert(results);
	if(results == "pas_de_donnees")
	{
	clearTimeout(t);
	document.getElementById("reelchiffre").removeChild(document.getElementById("reelchiffre").firstChild);
	document.getElementById("reelchiffre").appendChild(document.createTextNode("rien"));			
		var parentnode = document.getElementById("tabletrace");
		if(document.getElementById("reeltrace"))
		parentnode.removeChild(document.getElementById("reeltrace"));

	}
	else
	{
	valeur =  results.split("\-");
	affichertable(valeur);
	}
     }

  }
}
var t;
var valeur;
var instant = 0;
var newg;
function affichertable(){
	
	if(instant==0)
	{
	newg = document.createElementNS(svgNS,"g");
	newg.setAttributeNS(null, "id","reeltrace");
	document.getElementById("tabletrace").appendChild(newg);
	}

	if(instant<95)
	{
	var x=instant*2.63;
	var y=200-valeur[instant];
	var width=2.63;
	var height=valeur[instant];
	var newRect = document.createElementNS(svgNS,"rect");
        newRect.setAttributeNS(null,"x", x);		
        newRect.setAttributeNS(null,"y", y);
        newRect.setAttributeNS(null,"width",width);	
        newRect.setAttributeNS(null,"height",height);			
        newRect.setAttributeNS(null,"fill","blue");
	newg.appendChild(newRect);

	var reel = (valeur[instant]*16.237 - 1999.4)/2 ;
	reel = Math.round(reel)/100;
		
	document.getElementById("reelchiffre").removeChild(document.getElementById("reelchiffre").firstChild);
	document.getElementById("reelchiffre").appendChild(document.createTextNode(reel));

	instant = instant + 1;	
	t=window.setTimeout("affichertable()",100*valsimulation);		
	}
}
