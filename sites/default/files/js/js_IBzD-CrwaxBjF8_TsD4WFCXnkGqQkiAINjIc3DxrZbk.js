/**
 * @file
 * Drupal Bootstrap object.
 */

/**
 * All Drupal Bootstrap JavaScript APIs are contained in this namespace.
 *
 * @param {underscore} _
 * @param {jQuery} $
 * @param {Drupal} Drupal
 * @param {drupalSettings} drupalSettings
 */
(function (_, $, Drupal, drupalSettings) {
  'use strict';

  /**
   * @typedef Drupal.bootstrap
   */
  var Bootstrap = {
    processedOnce: {},
    settings: drupalSettings.bootstrap || {}
  };

  /**
   * Wraps Drupal.checkPlain() to ensure value passed isn't empty.
   *
   * Encodes special characters in a plain-text string for display as HTML.
   *
   * @param {string} str
   *   The string to be encoded.
   *
   * @return {string}
   *   The encoded string.
   *
   * @ingroup sanitization
   */
  Bootstrap.checkPlain = function (str) {
    return str && Drupal.checkPlain(str) || '';
  };

  /**
   * Creates a jQuery plugin.
   *
   * @param {String} id
   *   A jQuery plugin identifier located in $.fn.
   * @param {Function} plugin
   *   A constructor function used to initialize the for the jQuery plugin.
   * @param {Boolean} [noConflict]
   *   Flag indicating whether or not to create a ".noConflict()" helper method
   *   for the plugin.
   */
  Bootstrap.createPlugin = function (id, plugin, noConflict) {
    // Immediately return if plugin doesn't exist.
    if ($.fn[id] !== void 0) {
      return this.fatal('Specified jQuery plugin identifier already exists: @id. Use Drupal.bootstrap.replacePlugin() instead.', {'@id': id});
    }

    // Immediately return if plugin isn't a function.
    if (typeof plugin !== 'function') {
      return this.fatal('You must provide a constructor function to create a jQuery plugin "@id": @plugin', {'@id': id, '@plugin':  plugin});
    }

    // Add a ".noConflict()" helper method.
    this.pluginNoConflict(id, plugin, noConflict);

    $.fn[id] = plugin;
  };

  /**
   * Diff object properties.
   *
   * @param {...Object} objects
   *   Two or more objects. The first object will be used to return properties
   *   values.
   *
   * @return {Object}
   *   Returns the properties of the first passed object that are not present
   *   in all other passed objects.
   */
  Bootstrap.diffObjects = function (objects) {
    var args = Array.prototype.slice.call(arguments);
    return _.pick(args[0], _.difference.apply(_, _.map(args, function (obj) {
      return Object.keys(obj);
    })));
  };

  /**
   * Map of supported events by regular expression.
   *
   * @type {Object<Event|MouseEvent|KeyboardEvent|TouchEvent,RegExp>}
   */
  Bootstrap.eventMap = {
    Event: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    MouseEvent: /^(?:click|dblclick|mouse(?:down|enter|leave|up|over|move|out))$/,
    KeyboardEvent: /^(?:key(?:down|press|up))$/,
    TouchEvent: /^(?:touch(?:start|end|move|cancel))$/
  };

  /**
   * Extends a jQuery Plugin.
   *
   * @param {String} id
   *   A jQuery plugin identifier located in $.fn.
   * @param {Function} callback
   *   A constructor function used to initialize the for the jQuery plugin.
   *
   * @return {Function|Boolean}
   *   The jQuery plugin constructor or FALSE if the plugin does not exist.
   */
  Bootstrap.extendPlugin = function (id, callback) {
    // Immediately return if plugin doesn't exist.
    if (typeof $.fn[id] !== 'function') {
      return this.fatal('Specified jQuery plugin identifier does not exist: @id', {'@id':  id});
    }

    // Immediately return if callback isn't a function.
    if (typeof callback !== 'function') {
      return this.fatal('You must provide a callback function to extend the jQuery plugin "@id": @callback', {'@id': id, '@callback':  callback});
    }

    // Determine existing plugin constructor.
    var constructor = $.fn[id] && $.fn[id].Constructor || $.fn[id];
    var plugin = callback.apply(constructor, [this.settings]);
    if (!$.isPlainObject(plugin)) {
      return this.fatal('Returned value from callback is not a plain object that can be used to extend the jQuery plugin "@id": @obj', {'@obj':  plugin});
    }

    this.wrapPluginConstructor(constructor, plugin, true);

    return $.fn[id];
  };

  Bootstrap.superWrapper = function (parent, fn) {
    return function () {
      var previousSuper = this.super;
      this.super = parent;
      var ret = fn.apply(this, arguments);
      if (previousSuper) {
        this.super = previousSuper;
      }
      else {
        delete this.super;
      }
      return ret;
    };
  };

  /**
   * Provide a helper method for displaying when something is went wrong.
   *
   * @param {String} message
   *   The message to display.
   * @param {Object} [args]
   *   An arguments to use in message.
   *
   * @return {Boolean}
   *   Always returns FALSE.
   */
  Bootstrap.fatal = function (message, args) {
    if (this.settings.dev && console.warn) {
      for (var name in args) {
        if (args.hasOwnProperty(name) && typeof args[name] === 'object') {
          args[name] = JSON.stringify(args[name]);
        }
      }
      Drupal.throwError(new Error(Drupal.formatString(message, args)));
    }
    return false;
  };

  /**
   * Intersects object properties.
   *
   * @param {...Object} objects
   *   Two or more objects. The first object will be used to return properties
   *   values.
   *
   * @return {Object}
   *   Returns the properties of first passed object that intersects with all
   *   other passed objects.
   */
  Bootstrap.intersectObjects = function (objects) {
    var args = Array.prototype.slice.call(arguments);
    return _.pick(args[0], _.intersection.apply(_, _.map(args, function (obj) {
      return Object.keys(obj);
    })));
  };

  /**
   * Normalizes an object's values.
   *
   * @param {Object} obj
   *   The object to normalize.
   *
   * @return {Object}
   *   The normalized object.
   */
  Bootstrap.normalizeObject = function (obj) {
    if (!$.isPlainObject(obj)) {
      return obj;
    }

    for (var k in obj) {
      if (typeof obj[k] === 'string') {
        if (obj[k] === 'true') {
          obj[k] = true;
        }
        else if (obj[k] === 'false') {
          obj[k] = false;
        }
        else if (obj[k].match(/^[\d-.]$/)) {
          obj[k] = parseFloat(obj[k]);
        }
      }
      else if ($.isPlainObject(obj[k])) {
        obj[k] = Bootstrap.normalizeObject(obj[k]);
      }
    }

    return obj;
  };

  /**
   * An object based once plugin (similar to jquery.once, but without the DOM).
   *
   * @param {String} id
   *   A unique identifier.
   * @param {Function} callback
   *   The callback to invoke if the identifier has not yet been seen.
   *
   * @return {Bootstrap}
   */
  Bootstrap.once = function (id, callback) {
    // Immediately return if identifier has already been processed.
    if (this.processedOnce[id]) {
      return this;
    }
    callback.call(this, this.settings);
    this.processedOnce[id] = true;
    return this;
  };

  /**
   * Provide jQuery UI like ability to get/set options for Bootstrap plugins.
   *
   * @param {string|object} key
   *   A string value of the option to set, can be dot like to a nested key.
   *   An object of key/value pairs.
   * @param {*} [value]
   *   (optional) A value to set for key.
   *
   * @returns {*}
   *   - Returns nothing if key is an object or both key and value parameters
   *   were provided to set an option.
   *   - Returns the a value for a specific setting if key was provided.
   *   - Returns an object of key/value pairs of all the options if no key or
   *   value parameter was provided.
   *
   * @see https://github.com/jquery/jquery-ui/blob/master/ui/widget.js
   */
  Bootstrap.option = function (key, value) {
    var options = $.isPlainObject(key) ? $.extend({}, key) : {};

    // Get all options (clone so it doesn't reference the internal object).
    if (arguments.length === 0) {
      return $.extend({}, this.options);
    }

    // Get/set single option.
    if (typeof key === "string") {
      // Handle nested keys in dot notation.
      // e.g., "foo.bar" => { foo: { bar: true } }
      var parts = key.split('.');
      key = parts.shift();
      var obj = options;
      if (parts.length) {
        for (var i = 0; i < parts.length - 1; i++) {
          obj[parts[i]] = obj[parts[i]] || {};
          obj = obj[parts[i]];
        }
        key = parts.pop();
      }

      // Get.
      if (arguments.length === 1) {
        return obj[key] === void 0 ? null : obj[key];
      }

      // Set.
      obj[key] = value;
    }

    // Set multiple options.
    $.extend(true, this.options, options);
  };

  /**
   * Adds a ".noConflict()" helper method if needed.
   *
   * @param {String} id
   *   A jQuery plugin identifier located in $.fn.
   * @param {Function} plugin
   * @param {Function} plugin
   *   A constructor function used to initialize the for the jQuery plugin.
   * @param {Boolean} [noConflict]
   *   Flag indicating whether or not to create a ".noConflict()" helper method
   *   for the plugin.
   */
  Bootstrap.pluginNoConflict = function (id, plugin, noConflict) {
    if (plugin.noConflict === void 0 && (noConflict === void 0 || noConflict)) {
      var old = $.fn[id];
      plugin.noConflict = function () {
        $.fn[id] = old;
        return this;
      };
    }
  };

  /**
   * Creates a handler that relays to another event name.
   *
   * @param {HTMLElement|jQuery} target
   *   A target element.
   * @param {String} name
   *   The name of the event to trigger.
   * @param {Boolean} [stopPropagation=true]
   *   Flag indicating whether to stop the propagation of the event, defaults
   *   to true.
   *
   * @return {Function}
   *   An even handler callback function.
   */
  Bootstrap.relayEvent = function (target, name, stopPropagation) {
    return function (e) {
      if (stopPropagation === void 0 || stopPropagation) {
        e.stopPropagation();
      }
      var $target = $(target);
      var parts = name.split('.').filter(Boolean);
      var type = parts.shift();
      e.target = $target[0];
      e.currentTarget = $target[0];
      e.namespace = parts.join('.');
      e.type = type;
      $target.trigger(e);
    };
  };

  /**
   * Replaces a Bootstrap jQuery plugin definition.
   *
   * @param {String} id
   *   A jQuery plugin identifier located in $.fn.
   * @param {Function} callback
   *   A callback function that is immediately invoked and must return a
   *   function that will be used as the plugin constructor.
   * @param {Boolean} [noConflict]
   *   Flag indicating whether or not to create a ".noConflict()" helper method
   *   for the plugin.
   */
  Bootstrap.replacePlugin = function (id, callback, noConflict) {
    // Immediately return if plugin doesn't exist.
    if (typeof $.fn[id] !== 'function') {
      return this.fatal('Specified jQuery plugin identifier does not exist: @id', {'@id':  id});
    }

    // Immediately return if callback isn't a function.
    if (typeof callback !== 'function') {
      return this.fatal('You must provide a valid callback function to replace a jQuery plugin: @callback', {'@callback': callback});
    }

    // Determine existing plugin constructor.
    var constructor = $.fn[id] && $.fn[id].Constructor || $.fn[id];
    var plugin = callback.apply(constructor, [this.settings]);

    // Immediately return if plugin isn't a function.
    if (typeof plugin !== 'function') {
      return this.fatal('Returned value from callback is not a usable function to replace a jQuery plugin "@id": @plugin', {'@id': id, '@plugin': plugin});
    }

    this.wrapPluginConstructor(constructor, plugin);

    // Add a ".noConflict()" helper method.
    this.pluginNoConflict(id, plugin, noConflict);

    $.fn[id] = plugin;
  };

  /**
   * Simulates a native event on an element in the browser.
   *
   * Note: This is a fairly complete modern implementation. If things aren't
   * working quite the way you intend (in older browsers), you may wish to use
   * the jQuery.simulate plugin. If it's available, this method will defer to
   * that plugin.
   *
   * @see https://github.com/jquery/jquery-simulate
   *
   * @param {HTMLElement|jQuery} element
   *   A DOM element to dispatch event on. Note: this may be a jQuery object,
   *   however be aware that this will trigger the same event for each element
   *   inside the jQuery collection; use with caution.
   * @param {String|String[]} type
   *   The type(s) of event to simulate.
   * @param {Object} [options]
   *   An object of options to pass to the event constructor. Typically, if
   *   an event is being proxied, you should just pass the original event
   *   object here. This allows, if the browser supports it, to be a truly
   *   simulated event.
   *
   * @return {Boolean}
   *   The return value is false if event is cancelable and at least one of the
   *   event handlers which handled this event called Event.preventDefault().
   *   Otherwise it returns true.
   */
  Bootstrap.simulate = function (element, type, options) {
    // Handle jQuery object wrappers so it triggers on each element.
    var ret = true;
    if (element instanceof $) {
      element.each(function () {
        if (!Bootstrap.simulate(this, type, options)) {
          ret = false;
        }
      });
      return ret;
    }

    if (!(element instanceof HTMLElement)) {
      this.fatal('Passed element must be an instance of HTMLElement, got "@type" instead.', {
        '@type': typeof element,
      });
    }

    // Defer to the jQuery.simulate plugin, if it's available.
    if (typeof $.simulate === 'function') {
      new $.simulate(element, type, options);
      return true;
    }

    var event;
    var ctor;
    var types = [].concat(type);
    for (var i = 0, l = types.length; i < l; i++) {
      type = types[i];
      for (var name in this.eventMap) {
        if (this.eventMap[name].test(type)) {
          ctor = name;
          break;
        }
      }
      if (!ctor) {
        throw new SyntaxError('Only rudimentary HTMLEvents, KeyboardEvents and MouseEvents are supported: ' + type);
      }
      var opts = {bubbles: true, cancelable: true};
      if (ctor === 'KeyboardEvent' || ctor === 'MouseEvent') {
        $.extend(opts, {ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1});
      }
      if (ctor === 'MouseEvent') {
        $.extend(opts, {button: 0, pointerX: 0, pointerY: 0, view: window});
      }
      if (options) {
        $.extend(opts, options);
      }
      if (typeof window[ctor] === 'function') {
        event = new window[ctor](type, opts);
        if (!element.dispatchEvent(event)) {
          ret = false;
        }
      }
      else if (document.createEvent) {
        event = document.createEvent(ctor);
        event.initEvent(type, opts.bubbles, opts.cancelable);
        if (!element.dispatchEvent(event)) {
          ret = false;
        }
      }
      else if (typeof element.fireEvent === 'function') {
        event = $.extend(document.createEventObject(), opts);
        if (!element.fireEvent('on' + type, event)) {
          ret = false;
        }
      }
      else if (typeof element[type]) {
        element[type]();
      }
    }
    return ret;
  };

  /**
   * Strips HTML and returns just text.
   *
   * @param {String|Element|jQuery} html
   *   A string of HTML content, an Element DOM object or a jQuery object.
   *
   * @return {String}
   *   The text without HTML tags.
   *
   * @todo Replace with http://locutus.io/php/strings/strip_tags/
   */
  Bootstrap.stripHtml = function (html) {
    if (html instanceof $) {
      html = html.html();
    }
    else if (html instanceof Element) {
      html = html.innerHTML;
    }
    var tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(/^[\s\n\t]*|[\s\n\t]*$/, '');
  };

  /**
   * Provide a helper method for displaying when something is unsupported.
   *
   * @param {String} type
   *   The type of unsupported object, e.g. method or option.
   * @param {String} name
   *   The name of the unsupported object.
   * @param {*} [value]
   *   The value of the unsupported object.
   */
  Bootstrap.unsupported = function (type, name, value) {
    Bootstrap.warn('Unsupported by Drupal Bootstrap: (@type) @name -> @value', {
      '@type': type,
      '@name': name,
      '@value': typeof value === 'object' ? JSON.stringify(value) : value
    });
  };

  /**
   * Provide a helper method to display a warning.
   *
   * @param {String} message
   *   The message to display.
   * @param {Object} [args]
   *   Arguments to use as replacements in Drupal.formatString.
   */
  Bootstrap.warn = function (message, args) {
    if (this.settings.dev && console.warn) {
      console.warn(Drupal.formatString(message, args));
    }
  };

  /**
   * Wraps a plugin with common functionality.
   *
   * @param {Function} constructor
   *   A plugin constructor being wrapped.
   * @param {Object|Function} plugin
   *   The plugin being wrapped.
   * @param {Boolean} [extend = false]
   *   Whether to add super extensibility.
   */
  Bootstrap.wrapPluginConstructor = function (constructor, plugin, extend) {
    var proto = constructor.prototype;

    // Add a jQuery UI like option getter/setter method.
    var option = this.option;
    if (proto.option === void(0)) {
      proto.option = function () {
        return option.apply(this, arguments);
      };
    }

    if (extend) {
      // Handle prototype properties separately.
      if (plugin.prototype !== void 0) {
        for (var key in plugin.prototype) {
          if (!plugin.prototype.hasOwnProperty(key)) continue;
          var value = plugin.prototype[key];
          if (typeof value === 'function') {
            proto[key] = this.superWrapper(proto[key] || function () {}, value);
          }
          else {
            proto[key] = $.isPlainObject(value) ? $.extend(true, {}, proto[key], value) : value;
          }
        }
      }
      delete plugin.prototype;

      // Handle static properties.
      for (key in plugin) {
        if (!plugin.hasOwnProperty(key)) continue;
        value = plugin[key];
        if (typeof value === 'function') {
          constructor[key] = this.superWrapper(constructor[key] || function () {}, value);
        }
        else {
          constructor[key] = $.isPlainObject(value) ? $.extend(true, {}, constructor[key], value) : value;
        }
      }
    }
  };

  // Add Bootstrap to the global Drupal object.
  Drupal.bootstrap = Drupal.bootstrap || Bootstrap;

})(window._, window.jQuery, window.Drupal, window.drupalSettings);
;
(function ($, _) {

  /**
   * @class Attributes
   *
   * Modifies attributes.
   *
   * @param {Object|Attributes} attributes
   *   An object to initialize attributes with.
   */
  var Attributes = function (attributes) {
    this.data = {};
    this.data['class'] = [];
    this.merge(attributes);
  };

  /**
   * Renders the attributes object as a string to inject into an HTML element.
   *
   * @return {String}
   *   A rendered string suitable for inclusion in HTML markup.
   */
  Attributes.prototype.toString = function () {
    var output = '';
    var name, value;
    var checkPlain = function (str) {
      return str && str.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
    };
    var data = this.getData();
    for (name in data) {
      if (!data.hasOwnProperty(name)) continue;
      value = data[name];
      if (_.isFunction(value)) value = value();
      if (_.isObject(value)) value = _.values(value);
      if (_.isArray(value)) value = value.join(' ');
      output += ' ' + checkPlain(name) + '="' + checkPlain(value) + '"';
    }
    return output;
  };

  /**
   * Renders the Attributes object as a plain object.
   *
   * @return {Object}
   *   A plain object suitable for inclusion in DOM elements.
   */
  Attributes.prototype.toPlainObject = function () {
    var object = {};
    var name, value;
    var data = this.getData();
    for (name in data) {
      if (!data.hasOwnProperty(name)) continue;
      value = data[name];
      if (_.isFunction(value)) value = value();
      if (_.isObject(value)) value = _.values(value);
      if (_.isArray(value)) value = value.join(' ');
      object[name] = value;
    }
    return object;
  };

  /**
   * Add class(es) to the array.
   *
   * @param {string|Array} value
   *   An individual class or an array of classes to add.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.addClass = function (value) {
    var args = Array.prototype.slice.call(arguments);
    this.data['class'] = this.sanitizeClasses(this.data['class'].concat(args));
    return this;
  };

  /**
   * Returns whether the requested attribute exists.
   *
   * @param {string} name
   *   An attribute name to check.
   *
   * @return {boolean}
   *   TRUE or FALSE
   */
  Attributes.prototype.exists = function (name) {
    return this.data[name] !== void(0) && this.data[name] !== null;
  };

  /**
   * Retrieve a specific attribute from the array.
   *
   * @param {string} name
   *   The specific attribute to retrieve.
   * @param {*} defaultValue
   *   (optional) The default value to set if the attribute does not exist.
   *
   * @return {*}
   *   A specific attribute value, passed by reference.
   */
  Attributes.prototype.get = function (name, defaultValue) {
    if (!this.exists(name)) this.data[name] = defaultValue;
    return this.data[name];
  };

  /**
   * Retrieves a cloned copy of the internal attributes data object.
   *
   * @return {Object}
   */
  Attributes.prototype.getData = function () {
    return _.extend({}, this.data);
  };

  /**
   * Retrieves classes from the array.
   *
   * @return {Array}
   *   The classes array.
   */
  Attributes.prototype.getClasses = function () {
    return this.get('class', []);
  };

  /**
   * Indicates whether a class is present in the array.
   *
   * @param {string|Array} className
   *   The class(es) to search for.
   *
   * @return {boolean}
   *   TRUE or FALSE
   */
  Attributes.prototype.hasClass = function (className) {
    className = this.sanitizeClasses(Array.prototype.slice.call(arguments));
    var classes = this.getClasses();
    for (var i = 0, l = className.length; i < l; i++) {
      // If one of the classes fails, immediately return false.
      if (_.indexOf(classes, className[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  /**
   * Merges multiple values into the array.
   *
   * @param {Attributes|Node|jQuery|Object} object
   *   An Attributes object with existing data, a Node DOM element, a jQuery
   *   instance or a plain object where the key is the attribute name and the
   *   value is the attribute value.
   * @param {boolean} [recursive]
   *   Flag determining whether or not to recursively merge key/value pairs.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.merge = function (object, recursive) {
    // Immediately return if there is nothing to merge.
    if (!object) {
      return this;
    }

    // Get attributes from a jQuery element.
    if (object instanceof $) {
      object = object[0];
    }

    // Get attributes from a DOM element.
    if (object instanceof Node) {
      object = Array.prototype.slice.call(object.attributes).reduce(function (attributes, attribute) {
        attributes[attribute.name] = attribute.value;
        return attributes;
      }, {});
    }
    // Get attributes from an Attributes instance.
    else if (object instanceof Attributes) {
      object = object.getData();
    }
    // Otherwise, clone the object.
    else {
      object = _.extend({}, object);
    }

    // By this point, there should be a valid plain object.
    if (!$.isPlainObject(object)) {
      setTimeout(function () {
        throw new Error('Passed object is not supported: ' + object);
      });
      return this;
    }

    // Handle classes separately.
    if (object && object['class'] !== void 0) {
      this.addClass(object['class']);
      delete object['class'];
    }

    if (recursive === void 0 || recursive) {
      this.data = $.extend(true, {}, this.data, object);
    }
    else {
      this.data = $.extend({}, this.data, object);
    }

    return this;
  };

  /**
   * Removes an attribute from the array.
   *
   * @param {string} name
   *   The name of the attribute to remove.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.remove = function (name) {
    if (this.exists(name)) delete this.data[name];
    return this;
  };

  /**
   * Removes a class from the attributes array.
   *
   * @param {...string|Array} className
   *   An individual class or an array of classes to remove.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.removeClass = function (className) {
    var remove = this.sanitizeClasses(Array.prototype.slice.apply(arguments));
    this.data['class'] = _.without(this.getClasses(), remove);
    return this;
  };

  /**
   * Replaces a class in the attributes array.
   *
   * @param {string} oldValue
   *   The old class to remove.
   * @param {string} newValue
   *   The new class. It will not be added if the old class does not exist.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.replaceClass = function (oldValue, newValue) {
    var classes = this.getClasses();
    var i = _.indexOf(this.sanitizeClasses(oldValue), classes);
    if (i >= 0) {
      classes[i] = newValue;
      this.set('class', classes);
    }
    return this;
  };

  /**
   * Ensures classes are flattened into a single is an array and sanitized.
   *
   * @param {...String|Array} classes
   *   The class or classes to sanitize.
   *
   * @return {Array}
   *   A sanitized array of classes.
   */
  Attributes.prototype.sanitizeClasses = function (classes) {
    return _.chain(Array.prototype.slice.call(arguments))
      // Flatten in case there's a mix of strings and arrays.
      .flatten()

      // Split classes that may have been added with a space as a separator.
      .map(function (string) {
        return string.split(' ');
      })

      // Flatten again since it was just split into arrays.
      .flatten()

      // Filter out empty items.
      .filter()

      // Clean the class to ensure it's a valid class name.
      .map(function (value) {
        return Attributes.cleanClass(value);
      })

      // Ensure classes are unique.
      .uniq()

      // Retrieve the final value.
      .value();
  };

  /**
   * Sets an attribute on the array.
   *
   * @param {string} name
   *   The name of the attribute to set.
   * @param {*} value
   *   The value of the attribute to set.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.set = function (name, value) {
    var obj = $.isPlainObject(name) ? name : {};
    if (typeof name === 'string') {
      obj[name] = value;
    }
    return this.merge(obj);
  };

  /**
   * Prepares a string for use as a CSS identifier (element, class, or ID name).
   *
   * Note: this is essentially a direct copy from
   * \Drupal\Component\Utility\Html::cleanCssIdentifier
   *
   * @param {string} identifier
   *   The identifier to clean.
   * @param {Object} [filter]
   *   An object of string replacements to use on the identifier.
   *
   * @return {string}
   *   The cleaned identifier.
   */
  Attributes.cleanClass = function (identifier, filter) {
    filter = filter || {
      ' ': '-',
      '_': '-',
      '/': '-',
      '[': '-',
      ']': ''
    };

    identifier = identifier.toLowerCase();

    if (filter['__'] === void 0) {
      identifier = identifier.replace('__', '#DOUBLE_UNDERSCORE#');
    }

    identifier = identifier.replace(Object.keys(filter), Object.keys(filter).map(function(key) { return filter[key]; }));

    if (filter['__'] === void 0) {
      identifier = identifier.replace('#DOUBLE_UNDERSCORE#', '__');
    }

    identifier = identifier.replace(/[^\u002D\u0030-\u0039\u0041-\u005A\u005F\u0061-\u007A\u00A1-\uFFFF]/g, '');
    identifier = identifier.replace(['/^[0-9]/', '/^(-[0-9])|^(--)/'], ['_', '__']);

    return identifier;
  };

  /**
   * Creates an Attributes instance.
   *
   * @param {object|Attributes} [attributes]
   *   An object to initialize attributes with.
   *
   * @return {Attributes}
   *   An Attributes instance.
   *
   * @constructor
   */
  Attributes.create = function (attributes) {
    return new Attributes(attributes);
  };

  window.Attributes = Attributes;

})(window.jQuery, window._);
;
/**
 * @file
 * Theme hooks for the Drupal Bootstrap base theme.
 */
(function ($, Drupal, Bootstrap, Attributes) {

  /**
   * Fallback for theming an icon if the Icon API module is not installed.
   */
  if (!Drupal.icon) Drupal.icon = { bundles: {} };
  if (!Drupal.theme.icon || Drupal.theme.prototype.icon) {
    $.extend(Drupal.theme, /** @lends Drupal.theme */ {
      /**
       * Renders an icon.
       *
       * @param {string} bundle
       *   The bundle which the icon belongs to.
       * @param {string} icon
       *   The name of the icon to render.
       * @param {object|Attributes} [attributes]
       *   An object of attributes to also apply to the icon.
       *
       * @returns {string}
       */
      icon: function (bundle, icon, attributes) {
        if (!Drupal.icon.bundles[bundle]) return '';
        attributes = Attributes.create(attributes).addClass('icon').set('aria-hidden', 'true');
        icon = Drupal.icon.bundles[bundle](icon, attributes);
        return '<span' + attributes + '></span>';
      }
    });
  }

  /**
   * Callback for modifying an icon in the "bootstrap" icon bundle.
   *
   * @param {string} icon
   *   The icon being rendered.
   * @param {Attributes} attributes
   *   Attributes object for the icon.
   */
  Drupal.icon.bundles.bootstrap = function (icon, attributes) {
    attributes.addClass(['glyphicon', 'glyphicon-' + icon]);
  };

  /**
   * Add necessary theming hooks.
   */
  $.extend(Drupal.theme, /** @lends Drupal.theme */ {

    /**
     * Renders a Bootstrap AJAX glyphicon throbber.
     *
     * @returns {string}
     */
    ajaxThrobber: function () {
      return Drupal.theme('bootstrapIcon', 'refresh', {'class': ['ajax-throbber', 'glyphicon-spin'] });
    },

    /**
     * Renders a button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button. If it contains one of:
     *   - value: The label of the button.
     *   - context: The context type of Bootstrap button, can be one of:
     *     - default
     *     - primary
     *     - success
     *     - info
     *     - warning
     *     - danger
     *     - link
     *
     * @returns {string}
     */
    button: function (attributes) {
      attributes = Attributes.create(attributes).addClass('btn');
      var context = attributes.get('context', 'default');
      var label = attributes.get('value', '');
      attributes.remove('context').remove('value');
      if (!attributes.hasClass(['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link'])) {
        attributes.addClass('btn-' + Bootstrap.checkPlain(context));
      }

      // Attempt to, intelligently, provide a default button "type".
      if (!attributes.exists('type')) {
        attributes.set('type', attributes.hasClass('form-submit') ? 'submit' : 'button');
      }

      return '<button' + attributes + '>' + label + '</button>';
    },

    /**
     * Alias for "button" theme hook.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    btn: function (attributes) {
      return Drupal.theme('button', attributes);
    },

    /**
     * Renders a button block element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-block': function (attributes) {
      return Drupal.theme('button', Attributes.create(attributes).addClass('btn-block'));
    },

    /**
     * Renders a large button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-lg': function (attributes) {
      return Drupal.theme('button', Attributes.create(attributes).addClass('btn-lg'));
    },

    /**
     * Renders a small button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-sm': function (attributes) {
      return Drupal.theme('button', Attributes.create(attributes).addClass('btn-sm'));
    },

    /**
     * Renders an extra small button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-xs': function (attributes) {
      return Drupal.theme('button', Attributes.create(attributes).addClass('btn-xs'));
    },

    /**
     * Renders a glyphicon.
     *
     * @param {string} name
     *   The name of the glyphicon.
     * @param {object|Attributes} [attributes]
     *   An object of attributes to apply to the icon.
     *
     * @returns {string}
     */
    bootstrapIcon: function (name, attributes) {
      return Drupal.theme('icon', 'bootstrap', name, attributes);
    }

  });

})(window.jQuery, window.Drupal, window.Drupal.bootstrap, window.Attributes);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, drupalSettings) {
  Drupal.behaviors.activeLinks = {
    attach: function attach(context) {
      var path = drupalSettings.path;
      var queryString = JSON.stringify(path.currentQuery);
      var querySelector = path.currentQuery ? "[data-drupal-link-query='".concat(queryString, "']") : ':not([data-drupal-link-query])';
      var originalSelectors = ["[data-drupal-link-system-path=\"".concat(path.currentPath, "\"]")];
      var selectors;

      if (path.isFront) {
        originalSelectors.push('[data-drupal-link-system-path="<front>"]');
      }

      selectors = [].concat(originalSelectors.map(function (selector) {
        return "".concat(selector, ":not([hreflang])");
      }), originalSelectors.map(function (selector) {
        return "".concat(selector, "[hreflang=\"").concat(path.currentLanguage, "\"]");
      }));
      selectors = selectors.map(function (current) {
        return current + querySelector;
      });
      var activeLinks = context.querySelectorAll(selectors.join(','));
      var il = activeLinks.length;

      for (var i = 0; i < il; i++) {
        activeLinks[i].classList.add('is-active');
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        var activeLinks = context.querySelectorAll('[data-drupal-link-system-path].is-active');
        var il = activeLinks.length;

        for (var i = 0; i < il; i++) {
          activeLinks[i].classList.remove('is-active');
        }
      }
    }
  };
})(Drupal, drupalSettings);;
/**
 * @file
 * Webform behaviors.
 */

(function ($, Drupal) {

  'use strict';

  // Trigger Drupal's attaching of behaviors after the page is
  // completely loaded.
  // @see https://stackoverflow.com/questions/37838430/detect-if-page-is-load-from-back-button
  // @see https://stackoverflow.com/questions/20899274/how-to-refresh-page-on-back-button-click/20899422#20899422
  var isChrome = (/chrom(e|ium)/.test(window.navigator.userAgent.toLowerCase()));
  if (isChrome) {
    // Track back button in navigation.
    // @see https://stackoverflow.com/questions/37838430/detect-if-page-is-load-from-back-button
    var backButton = false;
    if (window.performance) {
      var navEntries = window.performance.getEntriesByType('navigation');
      if (navEntries.length > 0 && navEntries[0].type === 'back_forward') {
        backButton = true;
      }
      else if (window.performance.navigation
        && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
        backButton = true;
      }
    }

    // If the back button is pressed, delay Drupal's attaching of behaviors.
    if (backButton) {
      var attachBehaviors = Drupal.attachBehaviors;
      Drupal.attachBehaviors = function (context, settings) {
        setTimeout(function (context, settings) {
          attachBehaviors(context, settings);
        }, 300);
      };
    }
  }

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  var states = {
    postponed: []
  };
  Drupal.states = states;

  function invert(a, invertState) {
    return invertState && typeof a !== 'undefined' ? !a : a;
  }

  function _compare2(a, b) {
    if (a === b) {
      return typeof a === 'undefined' ? a : true;
    }

    return typeof a === 'undefined' || typeof b === 'undefined';
  }

  function ternary(a, b) {
    if (typeof a === 'undefined') {
      return b;
    }

    if (typeof b === 'undefined') {
      return a;
    }

    return a && b;
  }

  Drupal.behaviors.states = {
    attach: function attach(context, settings) {
      var $states = $(context).find('[data-drupal-states]');
      var il = $states.length;

      var _loop = function _loop(i) {
        var config = JSON.parse($states[i].getAttribute('data-drupal-states'));
        Object.keys(config || {}).forEach(function (state) {
          new states.Dependent({
            element: $($states[i]),
            state: states.State.sanitize(state),
            constraints: config[state]
          });
        });
      };

      for (var i = 0; i < il; i++) {
        _loop(i);
      }

      while (states.postponed.length) {
        states.postponed.shift()();
      }
    }
  };

  states.Dependent = function (args) {
    var _this = this;

    $.extend(this, {
      values: {},
      oldValue: null
    }, args);
    this.dependees = this.getDependees();
    Object.keys(this.dependees || {}).forEach(function (selector) {
      _this.initializeDependee(selector, _this.dependees[selector]);
    });
  };

  states.Dependent.comparisons = {
    RegExp: function RegExp(reference, value) {
      return reference.test(value);
    },
    Function: function Function(reference, value) {
      return reference(value);
    },
    Number: function Number(reference, value) {
      return typeof value === 'string' ? _compare2(reference.toString(), value) : _compare2(reference, value);
    }
  };
  states.Dependent.prototype = {
    initializeDependee: function initializeDependee(selector, dependeeStates) {
      var _this2 = this;

      this.values[selector] = {};
      Object.keys(dependeeStates).forEach(function (i) {
        var state = dependeeStates[i];

        if ($.inArray(state, dependeeStates) === -1) {
          return;
        }

        state = states.State.sanitize(state);
        _this2.values[selector][state.name] = null;
        $(selector).on("state:".concat(state), {
          selector: selector,
          state: state
        }, function (e) {
          _this2.update(e.data.selector, e.data.state, e.value);
        });
        new states.Trigger({
          selector: selector,
          state: state
        });
      });
    },
    compare: function compare(reference, selector, state) {
      var value = this.values[selector][state.name];

      if (reference.constructor.name in states.Dependent.comparisons) {
        return states.Dependent.comparisons[reference.constructor.name](reference, value);
      }

      return _compare2(reference, value);
    },
    update: function update(selector, state, value) {
      if (value !== this.values[selector][state.name]) {
        this.values[selector][state.name] = value;
        this.reevaluate();
      }
    },
    reevaluate: function reevaluate() {
      var value = this.verifyConstraints(this.constraints);

      if (value !== this.oldValue) {
        this.oldValue = value;
        value = invert(value, this.state.invert);
        this.element.trigger({
          type: "state:".concat(this.state),
          value: value,
          trigger: true
        });
      }
    },
    verifyConstraints: function verifyConstraints(constraints, selector) {
      var result;

      if ($.isArray(constraints)) {
        var hasXor = $.inArray('xor', constraints) === -1;
        var len = constraints.length;

        for (var i = 0; i < len; i++) {
          if (constraints[i] !== 'xor') {
            var constraint = this.checkConstraints(constraints[i], selector, i);

            if (constraint && (hasXor || result)) {
              return hasXor;
            }

            result = result || constraint;
          }
        }
      } else if ($.isPlainObject(constraints)) {
        for (var n in constraints) {
          if (constraints.hasOwnProperty(n)) {
            result = ternary(result, this.checkConstraints(constraints[n], selector, n));

            if (result === false) {
              return false;
            }
          }
        }
      }

      return result;
    },
    checkConstraints: function checkConstraints(value, selector, state) {
      if (typeof state !== 'string' || /[0-9]/.test(state[0])) {
        state = null;
      } else if (typeof selector === 'undefined') {
        selector = state;
        state = null;
      }

      if (state !== null) {
        state = states.State.sanitize(state);
        return invert(this.compare(value, selector, state), state.invert);
      }

      return this.verifyConstraints(value, selector);
    },
    getDependees: function getDependees() {
      var cache = {};
      var _compare = this.compare;

      this.compare = function (reference, selector, state) {
        (cache[selector] || (cache[selector] = [])).push(state.name);
      };

      this.verifyConstraints(this.constraints);
      this.compare = _compare;
      return cache;
    }
  };

  states.Trigger = function (args) {
    $.extend(this, args);

    if (this.state in states.Trigger.states) {
      this.element = $(this.selector);

      if (!this.element.data("trigger:".concat(this.state))) {
        this.initialize();
      }
    }
  };

  states.Trigger.prototype = {
    initialize: function initialize() {
      var _this3 = this;

      var trigger = states.Trigger.states[this.state];

      if (typeof trigger === 'function') {
        trigger.call(window, this.element);
      } else {
        Object.keys(trigger || {}).forEach(function (event) {
          _this3.defaultTrigger(event, trigger[event]);
        });
      }

      this.element.data("trigger:".concat(this.state), true);
    },
    defaultTrigger: function defaultTrigger(event, valueFn) {
      var oldValue = valueFn.call(this.element);
      this.element.on(event, $.proxy(function (e) {
        var value = valueFn.call(this.element, e);

        if (oldValue !== value) {
          this.element.trigger({
            type: "state:".concat(this.state),
            value: value,
            oldValue: oldValue
          });
          oldValue = value;
        }
      }, this));
      states.postponed.push($.proxy(function () {
        this.element.trigger({
          type: "state:".concat(this.state),
          value: oldValue,
          oldValue: null
        });
      }, this));
    }
  };
  states.Trigger.states = {
    empty: {
      keyup: function keyup() {
        return this.val() === '';
      }
    },
    checked: {
      change: function change() {
        var checked = false;
        this.each(function () {
          checked = $(this).prop('checked');
          return !checked;
        });
        return checked;
      }
    },
    value: {
      keyup: function keyup() {
        if (this.length > 1) {
          return this.filter(':checked').val() || false;
        }

        return this.val();
      },
      change: function change() {
        if (this.length > 1) {
          return this.filter(':checked').val() || false;
        }

        return this.val();
      }
    },
    collapsed: {
      collapsed: function collapsed(e) {
        return typeof e !== 'undefined' && 'value' in e ? e.value : !this.is('[open]');
      }
    }
  };

  states.State = function (state) {
    this.pristine = state;
    this.name = state;
    var process = true;

    do {
      while (this.name.charAt(0) === '!') {
        this.name = this.name.substring(1);
        this.invert = !this.invert;
      }

      if (this.name in states.State.aliases) {
        this.name = states.State.aliases[this.name];
      } else {
        process = false;
      }
    } while (process);
  };

  states.State.sanitize = function (state) {
    if (state instanceof states.State) {
      return state;
    }

    return new states.State(state);
  };

  states.State.aliases = {
    enabled: '!disabled',
    invisible: '!visible',
    invalid: '!valid',
    untouched: '!touched',
    optional: '!required',
    filled: '!empty',
    unchecked: '!checked',
    irrelevant: '!relevant',
    expanded: '!collapsed',
    open: '!collapsed',
    closed: 'collapsed',
    readwrite: '!readonly'
  };
  states.State.prototype = {
    invert: false,
    toString: function toString() {
      return this.name;
    }
  };
  var $document = $(document);
  $document.on('state:disabled', function (e) {
    if (e.trigger) {
      $(e.target).prop('disabled', e.value).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled', e.value).find('select, input, textarea').prop('disabled', e.value);
    }
  });
  $document.on('state:required', function (e) {
    if (e.trigger) {
      if (e.value) {
        var label = "label".concat(e.target.id ? "[for=".concat(e.target.id, "]") : '');
        var $label = $(e.target).attr({
          required: 'required',
          'aria-required': 'true'
        }).closest('.js-form-item, .js-form-wrapper').find(label);

        if (!$label.hasClass('js-form-required').length) {
          $label.addClass('js-form-required form-required');
        }
      } else {
        $(e.target).removeAttr('required aria-required').closest('.js-form-item, .js-form-wrapper').find('label.js-form-required').removeClass('js-form-required form-required');
      }
    }
  });
  $document.on('state:visible', function (e) {
    if (e.trigger) {
      $(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggle(e.value);
    }
  });
  $document.on('state:checked', function (e) {
    if (e.trigger) {
      $(e.target).prop('checked', e.value);
    }
  });
  $document.on('state:collapsed', function (e) {
    if (e.trigger) {
      if ($(e.target).is('[open]') === e.value) {
        $(e.target).find('> summary').trigger('click');
      }
    }
  });
})(jQuery, Drupal);;
/**
 * @file
 * Extends core/misc/states.js.
 */
(function($) {

  // Unbind core state.js from document first so we can then override below.
  $(document).unbind('state:disabled');

  /**
   * Global state change handlers. These are bound to "document" to cover all
   * elements whose state changes. Events sent to elements within the page
   * bubble up to these handlers. We use this system so that themes and modules
   * can override these state change handlers for particular parts of a page.
   */
  $(document).bind('state:disabled', function(e) {
    // Only act when this change was triggered by a dependency and not by the
    // element monitoring itself.
    if (e.trigger) {
      $(e.target)
        .attr('disabled', e.value)
        .closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled', e.value)
        .find(':input').attr('disabled', e.value);

      // Note: WebKit nightlies don't reflect that change correctly.
      // See https://bugs.webkit.org/show_bug.cgi?id=23789
    }
  });

})(jQuery);
;
/**
 * @file
 * JavaScript behaviors for custom webform #states.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.webform = Drupal.webform || {};
  Drupal.webform.states = Drupal.webform.states || {};
  Drupal.webform.states.slideDown = Drupal.webform.states.slideDown || {};
  Drupal.webform.states.slideDown.duration = 'slow';
  Drupal.webform.states.slideUp = Drupal.webform.states.slideUp || {};
  Drupal.webform.states.slideUp.duration = 'fast';

  /* ************************************************************************ */
  // jQuery functions.
  /* ************************************************************************ */

  /**
   * Check if an element has a specified data attribute.
   *
   * @param {string} data
   *   The data attribute name.
   *
   * @return {boolean}
   *   TRUE if an element has a specified data attribute.
   */
  $.fn.hasData = function (data) {
    return (typeof this.data(data) !== 'undefined');
  };

  /**
   * Check if element is within the webform or not.
   *
   * @return {boolean}
   *   TRUE if element is within the webform.
   */
  $.fn.isWebform = function () {
    return $(this).closest('form.webform-submission-form, form[id^="webform"], form[data-is-webform]').length ? true : false;
  };

  /**
   * Check if element is to be treated as a webform element.
   *
   * @return {boolean}
   *   TRUE if element is to be treated as a webform element.
   */
  $.fn.isWebformElement = function () {
    return ($(this).isWebform() || $(this).closest('[data-is-webform-element]').length) ? true : false;
  };

  /* ************************************************************************ */
  // Trigger.
  /* ************************************************************************ */

  // The change event is triggered by cut-n-paste and select menus.
  // Issue #2445271: #states element empty check not triggered on mouse
  // based paste.
  // @see https://www.drupal.org/node/2445271
  Drupal.states.Trigger.states.empty.change = function change() {
    return this.val() === '';
  };

  /* ************************************************************************ */
  // Dependents.
  /* ************************************************************************ */

  // Apply solution included in #1962800 patch.
  // Issue #1962800: Form #states not working with literal integers as
  // values in IE11.
  // @see https://www.drupal.org/project/drupal/issues/1962800
  // @see https://www.drupal.org/files/issues/core-states-not-working-with-integers-ie11_1962800_46.patch
  //
  // This issue causes pattern, less than, and greater than support to break.
  // @see https://www.drupal.org/project/webform/issues/2981724
  var states = Drupal.states;
  Drupal.states.Dependent.prototype.compare = function compare(reference, selector, state) {
    var value = this.values[selector][state.name];

    var name = reference.constructor.name;
    if (!name) {
      name = $.type(reference);

      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    if (name in states.Dependent.comparisons) {
      return states.Dependent.comparisons[name](reference, value);
    }

    if (reference.constructor.name in states.Dependent.comparisons) {
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }

    return _compare2(reference, value);
  };
  function _compare2(a, b) {
    if (a === b) {
      return typeof a === 'undefined' ? a : true;
    }

    return typeof a === 'undefined' || typeof b === 'undefined';
  }

  // Adds pattern, less than, and greater than support to #state API.
  // @see http://drupalsun.com/julia-evans/2012/03/09/extending-form-api-states-regular-expressions
  Drupal.states.Dependent.comparisons.Object = function (reference, value) {
    if ('pattern' in reference) {
      return (new RegExp(reference['pattern'])).test(value);
    }
    else if ('!pattern' in reference) {
      return !((new RegExp(reference['!pattern'])).test(value));
    }
    else if ('less' in reference) {
      return (value !== '' && parseFloat(reference['less']) > parseFloat(value));
    }
    else if ('less_equal' in reference) {
      return (value !== '' && parseFloat(reference['less_equal']) >= parseFloat(value));
    }
    else if ('greater' in reference) {
      return (value !== '' && parseFloat(reference['greater']) < parseFloat(value));
    }
    else if ('greater_equal' in reference) {
      return (value !== '' && parseFloat(reference['greater_equal']) <= parseFloat(value));
    }
    else if ('between' in reference || '!between' in reference) {
      if (value === '') {
        return false;
      }

      var between = reference['between'] || reference['!between'];
      var betweenParts = between.split(':');
      var greater = betweenParts[0];
      var less = (typeof betweenParts[1] !== 'undefined') ? betweenParts[1] : null;
      var isGreaterThan = (greater === null || greater === '' || parseFloat(value) >= parseFloat(greater));
      var isLessThan = (less === null || less === '' || parseFloat(value) <= parseFloat(less));
      var result = (isGreaterThan && isLessThan);
      return (reference['!between']) ? !result : result;
    }
    else {
      return reference.indexOf(value) !== false;
    }
  };

  /* ************************************************************************ */
  // States events.
  /* ************************************************************************ */

  var $document = $(document);

  $document.on('state:required', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      var $target = $(e.target);
      // Fix #required file upload.
      // @see Issue #2860529: Conditional required File upload field don't work.
      toggleRequired($target.find('input[type="file"]'), e.value);

      // Fix #required for radios and likert.
      // @see Issue #2856795: If radio buttons are required but not filled form is nevertheless submitted.
      if ($target.is('.js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other, .js-webform-type-webform-entity-radios, .webform-likert-table')) {
        $target.toggleClass('required', e.value);
        toggleRequired($target.find('input[type="radio"]'), e.value);
      }

      // Fix #required for checkboxes.
      // @see Issue #2938414: Checkboxes don't support #states required.
      // @see checkboxRequiredhandler
      if ($target.is('.js-form-type-checkboxes, .js-form-type-webform-checkboxes-other, .js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other')) {
        $target.toggleClass('required', e.value);
        var $checkboxes = $target.find('input[type="checkbox"]');
        if (e.value) {
          // Add event handler.
          $checkboxes.on('click', statesCheckboxesRequiredEventHandler);
          // Initialize and add required attribute.
          checkboxesRequired($target);
        }
        else {
          // Remove event handler.
          $checkboxes.off('click', statesCheckboxesRequiredEventHandler);
          // Remove required attribute.
          toggleRequired($checkboxes, false);
        }
      }

      // Fix #required for tableselect.
      // @see Issue #3212581: Table select does not trigger client side validation
      if ($target.is('.js-webform-tableselect')) {
        $target.toggleClass('required', e.value);
        var isMultiple = $target.is('[multiple]');
        if (isMultiple) {
          // Checkboxes.
          var $tbody = $target.find('tbody');
          var $checkboxes = $tbody.find('input[type="checkbox"]');
          copyRequireMessage($target, $checkboxes);
          if (e.value) {
            $checkboxes.on('click change', statesCheckboxesRequiredEventHandler);
            checkboxesRequired($tbody);
          }
          else {
            $checkboxes.off('click change ', statesCheckboxesRequiredEventHandler);
            toggleRequired($tbody, false);
          }
        }
        else {
          // Radios.
          var $radios = $target.find('input[type="radio"]');
          copyRequireMessage($target, $radios);
          toggleRequired($radios, e.value);
        }
      }

      // Fix required label for elements without the for attribute.
      // @see Issue #3145300: Conditional Visible Select Other not working.
      if ($target.is('.js-form-type-webform-select-other, .js-webform-type-webform-select-other')) {
        var $select = $target.find('select');
        toggleRequired($select, e.value);
        copyRequireMessage($target, $select);
      }
      if ($target.find('> label:not([for])').length) {
        $target.find('> label').toggleClass('js-form-required form-required', e.value);
      }

      // Fix required label for checkboxes and radios.
      // @see Issue #2938414: Checkboxes don't support #states required
      // @see Issue #2731991: Setting required on radios marks all options required.
      // @see Issue #2856315: Conditional Logic - Requiring Radios in a Fieldset.
      // Fix #required for fieldsets.
      // @see Issue #2977569: Hidden fieldsets that become visible with conditional logic cannot be made required.
      if ($target.is('.js-webform-type-radios, .js-webform-type-checkboxes, fieldset')) {
        $target.find('legend span.fieldset-legend:not(.visually-hidden)').toggleClass('js-form-required form-required', e.value);
      }

      // Issue #2986017: Fieldsets shouldn't have required attribute.
      if ($target.is('fieldset')) {
        $target.removeAttr('required aria-required');
      }
    }
  });

  $document.on('state:checked', function (e) {
    if (e.trigger) {
      $(e.target).trigger('change');
    }
  });

  $document.on('state:readonly', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      $(e.target).prop('readonly', e.value).closest('.js-form-item, .js-form-wrapper').toggleClass('webform-readonly', e.value).find('input, textarea').prop('readonly', e.value);

      // Trigger webform:readonly.
      $(e.target).trigger('webform:readonly')
        .find('select, input, textarea, button').trigger('webform:readonly');
    }
  });

  $document.on('state:visible state:visible-slide', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      if (e.value) {
        $(':input', e.target).addBack().each(function () {
          restoreValueAndRequired(this);
          triggerEventHandlers(this);
        });
      }
      else {
        // @see https://www.sitepoint.com/jquery-function-clear-form-data/
        $(':input', e.target).addBack().each(function () {
          backupValueAndRequired(this);
          clearValueAndRequired(this);
          triggerEventHandlers(this);
        });
      }
    }
  });

  $document.on('state:visible-slide', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      var effect = e.value ? 'slideDown' : 'slideUp';
      var duration = Drupal.webform.states[effect].duration;
      $(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper')[effect](duration);
    }
  });
  Drupal.states.State.aliases['invisible-slide'] = '!visible-slide';

  $document.on('state:disabled', function (e) {
    if (e.trigger && $(e.target).isWebformElement()) {
      // Make sure disabled property is set before triggering webform:disabled.
      // Copied from: core/misc/states.js
      $(e.target)
        .prop('disabled', e.value)
        .closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea, button').prop('disabled', e.value);

      // Never disable hidden file[fids] because the existing values will
      // be completely lost when the webform is submitted.
      var fileElements = $(e.target)
        .find(':input[type="hidden"][name$="[fids]"]');
      if (fileElements.length) {
        // Remove 'disabled' attribute from fieldset which will block
        // all disabled elements from being submitted.
        if ($(e.target).is('fieldset')) {
          $(e.target).prop('disabled', false);
        }
        fileElements.removeAttr('disabled');
      }

      // Trigger webform:disabled.
      $(e.target).trigger('webform:disabled')
        .find('select, input, textarea, button').trigger('webform:disabled');
    }
  });

  /* ************************************************************************ */
  // Behaviors.
  /* ************************************************************************ */

  /**
   * Adds HTML5 validation to required checkboxes.
   *
   * @type {Drupal~behavior}
   *
   * @see https://www.drupal.org/project/webform/issues/3068998
   */
  Drupal.behaviors.webformCheckboxesRequired = {
    attach: function (context) {
      $('.js-form-type-checkboxes.required, .js-form-type-webform-checkboxes-other.required, .js-webform-type-checkboxes.required, .js-webform-type-webform-checkboxes-other.required, .js-webform-type-webform-radios-other.checkboxes', context)
        .once('webform-checkboxes-required')
        .each(function () {
          var $element = $(this);
          $element.find('input[type="checkbox"]').on('click', statesCheckboxesRequiredEventHandler);
          setTimeout(function () {checkboxesRequired($element);});
        });
    }
  };

  /**
   * Adds HTML5 validation to required radios.
   *
   * @type {Drupal~behavior}
   *
   * @see https://www.drupal.org/project/webform/issues/2856795
   */
  Drupal.behaviors.webformRadiosRequired = {
    attach: function (context) {
      $('.js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other, .js-webform-type-webform-entity-radios, .js-webform-type-webform-scale', context)
        .once('webform-radios-required')
        .each(function () {
          var $element = $(this);
          setTimeout(function () {radiosRequired($element);});
        });
    }
  };

 /**
   * Adds HTML5 validation to required table select.
   *
   * @type {Drupal~behavior}
   *
   * @see https://www.drupal.org/project/webform/issues/2856795
   */
  Drupal.behaviors.webformTableSelectRequired = {
    attach: function (context) {
      $('.js-webform-tableselect.required', context)
        .once('webform-tableselect-required')
        .each(function () {
          var $element = $(this);
          var $tbody = $element.find('tbody');
          var isMultiple = $element.is('[multiple]');

          if (isMultiple) {
            // Check all checkbox triggers checkbox 'change' event on
            // select and deselect all.
            // @see Drupal.tableSelect
            $tbody.find('input[type="checkbox"]').on('click change', function () {
              checkboxesRequired($tbody);
            });
          }

          setTimeout(function () {
            isMultiple ? checkboxesRequired($tbody) : radiosRequired($element);
          });
        });
    }
  };

  /**
   * Add HTML5 multiple checkboxes required validation.
   *
   * @param {jQuery} $element
   *   An jQuery object containing HTML5 radios.
   *
   * @see https://stackoverflow.com/a/37825072/145846
   */
  function checkboxesRequired($element) {
    var $firstCheckbox = $element.find('input[type="checkbox"]').first();
    var isChecked = $element.find('input[type="checkbox"]').is(':checked');
    toggleRequired($firstCheckbox, !isChecked);
    copyRequireMessage($element, $firstCheckbox);
  }

  /**
   * Add HTML5 radios required validation.
   *
   * @param {jQuery} $element
   *   An jQuery object containing HTML5 radios.
   *
   * @see https://www.drupal.org/project/webform/issues/2856795
   */
  function radiosRequired($element) {
    var $radios = $element.find('input[type="radio"]');
    var isRequired = $element.hasClass('required');
    toggleRequired($radios, isRequired);
    copyRequireMessage($element, $radios);
  }

  /* ************************************************************************ */
  // Event handlers.
  /* ************************************************************************ */

  /**
   * Trigger #states API HTML5 multiple checkboxes required validation.
   *
   * @see https://stackoverflow.com/a/37825072/145846
   */
  function statesCheckboxesRequiredEventHandler() {
    var $element = $(this).closest('.js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other');
    checkboxesRequired($element);
  }

  /**
   * Trigger an input's event handlers.
   *
   * @param {element} input
   *   An input.
   */
  function triggerEventHandlers(input) {
    var $input = $(input);
    var type = input.type;
    var tag = input.tagName.toLowerCase();
    // Add 'webform.states' as extra parameter to event handlers.
    // @see Drupal.behaviors.webformUnsaved
    var extraParameters = ['webform.states'];
    if (type === 'checkbox' || type === 'radio') {
      $input
        .trigger('change', extraParameters)
        .trigger('blur', extraParameters);
    }
    else if (tag === 'select') {
      // Do not trigger the onchange event for Address element's country code
      // when it is initialized.
      // @see \Drupal\address\Element\Country
      if ($input.closest('.webform-type-address').length) {
        if (!$input.data('webform-states-address-initialized')
          && $input.attr('autocomplete') === 'country'
          && $input.val() === $input.find("option[selected]").attr('value')) {
          return;
        }
        $input.data('webform-states-address-initialized', true);
      }

      $input
        .trigger('change', extraParameters)
        .trigger('blur', extraParameters);
    }
    else if (type !== 'submit' && type !== 'button' && type !== 'file') {
      // Make sure input mask is removed and then reset when value is restored.
      // @see https://www.drupal.org/project/webform/issues/3124155
      // @see https://www.drupal.org/project/webform/issues/3202795
      var hasInputMask = ($.fn.inputmask && $input.hasClass('js-webform-input-mask'));
      hasInputMask && $input.inputmask('remove');

      $input
        .trigger('input', extraParameters)
        .trigger('change', extraParameters)
        .trigger('keydown', extraParameters)
        .trigger('keyup', extraParameters)
        .trigger('blur', extraParameters);

      hasInputMask && $input.inputmask();
    }
  }

  /* ************************************************************************ */
  // Backup and restore value functions.
  /* ************************************************************************ */

  /**
   * Backup an input's current value and required attribute
   *
   * @param {element} input
   *   An input.
   */
  function backupValueAndRequired(input) {
    var $input = $(input);
    var type = input.type;
    var tag = input.tagName.toLowerCase(); // Normalize case.

    // Backup required.
    if ($input.prop('required') && !$input.hasData('webform-required')) {
      $input.data('webform-required', true);
    }

    // Backup value.
    if (!$input.hasData('webform-value')) {
      if (type === 'checkbox' || type === 'radio') {
        $input.data('webform-value', $input.prop('checked'));
      }
      else if (tag === 'select') {
        var values = [];
        $input.find('option:selected').each(function (i, option) {
          values[i] = option.value;
        });
        $input.data('webform-value', values);
      }
      else if (type !== 'submit' && type !== 'button') {
        $input.data('webform-value', input.value);
      }
    }
  }

  /**
   * Restore an input's value and required attribute.
   *
   * @param {element} input
   *   An input.
   */
  function restoreValueAndRequired(input) {
    var $input = $(input);

    // Restore value.
    var value = $input.data('webform-value');
    if (typeof value !== 'undefined') {
      var type = input.type;
      var tag = input.tagName.toLowerCase(); // Normalize case.

      if (type === 'checkbox' || type === 'radio') {
        $input.prop('checked', value);
      }
      else if (tag === 'select') {
        $.each(value, function (i, option_value) {
          // Prevent "Syntax error, unrecognized expression" error by
          // escaping single quotes.
          // @see https://forum.jquery.com/topic/escape-characters-prior-to-using-selector
          option_value = option_value.replace(/'/g, "\\\'");
          $input.find("option[value='" + option_value + "']").prop('selected', true);
        });
      }
      else if (type !== 'submit' && type !== 'button') {
        input.value = value;
      }
      $input.removeData('webform-value');
    }

    // Restore required.
    var required = $input.data('webform-required');
    if (typeof required !== 'undefined') {
      if (required) {
        $input.prop('required', true);
      }
      $input.removeData('webform-required');
    }
  }

  /**
   * Clear an input's value and required attributes.
   *
   * @param {element} input
   *   An input.
   */
  function clearValueAndRequired(input) {
    var $input = $(input);

    // Check for #states no clear attribute.
    // @see https://css-tricks.com/snippets/jquery/make-an-jquery-hasattr/
    if ($input.closest('[data-webform-states-no-clear]').length) {
      return;
    }

    // Clear value.
    var type = input.type;
    var tag = input.tagName.toLowerCase(); // Normalize case.
    if (type === 'checkbox' || type === 'radio') {
      $input.prop('checked', false);
    }
    else if (tag === 'select') {
      if ($input.find('option[value=""]').length) {
        $input.val('');
      }
      else {
        input.selectedIndex = -1;
      }
    }
    else if (type !== 'submit' && type !== 'button') {
      input.value = (type === 'color') ? '#000000' : '';
    }

    // Clear required.
    $input.prop('required', false);
  }

  /* ************************************************************************ */
  // Helper functions.
  /* ************************************************************************ */

  /**
   * Toggle an input's required attributes.
   *
   * @param {element} $input
   *   An input.
   * @param {boolean} required
   *   Is input required.
   */
  function toggleRequired($input, required) {
    var isCheckboxOrRadio = ($input.attr('type') === 'radio' || $input.attr('type') === 'checkbox');
    if (required) {
      if (isCheckboxOrRadio) {
        $input.attr({'required': 'required'});
      }
      else {
        $input.attr({'required': 'required', 'aria-required': 'true'});
      }
    }
    else {
      if (isCheckboxOrRadio) {
        $input.removeAttr('required');
      }
      else {
        $input.removeAttr('required aria-required');
      }
    }
  }

  /**
   * Copy the clientside_validation.module's message.
   *
   * @param {jQuery} $source
   *   The source element.
   * @param {jQuery} $destination
   *   The destination element.
   */
  function copyRequireMessage($source, $destination) {
    if ($source.attr('data-msg-required')) {
      $destination.attr('data-msg-required', $source.attr('data-msg-required'));
    }
  }

})(jQuery, Drupal);
;
/**
 * @file
 * JavaScript behaviors for custom webform #states.
 */

