package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

import javax.activation.MimeType;
import java.io.InputStream;

@Experimental
public interface MediaSource {

  String getName();

  InputStream getInputStream();

  MimeType getMimeType();

  int getSize();
}
