#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2008 ZHENG Zhong <heavyzheng nospam-at gmail D0T com>
# - http://heavyz.blogspot.com/
# - http://buggarden.blogspot.com/
#
# Google services.
#
# Created on 2008-11-03.
# $Id: google_services.py 17 2009-08-04 21:17:34Z guolin.mobi $
#

from django.http import HttpRequest


BUG_GARDEN    = "buggarden.zhengzhong.info"
ZHENG_ZHONG   = "www.zhengzhong.info"
FOODS_N_ROSES = "www.foodsnroses.com"
LOCALHOST     = "localhost"


class AjaxApis(object):
    """Google AJAX APIs keys.
    See: http://code.google.com/apis/ajax/
    """
    
    _KEYS = {
        BUG_GARDEN    : "ABQIAAAA6SC56e9JfGUas7BsUDqyuBSTifdYYxae_Fgu4pMaCbjZ-b-yNRQ7-D746-2AoYxPDYrr8E3xbrY4qQ",
        ZHENG_ZHONG   : "ABQIAAAA6SC56e9JfGUas7BsUDqyuBRW6YArjPq31BdJsyduMBk7J2LNoxQqwq2IO-rv7Nc9Wco0SjY5_ESjFw",
        FOODS_N_ROSES : "ABQIAAAA6SC56e9JfGUas7BsUDqyuBTkkRge4Xz_sN6dbtUQAXA6XzENlxTPEpWjSEM5RpKm6DFjpP7nHq8Qfg",
        LOCALHOST     : "dummy_google_ajax_apis_key",
    }
    
    @staticmethod
    def key(request):
        domain = request.META.get("SERVER_NAME")
        return AjaxApis._KEYS.get(domain)


class WebmastersTools(object):
    """Google Webmaster Tools' verify codes.
    See: http://www.google.com/webmasters/tools/
    """
    
    _KEYS = {
        BUG_GARDEN    : "QTdQIAz3fqNThNKESlDKALa2lBYKZGg4ovcJfnuefZo=",
        ZHENG_ZHONG   : "QTdQIAz3fqNThNKESlDKALa2lBYKZGg4ovcJfnuefZo=",
        FOODS_N_ROSES : "pRWNVIrat1OV3NedWbXRvZeakeqhRu6dCR0vykB9BnA=",
        LOCALHOST     : "dummy_google_webmasters_tools_verify_v1",
    }
    
    @staticmethod
    def key(request):
        domain = request.META.get("SERVER_NAME")
        return WebmastersTools._KEYS.get(domain)


class Analytics(object):
    """Google Analytics IDs.
    See: http://www.google.com/analytics/
    """
    
    _KEYS = {
        LOCALHOST     : "dummy_google_analytics_id",
    }

    @staticmethod
    def key(request):
        domain = request.META.get("SERVER_NAME")
        return Analytics._KEYS.get(domain)

