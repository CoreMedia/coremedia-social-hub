package com.coremedia.blueprint.social.adapter.youtube;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class YouTubeUtil {

  private static final Logger LOG = LoggerFactory.getLogger(YouTubeUtil.class);


  static Date parseDate(String date) {
    try {
      return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").parse(date);
    } catch (ParseException e) {
      LOG.warn("Error parsing date {}", date);
      return null;
    }
  }
}
