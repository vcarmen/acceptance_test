'use strict';

var jsonPath = require('JSONPath').eval;

var url = require('url')

var GithubStepsWrapper = function () {

  this.World = require('../support/world.js').World

  this.When(/^I GET a non-existing resource$/, function(callback) {
    this.get('/does/not/exist', callback)
  })

  this.Then(/^the http status should be (\d+)$/, function(status, callback) {
    if (!assertResponse(this.lastResponse, callback)) { return }
    if (this.lastResponse.statusCode != status) {
      callback.fail('The last http response did not have the expected ' +
        'status, expected ' + status + ' but got ' +
        this.lastResponse.statusCode)
    } else {
      callback()
    }
  })

  this.Then(/^(?:the )?([\w_.$\[\]]+) should equal "([^"]+)"$/,
      function(key, expectedValue, callback) {
        if (!assertPropertyIs(this.lastResponse, key, expectedValue, callback)) {
            return
          }
          callback()
  })

  this.When(/^main application page is loaded$/, function(callback) {
    this.rootPath()
      callback()
  })

  this.Then(/^user redirects to start$/, function(callback) {
    this.uri('/start')
      callback();
  });

  this.Then(/^the output should contain HTML form$/, function(status, callback) {
      if (!assertResponse(this.lastResponse, callback)) { return }
      if (this.lastResponse.statusCode != status) {
        callback.fail('The last http response did not have the expected ' +
          'status, expected ' + status + ' but got ' +
          this.lastResponse.statusCode)
      } else {
        callback()
      }
  })

  function assertResponse(lastResponse, callback) {
    if (!lastResponse) {
      callback.fail(new Error('No request has been made until now.'))
      return false
    }
    return true
  }

  function assertBody(lastResponse, callback) {
    if (!assertResponse(lastResponse, callback)) { return false }
    if (!lastResponse.body) {
      callback.fail(new Error('The response to the last request had no body.'))
      return null
    }
    return lastResponse.body
  }

  function assertPropertyExists(lastResponse, key, expectedValue,
      callback) {
        if (lastResponse.body == null ){
            callback.fail(new Error('The response to the last request had no body.'))
            return null
        }
      return lastResponse.body
  }

  function assertPropertyIs(lastResponse, key, expectedValue, callback) {
    var value = assertPropertyExists(lastResponse, key, expectedValue, callback)
    if (value !== expectedValue) {
      callback.fail('The last response did not have the expected content in ' +
        'property ' + key + '. ' + 'Got:\n\n' + value + '\n\nExpected:\n\n' +
        expectedValue)
      return false
    }
    return true
  }

}

module.exports = GithubStepsWrapper