(function ($, Drupal) {

  'use strict';

  $(document).on('state:required', function (e) {
    if (e.trigger && $(e.target).isWebform()) {
      var $target = $(e.target);

      // @see Issue #2856315: Conditional Logic - Requiring Radios in a Fieldset.
      // Fix #required for fieldsets.
      if ($target.is('.js-form-wrapper.panel')) {
        if (e.value) {
          $target.find('.panel-heading .panel-title').addClass('js-form-required form-required');
        }
        else {
          $target.find('.panel-heading .panel-title').removeClass('js-form-required form-required');
        }
      }

    }
  });

})(jQuery, Drupal);
;
/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  var $document = $(document);

  /**
   * Extend the Bootstrap Popover plugin constructor class.
   */
  Bootstrap.extendPlugin('popover', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.popover_animation,
        autoClose: !!settings.popover_auto_close,
        enabled: settings.popover_enabled,
        html: !!settings.popover_html,
        placement: settings.popover_placement,
        selector: settings.popover_selector,
        trigger: settings.popover_trigger,
        title: settings.popover_title,
        content: settings.popover_content,
        delay: parseInt(settings.popover_delay, 10),
        container: settings.popover_container
      }
    };
  });

  /**
   * Bootstrap Popovers.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapPopovers = {
    $activePopover: null,
    attach: function (context) {
      // Immediately return if popovers are not available.
      if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled) {
        return;
      }

      var _this = this;

      $document
        .on('show.bs.popover', '[data-toggle=popover]', function () {
          var $trigger = $(this);
          var popover = $trigger.data('bs.popover');

          // Only keep track of clicked triggers that we're manually handling.
          if (popover.options.originalTrigger === 'click') {
            if (_this.$activePopover && _this.getOption('autoClose') && !_this.$activePopover.is($trigger)) {
              _this.$activePopover.popover('hide');
            }
            _this.$activePopover = $trigger;
          }
        })
        // Unfortunately, :focusable is only made available when using jQuery
        // UI. While this would be the most semantic pseudo selector to use
        // here, jQuery UI may not always be loaded. Instead, just use :visible
        // here as this just needs some sort of selector here. This activates
        // delegate binding to elements in jQuery so it can work it's bubbling
        // focus magic since elements don't really propagate their focus events.
        // @see https://www.drupal.org/project/bootstrap/issues/3013236
        .on('focus.bs.popover', ':visible', function (e) {
          var $target = $(e.target);
          if (_this.$activePopover && _this.getOption('autoClose') && !_this.$activePopover.is($target) && !$target.closest('.popover.in')[0]) {
            _this.$activePopover.popover('hide');
            _this.$activePopover = null;
          }
        })
        .on('click.bs.popover', function (e) {
          var $target = $(e.target);
          if (_this.$activePopover && _this.getOption('autoClose') && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
            _this.$activePopover.popover('hide');
            _this.$activePopover = null;
          }
        })
        .on('keyup.bs.popover', function (e) {
          if (_this.$activePopover && _this.getOption('autoClose') && e.which === 27) {
            _this.$activePopover.popover('hide');
            _this.$activePopover = null;
          }
        })
      ;

      var elements = $(context).find('[data-toggle=popover]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

        // Store the original trigger.
        options.originalTrigger = options.trigger;

        // If the trigger is "click", then we'll handle it manually here.
        if (options.trigger === 'click') {
          options.trigger = 'manual';
        }

        // Retrieve content from a target element.
        var target = options.target || $element.is('a[href^="#"]') && $element.attr('href');
        var $target = $document.find(target).clone();
        if (!options.content && $target[0]) {
          $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
          options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
        }

        // Initialize the popover.
        $element.popover(options);

        // Handle clicks manually.
        if (options.originalTrigger === 'click') {
          // To ensure the element is bound multiple times, remove any
          // previously set event handler before adding another one.
          $element
            .off('click.drupal.bootstrap.popover')
            .on('click.drupal.bootstrap.popover', function (e) {
              $(this).popover('toggle');
              e.preventDefault();
              e.stopPropagation();
            })
          ;
        }
      }
    },
    detach: function (context) {
      // Immediately return if popovers are not available.
      if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled) {
        return;
      }

      // Destroy all popovers.
      $(context).find('[data-toggle="popover"]')
        .off('click.drupal.bootstrap.popover')
        .popover('destroy')
      ;
    },
    getOption: function(name, defaultValue, element) {
      var $element = element ? $(element) : this.$activePopover;
      var options = $.extend(true, {}, $.fn.popover.Constructor.DEFAULTS, ($element && $element.data('bs.popover') || {}).options);
      if (options[name] !== void 0) {
        return options[name];
      }
      return defaultValue !== void 0 ? defaultValue : void 0;
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Tooltips.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Tooltip plugin constructor class.
   */
  Bootstrap.extendPlugin('tooltip', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.tooltip_animation,
        enabled: settings.tooltip_enabled,
        html: !!settings.tooltip_html,
        placement: settings.tooltip_placement,
        selector: settings.tooltip_selector,
        trigger: settings.tooltip_trigger,
        delay: parseInt(settings.tooltip_delay, 10),
        container: settings.tooltip_container
      }
    };
  });

  /**
   * Bootstrap Tooltips.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context) {
      // Immediately return if tooltips are not available.
      if (!$.fn.tooltip || !$.fn.tooltip.Constructor.DEFAULTS.enabled) {
        return;
      }

      var elements = $(context).find('[data-toggle="tooltip"]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
        $element.tooltip(options);
      }
    },
    detach: function (context) {
      // Immediately return if tooltips are not available.
      if (!$.fn.tooltip || !$.fn.tooltip.Constructor.DEFAULTS.enabled) {
        return;
      }

      // Destroy all tooltips.
      $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(r){"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),r(t),t}:r(jQuery)}(function(q){"use strict";var m=/\r?\n/g,S={};S.fileapi=void 0!==q('<input type="file">').get(0).files,S.formdata=void 0!==window.FormData;var _=!!q.fn.prop;function o(e){var t=e.data;e.isDefaultPrevented()||(e.preventDefault(),q(e.target).closest("form").ajaxSubmit(t))}function i(e){var t=e.target,r=q(t);if(!r.is("[type=submit],[type=image]")){var a=r.closest("[type=submit]");if(0===a.length)return;t=a[0]}var n,o=t.form;"image"===(o.clk=t).type&&(void 0!==e.offsetX?(o.clk_x=e.offsetX,o.clk_y=e.offsetY):"function"==typeof q.fn.offset?(n=r.offset(),o.clk_x=e.pageX-n.left,o.clk_y=e.pageY-n.top):(o.clk_x=e.pageX-t.offsetLeft,o.clk_y=e.pageY-t.offsetTop)),setTimeout(function(){o.clk=o.clk_x=o.clk_y=null},100)}function N(){var e;q.fn.ajaxSubmit.debug&&(e="[jquery.form] "+Array.prototype.join.call(arguments,""),window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e))}q.fn.attr2=function(){if(!_)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},q.fn.ajaxSubmit=function(M,e,t,r){if(!this.length)return N("ajaxSubmit: skipping submit process - no element selected"),this;var O,a,n,o,X=this;"function"==typeof M?M={success:M}:"string"==typeof M||!1===M&&0<arguments.length?(M={url:M,data:e,dataType:t},"function"==typeof r&&(M.success=r)):void 0===M&&(M={}),O=M.method||M.type||this.attr2("method"),n=(n=(n="string"==typeof(a=M.url||this.attr2("action"))?q.trim(a):"")||window.location.href||"")&&(n.match(/^([^#]+)/)||[])[1],o=/(MSIE|Trident)/.test(navigator.userAgent||"")&&/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",M=q.extend(!0,{url:n,success:q.ajaxSettings.success,type:O||q.ajaxSettings.type,iframeSrc:o},M);var i={};if(this.trigger("form-pre-serialize",[this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(M.beforeSerialize&&!1===M.beforeSerialize(this,M))return N("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var s=M.traditional;void 0===s&&(s=q.ajaxSettings.traditional);var u,c,C=[],l=this.formToArray(M.semantic,C,M.filtering);if(M.data&&(c=q.isFunction(M.data)?M.data(l):M.data,M.extraData=c,u=q.param(c,s)),M.beforeSubmit&&!1===M.beforeSubmit(l,this,M))return N("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[l,this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var f=q.param(l,s);u&&(f=f?f+"&"+u:u),"GET"===M.type.toUpperCase()?(M.url+=(0<=M.url.indexOf("?")?"&":"?")+f,M.data=null):M.data=f;var d,m,p,h=[];M.resetForm&&h.push(function(){X.resetForm()}),M.clearForm&&h.push(function(){X.clearForm(M.includeHidden)}),!M.dataType&&M.target?(d=M.success||function(){},h.push(function(e,t,r){var a=arguments,n=M.replaceTarget?"replaceWith":"html";q(M.target)[n](e).each(function(){d.apply(this,a)})})):M.success&&(q.isArray(M.success)?q.merge(h,M.success):h.push(M.success)),M.success=function(e,t,r){for(var a=M.context||this,n=0,o=h.length;n<o;n++)h[n].apply(a,[e,t,r||X,X])},M.error&&(m=M.error,M.error=function(e,t,r){var a=M.context||this;m.apply(a,[e,t,r,X])}),M.complete&&(p=M.complete,M.complete=function(e,t){var r=M.context||this;p.apply(r,[e,t,X])});var v=0<q("input[type=file]:enabled",this).filter(function(){return""!==q(this).val()}).length,g="multipart/form-data",x=X.attr("enctype")===g||X.attr("encoding")===g,y=S.fileapi&&S.formdata;N("fileAPI :"+y);var b,T=(v||x)&&!y;!1!==M.iframe&&(M.iframe||T)?M.closeKeepAlive?q.get(M.closeKeepAlive,function(){b=w(l)}):b=w(l):b=(v||x)&&y?function(e){for(var r=new FormData,t=0;t<e.length;t++)r.append(e[t].name,e[t].value);if(M.extraData){var a=function(e){var t,r,a=q.param(e,M.traditional).split("&"),n=a.length,o=[];for(t=0;t<n;t++)a[t]=a[t].replace(/\+/g," "),r=a[t].split("="),o.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);return o}(M.extraData);for(t=0;t<a.length;t++)a[t]&&r.append(a[t][0],a[t][1])}M.data=null;var n=q.extend(!0,{},q.ajaxSettings,M,{contentType:!1,processData:!1,cache:!1,type:O||"POST"});M.uploadProgress&&(n.xhr=function(){var e=q.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var t=0,r=e.loaded||e.position,a=e.total;e.lengthComputable&&(t=Math.ceil(r/a*100)),M.uploadProgress(e,r,a,t)},!1),e});n.data=null;var o=n.beforeSend;return n.beforeSend=function(e,t){M.formData?t.data=M.formData:t.data=r,o&&o.call(this,e,t)},q.ajax(n)}(l):q.ajax(M),X.removeData("jqxhr").data("jqxhr",b);for(var j=0;j<C.length;j++)C[j]=null;return this.trigger("form-submit-notify",[this,M]),this;function w(e){var t,r,l,f,o,d,m,p,a,n,h,v,i=X[0],g=q.Deferred();if(g.abort=function(e){p.abort(e)},e)for(r=0;r<C.length;r++)t=q(C[r]),_?t.prop("disabled",!1):t.removeAttr("disabled");(l=q.extend(!0,{},q.ajaxSettings,M)).context=l.context||l,o="jqFormIO"+(new Date).getTime();var s=i.ownerDocument,u=X.closest("body");if(l.iframeTarget?(n=(d=q(l.iframeTarget,s)).attr2("name"))?o=n:d.attr2("name",o):(d=q('<iframe name="'+o+'" src="'+l.iframeSrc+'" />',s)).css({position:"absolute",top:"-1000px",left:"-1000px"}),m=d[0],p={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";N("aborting upload... "+t),this.aborted=1;try{m.contentWindow.document.execCommand&&m.contentWindow.document.execCommand("Stop")}catch(e){}d.attr("src",l.iframeSrc),p.error=t,l.error&&l.error.call(l.context,p,t,e),f&&q.event.trigger("ajaxError",[p,l,t]),l.complete&&l.complete.call(l.context,p,t)}},(f=l.global)&&0==q.active++&&q.event.trigger("ajaxStart"),f&&q.event.trigger("ajaxSend",[p,l]),l.beforeSend&&!1===l.beforeSend.call(l.context,p,l))return l.global&&q.active--,g.reject(),g;if(p.aborted)return g.reject(),g;(a=i.clk)&&(n=a.name)&&!a.disabled&&(l.extraData=l.extraData||{},l.extraData[n]=a.value,"image"===a.type&&(l.extraData[n+".x"]=i.clk_x,l.extraData[n+".y"]=i.clk_y));var x=1,y=2;function b(t){var r=null;try{t.contentWindow&&(r=t.contentWindow.document)}catch(e){N("cannot get iframe.contentWindow document: "+e)}if(r)return r;try{r=t.contentDocument?t.contentDocument:t.document}catch(e){N("cannot get iframe.contentDocument: "+e),r=t.document}return r}var c=q("meta[name=csrf-token]").attr("content"),T=q("meta[name=csrf-param]").attr("content");function j(){var e=X.attr2("target"),t=X.attr2("action"),r=X.attr("enctype")||X.attr("encoding")||"multipart/form-data";i.setAttribute("target",o),O&&!/post/i.test(O)||i.setAttribute("method","POST"),t!==l.url&&i.setAttribute("action",l.url),l.skipEncodingOverride||O&&!/post/i.test(O)||X.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),l.timeout&&(v=setTimeout(function(){h=!0,A(x)},l.timeout));var a=[];try{if(l.extraData)for(var n in l.extraData)l.extraData.hasOwnProperty(n)&&(q.isPlainObject(l.extraData[n])&&l.extraData[n].hasOwnProperty("name")&&l.extraData[n].hasOwnProperty("value")?a.push(q('<input type="hidden" name="'+l.extraData[n].name+'">',s).val(l.extraData[n].value).appendTo(i)[0]):a.push(q('<input type="hidden" name="'+n+'">',s).val(l.extraData[n]).appendTo(i)[0]));l.iframeTarget||d.appendTo(u),m.attachEvent?m.attachEvent("onload",A):m.addEventListener("load",A,!1),setTimeout(function e(){try{var t=b(m).readyState;N("state = "+t),t&&"uninitialized"===t.toLowerCase()&&setTimeout(e,50)}catch(e){N("Server abort: ",e," (",e.name,")"),A(y),v&&clearTimeout(v),v=void 0}},15);try{i.submit()}catch(e){document.createElement("form").submit.apply(i)}}finally{i.setAttribute("action",t),i.setAttribute("enctype",r),e?i.setAttribute("target",e):X.removeAttr("target"),q(a).remove()}}T&&c&&(l.extraData=l.extraData||{},l.extraData[T]=c),l.forceSync?j():setTimeout(j,10);var w,S,k,D=50;function A(e){if(!p.aborted&&!k){if((S=b(m))||(N("cannot access response document"),e=y),e===x&&p)return p.abort("timeout"),void g.reject(p,"timeout");if(e===y&&p)return p.abort("server abort"),void g.reject(p,"error","server abort");if(S&&S.location.href!==l.iframeSrc||h){m.detachEvent?m.detachEvent("onload",A):m.removeEventListener("load",A,!1);var t,r="success";try{if(h)throw"timeout";var a="xml"===l.dataType||S.XMLDocument||q.isXMLDoc(S);if(N("isXml="+a),!a&&window.opera&&(null===S.body||!S.body.innerHTML)&&--D)return N("requeing onLoad callback, DOM not available"),void setTimeout(A,250);var n=S.body?S.body:S.documentElement;p.responseText=n?n.innerHTML:null,p.responseXML=S.XMLDocument?S.XMLDocument:S,a&&(l.dataType="xml"),p.getResponseHeader=function(e){return{"content-type":l.dataType}[e.toLowerCase()]},n&&(p.status=Number(n.getAttribute("status"))||p.status,p.statusText=n.getAttribute("statusText")||p.statusText);var o,i,s,u=(l.dataType||"").toLowerCase(),c=/(json|script|text)/.test(u);c||l.textarea?(o=S.getElementsByTagName("textarea")[0])?(p.responseText=o.value,p.status=Number(o.getAttribute("status"))||p.status,p.statusText=o.getAttribute("statusText")||p.statusText):c&&(i=S.getElementsByTagName("pre")[0],s=S.getElementsByTagName("body")[0],i?p.responseText=i.textContent?i.textContent:i.innerText:s&&(p.responseText=s.textContent?s.textContent:s.innerText)):"xml"===u&&!p.responseXML&&p.responseText&&(p.responseXML=F(p.responseText));try{w=E(p,u,l)}catch(e){r="parsererror",p.error=t=e||r}}catch(e){N("error caught: ",e),r="error",p.error=t=e||r}p.aborted&&(N("upload aborted"),r=null),p.status&&(r=200<=p.status&&p.status<300||304===p.status?"success":"error"),"success"===r?(l.success&&l.success.call(l.context,w,"success",p),g.resolve(p.responseText,"success",p),f&&q.event.trigger("ajaxSuccess",[p,l])):r&&(void 0===t&&(t=p.statusText),l.error&&l.error.call(l.context,p,r,t),g.reject(p,"error",t),f&&q.event.trigger("ajaxError",[p,l,t])),f&&q.event.trigger("ajaxComplete",[p,l]),f&&!--q.active&&q.event.trigger("ajaxStop"),l.complete&&l.complete.call(l.context,p,r),k=!0,l.timeout&&clearTimeout(v),setTimeout(function(){l.iframeTarget?d.attr("src",l.iframeSrc):d.remove(),p.responseXML=null},100)}}}var F=q.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},L=q.parseJSON||function(e){return window.eval("("+e+")")},E=function(e,t,r){var a=e.getResponseHeader("content-type")||"",n=("xml"===t||!t)&&0<=a.indexOf("xml"),o=n?e.responseXML:e.responseText;return n&&"parsererror"===o.documentElement.nodeName&&q.error&&q.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,t)),"string"==typeof o&&(("json"===t||!t)&&0<=a.indexOf("json")?o=L(o):("script"===t||!t)&&0<=a.indexOf("javascript")&&q.globalEval(o)),o};return g}},q.fn.ajaxForm=function(e,t,r,a){if(("string"==typeof e||!1===e&&0<arguments.length)&&(e={url:e,data:t,dataType:r},"function"==typeof a&&(e.success=a)),(e=e||{}).delegation=e.delegation&&q.isFunction(q.fn.on),e.delegation||0!==this.length)return e.delegation?(q(document).off("submit.form-plugin",this.selector,o).off("click.form-plugin",this.selector,i).on("submit.form-plugin",this.selector,e,o).on("click.form-plugin",this.selector,e,i),this):(e.beforeFormUnbind&&e.beforeFormUnbind(this,e),this.ajaxFormUnbind().on("submit.form-plugin",e,o).on("click.form-plugin",e,i));var n={s:this.selector,c:this.context};return!q.isReady&&n.s?(N("DOM not ready, queuing ajaxForm"),q(function(){q(n.s,n.c).ajaxForm(e)})):N("terminating; zero elements found by selector"+(q.isReady?"":" (DOM not ready)")),this},q.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},q.fn.formToArray=function(e,t,r){var a=[];if(0===this.length)return a;var n,o,i,s,u,c,l,f,d,m,p=this[0],h=this.attr("id"),v=(v=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements)&&q.makeArray(v);if(h&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(n=q(':input[form="'+h+'"]').get()).length&&(v=(v||[]).concat(n)),!v||!v.length)return a;for(q.isFunction(r)&&(v=q.map(v,r)),o=0,c=v.length;o<c;o++)if((m=(u=v[o]).name)&&!u.disabled)if(e&&p.clk&&"image"===u.type)p.clk===u&&(a.push({name:m,value:q(u).val(),type:u.type}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y}));else if((s=q.fieldValue(u,!0))&&s.constructor===Array)for(t&&t.push(u),i=0,l=s.length;i<l;i++)a.push({name:m,value:s[i]});else if(S.fileapi&&"file"===u.type){t&&t.push(u);var g=u.files;if(g.length)for(i=0;i<g.length;i++)a.push({name:m,value:g[i],type:u.type});else a.push({name:m,value:"",type:u.type})}else null!=s&&(t&&t.push(u),a.push({name:m,value:s,type:u.type,required:u.required}));return e||!p.clk||(m=(d=(f=q(p.clk))[0]).name)&&!d.disabled&&"image"===d.type&&(a.push({name:m,value:f.val()}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y})),a},q.fn.formSerialize=function(e){return q.param(this.formToArray(e))},q.fn.fieldSerialize=function(n){var o=[];return this.each(function(){var e=this.name;if(e){var t=q.fieldValue(this,n);if(t&&t.constructor===Array)for(var r=0,a=t.length;r<a;r++)o.push({name:e,value:t[r]});else null!=t&&o.push({name:this.name,value:t})}}),q.param(o)},q.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var n=this[r],o=q.fieldValue(n,e);null==o||o.constructor===Array&&!o.length||(o.constructor===Array?q.merge(t,o):t.push(o))}return t},q.fieldValue=function(e,t){var r=e.name,a=e.type,n=e.tagName.toLowerCase();if(void 0===t&&(t=!0),t&&(!r||e.disabled||"reset"===a||"button"===a||("checkbox"===a||"radio"===a)&&!e.checked||("submit"===a||"image"===a)&&e.form&&e.form.clk!==e||"select"===n&&-1===e.selectedIndex))return null;if("select"!==n)return q(e).val().replace(m,"\r\n");var o=e.selectedIndex;if(o<0)return null;for(var i=[],s=e.options,u="select-one"===a,c=u?o+1:s.length,l=u?o:0;l<c;l++){var f=s[l];if(f.selected&&!f.disabled){var d=(d=f.value)||(f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value);if(u)return d;i.push(d)}}return i},q.fn.clearForm=function(e){return this.each(function(){q("input,select,textarea",this).clearFields(e)})},q.fn.clearFields=q.fn.clearInputs=function(r){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();a.test(e)||"textarea"===t?this.value="":"checkbox"===e||"radio"===e?this.checked=!1:"select"===t?this.selectedIndex=-1:"file"===e?/MSIE/.test(navigator.userAgent)?q(this).replaceWith(q(this).clone(!0)):q(this).val(""):r&&(!0===r&&/hidden/.test(e)||"string"==typeof r&&q(this).is(r))&&(this.value="")})},q.fn.resetForm=function(){return this.each(function(){var t=q(this),e=this.tagName.toLowerCase();switch(e){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=t.parents("select");return r.length&&r[0].multiple?"option"===e?this.selected=this.defaultSelected:t.find("option").resetForm():r.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var a=q(t.attr("for")),n=t.find("input,select,textarea");return a[0]&&n.unshift(a[0]),n.resetForm(),!0;case"form":return"function"!=typeof this.reset&&("object"!=typeof this.reset||this.reset.nodeType)||this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},q.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},q.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e,t=this.type;"checkbox"===t||"radio"===t?this.checked=r:"option"===this.tagName.toLowerCase()&&(e=q(this).parent("select"),r&&e[0]&&"select-one"===e[0].type&&e.find("option").selected(!1),this.selected=r)})},q.fn.ajaxSubmit.debug=!1});

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout;
  var result;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var later = function later() {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
};;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  var offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  function getRawOffset(el, edge) {
    var $el = $(el);
    var documentElement = document.documentElement;
    var displacement = 0;
    var horizontal = edge === 'left' || edge === 'right';
    var placement = $el.offset()[horizontal ? 'left' : 'top'];
    placement -= window["scroll".concat(horizontal ? 'X' : 'Y')] || document.documentElement["scroll".concat(horizontal ? 'Left' : 'Top')] || 0;

    switch (edge) {
      case 'top':
        displacement = placement + $el.outerHeight();
        break;

      case 'left':
        displacement = placement + $el.outerWidth();
        break;

      case 'bottom':
        displacement = documentElement.clientHeight - placement;
        break;

      case 'right':
        displacement = documentElement.clientWidth - placement;
        break;

      default:
        displacement = 0;
    }

    return displacement;
  }

  function calculateOffset(edge) {
    var edgeOffset = 0;
    var displacingElements = document.querySelectorAll("[data-offset-".concat(edge, "]"));
    var n = displacingElements.length;

    for (var i = 0; i < n; i++) {
      var el = displacingElements[i];

      if (el.style.display === 'none') {
        continue;
      }

      var displacement = parseInt(el.getAttribute("data-offset-".concat(edge)), 10);

      if (isNaN(displacement)) {
        displacement = getRawOffset(el, edge);
      }

      edgeOffset = Math.max(edgeOffset, displacement);
    }

    return edgeOffset;
  }

  function calculateOffsets() {
    return {
      top: calculateOffset('top'),
      right: calculateOffset('right'),
      bottom: calculateOffset('bottom'),
      left: calculateOffset('left')
    };
  }

  function displace(broadcast) {
    offsets = calculateOffsets();
    Drupal.displace.offsets = offsets;

    if (typeof broadcast === 'undefined' || broadcast) {
      $(document).trigger('drupalViewportOffsetChange', offsets);
    }

    return offsets;
  }

  Drupal.behaviors.drupalDisplace = {
    attach: function attach() {
      if (this.displaceProcessed) {
        return;
      }

      this.displaceProcessed = true;
      $(window).on('resize.drupalDisplace', debounce(displace, 200));
    }
  };
  Drupal.displace = displace;
  $.extend(Drupal.displace, {
    offsets: offsets,
    calculateOffset: calculateOffset
  });
})(jQuery, Drupal, Drupal.debounce);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, _ref) {
  var isTabbable = _ref.isTabbable;
  $.extend($.expr[':'], {
    tabbable: function tabbable(element) {
      Drupal.deprecationError({
        message: 'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 10.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'
      });

      if (element.tagName === 'SUMMARY' || element.tagName === 'DETAILS') {
        var tabIndex = element.getAttribute('tabIndex');

        if (tabIndex === null || tabIndex < 0) {
          return false;
        }
      }

      return isTabbable(element);
    }
  });
})(jQuery, Drupal, window.tabbable);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($) {
  var cachedScrollbarWidth = null;
  var max = Math.max,
      abs = Math.abs;
  var regexHorizontal = /left|center|right/;
  var regexVertical = /top|center|bottom/;
  var regexOffset = /[+-]\d+(\.[\d]+)?%?/;
  var regexPosition = /^\w+/;
  var regexPercent = /%$/;
  var _position = $.fn.position;

  function getOffsets(offsets, width, height) {
    return [parseFloat(offsets[0]) * (regexPercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (regexPercent.test(offsets[1]) ? height / 100 : 1)];
  }

  function parseCss(element, property) {
    return parseInt($.css(element, property), 10) || 0;
  }

  function getDimensions(elem) {
    var raw = elem[0];

    if (raw.nodeType === 9) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: 0,
          left: 0
        }
      };
    }

    if ($.isWindow(raw)) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: elem.scrollTop(),
          left: elem.scrollLeft()
        }
      };
    }

    if (raw.preventDefault) {
      return {
        width: 0,
        height: 0,
        offset: {
          top: raw.pageY,
          left: raw.pageX
        }
      };
    }

    return {
      width: elem.outerWidth(),
      height: elem.outerHeight(),
      offset: elem.offset()
    };
  }

  var collisions = {
    fit: {
      left: function left(position, data) {
        var within = data.within;
        var withinOffset = within.isWindow ? within.scrollLeft : within.offset.left;
        var outerWidth = within.width;
        var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
        var overLeft = withinOffset - collisionPosLeft;
        var overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
        var newOverRight;

        if (data.collisionWidth > outerWidth) {
          if (overLeft > 0 && overRight <= 0) {
            newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
            position.left += overLeft - newOverRight;
          } else if (overRight > 0 && overLeft <= 0) {
            position.left = withinOffset;
          } else if (overLeft > overRight) {
            position.left = withinOffset + outerWidth - data.collisionWidth;
          } else {
            position.left = withinOffset;
          }
        } else if (overLeft > 0) {
          position.left += overLeft;
        } else if (overRight > 0) {
          position.left -= overRight;
        } else {
          position.left = max(position.left - collisionPosLeft, position.left);
        }
      },
      top: function top(position, data) {
        var within = data.within;
        var withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
        var outerHeight = data.within.height;
        var collisionPosTop = position.top - data.collisionPosition.marginTop;
        var overTop = withinOffset - collisionPosTop;
        var overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
        var newOverBottom;

        if (data.collisionHeight > outerHeight) {
          if (overTop > 0 && overBottom <= 0) {
            newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
            position.top += overTop - newOverBottom;
          } else if (overBottom > 0 && overTop <= 0) {
            position.top = withinOffset;
          } else if (overTop > overBottom) {
            position.top = withinOffset + outerHeight - data.collisionHeight;
          } else {
            position.top = withinOffset;
          }
        } else if (overTop > 0) {
          position.top += overTop;
        } else if (overBottom > 0) {
          position.top -= overBottom;
        } else {
          position.top = max(position.top - collisionPosTop, position.top);
        }
      }
    },
    flip: {
      left: function left(position, data) {
        var within = data.within;
        var withinOffset = within.offset.left + within.scrollLeft;
        var outerWidth = within.width;
        var offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
        var overLeft = collisionPosLeft - offsetLeft;
        var overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
        var myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0;
        var atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0;
        var offset = -2 * data.offset[0];
        var newOverRight;
        var newOverLeft;

        if (overLeft < 0) {
          newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;

          if (newOverRight < 0 || newOverRight < abs(overLeft)) {
            position.left += myOffset + atOffset + offset;
          }
        } else if (overRight > 0) {
          newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;

          if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
            position.left += myOffset + atOffset + offset;
          }
        }
      },
      top: function top(position, data) {
        var within = data.within;
        var withinOffset = within.offset.top + within.scrollTop;
        var outerHeight = within.height;
        var offsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        var collisionPosTop = position.top - data.collisionPosition.marginTop;
        var overTop = collisionPosTop - offsetTop;
        var overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
        var top = data.my[1] === 'top';
        var myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0;
        var atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0;
        var offset = -2 * data.offset[1];
        var newOverTop;
        var newOverBottom;

        if (overTop < 0) {
          newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;

          if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
            position.top += myOffset + atOffset + offset;
          }
        } else if (overBottom > 0) {
          newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;

          if (newOverTop > 0 || abs(newOverTop) < overBottom) {
            position.top += myOffset + atOffset + offset;
          }
        }
      }
    },
    flipfit: {
      left: function left() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        collisions.flip.left.apply(this, args);
        collisions.fit.left.apply(this, args);
      },
      top: function top() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        collisions.flip.top.apply(this, args);
        collisions.fit.top.apply(this, args);
      }
    }
  };
  $.position = {
    scrollbarWidth: function scrollbarWidth() {
      if (cachedScrollbarWidth !== undefined) {
        return cachedScrollbarWidth;
      }

      var div = $('<div ' + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>");
      var innerDiv = div.children()[0];
      $('body').append(div);
      var w1 = innerDiv.offsetWidth;
      div.css('overflow', 'scroll');
      var w2 = innerDiv.offsetWidth;

      if (w1 === w2) {
        w2 = div[0].clientWidth;
      }

      div.remove();
      cachedScrollbarWidth = w1 - w2;
      return cachedScrollbarWidth;
    },
    getScrollInfo: function getScrollInfo(within) {
      var overflowX = within.isWindow || within.isDocument ? '' : within.element.css('overflow-x');
      var overflowY = within.isWindow || within.isDocument ? '' : within.element.css('overflow-y');
      var hasOverflowX = overflowX === 'scroll' || overflowX === 'auto' && within.width < within.element[0].scrollWidth;
      var hasOverflowY = overflowY === 'scroll' || overflowY === 'auto' && within.height < within.element[0].scrollHeight;
      return {
        width: hasOverflowY ? $.position.scrollbarWidth() : 0,
        height: hasOverflowX ? $.position.scrollbarWidth() : 0
      };
    },
    getWithinInfo: function getWithinInfo(element) {
      var withinElement = $(element || window);
      var isWindow = $.isWindow(withinElement[0]);
      var isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
      var hasOffset = !isWindow && !isDocument;
      return {
        element: withinElement,
        isWindow: isWindow,
        isDocument: isDocument,
        offset: hasOffset ? $(element).offset() : {
          left: 0,
          top: 0
        },
        scrollLeft: withinElement.scrollLeft(),
        scrollTop: withinElement.scrollTop(),
        width: withinElement.outerWidth(),
        height: withinElement.outerHeight()
      };
    }
  };

  $.fn.position = function (options) {
    if (!options || !options.of) {
      return _position.apply(this, arguments);
    }

    options = $.extend({}, options);
    var within = $.position.getWithinInfo(options.within);
    var scrollInfo = $.position.getScrollInfo(within);
    var collision = (options.collision || 'flip').split(' ');
    var offsets = {};
    var target = typeof options.of === 'string' ? $(document).find(options.of) : $(options.of);
    var dimensions = getDimensions(target);
    var targetWidth = dimensions.width;
    var targetHeight = dimensions.height;
    var targetOffset = dimensions.offset;

    if (target[0].preventDefault) {
      options.at = 'left top';
    }

    var basePosition = $.extend({}, targetOffset);
    $.each(['my', 'at'], function () {
      var pos = (options[this] || '').split(' ');

      if (pos.length === 1) {
        pos = regexHorizontal.test(pos[0]) ? pos.concat(['center']) : regexVertical.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
      }

      pos[0] = regexHorizontal.test(pos[0]) ? pos[0] : 'center';
      pos[1] = regexVertical.test(pos[1]) ? pos[1] : 'center';
      var horizontalOffset = regexOffset.exec(pos[0]);
      var verticalOffset = regexOffset.exec(pos[1]);
      offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
      options[this] = [regexPosition.exec(pos[0])[0], regexPosition.exec(pos[1])[0]];
    });

    if (collision.length === 1) {
      collision[1] = collision[0];
    }

    if (options.at[0] === 'right') {
      basePosition.left += targetWidth;
    } else if (options.at[0] === 'center') {
      basePosition.left += targetWidth / 2;
    }

    if (options.at[1] === 'bottom') {
      basePosition.top += targetHeight;
    } else if (options.at[1] === 'center') {
      basePosition.top += targetHeight / 2;
    }

    var atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
    basePosition.left += atOffset[0];
    basePosition.top += atOffset[1];
    return this.each(function () {
      var using;
      var elem = $(this);
      var elemWidth = elem.outerWidth();
      var elemHeight = elem.outerHeight();
      var marginLeft = parseCss(this, 'marginLeft');
      var marginTop = parseCss(this, 'marginTop');
      var collisionWidth = elemWidth + marginLeft + parseCss(this, 'marginRight') + scrollInfo.width;
      var collisionHeight = elemHeight + marginTop + parseCss(this, 'marginBottom') + scrollInfo.height;
      var position = $.extend({}, basePosition);
      var myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

      if (options.my[0] === 'right') {
        position.left -= elemWidth;
      } else if (options.my[0] === 'center') {
        position.left -= elemWidth / 2;
      }

      if (options.my[1] === 'bottom') {
        position.top -= elemHeight;
      } else if (options.my[1] === 'center') {
        position.top -= elemHeight / 2;
      }

      position.left += myOffset[0];
      position.top += myOffset[1];
      var collisionPosition = {
        marginLeft: marginLeft,
        marginTop: marginTop
      };
      $.each(['left', 'top'], function (i, dir) {
        if (collisions[collision[i]]) {
          collisions[collision[i]][dir](position, {
            targetWidth: targetWidth,
            targetHeight: targetHeight,
            elemWidth: elemWidth,
            elemHeight: elemHeight,
            collisionPosition: collisionPosition,
            collisionWidth: collisionWidth,
            collisionHeight: collisionHeight,
            offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
            my: options.my,
            at: options.at,
            within: within,
            elem: elem
          });
        }
      });

      if (options.using) {
        using = function using(props) {
          var left = targetOffset.left - position.left;
          var right = left + targetWidth - elemWidth;
          var top = targetOffset.top - position.top;
          var bottom = top + targetHeight - elemHeight;
          var feedback = {
            target: {
              element: target,
              left: targetOffset.left,
              top: targetOffset.top,
              width: targetWidth,
              height: targetHeight
            },
            element: {
              element: elem,
              left: position.left,
              top: position.top,
              width: elemWidth,
              height: elemHeight
            },
            horizontal: right < 0 ? 'left' : left > 0 ? 'right' : 'center',
            vertical: bottom < 0 ? 'top' : top > 0 ? 'bottom' : 'middle'
          };

          if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
            feedback.horizontal = 'center';
          }

          if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
            feedback.vertical = 'middle';
          }

          if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
            feedback.important = 'horizontal';
          } else {
            feedback.important = 'vertical';
          }

          options.using.call(this, props, feedback);
        };
      }

      elem.offset($.extend(position, {
        using: using
      }));
    });
  };

  if (!$.hasOwnProperty('ui')) {
    $.ui = {};
  }

  $.ui.position = collisions;
})(jQuery);;
/**
 * @file
 * Bootstrap Modals.
 *
 * @param {jQuery} $
 * @param {Drupal} Drupal
 * @param {Drupal.bootstrap} Bootstrap
 * @param {Attributes} Attributes
 */
