#!/usr/bin/python
# -*- coding: utf-8 -*-
#

#
# Created on 2008-11-19.
# $Id: feed.py 19 2009-10-19 22:33:46Z guolin.mobi $
#

class feed(object):
    def __init__(self, site_name, site_link, feed_link, author):
        self.site_name = site_name
        self.site_link = site_link
        self.feed_link = feed_link
        self.author    = author


PHOTOFEEDS = ( feed( site_name="Go to my flickr",
			   site_link="http://www.flickr.com/photos/lincode/",
			   feed_link="http://api.flickr.com/services/feeds/photos_public.gne?id=36123721@N06&lang=fr-fr&format=rss_200",
			   author="郭麟" ),

			  # Add your site feed here:
			  # NewsFeed( site_name="Your Site Name",
			  #             site_link="Your Site URL",
			  #             feed_link="Your Site Feed URL",
			  #             author="Your Name" ),

			) # PHOTOFEEDS
		
BLOGFEEDS = ( feed( site_name="Go to my Blog",
			  site_link="http://lincode.blogbus.com/",
			  feed_link="http://lincode.blogbus.com/index.rdf",
			  author="郭麟" ),

			  # Add your site feed here:
			  # NewsFeed( site_name="Your Site Name",
			  #             site_link="Your Site URL",
			  #             feed_link="Your Site Feed URL",
			  #             author="Your Name" ),

			) # BLOGFEEDS