# Social Media Hub Configuration

The configuration of the Social Media Hub consists of different settings documents that can be
put in a global or site-specific folders.

- Global: _/Settings/Options/Settings/Social Hub/_
- Site specific: _&lt;SITE&gt;/Options/Settings/Social Hub/_


## General Settings

The _Settings_ document declares overall settings for the Social Media Hub and must be located in the global settings folder.
It defines the credentials for a __bitly__ account that is used for link shortening and additional CAE and document type model
information that are required when media should be extracted from content for social media posts.

```xml
<CMSettings folder="/Settings/Options/Settings/Social Hub/" name="Settings">
  <locale></locale>
  <master/>
  <settings>
    <Struct xmlns="http://www.coremedia.com/2008/struct">
      <StringProperty Name="bitlyUserId"></StringProperty>
      <StringProperty Name="bitlyApiKey"></StringProperty>
      <StructProperty Name="mediaMapping">
        <Struct>
          <StringProperty Name="CMMedia">data</StringProperty>
        </Struct>
      </StructProperty>
      <StringProperty Name="liveCaeUrl">YOUR_LIVE_CAE</StringProperty>
    </Struct>
  </settings>
  <identifier></identifier>
</CMSettings> 
```

#### Media Mapping

The _mediaMapping_ struct configures the content with media items that can be pushed to a social network.
By default, the CoreMedia Blueprint document type model is configured where _CMMedia_ with it's data property contains 
a blob with asset data.

Check also the details connector configuration for details on how to configure image variants for message composing.

## Adapter Configurations

A Social Media Hub adapter configuration can be put into the global or a site specific configuration folder.
One or more adapter configurations can be put into one or more settings documents with any name.
The following sections describes the structure of an adapter configuration and the samples for the existing adapters.

#### General Adapter Settings

Every Social Media Hub adapter configuration has the following structure:

```xml
<CMSettings folder="/Settings/Options/Settings/Social Hub/" name="My Social Hub Adapter">
  <locale></locale>
  <master/>
  <settings>
    <Struct xmlns="http://www.coremedia.com/2008/struct">
    <StructListProperty Name="channels">
      <Struct>
        <StringProperty Name="id">ADAPTER_ID</StringProperty>
        <StringProperty Name="type">ADAPTER_TYPE</StringProperty>
        <StringProperty Name="displayName">MY ADAPTER NAME</StringProperty>
        <BooleanProperty Name="enabled">true</BooleanProperty>
        <StructProperty Name="connector">
          <Struct>
            ...
          </Struct>
        </StructProperty>
         <StructProperty Name="adapter">
          <Struct>
            ...
          </Struct>
        </StructProperty>
      </Struct>
    </StructListProperty>
  </Struct></settings>
  <identifier></identifier>
</CMSettings>

```

Every connection struct contains the following properties:

| Property    | Description   |
| ----------- | ------------- |
| id          | the unique id of the adapter, ensure that no other adapter has the same |
| type        | the type of the adapter |
| displayName | the name that is displayed as title in the adapter column |
| enabled     | enables/disables the adapter | 
| connector   | additional properties used to configure the connector of the adapter |
| adapter     | additional properties used to configure the adapter |

When the configurations are read during the Studio startup, the Social Media Hub will try to map the configurations
to the corresponding _SocialHubAdapter_. It uses the implementation of _SocialHubAdapterFactory_ that is available for 
every Social Media Hub adapter. The _SocialHubAdapterFactory#getType_ must match the _type_ property that is set in the setting.

### Connector Configuration

The connector configuration usually contains the credentials for accessing a social network or a social media tool.
Interfaces that mapping this configuration must extend the interface _ConnectorConfiguration_ which contains additional 
settings valid for all connector configurations.

The _ConnectorConfiguration_ interface implements the following methods:

- _getImageVariant()_ 
  
  Defines the name of the image variant that should be used when an image is pushed to the external system.
  If the variant is not found or not configured, the original blob will be used.



#### Connector Specific Properties

The following section describes configuration properties for specific Social Media Hub adapters.






### Twitter

__Adapter Configuration__

In order to show the Twitter timeline for the configured profile, the timeline link must
be provided as part of the adapter configuration.

```xml
<StructProperty Name="adapter">
  <Struct>
    <StringProperty Name="timeline">https://twitter.com/[YOUR_PROFILE]</StringProperty>
  </Struct>
</StructProperty> 
```


__Connector Configuration__

If the native Twitter connector should be used, the corresponding Twitter
credentials have to be provided as part of the connector configuration.

See: https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens.html


```xml
<StructProperty Name="connector">
  <Struct>
    <StringProperty Name="consumerKey"></StringProperty>
    <StringProperty Name="consumerSecret"></StringProperty>
    <StringProperty Name="accessToken"></StringProperty>
    <StringProperty Name="accessTokenSecret"></StringProperty>
  </Struct>
</StructProperty>
```








### YouTube

__Adapter Configuration__

_not required_

__Connector Configuration__

If the native YouTube connector should be used, the corresponding YouTube
credentials have to be provided as part of the connector configuration.
Not that one YouTube configuration represents one playlist. If you want to push into different playlists,
different configurations are required.

See: https://developers.google.com/youtube/v3/quickstart/go

```xml
<StructProperty Name="connector">
  <Struct>
    <StringProperty Name="credentialsJson"></StringProperty>
    <StringProperty Name="channelId"></StringProperty>
    <StringProperty Name="playlistId"></StringProperty>
  </Struct>
</StructProperty>
```








### Instagram

__Adapter Configuration__

_not required_

__Connector Configuration__

Since the Social Media Hub is not shipped with a native connector for this network, the actual connector configuration depends
on the integration with a social media tool.






### Pinterest

__Adapter Configuration__

In order to show a Pinterest board for the configured profile, the board link must
be provided as part of the adapter configuration. The board link can be copied from
Pinterest website.

```xml
<StructProperty Name="adapter">
  <Struct>
    <StringProperty Name="board">https://www.pinterest.de/[PINTEREST_PRROFILE]/[PINTEREST_BOARD_NAME]</StringProperty>
  </Struct>
</StructProperty> 
```

__Connector Configuration__

Since the Social Media Hub is not shipped with a native connector for this network, the actual connector configuration depends
on the integration with a social media tool.

## Colors
Additional colors used in the Social Media Hub can added in the `Settings` document.
To add a custom color option, you need to configure the hex color codes in the `base`, `background`, `hover` and `pressed` properties.
The example below adds three additional color options.
```xml
<StructListProperty Name="colors">
    <Struct>
      <StringProperty Name="base">#1EA1F2</StringProperty>
      <StringProperty Name="background">#E8F6FD</StringProperty>
      <StringProperty Name="hover">#1A91DA</StringProperty>
      <StringProperty Name="pressed">#1781c2</StringProperty>
    </Struct>
    <Struct>
      <StringProperty Name="base">#E1306C</StringProperty>
      <StringProperty Name="background">#FAFAFA</StringProperty>
      <StringProperty Name="hover">#C13584</StringProperty>
      <StringProperty Name="pressed">#833AB4</StringProperty>
    </Struct>
    <Struct>
      <StringProperty Name="base">#FF0100</StringProperty>
      <StringProperty Name="background">#F9F9F9</StringProperty>
      <StringProperty Name="hover">#CC0000</StringProperty>
      <StringProperty Name="pressed">#d80000</StringProperty>
    </Struct>
</StructListProperty>
```
