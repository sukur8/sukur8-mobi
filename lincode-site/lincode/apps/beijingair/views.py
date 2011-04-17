#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Created on 201-04-16.
# $Id $
#

import logging
import urllib2
import json

from django.template import loader
from django.template import Context
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect

def simulateTwitterAPI(request):
    ctxt = Context({})
    tmpl = loader.get_template("twitter.json")
    return HttpResponse(tmpl.render(ctxt))

def visitDataSource(request):
    """Visit data source."""
    url = 'http://localhost:8080/'
    response = urllib2.urlopen(url)
    content = response.read()
    if response.code == 200:
        logging.info("%s" %  content)
        ctxt_dict = { "value" : "Task Success!" }
    else:
        ctxt_dict = { "value" : "Task Fail!"}
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("sandbox.html")
    return HttpResponse(tmpl.render(ctxt))
