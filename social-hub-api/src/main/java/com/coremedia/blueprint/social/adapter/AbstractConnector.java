package com.coremedia.blueprint.social.adapter;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.SocialHubConnector;
import com.google.common.base.MoreObjects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Date;
import java.util.List;

public abstract class AbstractConnector implements SocialHubConnector {
  protected static final Logger LOG = LoggerFactory.getLogger(AbstractConnector.class);

  protected boolean isBetween(Date createdAt, Date startTime, Date endTime) {
    if (createdAt == null || startTime == null || endTime == null) {
      return true;
    }
    long time = createdAt.getTime();
    long start = startTime.getTime();
    long end = endTime.getTime();

    return (time >= start) && (time <= end);
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
