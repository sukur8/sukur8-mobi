#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# $Id: views.py 19 2009-10-19 22:33:46Z guolin.mobi $
#

import logging
import urllib
import sys
import string
from douban.service import DoubanService

from django.template import loader
from django.template import Context
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound

from google.appengine.api import users

from lincode.apps.home.config import Config
from lincode.apps.home import feed
from lincode.apps.home import utils
#---------------------------------------------------------------------------------------------------
# Language class
#---------------------------------------------------------------------------------------------------

class Language(object):
    
    LANG_SESSION_NAME = "django_language"
    
    ENGLISH_CODE = "en"
    CHINESE_CODE = "zh-cn"
    
    DEFAULT_LANG_CODE    = CHINESE_CODE
    SUPPORTED_LANG_CODES = ( ENGLISH_CODE, CHINESE_CODE, )
    
    def __init__(self, code, url, is_current):
        self.code = code
        self.url = url
        self.is_current = is_current
    
    @staticmethod
    def create_lang_url(redirect_url, lang_code):
        params = { "url" : redirect_url, "lang" : lang_code, }
        url = "%s/lang/?%s" % (Config.URL_PREFIX, urllib.urlencode(params))
        return url
    
    @staticmethod
    def get_lang(request):
        try:
            lang_code = request.session.get(Language.LANG_SESSION_NAME, None)
        except AttributeError:
            lang_code = Language.DEFAULT_LANG_CODE
        return lang_code
    
    @staticmethod
    def set_lang(request, lang_code):
        try:
            request.session[Language.LANG_SESSION_NAME] = lang_code
            return True
        except AttributeError:
            return False

    @staticmethod
    def get_lang_prefix(request):
        lang = Language.get_lang(request)
        if lang == Language.ENGLISH_CODE:
            lang_url = ""
        elif lang == Language.CHINESE_CODE:
            lang_url = "cn"
        return lang_url
            
def change_language(request):
    "Change the current language."
    
    redirect_url = utils.get_param(request.REQUEST, "url" )
    lang_code    = utils.get_param(request.REQUEST, "lang")
    Language.set_lang(request, lang_code)
    return HttpResponseRedirect(redirect_url)
    
#---------------------------------------------------------------------------------------------------
# Common functions
#---------------------------------------------------------------------------------------------------

def _get_common_context_dict(request):

    # User info.
    #user = get_current_user()
    #if not user:
    #    log_url  = create_login_url("%s/login_ok/%s" % (Config.URL_PREFIX, request.path,))
    #    log_text = "Login"
    #    is_admin = False
    #else:
    #    log_url  = create_logout_url("%s/login_ok/%s" % (Config.URL_PREFIX, request.path,))
    #    log_text = "Logout"
    #    is_admin = (user.email() in Config.ADMINS)
    
    # Language.
    current_lang_code = Language.get_lang(request)
    languages = []
    for lang_code in Language.SUPPORTED_LANG_CODES:
        lang_url    = Language.create_lang_url(request.path, lang_code)
        is_current  = (lang_code == current_lang_code)
        languages.append(Language(lang_code, lang_url, is_current))
    
    # Request meta info.
    http_referer = request.META.get("HTTP_REFERER", "unknown_http_referer")
    remote_addr  = request.META.get("REMOTE_ADDR" , "unknown_remote_addr" )
    remote_host  = request.META.get("REMOTE_HOST" , "unknown_remote_host" )
    
    # Return the common context dict.
    return { #"user_"            : user,
             #"log_url_"         : log_url,
             #"log_text_"        : log_text,
             #"is_admin_"        : is_admin,
             "url_"             : Config.URL_PREFIX,
             "static_"          : Config.STATIC_PREFIX,
             "languages_"       : languages,
             "http_referer_"    : http_referer,
             "remote_addr_"     : remote_addr,
             "remote_host_"     : remote_host,
             #"models_revision_" : MODELS_REVISION, 
             }

             
def not_found(request):
    "Displays the 404 not-found page."
    
    ctxt_dict = { "url" : request.path, }
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/not_found.html" % Config.APP_NAME )
    return HttpResponseNotFound(tmpl.render(ctxt))

def home(request):
    lang_url = Language.get_lang_prefix(request)
    ctxt_dict = { }
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/%s/home.html" % (Config.APP_NAME, lang_url) )
    return HttpResponse(tmpl.render(ctxt))

#---------------------------------------------------------------------------------------------------
# project
#---------------------------------------------------------------------------------------------------
    
def project(request, name=None ):
    """    Project page"""
    
    if name is None:
        name = "afcp"
        
    if name == "afcp":
        return afcp(request)
    if name == "carto":
        return carto(request)
    if name == "douban":
        return search(request)
    if name == "mobicours":
        return mobicours(request)
        
    ctxt_dict = { "page_name" : name, }          
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/project/%s.html" % (Config.APP_NAME, name))
    return HttpResponse(tmpl.render(ctxt))

def afcp(request):

    name = "afcp"
    lang_url = Language.get_lang_prefix(request) 
    ctxt_dict = { "page_name" : name, }
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/project/%s/%s.html" % (Config.APP_NAME, lang_url, name))
    return HttpResponse(tmpl.render(ctxt))

def carto(request):
    """Displays the svg project homepage."""
    name = "carto"
    lang_url = Language.get_lang_prefix(request) 
    ctxt_dict = { "page_name" : name,}
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/project/%s/%s.html" %  (Config.APP_NAME, lang_url, name) )
    return HttpResponse(tmpl.render(ctxt))    
    