(function ($, Drupal, Bootstrap, Attributes) {
  'use strict';

  /**
   * Document jQuery object.
   *
   * @type {jQuery}
   */
  var $document = $(document);

  /**
   * Finds the first available and visible focusable input element.
   *
   * This is abstracted from the main code below so sub-themes can override
   * this method to return their own element if desired.
   *
   * @param {Modal} modal
   *   The Bootstrap modal instance.
   *
   * @return {jQuery}
   *   A jQuery object containing the element that should be focused. Note: if
   *   this object contains multiple elements, only the first visible one will
   *   be used.
   */
  Bootstrap.modalFindFocusableElement = function (modal) {
    return modal.$dialogBody.find(':input,:button,.btn').not('.visually-hidden,.sr-only');
  };

  $document.on('shown.bs.modal', function (e) {
    var $modal = $(e.target);
    var modal = $modal.data('bs.modal');

    // Focus the first input element found.
    if (modal && modal.options.focusInput) {
      var $focusable = Bootstrap.modalFindFocusableElement(modal);
      if ($focusable && $focusable[0]) {
        var $input = $focusable.filter(':visible:first').focus();

        // Select text if input is text.
        if (modal.options.selectText && $input.is(':text')) {
          $input[0].setSelectionRange(0, $input[0].value.length)
        }
      }
      else if (modal.$close.is(':visible')) {
        modal.$close.focus();
      }
    }
  });

  /**
   * Only process this once.
   */
  Bootstrap.once('modal', function (settings) {

    /**
     * Replace the Bootstrap Modal jQuery plugin definition.
     *
     * This adds a little bit of functionality so it works better with Drupal.
     */
    Bootstrap.replacePlugin('modal', function () {
      var BootstrapModal = this;

      // Override the Modal constructor.
      Bootstrap.Modal = function (element, options) {
        this.$body               = $(document.body);
        this.$element            = $(element);
        this.$dialog             = this.$element.find('.modal-dialog');
        this.$header             = this.$dialog.find('.modal-header');
        this.$title              = this.$dialog.find('.modal-title');
        this.$close              = this.$header.find('.close');
        this.$footer             = this.$dialog.find('.modal-footer');
        this.$content            = this.$dialog.find('.modal-content');
        this.$dialogBody         = this.$dialog.find('.modal-body');
        this.$backdrop           = null;
        this.isShown             = null;
        this.originalBodyPad     = null;
        this.scrollbarWidth      = 0;
        this.ignoreBackdropClick = false;
        this.options             = this.mapDialogOptions(options);
      };

      // Extend defaults to take into account for theme settings.
      Bootstrap.Modal.DEFAULTS = $.extend({}, BootstrapModal.DEFAULTS, {
        animation: !!settings.modal_animation,
        backdrop: settings.modal_backdrop === 'static' ? 'static' : !!settings.modal_backdrop,
        focusInput: !!settings.modal_focus_input,
        selectText: !!settings.modal_select_text,
        keyboard: !!settings.modal_keyboard,
        remote: null,
        show: !!settings.modal_show,
        size: settings.modal_size
      });

      // Copy over the original prototype methods.
      Bootstrap.Modal.prototype = BootstrapModal.prototype;

      /**
       * Handler for $.fn.modal('destroy').
       */
      Bootstrap.Modal.prototype.destroy = function () {
        this.hide();
        Drupal.detachBehaviors(this.$element[0]);
        this.$element.removeData('bs.modal').remove();
      };

      /**
       * Initialize the modal.
       */
      Bootstrap.Modal.prototype.init = function () {
        if (this.options.remote) {
          this.$content.load(this.options.remote, $.proxy(function () {
            this.$element.trigger('loaded.bs.modal');
          }, this));
        }
      };

      /**
       * Map dialog options.
       *
       * Note: this is primarily for use in modal.jquery.ui.bridge.js.
       *
       * @param {Object} options
       *   The passed options.
       */
      Bootstrap.Modal.prototype.mapDialogOptions = function (options) {
        return options || {};
      }

      // Modal jQuery Plugin Definition.
      var Plugin = function () {
        // Extract the arguments.
        var args = Array.prototype.slice.call(arguments);
        var method = args[0];
        var options = args[1] || {};
        var relatedTarget = args[2] || null;
        // Move arguments down if no method was passed.
        if ($.isPlainObject(method)) {
          relatedTarget = options || null;
          options = method;
          method = null;
        }
        var ret = void 0;
        this.each(function () {
          var $this   = $(this);
          var data    = $this.data('bs.modal');
          var initialize = false;

          // Immediately return if there's no instance to invoke a valid method.
          var showMethods = ['open', 'show', 'toggle'];
          if (!data && method && showMethods.indexOf(method) === -1) {
            return;
          }

          options = Bootstrap.normalizeObject($.extend({}, Bootstrap.Modal.DEFAULTS, data && data.options, $this.data(), options));
          delete options['bs.modal'];

          if (!data) {
            $this.data('bs.modal', (data = new Bootstrap.Modal(this, options)));
            initialize = true;
          }

          // Initialize the modal.
          if (initialize || (!method && !args.length)) {
            data.init();
          }

          // Explicit method passed.
          if (method) {
            if (typeof data[method] === 'function') {
              try {
                ret = data[method].apply(data, args.slice(1));
              }
              catch (e) {
                Drupal.throwError(e);
              }
            }
            else {
              Bootstrap.unsupported('method', method);
            }
          }
          // No method, set options and open if necessary.
          else {
            data.option(options);
            if (options.show && !data.isShown) {
              data.show(relatedTarget);
            }
          }
        });

        // If just one element and there was a result returned for the option passed,
        // then return the result. Otherwise, just return the jQuery object.
        return this.length === 1 && ret !== void 0 ? ret : this;
      };

      // Replace the plugin constructor with the new Modal constructor.
      Plugin.Constructor = Bootstrap.Modal;

      // Replace the data API so that it calls $.fn.modal rather than Plugin.
      // This allows sub-themes to replace the jQuery Plugin if they like with
      // out having to redo all this boilerplate.
      $document
        .off('click.bs.modal.data-api')
        .on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
          var $this   = $(this);
          var href    = $this.attr('href');
          var target  = $this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
          var $target = $document.find(target);
          var options  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

          if ($this.is('a')) e.preventDefault();

          $target.one('show.bs.modal', function (showEvent) {
            // Only register focus restorer if modal will actually get shown.
            if (showEvent.isDefaultPrevented()) return;
            $target.one('hidden.bs.modal', function () {
              $this.is(':visible') && $this.trigger('focus');
            });
          });
          $target.modal(options, this);
        });

      return Plugin;
    });

    /**
     * Extend Drupal theming functions.
     */
    $.extend(Drupal.theme, /** @lend Drupal.theme */ {
      /**
       * Theme function for a Bootstrap Modal.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal.
       */
      bootstrapModal: function (variables) {
        var output = '';
        var settings = drupalSettings.bootstrap || {};
        var defaults = {
          attributes: {
            class: ['modal'],
            tabindex: -1,
            role: 'dialog'
          },
          body: '',
          closeButton: true,
          description: {
            attributes: {
              class: ['help-block']
            },
            content: null,
            position: 'before'
          },
          footer: '',
          id: 'drupal-modal',
          size: settings.modal_size ? settings.modal_size : '',
          title: {
            attributes: {
              class: ['modal-title']
            },
            content: Drupal.t('Loading...'),
            html: false,
            tag: 'h4'
          }
        };
        variables = $.extend(true, {}, defaults, variables);

        var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
        attributes.set('id', attributes.get('id', variables.id));

        if (settings.modal_animation) {
          attributes.addClass('fade');
        }

        // Build the modal wrapper.
        output += '<div' + attributes + '>';

        // Build the modal-dialog wrapper.
        output += Drupal.theme('bootstrapModalDialog', _.omit(variables, 'attributes'));

        // Close the modal wrapper.
        output += '</div>';

        // Return the constructed modal.
        return output;
      },

      /**
       * Theme function for a Bootstrap Modal dialog markup.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal close button.
       */
      bootstrapModalDialog: function (variables) {
        var output = '';

        var defaults = {
          attributes: {
            class: ['modal-dialog'],
            role: 'document'
          },
          id: 'drupal-modal'
        };
        variables = $.extend(true, {}, defaults, variables);

        var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
        attributes.set('id', attributes.get('id', variables.id + '--dialog'));

        if (variables.size) {
          attributes.addClass(variables.size);
        }
        output += '<div' + attributes + '>';

        // Build the modal-content wrapper.
        output += Drupal.theme('bootstrapModalContent', _.omit(variables, 'attributes'));

        // Close the modal-dialog wrapper.
        output += '</div>';
        return output;
      },

      /**
       * Theme function for a Bootstrap Modal content markup.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal close button.
       */
      bootstrapModalContent: function (variables) {
        var output = '';

        var defaults = {
          attributes: {
            class: ['modal-content']
          },
          id: 'drupal-modal'
        };
        variables = $.extend(true, {}, defaults, variables);

        var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
        attributes.set('id', attributes.get('id', variables.id + '--content'));

        // Build the modal-content wrapper.
        output += '<div' + attributes + '>';
        variables = _.omit(variables, 'attributes');

        // Build the header wrapper and title.
        output += Drupal.theme('bootstrapModalHeader', variables);

        // Build the body.
        output += Drupal.theme('bootstrapModalBody', variables);

        // Build the footer.
        output += Drupal.theme('bootstrapModalFooter', variables);

        // Close the modal-content wrapper.
        output += '</div>';

        return output;
      },

      /**
       * Theme function for a Bootstrap Modal body markup.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal close button.
       */
      bootstrapModalBody: function (variables) {
        var output = '';

        var defaults = {
          attributes: {
            class: ['modal-body']
          },
          body: '',
          description: {
            attributes: {
              class: ['help-block']
            },
            content: null,
            position: 'before'
          },
          id: 'drupal-modal'
        };
        variables = $.extend(true, {}, defaults, variables);

        var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
        attributes.set('id', attributes.get('id', variables.id + '--body'));

        output += '<div' + attributes + '>';

        if (typeof variables.description === 'string') {
          variables.description = $.extend({}, defaults.description, { content: variables.description });
        }

        var description = variables.description;
        description.attributes = Attributes.create(defaults.description.attributes).merge(description.attributes);

        if (description.content && description.position === 'invisible') {
          description.attributes.addClass('sr-only');
        }

        if (description.content && description.position === 'before') {
          output += '<p' + description.attributes + '>' + description.content + '</p>';
        }

        output += variables.body;

        if (description.content && (description.position === 'after' || description.position === 'invisible')) {
          output += '<p' + description.attributes + '>' + description.content + '</p>';
        }

        output += '</div>';

        return output;
      },

      /**
       * Theme function for a Bootstrap Modal close button.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal close button.
       */
      bootstrapModalClose: function (variables) {
        var defaults = {
          attributes: {
            'aria-label': Drupal.t('Close'),
            class: ['close'],
            'data-dismiss': 'modal',
            type: 'button'
          }
        };
        variables = $.extend(true, {}, defaults, variables);
        var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
        return '<button' + attributes + '><span aria-hidden="true">&times;</span></button>';
      },

      /**
       * Theme function for a Bootstrap Modal footer.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       * @param {boolean} [force]
       *   Flag to force rendering the footer, regardless if there's content.
       *
       * @return {string}
       *   The HTML for the modal footer.
       */
      bootstrapModalFooter: function (variables, force) {
        var output = '';
        var defaults = {
          attributes: {
            class: ['modal-footer']
          },
          footer: '',
          id: 'drupal-modal'
        };

        variables = $.extend(true, {}, defaults, variables);

        if (force || variables.footer) {
          var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
          attributes.set('id', attributes.get('id', variables.id + '--footer'));
          output += '<div' + attributes + '>';
          output += variables.footer;
          output += '</div>';
        }

        return output;
      },

      /**
       * Theme function for a Bootstrap Modal header.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal header.
       */
      bootstrapModalHeader: function (variables) {
        var output = '';

        var defaults = {
          attributes: {
            class: ['modal-header']
          },
          closeButton: true,
          id: 'drupal-modal',
          title: {
            attributes: {
              class: ['modal-title']
            },
            content: Drupal.t('Loading...'),
            html: false,
            tag: 'h4'
          }
        };
        variables = $.extend(true, {}, defaults, variables);

        if (typeof variables.title === 'string') {
          variables.title = $.extend({}, defaults.title, { content: variables.title });
        }

        var title = Drupal.theme('bootstrapModalTitle', variables.title);
        if (title) {
          var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
          attributes.set('id', attributes.get('id', variables.id + '--header'));

          output += '<div' + attributes + '>';

          if (variables.closeButton) {
            output += Drupal.theme('bootstrapModalClose', _.omit(variables, 'attributes'));
          }

          output += title;

          output += '</div>';
        }

        return output;
      },

      /**
       * Theme function for a Bootstrap Modal title.
       *
       * @param {Object} [variables]
       *   An object containing key/value pairs of variables.
       *
       * @return {string}
       *   The HTML for the modal title.
       */
      bootstrapModalTitle: function (variables) {
        var output = '';

        var defaults = {
          attributes: {
            class: ['modal-title']
          },
          closeButton: true,
          id: 'drupal-modal',
          content: Drupal.t('Loading...'),
          html: false,
          tag: 'h4'
        };

        if (typeof variables === 'string') {
          variables = $.extend({}, defaults, { content: title });
        }

        variables = $.extend(true, {}, defaults, variables);

        var attributes = Attributes.create(defaults.attributes).merge(variables.attributes);
        attributes.set('id', attributes.get('id', variables.id + '--title'));

        output += '<' + Drupal.checkPlain(variables.tag) + Attributes.create(defaults.attributes).merge(variables.attributes) + '>';

        if (variables.closeButton) {
          output += Drupal.theme('bootstrapModalClose', _.omit(variables, 'attributes'));
        }

        output += (variables.html ? variables.content : Drupal.checkPlain(variables.content));

        output += '</' + Drupal.checkPlain(variables.tag) + '>';

        return output;
      }

    })

  });

})(window.jQuery, window.Drupal, window.Drupal.bootstrap, window.Attributes);
;
/**
 * @file
 * dialog.js
 */
