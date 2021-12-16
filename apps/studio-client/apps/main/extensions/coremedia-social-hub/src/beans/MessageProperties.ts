import Bean from "@coremedia/studio-client.client-core/data/Bean";
import Message from "./Message";

/**
 * The interface for a social message properties
 */
abstract class MessageProperties extends Bean {

  abstract getMessage(): Message;
}

export default MessageProperties;
