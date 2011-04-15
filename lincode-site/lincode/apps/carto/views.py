#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Created on 2008-05-06.
# $Id $
#

from django.template import loader
from django.template import Context
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from lincode.apps.carto.config import Config

def carto(request):
    """Displays the svg project homepage."""
    ctxt_dict = {}
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/toulouse.svg" %  Config.APP_NAME )
    return HttpResponse(tmpl.render(ctxt), mimetype="application/xml")