(function ($, Drupal, Bootstrap, Attributes) {

  Bootstrap.Dialog = Bootstrap.Dialog || {};

  /**
   * A collection of Drupal dialog handlers.
   *
   * @type {Object<String, Drupal.bootstrap.Dialog.Handler>}
   */
  Bootstrap.Dialog.handlers = {};

  /**
   * @class Drupal.bootstrap.Dialog.Handler
   *
   * @param type
   * @param data
   */
  Bootstrap.Dialog.Handler = function (type, data) {
    this.ctor = $.fn.modal;
    this.extend = null;
    this.plugin = 'modal';
    this.prefix = 'modal';
    this.themeHooks = {
      modal: 'bootstrapModal',
      dialog: 'bootstrapModalDialog',
      header: 'bootstrapModalHeader',
      title: 'bootstrapModalTitle',
      close: 'bootstrapModalClose',
      content: 'bootstrapModalContent',
      body: 'bootstrapModalBody',
      footer: 'bootstrapModalFooter',
    };
    this.type = type;
    this.selectors = {
      dialog: '.modal-dialog',
      header: '.modal-header',
      title: '.modal-title',
      close: '.close',
      content: '.modal-content',
      body: '.modal-body',
      footer: '.modal-footer',
      buttons: '.modal-buttons'
    };

    // Extend the object with subclassed data.
    $.extend(this, data);

    // Extend the jQuery plugin.
    if (this.extend) {
      Bootstrap.extend(this.plugin, this.extend);
    }
  };

  /**
   * Retrieves a Drupal dialog type handler.
   *
   * @param {String|HTMLElement|jQuery} type
   *   The dialog type to retrieve.
   *
   * @return {Drupal.bootstrap.Dialog.Handler}
   *   A Bootstrap.Dialog.Handler instance.
   */
  Bootstrap.Dialog.Handler.get = function (type) {
    if (type instanceof $) {
      type = type[0];
    }
    if (type instanceof HTMLElement) {
      type = type.dialogType;
    }
    if (!type) {
      type = 'modal';
    }
    if (!Bootstrap.Dialog.handlers[type]) {
      Bootstrap.Dialog.handlers[type] = new Bootstrap.Dialog.Handler();
    }
    return Bootstrap.Dialog.handlers[type];
  };

  /**
   * Registers a Drupal dialog type handler.
   *
   * @param {String} type
   *   The dialog type to
   * @param {Object} [data]
   *   Optional. Additional data to use to create the dialog handler. By
   *   default, this assumes values relative to the Bootstrap Modal plugin.
   */
  Bootstrap.Dialog.Handler.register = function (type, data) {
    Bootstrap.Dialog.handlers[type] = new Bootstrap.Dialog.Handler(type, data);
  };

  Bootstrap.Dialog.Handler.prototype.invoke = function (context) {
    var args = Array.prototype.slice.call(arguments);
    return this.ctor.apply(context, args.slice(1));
  };

  Bootstrap.Dialog.Handler.prototype.theme = function (hook) {
    var args = Array.prototype.slice.call(arguments);
    return $(Drupal.theme.apply(Drupal.theme, [this.themeHooks[hook]].concat(args.slice(1))));
  };

  /**
   * Ensures a DOM element has the appropriate structure for a modal.
   *
   * Note: this can get a little tricky. Core potentially already
   * semi-processes a "dialog" if was created using an Ajax command
   * (i.e. prepareDialogButtons in drupal.ajax.js). Because of this, the
   * contents (HTML) of the existing element cannot simply be dumped into a
   * newly created modal. This would destroy any existing event bindings.
   * Instead, the contents must be "moved" (appended) to the new modal and
   * then "moved" again back to the to the existing container as needed.
   *
   * @param {HTMLElement|jQuery} element
   *   The element to ensure is a modal structure.
   * @param {Object} options
   *   THe dialog options to use to construct the modal.
   */
  Bootstrap.Dialog.Handler.prototype.ensureModalStructure = function (element, options) {
    var $element = $(element);

    // Immediately return if the modal was already converted into a proper modal.
    if ($element.is('[data-drupal-theme="' + this.themeHooks.modal + '"]')) {
      return;
    }

    var attributes = Attributes.create(element).remove('style').set('data-drupal-theme', this.themeHooks.modal);

    // Merge in trigger data attributes.
    if (options.$trigger && options.$trigger[0]) {
      /** @var {HTMLElement} trigger */
      var trigger = options.$trigger[0];
      var data = {};
      for (var i = 0, l = trigger.attributes.length; i < l; i++) {
        var name = trigger.attributes[i].name;
        if (name && name.substring(0, 5) === 'data-') {
          data[name] = trigger.getAttribute(name);
        }
      }
      attributes.merge(data);
    }

    options = $.extend(true, {}, options, {
      attributes: attributes,
    });

    // Create a new modal.
    var $modal = this.theme('modal', options);

    // Store a reference to the content inside the existing element container.
    // This references the actual DOM node elements which will allow
    // jQuery to "move" then when appending below. Using $.fn.children()
    // does not return any text nodes present and $.fn.html() only returns
    // a string representation of the content, which effectively destroys
    // any prior event bindings or processing.
    var $body = $element.find(this.selectors.body);
    var $existing = $body[0] ? $body.contents() : $element.contents();

    // Set the attributes of the dialog to that of the newly created modal.
    $element.attr(Attributes.create($modal).toPlainObject());

    // Append the newly created modal markup.
    $element.append($modal.html());

    // Move the existing HTML into the modal markup that was just appended.
    $element.find(this.selectors.body).append($existing);
  };

})(jQuery, Drupal, Drupal.bootstrap, Attributes);
;
/**
 * @file
 * Bootstrap Modals.
 *
 * @param {jQuery} $
 * @param {Drupal} Drupal
 * @param {Drupal.bootstrap} Bootstrap
 * @param {Attributes} Attributes
 * @param {drupalSettings} drupalSettings
 */
