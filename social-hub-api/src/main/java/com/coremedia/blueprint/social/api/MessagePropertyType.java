package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

/**
 * The list of supported message property types.
 */
@Experimental
public enum MessagePropertyType {
  TEXT,
  MARKUP,
  DATE,
  ASSETLIST,
  CHOICE,
  LINK
}