def mobicours(request):
    """Displays the svg project homepage."""
    name = "mobicours"
    lang_url = Language.get_lang_prefix(request) 
    ctxt_dict = { "page_name" : name,}
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/project/%s/%s.html" %  (Config.APP_NAME, lang_url, name) )
    return HttpResponse(tmpl.render(ctxt))   
    
#---------------------------------------------------------------------------------------------------
# about
#---------------------------------------------------------------------------------------------------
    
def about(request, name=None):
    """ about """
    if name == "resume":
        return resume(request)
    if name == "photo":
        return photo(request)
    if name == "blog":
        return blog(request)
    ctxt_dict = { "page_name" : name, }    
    ctxt_dict.update(_get_common_context_dict(request))              
    ctxt = Context(ctxt_dict)
    
    tmpl = loader.get_template("%s/about/%s.html" % (Config.APP_NAME, name) )
    return HttpResponse(tmpl.render(ctxt))

def resume(request):
    """ Display the resume page"""
    name = "resume"
    lang_url = Language.get_lang_prefix(request) 
    ctxt_dict = { "page_name" : name, }    
    ctxt_dict.update(_get_common_context_dict(request))              
    ctxt = Context(ctxt_dict)
    
    tmpl = loader.get_template("%s/about/%s/%s.html" % (Config.APP_NAME, lang_url, name) )
    return HttpResponse(tmpl.render(ctxt))
    
def blog(request):
    "Displays the blog page (a feeds aggregator)."
    name = "blog"
    ctxt_dict = { "feeds"       : feed.BLOGFEEDS,
                  "page_name" : name, }
                  
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/about/%s.html" % (Config.APP_NAME, name))
    return HttpResponse(tmpl.render(ctxt))
    
def photo(request):
    "Displays the photo page (a feeds aggregator)."
    name = "photo"
    ctxt_dict = { "feeds"       : feed.PHOTOFEEDS,
                  "page_name" : name, }
                  
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    
    
    tmpl = loader.get_template("%s/about/%s.html" % (Config.APP_NAME, name))
    return HttpResponse(tmpl.render(ctxt))

    
#---------------------------------------------------------------------------------------------------
# admin
#---------------------------------------------------------------------------------------------------

def admin(request, name=None):
    "Control the admin page."
    if name is None:
        name = "search" 
    
    if name == "search":
        return search(request)
    
    return search(request)
    
def search(request, subject = 'movie'):
    "First display search page."
    
    search_info = ('Enter your search keyword')
    name = 'douban'
    lang_url = Language.get_lang_prefix(request) 
    ctxt_dict = { "search_info" : search_info,
                  "subject"     : subject,
                  "page_name"   : name}
                  
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    logging.info("lang :%s", lang_url)
    logging.info("name :%s", name)
    tmpl = loader.get_template("%s/project/%s.html" %  (Config.APP_NAME, name) )
    return HttpResponse(tmpl.render(ctxt))

def search_result(request, subject = 'movie'):
    "Get search keyword."
    
    keyword = request.GET.get("keyword", None)
    nb_page = request.GET.get("nb_page")
    return display_result( request, subject, keyword,  nb_page )
        
def display_result( request, subject, keyword,  nb_page ):
    "Display the search result on the page."
    
    try:
        if nb_page :
            nb_page = string.atoi(nb_page)
            start = ( nb_page - 1 ) * 10 
        else:
            nb_page = 1
            start = 0
    
        if keyword is not None:
            feeds = get_feeds( subject, keyword, start_index = start )
            items_per_page = string.atoi(feeds.items_per_page.text)
        else:
            feeds = None
            items_per_page = 0
            
        start_total = 0
        feeds_total = get_feeds( subject, keyword, start_index = start_total )
        total_results = string.atoi(feeds_total.total_results.text)
            
        if items_per_page:
            total_page = ( total_results / items_per_page ) + 1
        else:
            total_page = 0
            
        nb = 1
        page_list = [ ]
        while nb <= total_page:
            page_list.append( nb )
            nb += 1
        ctxt_dict = { "feeds" : feeds,
                      "total_results": total_results,
                      "page_list": page_list,
                      "nb_page" : nb_page,
                      "keyword" : keyword,
                      "subject" : subject,
                      "page_name"     : "search" }
                      
    except Exception, ex:
        search_info = 'Sorry, We have server\'s problem. %s' % ex
        
        ctxt_dict = { 
                      "keyword" : keyword, 
                      "search_info" : search_info,
                      "subject" : subject,
                      "page_name"     : "search" }
                      
    ctxt_dict.update(_get_common_context_dict(request))
    ctxt = Context(ctxt_dict)
    tmpl = loader.get_template("%s/project/douban.html" % Config.APP_NAME)
    return HttpResponse(tmpl.render(ctxt))

def get_feeds( subject, keyword, start_index ):
    "Get the feeds."
    
    APIKEY='035eccea841c3a410a1c66bf8c54aec3'
    SECRET='40ef3efa5b01d05f'
            
    MOVIE_CODE = "movie"
    BOOK_CODE = "book"
    MUSIC_CODE = "music"
    DEFAULT_CODE    = MOVIE_CODE
    SUPPORTED_ITEM_CODES = ( MOVIE_CODE, BOOK_CODE, MUSIC_CODE )
    
    if subject not in SUPPORTED_ITEM_CODES:
        subject = MOVIE_CODE
        
    client = DoubanService(api_key=APIKEY)        
    
    feeds = client.SearchMovie(keyword, start_index = start_index)
    if subject == BOOK_CODE:
       feeds = client.SearchBook(keyword, start_index = start_index)
    elif subject == MUSIC_CODE:
       feeds = client.SearchMusic(keyword, start_index = start_index)
    return feeds    