#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# $Id: urls.py 17 2009-08-04 21:17:34Z guolin.mobi $
#

from django.conf.urls.defaults import patterns

urlpatterns = patterns( "lincode.apps.carto.views",
   
	( r"^$"                                   		, "carto"     ), 

)

