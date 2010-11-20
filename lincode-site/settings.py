#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2008 GUO Lin <http://www.guo-lin.com>
#
# Django settings for lincode project.
#
# Created on 2008-04-28
# $Id: settings.py 17 2009-08-04 21:17:34Z guolin.mobi $
#

import os

# If the webapp is deployed on localhost), set DEBUG to True; otherwise, set DEBUG to False.
DEPLOYED_ON_LOCALHOST = os.environ.get("SERVER_NAME", "").startswith("localhost")
# DEBUG = DEPLOYED_ON_LOCALHOST
DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@domain.com'),
)

MANAGERS = ADMINS

# Google App Engine does not support Django models:
# leave all DATABASE_* settings set to an empty string.
DATABASE_ENGINE   = ""
DATABASE_NAME     = ""
DATABASE_USER     = ""
DATABASE_PASSWORD = ""
DATABASE_HOST     = ""
DATABASE_PORT     = ""

# Local time zone for this installation. Choices can be found here:
#   http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = "UTC"

# Language code for this installation. All choices can be found here:
#   http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
#   http://blogs.law.harvard.edu/tech/stories/storyReader$15
#LANGUAGE_CODE = "en"
LANGUAGE_CODE = "zh-cn"

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = ""

# URL that handles the media served from MEDIA_ROOT.
# Example: "http://media.lawrence.com"
MEDIA_URL = ""

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = "/media/"

# Make this unique, and don't share it with anybody.
SECRET_KEY = "*c(^-34)gdt8=g%3##=*apdl$!w8q-$4bc96+25!%2@%6-pj*q"

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    "django.template.loaders.filesystem.load_template_source",
    "django.template.loaders.app_directories.load_template_source",
    # 'django.template.loaders.eggs.load_template_source',
)

MIDDLEWARE_CLASSES = (
    "django.middleware.common.CommonMiddleware",
    "lincode.apps.middleware.common.LogErrorMiddleware",
    "lincode.apps.middleware.sessions.SessionMiddleware",
    # "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    
    # 'django.contrib.auth.middleware.AuthenticationMiddleware',
    "django.middleware.doc.XViewMiddleware",
)

ROOT_URLCONF = "urls"

ROOT_PATH = os.path.dirname(__file__)

TEMPLATE_DIRS = (
    os.path.join(ROOT_PATH, "templates")
)

INSTALLED_APPS = (
    "lincode.apps",
    # 'django.contrib.admin',
    # 'django.contrib.auth',
    # 'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    # 'django.contrib.sites',
)



