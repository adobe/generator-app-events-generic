/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { constants } = require('@adobe/generator-app-common-lib')
const EventsStandardGenerator = require('@adobe/generator-add-events-generic')
const Generator = require('yeoman-generator')
const path = require('path')

class EventsAppGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts)

    // options are inputs from CLI or yeoman parent generator
    this.option('skip-prompt', { default: false })
    this.option('is-test', { default: false })
  }

  async initializing () {
    // All paths are relative to root
    this.appFolder = '.'
    this.actionFolder = path.join(this.appFolder, constants.actionsDirname)
    this.configPath = path.join(this.appFolder, constants.appConfigFile)
    this.keyToManifest = 'application.' + constants.runtimeManifestKey
    this.keytoEventsManifest = 'application.events'

    const options = {
      // forward needed args
      'action-folder': this.actionFolder,
      'config-path': this.configPath,
      'full-key-to-manifest': this.keyToManifest,
      'full-key-to-events-manifest': this.keytoEventsManifest
    }
    console.log(JSON.stringify(options))
    this.composeWith({
      Generator: EventsStandardGenerator,
      path: 'unknown'
    }, options)
  }
}

module.exports = EventsAppGenerator
