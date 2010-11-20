#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2008 GUO Lin
#
# Modified Django session middleware classes for Google App Engine. This middleware uses google's
# memcache instead of relational database to save session.
#
# Created on 2008-11-13.
# $Id: sessions.py 17 2009-08-04 21:17:34Z guolin.mobi $
#

import datetime
import random
import logging

from django.conf import settings
from django.utils.cache import patch_vary_headers
from google.appengine.api import memcache

#---------------------------------------------------------------------------------------------------

class SessionWrapper(object):

    def __init__(self, session_key):
        self._session_cache = None
        self.session_key    = session_key
        self.accessed       = False
        self.modified       = False

    def __contains__(self, key):
        return key in self._session

    def __getitem__(self, key):
        return self._session[key]

    def __setitem__(self, key, value):
        self._session[key] = value
        self.modified = True

    def __delitem__(self, key):
        del self._session[key]
        self.modified = True

    def keys(self):
        return self._session.keys()

    def items(self):
        return self._session.items()

    def get(self, key, default=None):
        return self._session.get(key, default)
    
    def get_or_create_session_key(self, request):
        if self.session_key is None:
            ip_addr   = request.META.get("REMOTE_ADDR", "unknown_ip")
            timestamp = datetime.datetime.strftime(datetime.datetime.utcnow(), "%Y%m%d%H%M%S")
            suffix    = "%x" % (random.random() * 65536)
            self.session_key = "session_" + ip_addr + "_" + timestamp + "_" + suffix
        return self.session_key
    
    def _get_session(self):
        self.accessed = True
        if self._session_cache is None:
            if self.session_key is None:
                self._session_cache = {}
            else:
                self._session_cache = memcache.get(self.session_key)
                if self._session_cache is None:
                    self._session_cache = {}
                    self.session_key = None
        return self._session_cache
    
    _session = property(_get_session)

#---------------------------------------------------------------------------------------------------

class SessionMiddleware(object):
    """Session middleware based on memcache.
    """

    def process_request(self, request):
        request.session = SessionWrapper(request.COOKIES.get(settings.SESSION_COOKIE_NAME, None))
        # If django_language does not exist, use Chinese.
        if not request.session.get('django_language', None):
            request.session['django_language'] = 'zh-cn'
    
    def process_response(self, request, response):
        """If session was modified, save those changes and set a session cookie.
        """
        
        try:
            accessed = request.session.accessed
            modified = request.session.modified
        except AttributeError, ex:
            logging.error("Failed to get session attribute: %s" % str(ex))
        else:
            if accessed:
                patch_vary_headers(response, ("Cookie",))
            if request.session.modified or settings.SESSION_SAVE_EVERY_REQUEST:
                # Get or create the session key.
                session_key = request.session.get_or_create_session_key(request)
                # Update the session dictionary object in memcache.
                memcache.set(session_key, request.session._session, settings.SESSION_COOKIE_AGE)
                # Set the session key in the cookie.
                if settings.SESSION_EXPIRE_AT_BROWSER_CLOSE:
                    max_age = None
                    expires = None
                else:
                    max_age = settings.SESSION_COOKIE_AGE
                    expires_time = datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age)
                    expires = datetime.datetime.strftime(expires_time, "%a, %d-%b-%Y %H:%M:%S GMT")
                response.set_cookie( settings.SESSION_COOKIE_NAME,
                                     session_key,
                                     max_age=max_age,
                                     expires=expires,
                                     domain=settings.SESSION_COOKIE_DOMAIN,
                                     secure=settings.SESSION_COOKIE_SECURE or None )
        return response



