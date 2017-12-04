# WCH Conversation Core
This package contains the essential functionality to create a chatbot based on the combination of the [Watson Conversation Service][watsonconversationurl] and [Watson Content Hub][watsoncontenthuburl]. Each essential part is available as a plugin. The plugin structure is based on the [architect framework][architecturl].

In detail this module contains all necessary server side logic to use the watson conversation service with any channel and framework you want. Additionally it provides an easy configuration to fetch the response the users sees from Watson Content Hub. This allows you to manage the responses across all channels in an easy to use User Interface provided by Watson Content Hub. Additionally you're not limited to text answers only. There is no limitation on rich media like images, pdfs, files, author information, ...

**Note:** This module is part of a tutorial showing how to implement a chatbot solution based on a CMS like [Watson Content Hub][watsoncontenthuburl]. So currently it's discouraged to use this module as is for production use cases without any modifications.

If you fork this repository and want to do end2end tests make sure to run the ```npm run manageCreds``` command. This will setup a local pair of credentials encrypted with your RSA key. If you don't have a RSA key yet follow [these instructions from Github.][generatesshurl]

# Plugins

## clienttype

**Description:** A simple plugin that identifies the channel based on the incoming user message. Provides it's functionallity additionally as a conversation service middleware. It takes the message and conversationPayload object as given by the [conversationmiddleware][conversationmiddlewareurl] module before method. This plugin can be used as a simple blueprint on how to write your own middleware plugins for the conversationmiddleware plugin. (e.g. if you want to create custom actions that will call your internal service APIs)

**Requires:** `['logging']`

**Provides:** `['clientType', 'clientTypeMiddleware']`

**Options:** None

**Methods:**
```javascript
  clientType.identify(message, conversationPayload)
  .then(clientType => {
    // Returns a simple object e.g. {clientType: 'rest'}
  });
```

## conversation

**Description:** Watson Conversation Plugin. Wraps the [watson-developer-cloud module][watsoncloudconversationurl] for ease of use inside of the chatbot core service. The plugin provides a locale specific map of conversation service instances to the correct conversation service instance. Fetches the credentials from the env plugin.

**Requires:** `['env', 'logging']`

**Provides:** `['conversation']`

**Options:**<br/>
***serviceName*** - Name of the bluemix conversation service instance. The module fetches the credentials for authentication based on the given service name. The default name is *wch-conversation*.<br/>
***workspaceConfigs*** - Locale specific mapping from a locale to a Watson Conversation Service Workspace. See app_settings.json for a sample. 

**Methods:**
```javascript
  conversation.get('de').getWorkspace()
  .then(workspace => {
    // Returns a simple object containing the workspace
  });

  conversation.get('en').getIntents()
  .then(intents => {
    // Returns a simple object containing the intents
  });

  conversation.get('de-DE').getEntities()
  .then(entities => {
    // Returns a simple object containing the entities
  });

  // The conversation parameter provides direct access to the 
  // watson-developer-cloud node SDK. 
  conversation.get('de-DE').conversation.uploadWorkspace(...);
```

## conversationmiddleware

**Description:** Plugin that wraps the [Botkit Conversation Middleware][botkitconversationmiddlewareurl]. As part of this wrapper implementation you can plugin your own middleware where you can plugin custom actions before and after the call made against the conversation server. In order to reguster your middleware create a plugin which provides a before and/or after method and ends on the name 'Middleware' (e.g. clientTypeMiddleware). 

**Requires:** `['env', 'logging', '<yourMiddlewareName>Middleware', ...]`

**Provides:** `['conversationmiddleware']`

**Parameters:**<br/>
***serviceName*** - Name of the bluemix conversation service instance. The module fetches the credentials for authentication based on the given service name. The default name is *wch-conversation*.<br/>
***middlewareConfigs*** - Locale specific mapping from a locale to a Watson Conversation Service Workspace. See app_settings.json for a sample. 

**Methods:**
```javascript
  conversationMiddleware.get(locale).interpret(bot, message, function () {
    // message.watsonData contains the conversation service response
    // message.watsonError contains the error message in case something went wrong
  });
```

## credentials

**Description:** Local credentials plugin. Stores and retrieves the credentials required for all external services used. The current format is based on the bluemix service credentials. The file can optionally be encrypted with your local RSA private key for increased security.

**Requires:** `['logging']`

**Provides:** `['credentials']`

**Parameters:**<br/>
***pubKPath*** - Absolute or relative path to the public RSA key. In case of RAS this can also be the path to the private key.<br/>
***privKPath*** - Absolute or relative path to the private  RSA key.<br/> 
***encrypted*** - Option to decide if the local credentials should get encrypted with the private RSA key. If true the file is encrypted.<br/> 
***credsPath*** - Absolute or relative path to the credentials file to store retrieve the credentials object.<br/> 
***modifiable*** - Option to enable or disable the save/update capabilities of this plugin.<br/> 

**Methods:**
```javascript
  credentials.get({credsPath: resolve(options.credsPath)})
  .then(credentials => {
    // decrypted object with all credentials
  });
  
  credentials.store({credentials: appCredentials});
```

## developeractions

**Description:**

**Requires:**

**Parameters:**

## env

**Description:**

**Requires:**

**Parameters:**

## geolocation

**Description:**

**Requires:**

**Parameters:**

## languagetranslator

**Description:**

**Requires:**

**Parameters:**

## templating

**Description:**

**Requires:**

**Parameters:**

## toneanalyzer

**Description:**

**Requires:**

**Parameters:**

## wch

**Description:**

**Requires:**

**Parameters:**

## wchconversation

**Description:**

**Requires:**

**Parameters:**

## wchsync

**Description:**

**Requires:**

**Parameters:**

[watsonconversationurl]: https://www.ibm.com/watson/services/conversation/
[watsoncontenthuburl]: https://www.ibm.com/de-de/marketplace/cloud-cms-solution
[architecturl]: https://github.com/c9/architect
[conversationmiddlewareurl]: https://github.com/watson-developer-cloud/botkit-middleware
[watsoncloudconversationurl]: https://github.com/watson-developer-cloud/node-sdk/#conversation
[generatesshurl]: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
[botkitconversationmiddlewareurl]:https://github.com/watson-developer-cloud/botkit-middleware
