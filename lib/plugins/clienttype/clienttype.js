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

const debug = require('debug')('conversation-core:clienttype');

/* All plugins must export this public signature.
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
module.exports = function setup(options, imports, register) {
  debug('SETUP - Clienttype. Options %o, imports %o', options, imports);

  const identifyClientType = function (message, conversationPayload) {
    debug('ENTER - identifyClientType(%o, %o)', message, conversationPayload);
    let {type} = message;
    return new Promise((resolve, reject) => {
      try {
        let clientType;
        switch (type) {
            case 'message.rest':
              clientType = 'rest';
              break;
            case 'user_message':
              clientType = 'fb';
              break;
            case 'message.alexaintent':
              clientType = 'alexa';
              break;
            case 'message':
              clientType = 'slack';
              break;
            default:
              clientType = 'unsupported'
              break;
        }
        debug('RETURN - identifyClientType %s', clientType);
        resolve({clientType});
      }
      catch (err) {
        reject(err);
      }
    });
  }

  debug('SETUP DONE - Clienttype. Options %o, imports %o', options, imports);
  register(null, {
    clientType: {
      identify: identifyClientType
    },
    clientTypeMiddleware: {
      before: identifyClientType
    }
  });
}