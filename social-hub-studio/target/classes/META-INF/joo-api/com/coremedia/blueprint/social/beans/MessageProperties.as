package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.Bean;

/**
 * The interface for a social message properties
 */
public interface MessageProperties extends com.coremedia.ui.data.Bean {
  function getMessage():com.coremedia.blueprint.social.beans.Message;
}
}