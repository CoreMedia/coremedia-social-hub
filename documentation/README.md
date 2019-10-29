# CoreMedia Social Hub

## Index

* [Installation](https://github.com/CoreMedia/coremedia-social-hub/blob/master/README.md)
* [Configuration](https://github.com/CoreMedia/coremedia-social-hub/blob/master/documentation/Configuration.md)
* [Studio Customization](https://github.com/CoreMedia/coremedia-social-hub/blob/master/documentation/Studio-Customization.md)

## Abstract

The Social Hub allows to integrate various social networks into the CoreMedia Studio.
It provides a separate tab that shows different social network feeds and messages that have been
scheduled for publishing. 
The Social Hub is implemented as a Blueprint extension.

## CoreMedia Labs Prototypes

This is a CoreMedia Labs prototype which means it __does not provide a stable API__.
The current implementation won't match the one which will be released for a future CoreMedia workspace.
Therefore, we also don't provide a proper documentation for it.
If you are interested in a custom integration, feel free to contact us!


## Terms and Description


| Term | Description |
| ---- | ----------- |
| adapter | The adapter implementation is responsible for the message composing of a social network, e.g. the _YouTubeSocialHubAdapter_ implements the composing of YouTube messages. |
| connector | The connector implementation is responsible for the publication of the composed messages. It can be a native integration of a social network or a social media tool. |


## Versioning

The release versions of the Social Hub is matching the version of CoreMedia workspace releases.
E.g. when the CoreMedia workspace has the version __1907.1__, the matching Social Hub release will have
version __1907.1-X__ where 'X' indicates the release version of the Social Hub.


## Supported Networks

The Social Hub comes with a set of predefined adapter and connector implementations.
_Native_ adapters are communicating with the social network directly via their (REST) APIs.

The more common use case is that we only define a stub for a social media network and implement a connector
that takes care of pushing the composed messages to this tool.

__We recommend to implement a SocialHubConnector for a social media tool!__

The existing integrations of Twitter and YouTube are just example implementations.
The philosophy behind the Social Hub is to __prepare__ content for social media publication by pushing content
items to social media tools which take care of the actual publication.
 
 
## Features

The following table shows the currently supported features for the various social networks.

| Social Network | Publication | Composing |
| -------------- |:-----------:|:---------:|
| Twitter        |      x      |     x     |
| YouTube        |      x      |     x     |
| Instagram      |      -      |     x     |
| Pinterest      |      -      |     x     |