(function ($, Drupal, Bootstrap, Attributes, drupalSettings) {
  'use strict';

  /**
   * Only process this once.
   */
  Bootstrap.once('modal.jquery.ui.bridge', function (settings) {
    // RTL support.
    var rtl = document.documentElement.getAttribute('dir').toLowerCase() === 'rtl';

    // Override drupal.dialog button classes. This must be done on DOM ready
    // since core/drupal.dialog technically depends on this file and has not
    // yet set their default settings.
    $(function () {
      drupalSettings.dialog.buttonClass = 'btn';
      drupalSettings.dialog.buttonPrimaryClass = 'btn-primary';
    });

    // Create the "dialog" plugin bridge.
    Bootstrap.Dialog.Bridge = function (options) {
      var args = Array.prototype.slice.call(arguments);
      var $element = $(this);
      var type = options && options.dialogType || $element[0].dialogType || 'modal';

      $element[0].dialogType = type;

      var handler = Bootstrap.Dialog.Handler.get(type);

      // When only options are passed, jQuery UI dialog treats this like a
      // initialization method. Destroy any existing Bootstrap modal and
      // recreate it using the contents of the dialog HTML.
      if (args.length === 1 && typeof options === 'object') {
        this.each(function () {
          handler.ensureModalStructure(this, options);
        });

        // Proxy to the Bootstrap Modal plugin, indicating that this is a
        // jQuery UI dialog bridge.
        return handler.invoke(this, {
          dialogOptions: options,
          jQueryUiBridge: true
        });
      }

      // Otherwise, proxy all arguments to the Bootstrap Modal plugin.
      var ret;
      try {
        ret = handler.invoke.apply(handler, [this].concat(args));
      }
      catch (e) {
        Bootstrap.warn(e);
      }

      // If just one element and there was a result returned for the option passed,
      // then return the result. Otherwise, just return the jQuery object.
      return this.length === 1 && ret !== void 0 ? ret : this;
    };

    // Assign the jQuery "dialog" plugin to use to the bridge.
    Bootstrap.createPlugin('dialog', Bootstrap.Dialog.Bridge);

    // Create the "modal" plugin bridge.
    Bootstrap.Modal.Bridge = function () {
      var Modal = this;

      return {
        DEFAULTS: {
          // By default, this option is disabled. It's only flagged when a modal
          // was created using $.fn.dialog above.
          jQueryUiBridge: false
        },
        prototype: {

          /**
           * Handler for $.fn.dialog('close').
           */
          close: function () {
            var _this = this;

            this.hide.apply(this, arguments);

            // For some reason (likely due to the transition event not being
            // registered properly), the backdrop doesn't always get removed
            // after the above "hide" method is invoked . Instead, ensure the
            // backdrop is removed after the transition duration by manually
            // invoking the internal "hideModal" method shortly thereafter.
            setTimeout(function () {
              if (!_this.isShown && _this.$backdrop) {
                _this.hideModal();
              }
            }, (Modal.TRANSITION_DURATION !== void 0 ? Modal.TRANSITION_DURATION : 300) + 10);
          },

          /**
           * Creates any necessary buttons from dialog options.
           */
          createButtons: function () {
            var handler = Bootstrap.Dialog.Handler.get(this.$element);
            this.$footer.find(handler.selectors.buttons).remove();

            // jQuery UI supports both objects and arrays. Unfortunately
            // developers have misunderstood and abused this by simply placing
            // the objects that should be in an array inside an object with
            // arbitrary keys (likely to target specific buttons as a hack).
            var buttons = this.options.dialogOptions && this.options.dialogOptions.buttons || [];
            if (!Array.isArray(buttons)) {
              var array = [];
              for (var k in buttons) {
                // Support the proper object values: label => click callback.
                if (typeof buttons[k] === 'function') {
                  array.push({
                    label: k,
                    click: buttons[k],
                  });
                }
                // Support nested objects, but log a warning.
                else if (buttons[k].text || buttons[k].label) {
                  Bootstrap.warn('Malformed jQuery UI dialog button: @key. The button object should be inside an array.', {
                    '@key': k
                  });
                  array.push(buttons[k]);
                }
                else {
                  Bootstrap.unsupported('button', k, buttons[k]);
                }
              }
              buttons = array;
            }

            if (buttons.length) {
              var $buttons = $('<div class="modal-buttons"/>').appendTo(this.$footer);
              for (var i = 0, l = buttons.length; i < l; i++) {
                var button = buttons[i];
                var $button = $(Drupal.theme('bootstrapModalDialogButton', button));

                // Invoke the "create" method for jQuery UI buttons.
                if (typeof button.create === 'function') {
                  button.create.call($button[0]);
                }

                // Bind the "click" method for jQuery UI buttons to the modal.
                if (typeof button.click === 'function') {
                  $button.on('click', button.click.bind(this.$element));
                }

                $buttons.append($button);
              }
            }

            // Toggle footer visibility based on whether it has child elements.
            this.$footer[this.$footer.children()[0] ? 'show' : 'hide']();
          },

          /**
           * Initializes the Bootstrap Modal.
           */
          init: function () {
            var handler = Bootstrap.Dialog.Handler.get(this.$element);
            if (!this.$dialog) {
              this.$dialog = this.$element.find(handler.selectors.dialog);
            }
            this.$dialog.addClass('js-drupal-dialog');

            if (!this.$header) {
              this.$header = this.$dialog.find(handler.selectors.header);
            }
            if (!this.$title) {
              this.$title = this.$dialog.find(handler.selectors.title);
            }
            if (!this.$close) {
              this.$close = this.$header.find(handler.selectors.close);
            }
            if (!this.$footer) {
              this.$footer = this.$dialog.find(handler.selectors.footer);
            }
            if (!this.$content) {
              this.$content = this.$dialog.find(handler.selectors.content);
            }
            if (!this.$dialogBody) {
              this.$dialogBody = this.$dialog.find(handler.selectors.body);
            }

            // Relay necessary events.
            if (this.options.jQueryUiBridge) {
              this.$element.on('hide.bs.modal',   Bootstrap.relayEvent(this.$element, 'dialogbeforeclose', false));
              this.$element.on('hidden.bs.modal', Bootstrap.relayEvent(this.$element, 'dialogclose', false));
              this.$element.on('show.bs.modal',   Bootstrap.relayEvent(this.$element, 'dialogcreate', false));
              this.$element.on('shown.bs.modal',  Bootstrap.relayEvent(this.$element, 'dialogopen', false));
            }

            // Create a footer if one doesn't exist.
            // This is necessary in case dialog.ajax.js decides to add buttons.
            if (!this.$footer[0]) {
              this.$footer = handler.theme('footer', {}, true).insertAfter(this.$dialogBody);
            }

            // Map the initial options.
            $.extend(true, this.options, this.mapDialogOptions(this.options));

            // Update buttons.
            this.createButtons();

            // Now call the parent init method.
            this.super();

            // Handle autoResize option (this is a drupal.dialog option).
            if (this.options.dialogOptions && this.options.dialogOptions.autoResize && this.options.dialogOptions.position) {
              this.position(this.options.dialogOptions.position);
            }

            // If show is enabled and currently not shown, show it.
            if (this.options.jQueryUiBridge && this.options.show && !this.isShown) {
              this.show();
            }
          },

          /**
           * Handler for $.fn.dialog('instance').
           */
          instance: function () {
            Bootstrap.unsupported('method', 'instance', arguments);
          },

          /**
           * Handler for $.fn.dialog('isOpen').
           */
          isOpen: function () {
            return !!this.isShown;
          },

          /**
           * Maps dialog options to the modal.
           *
           * @param {Object} options
           *   The options to map.
           */
          mapDialogOptions: function (options) {
            // Retrieve the dialog handler for this type.
            var handler = Bootstrap.Dialog.Handler.get(this.$element);

            var mappedOptions = {};
            var dialogOptions = options.dialogOptions || {};

            // Remove any existing dialog options.
            delete options.dialogOptions;

            // Separate Bootstrap modal options from jQuery UI dialog options.
            for (var k in options) {
              if (Modal.DEFAULTS.hasOwnProperty(k)) {
                mappedOptions[k] = options[k];
              }
              else {
                dialogOptions[k] = options[k];
              }
            }


            // Handle CSS properties.
            var cssUnitRegExp = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)?$/;
            var parseCssUnit = function (value, defaultUnit) {
              var parts = ('' + value).match(cssUnitRegExp);
              return parts && parts[1] !== void 0 ? parts[1] + (parts[2] || defaultUnit || 'px') : null;
            };
            var styles = {};
            var cssProperties = ['height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'width'];
            for (var i = 0, l = cssProperties.length; i < l; i++) {
              var prop = cssProperties[i];
              if (dialogOptions[prop] !== void 0) {
                var value = parseCssUnit(dialogOptions[prop]);
                if (value) {
                  styles[prop] = value;

                  // If there's a defined height of some kind, enforce the modal
                  // to use flex (on modern browsers). This will ensure that
                  // the core autoResize calculations don't cause the content
                  // to overflow.
                  if (dialogOptions.autoResize && (prop === 'height' || prop === 'maxHeight')) {
                    styles.display = 'flex';
                    styles.flexDirection = 'column';
                    this.$dialogBody.css('overflow', 'scroll');
                  }
                }
              }
            }

            // Apply mapped CSS styles to the modal-content container.
            this.$content.css(styles);

            // Handle deprecated "dialogClass" option by merging it with "classes".
            var classesMap = {
              'ui-dialog': 'modal-content',
              'ui-dialog-titlebar': 'modal-header',
              'ui-dialog-title': 'modal-title',
              'ui-dialog-titlebar-close': 'close',
              'ui-dialog-content': 'modal-body',
              'ui-dialog-buttonpane': 'modal-footer'
            };
            if (dialogOptions.dialogClass) {
              if (dialogOptions.classes === void 0) {
                dialogOptions.classes = {};
              }
              if (dialogOptions.classes['ui-dialog'] === void 0) {
                dialogOptions.classes['ui-dialog'] = '';
              }
              var dialogClass = dialogOptions.classes['ui-dialog'].split(' ');
              dialogClass.push(dialogOptions.dialogClass);
              dialogOptions.classes['ui-dialog'] = dialogClass.join(' ');
              delete dialogOptions.dialogClass;
            }

            // Add jQuery UI classes to elements in case developers target them
            // in callbacks.
            for (k in classesMap) {
              this.$element.find('.' + classesMap[k]).addClass(k);
            }

            // Bind events.
            var events = [
              'beforeClose', 'close',
              'create',
              'drag', 'dragStart', 'dragStop',
              'focus',
              'open',
              'resize', 'resizeStart', 'resizeStop'
            ];
            for (i = 0, l = events.length; i < l; i++) {
              var event = events[i].toLowerCase();
              if (dialogOptions[event] === void 0 || typeof dialogOptions[event] !== 'function') continue;
              this.$element.on('dialog' + event, dialogOptions[event]);
            }

            // Support title attribute on the modal.
            var title;
            if ((dialogOptions.title === null || dialogOptions.title === void 0) && (title = this.$element.attr('title'))) {
              dialogOptions.title = title;
            }

            // Handle the reset of the options.
            for (var name in dialogOptions) {
              if (!dialogOptions.hasOwnProperty(name) || dialogOptions[name] === void 0) continue;

              switch (name) {
                case 'appendTo':
                  Bootstrap.unsupported('option', name, dialogOptions.appendTo);
                  break;

                case 'autoOpen':
                  mappedOptions.show = dialogOptions.show = !!dialogOptions.autoOpen;
                  break;

                case 'classes':
                  if (dialogOptions.classes) {
                    for (var key in dialogOptions.classes) {
                      if (dialogOptions.classes.hasOwnProperty(key) && classesMap[key] !== void 0) {
                        // Run through Attributes to sanitize classes.
                        var attributes = Attributes.create().addClass(dialogOptions.classes[key]).toPlainObject();
                        var selector = '.' + classesMap[key];
                        this.$element.find(selector).addClass(attributes['class']);
                      }
                    }
                  }
                  break;

                case 'closeOnEscape':
                  mappedOptions.keyboard = !!dialogOptions.closeOnEscape;
                  if (!dialogOptions.closeOnEscape && dialogOptions.modal) {
                    mappedOptions.backdrop = 'static';
                  }
                  break;

                case 'closeText':
                  Bootstrap.unsupported('option', name, dialogOptions.closeText);
                  break;

                case 'draggable':
                  this.$content
                    .draggable({
                      handle: handler.selectors.header,
                      drag: Bootstrap.relayEvent(this.$element, 'dialogdrag'),
                      start: Bootstrap.relayEvent(this.$element, 'dialogdragstart'),
                      end: Bootstrap.relayEvent(this.$element, 'dialogdragend')
                    })
                    .draggable(dialogOptions.draggable ? 'enable' : 'disable');
                  break;

                case 'hide':
                  if (dialogOptions.hide === false || dialogOptions.hide === true) {
                    this.$element[dialogOptions.hide ? 'addClass' : 'removeClass']('fade');
                    mappedOptions.animation = dialogOptions.hide;
                  }
                  else {
                    Bootstrap.unsupported('option', name + ' (complex animation)', dialogOptions.hide);
                  }
                  break;

                case 'modal':
                  if (!dialogOptions.closeOnEscape && dialogOptions.modal) {
                    mappedOptions.backdrop = 'static';
                  }
                  else {
                    mappedOptions.backdrop = dialogOptions.modal;
                  }

                  // If not a modal and no initial position, center it.
                  if (!dialogOptions.modal && !dialogOptions.position) {
                    this.position({ my: 'center', of: window });
                  }
                  break;

                case 'position':
                  this.position(dialogOptions.position);
                  break;

                // Resizable support (must initialize first).
                case 'resizable':
                  this.$content
                    .resizable({
                      resize: Bootstrap.relayEvent(this.$element, 'dialogresize'),
                      start: Bootstrap.relayEvent(this.$element, 'dialogresizestart'),
                      end: Bootstrap.relayEvent(this.$element, 'dialogresizeend')
                    })
                    .resizable(dialogOptions.resizable ? 'enable' : 'disable');
                  break;

                case 'show':
                  if (dialogOptions.show === false || dialogOptions.show === true) {
                    this.$element[dialogOptions.show ? 'addClass' : 'removeClass']('fade');
                    mappedOptions.animation = dialogOptions.show;
                  }
                  else {
                    Bootstrap.unsupported('option', name + ' (complex animation)', dialogOptions.show);
                  }
                  break;

                case 'title':
                  this.$title.text(dialogOptions.title);
                  break;

              }
            }

            // Add the supported dialog options to the mapped options.
            mappedOptions.dialogOptions = dialogOptions;

            return mappedOptions;
          },

          /**
           * Handler for $.fn.dialog('moveToTop').
           */
          moveToTop: function () {
            Bootstrap.unsupported('method', 'moveToTop', arguments);
          },

          /**
           * Handler for $.fn.dialog('option').
           */
          option: function () {
            var clone = {options: {}};

            // Apply the parent option method to the clone of current options.
            this.super.apply(clone, arguments);

            // Merge in the cloned mapped options.
            $.extend(true, this.options, this.mapDialogOptions(clone.options));

            // Update buttons.
            this.createButtons();
          },

          position: function(position) {
            // Reset modal styling.
            this.$element.css({
              bottom: 'initial',
              overflow: 'visible',
              right: 'initial'
            });

            // Position the modal.
            this.$element.position(position);
          },

          /**
           * Handler for $.fn.dialog('open').
           */
          open: function () {
            this.show.apply(this, arguments);
          },

          /**
           * Handler for $.fn.dialog('widget').
           */
          widget: function () {
            return this.$element;
          }
        }
      };
    };

    // Extend the Bootstrap Modal plugin constructor class.
    Bootstrap.extendPlugin('modal', Bootstrap.Modal.Bridge);

    // Register default core dialog type handlers.
    Bootstrap.Dialog.Handler.register('dialog');
    Bootstrap.Dialog.Handler.register('modal');

    /**
     * Extend Drupal theming functions.
     */
    $.extend(Drupal.theme, /** @lend Drupal.theme */ {

      /**
       * Renders a jQuery UI Dialog compatible button element.
       *
       * @param {Object} button
       *   The button object passed in the dialog options.
       *
       * @return {String}
       *   The modal dialog button markup.
       *
       * @see http://api.jqueryui.com/dialog/#option-buttons
       * @see http://api.jqueryui.com/button/
       */
      bootstrapModalDialogButton: function (button) {
        var attributes = Attributes.create();

        var icon = '';
        var iconPosition = button.iconPosition || 'beginning';
        iconPosition = (iconPosition === 'end' && !rtl) || (iconPosition === 'beginning' && rtl) ? 'after' : 'before';

        // Handle Bootstrap icons differently.
        if (button.bootstrapIcon) {
          icon = Drupal.theme('icon', 'bootstrap', button.icon);
        }
        // Otherwise, assume it's a jQuery UI icon.
        // @todo Map jQuery UI icons to Bootstrap icons?
        else if (button.icon) {
          var iconAttributes = Attributes.create()
            .addClass(['ui-icon', button.icon])
            .set('aria-hidden', 'true');
          icon = '<span' + iconAttributes + '></span>';
        }

        // Label. Note: jQuery UI dialog has an inconsistency where it uses
        // "text" instead of "label", so both need to be supported.
        var value = button.label || button.text;

        // Show/hide label.
        if (icon && ((button.showLabel !== void 0 && !button.showLabel) || (button.text !== void 0 && !button.text))) {
          value = '<span' + Attributes.create().addClass('sr-only') + '>' + value + '</span>';
        }
        attributes.set('value', iconPosition === 'before' ? icon + value : value + icon);

        // Handle disabled.
        attributes[button.disabled ? 'set' :'remove']('disabled', 'disabled');

        if (button.classes) {
          attributes.addClass(Object.keys(button.classes).map(function(key) { return button.classes[key]; }));
        }
        if (button['class']) {
          attributes.addClass(button['class']);
        }
        if (button.primary) {
          attributes.addClass('btn-primary');
        }

        return Drupal.theme('button', attributes);
      }

    });

  });


})(window.jQuery, window.Drupal, window.Drupal.bootstrap, window.Attributes, window.drupalSettings);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  drupalSettings.dialog = {
    autoOpen: true,
    dialogClass: '',
    buttonClass: 'button',
    buttonPrimaryClass: 'button--primary',
    close: function close(event) {
      Drupal.dialog(event.target).close();
      Drupal.detachBehaviors(event.target, null, 'unload');
    }
  };

  Drupal.dialog = function (element, options) {
    var undef;
    var $element = $(element);
    var dialog = {
      open: false,
      returnValue: undef
    };

    function openDialog(settings) {
      settings = $.extend({}, drupalSettings.dialog, options, settings);
      $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
      $element.dialog(settings);
      dialog.open = true;
      $(window).trigger('dialog:aftercreate', [dialog, $element, settings]);
    }

    function closeDialog(value) {
      $(window).trigger('dialog:beforeclose', [dialog, $element]);
      $element.dialog('close');
      dialog.returnValue = value;
      dialog.open = false;
      $(window).trigger('dialog:afterclose', [dialog, $element]);
    }

    dialog.show = function () {
      openDialog({
        modal: false
      });
    };

    dialog.showModal = function () {
      openDialog({
        modal: true
      });
    };

    dialog.close = closeDialog;
    return dialog;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, debounce, displace) {
  drupalSettings.dialog = $.extend({
    autoResize: true,
    maxHeight: '95%'
  }, drupalSettings.dialog);

  function resetPosition(options) {
    var offsets = displace.offsets;
    var left = offsets.left - offsets.right;
    var top = offsets.top - offsets.bottom;
    var leftString = "".concat((left > 0 ? '+' : '-') + Math.abs(Math.round(left / 2)), "px");
    var topString = "".concat((top > 0 ? '+' : '-') + Math.abs(Math.round(top / 2)), "px");
    options.position = {
      my: "center".concat(left !== 0 ? leftString : '', " center").concat(top !== 0 ? topString : ''),
      of: window
    };
    return options;
  }

  function resetSize(event) {
    var positionOptions = ['width', 'height', 'minWidth', 'minHeight', 'maxHeight', 'maxWidth', 'position'];
    var adjustedOptions = {};
    var windowHeight = $(window).height();
    var option;
    var optionValue;
    var adjustedValue;

    for (var n = 0; n < positionOptions.length; n++) {
      option = positionOptions[n];
      optionValue = event.data.settings[option];

      if (optionValue) {
        if (typeof optionValue === 'string' && /%$/.test(optionValue) && /height/i.test(option)) {
          windowHeight -= displace.offsets.top + displace.offsets.bottom;
          adjustedValue = parseInt(0.01 * parseInt(optionValue, 10) * windowHeight, 10);

          if (option === 'height' && event.data.$element.parent().outerHeight() < adjustedValue) {
            adjustedValue = 'auto';
          }

          adjustedOptions[option] = adjustedValue;
        }
      }
    }

    if (!event.data.settings.modal) {
      adjustedOptions = resetPosition(adjustedOptions);
    }

    event.data.$element.dialog('option', adjustedOptions).trigger('dialogContentResize');
  }

  $(window).on({
    'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
      var autoResize = debounce(resetSize, 20);
      var eventData = {
        settings: settings,
        $element: $element
      };

      if (settings.autoResize === true || settings.autoResize === 'true') {
        $element.dialog('option', {
          resizable: false,
          draggable: false
        }).dialog('widget').css('position', 'fixed');
        $(window).on('resize.dialogResize scroll.dialogResize', eventData, autoResize).trigger('resize.dialogResize');
        $(document).on('drupalViewportOffsetChange.dialogResize', eventData, autoResize);
      }
    },
    'dialog:beforeclose': function dialogBeforeclose(event, dialog, $element) {
      $(window).off('.dialogResize');
      $(document).off('.dialogResize');
    }
  });
})(jQuery, Drupal, drupalSettings, Drupal.debounce, Drupal.displace);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.dialog = {
    attach: function attach(context, settings) {
      var $context = $(context);

      if (!$('#drupal-modal').length) {
        $('<div id="drupal-modal" class="ui-front"></div>').hide().appendTo('body');
      }

      var $dialog = $context.closest('.ui-dialog-content');

      if ($dialog.length) {
        if ($dialog.dialog('option', 'drupalAutoButtons')) {
          $dialog.trigger('dialogButtonsChange');
        }

        $dialog.dialog('widget').trigger('focus');
      }

      var originalClose = settings.dialog.close;

      settings.dialog.close = function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        originalClose.apply(settings.dialog, [event].concat(args));
        $(event.target).remove();
      };
    },
    prepareDialogButtons: function prepareDialogButtons($dialog) {
      var buttons = [];
      var $buttons = $dialog.find('.form-actions input[type=submit], .form-actions a.button');
      $buttons.each(function () {
        var $originalButton = $(this).css({
          display: 'none'
        });
        buttons.push({
          text: $originalButton.html() || $originalButton.attr('value'),
          class: $originalButton.attr('class'),
          click: function click(e) {
            if ($originalButton.is('a')) {
              $originalButton[0].click();
            } else {
              $originalButton.trigger('mousedown').trigger('mouseup').trigger('click');
              e.preventDefault();
            }
          }
        });
      });
      return buttons;
    }
  };

  Drupal.AjaxCommands.prototype.openDialog = function (ajax, response, status) {
    if (!response.selector) {
      return false;
    }

    var $dialog = $(response.selector);

    if (!$dialog.length) {
      $dialog = $("<div id=\"".concat(response.selector.replace(/^#/, ''), "\" class=\"ui-front\"></div>")).appendTo('body');
    }

    if (!ajax.wrapper) {
      ajax.wrapper = $dialog.attr('id');
    }

    response.command = 'insert';
    response.method = 'html';
    ajax.commands.insert(ajax, response, status);

    if (!response.dialogOptions.buttons) {
      response.dialogOptions.drupalAutoButtons = true;
      response.dialogOptions.buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
    }

    $dialog.on('dialogButtonsChange', function () {
      var buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
      $dialog.dialog('option', 'buttons', buttons);
    });
    response.dialogOptions = response.dialogOptions || {};
    var dialog = Drupal.dialog($dialog.get(0), response.dialogOptions);

    if (response.dialogOptions.modal) {
      dialog.showModal();
    } else {
      dialog.show();
    }

    $dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions');
  };

  Drupal.AjaxCommands.prototype.closeDialog = function (ajax, response, status) {
    var $dialog = $(response.selector);

    if ($dialog.length) {
      Drupal.dialog($dialog.get(0)).close();

      if (!response.persist) {
        $dialog.remove();
      }
    }

    $dialog.off('dialogButtonsChange');
  };

  Drupal.AjaxCommands.prototype.setDialogOption = function (ajax, response, status) {
    var $dialog = $(response.selector);

    if ($dialog.length) {
      $dialog.dialog('option', response.optionName, response.optionValue);
    }
  };

  $(window).on('dialog:aftercreate', function (e, dialog, $element, settings) {
    $element.on('click.dialog', '.dialog-cancel', function (e) {
      dialog.close('cancel');
      e.preventDefault();
      e.stopPropagation();
    });
  });
  $(window).on('dialog:beforeclose', function (e, dialog, $element) {
    $element.off('.dialog');
  });
})(jQuery, Drupal);;
/**
 * @file
 * dialog.ajax.js
 */
(function ($, Drupal, Bootstrap) {

  Drupal.behaviors.dialog.ajaxCurrentButton = null;
  Drupal.behaviors.dialog.ajaxOriginalButton = null;

  // Intercept the success event to add the dialog type to commands.
  var success = Drupal.Ajax.prototype.success;
  Drupal.Ajax.prototype.success = function (response, status) {
    if (this.dialogType) {
      for (var i = 0, l = response.length; i < l; i++) {
        if (response[i].dialogOptions) {
          response[i].dialogType = response[i].dialogOptions.dialogType = this.dialogType;
          response[i].$trigger = response[i].dialogOptions.$trigger = $(this.element);
        }
      }
    }
    return success.apply(this, [response, status]);
  };

  var beforeSerialize = Drupal.Ajax.prototype.beforeSerialize;
  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    // Add the dialog type currently in use.
    if (this.dialogType) {
      options.data['ajax_page_state[dialogType]'] = this.dialogType;

      // Add the dialog element ID if it can be found (useful for closing it).
      var id = $(this.element).parents('.js-drupal-dialog:first').attr('id');
      if (id) {
        options.data['ajax_page_state[dialogId]'] = id;
      }
    }
    return beforeSerialize.apply(this, arguments);
  };

  /**
   * Synchronizes a faux button with its original counterpart.
   *
   * @param {Boolean} [reset = false]
   *   Whether to reset the current and original buttons after synchronizing.
   */
  Drupal.behaviors.dialog.ajaxUpdateButtons = function (reset) {
    if (this.ajaxCurrentButton && this.ajaxOriginalButton) {
      this.ajaxCurrentButton.html(this.ajaxOriginalButton.html() || this.ajaxOriginalButton.attr('value'));
      this.ajaxCurrentButton.prop('disabled', this.ajaxOriginalButton.prop('disabled'));
    }
    if (reset) {
      this.ajaxCurrentButton = null;
      this.ajaxOriginalButton = null;
    }
  };

  $(document)
    .ajaxSend(function () {
      Drupal.behaviors.dialog.ajaxUpdateButtons();
    })
    .ajaxComplete(function () {
      Drupal.behaviors.dialog.ajaxUpdateButtons(true);
    })
  ;

  /**
   * {@inheritdoc}
   */
  Drupal.behaviors.dialog.prepareDialogButtons = function prepareDialogButtons($dialog) {
    var _this = this;
    var buttons = [];
    var $buttons = $dialog.find('.form-actions').find('button, input[type=submit], a.button, .btn');
    $buttons.each(function () {
      var $originalButton = $(this)
        // Prevent original button from being tabbed to.
        .attr('tabindex', -1)
        // Visually make the original button invisible, but don't actually hide
        // or remove it from the DOM because the click needs to be proxied from
        // the faux button created in the footer to its original counterpart.
        .css({
          display: 'block',
          width: 0,
          height: 0,
          padding: 0,
          border: 0,
          overflow: 'hidden'
        });

      buttons.push({
        // Strip all HTML from the actual text value. This value is escaped.
        // It actual HTML value will be synced with the original button's HTML
        // below in the "create" method.
        text: Bootstrap.stripHtml($originalButton) || $originalButton.attr('value'),
        class: $originalButton.attr('class').replace('use-ajax-submit', ''),
        click: function click(e) {
          e.preventDefault();
          e.stopPropagation();
          _this.ajaxCurrentButton = $(e.target);
          _this.ajaxOriginalButton = $originalButton;
          // Some core JS binds dialog buttons to the mousedown or mouseup
          // events instead of click; all three events must be simulated here.
          // @see https://www.drupal.org/project/bootstrap/issues/3016254
          Bootstrap.simulate($originalButton, ['mousedown', 'mouseup', 'click']);
        },
        create: function () {
          _this.ajaxCurrentButton = $(this);
          _this.ajaxOriginalButton = $originalButton;
          _this.ajaxUpdateButtons(true);
        }
      });
    });

    return buttons;
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Extends methods from core/misc/tabledrag.js.
 */
(function ($) {

  // Save the original prototype.
  var prototype = Drupal.tableDrag.prototype;

  /**
   * Provides table and field manipulation.
   *
   * @constructor
   *
   * @param {HTMLElement} table
   *   DOM object for the table to be made draggable.
   * @param {object} tableSettings
   *   Settings for the table added via drupal_add_dragtable().
   */
  Drupal.tableDrag = function (table, tableSettings) {
    var self = this;
    var $table = $(table);

    /**
     * @type {jQuery}
     */
    this.$table = $(table);

    /**
     *
     * @type {HTMLElement}
     */
    this.table = table;

    /**
     * @type {object}
     */
    this.tableSettings = tableSettings;

    /**
     * Used to hold information about a current drag operation.
     *
     * @type {?HTMLElement}
     */
    this.dragObject = null;

    /**
     * Provides operations for row manipulation.
     *
     * @type {?HTMLElement}
     */
    this.rowObject = null;

    /**
     * Remember the previous element.
     *
     * @type {?HTMLElement}
     */
    this.oldRowElement = null;

    /**
     * Used to determine up or down direction from last mouse move.
     *
     * @type {number}
     */
    this.oldY = 0;

    /**
     * Whether anything in the entire table has changed.
     *
     * @type {bool}
     */
    this.changed = false;

    /**
     * Maximum amount of allowed parenting.
     *
     * @type {number}
     */
    this.maxDepth = 0;

    /**
     * Direction of the table.
     *
     * @type {number}
     */
    this.rtl = $(this.table).css('direction') === 'rtl' ? -1 : 1;

    /**
     *
     * @type {bool}
     */
    this.striping = $(this.table).data('striping') === 1;

    /**
     * Configure the scroll settings.
     *
     * @type {object}
     *
     * @prop {number} amount
     * @prop {number} interval
     * @prop {number} trigger
     */
    this.scrollSettings = {amount: 4, interval: 50, trigger: 70};

    /**
     *
     * @type {?number}
     */
    this.scrollInterval = null;

    /**
     *
     * @type {number}
     */
    this.scrollY = 0;

    /**
     *
     * @type {number}
     */
    this.windowHeight = 0;

    /**
     * @type {?HTMLElement}
     */
    this.$toggleWeightButton = null;

    /**
     * Check this table's settings to see if there are parent relationships in
     * this table. For efficiency, large sections of code can be skipped if we
     * don't need to track horizontal movement and indentations.
     *
     * @type {bool}
     */
    this.indentEnabled = false;
    for (var group in tableSettings) {
      if (tableSettings.hasOwnProperty(group)) {
        for (var n in tableSettings[group]) {
          if (tableSettings[group].hasOwnProperty(n)) {
            if (tableSettings[group][n].relationship === 'parent') {
              this.indentEnabled = true;
            }
            if (tableSettings[group][n].limit > 0) {
              this.maxDepth = tableSettings[group][n].limit;
            }
          }
        }
      }
    }
    if (this.indentEnabled) {

      /**
       * Total width of indents, set in makeDraggable.
       *
       * @type {number}
       */
      this.indentCount = 1;
      // Find the width of indentations to measure mouse movements against.
      // Because the table doesn't need to start with any indentations, we
      // manually append 2 indentations in the first draggable row, measure
      // the offset, then remove.
      var indent = Drupal.theme('tableDragIndentation');
      var testRow = $('<tr/>').addClass('draggable').appendTo(table);
      var testCell = $('<td/>').appendTo(testRow).prepend(indent).prepend(indent);
      var $indentation = testCell.find('.js-indentation');

      /**
       *
       * @type {number}
       */
      this.indentAmount = $indentation.get(1).offsetLeft - $indentation.get(0).offsetLeft;
      testRow.remove();
    }

    // Make each applicable row draggable.
    // Match immediate children of the parent element to allow nesting.
    $table.find('> tr.draggable, > tbody > tr.draggable').each(function () { self.makeDraggable(this); });

    // Add a link before the table for users to show or hide weight columns.
    self.$toggleWeightButton = $(Drupal.theme('btn-sm', {
      'class': ['tabledrag-toggle-weight'],
      'data-drupal-selector': ['tabledrag-toggle-weight'],
      title: Drupal.t('Re-order rows by numerical weight instead of dragging.'),
      'data-toggle': 'tooltip'
    }));

    self.$toggleWeightButton = $('[data-drupal-selector="tabledrag-toggle-weight"]');

    self.$toggleWeightButton
      .on('click', $.proxy(function (e) {
        e.preventDefault();
        this.toggleColumns();
      }, this))
      .wrap('<div class="tabledrag-toggle-weight-wrapper"></div>')
      .parent();

    $table.before(self.$toggleWeightButton);

    // Initialize the specified columns (for example, weight or parent columns)
    // to show or hide according to user preference. This aids accessibility
    // so that, e.g., screen reader users can choose to enter weight values and
    // manipulate form elements directly, rather than using drag-and-drop..
    self.initColumns();

    // Add event bindings to the document. The self variable is passed along
    // as event handlers do not have direct access to the tableDrag object.
    $(document).on('touchmove', function (event) { return self.dragRow(event.originalEvent.touches[0], self); });
    $(document).on('touchend', function (event) { return self.dropRow(event.originalEvent.touches[0], self); });
    $(document).on('mousemove pointermove', function (event) { return self.dragRow(event, self); });
    $(document).on('mouseup pointerup', function (event) { return self.dropRow(event, self); });

    // React to localStorage event showing or hiding weight columns.
    $(window).on('storage', $.proxy(function (e) {
      // Only react to 'Drupal.tableDrag.showWeight' value change.
      if (e.originalEvent.key === 'Drupal.tableDrag.showWeight') {
        // This was changed in another window, get the new value for this
        // window.
        showWeight = JSON.parse(e.originalEvent.newValue);
        this.displayColumns(showWeight);
      }
    }, this));
  };

  // Restore the original prototype.
  Drupal.tableDrag.prototype = prototype;

  /**
   * Take an item and add event handlers to make it become draggable.
   *
   * @param {HTMLElement} item
   */
  Drupal.tableDrag.prototype.makeDraggable = function (item) {
    var self = this;
    var $item = $(item);

    // Add a class to the title link
    $item.find('td:first-of-type').find('a').addClass('menu-item__link');

    // Create the handle.
    var handle = $('<a href="#" class="tabledrag-handle"/>');

    // Insert the handle after indentations (if any).
    var $indentationLast = $item.find('td:first-of-type').find('.js-indentation').eq(-1);
    if ($indentationLast.length) {
      $indentationLast.after(handle);
      // Update the total width of indentation in this entire table.
      self.indentCount = Math.max($item.find('.js-indentation').length, self.indentCount);
    }
    else {
      $item.find('td').eq(0).prepend(handle);
    }

    // Add the glyphicon to the handle.
    handle
      .attr('title', Drupal.t('Drag to re-order'))
      .attr('data-toggle', 'tooltip')
      .append(Drupal.theme('bootstrapIcon', 'move'))
    ;

    handle.on('mousedown touchstart pointerdown', function (event) {
      event.preventDefault();
      if (event.originalEvent.type === 'touchstart') {
        event = event.originalEvent.touches[0];
      }
      self.dragStart(event, self, item);
    });

    // Prevent the anchor tag from jumping us to the top of the page.
    handle.on('click', function (e) {
      e.preventDefault();
    });

    // Set blur cleanup when a handle is focused.
    handle.on('focus', function () {
      self.safeBlur = true;
    });

    // On blur, fire the same function as a touchend/mouseup. This is used to
    // update values after a row has been moved through the keyboard support.
    handle.on('blur', function (event) {
      if (self.rowObject && self.safeBlur) {
        self.dropRow(event, self);
      }
    });

    // Add arrow-key support to the handle.
    handle.on('keydown', function (event) {
      // If a rowObject doesn't yet exist and this isn't the tab key.
      if (event.keyCode !== 9 && !self.rowObject) {
        self.rowObject = new self.row(item, 'keyboard', self.indentEnabled, self.maxDepth, true);
      }

      var keyChange = false;
      var groupHeight;
      switch (event.keyCode) {
        // Left arrow.
        case 37:
        // Safari left arrow.
        case 63234:
          keyChange = true;
          self.rowObject.indent(-1 * self.rtl);
          break;

        // Up arrow.
        case 38:
        // Safari up arrow.
        case 63232:
          var $previousRow = $(self.rowObject.element).prev('tr:first-of-type');
          var previousRow = $previousRow.get(0);
          while (previousRow && $previousRow.is(':hidden')) {
            $previousRow = $(previousRow).prev('tr:first-of-type');
            previousRow = $previousRow.get(0);
          }
          if (previousRow) {
            // Do not allow the onBlur cleanup.
            self.safeBlur = false;
            self.rowObject.direction = 'up';
            keyChange = true;

            if ($(item).is('.tabledrag-root')) {
              // Swap with the previous top-level row.
              groupHeight = 0;
              while (previousRow && $previousRow.find('.js-indentation').length) {
                $previousRow = $(previousRow).prev('tr:first-of-type');
                previousRow = $previousRow.get(0);
                groupHeight += $previousRow.is(':hidden') ? 0 : previousRow.offsetHeight;
              }
              if (previousRow) {
                self.rowObject.swap('before', previousRow);
                // No need to check for indentation, 0 is the only valid one.
                window.scrollBy(0, -groupHeight);
              }
            }
            else if (self.table.tBodies[0].rows[0] !== previousRow || $previousRow.is('.draggable')) {
              // Swap with the previous row (unless previous row is the first
              // one and undraggable).
              self.rowObject.swap('before', previousRow);
              self.rowObject.interval = null;
              self.rowObject.indent(0);
              window.scrollBy(0, -parseInt(item.offsetHeight, 10));
            }
            // Regain focus after the DOM manipulation.
            handle.trigger('focus');
          }
          break;

        // Right arrow.
        case 39:
        // Safari right arrow.
        case 63235:
          keyChange = true;
          self.rowObject.indent(self.rtl);
          break;

        // Down arrow.
        case 40:
        // Safari down arrow.
        case 63233:
          var $nextRow = $(self.rowObject.group).eq(-1).next('tr:first-of-type');
          var nextRow = $nextRow.get(0);
          while (nextRow && $nextRow.is(':hidden')) {
            $nextRow = $(nextRow).next('tr:first-of-type');
            nextRow = $nextRow.get(0);
          }
          if (nextRow) {
            // Do not allow the onBlur cleanup.
            self.safeBlur = false;
            self.rowObject.direction = 'down';
            keyChange = true;

            if ($(item).is('.tabledrag-root')) {
              // Swap with the next group (necessarily a top-level one).
              groupHeight = 0;
              var nextGroup = new self.row(nextRow, 'keyboard', self.indentEnabled, self.maxDepth, false);
              if (nextGroup) {
                $(nextGroup.group).each(function () {
                  groupHeight += $(this).is(':hidden') ? 0 : this.offsetHeight;
                });
                var nextGroupRow = $(nextGroup.group).eq(-1).get(0);
                self.rowObject.swap('after', nextGroupRow);
                // No need to check for indentation, 0 is the only valid one.
                window.scrollBy(0, parseInt(groupHeight, 10));
              }
            }
            else {
              // Swap with the next row.
              self.rowObject.swap('after', nextRow);
              self.rowObject.interval = null;
              self.rowObject.indent(0);
              window.scrollBy(0, parseInt(item.offsetHeight, 10));
            }
            // Regain focus after the DOM manipulation.
            handle.trigger('focus');
          }
          break;
      }

      if (self.rowObject && self.rowObject.changed === true) {
        $(item).addClass('drag');
        if (self.oldRowElement) {
          $(self.oldRowElement).removeClass('drag-previous');
        }
        self.oldRowElement = item;
        if (self.striping === true) {
          self.restripeTable();
        }
        self.onDrag();
      }

      // Returning false if we have an arrow key to prevent scrolling.
      if (keyChange) {
        return false;
      }
    });

    // Compatibility addition, return false on keypress to prevent unwanted
    // scrolling. IE and Safari will suppress scrolling on keydown, but all
    // other browsers need to return false on keypress.
    // http://www.quirksmode.org/js/keys.html
    handle.on('keypress', function (event) {
      switch (event.keyCode) {
        // Left arrow.
        case 37:
        // Up arrow.
        case 38:
        // Right arrow.
        case 39:
        // Down arrow.
        case 40:
          return false;
      }
    });
  };

  /**
   * Add an asterisk or other marker to the changed row.
   */
  Drupal.tableDrag.prototype.row.prototype.markChanged = function () {
    var $cell = $('td:first', this.element);
    // Find the first appropriate place to insert the marker.
    var $target = $($cell.find('.file-size').get(0) || $cell.find('.file').get(0) || $cell.find('.tabledrag-handle').get(0));
    if (!$cell.find('.tabledrag-changed').length) {
      $target.after(' ' + Drupal.theme('tableDragChangedMarker') + ' ');
    }
  };

  $.extend(Drupal.theme, /** @lends Drupal.theme */{

    /**
     * @return {string}
     */
    tableDragChangedMarker: function () {
      return Drupal.theme('bootstrapIcon', 'warning-sign', {'class': ['tabledrag-changed', 'text-warning']});
    },

    /**
     * @return {string}
     */
    tableDragChangedWarning: function () {
      return '<div class="tabledrag-changed-warning alert alert-sm alert-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('You have unsaved changes.') + '</div>';
    }
  });

})(jQuery);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  $.fn.drupalGetSummary = function () {
    var callback = this.data('summaryCallback');
    return this[0] && callback ? callback(this[0]).trim() : '';
  };

  $.fn.drupalSetSummary = function (callback) {
    var self = this;

    if (typeof callback !== 'function') {
      var val = callback;

      callback = function callback() {
        return val;
      };
    }

    return this.data('summaryCallback', callback).off('formUpdated.summary').on('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    }).trigger('summaryUpdated');
  };

  Drupal.behaviors.formSingleSubmit = {
    attach: function attach() {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');

        if (previousValues === formValues) {
          e.preventDefault();
        } else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $(once('form-single-submit', 'body')).on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  function triggerFormUpdated(element) {
    $(element).trigger('formUpdated');
  }

  function fieldsList(form) {
    return [].map.call(form.querySelectorAll('[name][id]'), function (el) {
      return el.id;
    });
  }

  Drupal.behaviors.formUpdated = {
    attach: function attach(context) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      var $forms = $(once('form-updated', contextIsForm ? $context : $context.find('form')));
      var formFields;

      if ($forms.length) {
        $.makeArray($forms).forEach(function (form) {
          var events = 'change.formUpdated input.formUpdated ';
          var eventHandler = debounce(function (event) {
            triggerFormUpdated(event.target);
          }, 300);
          formFields = fieldsList(form).join(',');
          form.setAttribute('data-drupal-form-fields', formFields);
          $(form).on(events, eventHandler);
        });
      }

      if (contextIsForm) {
        formFields = fieldsList(context).join(',');
        var currentFields = $(context).attr('data-drupal-form-fields');

        if (formFields !== currentFields) {
          triggerFormUpdated(context);
        }
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var contextIsForm = $context.is('form');

      if (trigger === 'unload') {
        once.remove('form-updated', contextIsForm ? $context : $context.find('form')).forEach(function (form) {
          form.removeAttribute('data-drupal-form-fields');
          $(form).off('.formUpdated');
        });
      }
    }
  };
  Drupal.behaviors.fillUserInfoFromBrowser = {
    attach: function attach(context, settings) {
      var userInfo = ['name', 'mail', 'homepage'];
      var $forms = $(once('user-info-from-browser', '[data-user-info-from-browser]'));

      if ($forms.length) {
        userInfo.forEach(function (info) {
          var $element = $forms.find("[name=".concat(info, "]"));
          var browserData = localStorage.getItem("Drupal.visitor.".concat(info));

          if (!$element.length) {
            return;
          }

          var emptyValue = $element[0].value === '';
          var defaultValue = $element.attr('data-drupal-default-value') === $element[0].value;

          if (browserData && (emptyValue || defaultValue)) {
            $element.each(function (index, item) {
              item.value = browserData;
            });
          }
        });
      }

      $forms.on('submit', function () {
        userInfo.forEach(function (info) {
          var $element = $forms.find("[name=".concat(info, "]"));

          if ($element.length) {
            localStorage.setItem("Drupal.visitor.".concat(info), $element[0].value);
          }
        });
      });
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e) {
    var url;

    if (e.type === 'click') {
      url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
    } else {
      url = window.location;
    }

    var hash = url.hash.substr(1);

    if (hash) {
      var $target = $("#".concat(hash));
      $('body').trigger('formFragmentLinkClickOrHashChange', [$target]);
      setTimeout(function () {
        return $target.trigger('focus');
      }, 300);
    }
  };

  var debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);
  $(window).on('hashchange.form-fragment', debouncedHandleFragmentLinkClickOrHashChange);
  $(document).on('click.form-fragment', 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
})(jQuery, Drupal, Drupal.debounce);;
/**
 * @file
 * Extends methods from core/misc/form.js.
 */

(function ($, window, Drupal, drupalSettings) {

  /**
   * Behavior for "forms_has_error_value_toggle" theme setting.
   */
  Drupal.behaviors.bootstrapForm = {
    attach: function (context) {
      if (drupalSettings.bootstrap && drupalSettings.bootstrap.forms_has_error_value_toggle) {
        var $context = $(context);
        $context.find('.form-item.has-error:not(.form-type-password.has-feedback)').once('error').each(function () {
          var $formItem = $(this);
          var $input = $formItem.find(':input');
          $input.on('keyup focus blur', function () {
            if (this.defaultValue !== void 0) {
              $formItem[this.defaultValue !== this.value ? 'removeClass' : 'addClass']('has-error');
              $input[this.defaultValue !== this.value ? 'removeClass' : 'addClass']('error');
            }
          });
        });
      }
    }
  };


})(jQuery, this, Drupal, drupalSettings);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.Views = {};

  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');

    if (pos !== -1) {
      query = query.substring(pos + 1);
    }

    var pair;
    var pairs = query.split('&');

    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i].split('=');

      if (pair[0] !== 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }

    return args;
  };

  Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {};
    var path = Drupal.Views.getPath(href);
    var viewHref = Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);

    if (viewHref && path.substring(0, viewHref.length + 1) === "".concat(viewHref, "/")) {
      returnObj.view_args = decodeURIComponent(path.substring(viewHref.length + 1, path.length));
      returnObj.view_path = path;
    }

    return returnObj;
  };

  Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;

    if (href.substring(0, protocol.length) === protocol) {
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }

    return href;
  };

  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(drupalSettings.path.baseUrl.length, href.length);

    if (href.substring(0, 3) === '?q=') {
      href = href.substring(3, href.length);
    }

    var chars = ['#', '?', '&'];

    for (var i = 0; i < chars.length; i++) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }

    return href;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ViewsAjaxView = {};

  Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
    if (settings && settings.views && settings.views.ajaxViews) {
      var ajaxViews = settings.views.ajaxViews;
      Object.keys(ajaxViews || {}).forEach(function (i) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
      });
    }
  };

  Drupal.behaviors.ViewsAjaxView.detach = function (context, settings, trigger) {
    if (trigger === 'unload') {
      if (settings && settings.views && settings.views.ajaxViews) {
        var ajaxViews = settings.views.ajaxViews;
        Object.keys(ajaxViews || {}).forEach(function (i) {
          var selector = ".js-view-dom-id-".concat(ajaxViews[i].view_dom_id);

          if ($(selector, context).length) {
            delete Drupal.views.instances[i];
            delete settings.views.ajaxViews[i];
          }
        });
      }
    }
  };

  Drupal.views = {};
  Drupal.views.instances = {};

  Drupal.views.ajaxView = function (settings) {
    var selector = ".js-view-dom-id-".concat(settings.view_dom_id);
    this.$view = $(selector);
    var ajaxPath = drupalSettings.views.ajax_path;

    if (ajaxPath.constructor.toString().indexOf('Array') !== -1) {
      ajaxPath = ajaxPath[0];
    }

    var queryString = window.location.search || '';

    if (queryString !== '') {
      queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');

      if (queryString !== '') {
        queryString = (/\?/.test(ajaxPath) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajaxPath + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: {
        type: 'fullscreen'
      }
    };
    this.settings = settings;
    this.$exposed_form = $("form#views-exposed-form-".concat(settings.view_name.replace(/_/g, '-'), "-").concat(settings.view_display_id.replace(/_/g, '-')));
    once('exposed-form', this.$exposed_form).forEach($.proxy(this.attachExposedFormAjax, this));
    once('ajax-pager', this.$view.filter($.proxy(this.filterNestedViews, this))).forEach($.proxy(this.attachPagerAjax, this));
    var selfSettings = $.extend({}, this.element_settings, {
      event: 'RefreshView',
      base: this.selector,
      element: this.$view.get(0)
    });
    this.refreshViewAjax = Drupal.ajax(selfSettings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];
    $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var selfSettings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
    });
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function () {
    return !this.$view.parents('.view').length;
  };

  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view.find('ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a').each($.proxy(this.attachPagerLinkAjax, this));
  };

  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');
    $.extend(viewData, this.settings, Drupal.Views.parseQueryString(href), Drupal.Views.parseViewArgs(href, this.settings.view_base_path));
    var selfSettings = $.extend({}, this.element_settings, {
      submit: viewData,
      base: false,
      element: link
    });
    this.pagerAjax = Drupal.ajax(selfSettings);
  };

  Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
    var offset = $(response.selector).offset();
    var scrollTarget = response.selector;

    while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }

    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({
        scrollTop: offset.top - 10
      }, 500);
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
 * @file
 * Extends core ajax_view.js.
 */

