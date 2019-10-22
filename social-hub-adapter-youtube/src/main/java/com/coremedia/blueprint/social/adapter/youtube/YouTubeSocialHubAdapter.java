package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.MessagePropertyImpl;
import com.coremedia.blueprint.social.adapter.AbstractSocialHubAdapter;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import com.coremedia.blueprint.social.api.SocialHubConnector;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class YouTubeSocialHubAdapter extends AbstractSocialHubAdapter {

  private final YouTubeAdapterSettings adapterSettings;

  public YouTubeSocialHubAdapter(SocialHubConnector connector, YouTubeAdapterSettings adapterSettings) {
    super(connector);
    this.adapterSettings = adapterSettings;
  }

  @Override
  public List<MessageProperty> getMessageProperties() {
    List<MessageProperty> result = new ArrayList<>();
    result.add(new MessagePropertyImpl(MessagePropertyType.TEXT, "title", 70));
    result.add(new MessagePropertyImpl(MessagePropertyType.ASSETLIST, "video", null,1, true, "video/*"));
    result.add(new MessagePropertyImpl(MessagePropertyType.CHOICE, "privacy", Arrays.asList("public", "private"), "public"));
    result.add(new MessagePropertyImpl(MessagePropertyType.MARKUP, "description", 5000));
    return result;
  }

  public YouTubeAdapterSettings getAdapterSettings() {
    return adapterSettings;
  }
}
