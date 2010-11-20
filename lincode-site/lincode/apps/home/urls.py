#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# $Id: urls.py 19 2009-10-19 22:33:46Z guolin.mobi $
#

from django.conf.urls.defaults import patterns

urlpatterns = patterns( "lincode.apps.home.views",
   
	( r"^$"                                   		, "home"     ), 
	( r"^home/$"                     	  	  		, "home"     ),
	( r"^lang/$"                              		, "change_language"    ),
	    
	( r"^about/(?P<name>\w+)/$"						, "about"   ),
    ( r"^project/$"									, "project"  ),
	
    ( r"^project/(?P<name>\w+)/$"					, "project"  ),
    
	( r"^project/douban/(?P<subject>\w+)/$"			, "search"   ),
	( r"^project/douban/(?P<subject>\w+)/result/$"	, "search_result"),
    
	( r"^admin/$" 									, "admin"   ),
	( r"^admin/(?P<name>\w+)/$" 					, "admin"   ),

	# 404 not-found: must be the last URL pattern.
    ( r"^not-found/$"                          		, "not_found"   ),
    ( r"^.*$"                                 		, "not_found"   ),
)

