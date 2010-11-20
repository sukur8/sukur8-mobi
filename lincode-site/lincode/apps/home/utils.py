#!/usr/bin/python
# -*- coding: utf-8 -*-
#

#
# Utility functions.
#
# Created on 2008-11-05.
# $Id: utils.py 17 2009-08-04 21:17:34Z guolin.mobi $
#

import logging
import datetime
import random

from google.appengine.ext import db


def munge_email(email):
    if email is not None:
        return email.replace("@", " (at) ")
    else:
        return None


def demunge_email(munging_email):
    if munging_email is not None:
        return munging_email.replace(" (at) ", "@")
    else:
        return None

def decode_utf8(string):
    return string.decode("utf8").strip()

def decode_utf8(string):
    return string.decode("utf8").strip()	

def get_param(value_dict, name, default=None):
    value = decode_utf8(value_dict.get(name, ""))
    if len(value) == 0:
        return default
    else:
        return value


def split_string(string):
    if string is not None:
        splitted = string.lower().replace(",", " ").replace(";", " ").split()
    else:
        splitted = []
    return splitted


def generate_random_id(prefix=""):
    timestamp = datetime.datetime.strftime(datetime.datetime.utcnow(), "%Y%m%d%H%M%S")
    suffix    = "%x" % (random.random() * 65536)
    return (prefix + timestamp + suffix)


#---------------------------------------------------------------------------------------------------
# EntityPage
#---------------------------------------------------------------------------------------------------

class EntityPage(object):
    """
    """
    
    MIN_PER_PAGE   = 1
    MAX_PER_PAGE   = 100
    
    MIN_PAGE_RANGE = 0
    MAX_PAGE_RANGE = 10
    DEF_PAGE_RANGE = 5
    
    def __init__(self, query, per_page, number=None, page_range=DEF_PAGE_RANGE):
        # Entity object count.
        self.object_count = query.count()
        # Entity objects per page.
        if per_page < EntityPage.MIN_PER_PAGE:
            self.per_page = EntityPage.MIN_PER_PAGE
        elif per_page > EntityPage.MAX_PER_PAGE:
            self.per_page = EntityPage.MAX_PER_PAGE
        else:
            self.per_page = per_page
        # First page number and last page number.
        self.first_page_number = 1
        if self.object_count > 0:
            self.last_page_number = (self.object_count - 1) / self.per_page + 1
        else:
            self.last_page_number = 1
        # Current page number.
        try:
            if number is not None:
                self.number = int(number)
            else:
                self.number = 1
        except ValueError:
            self.number = 1
        if self.number < self.first_page_number:
            self.number = self.first_page_number
        elif self.number > self.last_page_number:
            self.number = self.last_page_number
        # Page range.
        if page_range < EntityPage.MIN_PAGE_RANGE:
            self.page_range = EntityPage.MIN_PAGE_RANGE
        elif page_range > EntityPage.MAX_PAGE_RANGE:
            self.page_range = EntityPage.MAX_PAGE_RANGE
        else:
            self.page_range = page_range
        # Entity object list.
        offset = (self.number - 1) * self.per_page
        self.object_list = query.fetch(self.per_page, offset)
    
    def has_previous(self):
        return (self.number > self.first_page_number)
    
    def previous_page_number(self):
        return (self.number - 1)
    
    def has_next(self):
        return (self.number < self.last_page_number)
    
    def next_page_number(self):
        return (self.number + 1)
    
    def previous_page_range(self):
        range_start_index = max( self.first_page_number, self.number - self.page_range )
        range_end_index   = self.number
        return range(range_start_index, range_end_index)
    
    def next_page_range(self):
        range_start_index = self.number + 1
        range_end_index   = min( self.last_page_number + 1, self.number + self.page_range + 1)
        return range(range_start_index, range_end_index)
    
    def is_first_page_in_range(self):
        return (self.first_page_number >= self.number - self.page_range)
    
    def is_last_page_in_range(self):
        return (self.last_page_number <= self.number + self.page_range)



