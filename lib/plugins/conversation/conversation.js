/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const debug = require('debug')('conversation-core:conversation');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');

/* All plugins must export this public signature.
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
module.exports = function setup (options, imports, register) {
  let conversationServiceMap = new Map();
  options.locales = forEach(localeConfig => {
    let conversation = new ConversationV1({
      workspace_id: localeConfig.workspace,
      url: options.url,
      username: options.username,
      password: options.password,
      version_date: ConversationV1.VERSION_DATE_2017_04_21
    });

    conversationServiceMap.set(localeConfig.locale, conversation);
  });

  register(null, {
    conversation: conversationServiceMap
  });

}