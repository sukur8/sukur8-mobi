#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2008 GUO Lin <http://www.guo-lin.com>
#
# Django URL mappings.
# 
# $Id: urls.py 17 2009-08-04 21:17:34Z guolin.mobi $
#



from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import include

urlpatterns = patterns( "",

    # Sub-webapps in the bug garden.
	( r"^home/", include("lincode.apps.home.urls") ),
	( r"^carto/", include("lincode.apps.carto.urls") ),
	
    # Top-level URL mappings.
    ( r"^$", "lincode.apps.views.home" ),
 
    # Uncomment this for admin:
    # (r"^admin/", include("django.contrib.admin.urls")),
    
    # 404 not-found to catch all (this should always be the last URL pattern).
    ( r"^.*$", "lincode.apps.views.not_found" ),

)


