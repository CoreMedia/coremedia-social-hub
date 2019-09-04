package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

import java.util.Date;

@Experimental
public interface ScheduledMessage extends Message {

  Date getScheduledSendTime();

}
