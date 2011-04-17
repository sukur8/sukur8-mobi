#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Author : GUO Lin
#
# Created on 2011-04-16.
# $Id$
#

from google.appengine.ext import db

class AirRecord(db.Model):
    
    record_date = db.DateTimeProperty(required=True)
    pm25_value = db.FloatProperty()
    pm25_aqi   = db.IntegerProperty()
    pm25_comment = db.StringProperty()
    ozone_value = db.StringProperty(required=True)
    ozone_aqi_value = db.IntegerProperty()
    ozone_comment = db.StringProperty()
    create_date = dn.DateTimeProperty(required=True)

    @classmethod
    def create(cls, dic):
        return cls(
            record_date   = dic['record_date'],
            pm25_value    = dic['pm25_value'],
            pm25_aqi      = dic['pm25_aqi'],
            pm25_comment  = dic['pm25_comment'],
            ozone_value   = dic['ozone_value'],
            ozone_aqi     = dic['ozone_aqi'],
            ozone_comment = dic['ozone_comment'],
            create_date   = dic['create_date'])


class AirRecodeOneDay(db.Model):

    record_date   = db.DateProperty(required=True)
    pm25_value    = db.FloatProperty()
    pm25_aqi      = db.IntegerProperty()
    pm25_comment  = db.StringProperty()
    ozone_value   = db.StringProperty(required=True)
    ozone_aqi     = db.IntegerProperty()
    ozone_comment = db.StringProperty()
    create_date   = dn.DateTimeProperty(required=True)    

    @classmethod
    def create(cls, dic):
        return cls(
            record_date   = dic['record_date'],
            pm25_value    = dic['pm25_value'],
            pm25_aqi      = dic['pm25_aqi'],
            pm25_comment  = dic['pm25_comment'],
            ozone_value   = dic['ozone_value'],
            ozone_aqi     = dic['ozone_aqi'],
            ozone_comment = dic['ozone_comment'],
            create_date   = dic['create_date'])
