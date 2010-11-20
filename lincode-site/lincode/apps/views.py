#!/usr/bin/python
# -*- coding: utf-8 -*-
#

#
# Created on 2008-05-06.
# $Id $
#

import logging

from django.template import loader
from django.template import Context
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect


#---------------------------------------------------------------------------------------------------
# Lincode homepage
#---------------------------------------------------------------------------------------------------

def _lincode_home(request):
	return HttpResponseRedirect("/home/")

#---------------------------------------------------------------------------------------------------
# Sub-webapp homepages
#---------------------------------------------------------------------------------------------------

def _default_home(request):
    return _lincode_home(request)


HOME_HANDLER_MAPPINGS = { "buggarden" : _lincode_home, }

SERVER_HANDLER_MAPPINGS = { "www.guolin-site.com" : _lincode_home,
                            "guolin-site.appspot.com"    : _lincode_home,
 }

#---------------------------------------------------------------------------------------------------
# Homepage handler
#---------------------------------------------------------------------------------------------------

def home(request):
    home = request.REQUEST.get("home")
    handler = HOME_HANDLER_MAPPINGS.get(home, None)
    if handler is not None:
        return handler(request)
    else:
        server = request.META.get("SERVER_NAME")
        handler = SERVER_HANDLER_MAPPINGS.get(server, None)
        if handler is not None:
            return handler(request)
        else:
            return _lincode_home(request)
			
	
#---------------------------------------------------------------------------------------------------
# The 404 not-found page
#---------------------------------------------------------------------------------------------------

def not_found(request):
    "Displays the 404 not-found page."

    return HttpResponseRedirect("/home/not-found/")

#---------------------------------------------------------------------------------------------------
# Sandbox for testing new features
#---------------------------------------------------------------------------------------------------

def sandbox(request):

    ctxt_dict = { }
    
    # Set language.
    request.session["django_language"] = "en"
    
    # Session.
    value = request.session.get("value", 0)
    value += 1
    request.session["value"] = value
    ctxt_dict["value"] = value
    
    # More testing code goes here...
    
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("sandbox.html")
    resp = HttpResponse(tmpl.render(ctxt))
    resp.set_cookie(key="greeting", value="hello, world")
    return resp



