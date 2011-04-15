#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Created on 201-04-16.
# $Id $
#

import logging

from django.template import loader
from django.template import Context
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from google.appengine.api import urlfetch

def visitDataSource(request):
    """Visit data source."""
    url = "http://www.baidu.com/"
    result = urlfetch.fetch(url)
    if result.status_code == 200:
        logging.info("%s" %  result.content)
        ctxt_dict = { "value" : "Task Success!" }
    else:
        ctxt_dict = { "value" : "Task Fail!"}
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("sandbox.html")
    return HttpResponse(tmpl.render(ctxt))