(function ($, Drupal) {
  'use strict';

  /**
   * @method
   */
  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];
    $('button[type=submit], input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var self_settings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(self_settings);
    });
  };

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.AjaxCommands.prototype.viewsHighlight = function (ajax, response, status) {
    $('.hilited').removeClass('hilited');
    $(response.selector).addClass('hilited');
  };

  Drupal.AjaxCommands.prototype.viewsSetForm = function (ajax, response, status) {
    var $form = $('.js-views-ui-dialog form');
    var $submitButtons = $(once('views-ajax-submit', $form.find('input[type=submit].js-form-submit, button.js-form-submit')));
    $submitButtons.on('click mousedown', function () {
      this.form.clk = this;
    });
    once('views-ajax-submit', $form).forEach(function (form) {
      var $form = $(form);
      var elementSettings = {
        url: response.url,
        event: 'submit',
        base: $form.attr('id'),
        element: form
      };
      var ajaxForm = Drupal.ajax(elementSettings);
      ajaxForm.$form = $form;
    });
  };

  Drupal.AjaxCommands.prototype.viewsShowButtons = function (ajax, response, status) {
    $('div.views-edit-view div.form-actions').removeClass('js-hide');

    if (response.changed) {
      $('div.views-edit-view div.view-changed.messages').removeClass('js-hide');
    }
  };

  Drupal.AjaxCommands.prototype.viewsTriggerPreview = function (ajax, response, status) {
    if ($('input#edit-displays-live-preview').is(':checked')) {
      $('#preview-submit').trigger('click');
    }
  };

  Drupal.AjaxCommands.prototype.viewsReplaceTitle = function (ajax, response, status) {
    var doc = document;
    var oldTitle = doc.title;
    var escapedSiteName = response.siteName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    var re = new RegExp(".+ (.) ".concat(escapedSiteName));
    doc.title = oldTitle.replace(re, "".concat(response.title, " $1 ").concat(response.siteName));
    document.querySelectorAll('h1.page-title').forEach(function (item) {
      item.textContent = response.title;
    });
  };

  Drupal.theme.tableDragChangedWarning = function () {
    return [];
  };

  Drupal.behaviors.livePreview = {
    attach: function attach(context) {
      $(once('views-ajax', 'input#edit-displays-live-preview', context)).on('click', function () {
        if ($(this).is(':checked')) {
          $('#preview-submit').trigger('click');
        }
      });
    }
  };
  Drupal.behaviors.syncPreviewDisplay = {
    attach: function attach(context) {
      $(once('views-ajax', '#views-tabset a')).on('click', function () {
        var href = $(this).attr('href');
        var displayId = href.substr(11);
        var viewsPreviewId = document.querySelector('#views-live-preview #preview-display-id');

        if (viewsPreviewId) {
          viewsPreviewId.value = displayId;
        }
      });
    }
  };
  Drupal.behaviors.viewsAjax = {
    collapseReplaced: false,
    attach: function attach(context, settings) {
      var baseElementSettings = {
        event: 'click',
        progress: {
          type: 'fullscreen'
        }
      };
      once('views-ajax', 'a.views-ajax-link', context).forEach(function (link) {
        var $link = $(link);
        var elementSettings = baseElementSettings;
        elementSettings.base = $link.attr('id');
        elementSettings.element = link;

        if ($link.attr('href')) {
          elementSettings.url = $link.attr('href');
        }

        Drupal.ajax(elementSettings);
      });
      once('views-ajax', 'div#views-live-preview a').forEach(function (link) {
        var $link = $(link);

        if (!$link.attr('href')) {
          return true;
        }

        var elementSettings = baseElementSettings;
        elementSettings.url = $link.attr('href');

        if (Drupal.Views.getPath(elementSettings.url).substring(0, 21) !== 'admin/structure/views') {
          return true;
        }

        elementSettings.wrapper = 'views-preview-wrapper';
        elementSettings.method = 'replaceWith';
        elementSettings.base = link.id;
        elementSettings.element = link;
        Drupal.ajax(elementSettings);
      });
      once('views-ajax', 'div#views-live-preview input[type=submit]').forEach(function (submit) {
        var $submit = $(submit);
        $submit.on('click', function () {
          this.form.clk = this;
          return true;
        });
        var elementSettings = baseElementSettings;
        elementSettings.url = $(submit.form).attr('action');

        if (Drupal.Views.getPath(elementSettings.url).substring(0, 21) !== 'admin/structure/views') {
          return true;
        }

        elementSettings.wrapper = 'views-preview-wrapper';
        elementSettings.method = 'replaceWith';
        elementSettings.event = 'click';
        elementSettings.base = submit.id;
        elementSettings.element = submit;
        Drupal.ajax(elementSettings);
      });
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  function handleDialogResize(e) {
    var $modal = $(e.currentTarget);
    var $viewsOverride = $modal.find('[data-drupal-views-offset]');
    var $scroll = $modal.find('[data-drupal-views-scroll]');
    var offset = 0;
    var modalHeight;

    if ($scroll.length) {
      $modal.closest('.views-ui-dialog').addClass('views-ui-dialog-scroll');
      $scroll.css({
        overflow: 'visible',
        height: 'auto'
      });
      modalHeight = $modal.height();
      $viewsOverride.each(function () {
        offset += $(this).outerHeight();
      });
      var scrollOffset = $scroll.outerHeight() - $scroll.height();
      $scroll.height(modalHeight - offset - scrollOffset);
      $modal.css('overflow', 'hidden');
      $scroll.css('overflow', 'auto');
    }
  }

  Drupal.behaviors.viewsModalContent = {
    attach: function attach(context) {
      $(once('viewsDialog', 'body')).on('dialogContentResize.viewsDialog', '.ui-dialog-content', handleDialogResize);
      $(once('detailsUpdate', '.scroll', context)).on('click', 'summary', function (e) {
        $(e.currentTarget).trigger('dialogContentResize');
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        $(once.remove('viewsDialog', 'body')).off('.viewsDialog');
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.viewsUi = {};
  Drupal.behaviors.viewsUiEditView = {
    attach: function attach() {
      $('[data-drupal-selector="edit-query-options-disable-sql-rewrite"]').on('click', function () {
        $('.sql-rewrite-warning').toggleClass('js-hide');
      });
    }
  };
  Drupal.behaviors.viewsUiAddView = {
    attach: function attach(context) {
      var $context = $(context);
      var exclude = new RegExp('[^a-z0-9\\-]+', 'g');
      var replace = '-';
      var suffix;
      var $fields = $context.find('[id^="edit-page-title"], [id^="edit-block-title"], [id^="edit-page-link-properties-title"]');

      if ($fields.length) {
        if (!this.fieldsFiller) {
          this.fieldsFiller = new Drupal.viewsUi.FormFieldFiller($fields);
        } else {
          this.fieldsFiller.rebind($fields);
        }
      }

      var $pathField = $context.find('[id^="edit-page-path"]');

      if ($pathField.length) {
        if (!this.pathFiller) {
          this.pathFiller = new Drupal.viewsUi.FormFieldFiller($pathField, exclude, replace);
        } else {
          this.pathFiller.rebind($pathField);
        }
      }

      var $feedField = $context.find('[id^="edit-page-feed-properties-path"]');

      if ($feedField.length) {
        if (!this.feedFiller) {
          suffix = '.xml';
          this.feedFiller = new Drupal.viewsUi.FormFieldFiller($feedField, exclude, replace, suffix);
        } else {
          this.feedFiller.rebind($feedField);
        }
      }
    }
  };

  Drupal.viewsUi.FormFieldFiller = function ($target, exclude, replace, suffix) {
    this.source = $('#edit-label');
    this.target = $target;
    this.exclude = exclude || false;
    this.replace = replace || '';
    this.suffix = suffix || '';
    var self = this;

    this.populate = function () {
      return self._populate.call(self);
    };

    this.unbind = function () {
      return self._unbind.call(self);
    };

    this.bind();
  };

  $.extend(Drupal.viewsUi.FormFieldFiller.prototype, {
    bind: function bind() {
      this.unbind();
      this.source.on('keyup.viewsUi change.viewsUi', this.populate);
      this.target.on('focus.viewsUi', this.unbind);
    },
    getTransliterated: function getTransliterated() {
      var from = this.source.length ? this.source[0].value : '';

      if (this.exclude) {
        from = from.toLowerCase().replace(this.exclude, this.replace);
      }

      return from;
    },
    _populate: function _populate() {
      var transliterated = this.getTransliterated();
      var suffix = this.suffix;
      this.target.each(function (i) {
        var maxlength = $(this).attr('maxlength') - suffix.length;
        this.value = transliterated.substr(0, maxlength) + suffix;
      });
    },
    _unbind: function _unbind() {
      this.source.off('keyup.viewsUi change.viewsUi', this.populate);
      this.target.off('focus.viewsUi', this.unbind);
    },
    rebind: function rebind($fields) {
      this.target = $fields;
      this.bind();
    }
  });
  Drupal.behaviors.addItemForm = {
    attach: function attach(context) {
      var $context = $(context);
      var $form = $context;

      if (!$context.is('form[id^="views-ui-add-handler-form"]')) {
        $form = $context.find('form[id^="views-ui-add-handler-form"]');
      }

      if (once('views-ui-add-handler-form', $form).length) {
        new Drupal.viewsUi.AddItemForm($form);
      }
    }
  };

  Drupal.viewsUi.AddItemForm = function ($form) {
    this.$form = $form;
    this.$form.find('.views-filterable-options :checkbox').on('click', $.proxy(this.handleCheck, this));
    this.$selected_div = this.$form.find('.views-selected-options').parent();
    this.$selected_div.hide();
    this.checkedItems = [];
  };

  Drupal.viewsUi.AddItemForm.prototype.handleCheck = function (event) {
    var $target = $(event.target);
    var label = $target.closest('td').next().html().trim();

    if ($target.is(':checked')) {
      this.$selected_div.show().css('display', 'block');
      this.checkedItems.push(label);
    } else {
      var position = $.inArray(label, this.checkedItems);

      for (var i = 0; i < this.checkedItems.length; i++) {
        if (i === position) {
          this.checkedItems.splice(i, 1);
          i--;
          break;
        }
      }

      if (this.checkedItems.length === 0) {
        this.$selected_div.hide();
      }
    }

    this.refreshCheckedItems();
  };

  Drupal.viewsUi.AddItemForm.prototype.refreshCheckedItems = function () {
    this.$selected_div.find('.views-selected-options').html(this.checkedItems.join(', ')).trigger('dialogContentResize');
  };

  Drupal.behaviors.viewsUiRenderAddViewButton = {
    attach: function attach(context) {
      var menu = once('views-ui-render-add-view-button', '#views-display-menu-tabs', context);

      if (!menu.length) {
        return;
      }

      var $menu = $(menu);
      var $addDisplayDropdown = $("<li class=\"add\"><a href=\"#\"><span class=\"icon add\"></span>".concat(Drupal.t('Add'), "</a><ul class=\"action-list\" style=\"display:none;\"></ul></li>"));
      var $displayButtons = $menu.nextAll('input.add-display').detach();
      $displayButtons.appendTo($addDisplayDropdown.find('.action-list')).wrap('<li>').parent().eq(0).addClass('first').end().eq(-1).addClass('last');
      $displayButtons.each(function () {
        var $this = $(this);
        this.value = $this.attr('data-drupal-dropdown-label');
      });
      $addDisplayDropdown.appendTo($menu);
      $menu.find('li.add > a').on('click', function (event) {
        event.preventDefault();
        var $trigger = $(this);
        Drupal.behaviors.viewsUiRenderAddViewButton.toggleMenu($trigger);
      });
      $('li.add', $menu).on('mouseleave', function (event) {
        var $this = $(this);
        var $trigger = $this.children('a[href="#"]');

        if ($this.children('.action-list').is(':visible')) {
          Drupal.behaviors.viewsUiRenderAddViewButton.toggleMenu($trigger);
        }
      });
    }
  };

  Drupal.behaviors.viewsUiRenderAddViewButton.toggleMenu = function ($trigger) {
    $trigger.parent().toggleClass('open');
    $trigger.next().slideToggle('fast');
  };

  Drupal.behaviors.viewsUiSearchOptions = {
    attach: function attach(context) {
      var $context = $(context);
      var $form = $context;

      if (!$context.is('form[id^="views-ui-add-handler-form"]')) {
        $form = $context.find('form[id^="views-ui-add-handler-form"]');
      }

      if (once('views-ui-filter-options', $form).length) {
        new Drupal.viewsUi.OptionsSearch($form);
      }
    }
  };

  Drupal.viewsUi.OptionsSearch = function ($form) {
    this.$form = $form;
    this.$form.on('click', 'td.title', function (event) {
      var $target = $(event.currentTarget);
      $target.closest('tr').find('input').trigger('click');
    });
    var searchBoxSelector = '[data-drupal-selector="edit-override-controls-options-search"]';
    var controlGroupSelector = '[data-drupal-selector="edit-override-controls-group"]';
    this.$form.on('formUpdated', "".concat(searchBoxSelector, ",").concat(controlGroupSelector), $.proxy(this.handleFilter, this));
    this.$searchBox = this.$form.find(searchBoxSelector);
    this.$controlGroup = this.$form.find(controlGroupSelector);
    this.options = this.getOptions(this.$form.find('.filterable-option'));
    this.$searchBox.on('keypress', function (event) {
      if (event.which === 13) {
        event.preventDefault();
      }
    });
  };

  $.extend(Drupal.viewsUi.OptionsSearch.prototype, {
    getOptions: function getOptions($allOptions) {
      var $title;
      var $description;
      var $option;
      var options = [];
      var length = $allOptions.length;

      for (var i = 0; i < length; i++) {
        $option = $($allOptions[i]);
        $title = $option.find('.title');
        $description = $option.find('.description');
        options[i] = {
          searchText: "".concat($title[0].textContent.toLowerCase(), " ").concat($description[0].textContent.toLowerCase(), "\n              .toLowerCase()}"),
          $div: $option
        };
      }

      return options;
    },
    handleFilter: function handleFilter(event) {
      var search = this.$searchBox[0].value.toLowerCase();
      var words = search.split(' ');
      var group = this.$controlGroup[0].value;
      this.options.forEach(function (option) {
        function hasWord(word) {
          return option.searchText.indexOf(word) !== -1;
        }

        var found = true;

        if (search) {
          found = words.every(hasWord);
        }

        if (found && group !== 'all') {
          found = option.$div.hasClass(group);
        }

        option.$div.toggle(found);
      });
      $(event.target).trigger('dialogContentResize');
    }
  });
  Drupal.behaviors.viewsUiPreview = {
    attach: function attach(context) {
      var $contextualFiltersBucket = $(context).find('.views-display-column .views-ui-display-tab-bucket.argument');

      if ($contextualFiltersBucket.length === 0) {
        return;
      }

      var $contextualFilters = $contextualFiltersBucket.find('.views-display-setting a');

      if ($contextualFilters.length) {
        $('#preview-args').parent().show();
      } else {
        $('#preview-args').parent().hide();
      }

      if ($(once('edit-displays-live-preview', '#edit-displays-live-preview')).is(':checked')) {
        $(once('edit-displays-live-preview', '#preview-submit')).trigger('click');
      }
    }
  };

  Drupal.viewsUi.RearrangeFilterHandler = function ($table, $operator) {
    this.table = $table;
    this.operator = $operator;
    this.hasGroupOperator = this.operator.length > 0;
    this.draggableRows = $table.find('.draggable');
    this.addGroupButton = $('#views-add-group');
    this.removeGroupButtons = $table.find('.views-remove-group');
    this.insertAddRemoveFilterGroupLinks();

    if (this.hasGroupOperator) {
      this.dropdowns = this.duplicateGroupsOperator();
      this.syncGroupsOperators();
    }

    this.modifyTableDrag();
    this.redrawOperatorLabels();
    $(once('views-rearrange-filter-handler', $table.find('.views-group-title select'))).on('change.views-rearrange-filter-handler', $.proxy(this, 'redrawOperatorLabels'));
    $(once('views-rearrange-filter-handler', $table.find('a.views-groups-remove-link'))).on('click.views-rearrange-filter-handler', $.proxy(this, 'updateRowspans')).on('click.views-rearrange-filter-handler', $.proxy(this, 'redrawOperatorLabels'));
  };

  $.extend(Drupal.viewsUi.RearrangeFilterHandler.prototype, {
    insertAddRemoveFilterGroupLinks: function insertAddRemoveFilterGroupLinks() {
      $(once('views-rearrange-filter-handler', $("<ul class=\"action-links\"><li><a id=\"views-add-group-link\" href=\"#\">".concat(this.addGroupButton[0].value, "</a></li></ul>")).prependTo(this.table.parent()))).find('#views-add-group-link').on('click.views-rearrange-filter-handler', $.proxy(this, 'clickAddGroupButton'));
      var length = this.removeGroupButtons.length;
      var i;

      for (i = 0; i < length; i++) {
        var $removeGroupButton = $(this.removeGroupButtons[i]);
        var buttonId = $removeGroupButton.attr('id');
        $(once('views-rearrange-filter-handler', $("<a href=\"#\" class=\"views-remove-group-link\">".concat(Drupal.t('Remove group'), "</a>")).insertBefore($removeGroupButton))).on('click.views-rearrange-filter-handler', {
          buttonId: buttonId
        }, $.proxy(this, 'clickRemoveGroupButton'));
      }
    },
    clickAddGroupButton: function clickAddGroupButton(event) {
      this.addGroupButton.trigger('mousedown');
      event.preventDefault();
    },
    clickRemoveGroupButton: function clickRemoveGroupButton(event) {
      this.table.find("#".concat(event.data.buttonId)).trigger('mousedown');
      event.preventDefault();
    },
    duplicateGroupsOperator: function duplicateGroupsOperator() {
      var newRow;
      var titleRow;
      var titleRows = once('duplicateGroupsOperator', 'tr.views-group-title');

      if (!titleRows.length) {
        return this.operator;
      }

      this.operator.find('label').add('div.description').addClass('visually-hidden');
      this.operator.find('select').addClass('form-select');
      var dropdowns = this.operator;
      titleRow = $('tr#views-group-title-2');
      newRow = $('<tr class="filter-group-operator-row"><td colspan="5"></td></tr>');
      newRow.find('td').append(this.operator);
      newRow.insertBefore(titleRow);
      var length = titleRows.length;

      for (var i = 2; i < length; i++) {
        titleRow = $(titleRows[i]);
        var fakeOperator = this.operator.clone();
        fakeOperator.attr('id', '');
        newRow = $('<tr class="filter-group-operator-row"><td colspan="5"></td></tr>');
        newRow.find('td').append(fakeOperator);
        newRow.insertBefore(titleRow);
        dropdowns.add(fakeOperator);
      }

      return dropdowns;
    },
    syncGroupsOperators: function syncGroupsOperators() {
      if (this.dropdowns.length < 2) {
        return;
      }

      this.dropdowns.on('change', $.proxy(this, 'operatorChangeHandler'));
    },
    operatorChangeHandler: function operatorChangeHandler(event) {
      var $target = $(event.target);
      var operators = this.dropdowns.find('select').not($target);
      operators.each(function (index, item) {
        item.value = $target[0].value;
      });
    },
    modifyTableDrag: function modifyTableDrag() {
      var tableDrag = Drupal.tableDrag['views-rearrange-filters'];
      var filterHandler = this;

      tableDrag.row.prototype.onSwap = function () {
        if (filterHandler.hasGroupOperator) {
          var thisRow = $(this.group);
          var previousRow = thisRow.prev('tr');

          if (previousRow.length && !previousRow.hasClass('group-message') && !previousRow.hasClass('draggable')) {
            var next = thisRow.next();

            if (next.is('tr')) {
              this.swap('after', next);
            }
          }

          filterHandler.updateRowspans();
        }

        filterHandler.redrawOperatorLabels();
      };

      tableDrag.onDrop = function () {
        var changeMarker = $(this.oldRowElement).find('.tabledrag-changed');

        if (changeMarker.length) {
          var operatorLabel = changeMarker.prevAll('.views-operator-label');

          if (operatorLabel.length) {
            operatorLabel.insertAfter(changeMarker);
          }
        }

        var groupRow = $(this.rowObject.element).prevAll('tr.group-message').get(0);
        var groupName = groupRow.className.replace(/([^ ]+[ ]+)*group-([^ ]+)-message([ ]+[^ ]+)*/, '$2');
        var groupField = $('select.views-group-select', this.rowObject.element);

        if (!groupField.is(".views-group-select-".concat(groupName))) {
          var oldGroupName = groupField.attr('class').replace(/([^ ]+[ ]+)*views-group-select-([^ ]+)([ ]+[^ ]+)*/, '$2');
          groupField.removeClass("views-group-select-".concat(oldGroupName)).addClass("views-group-select-".concat(groupName));
          groupField[0].value = groupName;
        }
      };
    },
    redrawOperatorLabels: function redrawOperatorLabels() {
      for (var i = 0; i < this.draggableRows.length; i++) {
        var $draggableRow = $(this.draggableRows[i]);
        var $firstCell = $draggableRow.find('td').eq(0);

        if ($firstCell.length) {
          var operatorValue = $draggableRow.prevAll('.views-group-title').find('option:selected').html();
          var operatorLabel = "<span class=\"views-operator-label\">".concat(operatorValue, "</span>");
          var $nextRow = $draggableRow.nextAll(':visible').eq(0);
          var $existingOperatorLabel = $firstCell.find('.views-operator-label');

          if ($nextRow.hasClass('draggable')) {
            if ($existingOperatorLabel.length) {
              $existingOperatorLabel.replaceWith(operatorLabel);
            } else {
              $firstCell.append(operatorLabel);
            }
          } else {
            $existingOperatorLabel.remove();
          }
        }
      }
    },
    updateRowspans: function updateRowspans() {
      var $row;
      var $currentEmptyRow;
      var draggableCount;
      var $operatorCell;
      var rows = $(this.table).find('tr');
      var length = rows.length;

      for (var i = 0; i < length; i++) {
        $row = $(rows[i]);

        if ($row.hasClass('views-group-title')) {
          $operatorCell = $row.find('td.group-operator');
          draggableCount = 0;
          $currentEmptyRow = $row.next('tr');
          $currentEmptyRow.removeClass('group-populated').addClass('group-empty');
          $operatorCell.attr('rowspan', 2);
        } else if ($row.hasClass('draggable') && $row.is(':visible')) {
          draggableCount++;
          $currentEmptyRow.removeClass('group-empty').addClass('group-populated');
          $operatorCell.attr('rowspan', draggableCount + 1);
        }
      }
    }
  });
  Drupal.behaviors.viewsFilterConfigSelectAll = {
    attach: function attach(context) {
      var selectAll = once('filterConfigSelectAll', '.js-form-item-options-value-all', context);

      if (selectAll.length) {
        var $selectAll = $(selectAll);
        var $selectAllCheckbox = $selectAll.find('input[type=checkbox]');
        var $checkboxes = $selectAll.closest('.form-checkboxes').find('.js-form-type-checkbox:not(.js-form-item-options-value-all) input[type="checkbox"]');
        $selectAll.show();
        $selectAllCheckbox.on('click', function () {
          $checkboxes.prop('checked', $(this).is(':checked'));
        });
        $checkboxes.on('click', function () {
          if ($(this).is('checked') === false) {
            $selectAllCheckbox.prop('checked', false);
          }
        });
      }
    }
  };
  Drupal.behaviors.viewsRemoveIconClass = {
    attach: function attach(context) {
      $(once('dropbutton-icon', '.dropbutton', context)).find('.icon').removeClass('icon');
    }
  };
  Drupal.behaviors.viewsUiCheckboxify = {
    attach: function attach(context, settings) {
      var buttons = once('views-ui-checkboxify', '[data-drupal-selector="edit-options-expose-button-button"], [data-drupal-selector="edit-options-group-button-button"]').forEach(function (button) {
        return new Drupal.viewsUi.Checkboxifier(button);
      });
    }
  };
  Drupal.behaviors.viewsUiChangeDefaultWidget = {
    attach: function attach(context) {
      var $context = $(context);

      function changeDefaultWidget(event) {
        if ($(event.target).prop('checked')) {
          $context.find('input.default-radios').parent().hide();
          $context.find('td.any-default-radios-row').parent().hide();
          $context.find('input.default-checkboxes').parent().show();
        } else {
          $context.find('input.default-checkboxes').parent().hide();
          $context.find('td.any-default-radios-row').parent().show();
          $context.find('input.default-radios').parent().show();
        }
      }

      $context.find('input[name="options[group_info][multiple]"]').on('change', changeDefaultWidget).trigger('change');
    }
  };

  Drupal.viewsUi.Checkboxifier = function (button) {
    this.$button = $(button);
    this.$parent = this.$button.parent('div.views-expose, div.views-grouped');
    this.$input = this.$parent.find('input:checkbox, input:radio');
    this.$button.hide();
    this.$parent.find('.exposed-description, .grouped-description').hide();
    this.$input.on('click', $.proxy(this, 'clickHandler'));
  };

  Drupal.viewsUi.Checkboxifier.prototype.clickHandler = function (e) {
    this.$button.trigger('click').trigger('submit');
  };

  Drupal.behaviors.viewsUiOverrideSelect = {
    attach: function attach(context) {
      once('views-ui-override-button-text', '[data-drupal-selector="edit-override-dropdown"]', context).forEach(function (dropdown) {
        var $context = $(context);
        var submit = context.querySelector('[id^=edit-submit]');
        var oldValue = submit ? submit.value : '';
        $(once('views-ui-override-button-text', submit)).on('mouseup', function () {
          this.value = oldValue;
          return true;
        });
        $(dropdown).on('change', function () {
          if (!submit) {
            return;
          }

          if (this.value === 'default') {
            submit.value = Drupal.t('Apply (all displays)');
          } else if (this.value === 'default_revert') {
            submit.value = Drupal.t('Revert to default');
          } else {
            submit.value = Drupal.t('Apply (this display)');
          }

          var $dialog = $context.closest('.ui-dialog-content');
          $dialog.trigger('dialogButtonsChange');
        }).trigger('change');
      });
    }
  };
  Drupal.behaviors.viewsUiHandlerRemoveLink = {
    attach: function attach(context) {
      var $context = $(context);
      $(once('views', 'a.views-remove-link', context)).on('click', function (event) {
        var id = $(this).attr('id').replace('views-remove-link-', '');
        $context.find("#views-row-".concat(id)).hide();
        $context.find("#views-removed-".concat(id)).prop('checked', true);
        event.preventDefault();
      });
      $(once('display', 'a.display-remove-link', context)).on('click', function (event) {
        var id = $(this).attr('id').replace('display-remove-link-', '');
        $context.find("#display-row-".concat(id)).hide();
        $context.find("#display-removed-".concat(id)).prop('checked', true);
        event.preventDefault();
      });
    }
  };
  Drupal.behaviors.viewsUiRearrangeFilter = {
    attach: function attach(context) {
      if (typeof Drupal.tableDrag === 'undefined' || typeof Drupal.tableDrag['views-rearrange-filters'] === 'undefined') {
        return;
      }

      var table = once('views-rearrange-filters', '#views-rearrange-filters', context);
      var operator = once('views-rearrange-filters', '.js-form-item-filter-groups-operator', context);

      if (table.length) {
        new Drupal.viewsUi.RearrangeFilterHandler($(table), $(operator));
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  function DetailsSummarizedContent(node) {
    this.$node = $(node);
    this.setupSummary();
  }

  $.extend(DetailsSummarizedContent, {
    instances: []
  });
  $.extend(DetailsSummarizedContent.prototype, {
    setupSummary: function setupSummary() {
      this.$detailsSummarizedContentWrapper = $(Drupal.theme('detailsSummarizedContentWrapper'));
      this.$node.on('summaryUpdated', $.proxy(this.onSummaryUpdated, this)).trigger('summaryUpdated').find('> summary').append(this.$detailsSummarizedContentWrapper);
    },
    onSummaryUpdated: function onSummaryUpdated() {
      var text = this.$node.drupalGetSummary();
      this.$detailsSummarizedContentWrapper.html(Drupal.theme('detailsSummarizedContentText', text));
    }
  });
  Drupal.behaviors.detailsSummary = {
    attach: function attach(context) {
      DetailsSummarizedContent.instances = DetailsSummarizedContent.instances.concat(once('details', 'details', context).map(function (details) {
        return new DetailsSummarizedContent(details);
      }));
    }
  };
  Drupal.DetailsSummarizedContent = DetailsSummarizedContent;

  Drupal.theme.detailsSummarizedContentWrapper = function () {
    return "<span class=\"summary\"></span>";
  };

  Drupal.theme.detailsSummarizedContentText = function (text) {
    return text ? " (".concat(text, ")") : '';
  };
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.detailsAria = {
    attach: function attach() {
      $(once('detailsAria', 'body')).on('click.detailsAria', 'summary', function (event) {
        var $summary = $(event.currentTarget);
        var open = $(event.currentTarget.parentNode).attr('open') === 'open' ? 'false' : 'true';
        $summary.attr({
          'aria-expanded': open,
          'aria-pressed': open
        });
      });
    }
  };
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Modernizr, Drupal) {
  function CollapsibleDetails(node) {
    this.$node = $(node);
    this.$node.data('details', this);
    var anchor = window.location.hash && window.location.hash !== '#' ? ", ".concat(window.location.hash) : '';

    if (this.$node.find(".error".concat(anchor)).length) {
      this.$node.attr('open', true);
    }

    this.setupSummaryPolyfill();
  }

  $.extend(CollapsibleDetails, {
    instances: []
  });
  $.extend(CollapsibleDetails.prototype, {
    setupSummaryPolyfill: function setupSummaryPolyfill() {
      var $summary = this.$node.find('> summary');
      $summary.attr('tabindex', '-1');
      $('<span class="details-summary-prefix visually-hidden"></span>').append(this.$node.attr('open') ? Drupal.t('Hide') : Drupal.t('Show')).prependTo($summary).after(document.createTextNode(' '));
      $('<a class="details-title"></a>').attr('href', "#".concat(this.$node.attr('id'))).prepend($summary.contents()).appendTo($summary);
      $summary.append(this.$summary).on('click', $.proxy(this.onSummaryClick, this));
    },
    onSummaryClick: function onSummaryClick(e) {
      this.toggle();
      e.preventDefault();
    },
    toggle: function toggle() {
      var _this = this;

      var isOpen = !!this.$node.attr('open');
      var $summaryPrefix = this.$node.find('> summary span.details-summary-prefix');

      if (isOpen) {
        $summaryPrefix.html(Drupal.t('Show'));
      } else {
        $summaryPrefix.html(Drupal.t('Hide'));
      }

      setTimeout(function () {
        _this.$node.attr('open', !isOpen);
      }, 0);
    }
  });
  Drupal.behaviors.collapse = {
    attach: function attach(context) {
      if (Modernizr.details) {
        return;
      }

      once('collapse', 'details', context).forEach(function (detail) {
        detail.classList.add('collapse-processed');
        CollapsibleDetails.instances.push(new CollapsibleDetails(detail));
      });
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e, $target) {
    $target.parents('details').not('[open]').find('> summary').trigger('click');
  };

  $('body').on('formFragmentLinkClickOrHashChange.details', handleFragmentLinkClickOrHashChange);
  Drupal.CollapsibleDetails = CollapsibleDetails;
})(jQuery, Modernizr, Drupal);;
/**
 * @file
 * Provides an event handler for hidden elements in dropdown menus.
 */

(function ($, Drupal, Bootstrap) {
  'use strict';

  /**
   * The list of supported events to proxy.
   *
   * @type {Array}
   */
  var events = [
    // MouseEvent.
    'click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mouseup', 'mouseover', 'mousemove', 'mouseout',

    // KeyboardEvent.
    'keypress', 'keydown', 'keyup'
  ];

  /**
   * Bootstrap dropdown behaviors.
   *
   * Proxy any dropdown element events that should actually be fired on the
   * original target (e.g. button, submits, etc.). This allows any registered
   * event callbacks to be fired as they were intended (despite the fact that
   * the markup has been changed to work with Bootstrap).
   *
   * @see \Drupal\bootstrap\Plugin\Preprocess\BootstrapDropdown::preprocessLinks
   *
   * @type {Drupal~behavior#bootstrapDropdown}
   */
  Drupal.behaviors.bootstrapDropdown = {
    attach: function (context) {
      var elements = context.querySelectorAll('.dropdown [data-dropdown-target]');
      for (var k in elements) {
        if (!elements.hasOwnProperty(k)) {
          continue;
        }
        var element = elements[k];
        for (var i = 0, l = events.length; i < l; i++) {
          var event = events[i];
          element.removeEventListener(event, this.proxyEvent);
          element.addEventListener(event, this.proxyEvent);
        }
      }
    },

    /**
     * Proxy event handler for bootstrap dropdowns.
     *
     * @param {Event} e
     *   The event object.
     */
    proxyEvent: function (e) {
      // Ignore tabbing.
      if (e.type.match(/^key/) && (e.which === 9 || e.keyCode === 9)) {
        return;
      }
      var target = e.currentTarget.dataset && e.currentTarget.dataset.dropdownTarget || e.currentTarget.getAttribute('data-dropdown-target');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        var element = target && target !== '#' && document.querySelectorAll(target)[0];
        if (element) {
          Bootstrap.simulate(element, e.type, e);
        }
        else if (Bootstrap.settings.dev && window.console && !e.type.match(/^mouse/)) {
          window.console.debug('[Drupal Bootstrap] Could not find a the target:', target);
        }
      }
    }
  }

})(jQuery, Drupal, Drupal.bootstrap);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, debounce) {
  var liveElement;
  var announcements = [];
  Drupal.behaviors.drupalAnnounce = {
    attach: function attach(context) {
      if (!liveElement) {
        liveElement = document.createElement('div');
        liveElement.id = 'drupal-live-announce';
        liveElement.className = 'visually-hidden';
        liveElement.setAttribute('aria-live', 'polite');
        liveElement.setAttribute('aria-busy', 'false');
        document.body.appendChild(liveElement);
      }
    }
  };

  function announce() {
    var text = [];
    var priority = 'polite';
    var announcement;
    var il = announcements.length;

    for (var i = 0; i < il; i++) {
      announcement = announcements.pop();
      text.unshift(announcement.text);

      if (announcement.priority === 'assertive') {
        priority = 'assertive';
      }
    }

    if (text.length) {
      liveElement.innerHTML = '';
      liveElement.setAttribute('aria-busy', 'true');
      liveElement.setAttribute('aria-live', priority);
      liveElement.innerHTML = text.join('\n');
      liveElement.setAttribute('aria-busy', 'false');
    }
  }

  Drupal.announce = function (text, priority) {
    announcements.push({
      text: text,
      priority: priority
    });
    return debounce(announce, 200)();
  };
})(Drupal, Drupal.debounce);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var activeItem = Drupal.url(drupalSettings.path.currentPath);

  $.fn.drupalToolbarMenu = function () {
    var ui = {
      handleOpen: Drupal.t('Extend'),
      handleClose: Drupal.t('Collapse')
    };

    function toggleList($item, switcher) {
      var $toggle = $item.children('.toolbar-box').children('.toolbar-handle');
      switcher = typeof switcher !== 'undefined' ? switcher : !$item.hasClass('open');
      $item.toggleClass('open', switcher);
      $toggle.toggleClass('open', switcher);
      $toggle.find('.action').each(function (index, element) {
        element.textContent = switcher ? ui.handleClose : ui.handleOpen;
      });
    }

    function toggleClickHandler(event) {
      var $toggle = $(event.target);
      var $item = $toggle.closest('li');
      toggleList($item);
      var $openItems = $item.siblings().filter('.open');
      toggleList($openItems, false);
    }

    function linkClickHandler(event) {
      if (!Drupal.toolbar.models.toolbarModel.get('isFixed')) {
        Drupal.toolbar.models.toolbarModel.set('activeTab', null);
      }

      event.stopPropagation();
    }

    function initItems($menu) {
      var options = {
        class: 'toolbar-icon toolbar-handle',
        action: ui.handleOpen,
        text: ''
      };
      $menu.find('li > a').wrap('<div class="toolbar-box">');
      $menu.find('li').each(function (index, element) {
        var $item = $(element);

        if ($item.children('ul.toolbar-menu').length) {
          var $box = $item.children('.toolbar-box');
          var $link = $box.find('a');
          options.text = Drupal.t('@label', {
            '@label': $link.length ? $link[0].textContent : ''
          });
          $item.children('.toolbar-box').append(Drupal.theme('toolbarMenuItemToggle', options));
        }
      });
    }

    function markListLevels($lists, level) {
      level = !level ? 1 : level;
      var $lis = $lists.children('li').addClass("level-".concat(level));
      $lists = $lis.children('ul');

      if ($lists.length) {
        markListLevels($lists, level + 1);
      }
    }

    function openActiveItem($menu) {
      var pathItem = $menu.find("a[href=\"".concat(window.location.pathname, "\"]"));

      if (pathItem.length && !activeItem) {
        activeItem = window.location.pathname;
      }

      if (activeItem) {
        var $activeItem = $menu.find("a[href=\"".concat(activeItem, "\"]")).addClass('menu-item--active');
        var $activeTrail = $activeItem.parentsUntil('.root', 'li').addClass('menu-item--active-trail');
        toggleList($activeTrail, true);
      }
    }

    return this.each(function (selector) {
      var menu = once('toolbar-menu', this);

      if (menu.length) {
        var $menu = $(menu);
        $menu.on('click.toolbar', '.toolbar-box', toggleClickHandler).on('click.toolbar', '.toolbar-box a', linkClickHandler);
        $menu.addClass('root');
        initItems($menu);
        markListLevels($menu);
        openActiveItem($menu);
      }
    });
  };

  Drupal.theme.toolbarMenuItemToggle = function (options) {
    return "<button class=\"".concat(options.class, "\"><span class=\"action\">").concat(options.action, "</span> <span class=\"label\">").concat(options.text, "</span></button>");
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var options = $.extend({
    breakpoints: {
      'toolbar.narrow': '',
      'toolbar.standard': '',
      'toolbar.wide': ''
    }
  }, drupalSettings.toolbar, {
    strings: {
      horizontal: Drupal.t('Horizontal orientation'),
      vertical: Drupal.t('Vertical orientation')
    }
  });
  Drupal.behaviors.toolbar = {
    attach: function attach(context) {
      if (!window.matchMedia('only screen').matches) {
        return;
      }

      once('toolbar', '#toolbar-administration', context).forEach(function (toolbar) {
        var model = new Drupal.toolbar.ToolbarModel({
          locked: JSON.parse(localStorage.getItem('Drupal.toolbar.trayVerticalLocked')),
          activeTab: document.getElementById(JSON.parse(localStorage.getItem('Drupal.toolbar.activeTabID'))),
          height: $('#toolbar-administration').outerHeight()
        });
        Drupal.toolbar.models.toolbarModel = model;
        Object.keys(options.breakpoints).forEach(function (label) {
          var mq = options.breakpoints[label];
          var mql = window.matchMedia(mq);
          Drupal.toolbar.mql[label] = mql;
          mql.addListener(Drupal.toolbar.mediaQueryChangeHandler.bind(null, model, label));
          Drupal.toolbar.mediaQueryChangeHandler.call(null, model, label, mql);
        });
        Drupal.toolbar.views.toolbarVisualView = new Drupal.toolbar.ToolbarVisualView({
          el: toolbar,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.toolbarAuralView = new Drupal.toolbar.ToolbarAuralView({
          el: toolbar,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.bodyVisualView = new Drupal.toolbar.BodyVisualView({
          el: toolbar,
          model: model
        });
        model.trigger('change:isFixed', model, model.get('isFixed'));
        model.trigger('change:activeTray', model, model.get('activeTray'));
        var menuModel = new Drupal.toolbar.MenuModel();
        Drupal.toolbar.models.menuModel = menuModel;
        Drupal.toolbar.views.menuVisualView = new Drupal.toolbar.MenuVisualView({
          el: $(toolbar).find('.toolbar-menu-administration').get(0),
          model: menuModel,
          strings: options.strings
        });
        Drupal.toolbar.setSubtrees.done(function (subtrees) {
          menuModel.set('subtrees', subtrees);
          var theme = drupalSettings.ajaxPageState.theme;
          localStorage.setItem("Drupal.toolbar.subtrees.".concat(theme), JSON.stringify(subtrees));
          model.set('areSubtreesLoaded', true);
        });
        Drupal.toolbar.views.toolbarVisualView.loadSubtrees();
        $(document).on('drupalViewportOffsetChange.toolbar', function (event, offsets) {
          model.set('offsets', offsets);
        });
        model.on('change:orientation', function (model, orientation) {
          $(document).trigger('drupalToolbarOrientationChange', orientation);
        }).on('change:activeTab', function (model, tab) {
          $(document).trigger('drupalToolbarTabChange', tab);
        }).on('change:activeTray', function (model, tray) {
          $(document).trigger('drupalToolbarTrayChange', tray);
        });

        if (Drupal.toolbar.models.toolbarModel.get('orientation') === 'horizontal' && Drupal.toolbar.models.toolbarModel.get('activeTab') === null) {
          Drupal.toolbar.models.toolbarModel.set({
            activeTab: $('.toolbar-bar .toolbar-tab:not(.home-toolbar-tab) a').get(0)
          });
        }

        $(window).on({
          'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
            var $toolbar = $('#toolbar-bar');
            $toolbar.css('margin-top', '0');

            if (settings.drupalOffCanvasPosition === 'top') {
              var height = Drupal.offCanvas.getContainer($element).outerHeight();
              $toolbar.css('margin-top', "".concat(height, "px"));
              $element.on('dialogContentResize.off-canvas', function () {
                var newHeight = Drupal.offCanvas.getContainer($element).outerHeight();
                $toolbar.css('margin-top', "".concat(newHeight, "px"));
              });
            }
          },
          'dialog:beforeclose': function dialogBeforeclose() {
            $('#toolbar-bar').css('margin-top', '0');
          }
        });
      });
    }
  };
  Drupal.toolbar = {
    views: {},
    models: {},
    mql: {},
    setSubtrees: new $.Deferred(),
    mediaQueryChangeHandler: function mediaQueryChangeHandler(model, label, mql) {
      switch (label) {
        case 'toolbar.narrow':
          model.set({
            isOriented: mql.matches,
            isTrayToggleVisible: false
          });

          if (!mql.matches || !model.get('orientation')) {
            model.set({
              orientation: 'vertical'
            }, {
              validate: true
            });
          }

          break;

        case 'toolbar.standard':
          model.set({
            isFixed: mql.matches
          });
          break;

        case 'toolbar.wide':
          model.set({
            orientation: mql.matches && !model.get('locked') ? 'horizontal' : 'vertical'
          }, {
            validate: true
          });
          model.set({
            isTrayToggleVisible: mql.matches
          });
          break;

        default:
          break;
      }
    }
  };

  Drupal.theme.toolbarOrientationToggle = function () {
    return '<div class="toolbar-toggle-orientation"><div class="toolbar-lining">' + '<button class="toolbar-icon" type="button"></button>' + '</div></div>';
  };

  Drupal.AjaxCommands.prototype.setToolbarSubtrees = function (ajax, response, status) {
    Drupal.toolbar.setSubtrees.resolve(response.subtrees);
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.MenuModel = Backbone.Model.extend({
    defaults: {
      subtrees: {}
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarModel = Backbone.Model.extend({
    defaults: {
      activeTab: null,
      activeTray: null,
      isOriented: false,
      isFixed: false,
      areSubtreesLoaded: false,
      isViewportOverflowConstrained: false,
      orientation: 'horizontal',
      locked: false,
      isTrayToggleVisible: true,
      height: null,
      offsets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    validate: function validate(attributes, options) {
      if (attributes.orientation === 'horizontal' && this.get('locked') && !options.override) {
        return Drupal.t('The toolbar cannot be set to a horizontal orientation when it is locked.');
      }
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  Drupal.toolbar.BodyVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:activeTray ', this.render);
      this.listenTo(this.model, 'change:isFixed change:isViewportOverflowConstrained', this.isToolbarFixed);
    },
    isToolbarFixed: function isToolbarFixed() {
      var isViewportOverflowConstrained = this.model.get('isViewportOverflowConstrained');
      $('body').toggleClass('toolbar-fixed', isViewportOverflowConstrained || this.model.get('isFixed'));
    },
    render: function render() {
      $('body').toggleClass('toolbar-tray-open', !!this.model.get('activeTray'));
    }
  });
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Backbone, Drupal) {
  Drupal.toolbar.MenuVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:subtrees', this.render);
    },
    render: function render() {
      var _this = this;

      var subtrees = this.model.get('subtrees');
      Object.keys(subtrees || {}).forEach(function (id) {
        $(once('toolbar-subtrees', _this.$el.find("#toolbar-link-".concat(id)))).after(subtrees[id]);
      });

      if ('drupalToolbarMenu' in $.fn) {
        this.$el.children('.toolbar-menu').drupalToolbarMenu();
      }
    }
  });
})(jQuery, Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarAuralView = Backbone.View.extend({
    initialize: function initialize(options) {
      this.strings = options.strings;
      this.listenTo(this.model, 'change:orientation', this.onOrientationChange);
      this.listenTo(this.model, 'change:activeTray', this.onActiveTrayChange);
    },
    onOrientationChange: function onOrientationChange(model, orientation) {
      Drupal.announce(Drupal.t('Tray orientation changed to @orientation.', {
        '@orientation': orientation
      }));
    },
    onActiveTrayChange: function onActiveTrayChange(model, tray) {
      var relevantTray = tray === null ? model.previous('activeTray') : tray;

      if (!relevantTray) {
        return;
      }

      var action = tray === null ? Drupal.t('closed') : Drupal.t('opened');
      var trayNameElement = relevantTray.querySelector('.toolbar-tray-name');
      var text;

      if (trayNameElement !== null) {
        text = Drupal.t('Tray "@tray" @action.', {
          '@tray': trayNameElement.textContent,
          '@action': action
        });
      } else {
        text = Drupal.t('Tray @action.', {
          '@action': action
        });
      }

      Drupal.announce(text);
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, Backbone) {
  Drupal.toolbar.ToolbarVisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        'click .toolbar-bar .toolbar-tab .trigger': 'onTabClick',
        'click .toolbar-toggle-orientation button': 'onOrientationToggleClick',
        'touchend .toolbar-bar .toolbar-tab .trigger': touchEndToClick,
        'touchend .toolbar-toggle-orientation button': touchEndToClick
      };
    },
    initialize: function initialize(options) {
      this.strings = options.strings;
      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented change:isTrayToggleVisible', this.render);
      this.listenTo(this.model, 'change:mqMatches', this.onMediaQueryChange);
      this.listenTo(this.model, 'change:offsets', this.adjustPlacement);
      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented', this.updateToolbarHeight);
      this.$el.find('.toolbar-tray .toolbar-lining').has('.toolbar-menu').append(Drupal.theme('toolbarOrientationToggle'));
      this.model.trigger('change:activeTab');
    },
    updateToolbarHeight: function updateToolbarHeight() {
      var toolbarTabOuterHeight = $('#toolbar-bar').find('.toolbar-tab').outerHeight() || 0;
      var toolbarTrayHorizontalOuterHeight = $('.is-active.toolbar-tray-horizontal').outerHeight() || 0;
      this.model.set('height', toolbarTabOuterHeight + toolbarTrayHorizontalOuterHeight);
      $('body').css({
        'padding-top': this.model.get('height')
      });
      $('html').css({
        'scroll-padding-top': this.model.get('height')
      });
      this.triggerDisplace();
    },
    triggerDisplace: function triggerDisplace() {
      _.defer(function () {
        Drupal.displace(true);
      });
    },
    render: function render() {
      this.updateTabs();
      this.updateTrayOrientation();
      this.updateBarAttributes();
      $('body').removeClass('toolbar-loading');

      if (this.model.changed.orientation === 'vertical' || this.model.changed.activeTab) {
        this.loadSubtrees();
      }

      return this;
    },
    onTabClick: function onTabClick(event) {
      if (event.currentTarget.hasAttribute('data-toolbar-tray')) {
        var activeTab = this.model.get('activeTab');
        var clickedTab = event.currentTarget;
        this.model.set('activeTab', !activeTab || clickedTab !== activeTab ? clickedTab : null);
        event.preventDefault();
        event.stopPropagation();
      }
    },
    onOrientationToggleClick: function onOrientationToggleClick(event) {
      var orientation = this.model.get('orientation');
      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
      var locked = antiOrientation === 'vertical';

      if (locked) {
        localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
      } else {
        localStorage.removeItem('Drupal.toolbar.trayVerticalLocked');
      }

      this.model.set({
        locked: locked,
        orientation: antiOrientation
      }, {
        validate: true,
        override: true
      });
      event.preventDefault();
      event.stopPropagation();
    },
    updateTabs: function updateTabs() {
      var $tab = $(this.model.get('activeTab'));
      $(this.model.previous('activeTab')).removeClass('is-active').prop('aria-pressed', false);
      $(this.model.previous('activeTray')).removeClass('is-active');

      if ($tab.length > 0) {
        $tab.addClass('is-active').prop('aria-pressed', true);
        var name = $tab.attr('data-toolbar-tray');
        var id = $tab.get(0).id;

        if (id) {
          localStorage.setItem('Drupal.toolbar.activeTabID', JSON.stringify(id));
        }

        var $tray = this.$el.find("[data-toolbar-tray=\"".concat(name, "\"].toolbar-tray"));

        if ($tray.length) {
          $tray.addClass('is-active');
          this.model.set('activeTray', $tray.get(0));
        } else {
          this.model.set('activeTray', null);
        }
      } else {
        this.model.set('activeTray', null);
        localStorage.removeItem('Drupal.toolbar.activeTabID');
      }
    },
    updateBarAttributes: function updateBarAttributes() {
      var isOriented = this.model.get('isOriented');

      if (isOriented) {
        this.$el.find('.toolbar-bar').attr('data-offset-top', '');
      } else {
        this.$el.find('.toolbar-bar').removeAttr('data-offset-top');
      }

      this.$el.toggleClass('toolbar-oriented', isOriented);
    },
    updateTrayOrientation: function updateTrayOrientation() {
      var orientation = this.model.get('orientation');
      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
      $('body').toggleClass('toolbar-vertical', orientation === 'vertical').toggleClass('toolbar-horizontal', orientation === 'horizontal');
      var removeClass = antiOrientation === 'horizontal' ? 'toolbar-tray-horizontal' : 'toolbar-tray-vertical';
      var $trays = this.$el.find('.toolbar-tray').removeClass(removeClass).addClass("toolbar-tray-".concat(orientation));
      var iconClass = "toolbar-icon-toggle-".concat(orientation);
      var iconAntiClass = "toolbar-icon-toggle-".concat(antiOrientation);
      var $orientationToggle = this.$el.find('.toolbar-toggle-orientation').toggle(this.model.get('isTrayToggleVisible'));
      var $orientationToggleButton = $orientationToggle.find('button');
      $orientationToggleButton[0].value = antiOrientation;
      $orientationToggleButton.attr('title', this.strings[antiOrientation]).removeClass(iconClass).addClass(iconAntiClass);
      $orientationToggleButton[0].textContent = this.strings[antiOrientation];
      var dir = document.documentElement.dir;
      var edge = dir === 'rtl' ? 'right' : 'left';
      $trays.removeAttr('data-offset-left data-offset-right data-offset-top');
      $trays.filter('.toolbar-tray-vertical.is-active').attr("data-offset-".concat(edge), '');
      $trays.filter('.toolbar-tray-horizontal.is-active').attr('data-offset-top', '');
    },
    adjustPlacement: function adjustPlacement() {
      var $trays = this.$el.find('.toolbar-tray');

      if (!this.model.get('isOriented')) {
        $trays.removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');
      }
    },
    loadSubtrees: function loadSubtrees() {
      var $activeTab = $(this.model.get('activeTab'));
      var orientation = this.model.get('orientation');

      if (!this.model.get('areSubtreesLoaded') && typeof $activeTab.data('drupal-subtrees') !== 'undefined' && orientation === 'vertical') {
        var subtreesHash = drupalSettings.toolbar.subtreesHash;
        var theme = drupalSettings.ajaxPageState.theme;
        var endpoint = Drupal.url("toolbar/subtrees/".concat(subtreesHash));
        var cachedSubtreesHash = localStorage.getItem("Drupal.toolbar.subtreesHash.".concat(theme));
        var cachedSubtrees = JSON.parse(localStorage.getItem("Drupal.toolbar.subtrees.".concat(theme)));
        var isVertical = this.model.get('orientation') === 'vertical';

        if (isVertical && subtreesHash === cachedSubtreesHash && cachedSubtrees) {
          Drupal.toolbar.setSubtrees.resolve(cachedSubtrees);
        } else if (isVertical) {
          localStorage.removeItem("Drupal.toolbar.subtreesHash.".concat(theme));
          localStorage.removeItem("Drupal.toolbar.subtrees.".concat(theme));
          Drupal.ajax({
            url: endpoint
          }).execute();
          localStorage.setItem("Drupal.toolbar.subtreesHash.".concat(theme), subtreesHash);
        }
      }
    }
  });
})(jQuery, Drupal, drupalSettings, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function ($, Drupal, _ref) {
  var tabbable = _ref.tabbable,
      isTabbable = _ref.isTabbable;

  function TabbingManager() {
    this.stack = [];
  }

  function TabbingContext(options) {
    $.extend(this, {
      level: null,
      $tabbableElements: $(),
      $disabledElements: $(),
      released: false,
      active: false,
      trapFocus: false
    }, options);
  }

  $.extend(TabbingManager.prototype, {
    constrain: function constrain(elements) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$trapFocus = _ref2.trapFocus,
          trapFocus = _ref2$trapFocus === void 0 ? false : _ref2$trapFocus;

      var il = this.stack.length;

      for (var i = 0; i < il; i++) {
        this.stack[i].deactivate();
      }

      var tabbableElements = [];
      $(elements).each(function (index, rootElement) {
        tabbableElements = [].concat(_toConsumableArray(tabbableElements), _toConsumableArray(tabbable(rootElement)));

        if (isTabbable(rootElement)) {
          tabbableElements = [].concat(_toConsumableArray(tabbableElements), [rootElement]);
        }
      });
      var tabbingContext = new TabbingContext({
        level: this.stack.length,
        $tabbableElements: $(tabbableElements),
        trapFocus: trapFocus
      });
      this.stack.push(tabbingContext);
      tabbingContext.activate();
      $(document).trigger('drupalTabbingConstrained', tabbingContext);
      return tabbingContext;
    },
    release: function release() {
      var toActivate = this.stack.length - 1;

      while (toActivate >= 0 && this.stack[toActivate].released) {
        toActivate--;
      }

      this.stack.splice(toActivate + 1);

      if (toActivate >= 0) {
        this.stack[toActivate].activate();
      }
    },
    activate: function activate(tabbingContext) {
      var $set = tabbingContext.$tabbableElements;
      var level = tabbingContext.level;
      var $disabledSet = $(tabbable(document.body)).not($set);
      tabbingContext.$disabledElements = $disabledSet;
      var il = $disabledSet.length;

      for (var i = 0; i < il; i++) {
        this.recordTabindex($disabledSet.eq(i), level);
      }

      $disabledSet.prop('tabindex', -1).prop('autofocus', false);
      var $hasFocus = $set.filter('[autofocus]').eq(-1);

      if ($hasFocus.length === 0) {
        $hasFocus = $set.eq(0);
      }

      $hasFocus.trigger('focus');

      if ($set.length && tabbingContext.trapFocus) {
        $set.last().on('keydown.focus-trap', function (event) {
          if (event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            $set.first().focus();
          }
        });
        $set.first().on('keydown.focus-trap', function (event) {
          if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            $set.last().focus();
          }
        });
      }
    },
    deactivate: function deactivate(tabbingContext) {
      var $set = tabbingContext.$disabledElements;
      var level = tabbingContext.level;
      var il = $set.length;
      tabbingContext.$tabbableElements.first().off('keydown.focus-trap');
      tabbingContext.$tabbableElements.last().off('keydown.focus-trap');

      for (var i = 0; i < il; i++) {
        this.restoreTabindex($set.eq(i), level);
      }
    },
    recordTabindex: function recordTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices') || {};
      tabInfo[level] = {
        tabindex: $el[0].getAttribute('tabindex'),
        autofocus: $el[0].hasAttribute('autofocus')
      };
      $el.data('drupalOriginalTabIndices', tabInfo);
    },
    restoreTabindex: function restoreTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices');

      if (tabInfo && tabInfo[level]) {
        var data = tabInfo[level];

        if (data.tabindex) {
          $el[0].setAttribute('tabindex', data.tabindex);
        } else {
          $el[0].removeAttribute('tabindex');
        }

        if (data.autofocus) {
          $el[0].setAttribute('autofocus', 'autofocus');
        }

        if (level === 0) {
          $el.removeData('drupalOriginalTabIndices');
        } else {
          var levelToDelete = level;

          while (tabInfo.hasOwnProperty(levelToDelete)) {
            delete tabInfo[levelToDelete];
            levelToDelete++;
          }

          $el.data('drupalOriginalTabIndices', tabInfo);
        }
      }
    }
  });
  $.extend(TabbingContext.prototype, {
    release: function release() {
      if (!this.released) {
        this.deactivate();
        this.released = true;
        Drupal.tabbingManager.release(this);
        $(document).trigger('drupalTabbingContextReleased', this);
      }
    },
    activate: function activate() {
      if (!this.active && !this.released) {
        this.active = true;
        Drupal.tabbingManager.activate(this);
        $(document).trigger('drupalTabbingContextActivated', this);
      }
    },
    deactivate: function deactivate() {
      if (this.active) {
        this.active = false;
        Drupal.tabbingManager.deactivate(this);
        $(document).trigger('drupalTabbingContextDeactivated', this);
      }
    }
  });

  if (Drupal.tabbingManager) {
    return;
  }

  Drupal.tabbingManager = new TabbingManager();
})(jQuery, Drupal, window.tabbable);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  var strings = {
    tabbingReleased: Drupal.t('Tabbing is no longer constrained by the Contextual module.'),
    tabbingConstrained: Drupal.t('Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.'),
    pressEsc: Drupal.t('Press the esc key to exit.')
  };

  function initContextualToolbar(context) {
    if (!Drupal.contextual || !Drupal.contextual.collection) {
      return;
    }

    var contextualToolbar = Drupal.contextualToolbar;
    contextualToolbar.model = new contextualToolbar.StateModel({
      isViewing: localStorage.getItem('Drupal.contextualToolbar.isViewing') !== 'false'
    }, {
      contextualCollection: Drupal.contextual.collection
    });
    var viewOptions = {
      el: $('.toolbar .toolbar-bar .contextual-toolbar-tab'),
      model: contextualToolbar.model,
      strings: strings
    };
    new contextualToolbar.VisualView(viewOptions);
    new contextualToolbar.AuralView(viewOptions);
  }

  Drupal.behaviors.contextualToolbar = {
    attach: function attach(context) {
      if (once('contextualToolbar-init', 'body').length) {
        initContextualToolbar(context);
      }
    }
  };
  Drupal.contextualToolbar = {
    model: null
  };
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.StateModel = Backbone.Model.extend({
    defaults: {
      isViewing: true,
      isVisible: false,
      contextualCount: 0,
      tabbingContext: null
    },
    initialize: function initialize(attrs, options) {
      this.listenTo(options.contextualCollection, 'reset remove add', this.countContextualLinks);
      this.listenTo(options.contextualCollection, 'add', this.lockNewContextualLinks);
      this.listenTo(this, 'change:contextualCount', this.updateVisibility);
      this.listenTo(this, 'change:isViewing', function (model, isViewing) {
        options.contextualCollection.each(function (contextualModel) {
          contextualModel.set('isLocked', !isViewing);
        });
      });
    },
    countContextualLinks: function countContextualLinks(contextualModel, contextualCollection) {
      this.set('contextualCount', contextualCollection.length);
    },
    lockNewContextualLinks: function lockNewContextualLinks(contextualModel, contextualCollection) {
      if (!this.get('isViewing')) {
        contextualModel.set('isLocked', true);
      }
    },
    updateVisibility: function updateVisibility() {
      this.set('isVisible', this.get('contextualCount') > 0);
    }
  });
})(Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone, _) {
  Drupal.contextualToolbar.AuralView = Backbone.View.extend({
    announcedOnce: false,
    initialize: function initialize(options) {
      this.options = options;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.manageTabbing);
      $(document).on('keyup', _.bind(this.onKeypress, this));
      this.manageTabbing();
    },
    render: function render() {
      this.$el.find('button').attr('aria-pressed', !this.model.get('isViewing'));
      return this;
    },
    manageTabbing: function manageTabbing() {
      var tabbingContext = this.model.get('tabbingContext');

      if (tabbingContext) {
        if (tabbingContext.active) {
          Drupal.announce(this.options.strings.tabbingReleased);
        }

        tabbingContext.release();
      }

      if (!this.model.get('isViewing')) {
        tabbingContext = Drupal.tabbingManager.constrain($('.contextual-toolbar-tab, .contextual'));
        this.model.set('tabbingContext', tabbingContext);
        this.announceTabbingConstraint();
        this.announcedOnce = true;
      }
    },
    announceTabbingConstraint: function announceTabbingConstraint() {
      var strings = this.options.strings;
      Drupal.announce(Drupal.formatString(strings.tabbingConstrained, {
        '@contextualsCount': Drupal.formatPlural(Drupal.contextual.collection.length, '@count contextual link', '@count contextual links')
      }));
      Drupal.announce(strings.pressEsc);
    },
    onKeypress: function onKeypress(event) {
      if (!this.announcedOnce && event.keyCode === 9 && !this.model.get('isViewing')) {
        this.announceTabbingConstraint();
        this.announcedOnce = true;
      }

      if (event.keyCode === 27) {
        this.model.set('isViewing', true);
      }
    }
  });
})(jQuery, Drupal, Backbone, _);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.VisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        click: function click() {
          this.model.set('isViewing', !this.model.get('isViewing'));
        },
        touchend: touchEndToClick
      };
    },
    initialize: function initialize() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.persist);
    },
    render: function render() {
      this.$el.toggleClass('hidden', !this.model.get('isVisible'));
      this.$el.find('button').toggleClass('is-active', !this.model.get('isViewing'));
      return this;
    },
    persist: function persist(model, isViewing) {
      if (!isViewing) {
        localStorage.setItem('Drupal.contextualToolbar.isViewing', 'false');
      } else {
        localStorage.removeItem('Drupal.contextualToolbar.isViewing');
      }
    }
  });
})(Drupal, Backbone);;
(function ($, Drupal) {
  Drupal.behaviors.adminToolbar = {
    attach: function (context, settings) {

      $('a.toolbar-icon', context).removeAttr('title');

      // Make the toolbar menu navigable with keyboard.
      $('ul.toolbar-menu li.menu-item--expanded a', context).on('focusin', function () {
        $('li.menu-item--expanded', context).removeClass('hover-intent');
        $(this).parents('li.menu-item--expanded').addClass('hover-intent');
      });

      $('ul.toolbar-menu li.menu-item a', context).keydown(function (e) {
        if ((e.shiftKey && (e.keyCode || e.which) == 9)) {
          if ($(this).parent('.menu-item').prev().hasClass('menu-item--expanded')) {
            $(this).parent('.menu-item').prev().addClass('hover-intent');
          }
        }
      });

      $('.toolbar-menu:first-child > .menu-item:not(.menu-item--expanded) a, .toolbar-tab > a', context).on('focusin', function () {
        $('.menu-item--expanded').removeClass('hover-intent');
      });

      $('.toolbar-menu:first-child > .menu-item', context).on('hover', function () {
        $(this, 'a').css("background: #fff;");
      });

      $('ul:not(.toolbar-menu)', context).on({
        mousemove: function () {
          $('li.menu-item--expanded').removeClass('hover-intent');
        },
        hover: function () {
          $('li.menu-item--expanded').removeClass('hover-intent');
        }
      });

      // Always hide the dropdown menu on mobile.
      if ($('body:not(.toolbar-fixed) #toolbar-item-administration-tray').hasClass('toolbar-tray-vertical')) {
        $('#toolbar-item-administration').removeClass('is-active');
        $('#toolbar-item-administration-tray').removeClass('is-active');
      };

    }
  };
})(jQuery, Drupal);
;
;/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (jQuery && !jQuery.fn.hoverIntent) {
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  // default configuration values
  var _cfg = {
    interval: 100,
    sensitivity: 6,
    timeout: 0
  };

  // counter used to generate an ID for each instance
  var INSTANCE_COUNT = 0;

  // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
  var cX, cY;

  // saves the current pointer position coordinates based on the given mousemove event
  var track = function (ev) {
    cX = ev.pageX;
    cY = ev.pageY;
  };

  // compares current and previous mouse positions
  var compare = function (ev,$el,s,cfg) {
    // compare mouse positions to see if pointer has slowed enough to trigger `over` function
    if ( Math.sqrt( (s.pX - cX) * (s.pX - cX) + (s.pY - cY) * (s.pY - cY) ) < cfg.sensitivity ) {
      $el.off(s.event,track);
      delete s.timeoutId;
      // set hoverIntent state as active for this element (permits `out` handler to trigger)
      s.isActive = true;
      // overwrite old mouseenter event coordinates with most recent pointer position
      ev.pageX = cX; ev.pageY = cY;
      // clear coordinate data from state object
      delete s.pX; delete s.pY;
      return cfg.over.apply($el[0],[ev]);
    } else {
      // set previous coordinates for next comparison
      s.pX = cX; s.pY = cY;
      // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
      s.timeoutId = setTimeout( function () {compare(ev, $el, s, cfg);} , cfg.interval );
    }
  };

  // triggers given `out` function at configured `timeout` after a mouseleave and clears state
  var delay = function (ev,$el,s,out) {
    delete $el.data('hoverIntent')[s.id];
    return out.apply($el[0],[ev]);
  };

  $.fn.hoverIntent = function (handlerIn,handlerOut,selector) {
    // instance ID, used as a key to store and retrieve state information on an element
    var instanceId = INSTANCE_COUNT++;

    // extend the default configuration and parse parameters
    var cfg = $.extend({}, _cfg);
    if ( $.isPlainObject(handlerIn) ) {
      cfg = $.extend(cfg, handlerIn);
      if ( !$.isFunction(cfg.out) ) {
        cfg.out = cfg.over;
      }
    } else if ( $.isFunction(handlerOut) ) {
      cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
    } else {
      cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
    }

    // A private function for handling mouse 'hovering'
    var handleHover = function (e) {
      // cloned event to pass to handlers (copy required for event object to be passed in IE)
      var ev = $.extend({},e);

      // the current target of the mouse event, wrapped in a jQuery object
      var $el = $(this);

      // read hoverIntent data from element (or initialize if not present)
      var hoverIntentData = $el.data('hoverIntent');
      if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

      // read per-instance state from element (or initialize if not present)
      var state = hoverIntentData[instanceId];
      if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

      // state properties:
      // id = instance ID, used to clean up data
      // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
      // isActive = plugin state, true after `over` is called just until `out` is called
      // pX, pY = previously-measured pointer coordinates, updated at each polling interval
      // event = string representing the namespaced event used for mouse tracking

      // clear any existing timeout
      if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

      // namespaced event used to register and unregister mousemove tracking
      var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent' + instanceId;

      // handle the event, based on its type
      if (e.type === 'mouseenter') {
        // do nothing if already active
        if (state.isActive) { return; }
        // set "previous" X and Y position based on initial entry point
        state.pX = ev.pageX; state.pY = ev.pageY;
        // update "current" X and Y position based on mousemove
        $el.off(mousemove,track).on(mousemove,track);
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        state.timeoutId = setTimeout( function () {compare(ev,$el,state,cfg);} , cfg.interval );
      } else { // "mouseleave"
        // do nothing if not already active
        if (!state.isActive) { return; }
        // unbind expensive mousemove event
        $el.off(mousemove,track);
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        state.timeoutId = setTimeout( function () {delay(ev,$el,state,cfg.out);} , cfg.timeout );
      }
    };

    // listen for mouseenter and mouseleave
    return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
  };
});
;
(function ($) {
  $(document).ready(function () {
    $('.toolbar-tray-horizontal li.menu-item--expanded, .toolbar-tray-horizontal ul li.menu-item--expanded .menu-item').hoverIntent({
      over: function () {
        // At the current depth, we should delete all "hover-intent" classes.
        // Other wise we get unwanted behaviour where menu items are expanded while already in hovering other ones.
        $(this).parent().find('li').removeClass('hover-intent');
        $(this).addClass('hover-intent');
      },
      out: function () {
        $(this).removeClass('hover-intent');
      },
      timeout: 250
    });
  });
})(jQuery);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var pathInfo = drupalSettings.path;
  var escapeAdminPath = sessionStorage.getItem('escapeAdminPath');
  var windowLocation = window.location;

  if (!pathInfo.currentPathIsAdmin && !/destination=/.test(windowLocation.search)) {
    sessionStorage.setItem('escapeAdminPath', windowLocation);
  }

  Drupal.behaviors.escapeAdmin = {
    attach: function attach() {
      var toolbarEscape = once('escapeAdmin', '[data-toolbar-escape-admin]');

      if (toolbarEscape.length && pathInfo.currentPathIsAdmin) {
        if (escapeAdminPath !== null) {
          $(toolbarEscape).attr('href', escapeAdminPath);
        } else {
          toolbarEscape[0].textContent = Drupal.t('Home');
        }
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, drupalSettings) {
  function mapTextContentToAjaxResponse(content) {
    if (content === '') {
      return false;
    }

    try {
      return JSON.parse(content);
    } catch (e) {
      return false;
    }
  }

  function bigPipeProcessPlaceholderReplacement(placeholderReplacement) {
    var placeholderId = placeholderReplacement.getAttribute('data-big-pipe-replacement-for-placeholder-with-id');
    var content = placeholderReplacement.textContent.trim();

    if (typeof drupalSettings.bigPipePlaceholderIds[placeholderId] !== 'undefined') {
      var response = mapTextContentToAjaxResponse(content);

      if (response === false) {
        once.remove('big-pipe', placeholderReplacement);
      } else {
        var ajaxObject = Drupal.ajax({
          url: '',
          base: false,
          element: false,
          progress: false
        });
        ajaxObject.success(response, 'success');
      }
    }
  }

  var interval = drupalSettings.bigPipeInterval || 50;
  var timeoutID;

  function bigPipeProcessDocument(context) {
    if (!context.querySelector('script[data-big-pipe-event="start"]')) {
      return false;
    }

    once('big-pipe', 'script[data-big-pipe-replacement-for-placeholder-with-id]', context).forEach(bigPipeProcessPlaceholderReplacement);

    if (context.querySelector('script[data-big-pipe-event="stop"]')) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }

      return true;
    }

    return false;
  }

  function bigPipeProcess() {
    timeoutID = setTimeout(function () {
      if (!bigPipeProcessDocument(document)) {
        bigPipeProcess();
      }
    }, interval);
  }

  bigPipeProcess();
  window.addEventListener('load', function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    bigPipeProcessDocument(document);
  });
})(Drupal, drupalSettings);;
