#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# $Id: urls.py 17 2011-04-10 21:17:34Z guolin.mobi $
#

from django.conf.urls.defaults import patterns

urlpatterns = patterns( "lincode.apps.beijingair.views",
   
	( r"^$"    		, "visitDataSource"     ), 

)
