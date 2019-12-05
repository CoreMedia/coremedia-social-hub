# Studio Customization

Developing new adapters may require client-side Studio customization. These customization are easily done by overriding
the Social Media Hub property files of the Social Media Hub Studio plugin. Examples for overriding property files
can be found in documentation or the file 'BlueprintFormsStudioPlugin.mxml' inside the CoreMedia Blueprint.

### Customizing Labels and Icons

The property file _SocialHub.properties_ contains the label and icon values for adapters. 
Entries can simply added or modified by overriding this file.

The file expects entries in the following format:

#### Adapter
```
<ADAPTER_TYPE>_title = <TYPE_LABEL>
<ADAPTER_TYPE> = Resource(key='<KEY_FOR_ICON>', bundle='com.coremedia.icons.CoreIcons')
```
For icon values, we recommend to use the existing _CoreIcons_ resource.

#### Message Properties
```
message_property_<MESSAGE_PROPERTY> = <LABEL OF THE PROPERTY>
message_property_<MESSAGE_PROPERTY>_emptyText = <EMPTY TEXT USED FOR TEXTFIELDS>
message_property_<MESSAGE_PROPERTY>_<CHOICE_PROPERTY> = <LABEL FOR COMBO BOX VALUE>

```



