#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2008 GUO Lin <http://www.guo-lin.com>
#
# Created on 2008-04-28
# $Id: main.py 17 2009-08-04 21:17:34Z guolin.mobi $
#

"""Bootstrap for running a Django application on Google App Engine."""


# Must set these environment variabls befor importing any part of Django.
import os
os.environ["DJANGO_SETTINGS_MODULE"] = "settings"

# Select Django version.
import google.appengine.dist
google.appengine.dist.use_library("django", "0.96")

# Force Django to reload its settings.
import django.conf
django.conf.settings._target = None

# Django imports.
import django.core.handlers.wsgi
import django.core.signals
import django.db
import django.dispatch.dispatcher

#---------------------------------------------------------------------------------------------------
import logging

# Log exceptions.
def log_exception(*args, **kwds):
    logging.exception("Exception in request:")

# Update Django signal listeners.
# django.core.signals.got_request_exception.disconnect(django.db._rollback_on_exception)
# django.core.signals.got_request_exception.connect(log_exception)
# Log errors.
django.dispatch.dispatcher.connect(
        log_exception,
        django.core.signals.got_request_exception )

# Unregister the rollback event handler.
django.dispatch.dispatcher.disconnect(
        django.db._rollback_on_exception,
        django.core.signals.got_request_exception )
#-------------------------------------------------------------------------------
# extending sys.path
#-------------------------------------------------------------------------------

# Extend sys.path to include additional library directories.
# sys.path.append(os.path.join(os.path.dirname(__file__), "lib"))
# logging.info("Set sys.path to : %s" % str(sys.path))

#-------------------------------------------------------------------------------
# main entry point
#-------------------------------------------------------------------------------

import google.appengine.ext.webapp.util

def main():
    # Create a Django application for WSGI.
    app = django.core.handlers.wsgi.WSGIHandler()
    # Run the WSGI CGI handler with that application.
    google.appengine.ext.webapp.util.run_wsgi_app(app)


if __name__ == '__main__':
    main()


# EOF

