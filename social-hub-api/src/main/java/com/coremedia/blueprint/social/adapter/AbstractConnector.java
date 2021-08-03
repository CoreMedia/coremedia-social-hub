package com.coremedia.blueprint.social.adapter;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.SocialHubConnector;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.cap.common.IdHelper;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupFactory;
import com.coremedia.xml.MarkupUtil;
import com.google.common.base.MoreObjects;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Date;
import java.util.List;

public abstract class AbstractConnector implements SocialHubConnector {
  protected static final Logger LOG = LoggerFactory.getLogger(AbstractConnector.class);
  protected SocialHubService socialHubService;

  public AbstractConnector(SocialHubService service) {
    this.socialHubService = service;
  }

  protected boolean isBetween(Date createdAt, Date startTime, Date endTime) {
    if (createdAt == null || startTime == null || endTime == null) {
      return true;
    }
    long time = createdAt.getTime();
    long start = startTime.getTime();
    long end = endTime.getTime();

    return (time >= start) && (time <= end);
  }

  protected String asPlaintextWithLinks(String xml) {
    if(xml == null || !xml.startsWith("<")) {
      return xml;
    }

    Document document = Jsoup.parse(xml, "UTF-8");
    Elements links = document.getElementsByTag("a");
    String result =  xml;
    for (Element link : links) {
      String target = link.attr("xlink:href");
      String name = link.text();
      if(!StringUtils.isEmpty(target) && target.startsWith("content/")) {
        String id = target.substring(target.lastIndexOf('/')+1);
        String capId = IdHelper.formatContentId(id);
        String url = socialHubService.buildLiveUrl(capId, false);
        if(StringUtils.isEmpty(url)) {
          result = result.replace(link.toString(), name);
        }
        else {
          result = result.replace(link.toString(), url);
        }
      }
    }

    Markup markup = MarkupFactory.fromString(result);
    return MarkupUtil.asPlainText(markup);
  }

  protected List<? extends Message> limitResult(List<? extends Message> result, int offset, int limit) {
    if (offset > 0 || limit > 0) {
      if (offset >= result.size()) {
        return Collections.emptyList();
      }
      else {
        int count = limit > 0 ? limit : result.size();
        return result.subList(offset, Math.min(offset + count, result.size()));
      }
    }
    return result;
  }

  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .toString();
  }
}
