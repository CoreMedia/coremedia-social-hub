import ComposerModel from "./ComposerModel";
import Bean from "@coremedia/studio-client.client-core/data/Bean";


/**
 * The interface for a social message properties
 */
abstract class ComposerModelProperties extends Bean {

  abstract getComposerModel():ComposerModel;
}
export default ComposerModelProperties;
