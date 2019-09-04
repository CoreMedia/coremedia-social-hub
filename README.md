![Status: Active](https://documentation.coremedia.com/badges/badge_status_active.png "Status: Active")
![For CoreMedia CMS](https://documentation.coremedia.com/badges/badge_coremedia_cms.png "For CoreMedia CMS")

![CoreMedia Labs Logo](https://documentation.coremedia.com/badges/banner_coremedia_labs_wide.png "CoreMedia Labs Logo Title Text")


# CoreMedia Social Hub

The Social Hub allows to integrate various social networks into the CoreMedia Studio.
It provides a separate tab that shows different social network feeds and messages that have been
scheduled for publishing. 
The Social Hub is implemented as a Blueprint extension.

### Documentation & Tutorial

https://github.com/CoreMedia/coremedia-social-hub/tree/master/documentation

### Demo Content

To enable the Social Hub, some settings have to be created on a global or site specific level.
A global example configuration can be found here:

https://github.com/CoreMedia/coremedia-social-hub/tree/master/test-data

### Issue Tracker

https://github.com/CoreMedia/coremedia-social-hub/issues

### Installation

Add our submodules to the extensions folder

```
git submodule add https://github.com/CoreMedia/coremedia-social-hub.git modules/extensions/coremedia-social-hub
```

Add modules to modules/extensions/pom.xml

```
<module>coremedia-social-hub</module>
```

Add extension to the list of managed extensions at the end of workspace-config/extensions/managed-extensions.txt:

```
echo "coremedia-social-hub" >> workspace-configuration/extensions/managed-extensions.txt
```

Download the extension tool:

```
mvn dependency:copy -Dartifact=com.coremedia.tools.extensions:extensions:LATEST:jar:all -DlocalRepositoryDirectory=extensions-tool -Dtransitive=false -DoutputDirectory=tool -Dmdep.stripVersion=true -Dmdep.stripClassifier=true
```

Execute the extension tool:

```
java -jar tool/extensions.jar --task synchronize --extension-config-file  workspace-configuration/extensions/extension-config.properties --task-input-file workspace-configuration/extensions/managed-extensions.txt
```

For the IDEA import:
- Ignore folder ".remote-package"
- Disable "Settings > Compiler > Clear output directory on rebuild" to ensure the Studio development roundtrip

### TODOs

Please check the issues section of the project:
https://github.com/CoreMedia/coremedia-social-hub/issues


