/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (factory((global.bootstrap = {}),global.jQuery));
}(this, (function (exports,$) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.3
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var css = getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
  }

  function getWindowSizes() {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && parent.nodeName === 'HTML') {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    return isFixed(getParentNode(element));
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    boundaries.left += padding;
    boundaries.top += padding;
    boundaries.right -= padding;
    boundaries.bottom -= padding;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var styles = getComputedStyle(element);
    var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroy the popper
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger onUpdate callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    // Avoid blurry text by using full pixel integers.
    // For pixel-perfect positioning, top/bottom prefers rounded
    // values, while left/right prefers floored values.
    var offsets = {
      left: Math.floor(popper.left),
      top: Math.round(popper.top),
      bottom: Math.round(popper.bottom),
      right: Math.floor(popper.right)
    };

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      top = -offsetParentRect.height + offsets.bottom;
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      left = -offsetParentRect.width + offsets.right;
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjuction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-right` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unitless, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the height.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * An scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper this makes sure the popper has always a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier, can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near eachothers
     * without leaving any gap between the two. Expecially useful when the arrow is
     * enabled and you want to assure it to point to its reference element.
     * It cares only about the first axis, you can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjuction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations).
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position,
       * the popper will never be placed outside of the defined boundaries
       * (except if keepTogether is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define you own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the informations used by Popper.js
   * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overriden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass as 3rd argument an object with the same
   * structure of this object, example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Create a new Popper.js instance
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper.
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedule an update, it will run on the next UI update available
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYm9vdHN0cmFwLmJ1bmRsZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vanMvc3JjL3V0aWwuanMiLCIuLi8uLi9qcy9zcmMvYWxlcnQuanMiLCIuLi8uLi9qcy9zcmMvYnV0dG9uLmpzIiwiLi4vLi4vanMvc3JjL2Nhcm91c2VsLmpzIiwiLi4vLi4vanMvc3JjL2NvbGxhcHNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3BvcHBlci5qcy9kaXN0L2VzbS9wb3BwZXIuanMiLCIuLi8uLi9qcy9zcmMvZHJvcGRvd24uanMiLCIuLi8uLi9qcy9zcmMvbW9kYWwuanMiLCIuLi8uLi9qcy9zcmMvdG9vbHRpcC5qcyIsIi4uLy4uL2pzL3NyYy9wb3BvdmVyLmpzIiwiLi4vLi4vanMvc3JjL3Njcm9sbHNweS5qcyIsIi4uLy4uL2pzL3NyYy90YWIuanMiLCIuLi8uLi9qcy9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjEuMyk6IHV0aWwuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFV0aWwgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCdcbiAgY29uc3QgTUFYX1VJRCA9IDEwMDAwMDBcbiAgY29uc3QgTUlMTElTRUNPTkRTX01VTFRJUExJRVIgPSAxMDAwXG5cbiAgLy8gU2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuICBmdW5jdGlvbiB0b1R5cGUob2JqKSB7XG4gICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmluZFR5cGU6IFRSQU5TSVRJT05fRU5ELFxuICAgICAgZGVsZWdhdGVUeXBlOiBUUkFOU0lUSU9OX0VORCxcbiAgICAgIGhhbmRsZShldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZEVtdWxhdG9yKGR1cmF0aW9uKSB7XG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlXG5cbiAgICAkKHRoaXMpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoKSA9PiB7XG4gICAgICBjYWxsZWQgPSB0cnVlXG4gICAgfSlcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgVXRpbC50cmlnZ2VyVHJhbnNpdGlvbkVuZCh0aGlzKVxuICAgICAgfVxuICAgIH0sIGR1cmF0aW9uKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCkge1xuICAgICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uRW5kRW11bGF0b3JcbiAgICAkLmV2ZW50LnNwZWNpYWxbVXRpbC5UUkFOU0lUSU9OX0VORF0gPSBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KClcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQdWJsaWMgVXRpbCBBcGlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgVXRpbCA9IHtcblxuICAgIFRSQU5TSVRJT05fRU5EOiAnYnNUcmFuc2l0aW9uRW5kJyxcblxuICAgIGdldFVJRChwcmVmaXgpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKSAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgICAgcmV0dXJuIHByZWZpeFxuICAgIH0sXG5cbiAgICBnZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG4gICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnXG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbFxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgfSxcblxuICAgIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdHJhbnNpdGlvbi1kdXJhdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgbGV0IHRyYW5zaXRpb25EdXJhdGlvbiA9ICQoZWxlbWVudCkuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJylcbiAgICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pXG5cbiAgICAgIC8vIFJldHVybiAwIGlmIGVsZW1lbnQgb3IgdHJhbnNpdGlvbiBkdXJhdGlvbiBpcyBub3QgZm91bmRcbiAgICAgIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cblxuICAgICAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF1cblxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSXG4gICAgfSxcblxuICAgIHJlZmxvdyhlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICB9LFxuXG4gICAgdHJpZ2dlclRyYW5zaXRpb25FbmQoZWxlbWVudCkge1xuICAgICAgJChlbGVtZW50KS50cmlnZ2VyKFRSQU5TSVRJT05fRU5EKVxuICAgIH0sXG5cbiAgICAvLyBUT0RPOiBSZW1vdmUgaW4gdjVcbiAgICBzdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbihUUkFOU0lUSU9OX0VORClcbiAgICB9LFxuXG4gICAgaXNFbGVtZW50KG9iaikge1xuICAgICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZVxuICAgIH0sXG5cbiAgICB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZSwgY29uZmlnLCBjb25maWdUeXBlcykge1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBjb25maWdUeXBlcykge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZ1R5cGVzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldXG4gICAgICAgICAgY29uc3QgdmFsdWUgICAgICAgICA9IGNvbmZpZ1twcm9wZXJ0eV1cbiAgICAgICAgICBjb25zdCB2YWx1ZVR5cGUgICAgID0gdmFsdWUgJiYgVXRpbC5pc0VsZW1lbnQodmFsdWUpXG4gICAgICAgICAgICA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSlcblxuICAgICAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYCR7Y29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpfTogYCArXG4gICAgICAgICAgICAgIGBPcHRpb24gXCIke3Byb3BlcnR5fVwiIHByb3ZpZGVkIHR5cGUgXCIke3ZhbHVlVHlwZX1cIiBgICtcbiAgICAgICAgICAgICAgYGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKVxuXG4gIHJldHVybiBVdGlsXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogYWxlcnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IEFsZXJ0ID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgID0gJ2FsZXJ0J1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmFsZXJ0J1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgRElTTUlTUyA6ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBDTE9TRSAgICAgICAgICA6IGBjbG9zZSR7RVZFTlRfS0VZfWAsXG4gICAgQ0xPU0VEICAgICAgICAgOiBgY2xvc2VkJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBBTEVSVCA6ICdhbGVydCcsXG4gICAgRkFERSAgOiAnZmFkZScsXG4gICAgU0hPVyAgOiAnc2hvdydcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgQWxlcnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIGNsb3NlKGVsZW1lbnQpIHtcbiAgICAgIGxldCByb290RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudClcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VzdG9tRXZlbnQgPSB0aGlzLl90cmlnZ2VyQ2xvc2VFdmVudChyb290RWxlbWVudClcblxuICAgICAgaWYgKGN1c3RvbUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHJvb3RFbGVtZW50KVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuICAgICAgbGV0IHBhcmVudCAgICAgPSBmYWxzZVxuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50ID0gJChlbGVtZW50KS5jbG9zZXN0KGAuJHtDbGFzc05hbWUuQUxFUlR9YClbMF1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmVudFxuICAgIH1cblxuICAgIF90cmlnZ2VyQ2xvc2VFdmVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBjbG9zZUV2ZW50ID0gJC5FdmVudChFdmVudC5DTE9TRSlcblxuICAgICAgJChlbGVtZW50KS50cmlnZ2VyKGNsb3NlRXZlbnQpXG4gICAgICByZXR1cm4gY2xvc2VFdmVudFxuICAgIH1cblxuICAgIF9yZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGlmICghJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQoZWxlbWVudClcblxuICAgICAgJChlbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCwgZXZlbnQpKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIF9kZXN0cm95RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAkKGVsZW1lbnQpXG4gICAgICAgIC5kZXRhY2goKVxuICAgICAgICAudHJpZ2dlcihFdmVudC5DTE9TRUQpXG4gICAgICAgIC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKHRoaXMpXG4gICAgICAgIGxldCBkYXRhICAgICAgID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IEFsZXJ0KHRoaXMpXG4gICAgICAgICAgJGVsZW1lbnQuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcgPT09ICdjbG9zZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10odGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2hhbmRsZURpc21pc3MoYWxlcnRJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH1cblxuICAgICAgICBhbGVydEluc3RhbmNlLmNsb3NlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oXG4gICAgRXZlbnQuQ0xJQ0tfREFUQV9BUEksXG4gICAgU2VsZWN0b3IuRElTTUlTUyxcbiAgICBBbGVydC5faGFuZGxlRGlzbWlzcyhuZXcgQWxlcnQoKSlcbiAgKVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gQWxlcnQuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQWxlcnRcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBBbGVydFxufSkoJClcblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBidXR0b24uanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IEJ1dHRvbiA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdidXR0b24nXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgPSAnYnMuYnV0dG9uJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIEFDVElWRSA6ICdhY3RpdmUnLFxuICAgIEJVVFRPTiA6ICdidG4nLFxuICAgIEZPQ1VTICA6ICdmb2N1cydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIERBVEFfVE9HR0xFX0NBUlJPVCA6ICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJyxcbiAgICBEQVRBX1RPR0dMRSAgICAgICAgOiAnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScsXG4gICAgSU5QVVQgICAgICAgICAgICAgIDogJ2lucHV0JyxcbiAgICBBQ1RJVkUgICAgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gICAgQlVUVE9OICAgICAgICAgICAgIDogJy5idG4nXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBDTElDS19EQVRBX0FQSSAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBGT0NVU19CTFVSX0RBVEFfQVBJIDogYGZvY3VzJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBibHVyJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBCdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgIGxldCB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSB0cnVlXG4gICAgICBsZXQgYWRkQXJpYVByZXNzZWQgPSB0cnVlXG4gICAgICBjb25zdCByb290RWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuY2xvc2VzdChcbiAgICAgICAgU2VsZWN0b3IuREFUQV9UT0dHTEVcbiAgICAgIClbMF1cblxuICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLklOUFVUKVxuXG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgIGlmIChpbnB1dC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuY2hlY2tlZCAmJlxuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFKVxuXG4gICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fFxuICAgICAgICAgICAgICByb290RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHxcbiAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpIHx8XG4gICAgICAgICAgICAgIHJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSAhdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgICAgICQoaW5wdXQpLnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgICAgICAgIGFkZEFyaWFQcmVzc2VkID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRkQXJpYVByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsXG4gICAgICAgICAgIXRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5BQ1RJVkUpKVxuICAgICAgfVxuXG4gICAgICBpZiAodHJpZ2dlckNoYW5nZUV2ZW50KSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQnV0dG9uKHRoaXMpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ3RvZ2dsZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRV9DQVJST1QsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBsZXQgYnV0dG9uID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgIGlmICghJChidXR0b24pLmhhc0NsYXNzKENsYXNzTmFtZS5CVVRUT04pKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQoYnV0dG9uKS5jbG9zZXN0KFNlbGVjdG9yLkJVVFRPTilcbiAgICAgIH1cblxuICAgICAgQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKGJ1dHRvbiksICd0b2dnbGUnKVxuICAgIH0pXG4gICAgLm9uKEV2ZW50LkZPQ1VTX0JMVVJfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFX0NBUlJPVCwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBidXR0b24gPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChTZWxlY3Rvci5CVVRUT04pWzBdXG4gICAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkZPQ1VTLCAvXmZvY3VzKGluKT8kLy50ZXN0KGV2ZW50LnR5cGUpKVxuICAgIH0pXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBCdXR0b24uX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQnV0dG9uXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gQnV0dG9uXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBjYXJvdXNlbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgQ2Fyb3VzZWwgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgPSAnY2Fyb3VzZWwnXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgICAgPSAnYnMuY2Fyb3VzZWwnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICAgICA9ICQuZm5bTkFNRV1cbiAgY29uc3QgQVJST1dfTEVGVF9LRVlDT0RFICAgICA9IDM3IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIGxlZnQgYXJyb3cga2V5XG4gIGNvbnN0IEFSUk9XX1JJR0hUX0tFWUNPREUgICAgPSAzOSAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciByaWdodCBhcnJvdyBrZXlcbiAgY29uc3QgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCA9IDUwMCAvLyBUaW1lIGZvciBtb3VzZSBjb21wYXQgZXZlbnRzIHRvIGZpcmUgYWZ0ZXIgdG91Y2hcblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIGludGVydmFsIDogNTAwMCxcbiAgICBrZXlib2FyZCA6IHRydWUsXG4gICAgc2xpZGUgICAgOiBmYWxzZSxcbiAgICBwYXVzZSAgICA6ICdob3ZlcicsXG4gICAgd3JhcCAgICAgOiB0cnVlXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBpbnRlcnZhbCA6ICcobnVtYmVyfGJvb2xlYW4pJyxcbiAgICBrZXlib2FyZCA6ICdib29sZWFuJyxcbiAgICBzbGlkZSAgICA6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICBwYXVzZSAgICA6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgICB3cmFwICAgICA6ICdib29sZWFuJ1xuICB9XG5cbiAgY29uc3QgRGlyZWN0aW9uID0ge1xuICAgIE5FWFQgICAgIDogJ25leHQnLFxuICAgIFBSRVYgICAgIDogJ3ByZXYnLFxuICAgIExFRlQgICAgIDogJ2xlZnQnLFxuICAgIFJJR0hUICAgIDogJ3JpZ2h0J1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgU0xJREUgICAgICAgICAgOiBgc2xpZGUke0VWRU5UX0tFWX1gLFxuICAgIFNMSUQgICAgICAgICAgIDogYHNsaWQke0VWRU5UX0tFWX1gLFxuICAgIEtFWURPV04gICAgICAgIDogYGtleWRvd24ke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFRU5URVIgICAgIDogYG1vdXNlZW50ZXIke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFTEVBVkUgICAgIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gLFxuICAgIFRPVUNIRU5EICAgICAgIDogYHRvdWNoZW5kJHtFVkVOVF9LRVl9YCxcbiAgICBMT0FEX0RBVEFfQVBJICA6IGBsb2FkJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBDQVJPVVNFTCA6ICdjYXJvdXNlbCcsXG4gICAgQUNUSVZFICAgOiAnYWN0aXZlJyxcbiAgICBTTElERSAgICA6ICdzbGlkZScsXG4gICAgUklHSFQgICAgOiAnY2Fyb3VzZWwtaXRlbS1yaWdodCcsXG4gICAgTEVGVCAgICAgOiAnY2Fyb3VzZWwtaXRlbS1sZWZ0JyxcbiAgICBORVhUICAgICA6ICdjYXJvdXNlbC1pdGVtLW5leHQnLFxuICAgIFBSRVYgICAgIDogJ2Nhcm91c2VsLWl0ZW0tcHJldicsXG4gICAgSVRFTSAgICAgOiAnY2Fyb3VzZWwtaXRlbSdcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEFDVElWRSAgICAgIDogJy5hY3RpdmUnLFxuICAgIEFDVElWRV9JVEVNIDogJy5hY3RpdmUuY2Fyb3VzZWwtaXRlbScsXG4gICAgSVRFTSAgICAgICAgOiAnLmNhcm91c2VsLWl0ZW0nLFxuICAgIE5FWFRfUFJFViAgIDogJy5jYXJvdXNlbC1pdGVtLW5leHQsIC5jYXJvdXNlbC1pdGVtLXByZXYnLFxuICAgIElORElDQVRPUlMgIDogJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyxcbiAgICBEQVRBX1NMSURFICA6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gICAgREFUQV9SSURFICAgOiAnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJ1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBDYXJvdXNlbCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9pdGVtcyAgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pbnRlcnZhbCAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9hY3RpdmVFbGVtZW50ICAgICAgPSBudWxsXG5cbiAgICAgIHRoaXMuX2lzUGF1c2VkICAgICAgICAgICA9IGZhbHNlXG4gICAgICB0aGlzLl9pc1NsaWRpbmcgICAgICAgICAgPSBmYWxzZVxuXG4gICAgICB0aGlzLnRvdWNoVGltZW91dCAgICAgICAgPSBudWxsXG5cbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl9lbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpWzBdXG4gICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCAgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuSU5ESUNBVE9SUylcblxuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIG5leHQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uTkVYVClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0V2hlblZpc2libGUoKSB7XG4gICAgICAvLyBEb24ndCBjYWxsIG5leHQgd2hlbiB0aGUgcGFnZSBpc24ndCB2aXNpYmxlXG4gICAgICAvLyBvciB0aGUgY2Fyb3VzZWwgb3IgaXRzIHBhcmVudCBpc24ndCB2aXNpYmxlXG4gICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbiAmJlxuICAgICAgICAoJCh0aGlzLl9lbGVtZW50KS5pcygnOnZpc2libGUnKSAmJiAkKHRoaXMuX2VsZW1lbnQpLmNzcygndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJykpIHtcbiAgICAgICAgdGhpcy5uZXh0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2KCkge1xuICAgICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLlBSRVYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2UoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTkVYVF9QUkVWKSkge1xuICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIHRoaXMuY3ljbGUodHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgIH1cblxuICAgIGN5Y2xlKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmludGVydmFsICYmICF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICAgIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPyB0aGlzLm5leHRXaGVuVmlzaWJsZSA6IHRoaXMubmV4dCkuYmluZCh0aGlzKSxcbiAgICAgICAgICB0aGlzLl9jb25maWcuaW50ZXJ2YWxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRvKGluZGV4KSB7XG4gICAgICB0aGlzLl9hY3RpdmVFbGVtZW50ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkFDVElWRV9JVEVNKVxuXG4gICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9hY3RpdmVFbGVtZW50KVxuXG4gICAgICBpZiAoaW5kZXggPiB0aGlzLl9pdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5TTElELCAoKSA9PiB0aGlzLnRvKGluZGV4KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICAgIHRoaXMuY3ljbGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gaW5kZXggPiBhY3RpdmVJbmRleFxuICAgICAgICA/IERpcmVjdGlvbi5ORVhUXG4gICAgICAgIDogRGlyZWN0aW9uLlBSRVZcblxuICAgICAgdGhpcy5fc2xpZGUoZGlyZWN0aW9uLCB0aGlzLl9pdGVtc1tpbmRleF0pXG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEVWRU5UX0tFWSlcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgICAgdGhpcy5faXRlbXMgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9jb25maWcgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faW50ZXJ2YWwgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pc1BhdXNlZCAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2lzU2xpZGluZyAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAuLi5jb25maWdcbiAgICAgIH1cbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgICAgLm9uKEV2ZW50LktFWURPV04sIChldmVudCkgPT4gdGhpcy5fa2V5ZG93bihldmVudCkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcucGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAgIC5vbihFdmVudC5NT1VTRUVOVEVSLCAoZXZlbnQpID0+IHRoaXMucGF1c2UoZXZlbnQpKVxuICAgICAgICAgIC5vbihFdmVudC5NT1VTRUxFQVZFLCAoZXZlbnQpID0+IHRoaXMuY3ljbGUoZXZlbnQpKVxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgLy8gSWYgaXQncyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlLCBtb3VzZWVudGVyL2xlYXZlIGFyZSBmaXJlZCBhc1xuICAgICAgICAgIC8vIHBhcnQgb2YgdGhlIG1vdXNlIGNvbXBhdGliaWxpdHkgZXZlbnRzIG9uIGZpcnN0IHRhcCAtIHRoZSBjYXJvdXNlbFxuICAgICAgICAgIC8vIHdvdWxkIHN0b3AgY3ljbGluZyB1bnRpbCB1c2VyIHRhcHBlZCBvdXQgb2YgaXQ7XG4gICAgICAgICAgLy8gaGVyZSwgd2UgbGlzdGVuIGZvciB0b3VjaGVuZCwgZXhwbGljaXRseSBwYXVzZSB0aGUgY2Fyb3VzZWxcbiAgICAgICAgICAvLyAoYXMgaWYgaXQncyB0aGUgc2Vjb25kIHRpbWUgd2UgdGFwIG9uIGl0LCBtb3VzZWVudGVyIGNvbXBhdCBldmVudFxuICAgICAgICAgIC8vIGlzIE5PVCBmaXJlZCkgYW5kIGFmdGVyIGEgdGltZW91dCAodG8gYWxsb3cgZm9yIG1vdXNlIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAvLyBldmVudHMgdG8gZmlyZSkgd2UgZXhwbGljaXRseSByZXN0YXJ0IGN5Y2xpbmdcbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LlRPVUNIRU5ELCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgICAgICAgIGlmICh0aGlzLnRvdWNoVGltZW91dCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50b3VjaFRpbWVvdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRvdWNoVGltZW91dCA9IHNldFRpbWVvdXQoKGV2ZW50KSA9PiB0aGlzLmN5Y2xlKGV2ZW50KSwgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCArIHRoaXMuX2NvbmZpZy5pbnRlcnZhbClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2tleWRvd24oZXZlbnQpIHtcbiAgICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIEFSUk9XX0xFRlRfS0VZQ09ERTpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgdGhpcy5wcmV2KClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEFSUk9XX1JJR0hUX0tFWUNPREU6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHRoaXMubmV4dCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2l0ZW1zID0gZWxlbWVudCAmJiBlbGVtZW50LnBhcmVudE5vZGVcbiAgICAgICAgPyBbXS5zbGljZS5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLklURU0pKVxuICAgICAgICA6IFtdXG4gICAgICByZXR1cm4gdGhpcy5faXRlbXMuaW5kZXhPZihlbGVtZW50KVxuICAgIH1cblxuICAgIF9nZXRJdGVtQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBhY3RpdmVFbGVtZW50KSB7XG4gICAgICBjb25zdCBpc05leHREaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUXG4gICAgICBjb25zdCBpc1ByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWXG4gICAgICBjb25zdCBhY3RpdmVJbmRleCAgICAgPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudClcbiAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggICA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDFcbiAgICAgIGNvbnN0IGlzR29pbmdUb1dyYXAgICA9IGlzUHJldkRpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNOZXh0RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSBsYXN0SXRlbUluZGV4XG5cbiAgICAgIGlmIChpc0dvaW5nVG9XcmFwICYmICF0aGlzLl9jb25maWcud3JhcCkge1xuICAgICAgICByZXR1cm4gYWN0aXZlRWxlbWVudFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWx0YSAgICAgPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWID8gLTEgOiAxXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLl9pdGVtcy5sZW5ndGhcblxuICAgICAgcmV0dXJuIGl0ZW1JbmRleCA9PT0gLTFcbiAgICAgICAgPyB0aGlzLl9pdGVtc1t0aGlzLl9pdGVtcy5sZW5ndGggLSAxXSA6IHRoaXMuX2l0ZW1zW2l0ZW1JbmRleF1cbiAgICB9XG5cbiAgICBfdHJpZ2dlclNsaWRlRXZlbnQocmVsYXRlZFRhcmdldCwgZXZlbnREaXJlY3Rpb25OYW1lKSB7XG4gICAgICBjb25zdCB0YXJnZXRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChyZWxhdGVkVGFyZ2V0KVxuICAgICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSkpXG4gICAgICBjb25zdCBzbGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5TTElERSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0LFxuICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgICAgZnJvbTogZnJvbUluZGV4LFxuICAgICAgICB0bzogdGFyZ2V0SW5kZXhcbiAgICAgIH0pXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkZUV2ZW50KVxuXG4gICAgICByZXR1cm4gc2xpZGVFdmVudFxuICAgIH1cblxuICAgIF9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JzID0gW10uc2xpY2UuY2FsbCh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkFDVElWRSkpXG4gICAgICAgICQoaW5kaWNhdG9ycylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcblxuICAgICAgICBjb25zdCBuZXh0SW5kaWNhdG9yID0gdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQuY2hpbGRyZW5bXG4gICAgICAgICAgdGhpcy5fZ2V0SXRlbUluZGV4KGVsZW1lbnQpXG4gICAgICAgIF1cblxuICAgICAgICBpZiAobmV4dEluZGljYXRvcikge1xuICAgICAgICAgICQobmV4dEluZGljYXRvcikuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIF9zbGlkZShkaXJlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFX0lURU0pXG4gICAgICBjb25zdCBhY3RpdmVFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudClcbiAgICAgIGNvbnN0IG5leHRFbGVtZW50ICAgPSBlbGVtZW50IHx8IGFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgdGhpcy5fZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudClcbiAgICAgIGNvbnN0IG5leHRFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgobmV4dEVsZW1lbnQpXG4gICAgICBjb25zdCBpc0N5Y2xpbmcgPSBCb29sZWFuKHRoaXMuX2ludGVydmFsKVxuXG4gICAgICBsZXQgZGlyZWN0aW9uYWxDbGFzc05hbWVcbiAgICAgIGxldCBvcmRlckNsYXNzTmFtZVxuICAgICAgbGV0IGV2ZW50RGlyZWN0aW9uTmFtZVxuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5MRUZUXG4gICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLk5FWFRcbiAgICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLkxFRlRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpcmVjdGlvbmFsQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLlJJR0hUXG4gICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLlBSRVZcbiAgICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLlJJR0hUXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0RWxlbWVudCAmJiAkKG5leHRFbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2xpZGVFdmVudCA9IHRoaXMuX3RyaWdnZXJTbGlkZUV2ZW50KG5leHRFbGVtZW50LCBldmVudERpcmVjdGlvbk5hbWUpXG4gICAgICBpZiAoc2xpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmVFbGVtZW50IHx8ICFuZXh0RWxlbWVudCkge1xuICAgICAgICAvLyBTb21lIHdlaXJkbmVzcyBpcyBoYXBwZW5pbmcsIHNvIHdlIGJhaWxcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWVcblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudClcblxuICAgICAgY29uc3Qgc2xpZEV2ZW50ID0gJC5FdmVudChFdmVudC5TTElELCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IG5leHRFbGVtZW50LFxuICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgICAgZnJvbTogYWN0aXZlRWxlbWVudEluZGV4LFxuICAgICAgICB0bzogbmV4dEVsZW1lbnRJbmRleFxuICAgICAgfSlcblxuICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNMSURFKSkge1xuICAgICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhvcmRlckNsYXNzTmFtZSlcblxuICAgICAgICBVdGlsLnJlZmxvdyhuZXh0RWxlbWVudClcblxuICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLmFkZENsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuICAgICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSlcblxuICAgICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZUVsZW1lbnQpXG5cbiAgICAgICAgJChhY3RpdmVFbGVtZW50KVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgJChuZXh0RWxlbWVudClcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGAke2RpcmVjdGlvbmFsQ2xhc3NOYW1lfSAke29yZGVyQ2xhc3NOYW1lfWApXG4gICAgICAgICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuXG4gICAgICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5BQ1RJVkV9ICR7b3JkZXJDbGFzc05hbWV9ICR7ZGlyZWN0aW9uYWxDbGFzc05hbWV9YClcblxuICAgICAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZEV2ZW50KSwgMClcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLmN5Y2xlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBsZXQgX2NvbmZpZyA9IHtcbiAgICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAgIC4uLiQodGhpcykuZGF0YSgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBfY29uZmlnID0ge1xuICAgICAgICAgICAgLi4uX2NvbmZpZyxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnID8gY29uZmlnIDogX2NvbmZpZy5zbGlkZVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQ2Fyb3VzZWwodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBkYXRhLnRvKGNvbmZpZylcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVthY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHthY3Rpb259XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2FjdGlvbl0oKVxuICAgICAgICB9IGVsc2UgaWYgKF9jb25maWcuaW50ZXJ2YWwpIHtcbiAgICAgICAgICBkYXRhLnBhdXNlKClcbiAgICAgICAgICBkYXRhLmN5Y2xlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2RhdGFBcGlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpXG5cbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICQoc2VsZWN0b3IpWzBdXG5cbiAgICAgIGlmICghdGFyZ2V0IHx8ICEkKHRhcmdldCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNBUk9VU0VMKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAuLi4kKHRhcmdldCkuZGF0YSgpLFxuICAgICAgICAuLi4kKHRoaXMpLmRhdGEoKVxuICAgICAgfVxuICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlLXRvJylcblxuICAgICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgY29uZmlnLmludGVydmFsID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGFyZ2V0KSwgY29uZmlnKVxuXG4gICAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgICAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkudG8oc2xpZGVJbmRleClcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1NMSURFLCBDYXJvdXNlbC5fZGF0YUFwaUNsaWNrSGFuZGxlcilcblxuICAkKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgKCkgPT4ge1xuICAgIGNvbnN0IGNhcm91c2VscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1JJREUpKVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjYXJvdXNlbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0ICRjYXJvdXNlbCA9ICQoY2Fyb3VzZWxzW2ldKVxuICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDYXJvdXNlbFxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gQ2Fyb3VzZWxcbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IENvbGxhcHNlID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgID0gJ2NvbGxhcHNlJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmNvbGxhcHNlJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICB0b2dnbGUgOiB0cnVlLFxuICAgIHBhcmVudCA6ICcnXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICB0b2dnbGUgOiAnYm9vbGVhbicsXG4gICAgcGFyZW50IDogJyhzdHJpbmd8ZWxlbWVudCknXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBTSE9XICAgICAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XTiAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gICAgSElERSAgICAgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBTSE9XICAgICAgIDogJ3Nob3cnLFxuICAgIENPTExBUFNFICAgOiAnY29sbGFwc2UnLFxuICAgIENPTExBUFNJTkcgOiAnY29sbGFwc2luZycsXG4gICAgQ09MTEFQU0VEICA6ICdjb2xsYXBzZWQnXG4gIH1cblxuICBjb25zdCBEaW1lbnNpb24gPSB7XG4gICAgV0lEVEggIDogJ3dpZHRoJyxcbiAgICBIRUlHSFQgOiAnaGVpZ2h0J1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgQUNUSVZFUyAgICAgOiAnLnNob3csIC5jb2xsYXBzaW5nJyxcbiAgICBEQVRBX1RPR0dMRSA6ICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXSdcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgQ29sbGFwc2Uge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgICAgPSAkLm1ha2VBcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMke2VsZW1lbnQuaWR9XCJdLGAgK1xuICAgICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJHtlbGVtZW50LmlkfVwiXWBcbiAgICAgICkpXG4gICAgICBjb25zdCB0b2dnbGVMaXN0ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSlcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0b2dnbGVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSB0b2dnbGVMaXN0W2ldXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pXG4gICAgICAgIGNvbnN0IGZpbHRlckVsZW1lbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICAgICAgICAgIC5maWx0ZXIoKGZvdW5kRWxlbSkgPT4gZm91bmRFbGVtID09PSBlbGVtZW50KVxuXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50ID8gdGhpcy5fZ2V0UGFyZW50KCkgOiBudWxsXG5cbiAgICAgIGlmICghdGhpcy5fY29uZmlnLnBhcmVudCkge1xuICAgICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fZWxlbWVudCwgdGhpcy5fdHJpZ2dlckFycmF5KVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnRvZ2dsZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKVxuICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgYWN0aXZlc1xuICAgICAgbGV0IGFjdGl2ZXNEYXRhXG5cbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgYWN0aXZlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQUNUSVZFUykpXG4gICAgICAgICAgLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JykgPT09IHRoaXMuX2NvbmZpZy5wYXJlbnQpXG5cbiAgICAgICAgaWYgKGFjdGl2ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWN0aXZlcyA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICBhY3RpdmVzRGF0YSA9ICQoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1cpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJChhY3RpdmVzKS5ub3QodGhpcy5fc2VsZWN0b3IpLCAnaGlkZScpXG4gICAgICAgIGlmICghYWN0aXZlc0RhdGEpIHtcbiAgICAgICAgICAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVksIG51bGwpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDBcblxuICAgICAgaWYgKHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgJCh0aGlzLl90cmlnZ2VyQXJyYXkpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSlcblxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG4gICAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJydcblxuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpXG5cbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjYXBpdGFsaXplZERpbWVuc2lvbiA9IGRpbWVuc2lvblswXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKDEpXG4gICAgICBjb25zdCBzY3JvbGxTaXplID0gYHNjcm9sbCR7Y2FwaXRhbGl6ZWREaW1lbnNpb259YFxuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IGAke3RoaXMuX2VsZW1lbnRbc2Nyb2xsU2l6ZV19cHhgXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHxcbiAgICAgICAgISQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGFydEV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dfXB4YFxuXG4gICAgICBVdGlsLnJlZmxvdyh0aGlzLl9lbGVtZW50KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORylcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBjb25zdCB0cmlnZ2VyQXJyYXlMZW5ndGggPSB0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoXG4gICAgICBpZiAodHJpZ2dlckFycmF5TGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWdnZXJBcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuX3RyaWdnZXJBcnJheVtpXVxuICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRyaWdnZXIpXG4gICAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCAkZWxlbSA9ICQoW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkpXG4gICAgICAgICAgICBpZiAoISRlbGVtLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgICAgICAkKHRyaWdnZXIpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKHRydWUpXG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpXG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG4gICAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgICAudHJpZ2dlcihFdmVudC5ISURERU4pXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnXG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gaXNUcmFuc2l0aW9uaW5nXG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fcGFyZW50ICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdHJpZ2dlckFycmF5ICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgIC4uLmNvbmZpZ1xuICAgICAgfVxuICAgICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSkgLy8gQ29lcmNlIHN0cmluZyB2YWx1ZXNcbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2dldERpbWVuc2lvbigpIHtcbiAgICAgIGNvbnN0IGhhc1dpZHRoID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhEaW1lbnNpb24uV0lEVEgpXG4gICAgICByZXR1cm4gaGFzV2lkdGggPyBEaW1lbnNpb24uV0lEVEggOiBEaW1lbnNpb24uSEVJR0hUXG4gICAgfVxuXG4gICAgX2dldFBhcmVudCgpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBudWxsXG4gICAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5fY29uZmlnLnBhcmVudCkpIHtcbiAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudFxuXG4gICAgICAgIC8vIEl0J3MgYSBqUXVlcnkgb2JqZWN0XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnBhcmVudC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudFswXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NvbmZpZy5wYXJlbnQpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbGVjdG9yID1cbiAgICAgICAgYFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJHt0aGlzLl9jb25maWcucGFyZW50fVwiXWBcblxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgICAgICQoY2hpbGRyZW4pLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFxuICAgICAgICAgIENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICBbZWxlbWVudF1cbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHBhcmVudFxuICAgIH1cblxuICAgIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZWxlbWVudCwgdHJpZ2dlckFycmF5KSB7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBpc09wZW4gPSAkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICAgIGlmICh0cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgJCh0cmlnZ2VyQXJyYXkpXG4gICAgICAgICAgICAudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCwgIWlzT3BlbilcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG4gICAgICByZXR1cm4gc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IG51bGxcbiAgICB9XG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgICBsZXQgZGF0YSAgICAgID0gJHRoaXMuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAgIC4uLiR0aGlzLmRhdGEoKSxcbiAgICAgICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhICYmIF9jb25maWcudG9nZ2xlICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgIF9jb25maWcudG9nZ2xlID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkdGhpcy5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgY29uc3QgJHRyaWdnZXIgPSAkKHRoaXMpXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcylcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICAgICQoc2VsZWN0b3JzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKHRoaXMpXG4gICAgICBjb25zdCBkYXRhICAgID0gJHRhcmdldC5kYXRhKERBVEFfS0VZKVxuICAgICAgY29uc3QgY29uZmlnICA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0cmlnZ2VyLmRhdGEoKVxuICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCR0YXJnZXQsIGNvbmZpZylcbiAgICB9KVxuICB9KVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIENvbGxhcHNlXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZVxuIiwiLyoqIVxuICogQGZpbGVPdmVydmlldyBLaWNrYXNzIGxpYnJhcnkgdG8gY3JlYXRlIGFuZCBwbGFjZSBwb3BwZXJzIG5lYXIgdGhlaXIgcmVmZXJlbmNlIGVsZW1lbnRzLlxuICogQHZlcnNpb24gMS4xNC4zXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEZlZGVyaWNvIFppdm9sbyBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBsb25nZXJUaW1lb3V0QnJvd3NlcnMgPSBbJ0VkZ2UnLCAnVHJpZGVudCcsICdGaXJlZm94J107XG52YXIgdGltZW91dER1cmF0aW9uID0gMDtcbmZvciAodmFyIGkgPSAwOyBpIDwgbG9uZ2VyVGltZW91dEJyb3dzZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gIGlmIChpc0Jyb3dzZXIgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKGxvbmdlclRpbWVvdXRCcm93c2Vyc1tpXSkgPj0gMCkge1xuICAgIHRpbWVvdXREdXJhdGlvbiA9IDE7XG4gICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWljcm90YXNrRGVib3VuY2UoZm4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjYWxsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FsbGVkID0gdHJ1ZTtcbiAgICB3aW5kb3cuUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsZWQgPSBmYWxzZTtcbiAgICAgIGZuKCk7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRhc2tEZWJvdW5jZShmbikge1xuICB2YXIgc2NoZWR1bGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgIHNjaGVkdWxlZCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGZuKCk7XG4gICAgICB9LCB0aW1lb3V0RHVyYXRpb24pO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIHN1cHBvcnRzTWljcm9UYXNrcyA9IGlzQnJvd3NlciAmJiB3aW5kb3cuUHJvbWlzZTtcblxuLyoqXG4qIENyZWF0ZSBhIGRlYm91bmNlZCB2ZXJzaW9uIG9mIGEgbWV0aG9kLCB0aGF0J3MgYXN5bmNocm9ub3VzbHkgZGVmZXJyZWRcbiogYnV0IGNhbGxlZCBpbiB0aGUgbWluaW11bSB0aW1lIHBvc3NpYmxlLlxuKlxuKiBAbWV0aG9kXG4qIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiogQGFyZ3VtZW50IHtGdW5jdGlvbn0gZm5cbiogQHJldHVybnMge0Z1bmN0aW9ufVxuKi9cbnZhciBkZWJvdW5jZSA9IHN1cHBvcnRzTWljcm9UYXNrcyA/IG1pY3JvdGFza0RlYm91bmNlIDogdGFza0RlYm91bmNlO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YXJpYWJsZSBpcyBhIGZ1bmN0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0FueX0gZnVuY3Rpb25Ub0NoZWNrIC0gdmFyaWFibGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSBhbnN3ZXIgdG86IGlzIGEgZnVuY3Rpb24/XG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XG4gIHZhciBnZXRUeXBlID0ge307XG4gIHJldHVybiBmdW5jdGlvblRvQ2hlY2sgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0aW9uVG9DaGVjaykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogR2V0IENTUyBjb21wdXRlZCBwcm9wZXJ0eSBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwcm9wZXJ0eVxuICovXG5mdW5jdGlvbiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWxlbWVudCwgcHJvcGVydHkpIHtcbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgLy8gTk9URTogMSBET00gYWNjZXNzIGhlcmVcbiAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG4gIHJldHVybiBwcm9wZXJ0eSA/IGNzc1twcm9wZXJ0eV0gOiBjc3M7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcGFyZW50Tm9kZSBvciB0aGUgaG9zdCBvZiB0aGUgZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZSB8fCBlbGVtZW50Lmhvc3Q7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2Nyb2xsaW5nIHBhcmVudCBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gc2Nyb2xsIHBhcmVudFxuICovXG5mdW5jdGlvbiBnZXRTY3JvbGxQYXJlbnQoZWxlbWVudCkge1xuICAvLyBSZXR1cm4gYm9keSwgYGdldFNjcm9sbGAgd2lsbCB0YWtlIGNhcmUgdG8gZ2V0IHRoZSBjb3JyZWN0IGBzY3JvbGxUb3BgIGZyb20gaXRcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gIH1cblxuICBzd2l0Y2ggKGVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICBjYXNlICdIVE1MJzpcbiAgICBjYXNlICdCT0RZJzpcbiAgICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keTtcbiAgICBjYXNlICcjZG9jdW1lbnQnOlxuICAgICAgcmV0dXJuIGVsZW1lbnQuYm9keTtcbiAgfVxuXG4gIC8vIEZpcmVmb3ggd2FudCB1cyB0byBjaGVjayBgLXhgIGFuZCBgLXlgIHZhcmlhdGlvbnMgYXMgd2VsbFxuXG4gIHZhciBfZ2V0U3R5bGVDb21wdXRlZFByb3AgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWxlbWVudCksXG4gICAgICBvdmVyZmxvdyA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvdyxcbiAgICAgIG92ZXJmbG93WCA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0U3R5bGVDb21wdXRlZFByb3Aub3ZlcmZsb3dZO1xuXG4gIGlmICgvKGF1dG98c2Nyb2xsfG92ZXJsYXkpLy50ZXN0KG92ZXJmbG93ICsgb3ZlcmZsb3dZICsgb3ZlcmZsb3dYKSkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuIGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKGVsZW1lbnQpKTtcbn1cblxudmFyIGlzSUUxMSA9IGlzQnJvd3NlciAmJiAhISh3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgZG9jdW1lbnQuZG9jdW1lbnRNb2RlKTtcbnZhciBpc0lFMTAgPSBpc0Jyb3dzZXIgJiYgL01TSUUgMTAvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgYnJvd3NlciBpcyBJbnRlcm5ldCBFeHBsb3JlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtOdW1iZXJ9IHZlcnNpb24gdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSBpc0lFXG4gKi9cbmZ1bmN0aW9uIGlzSUUodmVyc2lvbikge1xuICBpZiAodmVyc2lvbiA9PT0gMTEpIHtcbiAgICByZXR1cm4gaXNJRTExO1xuICB9XG4gIGlmICh2ZXJzaW9uID09PSAxMCkge1xuICAgIHJldHVybiBpc0lFMTA7XG4gIH1cbiAgcmV0dXJuIGlzSUUxMSB8fCBpc0lFMTA7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb2Zmc2V0IHBhcmVudCBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gb2Zmc2V0IHBhcmVudFxuICovXG5mdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgdmFyIG5vT2Zmc2V0UGFyZW50ID0gaXNJRSgxMCkgPyBkb2N1bWVudC5ib2R5IDogbnVsbDtcblxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIC8vIFNraXAgaGlkZGVuIGVsZW1lbnRzIHdoaWNoIGRvbid0IGhhdmUgYW4gb2Zmc2V0UGFyZW50XG4gIHdoaWxlIChvZmZzZXRQYXJlbnQgPT09IG5vT2Zmc2V0UGFyZW50ICYmIGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgb2Zmc2V0UGFyZW50ID0gKGVsZW1lbnQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZykub2Zmc2V0UGFyZW50O1xuICB9XG5cbiAgdmFyIG5vZGVOYW1lID0gb2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudC5ub2RlTmFtZTtcblxuICBpZiAoIW5vZGVOYW1lIHx8IG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBlbGVtZW50ID8gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIC8vIC5vZmZzZXRQYXJlbnQgd2lsbCByZXR1cm4gdGhlIGNsb3Nlc3QgVEQgb3IgVEFCTEUgaW4gY2FzZVxuICAvLyBubyBvZmZzZXRQYXJlbnQgaXMgcHJlc2VudCwgSSBoYXRlIHRoaXMgam9iLi4uXG4gIGlmIChbJ1REJywgJ1RBQkxFJ10uaW5kZXhPZihvZmZzZXRQYXJlbnQubm9kZU5hbWUpICE9PSAtMSAmJiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICByZXR1cm4gZ2V0T2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCk7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0UGFyZW50O1xufVxuXG5mdW5jdGlvbiBpc09mZnNldENvbnRhaW5lcihlbGVtZW50KSB7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG5vZGVOYW1lID09PSAnSFRNTCcgfHwgZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpID09PSBlbGVtZW50O1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSByb290IG5vZGUgKGRvY3VtZW50LCBzaGFkb3dET00gcm9vdCkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybnMge0VsZW1lbnR9IHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBnZXRSb290KG5vZGUpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBnZXRSb290KG5vZGUucGFyZW50Tm9kZSk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgb2Zmc2V0IHBhcmVudCBjb21tb24gdG8gdGhlIHR3byBwcm92aWRlZCBub2Rlc1xuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MVxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MlxuICogQHJldHVybnMge0VsZW1lbnR9IGNvbW1vbiBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGVsZW1lbnQyKSB7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIHRvIGF2b2lkIGVycm9ycyBpbiBjYXNlIG9uZSBvZiB0aGUgZWxlbWVudHMgaXNuJ3QgZGVmaW5lZCBmb3IgYW55IHJlYXNvblxuICBpZiAoIWVsZW1lbnQxIHx8ICFlbGVtZW50MS5ub2RlVHlwZSB8fCAhZWxlbWVudDIgfHwgIWVsZW1lbnQyLm5vZGVUeXBlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIC8vIEhlcmUgd2UgbWFrZSBzdXJlIHRvIGdpdmUgYXMgXCJzdGFydFwiIHRoZSBlbGVtZW50IHRoYXQgY29tZXMgZmlyc3QgaW4gdGhlIERPTVxuICB2YXIgb3JkZXIgPSBlbGVtZW50MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihlbGVtZW50MikgJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORztcbiAgdmFyIHN0YXJ0ID0gb3JkZXIgPyBlbGVtZW50MSA6IGVsZW1lbnQyO1xuICB2YXIgZW5kID0gb3JkZXIgPyBlbGVtZW50MiA6IGVsZW1lbnQxO1xuXG4gIC8vIEdldCBjb21tb24gYW5jZXN0b3IgY29udGFpbmVyXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0KHN0YXJ0LCAwKTtcbiAgcmFuZ2Uuc2V0RW5kKGVuZCwgMCk7XG4gIHZhciBjb21tb25BbmNlc3RvckNvbnRhaW5lciA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXG4gIC8vIEJvdGggbm9kZXMgYXJlIGluc2lkZSAjZG9jdW1lbnRcblxuICBpZiAoZWxlbWVudDEgIT09IGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICYmIGVsZW1lbnQyICE9PSBjb21tb25BbmNlc3RvckNvbnRhaW5lciB8fCBzdGFydC5jb250YWlucyhlbmQpKSB7XG4gICAgaWYgKGlzT2Zmc2V0Q29udGFpbmVyKGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSkge1xuICAgICAgcmV0dXJuIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQoY29tbW9uQW5jZXN0b3JDb250YWluZXIpO1xuICB9XG5cbiAgLy8gb25lIG9mIHRoZSBub2RlcyBpcyBpbnNpZGUgc2hhZG93RE9NLCBmaW5kIHdoaWNoIG9uZVxuICB2YXIgZWxlbWVudDFyb290ID0gZ2V0Um9vdChlbGVtZW50MSk7XG4gIGlmIChlbGVtZW50MXJvb3QuaG9zdCkge1xuICAgIHJldHVybiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KGVsZW1lbnQxcm9vdC5ob3N0LCBlbGVtZW50Mik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGdldFJvb3QoZWxlbWVudDIpLmhvc3QpO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2Nyb2xsIHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50IGluIHRoZSBnaXZlbiBzaWRlICh0b3AgYW5kIGxlZnQpXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzaWRlIGB0b3BgIG9yIGBsZWZ0YFxuICogQHJldHVybnMge251bWJlcn0gYW1vdW50IG9mIHNjcm9sbGVkIHBpeGVsc1xuICovXG5mdW5jdGlvbiBnZXRTY3JvbGwoZWxlbWVudCkge1xuICB2YXIgc2lkZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ3RvcCc7XG5cbiAgdmFyIHVwcGVyU2lkZSA9IHNpZGUgPT09ICd0b3AnID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCc7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHZhciBodG1sID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgc2Nyb2xsaW5nRWxlbWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGh0bWw7XG4gICAgcmV0dXJuIHNjcm9sbGluZ0VsZW1lbnRbdXBwZXJTaWRlXTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50W3VwcGVyU2lkZV07XG59XG5cbi8qXG4gKiBTdW0gb3Igc3VidHJhY3QgdGhlIGVsZW1lbnQgc2Nyb2xsIHZhbHVlcyAobGVmdCBhbmQgdG9wKSBmcm9tIGEgZ2l2ZW4gcmVjdCBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWN0IC0gUmVjdCBvYmplY3QgeW91IHdhbnQgdG8gY2hhbmdlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgZnJvbSB0aGUgZnVuY3Rpb24gcmVhZHMgdGhlIHNjcm9sbCB2YWx1ZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VidHJhY3QgLSBzZXQgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBzdWJ0cmFjdCB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHJldHVybiB7T2JqZWN0fSByZWN0IC0gVGhlIG1vZGlmaWVyIHJlY3Qgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluY2x1ZGVTY3JvbGwocmVjdCwgZWxlbWVudCkge1xuICB2YXIgc3VidHJhY3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gIHZhciBzY3JvbGxUb3AgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ3RvcCcpO1xuICB2YXIgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xuICB2YXIgbW9kaWZpZXIgPSBzdWJ0cmFjdCA/IC0xIDogMTtcbiAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wICogbW9kaWZpZXI7XG4gIHJlY3QuYm90dG9tICs9IHNjcm9sbFRvcCAqIG1vZGlmaWVyO1xuICByZWN0LmxlZnQgKz0gc2Nyb2xsTGVmdCAqIG1vZGlmaWVyO1xuICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQgKiBtb2RpZmllcjtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbi8qXG4gKiBIZWxwZXIgdG8gZGV0ZWN0IGJvcmRlcnMgb2YgYSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xuICogUmVzdWx0IG9mIGBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHlgIG9uIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gYXhpcyAtIGB4YCBvciBgeWBcbiAqIEByZXR1cm4ge251bWJlcn0gYm9yZGVycyAtIFRoZSBib3JkZXJzIHNpemUgb2YgdGhlIGdpdmVuIGF4aXNcbiAqL1xuXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsIGF4aXMpIHtcbiAgdmFyIHNpZGVBID0gYXhpcyA9PT0gJ3gnID8gJ0xlZnQnIDogJ1RvcCc7XG4gIHZhciBzaWRlQiA9IHNpZGVBID09PSAnTGVmdCcgPyAnUmlnaHQnIDogJ0JvdHRvbSc7XG5cbiAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzWydib3JkZXInICsgc2lkZUEgKyAnV2lkdGgnXSwgMTApICsgcGFyc2VGbG9hdChzdHlsZXNbJ2JvcmRlcicgKyBzaWRlQiArICdXaWR0aCddLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldFNpemUoYXhpcywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSkge1xuICByZXR1cm4gTWF0aC5tYXgoYm9keVsnb2Zmc2V0JyArIGF4aXNdLCBib2R5WydzY3JvbGwnICsgYXhpc10sIGh0bWxbJ2NsaWVudCcgKyBheGlzXSwgaHRtbFsnb2Zmc2V0JyArIGF4aXNdLCBodG1sWydzY3JvbGwnICsgYXhpc10sIGlzSUUoMTApID8gaHRtbFsnb2Zmc2V0JyArIGF4aXNdICsgY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdUb3AnIDogJ0xlZnQnKV0gKyBjb21wdXRlZFN0eWxlWydtYXJnaW4nICsgKGF4aXMgPT09ICdIZWlnaHQnID8gJ0JvdHRvbScgOiAnUmlnaHQnKV0gOiAwKTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93U2l6ZXMoKSB7XG4gIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgdmFyIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIHZhciBjb21wdXRlZFN0eWxlID0gaXNJRSgxMCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShodG1sKTtcblxuICByZXR1cm4ge1xuICAgIGhlaWdodDogZ2V0U2l6ZSgnSGVpZ2h0JywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSksXG4gICAgd2lkdGg6IGdldFNpemUoJ1dpZHRoJywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSlcbiAgfTtcbn1cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIEdpdmVuIGVsZW1lbnQgb2Zmc2V0cywgZ2VuZXJhdGUgYW4gb3V0cHV0IHNpbWlsYXIgdG8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gb2Zmc2V0c1xuICogQHJldHVybnMge09iamVjdH0gQ2xpZW50UmVjdCBsaWtlIG91dHB1dFxuICovXG5mdW5jdGlvbiBnZXRDbGllbnRSZWN0KG9mZnNldHMpIHtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBvZmZzZXRzLCB7XG4gICAgcmlnaHQ6IG9mZnNldHMubGVmdCArIG9mZnNldHMud2lkdGgsXG4gICAgYm90dG9tOiBvZmZzZXRzLnRvcCArIG9mZnNldHMuaGVpZ2h0XG4gIH0pO1xufVxuXG4vKipcbiAqIEdldCBib3VuZGluZyBjbGllbnQgcmVjdCBvZiBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9IGNsaWVudCByZWN0XG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0ge307XG5cbiAgLy8gSUUxMCAxMCBGSVg6IFBsZWFzZSwgZG9uJ3QgYXNrLCB0aGUgZWxlbWVudCBpc24ndFxuICAvLyBjb25zaWRlcmVkIGluIERPTSBpbiBzb21lIGNpcmN1bXN0YW5jZXMuLi5cbiAgLy8gVGhpcyBpc24ndCByZXByb2R1Y2libGUgaW4gSUUxMCBjb21wYXRpYmlsaXR5IG1vZGUgb2YgSUUxMVxuICB0cnkge1xuICAgIGlmIChpc0lFKDEwKSkge1xuICAgICAgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICd0b3AnKTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gICAgICByZWN0LnRvcCArPSBzY3JvbGxUb3A7XG4gICAgICByZWN0LmxlZnQgKz0gc2Nyb2xsTGVmdDtcbiAgICAgIHJlY3QuYm90dG9tICs9IHNjcm9sbFRvcDtcbiAgICAgIHJlY3QucmlnaHQgKz0gc2Nyb2xsTGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSB7XG4gICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgIHRvcDogcmVjdC50b3AsXG4gICAgd2lkdGg6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQsXG4gICAgaGVpZ2h0OiByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG4gIH07XG5cbiAgLy8gc3VidHJhY3Qgc2Nyb2xsYmFyIHNpemUgZnJvbSBzaXplc1xuICB2YXIgc2l6ZXMgPSBlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcgPyBnZXRXaW5kb3dTaXplcygpIDoge307XG4gIHZhciB3aWR0aCA9IHNpemVzLndpZHRoIHx8IGVsZW1lbnQuY2xpZW50V2lkdGggfHwgcmVzdWx0LnJpZ2h0IC0gcmVzdWx0LmxlZnQ7XG4gIHZhciBoZWlnaHQgPSBzaXplcy5oZWlnaHQgfHwgZWxlbWVudC5jbGllbnRIZWlnaHQgfHwgcmVzdWx0LmJvdHRvbSAtIHJlc3VsdC50b3A7XG5cbiAgdmFyIGhvcml6U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRXaWR0aCAtIHdpZHRoO1xuICB2YXIgdmVydFNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gaGVpZ2h0O1xuXG4gIC8vIGlmIGFuIGh5cG90aGV0aWNhbCBzY3JvbGxiYXIgaXMgZGV0ZWN0ZWQsIHdlIG11c3QgYmUgc3VyZSBpdCdzIG5vdCBhIGBib3JkZXJgXG4gIC8vIHdlIG1ha2UgdGhpcyBjaGVjayBjb25kaXRpb25hbCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICBpZiAoaG9yaXpTY3JvbGxiYXIgfHwgdmVydFNjcm9sbGJhcikge1xuICAgIHZhciBzdHlsZXMgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWxlbWVudCk7XG4gICAgaG9yaXpTY3JvbGxiYXIgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAneCcpO1xuICAgIHZlcnRTY3JvbGxiYXIgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAneScpO1xuXG4gICAgcmVzdWx0LndpZHRoIC09IGhvcml6U2Nyb2xsYmFyO1xuICAgIHJlc3VsdC5oZWlnaHQgLT0gdmVydFNjcm9sbGJhcjtcbiAgfVxuXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KHJlc3VsdCk7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShjaGlsZHJlbiwgcGFyZW50KSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICB2YXIgaXNJRTEwID0gaXNJRSgxMCk7XG4gIHZhciBpc0hUTUwgPSBwYXJlbnQubm9kZU5hbWUgPT09ICdIVE1MJztcbiAgdmFyIGNoaWxkcmVuUmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChjaGlsZHJlbik7XG4gIHZhciBwYXJlbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHBhcmVudCk7XG4gIHZhciBzY3JvbGxQYXJlbnQgPSBnZXRTY3JvbGxQYXJlbnQoY2hpbGRyZW4pO1xuXG4gIHZhciBzdHlsZXMgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkocGFyZW50KTtcbiAgdmFyIGJvcmRlclRvcFdpZHRoID0gcGFyc2VGbG9hdChzdHlsZXMuYm9yZGVyVG9wV2lkdGgsIDEwKTtcbiAgdmFyIGJvcmRlckxlZnRXaWR0aCA9IHBhcnNlRmxvYXQoc3R5bGVzLmJvcmRlckxlZnRXaWR0aCwgMTApO1xuXG4gIC8vIEluIGNhc2VzIHdoZXJlIHRoZSBwYXJlbnQgaXMgZml4ZWQsIHdlIG11c3QgaWdub3JlIG5lZ2F0aXZlIHNjcm9sbCBpbiBvZmZzZXQgY2FsY1xuICBpZiAoZml4ZWRQb3NpdGlvbiAmJiBwYXJlbnQubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHBhcmVudFJlY3QudG9wID0gTWF0aC5tYXgocGFyZW50UmVjdC50b3AsIDApO1xuICAgIHBhcmVudFJlY3QubGVmdCA9IE1hdGgubWF4KHBhcmVudFJlY3QubGVmdCwgMCk7XG4gIH1cbiAgdmFyIG9mZnNldHMgPSBnZXRDbGllbnRSZWN0KHtcbiAgICB0b3A6IGNoaWxkcmVuUmVjdC50b3AgLSBwYXJlbnRSZWN0LnRvcCAtIGJvcmRlclRvcFdpZHRoLFxuICAgIGxlZnQ6IGNoaWxkcmVuUmVjdC5sZWZ0IC0gcGFyZW50UmVjdC5sZWZ0IC0gYm9yZGVyTGVmdFdpZHRoLFxuICAgIHdpZHRoOiBjaGlsZHJlblJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiBjaGlsZHJlblJlY3QuaGVpZ2h0XG4gIH0pO1xuICBvZmZzZXRzLm1hcmdpblRvcCA9IDA7XG4gIG9mZnNldHMubWFyZ2luTGVmdCA9IDA7XG5cbiAgLy8gU3VidHJhY3QgbWFyZ2lucyBvZiBkb2N1bWVudEVsZW1lbnQgaW4gY2FzZSBpdCdzIGJlaW5nIHVzZWQgYXMgcGFyZW50XG4gIC8vIHdlIGRvIHRoaXMgb25seSBvbiBIVE1MIGJlY2F1c2UgaXQncyB0aGUgb25seSBlbGVtZW50IHRoYXQgYmVoYXZlc1xuICAvLyBkaWZmZXJlbnRseSB3aGVuIG1hcmdpbnMgYXJlIGFwcGxpZWQgdG8gaXQuIFRoZSBtYXJnaW5zIGFyZSBpbmNsdWRlZCBpblxuICAvLyB0aGUgYm94IG9mIHRoZSBkb2N1bWVudEVsZW1lbnQsIGluIHRoZSBvdGhlciBjYXNlcyBub3QuXG4gIGlmICghaXNJRTEwICYmIGlzSFRNTCkge1xuICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3AsIDEwKTtcbiAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpbkxlZnQsIDEwKTtcblxuICAgIG9mZnNldHMudG9wIC09IGJvcmRlclRvcFdpZHRoIC0gbWFyZ2luVG9wO1xuICAgIG9mZnNldHMuYm90dG9tIC09IGJvcmRlclRvcFdpZHRoIC0gbWFyZ2luVG9wO1xuICAgIG9mZnNldHMubGVmdCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuICAgIG9mZnNldHMucmlnaHQgLT0gYm9yZGVyTGVmdFdpZHRoIC0gbWFyZ2luTGVmdDtcblxuICAgIC8vIEF0dGFjaCBtYXJnaW5Ub3AgYW5kIG1hcmdpbkxlZnQgYmVjYXVzZSBpbiBzb21lIGNpcmN1bXN0YW5jZXMgd2UgbWF5IG5lZWQgdGhlbVxuICAgIG9mZnNldHMubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xuICAgIG9mZnNldHMubWFyZ2luTGVmdCA9IG1hcmdpbkxlZnQ7XG4gIH1cblxuICBpZiAoaXNJRTEwICYmICFmaXhlZFBvc2l0aW9uID8gcGFyZW50LmNvbnRhaW5zKHNjcm9sbFBhcmVudCkgOiBwYXJlbnQgPT09IHNjcm9sbFBhcmVudCAmJiBzY3JvbGxQYXJlbnQubm9kZU5hbWUgIT09ICdCT0RZJykge1xuICAgIG9mZnNldHMgPSBpbmNsdWRlU2Nyb2xsKG9mZnNldHMsIHBhcmVudCk7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlKGVsZW1lbnQpIHtcbiAgdmFyIGV4Y2x1ZGVTY3JvbGwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIHZhciBodG1sID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIHJlbGF0aXZlT2Zmc2V0ID0gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKGVsZW1lbnQsIGh0bWwpO1xuICB2YXIgd2lkdGggPSBNYXRoLm1heChodG1sLmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgdmFyIGhlaWdodCA9IE1hdGgubWF4KGh0bWwuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG5cbiAgdmFyIHNjcm9sbFRvcCA9ICFleGNsdWRlU2Nyb2xsID8gZ2V0U2Nyb2xsKGh0bWwpIDogMDtcbiAgdmFyIHNjcm9sbExlZnQgPSAhZXhjbHVkZVNjcm9sbCA/IGdldFNjcm9sbChodG1sLCAnbGVmdCcpIDogMDtcblxuICB2YXIgb2Zmc2V0ID0ge1xuICAgIHRvcDogc2Nyb2xsVG9wIC0gcmVsYXRpdmVPZmZzZXQudG9wICsgcmVsYXRpdmVPZmZzZXQubWFyZ2luVG9wLFxuICAgIGxlZnQ6IHNjcm9sbExlZnQgLSByZWxhdGl2ZU9mZnNldC5sZWZ0ICsgcmVsYXRpdmVPZmZzZXQubWFyZ2luTGVmdCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHRcbiAgfTtcblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChvZmZzZXQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGZpeGVkIG9yIGlzIGluc2lkZSBhIGZpeGVkIHBhcmVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGN1c3RvbUNvbnRhaW5lclxuICogQHJldHVybnMge0Jvb2xlYW59IGFuc3dlciB0byBcImlzRml4ZWQ/XCJcbiAqL1xuZnVuY3Rpb24gaXNGaXhlZChlbGVtZW50KSB7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG4gIGlmIChub2RlTmFtZSA9PT0gJ0JPRFknIHx8IG5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBpc0ZpeGVkKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBmaXJzdCBwYXJlbnQgb2YgYW4gZWxlbWVudCB0aGF0IGhhcyBhIHRyYW5zZm9ybWVkIHByb3BlcnR5IGRlZmluZWRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0VsZW1lbnR9IGZpcnN0IHRyYW5zZm9ybWVkIHBhcmVudCBvciBkb2N1bWVudEVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgdG8gYXZvaWQgZXJyb3JzIGluIGNhc2Ugb25lIG9mIHRoZSBlbGVtZW50cyBpc24ndCBkZWZpbmVkIGZvciBhbnkgcmVhc29uXG4gIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5wYXJlbnRFbGVtZW50IHx8IGlzSUUoKSkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cbiAgdmFyIGVsID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB3aGlsZSAoZWwgJiYgZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsLCAndHJhbnNmb3JtJykgPT09ICdub25lJykge1xuICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWwgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xufVxuXG4vKipcbiAqIENvbXB1dGVkIHRoZSBib3VuZGFyaWVzIGxpbWl0cyBhbmQgcmV0dXJuIHRoZW1cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBvcHBlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcmVmZXJlbmNlXG4gKiBAcGFyYW0ge251bWJlcn0gcGFkZGluZ1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQgLSBFbGVtZW50IHVzZWQgdG8gZGVmaW5lIHRoZSBib3VuZGFyaWVzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZpeGVkUG9zaXRpb24gLSBJcyBpbiBmaXhlZCBwb3NpdGlvbiBtb2RlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb29yZGluYXRlcyBvZiB0aGUgYm91bmRhcmllc1xuICovXG5mdW5jdGlvbiBnZXRCb3VuZGFyaWVzKHBvcHBlciwgcmVmZXJlbmNlLCBwYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCkge1xuICB2YXIgZml4ZWRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogZmFsc2U7XG5cbiAgLy8gTk9URTogMSBET00gYWNjZXNzIGhlcmVcblxuICB2YXIgYm91bmRhcmllcyA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG4gIHZhciBvZmZzZXRQYXJlbnQgPSBmaXhlZFBvc2l0aW9uID8gZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudChwb3BwZXIpIDogZmluZENvbW1vbk9mZnNldFBhcmVudChwb3BwZXIsIHJlZmVyZW5jZSk7XG5cbiAgLy8gSGFuZGxlIHZpZXdwb3J0IGNhc2VcbiAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAndmlld3BvcnQnKSB7XG4gICAgYm91bmRhcmllcyA9IGdldFZpZXdwb3J0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcnRiaXRyYXJ5Tm9kZShvZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIC8vIEhhbmRsZSBvdGhlciBjYXNlcyBiYXNlZCBvbiBET00gZWxlbWVudCB1c2VkIGFzIGJvdW5kYXJpZXNcbiAgICB2YXIgYm91bmRhcmllc05vZGUgPSB2b2lkIDA7XG4gICAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAnc2Nyb2xsUGFyZW50Jykge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShyZWZlcmVuY2UpKTtcbiAgICAgIGlmIChib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgIGJvdW5kYXJpZXNOb2RlID0gcG9wcGVyLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd3aW5kb3cnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IHBvcHBlci5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBib3VuZGFyaWVzRWxlbWVudDtcbiAgICB9XG5cbiAgICB2YXIgb2Zmc2V0cyA9IGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShib3VuZGFyaWVzTm9kZSwgb2Zmc2V0UGFyZW50LCBmaXhlZFBvc2l0aW9uKTtcblxuICAgIC8vIEluIGNhc2Ugb2YgSFRNTCwgd2UgbmVlZCBhIGRpZmZlcmVudCBjb21wdXRhdGlvblxuICAgIGlmIChib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnICYmICFpc0ZpeGVkKG9mZnNldFBhcmVudCkpIHtcbiAgICAgIHZhciBfZ2V0V2luZG93U2l6ZXMgPSBnZXRXaW5kb3dTaXplcygpLFxuICAgICAgICAgIGhlaWdodCA9IF9nZXRXaW5kb3dTaXplcy5oZWlnaHQsXG4gICAgICAgICAgd2lkdGggPSBfZ2V0V2luZG93U2l6ZXMud2lkdGg7XG5cbiAgICAgIGJvdW5kYXJpZXMudG9wICs9IG9mZnNldHMudG9wIC0gb2Zmc2V0cy5tYXJnaW5Ub3A7XG4gICAgICBib3VuZGFyaWVzLmJvdHRvbSA9IGhlaWdodCArIG9mZnNldHMudG9wO1xuICAgICAgYm91bmRhcmllcy5sZWZ0ICs9IG9mZnNldHMubGVmdCAtIG9mZnNldHMubWFyZ2luTGVmdDtcbiAgICAgIGJvdW5kYXJpZXMucmlnaHQgPSB3aWR0aCArIG9mZnNldHMubGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIGFsbCB0aGUgb3RoZXIgRE9NIGVsZW1lbnRzLCB0aGlzIG9uZSBpcyBnb29kXG4gICAgICBib3VuZGFyaWVzID0gb2Zmc2V0cztcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgcGFkZGluZ3NcbiAgYm91bmRhcmllcy5sZWZ0ICs9IHBhZGRpbmc7XG4gIGJvdW5kYXJpZXMudG9wICs9IHBhZGRpbmc7XG4gIGJvdW5kYXJpZXMucmlnaHQgLT0gcGFkZGluZztcbiAgYm91bmRhcmllcy5ib3R0b20gLT0gcGFkZGluZztcblxuICByZXR1cm4gYm91bmRhcmllcztcbn1cblxuZnVuY3Rpb24gZ2V0QXJlYShfcmVmKSB7XG4gIHZhciB3aWR0aCA9IF9yZWYud2lkdGgsXG4gICAgICBoZWlnaHQgPSBfcmVmLmhlaWdodDtcblxuICByZXR1cm4gd2lkdGggKiBoZWlnaHQ7XG59XG5cbi8qKlxuICogVXRpbGl0eSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgYGF1dG9gIHBsYWNlbWVudCB0byB0aGUgcGxhY2VtZW50IHdpdGggbW9yZVxuICogYXZhaWxhYmxlIHNwYWNlLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUF1dG9QbGFjZW1lbnQocGxhY2VtZW50LCByZWZSZWN0LCBwb3BwZXIsIHJlZmVyZW5jZSwgYm91bmRhcmllc0VsZW1lbnQpIHtcbiAgdmFyIHBhZGRpbmcgPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IDA7XG5cbiAgaWYgKHBsYWNlbWVudC5pbmRleE9mKCdhdXRvJykgPT09IC0xKSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgfVxuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhwb3BwZXIsIHJlZmVyZW5jZSwgcGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQpO1xuXG4gIHZhciByZWN0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiByZWZSZWN0LnRvcCAtIGJvdW5kYXJpZXMudG9wXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMucmlnaHQgLSByZWZSZWN0LnJpZ2h0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy53aWR0aCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5ib3R0b20gLSByZWZSZWN0LmJvdHRvbVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgd2lkdGg6IHJlZlJlY3QubGVmdCAtIGJvdW5kYXJpZXMubGVmdCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5oZWlnaHRcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNvcnRlZEFyZWFzID0gT2JqZWN0LmtleXMocmVjdHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgIGtleToga2V5XG4gICAgfSwgcmVjdHNba2V5XSwge1xuICAgICAgYXJlYTogZ2V0QXJlYShyZWN0c1trZXldKVxuICAgIH0pO1xuICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGIuYXJlYSAtIGEuYXJlYTtcbiAgfSk7XG5cbiAgdmFyIGZpbHRlcmVkQXJlYXMgPSBzb3J0ZWRBcmVhcy5maWx0ZXIoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IF9yZWYyLmhlaWdodDtcbiAgICByZXR1cm4gd2lkdGggPj0gcG9wcGVyLmNsaWVudFdpZHRoICYmIGhlaWdodCA+PSBwb3BwZXIuY2xpZW50SGVpZ2h0O1xuICB9KTtcblxuICB2YXIgY29tcHV0ZWRQbGFjZW1lbnQgPSBmaWx0ZXJlZEFyZWFzLmxlbmd0aCA+IDAgPyBmaWx0ZXJlZEFyZWFzWzBdLmtleSA6IHNvcnRlZEFyZWFzWzBdLmtleTtcblxuICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG5cbiAgcmV0dXJuIGNvbXB1dGVkUGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/ICctJyArIHZhcmlhdGlvbiA6ICcnKTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gcmVmZXJlbmNlIC0gdGhlIHJlZmVyZW5jZSBlbGVtZW50ICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7RWxlbWVudH0gZml4ZWRQb3NpdGlvbiAtIGlzIGluIGZpeGVkIHBvc2l0aW9uIG1vZGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFJlZmVyZW5jZU9mZnNldHMoc3RhdGUsIHBvcHBlciwgcmVmZXJlbmNlKSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuXG4gIHZhciBjb21tb25PZmZzZXRQYXJlbnQgPSBmaXhlZFBvc2l0aW9uID8gZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudChwb3BwZXIpIDogZmluZENvbW1vbk9mZnNldFBhcmVudChwb3BwZXIsIHJlZmVyZW5jZSk7XG4gIHJldHVybiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUocmVmZXJlbmNlLCBjb21tb25PZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3V0ZXIgc2l6ZXMgb2YgdGhlIGdpdmVuIGVsZW1lbnQgKG9mZnNldCBzaXplICsgbWFyZ2lucylcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge09iamVjdH0gb2JqZWN0IGNvbnRhaW5pbmcgd2lkdGggYW5kIGhlaWdodCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldE91dGVyU2l6ZXMoZWxlbWVudCkge1xuICB2YXIgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3ApICsgcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luQm90dG9tKTtcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5MZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblJpZ2h0KTtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICB3aWR0aDogZWxlbWVudC5vZmZzZXRXaWR0aCArIHksXG4gICAgaGVpZ2h0OiBlbGVtZW50Lm9mZnNldEhlaWdodCArIHhcbiAgfTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9wcG9zaXRlIHBsYWNlbWVudCBvZiB0aGUgZ2l2ZW4gb25lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBmbGlwcGVkIHBsYWNlbWVudFxuICovXG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgdmFyIGhhc2ggPSB7IGxlZnQ6ICdyaWdodCcsIHJpZ2h0OiAnbGVmdCcsIGJvdHRvbTogJ3RvcCcsIHRvcDogJ2JvdHRvbScgfTtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IG9mZnNldHMgdG8gdGhlIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHBvc2l0aW9uIC0gQ1NTIHBvc2l0aW9uIHRoZSBQb3BwZXIgd2lsbCBnZXQgYXBwbGllZFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyIC0gdGhlIHBvcHBlciBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0cyAtIHRoZSByZWZlcmVuY2Ugb2Zmc2V0cyAodGhlIHBvcHBlciB3aWxsIGJlIHJlbGF0aXZlIHRvIHRoaXMpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhY2VtZW50IC0gb25lIG9mIHRoZSB2YWxpZCBwbGFjZW1lbnQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gcG9wcGVyT2Zmc2V0cyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFBvcHBlck9mZnNldHMocG9wcGVyLCByZWZlcmVuY2VPZmZzZXRzLCBwbGFjZW1lbnQpIHtcbiAgcGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG5cbiAgLy8gR2V0IHBvcHBlciBub2RlIHNpemVzXG4gIHZhciBwb3BwZXJSZWN0ID0gZ2V0T3V0ZXJTaXplcyhwb3BwZXIpO1xuXG4gIC8vIEFkZCBwb3NpdGlvbiwgd2lkdGggYW5kIGhlaWdodCB0byBvdXIgb2Zmc2V0cyBvYmplY3RcbiAgdmFyIHBvcHBlck9mZnNldHMgPSB7XG4gICAgd2lkdGg6IHBvcHBlclJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiBwb3BwZXJSZWN0LmhlaWdodFxuICB9O1xuXG4gIC8vIGRlcGVuZGluZyBieSB0aGUgcG9wcGVyIHBsYWNlbWVudCB3ZSBoYXZlIHRvIGNvbXB1dGUgaXRzIG9mZnNldHMgc2xpZ2h0bHkgZGlmZmVyZW50bHlcbiAgdmFyIGlzSG9yaXogPSBbJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgbWFpblNpZGUgPSBpc0hvcml6ID8gJ3RvcCcgOiAnbGVmdCc7XG4gIHZhciBzZWNvbmRhcnlTaWRlID0gaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnO1xuICB2YXIgbWVhc3VyZW1lbnQgPSBpc0hvcml6ID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICB2YXIgc2Vjb25kYXJ5TWVhc3VyZW1lbnQgPSAhaXNIb3JpeiA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICBwb3BwZXJPZmZzZXRzW21haW5TaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbbWFpblNpZGVdICsgcmVmZXJlbmNlT2Zmc2V0c1ttZWFzdXJlbWVudF0gLyAyIC0gcG9wcGVyUmVjdFttZWFzdXJlbWVudF0gLyAyO1xuICBpZiAocGxhY2VtZW50ID09PSBzZWNvbmRhcnlTaWRlKSB7XG4gICAgcG9wcGVyT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gLSBwb3BwZXJSZWN0W3NlY29uZGFyeU1lYXN1cmVtZW50XTtcbiAgfSBlbHNlIHtcbiAgICBwb3BwZXJPZmZzZXRzW3NlY29uZGFyeVNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1tnZXRPcHBvc2l0ZVBsYWNlbWVudChzZWNvbmRhcnlTaWRlKV07XG4gIH1cblxuICByZXR1cm4gcG9wcGVyT2Zmc2V0cztcbn1cblxuLyoqXG4gKiBNaW1pY3MgdGhlIGBmaW5kYCBtZXRob2Qgb2YgQXJyYXlcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QXJyYXl9IGFyclxuICogQGFyZ3VtZW50IHByb3BcbiAqIEBhcmd1bWVudCB2YWx1ZVxuICogQHJldHVybnMgaW5kZXggb3IgLTFcbiAqL1xuZnVuY3Rpb24gZmluZChhcnIsIGNoZWNrKSB7XG4gIC8vIHVzZSBuYXRpdmUgZmluZCBpZiBzdXBwb3J0ZWRcbiAgaWYgKEFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgcmV0dXJuIGFyci5maW5kKGNoZWNrKTtcbiAgfVxuXG4gIC8vIHVzZSBgZmlsdGVyYCB0byBvYnRhaW4gdGhlIHNhbWUgYmVoYXZpb3Igb2YgYGZpbmRgXG4gIHJldHVybiBhcnIuZmlsdGVyKGNoZWNrKVswXTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBtYXRjaGluZyBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QXJyYXl9IGFyclxuICogQGFyZ3VtZW50IHByb3BcbiAqIEBhcmd1bWVudCB2YWx1ZVxuICogQHJldHVybnMgaW5kZXggb3IgLTFcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgcHJvcCwgdmFsdWUpIHtcbiAgLy8gdXNlIG5hdGl2ZSBmaW5kSW5kZXggaWYgc3VwcG9ydGVkXG4gIGlmIChBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XG4gICAgcmV0dXJuIGFyci5maW5kSW5kZXgoZnVuY3Rpb24gKGN1cikge1xuICAgICAgcmV0dXJuIGN1cltwcm9wXSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyB1c2UgYGZpbmRgICsgYGluZGV4T2ZgIGlmIGBmaW5kSW5kZXhgIGlzbid0IHN1cHBvcnRlZFxuICB2YXIgbWF0Y2ggPSBmaW5kKGFyciwgZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmpbcHJvcF0gPT09IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIGFyci5pbmRleE9mKG1hdGNoKTtcbn1cblxuLyoqXG4gKiBMb29wIHRyb3VnaCB0aGUgbGlzdCBvZiBtb2RpZmllcnMgYW5kIHJ1biB0aGVtIGluIG9yZGVyLFxuICogZWFjaCBvZiB0aGVtIHdpbGwgdGhlbiBlZGl0IHRoZSBkYXRhIG9iamVjdC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5kcyAtIE9wdGlvbmFsIG1vZGlmaWVyIG5hbWUgdXNlZCBhcyBzdG9wcGVyXG4gKiBAcmV0dXJucyB7ZGF0YU9iamVjdH1cbiAqL1xuZnVuY3Rpb24gcnVuTW9kaWZpZXJzKG1vZGlmaWVycywgZGF0YSwgZW5kcykge1xuICB2YXIgbW9kaWZpZXJzVG9SdW4gPSBlbmRzID09PSB1bmRlZmluZWQgPyBtb2RpZmllcnMgOiBtb2RpZmllcnMuc2xpY2UoMCwgZmluZEluZGV4KG1vZGlmaWVycywgJ25hbWUnLCBlbmRzKSk7XG5cbiAgbW9kaWZpZXJzVG9SdW4uZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXJbJ2Z1bmN0aW9uJ10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgICBjb25zb2xlLndhcm4oJ2Btb2RpZmllci5mdW5jdGlvbmAgaXMgZGVwcmVjYXRlZCwgdXNlIGBtb2RpZmllci5mbmAhJyk7XG4gICAgfVxuICAgIHZhciBmbiA9IG1vZGlmaWVyWydmdW5jdGlvbiddIHx8IG1vZGlmaWVyLmZuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgIGlmIChtb2RpZmllci5lbmFibGVkICYmIGlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICAvLyBBZGQgcHJvcGVydGllcyB0byBvZmZzZXRzIHRvIG1ha2UgdGhlbSBhIGNvbXBsZXRlIGNsaWVudFJlY3Qgb2JqZWN0XG4gICAgICAvLyB3ZSBkbyB0aGlzIGJlZm9yZSBlYWNoIG1vZGlmaWVyIHRvIG1ha2Ugc3VyZSB0aGUgcHJldmlvdXMgb25lIGRvZXNuJ3RcbiAgICAgIC8vIG1lc3Mgd2l0aCB0aGVzZSB2YWx1ZXNcbiAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBnZXRDbGllbnRSZWN0KGRhdGEub2Zmc2V0cy5wb3BwZXIpO1xuICAgICAgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSk7XG5cbiAgICAgIGRhdGEgPSBmbihkYXRhLCBtb2RpZmllcik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9wcGVyLCBjb21wdXRpbmcgdGhlIG5ldyBvZmZzZXRzIGFuZCBhcHBseWluZ1xuICogdGhlIG5ldyBzdHlsZS48YnIgLz5cbiAqIFByZWZlciBgc2NoZWR1bGVVcGRhdGVgIG92ZXIgYHVwZGF0ZWAgYmVjYXVzZSBvZiBwZXJmb3JtYW5jZSByZWFzb25zLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIC8vIGlmIHBvcHBlciBpcyBkZXN0cm95ZWQsIGRvbid0IHBlcmZvcm0gYW55IGZ1cnRoZXIgdXBkYXRlXG4gIGlmICh0aGlzLnN0YXRlLmlzRGVzdHJveWVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRhdGEgPSB7XG4gICAgaW5zdGFuY2U6IHRoaXMsXG4gICAgc3R5bGVzOiB7fSxcbiAgICBhcnJvd1N0eWxlczoge30sXG4gICAgYXR0cmlidXRlczoge30sXG4gICAgZmxpcHBlZDogZmFsc2UsXG4gICAgb2Zmc2V0czoge31cbiAgfTtcblxuICAvLyBjb21wdXRlIHJlZmVyZW5jZSBlbGVtZW50IG9mZnNldHNcbiAgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZU9mZnNldHModGhpcy5zdGF0ZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIGRhdGEucGxhY2VtZW50ID0gY29tcHV0ZUF1dG9QbGFjZW1lbnQodGhpcy5vcHRpb25zLnBsYWNlbWVudCwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5wYWRkaW5nKTtcblxuICAvLyBzdG9yZSB0aGUgY29tcHV0ZWQgcGxhY2VtZW50IGluc2lkZSBgb3JpZ2luYWxQbGFjZW1lbnRgXG4gIGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcblxuICBkYXRhLnBvc2l0aW9uRml4ZWQgPSB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZDtcblxuICAvLyBjb21wdXRlIHRoZSBwb3BwZXIgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0UG9wcGVyT2Zmc2V0cyh0aGlzLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIucG9zaXRpb24gPSB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xuXG4gIC8vIHJ1biB0aGUgbW9kaWZpZXJzXG4gIGRhdGEgPSBydW5Nb2RpZmllcnModGhpcy5tb2RpZmllcnMsIGRhdGEpO1xuXG4gIC8vIHRoZSBmaXJzdCBgdXBkYXRlYCB3aWxsIGNhbGwgYG9uQ3JlYXRlYCBjYWxsYmFja1xuICAvLyB0aGUgb3RoZXIgb25lcyB3aWxsIGNhbGwgYG9uVXBkYXRlYCBjYWxsYmFja1xuICBpZiAoIXRoaXMuc3RhdGUuaXNDcmVhdGVkKSB7XG4gICAgdGhpcy5zdGF0ZS5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgIHRoaXMub3B0aW9ucy5vbkNyZWF0ZShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9wdGlvbnMub25VcGRhdGUoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgdXNlZCB0byBrbm93IGlmIHRoZSBnaXZlbiBtb2RpZmllciBpcyBlbmFibGVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTW9kaWZpZXJFbmFibGVkKG1vZGlmaWVycywgbW9kaWZpZXJOYW1lKSB7XG4gIHJldHVybiBtb2RpZmllcnMuc29tZShmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICBlbmFibGVkID0gX3JlZi5lbmFibGVkO1xuICAgIHJldHVybiBlbmFibGVkICYmIG5hbWUgPT09IG1vZGlmaWVyTmFtZTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwcmVmaXhlZCBzdXBwb3J0ZWQgcHJvcGVydHkgbmFtZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHByb3BlcnR5IChjYW1lbENhc2UpXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBwcmVmaXhlZCBwcm9wZXJ0eSAoY2FtZWxDYXNlIG9yIFBhc2NhbENhc2UsIGRlcGVuZGluZyBvbiB0aGUgdmVuZG9yIHByZWZpeClcbiAqL1xuZnVuY3Rpb24gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKHByb3BlcnR5KSB7XG4gIHZhciBwcmVmaXhlcyA9IFtmYWxzZSwgJ21zJywgJ1dlYmtpdCcsICdNb3onLCAnTyddO1xuICB2YXIgdXBwZXJQcm9wID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgIHZhciB0b0NoZWNrID0gcHJlZml4ID8gJycgKyBwcmVmaXggKyB1cHBlclByb3AgOiBwcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuc3R5bGVbdG9DaGVja10gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdG9DaGVjaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogRGVzdHJveSB0aGUgcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gIHRoaXMuc3RhdGUuaXNEZXN0cm95ZWQgPSB0cnVlO1xuXG4gIC8vIHRvdWNoIERPTSBvbmx5IGlmIGBhcHBseVN0eWxlYCBtb2RpZmllciBpcyBlbmFibGVkXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZCh0aGlzLm1vZGlmaWVycywgJ2FwcGx5U3R5bGUnKSkge1xuICAgIHRoaXMucG9wcGVyLnJlbW92ZUF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnKTtcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLnRvcCA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLmxlZnQgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5yaWdodCA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLmJvdHRvbSA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLndpbGxDaGFuZ2UgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZVtnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoJ3RyYW5zZm9ybScpXSA9ICcnO1xuICB9XG5cbiAgdGhpcy5kaXNhYmxlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAvLyByZW1vdmUgdGhlIHBvcHBlciBpZiB1c2VyIGV4cGxpY2l0eSBhc2tlZCBmb3IgdGhlIGRlbGV0aW9uIG9uIGRlc3Ryb3lcbiAgLy8gZG8gbm90IHVzZSBgcmVtb3ZlYCBiZWNhdXNlIElFMTEgZG9lc24ndCBzdXBwb3J0IGl0XG4gIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlT25EZXN0cm95KSB7XG4gICAgdGhpcy5wb3BwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnBvcHBlcik7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogR2V0IHRoZSB3aW5kb3cgYXNzb2NpYXRlZCB3aXRoIHRoZSBlbGVtZW50XG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvdyhlbGVtZW50KSB7XG4gIHZhciBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgOiB3aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGF0dGFjaFRvU2Nyb2xsUGFyZW50cyhzY3JvbGxQYXJlbnQsIGV2ZW50LCBjYWxsYmFjaywgc2Nyb2xsUGFyZW50cykge1xuICB2YXIgaXNCb2R5ID0gc2Nyb2xsUGFyZW50Lm5vZGVOYW1lID09PSAnQk9EWSc7XG4gIHZhciB0YXJnZXQgPSBpc0JvZHkgPyBzY3JvbGxQYXJlbnQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA6IHNjcm9sbFBhcmVudDtcbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgaWYgKCFpc0JvZHkpIHtcbiAgICBhdHRhY2hUb1Njcm9sbFBhcmVudHMoZ2V0U2Nyb2xsUGFyZW50KHRhcmdldC5wYXJlbnROb2RlKSwgZXZlbnQsIGNhbGxiYWNrLCBzY3JvbGxQYXJlbnRzKTtcbiAgfVxuICBzY3JvbGxQYXJlbnRzLnB1c2godGFyZ2V0KTtcbn1cblxuLyoqXG4gKiBTZXR1cCBuZWVkZWQgZXZlbnQgbGlzdGVuZXJzIHVzZWQgdG8gdXBkYXRlIHRoZSBwb3BwZXIgcG9zaXRpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBvcHRpb25zLCBzdGF0ZSwgdXBkYXRlQm91bmQpIHtcbiAgLy8gUmVzaXplIGV2ZW50IGxpc3RlbmVyIG9uIHdpbmRvd1xuICBzdGF0ZS51cGRhdGVCb3VuZCA9IHVwZGF0ZUJvdW5kO1xuICBnZXRXaW5kb3cocmVmZXJlbmNlKS5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzdGF0ZS51cGRhdGVCb3VuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIC8vIFNjcm9sbCBldmVudCBsaXN0ZW5lciBvbiBzY3JvbGwgcGFyZW50c1xuICB2YXIgc2Nyb2xsRWxlbWVudCA9IGdldFNjcm9sbFBhcmVudChyZWZlcmVuY2UpO1xuICBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsRWxlbWVudCwgJ3Njcm9sbCcsIHN0YXRlLnVwZGF0ZUJvdW5kLCBzdGF0ZS5zY3JvbGxQYXJlbnRzKTtcbiAgc3RhdGUuc2Nyb2xsRWxlbWVudCA9IHNjcm9sbEVsZW1lbnQ7XG4gIHN0YXRlLmV2ZW50c0VuYWJsZWQgPSB0cnVlO1xuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBJdCB3aWxsIGFkZCByZXNpemUvc2Nyb2xsIGV2ZW50cyBhbmQgc3RhcnQgcmVjYWxjdWxhdGluZ1xuICogcG9zaXRpb24gb2YgdGhlIHBvcHBlciBlbGVtZW50IHdoZW4gdGhleSBhcmUgdHJpZ2dlcmVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBlbmFibGVFdmVudExpc3RlbmVycygpIHtcbiAgaWYgKCF0aGlzLnN0YXRlLmV2ZW50c0VuYWJsZWQpIHtcbiAgICB0aGlzLnN0YXRlID0gc2V0dXBFdmVudExpc3RlbmVycyh0aGlzLnJlZmVyZW5jZSwgdGhpcy5vcHRpb25zLCB0aGlzLnN0YXRlLCB0aGlzLnNjaGVkdWxlVXBkYXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgdXNlZCB0byB1cGRhdGUgdGhlIHBvcHBlciBwb3NpdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBzdGF0ZSkge1xuICAvLyBSZW1vdmUgcmVzaXplIGV2ZW50IGxpc3RlbmVyIG9uIHdpbmRvd1xuICBnZXRXaW5kb3cocmVmZXJlbmNlKS5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzdGF0ZS51cGRhdGVCb3VuZCk7XG5cbiAgLy8gUmVtb3ZlIHNjcm9sbCBldmVudCBsaXN0ZW5lciBvbiBzY3JvbGwgcGFyZW50c1xuICBzdGF0ZS5zY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzdGF0ZS51cGRhdGVCb3VuZCk7XG4gIH0pO1xuXG4gIC8vIFJlc2V0IHN0YXRlXG4gIHN0YXRlLnVwZGF0ZUJvdW5kID0gbnVsbDtcbiAgc3RhdGUuc2Nyb2xsUGFyZW50cyA9IFtdO1xuICBzdGF0ZS5zY3JvbGxFbGVtZW50ID0gbnVsbDtcbiAgc3RhdGUuZXZlbnRzRW5hYmxlZCA9IGZhbHNlO1xuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogSXQgd2lsbCByZW1vdmUgcmVzaXplL3Njcm9sbCBldmVudHMgYW5kIHdvbid0IHJlY2FsY3VsYXRlIHBvcHBlciBwb3NpdGlvblxuICogd2hlbiB0aGV5IGFyZSB0cmlnZ2VyZWQuIEl0IGFsc28gd29uJ3QgdHJpZ2dlciBvblVwZGF0ZSBjYWxsYmFjayBhbnltb3JlLFxuICogdW5sZXNzIHlvdSBjYWxsIGB1cGRhdGVgIG1ldGhvZCBtYW51YWxseS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAodGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGEgZ2l2ZW4gaW5wdXQgaXMgYSBudW1iZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiBuICE9PSAnJyAmJiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbi8qKlxuICogU2V0IHRoZSBzdHlsZSB0byB0aGUgZ2l2ZW4gcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIGFwcGx5IHRoZSBzdHlsZSB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdW5pdCA9ICcnO1xuICAgIC8vIGFkZCB1bml0IGlmIHRoZSB2YWx1ZSBpcyBudW1lcmljIGFuZCBpcyBvbmUgb2YgdGhlIGZvbGxvd2luZ1xuICAgIGlmIChbJ3dpZHRoJywgJ2hlaWdodCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5pbmRleE9mKHByb3ApICE9PSAtMSAmJiBpc051bWVyaWMoc3R5bGVzW3Byb3BdKSkge1xuICAgICAgdW5pdCA9ICdweCc7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF0gKyB1bml0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGdpdmVuIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byBhcHBseSB0aGUgYXR0cmlidXRlcyB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJpYnV0ZXNbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuc3R5bGVzIC0gTGlzdCBvZiBzdHlsZSBwcm9wZXJ0aWVzIC0gdmFsdWVzIHRvIGFwcGx5IHRvIHBvcHBlciBlbGVtZW50XG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YS5hdHRyaWJ1dGVzIC0gTGlzdCBvZiBhdHRyaWJ1dGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIHNhbWUgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZShkYXRhKSB7XG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLnN0eWxlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIGluIHRoaXMgd2F5IHdlIGNhbiBtYWtlIHRoZSAzcmQgcGFydHkgbW9kaWZpZXJzIGFkZCBjdXN0b20gc3R5bGVzIHRvIGl0XG4gIC8vIEJlIGF3YXJlLCBtb2RpZmllcnMgY291bGQgb3ZlcnJpZGUgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGUgcHJldmlvdXNcbiAgLy8gbGluZXMgb2YgdGhpcyBtb2RpZmllciFcbiAgc2V0U3R5bGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLnN0eWxlcyk7XG5cbiAgLy8gYW55IHByb3BlcnR5IHByZXNlbnQgaW4gYGRhdGEuYXR0cmlidXRlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIHRoZXkgd2lsbCBiZSBzZXQgYXMgSFRNTCBhdHRyaWJ1dGVzIG9mIHRoZSBlbGVtZW50XG4gIHNldEF0dHJpYnV0ZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuYXR0cmlidXRlcyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGRlZmluZWQgYW5kIGFycm93U3R5bGVzIGhhcyBzb21lIHByb3BlcnRpZXNcbiAgaWYgKGRhdGEuYXJyb3dFbGVtZW50ICYmIE9iamVjdC5rZXlzKGRhdGEuYXJyb3dTdHlsZXMpLmxlbmd0aCkge1xuICAgIHNldFN0eWxlcyhkYXRhLmFycm93RWxlbWVudCwgZGF0YS5hcnJvd1N0eWxlcyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHgtcGxhY2VtZW50IGF0dHJpYnV0ZSBiZWZvcmUgZXZlcnl0aGluZyBlbHNlIGJlY2F1c2UgaXQgY291bGQgYmUgdXNlZFxuICogdG8gYWRkIG1hcmdpbnMgdG8gdGhlIHBvcHBlciBtYXJnaW5zIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgdG8gZ2V0IHRoZVxuICogY29ycmVjdCBwb3BwZXIgb2Zmc2V0cy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIubW9kaWZpZXJzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFBvcHBlci5qcyBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFwcGx5U3R5bGVPbkxvYWQocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgc3RhdGUpIHtcbiAgLy8gY29tcHV0ZSByZWZlcmVuY2UgZWxlbWVudCBvZmZzZXRzXG4gIHZhciByZWZlcmVuY2VPZmZzZXRzID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHZhciBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChvcHRpb25zLnBsYWNlbWVudCwgcmVmZXJlbmNlT2Zmc2V0cywgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAucGFkZGluZyk7XG5cbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnLCBwbGFjZW1lbnQpO1xuXG4gIC8vIEFwcGx5IGBwb3NpdGlvbmAgdG8gcG9wcGVyIGJlZm9yZSBhbnl0aGluZyBlbHNlIGJlY2F1c2VcbiAgLy8gd2l0aG91dCB0aGUgcG9zaXRpb24gYXBwbGllZCB3ZSBjYW4ndCBndWFyYW50ZWUgY29ycmVjdCBjb21wdXRhdGlvbnNcbiAgc2V0U3R5bGVzKHBvcHBlciwgeyBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScgfSk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZShkYXRhLCBvcHRpb25zKSB7XG4gIHZhciB4ID0gb3B0aW9ucy54LFxuICAgICAgeSA9IG9wdGlvbnMueTtcbiAgdmFyIHBvcHBlciA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG5cbiAgLy8gUmVtb3ZlIHRoaXMgbGVnYWN5IHN1cHBvcnQgaW4gUG9wcGVyLmpzIHYyXG5cbiAgdmFyIGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiA9IGZpbmQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSAnYXBwbHlTdHlsZSc7XG4gIH0pLmdwdUFjY2VsZXJhdGlvbjtcbiAgaWYgKGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBgZ3B1QWNjZWxlcmF0aW9uYCBvcHRpb24gbW92ZWQgdG8gYGNvbXB1dGVTdHlsZWAgbW9kaWZpZXIgYW5kIHdpbGwgbm90IGJlIHN1cHBvcnRlZCBpbiBmdXR1cmUgdmVyc2lvbnMgb2YgUG9wcGVyLmpzIScpO1xuICB9XG4gIHZhciBncHVBY2NlbGVyYXRpb24gPSBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gIT09IHVuZGVmaW5lZCA/IGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiA6IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uO1xuXG4gIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuICB2YXIgb2Zmc2V0UGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChvZmZzZXRQYXJlbnQpO1xuXG4gIC8vIFN0eWxlc1xuICB2YXIgc3R5bGVzID0ge1xuICAgIHBvc2l0aW9uOiBwb3BwZXIucG9zaXRpb25cbiAgfTtcblxuICAvLyBBdm9pZCBibHVycnkgdGV4dCBieSB1c2luZyBmdWxsIHBpeGVsIGludGVnZXJzLlxuICAvLyBGb3IgcGl4ZWwtcGVyZmVjdCBwb3NpdGlvbmluZywgdG9wL2JvdHRvbSBwcmVmZXJzIHJvdW5kZWRcbiAgLy8gdmFsdWVzLCB3aGlsZSBsZWZ0L3JpZ2h0IHByZWZlcnMgZmxvb3JlZCB2YWx1ZXMuXG4gIHZhciBvZmZzZXRzID0ge1xuICAgIGxlZnQ6IE1hdGguZmxvb3IocG9wcGVyLmxlZnQpLFxuICAgIHRvcDogTWF0aC5yb3VuZChwb3BwZXIudG9wKSxcbiAgICBib3R0b206IE1hdGgucm91bmQocG9wcGVyLmJvdHRvbSksXG4gICAgcmlnaHQ6IE1hdGguZmxvb3IocG9wcGVyLnJpZ2h0KVxuICB9O1xuXG4gIHZhciBzaWRlQSA9IHggPT09ICdib3R0b20nID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgdmFyIHNpZGVCID0geSA9PT0gJ3JpZ2h0JyA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cbiAgLy8gaWYgZ3B1QWNjZWxlcmF0aW9uIGlzIHNldCB0byBgdHJ1ZWAgYW5kIHRyYW5zZm9ybSBpcyBzdXBwb3J0ZWQsXG4gIC8vICB3ZSB1c2UgYHRyYW5zbGF0ZTNkYCB0byBhcHBseSB0aGUgcG9zaXRpb24gdG8gdGhlIHBvcHBlciB3ZVxuICAvLyBhdXRvbWF0aWNhbGx5IHVzZSB0aGUgc3VwcG9ydGVkIHByZWZpeGVkIHZlcnNpb24gaWYgbmVlZGVkXG4gIHZhciBwcmVmaXhlZFByb3BlcnR5ID0gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKTtcblxuICAvLyBub3csIGxldCdzIG1ha2UgYSBzdGVwIGJhY2sgYW5kIGxvb2sgYXQgdGhpcyBjb2RlIGNsb3NlbHkgKHd0Zj8pXG4gIC8vIElmIHRoZSBjb250ZW50IG9mIHRoZSBwb3BwZXIgZ3Jvd3Mgb25jZSBpdCdzIGJlZW4gcG9zaXRpb25lZCwgaXRcbiAgLy8gbWF5IGhhcHBlbiB0aGF0IHRoZSBwb3BwZXIgZ2V0cyBtaXNwbGFjZWQgYmVjYXVzZSBvZiB0aGUgbmV3IGNvbnRlbnRcbiAgLy8gb3ZlcmZsb3dpbmcgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRvIGF2b2lkIHRoaXMgcHJvYmxlbSwgd2UgcHJvdmlkZSB0d28gb3B0aW9ucyAoeCBhbmQgeSksIHdoaWNoIGFsbG93XG4gIC8vIHRoZSBjb25zdW1lciB0byBkZWZpbmUgdGhlIG9mZnNldCBvcmlnaW4uXG4gIC8vIElmIHdlIHBvc2l0aW9uIGEgcG9wcGVyIG9uIHRvcCBvZiBhIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSBjYW4gc2V0XG4gIC8vIGB4YCB0byBgdG9wYCB0byBtYWtlIHRoZSBwb3BwZXIgZ3JvdyB0b3dhcmRzIGl0cyB0b3AgaW5zdGVhZCBvZlxuICAvLyBpdHMgYm90dG9tLlxuICB2YXIgbGVmdCA9IHZvaWQgMCxcbiAgICAgIHRvcCA9IHZvaWQgMDtcbiAgaWYgKHNpZGVBID09PSAnYm90dG9tJykge1xuICAgIHRvcCA9IC1vZmZzZXRQYXJlbnRSZWN0LmhlaWdodCArIG9mZnNldHMuYm90dG9tO1xuICB9IGVsc2Uge1xuICAgIHRvcCA9IG9mZnNldHMudG9wO1xuICB9XG4gIGlmIChzaWRlQiA9PT0gJ3JpZ2h0Jykge1xuICAgIGxlZnQgPSAtb2Zmc2V0UGFyZW50UmVjdC53aWR0aCArIG9mZnNldHMucmlnaHQ7XG4gIH0gZWxzZSB7XG4gICAgbGVmdCA9IG9mZnNldHMubGVmdDtcbiAgfVxuICBpZiAoZ3B1QWNjZWxlcmF0aW9uICYmIHByZWZpeGVkUHJvcGVydHkpIHtcbiAgICBzdHlsZXNbcHJlZml4ZWRQcm9wZXJ0eV0gPSAndHJhbnNsYXRlM2QoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgsIDApJztcbiAgICBzdHlsZXNbc2lkZUFdID0gMDtcbiAgICBzdHlsZXNbc2lkZUJdID0gMDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9ICd0cmFuc2Zvcm0nO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aHdlcmlzZSwgd2UgdXNlIHRoZSBzdGFuZGFyZCBgdG9wYCwgYGxlZnRgLCBgYm90dG9tYCBhbmQgYHJpZ2h0YCBwcm9wZXJ0aWVzXG4gICAgdmFyIGludmVydFRvcCA9IHNpZGVBID09PSAnYm90dG9tJyA/IC0xIDogMTtcbiAgICB2YXIgaW52ZXJ0TGVmdCA9IHNpZGVCID09PSAncmlnaHQnID8gLTEgOiAxO1xuICAgIHN0eWxlc1tzaWRlQV0gPSB0b3AgKiBpbnZlcnRUb3A7XG4gICAgc3R5bGVzW3NpZGVCXSA9IGxlZnQgKiBpbnZlcnRMZWZ0O1xuICAgIHN0eWxlcy53aWxsQ2hhbmdlID0gc2lkZUEgKyAnLCAnICsgc2lkZUI7XG4gIH1cblxuICAvLyBBdHRyaWJ1dGVzXG4gIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICd4LXBsYWNlbWVudCc6IGRhdGEucGxhY2VtZW50XG4gIH07XG5cbiAgLy8gVXBkYXRlIGBkYXRhYCBhdHRyaWJ1dGVzLCBzdHlsZXMgYW5kIGFycm93U3R5bGVzXG4gIGRhdGEuYXR0cmlidXRlcyA9IF9leHRlbmRzKHt9LCBhdHRyaWJ1dGVzLCBkYXRhLmF0dHJpYnV0ZXMpO1xuICBkYXRhLnN0eWxlcyA9IF9leHRlbmRzKHt9LCBzdHlsZXMsIGRhdGEuc3R5bGVzKTtcbiAgZGF0YS5hcnJvd1N0eWxlcyA9IF9leHRlbmRzKHt9LCBkYXRhLm9mZnNldHMuYXJyb3csIGRhdGEuYXJyb3dTdHlsZXMpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEhlbHBlciB1c2VkIHRvIGtub3cgaWYgdGhlIGdpdmVuIG1vZGlmaWVyIGRlcGVuZHMgZnJvbSBhbm90aGVyIG9uZS48YnIgLz5cbiAqIEl0IGNoZWNrcyBpZiB0aGUgbmVlZGVkIG1vZGlmaWVyIGlzIGxpc3RlZCBhbmQgZW5hYmxlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVycyAtIGxpc3Qgb2YgbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdGluZ05hbWUgLSBuYW1lIG9mIHJlcXVlc3RpbmcgbW9kaWZpZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0ZWROYW1lIC0gbmFtZSBvZiByZXF1ZXN0ZWQgbW9kaWZpZXJcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc01vZGlmaWVyUmVxdWlyZWQobW9kaWZpZXJzLCByZXF1ZXN0aW5nTmFtZSwgcmVxdWVzdGVkTmFtZSkge1xuICB2YXIgcmVxdWVzdGluZyA9IGZpbmQobW9kaWZpZXJzLCBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBuYW1lID0gX3JlZi5uYW1lO1xuICAgIHJldHVybiBuYW1lID09PSByZXF1ZXN0aW5nTmFtZTtcbiAgfSk7XG5cbiAgdmFyIGlzUmVxdWlyZWQgPSAhIXJlcXVlc3RpbmcgJiYgbW9kaWZpZXJzLnNvbWUoZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyLm5hbWUgPT09IHJlcXVlc3RlZE5hbWUgJiYgbW9kaWZpZXIuZW5hYmxlZCAmJiBtb2RpZmllci5vcmRlciA8IHJlcXVlc3Rpbmcub3JkZXI7XG4gIH0pO1xuXG4gIGlmICghaXNSZXF1aXJlZCkge1xuICAgIHZhciBfcmVxdWVzdGluZyA9ICdgJyArIHJlcXVlc3RpbmdOYW1lICsgJ2AnO1xuICAgIHZhciByZXF1ZXN0ZWQgPSAnYCcgKyByZXF1ZXN0ZWROYW1lICsgJ2AnO1xuICAgIGNvbnNvbGUud2FybihyZXF1ZXN0ZWQgKyAnIG1vZGlmaWVyIGlzIHJlcXVpcmVkIGJ5ICcgKyBfcmVxdWVzdGluZyArICcgbW9kaWZpZXIgaW4gb3JkZXIgdG8gd29yaywgYmUgc3VyZSB0byBpbmNsdWRlIGl0IGJlZm9yZSAnICsgX3JlcXVlc3RpbmcgKyAnIScpO1xuICB9XG4gIHJldHVybiBpc1JlcXVpcmVkO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gYXJyb3coZGF0YSwgb3B0aW9ucykge1xuICB2YXIgX2RhdGEkb2Zmc2V0cyRhcnJvdztcblxuICAvLyBhcnJvdyBkZXBlbmRzIG9uIGtlZXBUb2dldGhlciBpbiBvcmRlciB0byB3b3JrXG4gIGlmICghaXNNb2RpZmllclJlcXVpcmVkKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCAnYXJyb3cnLCAna2VlcFRvZ2V0aGVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciBhcnJvd0VsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQ7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGEgc3RyaW5nLCBzdXBwb3NlIGl0J3MgYSBDU1Mgc2VsZWN0b3JcbiAgaWYgKHR5cGVvZiBhcnJvd0VsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgYXJyb3dFbGVtZW50ID0gZGF0YS5pbnN0YW5jZS5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIG5vdCBmb3VuZCwgZG9uJ3QgcnVuIHRoZSBtb2RpZmllclxuICAgIGlmICghYXJyb3dFbGVtZW50KSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgdGhlIGFycm93RWxlbWVudCBpc24ndCBhIHF1ZXJ5IHNlbGVjdG9yIHdlIG11c3QgY2hlY2sgdGhhdCB0aGVcbiAgICAvLyBwcm92aWRlZCBET00gbm9kZSBpcyBjaGlsZCBvZiBpdHMgcG9wcGVyIG5vZGVcbiAgICBpZiAoIWRhdGEuaW5zdGFuY2UucG9wcGVyLmNvbnRhaW5zKGFycm93RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogYGFycm93LmVsZW1lbnRgIG11c3QgYmUgY2hpbGQgb2YgaXRzIHBvcHBlciBlbGVtZW50IScpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgaXNWZXJ0aWNhbCA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIHZhciBzaWRlQ2FwaXRhbGl6ZWQgPSBpc1ZlcnRpY2FsID8gJ1RvcCcgOiAnTGVmdCc7XG4gIHZhciBzaWRlID0gc2lkZUNhcGl0YWxpemVkLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBhbHRTaWRlID0gaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xuICB2YXIgb3BTaWRlID0gaXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ3JpZ2h0JztcbiAgdmFyIGFycm93RWxlbWVudFNpemUgPSBnZXRPdXRlclNpemVzKGFycm93RWxlbWVudClbbGVuXTtcblxuICAvL1xuICAvLyBleHRlbmRzIGtlZXBUb2dldGhlciBiZWhhdmlvciBtYWtpbmcgc3VyZSB0aGUgcG9wcGVyIGFuZCBpdHNcbiAgLy8gcmVmZXJlbmNlIGhhdmUgZW5vdWdoIHBpeGVscyBpbiBjb25qdWN0aW9uXG4gIC8vXG5cbiAgLy8gdG9wL2xlZnQgc2lkZVxuICBpZiAocmVmZXJlbmNlW29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplIDwgcG9wcGVyW3NpZGVdKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSAtPSBwb3BwZXJbc2lkZV0gLSAocmVmZXJlbmNlW29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplKTtcbiAgfVxuICAvLyBib3R0b20vcmlnaHQgc2lkZVxuICBpZiAocmVmZXJlbmNlW3NpZGVdICsgYXJyb3dFbGVtZW50U2l6ZSA+IHBvcHBlcltvcFNpZGVdKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSArPSByZWZlcmVuY2Vbc2lkZV0gKyBhcnJvd0VsZW1lbnRTaXplIC0gcG9wcGVyW29wU2lkZV07XG4gIH1cbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnBvcHBlcik7XG5cbiAgLy8gY29tcHV0ZSBjZW50ZXIgb2YgdGhlIHBvcHBlclxuICB2YXIgY2VudGVyID0gcmVmZXJlbmNlW3NpZGVdICsgcmVmZXJlbmNlW2xlbl0gLyAyIC0gYXJyb3dFbGVtZW50U2l6ZSAvIDI7XG5cbiAgLy8gQ29tcHV0ZSB0aGUgc2lkZVZhbHVlIHVzaW5nIHRoZSB1cGRhdGVkIHBvcHBlciBvZmZzZXRzXG4gIC8vIHRha2UgcG9wcGVyIG1hcmdpbiBpbiBhY2NvdW50IGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSB0aGlzIGluZm8gYXZhaWxhYmxlXG4gIHZhciBjc3MgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuICB2YXIgcG9wcGVyTWFyZ2luU2lkZSA9IHBhcnNlRmxvYXQoY3NzWydtYXJnaW4nICsgc2lkZUNhcGl0YWxpemVkXSwgMTApO1xuICB2YXIgcG9wcGVyQm9yZGVyU2lkZSA9IHBhcnNlRmxvYXQoY3NzWydib3JkZXInICsgc2lkZUNhcGl0YWxpemVkICsgJ1dpZHRoJ10sIDEwKTtcbiAgdmFyIHNpZGVWYWx1ZSA9IGNlbnRlciAtIGRhdGEub2Zmc2V0cy5wb3BwZXJbc2lkZV0gLSBwb3BwZXJNYXJnaW5TaWRlIC0gcG9wcGVyQm9yZGVyU2lkZTtcblxuICAvLyBwcmV2ZW50IGFycm93RWxlbWVudCBmcm9tIGJlaW5nIHBsYWNlZCBub3QgY29udGlndW91c2x5IHRvIGl0cyBwb3BwZXJcbiAgc2lkZVZhbHVlID0gTWF0aC5tYXgoTWF0aC5taW4ocG9wcGVyW2xlbl0gLSBhcnJvd0VsZW1lbnRTaXplLCBzaWRlVmFsdWUpLCAwKTtcblxuICBkYXRhLmFycm93RWxlbWVudCA9IGFycm93RWxlbWVudDtcbiAgZGF0YS5vZmZzZXRzLmFycm93ID0gKF9kYXRhJG9mZnNldHMkYXJyb3cgPSB7fSwgZGVmaW5lUHJvcGVydHkoX2RhdGEkb2Zmc2V0cyRhcnJvdywgc2lkZSwgTWF0aC5yb3VuZChzaWRlVmFsdWUpKSwgZGVmaW5lUHJvcGVydHkoX2RhdGEkb2Zmc2V0cyRhcnJvdywgYWx0U2lkZSwgJycpLCBfZGF0YSRvZmZzZXRzJGFycm93KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9wcG9zaXRlIHBsYWNlbWVudCB2YXJpYXRpb24gb2YgdGhlIGdpdmVuIG9uZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHBsYWNlbWVudCB2YXJpYXRpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9IGZsaXBwZWQgcGxhY2VtZW50IHZhcmlhdGlvblxuICovXG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvbih2YXJpYXRpb24pIHtcbiAgaWYgKHZhcmlhdGlvbiA9PT0gJ2VuZCcpIHtcbiAgICByZXR1cm4gJ3N0YXJ0JztcbiAgfSBlbHNlIGlmICh2YXJpYXRpb24gPT09ICdzdGFydCcpIHtcbiAgICByZXR1cm4gJ2VuZCc7XG4gIH1cbiAgcmV0dXJuIHZhcmlhdGlvbjtcbn1cblxuLyoqXG4gKiBMaXN0IG9mIGFjY2VwdGVkIHBsYWNlbWVudHMgdG8gdXNlIGFzIHZhbHVlcyBvZiB0aGUgYHBsYWNlbWVudGAgb3B0aW9uLjxiciAvPlxuICogVmFsaWQgcGxhY2VtZW50cyBhcmU6XG4gKiAtIGBhdXRvYFxuICogLSBgdG9wYFxuICogLSBgcmlnaHRgXG4gKiAtIGBib3R0b21gXG4gKiAtIGBsZWZ0YFxuICpcbiAqIEVhY2ggcGxhY2VtZW50IGNhbiBoYXZlIGEgdmFyaWF0aW9uIGZyb20gdGhpcyBsaXN0OlxuICogLSBgLXN0YXJ0YFxuICogLSBgLWVuZGBcbiAqXG4gKiBWYXJpYXRpb25zIGFyZSBpbnRlcnByZXRlZCBlYXNpbHkgaWYgeW91IHRoaW5rIG9mIHRoZW0gYXMgdGhlIGxlZnQgdG8gcmlnaHRcbiAqIHdyaXR0ZW4gbGFuZ3VhZ2VzLiBIb3Jpem9udGFsbHkgKGB0b3BgIGFuZCBgYm90dG9tYCksIGBzdGFydGAgaXMgbGVmdCBhbmQgYGVuZGBcbiAqIGlzIHJpZ2h0LjxiciAvPlxuICogVmVydGljYWxseSAoYGxlZnRgIGFuZCBgcmlnaHRgKSwgYHN0YXJ0YCBpcyB0b3AgYW5kIGBlbmRgIGlzIGJvdHRvbS5cbiAqXG4gKiBTb21lIHZhbGlkIGV4YW1wbGVzIGFyZTpcbiAqIC0gYHRvcC1lbmRgIChvbiB0b3Agb2YgcmVmZXJlbmNlLCByaWdodCBhbGlnbmVkKVxuICogLSBgcmlnaHQtc3RhcnRgIChvbiByaWdodCBvZiByZWZlcmVuY2UsIHRvcCBhbGlnbmVkKVxuICogLSBgYm90dG9tYCAob24gYm90dG9tLCBjZW50ZXJlZClcbiAqIC0gYGF1dG8tcmlnaHRgIChvbiB0aGUgc2lkZSB3aXRoIG1vcmUgc3BhY2UgYXZhaWxhYmxlLCBhbGlnbm1lbnQgZGVwZW5kcyBieSBwbGFjZW1lbnQpXG4gKlxuICogQHN0YXRpY1xuICogQHR5cGUge0FycmF5fVxuICogQGVudW0ge1N0cmluZ31cbiAqIEByZWFkb25seVxuICogQG1ldGhvZCBwbGFjZW1lbnRzXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBwbGFjZW1lbnRzID0gWydhdXRvLXN0YXJ0JywgJ2F1dG8nLCAnYXV0by1lbmQnLCAndG9wLXN0YXJ0JywgJ3RvcCcsICd0b3AtZW5kJywgJ3JpZ2h0LXN0YXJ0JywgJ3JpZ2h0JywgJ3JpZ2h0LWVuZCcsICdib3R0b20tZW5kJywgJ2JvdHRvbScsICdib3R0b20tc3RhcnQnLCAnbGVmdC1lbmQnLCAnbGVmdCcsICdsZWZ0LXN0YXJ0J107XG5cbi8vIEdldCByaWQgb2YgYGF1dG9gIGBhdXRvLXN0YXJ0YCBhbmQgYGF1dG8tZW5kYFxudmFyIHZhbGlkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuc2xpY2UoMyk7XG5cbi8qKlxuICogR2l2ZW4gYW4gaW5pdGlhbCBwbGFjZW1lbnQsIHJldHVybnMgYWxsIHRoZSBzdWJzZXF1ZW50IHBsYWNlbWVudHNcbiAqIGNsb2Nrd2lzZSAob3IgY291bnRlci1jbG9ja3dpc2UpLlxuICpcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnQgLSBBIHZhbGlkIHBsYWNlbWVudCAoaXQgYWNjZXB0cyB2YXJpYXRpb25zKVxuICogQGFyZ3VtZW50IHtCb29sZWFufSBjb3VudGVyIC0gU2V0IHRvIHRydWUgdG8gd2FsayB0aGUgcGxhY2VtZW50cyBjb3VudGVyY2xvY2t3aXNlXG4gKiBAcmV0dXJucyB7QXJyYXl9IHBsYWNlbWVudHMgaW5jbHVkaW5nIHRoZWlyIHZhcmlhdGlvbnNcbiAqL1xuZnVuY3Rpb24gY2xvY2t3aXNlKHBsYWNlbWVudCkge1xuICB2YXIgY291bnRlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGluZGV4ID0gdmFsaWRQbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KTtcbiAgdmFyIGFyciA9IHZhbGlkUGxhY2VtZW50cy5zbGljZShpbmRleCArIDEpLmNvbmNhdCh2YWxpZFBsYWNlbWVudHMuc2xpY2UoMCwgaW5kZXgpKTtcbiAgcmV0dXJuIGNvdW50ZXIgPyBhcnIucmV2ZXJzZSgpIDogYXJyO1xufVxuXG52YXIgQkVIQVZJT1JTID0ge1xuICBGTElQOiAnZmxpcCcsXG4gIENMT0NLV0lTRTogJ2Nsb2Nrd2lzZScsXG4gIENPVU5URVJDTE9DS1dJU0U6ICdjb3VudGVyY2xvY2t3aXNlJ1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZGF0YSwgb3B0aW9ucykge1xuICAvLyBpZiBgaW5uZXJgIG1vZGlmaWVyIGlzIGVuYWJsZWQsIHdlIGNhbid0IHVzZSB0aGUgYGZsaXBgIG1vZGlmaWVyXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2lubmVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlmIChkYXRhLmZsaXBwZWQgJiYgZGF0YS5wbGFjZW1lbnQgPT09IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQpIHtcbiAgICAvLyBzZWVtcyBsaWtlIGZsaXAgaXMgdHJ5aW5nIHRvIGxvb3AsIHByb2JhYmx5IHRoZXJlJ3Mgbm90IGVub3VnaCBzcGFjZSBvbiBhbnkgb2YgdGhlIGZsaXBwYWJsZSBzaWRlc1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSwgb3B0aW9ucy5wYWRkaW5nLCBvcHRpb25zLmJvdW5kYXJpZXNFbGVtZW50LCBkYXRhLnBvc2l0aW9uRml4ZWQpO1xuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVsxXSB8fCAnJztcblxuICB2YXIgZmxpcE9yZGVyID0gW107XG5cbiAgc3dpdGNoIChvcHRpb25zLmJlaGF2aW9yKSB7XG4gICAgY2FzZSBCRUhBVklPUlMuRkxJUDpcbiAgICAgIGZsaXBPcmRlciA9IFtwbGFjZW1lbnQsIHBsYWNlbWVudE9wcG9zaXRlXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCRUhBVklPUlMuQ09VTlRFUkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGZsaXBPcmRlciA9IG9wdGlvbnMuYmVoYXZpb3I7XG4gIH1cblxuICBmbGlwT3JkZXIuZm9yRWFjaChmdW5jdGlvbiAoc3RlcCwgaW5kZXgpIHtcbiAgICBpZiAocGxhY2VtZW50ICE9PSBzdGVwIHx8IGZsaXBPcmRlci5sZW5ndGggPT09IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgICBwbGFjZW1lbnRPcHBvc2l0ZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG4gICAgdmFyIHJlZk9mZnNldHMgPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlO1xuXG4gICAgLy8gdXNpbmcgZmxvb3IgYmVjYXVzZSB0aGUgcmVmZXJlbmNlIG9mZnNldHMgbWF5IGNvbnRhaW4gZGVjaW1hbHMgd2UgYXJlIG5vdCBnb2luZyB0byBjb25zaWRlciBoZXJlXG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgb3ZlcmxhcHNSZWYgPSBwbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLnJpZ2h0KSA+IGZsb29yKHJlZk9mZnNldHMubGVmdCkgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihyZWZPZmZzZXRzLnJpZ2h0KSB8fCBwbGFjZW1lbnQgPT09ICd0b3AnICYmIGZsb29yKHBvcHBlck9mZnNldHMuYm90dG9tKSA+IGZsb29yKHJlZk9mZnNldHMudG9wKSB8fCBwbGFjZW1lbnQgPT09ICdib3R0b20nICYmIGZsb29yKHBvcHBlck9mZnNldHMudG9wKSA8IGZsb29yKHJlZk9mZnNldHMuYm90dG9tKTtcblxuICAgIHZhciBvdmVyZmxvd3NMZWZ0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5sZWZ0KSA8IGZsb29yKGJvdW5kYXJpZXMubGVmdCk7XG4gICAgdmFyIG92ZXJmbG93c1JpZ2h0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihib3VuZGFyaWVzLnJpZ2h0KTtcbiAgICB2YXIgb3ZlcmZsb3dzVG9wID0gZmxvb3IocG9wcGVyT2Zmc2V0cy50b3ApIDwgZmxvb3IoYm91bmRhcmllcy50b3ApO1xuICAgIHZhciBvdmVyZmxvd3NCb3R0b20gPSBmbG9vcihwb3BwZXJPZmZzZXRzLmJvdHRvbSkgPiBmbG9vcihib3VuZGFyaWVzLmJvdHRvbSk7XG5cbiAgICB2YXIgb3ZlcmZsb3dzQm91bmRhcmllcyA9IHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIG92ZXJmbG93c1JpZ2h0IHx8IHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgb3ZlcmZsb3dzVG9wIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgb3ZlcmZsb3dzQm90dG9tO1xuXG4gICAgLy8gZmxpcCB0aGUgdmFyaWF0aW9uIGlmIHJlcXVpcmVkXG4gICAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICAgIHZhciBmbGlwcGVkVmFyaWF0aW9uID0gISFvcHRpb25zLmZsaXBWYXJpYXRpb25zICYmIChpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ3N0YXJ0JyAmJiBvdmVyZmxvd3NMZWZ0IHx8IGlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnZW5kJyAmJiBvdmVyZmxvd3NSaWdodCB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzVG9wIHx8ICFpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2VuZCcgJiYgb3ZlcmZsb3dzQm90dG9tKTtcblxuICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzIHx8IGZsaXBwZWRWYXJpYXRpb24pIHtcbiAgICAgIC8vIHRoaXMgYm9vbGVhbiB0byBkZXRlY3QgYW55IGZsaXAgbG9vcFxuICAgICAgZGF0YS5mbGlwcGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKG92ZXJsYXBzUmVmIHx8IG92ZXJmbG93c0JvdW5kYXJpZXMpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gZmxpcE9yZGVyW2luZGV4ICsgMV07XG4gICAgICB9XG5cbiAgICAgIGlmIChmbGlwcGVkVmFyaWF0aW9uKSB7XG4gICAgICAgIHZhcmlhdGlvbiA9IGdldE9wcG9zaXRlVmFyaWF0aW9uKHZhcmlhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGRhdGEucGxhY2VtZW50ID0gcGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/ICctJyArIHZhcmlhdGlvbiA6ICcnKTtcblxuICAgICAgLy8gdGhpcyBvYmplY3QgY29udGFpbnMgYHBvc2l0aW9uYCwgd2Ugd2FudCB0byBwcmVzZXJ2ZSBpdCBhbG9uZyB3aXRoXG4gICAgICAvLyBhbnkgYWRkaXRpb25hbCBwcm9wZXJ0eSB3ZSBtYXkgYWRkIGluIHRoZSBmdXR1cmVcbiAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBfZXh0ZW5kcyh7fSwgZGF0YS5vZmZzZXRzLnBvcHBlciwgZ2V0UG9wcGVyT2Zmc2V0cyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpKTtcblxuICAgICAgZGF0YSA9IHJ1bk1vZGlmaWVycyhkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZGF0YSwgJ2ZsaXAnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGtlZXBUb2dldGhlcihkYXRhKSB7XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgc2lkZSA9IGlzVmVydGljYWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gIHZhciBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG5cbiAgaWYgKHBvcHBlcltzaWRlXSA8IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSAtIHBvcHBlclttZWFzdXJlbWVudF07XG4gIH1cbiAgaWYgKHBvcHBlcltvcFNpZGVdID4gZmxvb3IocmVmZXJlbmNlW3NpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtzaWRlXSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBjb250YWluaW5nIHZhbHVlICsgdW5pdCBpbnRvIGEgcHggdmFsdWUgbnVtYmVyXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiB7bW9kaWZpZXJzfm9mZnNldH1cbiAqIEBwcml2YXRlXG4gKiBAYXJndW1lbnQge1N0cmluZ30gc3RyIC0gVmFsdWUgKyB1bml0IHN0cmluZ1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IG1lYXN1cmVtZW50IC0gYGhlaWdodGAgb3IgYHdpZHRoYFxuICogQGFyZ3VtZW50IHtPYmplY3R9IHBvcHBlck9mZnNldHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzXG4gKiBAcmV0dXJucyB7TnVtYmVyfFN0cmluZ31cbiAqIFZhbHVlIGluIHBpeGVscywgb3Igb3JpZ2luYWwgc3RyaW5nIGlmIG5vIHZhbHVlcyB3ZXJlIGV4dHJhY3RlZFxuICovXG5mdW5jdGlvbiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpIHtcbiAgLy8gc2VwYXJhdGUgdmFsdWUgZnJvbSB1bml0XG4gIHZhciBzcGxpdCA9IHN0ci5tYXRjaCgvKCg/OlxcLXxcXCspP1xcZCpcXC4/XFxkKikoLiopLyk7XG4gIHZhciB2YWx1ZSA9ICtzcGxpdFsxXTtcbiAgdmFyIHVuaXQgPSBzcGxpdFsyXTtcblxuICAvLyBJZiBpdCdzIG5vdCBhIG51bWJlciBpdCdzIGFuIG9wZXJhdG9yLCBJIGd1ZXNzXG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgaWYgKHVuaXQuaW5kZXhPZignJScpID09PSAwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICBjYXNlICclcCc6XG4gICAgICAgIGVsZW1lbnQgPSBwb3BwZXJPZmZzZXRzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyUnOlxuICAgICAgY2FzZSAnJXInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZWxlbWVudCA9IHJlZmVyZW5jZU9mZnNldHM7XG4gICAgfVxuXG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0KGVsZW1lbnQpO1xuICAgIHJldHVybiByZWN0W21lYXN1cmVtZW50XSAvIDEwMCAqIHZhbHVlO1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICd2aCcgfHwgdW5pdCA9PT0gJ3Z3Jykge1xuICAgIC8vIGlmIGlzIGEgdmggb3IgdncsIHdlIGNhbGN1bGF0ZSB0aGUgc2l6ZSBiYXNlZCBvbiB0aGUgdmlld3BvcnRcbiAgICB2YXIgc2l6ZSA9IHZvaWQgMDtcbiAgICBpZiAodW5pdCA9PT0gJ3ZoJykge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgfVxuICAgIHJldHVybiBzaXplIC8gMTAwICogdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgaXMgYW4gZXhwbGljaXQgcGl4ZWwgdW5pdCwgd2UgZ2V0IHJpZCBvZiB0aGUgdW5pdCBhbmQga2VlcCB0aGUgdmFsdWVcbiAgICAvLyBpZiBpcyBhbiBpbXBsaWNpdCB1bml0LCBpdCdzIHB4LCBhbmQgd2UgcmV0dXJuIGp1c3QgdGhlIHZhbHVlXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogUGFyc2UgYW4gYG9mZnNldGAgc3RyaW5nIHRvIGV4dHJhcG9sYXRlIGB4YCBhbmQgYHlgIG51bWVyaWMgb2Zmc2V0cy5cbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBvZmZzZXRcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzXG4gKiBAYXJndW1lbnQge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IGJhc2VQbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX0gYSB0d28gY2VsbHMgYXJyYXkgd2l0aCB4IGFuZCB5IG9mZnNldHMgaW4gbnVtYmVyc1xuICovXG5mdW5jdGlvbiBwYXJzZU9mZnNldChvZmZzZXQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMsIGJhc2VQbGFjZW1lbnQpIHtcbiAgdmFyIG9mZnNldHMgPSBbMCwgMF07XG5cbiAgLy8gVXNlIGhlaWdodCBpZiBwbGFjZW1lbnQgaXMgbGVmdCBvciByaWdodCBhbmQgaW5kZXggaXMgMCBvdGhlcndpc2UgdXNlIHdpZHRoXG4gIC8vIGluIHRoaXMgd2F5IHRoZSBmaXJzdCBvZmZzZXQgd2lsbCB1c2UgYW4gYXhpcyBhbmQgdGhlIHNlY29uZCBvbmVcbiAgLy8gd2lsbCB1c2UgdGhlIG90aGVyIG9uZVxuICB2YXIgdXNlSGVpZ2h0ID0gWydyaWdodCcsICdsZWZ0J10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgLy8gU3BsaXQgdGhlIG9mZnNldCBzdHJpbmcgdG8gb2J0YWluIGEgbGlzdCBvZiB2YWx1ZXMgYW5kIG9wZXJhbmRzXG4gIC8vIFRoZSByZWdleCBhZGRyZXNzZXMgdmFsdWVzIHdpdGggdGhlIHBsdXMgb3IgbWludXMgc2lnbiBpbiBmcm9udCAoKzEwLCAtMjAsIGV0YylcbiAgdmFyIGZyYWdtZW50cyA9IG9mZnNldC5zcGxpdCgvKFxcK3xcXC0pLykubWFwKGZ1bmN0aW9uIChmcmFnKSB7XG4gICAgcmV0dXJuIGZyYWcudHJpbSgpO1xuICB9KTtcblxuICAvLyBEZXRlY3QgaWYgdGhlIG9mZnNldCBzdHJpbmcgY29udGFpbnMgYSBwYWlyIG9mIHZhbHVlcyBvciBhIHNpbmdsZSBvbmVcbiAgLy8gdGhleSBjb3VsZCBiZSBzZXBhcmF0ZWQgYnkgY29tbWEgb3Igc3BhY2VcbiAgdmFyIGRpdmlkZXIgPSBmcmFnbWVudHMuaW5kZXhPZihmaW5kKGZyYWdtZW50cywgZnVuY3Rpb24gKGZyYWcpIHtcbiAgICByZXR1cm4gZnJhZy5zZWFyY2goLyx8XFxzLykgIT09IC0xO1xuICB9KSk7XG5cbiAgaWYgKGZyYWdtZW50c1tkaXZpZGVyXSAmJiBmcmFnbWVudHNbZGl2aWRlcl0uaW5kZXhPZignLCcpID09PSAtMSkge1xuICAgIGNvbnNvbGUud2FybignT2Zmc2V0cyBzZXBhcmF0ZWQgYnkgd2hpdGUgc3BhY2UocykgYXJlIGRlcHJlY2F0ZWQsIHVzZSBhIGNvbW1hICgsKSBpbnN0ZWFkLicpO1xuICB9XG5cbiAgLy8gSWYgZGl2aWRlciBpcyBmb3VuZCwgd2UgZGl2aWRlIHRoZSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHMgdG8gZGl2aWRlXG4gIC8vIHRoZW0gYnkgb2ZzZXQgWCBhbmQgWS5cbiAgdmFyIHNwbGl0UmVnZXggPSAvXFxzKixcXHMqfFxccysvO1xuICB2YXIgb3BzID0gZGl2aWRlciAhPT0gLTEgPyBbZnJhZ21lbnRzLnNsaWNlKDAsIGRpdmlkZXIpLmNvbmNhdChbZnJhZ21lbnRzW2RpdmlkZXJdLnNwbGl0KHNwbGl0UmVnZXgpWzBdXSksIFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMV1dLmNvbmNhdChmcmFnbWVudHMuc2xpY2UoZGl2aWRlciArIDEpKV0gOiBbZnJhZ21lbnRzXTtcblxuICAvLyBDb252ZXJ0IHRoZSB2YWx1ZXMgd2l0aCB1bml0cyB0byBhYnNvbHV0ZSBwaXhlbHMgdG8gYWxsb3cgb3VyIGNvbXB1dGF0aW9uc1xuICBvcHMgPSBvcHMubWFwKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICAvLyBNb3N0IG9mIHRoZSB1bml0cyByZWx5IG9uIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcG9wcGVyXG4gICAgdmFyIG1lYXN1cmVtZW50ID0gKGluZGV4ID09PSAxID8gIXVzZUhlaWdodCA6IHVzZUhlaWdodCkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG1lcmdlV2l0aFByZXZpb3VzID0gZmFsc2U7XG4gICAgcmV0dXJuIG9wXG4gICAgLy8gVGhpcyBhZ2dyZWdhdGVzIGFueSBgK2Agb3IgYC1gIHNpZ24gdGhhdCBhcmVuJ3QgY29uc2lkZXJlZCBvcGVyYXRvcnNcbiAgICAvLyBlLmcuOiAxMCArICs1ID0+IFsxMCwgKywgKzVdXG4gICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGFbYS5sZW5ndGggLSAxXSA9PT0gJycgJiYgWycrJywgJy0nXS5pbmRleE9mKGIpICE9PSAtMSkge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IHRydWU7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSBlbHNlIGlmIChtZXJnZVdpdGhQcmV2aW91cykge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gKz0gYjtcbiAgICAgICAgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgICB9XG4gICAgfSwgW10pXG4gICAgLy8gSGVyZSB3ZSBjb252ZXJ0IHRoZSBzdHJpbmcgdmFsdWVzIGludG8gbnVtYmVyIHZhbHVlcyAoaW4gcHgpXG4gICAgLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gdG9WYWx1ZShzdHIsIG1lYXN1cmVtZW50LCBwb3BwZXJPZmZzZXRzLCByZWZlcmVuY2VPZmZzZXRzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gTG9vcCB0cm91Z2ggdGhlIG9mZnNldHMgYXJyYXlzIGFuZCBleGVjdXRlIHRoZSBvcGVyYXRpb25zXG4gIG9wcy5mb3JFYWNoKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICBvcC5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnLCBpbmRleDIpIHtcbiAgICAgIGlmIChpc051bWVyaWMoZnJhZykpIHtcbiAgICAgICAgb2Zmc2V0c1tpbmRleF0gKz0gZnJhZyAqIChvcFtpbmRleDIgLSAxXSA9PT0gJy0nID8gLTEgOiAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEBhcmd1bWVudCB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MFxuICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIG9mZnNldChkYXRhLCBfcmVmKSB7XG4gIHZhciBvZmZzZXQgPSBfcmVmLm9mZnNldDtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LFxuICAgICAgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICB2YXIgb2Zmc2V0cyA9IHZvaWQgMDtcbiAgaWYgKGlzTnVtZXJpYygrb2Zmc2V0KSkge1xuICAgIG9mZnNldHMgPSBbK29mZnNldCwgMF07XG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0cyA9IHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyLCByZWZlcmVuY2UsIGJhc2VQbGFjZW1lbnQpO1xuICB9XG5cbiAgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1sxXTtcbiAgfSBlbHNlIGlmIChiYXNlUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgIHBvcHBlci5sZWZ0ICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLnRvcCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMV07XG4gIH1cblxuICBkYXRhLnBvcHBlciA9IHBvcHBlcjtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhLCBvcHRpb25zKSB7XG4gIHZhciBib3VuZGFyaWVzRWxlbWVudCA9IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnQgfHwgZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcblxuICAvLyBJZiBvZmZzZXRQYXJlbnQgaXMgdGhlIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSByZWFsbHkgd2FudCB0b1xuICAvLyBnbyBvbmUgc3RlcCB1cCBhbmQgdXNlIHRoZSBuZXh0IG9mZnNldFBhcmVudCBhcyByZWZlcmVuY2UgdG9cbiAgLy8gYXZvaWQgdG8gbWFrZSB0aGlzIG1vZGlmaWVyIGNvbXBsZXRlbHkgdXNlbGVzcyBhbmQgbG9vayBsaWtlIGJyb2tlblxuICBpZiAoZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UgPT09IGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgYm91bmRhcmllc0VsZW1lbnQgPSBnZXRPZmZzZXRQYXJlbnQoYm91bmRhcmllc0VsZW1lbnQpO1xuICB9XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc2V0cyB0aGUgcG9wcGVyJ3MgcG9zaXRpb24gc28gdGhhdCB0aGUgZG9jdW1lbnQgc2l6ZSBjYW4gYmUgY2FsY3VsYXRlZCBleGNsdWRpbmdcbiAgLy8gdGhlIHNpemUgb2YgdGhlIHBvcHBlciBlbGVtZW50IGl0c2VsZlxuICB2YXIgdHJhbnNmb3JtUHJvcCA9IGdldFN1cHBvcnRlZFByb3BlcnR5TmFtZSgndHJhbnNmb3JtJyk7XG4gIHZhciBwb3BwZXJTdHlsZXMgPSBkYXRhLmluc3RhbmNlLnBvcHBlci5zdHlsZTsgLy8gYXNzaWdubWVudCB0byBoZWxwIG1pbmlmaWNhdGlvblxuICB2YXIgdG9wID0gcG9wcGVyU3R5bGVzLnRvcCxcbiAgICAgIGxlZnQgPSBwb3BwZXJTdHlsZXMubGVmdCxcbiAgICAgIHRyYW5zZm9ybSA9IHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXTtcblxuICBwb3BwZXJTdHlsZXMudG9wID0gJyc7XG4gIHBvcHBlclN0eWxlcy5sZWZ0ID0gJyc7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9ICcnO1xuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UsIG9wdGlvbnMucGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQsIGRhdGEucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc3RvcmVzIHRoZSBvcmlnaW5hbCBzdHlsZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSBvZmZzZXRzIGhhdmUgYmVlbiBjb21wdXRlZFxuICBwb3BwZXJTdHlsZXMudG9wID0gdG9wO1xuICBwb3BwZXJTdHlsZXMubGVmdCA9IGxlZnQ7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcblxuICBvcHRpb25zLmJvdW5kYXJpZXMgPSBib3VuZGFyaWVzO1xuXG4gIHZhciBvcmRlciA9IG9wdGlvbnMucHJpb3JpdHk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIHZhciBjaGVjayA9IHtcbiAgICBwcmltYXJ5OiBmdW5jdGlvbiBwcmltYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIHZhbHVlID0gcG9wcGVyW3BsYWNlbWVudF07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPCBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWF4KHBvcHBlcltwbGFjZW1lbnRdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCBwbGFjZW1lbnQsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNlY29uZGFyeTogZnVuY3Rpb24gc2Vjb25kYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIG1haW5TaWRlID0gcGxhY2VtZW50ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgICB2YXIgdmFsdWUgPSBwb3BwZXJbbWFpblNpZGVdO1xuICAgICAgaWYgKHBvcHBlcltwbGFjZW1lbnRdID4gYm91bmRhcmllc1twbGFjZW1lbnRdICYmICFvcHRpb25zLmVzY2FwZVdpdGhSZWZlcmVuY2UpIHtcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihwb3BwZXJbbWFpblNpZGVdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0gLSAocGxhY2VtZW50ID09PSAncmlnaHQnID8gcG9wcGVyLndpZHRoIDogcG9wcGVyLmhlaWdodCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCBtYWluU2lkZSwgdmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBvcmRlci5mb3JFYWNoKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICB2YXIgc2lkZSA9IFsnbGVmdCcsICd0b3AnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xID8gJ3ByaW1hcnknIDogJ3NlY29uZGFyeSc7XG4gICAgcG9wcGVyID0gX2V4dGVuZHMoe30sIHBvcHBlciwgY2hlY2tbc2lkZV0ocGxhY2VtZW50KSk7XG4gIH0pO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBwb3BwZXI7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHNoaWZ0KGRhdGEpIHtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgc2hpZnR2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICAvLyBpZiBzaGlmdCBzaGlmdHZhcmlhdGlvbiBpcyBzcGVjaWZpZWQsIHJ1biB0aGUgbW9kaWZpZXJcbiAgaWYgKHNoaWZ0dmFyaWF0aW9uKSB7XG4gICAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlLFxuICAgICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcjtcblxuICAgIHZhciBpc1ZlcnRpY2FsID0gWydib3R0b20nLCAndG9wJ10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG4gICAgdmFyIHNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICAgIHZhciBzaGlmdE9mZnNldHMgPSB7XG4gICAgICBzdGFydDogZGVmaW5lUHJvcGVydHkoe30sIHNpZGUsIHJlZmVyZW5jZVtzaWRlXSksXG4gICAgICBlbmQ6IGRlZmluZVByb3BlcnR5KHt9LCBzaWRlLCByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbWVhc3VyZW1lbnRdIC0gcG9wcGVyW21lYXN1cmVtZW50XSlcbiAgICB9O1xuXG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IF9leHRlbmRzKHt9LCBwb3BwZXIsIHNoaWZ0T2Zmc2V0c1tzaGlmdHZhcmlhdGlvbl0pO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBoaWRlKGRhdGEpIHtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdoaWRlJywgJ3ByZXZlbnRPdmVyZmxvdycpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgcmVmUmVjdCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciBib3VuZCA9IGZpbmQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSAncHJldmVudE92ZXJmbG93JztcbiAgfSkuYm91bmRhcmllcztcblxuICBpZiAocmVmUmVjdC5ib3R0b20gPCBib3VuZC50b3AgfHwgcmVmUmVjdC5sZWZ0ID4gYm91bmQucmlnaHQgfHwgcmVmUmVjdC50b3AgPiBib3VuZC5ib3R0b20gfHwgcmVmUmVjdC5yaWdodCA8IGJvdW5kLmxlZnQpIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBkYXRhLmhpZGUgPSB0cnVlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gQXZvaWQgdW5uZWNlc3NhcnkgRE9NIGFjY2VzcyBpZiB2aXNpYmlsaXR5IGhhc24ndCBjaGFuZ2VkXG4gICAgaWYgKGRhdGEuaGlkZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IGZhbHNlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gaW5uZXIoZGF0YSkge1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgaXNIb3JpeiA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBzdWJ0cmFjdExlbmd0aCA9IFsndG9wJywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID09PSAtMTtcblxuICBwb3BwZXJbaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnXSA9IHJlZmVyZW5jZVtiYXNlUGxhY2VtZW50XSAtIChzdWJ0cmFjdExlbmd0aCA/IHBvcHBlcltpc0hvcml6ID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA6IDApO1xuXG4gIGRhdGEucGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QocG9wcGVyKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBNb2RpZmllciBmdW5jdGlvbiwgZWFjaCBtb2RpZmllciBjYW4gaGF2ZSBhIGZ1bmN0aW9uIG9mIHRoaXMgdHlwZSBhc3NpZ25lZFxuICogdG8gaXRzIGBmbmAgcHJvcGVydHkuPGJyIC8+XG4gKiBUaGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQgb24gZWFjaCB1cGRhdGUsIHRoaXMgbWVhbnMgdGhhdCB5b3UgbXVzdFxuICogbWFrZSBzdXJlIHRoZXkgYXJlIHBlcmZvcm1hbnQgZW5vdWdoIHRvIGF2b2lkIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tzLlxuICpcbiAqIEBmdW5jdGlvbiBNb2RpZmllckZuXG4gKiBAYXJndW1lbnQge2RhdGFPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge2RhdGFPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuXG4vKipcbiAqIE1vZGlmaWVycyBhcmUgcGx1Z2lucyB1c2VkIHRvIGFsdGVyIHRoZSBiZWhhdmlvciBvZiB5b3VyIHBvcHBlcnMuPGJyIC8+XG4gKiBQb3BwZXIuanMgdXNlcyBhIHNldCBvZiA5IG1vZGlmaWVycyB0byBwcm92aWRlIGFsbCB0aGUgYmFzaWMgZnVuY3Rpb25hbGl0aWVzXG4gKiBuZWVkZWQgYnkgdGhlIGxpYnJhcnkuXG4gKlxuICogVXN1YWxseSB5b3UgZG9uJ3Qgd2FudCB0byBvdmVycmlkZSB0aGUgYG9yZGVyYCwgYGZuYCBhbmQgYG9uTG9hZGAgcHJvcHMuXG4gKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgYXJlIGNvbmZpZ3VyYXRpb25zIHRoYXQgY291bGQgYmUgdHdlYWtlZC5cbiAqIEBuYW1lc3BhY2UgbW9kaWZpZXJzXG4gKi9cbnZhciBtb2RpZmllcnMgPSB7XG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIHNoaWZ0IHRoZSBwb3BwZXIgb24gdGhlIHN0YXJ0IG9yIGVuZCBvZiBpdHMgcmVmZXJlbmNlXG4gICAqIGVsZW1lbnQuPGJyIC8+XG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgdmFyaWF0aW9uIG9mIHRoZSBgcGxhY2VtZW50YCBwcm9wZXJ0eS48YnIgLz5cbiAgICogSXQgY2FuIGJlIG9uZSBlaXRoZXIgYC1lbmRgIG9yIGAtc3RhcnRgLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgc2hpZnQ6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAxMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBzaGlmdFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgYG9mZnNldGAgbW9kaWZpZXIgY2FuIHNoaWZ0IHlvdXIgcG9wcGVyIG9uIGJvdGggaXRzIGF4aXMuXG4gICAqXG4gICAqIEl0IGFjY2VwdHMgdGhlIGZvbGxvd2luZyB1bml0czpcbiAgICogLSBgcHhgIG9yIHVuaXRsZXNzLCBpbnRlcnByZXRlZCBhcyBwaXhlbHNcbiAgICogLSBgJWAgb3IgYCVyYCwgcGVyY2VudGFnZSByZWxhdGl2ZSB0byB0aGUgbGVuZ3RoIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICAgKiAtIGAlcGAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcG9wcGVyIGVsZW1lbnRcbiAgICogLSBgdndgLCBDU1Mgdmlld3BvcnQgd2lkdGggdW5pdFxuICAgKiAtIGB2aGAsIENTUyB2aWV3cG9ydCBoZWlnaHQgdW5pdFxuICAgKlxuICAgKiBGb3IgbGVuZ3RoIGlzIGludGVuZGVkIHRoZSBtYWluIGF4aXMgcmVsYXRpdmUgdG8gdGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wcGVyLjxiciAvPlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgdGhlIHBsYWNlbWVudCBpcyBgdG9wYCBvciBgYm90dG9tYCwgdGhlIGxlbmd0aCB3aWxsIGJlIHRoZVxuICAgKiBgd2lkdGhgLiBJbiBjYXNlIG9mIGBsZWZ0YCBvciBgcmlnaHRgLCBpdCB3aWxsIGJlIHRoZSBoZWlnaHQuXG4gICAqXG4gICAqIFlvdSBjYW4gcHJvdmlkZSBhIHNpbmdsZSB2YWx1ZSAoYXMgYE51bWJlcmAgb3IgYFN0cmluZ2ApLCBvciBhIHBhaXIgb2YgdmFsdWVzXG4gICAqIGFzIGBTdHJpbmdgIGRpdmlkZWQgYnkgYSBjb21tYSBvciBvbmUgKG9yIG1vcmUpIHdoaXRlIHNwYWNlcy48YnIgLz5cbiAgICogVGhlIGxhdHRlciBpcyBhIGRlcHJlY2F0ZWQgbWV0aG9kIGJlY2F1c2UgaXQgbGVhZHMgdG8gY29uZnVzaW9uIGFuZCB3aWxsIGJlXG4gICAqIHJlbW92ZWQgaW4gdjIuPGJyIC8+XG4gICAqIEFkZGl0aW9uYWxseSwgaXQgYWNjZXB0cyBhZGRpdGlvbnMgYW5kIHN1YnRyYWN0aW9ucyBiZXR3ZWVuIGRpZmZlcmVudCB1bml0cy5cbiAgICogTm90ZSB0aGF0IG11bHRpcGxpY2F0aW9ucyBhbmQgZGl2aXNpb25zIGFyZW4ndCBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIFZhbGlkIGV4YW1wbGVzIGFyZTpcbiAgICogYGBgXG4gICAqIDEwXG4gICAqICcxMCUnXG4gICAqICcxMCwgMTAnXG4gICAqICcxMCUsIDEwJ1xuICAgKiAnMTAgKyAxMCUnXG4gICAqICcxMCAtIDV2aCArIDMlJ1xuICAgKiAnLTEwcHggKyA1dmgsIDVweCAtIDYlJ1xuICAgKiBgYGBcbiAgICogPiAqKk5CKio6IElmIHlvdSBkZXNpcmUgdG8gYXBwbHkgb2Zmc2V0cyB0byB5b3VyIHBvcHBlcnMgaW4gYSB3YXkgdGhhdCBtYXkgbWFrZSB0aGVtIG92ZXJsYXBcbiAgICogPiB3aXRoIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50LCB1bmZvcnR1bmF0ZWx5LCB5b3Ugd2lsbCBoYXZlIHRvIGRpc2FibGUgdGhlIGBmbGlwYCBtb2RpZmllci5cbiAgICogPiBNb3JlIG9uIHRoaXMgW3JlYWRpbmcgdGhpcyBpc3N1ZV0oaHR0cHM6Ly9naXRodWIuY29tL0ZlelZyYXN0YS9wb3BwZXIuanMvaXNzdWVzLzM3MylcbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIG9mZnNldDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0yMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDIwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IG9mZnNldCxcbiAgICAvKiogQHByb3Age051bWJlcnxTdHJpbmd9IG9mZnNldD0wXG4gICAgICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gICAgICovXG4gICAgb2Zmc2V0OiAwXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gcHJldmVudCB0aGUgcG9wcGVyIGZyb20gYmVpbmcgcG9zaXRpb25lZCBvdXRzaWRlIHRoZSBib3VuZGFyeS5cbiAgICpcbiAgICogQW4gc2NlbmFyaW8gZXhpc3RzIHdoZXJlIHRoZSByZWZlcmVuY2UgaXRzZWxmIGlzIG5vdCB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuPGJyIC8+XG4gICAqIFdlIGNhbiBzYXkgaXQgaGFzIFwiZXNjYXBlZCB0aGUgYm91bmRhcmllc1wiIOKAlCBvciBqdXN0IFwiZXNjYXBlZFwiLjxiciAvPlxuICAgKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBkZWNpZGUgd2hldGhlciB0aGUgcG9wcGVyIHNob3VsZCBlaXRoZXI6XG4gICAqXG4gICAqIC0gZGV0YWNoIGZyb20gdGhlIHJlZmVyZW5jZSBhbmQgcmVtYWluIFwidHJhcHBlZFwiIGluIHRoZSBib3VuZGFyaWVzLCBvclxuICAgKiAtIGlmIGl0IHNob3VsZCBpZ25vcmUgdGhlIGJvdW5kYXJ5IGFuZCBcImVzY2FwZSB3aXRoIGl0cyByZWZlcmVuY2VcIlxuICAgKlxuICAgKiBXaGVuIGBlc2NhcGVXaXRoUmVmZXJlbmNlYCBpcyBzZXQgdG9gdHJ1ZWAgYW5kIHJlZmVyZW5jZSBpcyBjb21wbGV0ZWx5XG4gICAqIG91dHNpZGUgaXRzIGJvdW5kYXJpZXMsIHRoZSBwb3BwZXIgd2lsbCBvdmVyZmxvdyAob3IgY29tcGxldGVseSBsZWF2ZSlcbiAgICogdGhlIGJvdW5kYXJpZXMgaW4gb3JkZXIgdG8gcmVtYWluIGF0dGFjaGVkIHRvIHRoZSBlZGdlIG9mIHRoZSByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MzAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAzMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBwcmV2ZW50T3ZlcmZsb3csXG4gICAgLyoqXG4gICAgICogQHByb3Age0FycmF5fSBbcHJpb3JpdHk9WydsZWZ0JywncmlnaHQnLCd0b3AnLCdib3R0b20nXV1cbiAgICAgKiBQb3BwZXIgd2lsbCB0cnkgdG8gcHJldmVudCBvdmVyZmxvdyBmb2xsb3dpbmcgdGhlc2UgcHJpb3JpdGllcyBieSBkZWZhdWx0LFxuICAgICAqIHRoZW4sIGl0IGNvdWxkIG92ZXJmbG93IG9uIHRoZSBsZWZ0IGFuZCBvbiB0b3Agb2YgdGhlIGBib3VuZGFyaWVzRWxlbWVudGBcbiAgICAgKi9cbiAgICBwcmlvcml0eTogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBBbW91bnQgb2YgcGl4ZWwgdXNlZCB0byBkZWZpbmUgYSBtaW5pbXVtIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgKiBhbmQgdGhlIHBvcHBlciB0aGlzIG1ha2VzIHN1cmUgdGhlIHBvcHBlciBoYXMgYWx3YXlzIGEgbGl0dGxlIHBhZGRpbmdcbiAgICAgKiBiZXR3ZWVuIHRoZSBlZGdlcyBvZiBpdHMgY29udGFpbmVyXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0nc2Nyb2xsUGFyZW50J1xuICAgICAqIEJvdW5kYXJpZXMgdXNlZCBieSB0aGUgbW9kaWZpZXIsIGNhbiBiZSBgc2Nyb2xsUGFyZW50YCwgYHdpbmRvd2AsXG4gICAgICogYHZpZXdwb3J0YCBvciBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICdzY3JvbGxQYXJlbnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSBzdXJlIHRoZSByZWZlcmVuY2UgYW5kIGl0cyBwb3BwZXIgc3RheSBuZWFyIGVhY2hvdGhlcnNcbiAgICogd2l0aG91dCBsZWF2aW5nIGFueSBnYXAgYmV0d2VlbiB0aGUgdHdvLiBFeHBlY2lhbGx5IHVzZWZ1bCB3aGVuIHRoZSBhcnJvdyBpc1xuICAgKiBlbmFibGVkIGFuZCB5b3Ugd2FudCB0byBhc3N1cmUgaXQgdG8gcG9pbnQgdG8gaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBJdCBjYXJlcyBvbmx5IGFib3V0IHRoZSBmaXJzdCBheGlzLCB5b3UgY2FuIHN0aWxsIGhhdmUgcG9wcGVycyB3aXRoIG1hcmdpblxuICAgKiBiZXR3ZWVuIHRoZSBwb3BwZXIgYW5kIGl0cyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGtlZXBUb2dldGhlcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj00MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDQwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGtlZXBUb2dldGhlclxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIG1vZGlmaWVyIGlzIHVzZWQgdG8gbW92ZSB0aGUgYGFycm93RWxlbWVudGAgb2YgdGhlIHBvcHBlciB0byBtYWtlXG4gICAqIHN1cmUgaXQgaXMgcG9zaXRpb25lZCBiZXR3ZWVuIHRoZSByZWZlcmVuY2UgZWxlbWVudCBhbmQgaXRzIHBvcHBlciBlbGVtZW50LlxuICAgKiBJdCB3aWxsIHJlYWQgdGhlIG91dGVyIHNpemUgb2YgdGhlIGBhcnJvd0VsZW1lbnRgIG5vZGUgdG8gZGV0ZWN0IGhvdyBtYW55XG4gICAqIHBpeGVscyBvZiBjb25qdWN0aW9uIGFyZSBuZWVkZWQuXG4gICAqXG4gICAqIEl0IGhhcyBubyBlZmZlY3QgaWYgbm8gYGFycm93RWxlbWVudGAgaXMgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcnJvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj01MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDUwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFycm93LFxuICAgIC8qKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBlbGVtZW50PSdbeC1hcnJvd10nIC0gU2VsZWN0b3Igb3Igbm9kZSB1c2VkIGFzIGFycm93ICovXG4gICAgZWxlbWVudDogJ1t4LWFycm93XSdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBmbGlwIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQgd2hlbiBpdCBzdGFydHMgdG8gb3ZlcmxhcCBpdHNcbiAgICogcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICpcbiAgICogKipOT1RFOioqIHRoaXMgbW9kaWZpZXIgd2lsbCBpbnRlcnJ1cHQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlIGFuZCB3aWxsXG4gICAqIHJlc3RhcnQgaXQgaWYgaXQgZGV0ZWN0cyB0aGUgbmVlZCB0byBmbGlwIHRoZSBwbGFjZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBmbGlwOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTYwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogZmxpcCxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEFycmF5fSBiZWhhdmlvcj0nZmxpcCdcbiAgICAgKiBUaGUgYmVoYXZpb3IgdXNlZCB0byBjaGFuZ2UgdGhlIHBvcHBlcidzIHBsYWNlbWVudC4gSXQgY2FuIGJlIG9uZSBvZlxuICAgICAqIGBmbGlwYCwgYGNsb2Nrd2lzZWAsIGBjb3VudGVyY2xvY2t3aXNlYCBvciBhbiBhcnJheSB3aXRoIGEgbGlzdCBvZiB2YWxpZFxuICAgICAqIHBsYWNlbWVudHMgKHdpdGggb3B0aW9uYWwgdmFyaWF0aW9ucykuXG4gICAgICovXG4gICAgYmVoYXZpb3I6ICdmbGlwJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgZmxpcCBpZiBpdCBoaXRzIHRoZSBlZGdlcyBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHBhZGRpbmc6IDUsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQ9J3ZpZXdwb3J0J1xuICAgICAqIFRoZSBlbGVtZW50IHdoaWNoIHdpbGwgZGVmaW5lIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBwb3BwZXIgcG9zaXRpb24sXG4gICAgICogdGhlIHBvcHBlciB3aWxsIG5ldmVyIGJlIHBsYWNlZCBvdXRzaWRlIG9mIHRoZSBkZWZpbmVkIGJvdW5kYXJpZXNcbiAgICAgKiAoZXhjZXB0IGlmIGtlZXBUb2dldGhlciBpcyBlbmFibGVkKVxuICAgICAqL1xuICAgIGJvdW5kYXJpZXNFbGVtZW50OiAndmlld3BvcnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSB0aGUgcG9wcGVyIGZsb3cgdG93YXJkIHRoZSBpbm5lciBvZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEJ5IGRlZmF1bHQsIHdoZW4gdGhpcyBtb2RpZmllciBpcyBkaXNhYmxlZCwgdGhlIHBvcHBlciB3aWxsIGJlIHBsYWNlZCBvdXRzaWRlXG4gICAqIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGlubmVyOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTcwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNzAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD1mYWxzZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBpbm5lclxuICB9LFxuXG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIGhpZGUgdGhlIHBvcHBlciB3aGVuIGl0cyByZWZlcmVuY2UgZWxlbWVudCBpcyBvdXRzaWRlIG9mIHRoZVxuICAgKiBwb3BwZXIgYm91bmRhcmllcy4gSXQgd2lsbCBzZXQgYSBgeC1vdXQtb2YtYm91bmRhcmllc2AgYXR0cmlidXRlIHdoaWNoIGNhblxuICAgKiBiZSB1c2VkIHRvIGhpZGUgd2l0aCBhIENTUyBzZWxlY3RvciB0aGUgcG9wcGVyIHdoZW4gaXRzIHJlZmVyZW5jZSBpc1xuICAgKiBvdXQgb2YgYm91bmRhcmllcy5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIG1vZGlmaWVyIGJlZm9yZSBpdCBpbiBvcmRlciB0byB3b3JrLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgaGlkZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj04MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDgwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGhpZGVcbiAgfSxcblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHN0eWxlIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIgZWxlbWVudCB0byBnZXRzXG4gICAqIHByb3Blcmx5IHBvc2l0aW9uZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIG1vZGlmaWVyIHdpbGwgbm90IHRvdWNoIHRoZSBET00sIGl0IGp1c3QgcHJlcGFyZXMgdGhlIHN0eWxlc1xuICAgKiBzbyB0aGF0IGBhcHBseVN0eWxlYCBtb2RpZmllciBjYW4gYXBwbHkgaXQuIFRoaXMgc2VwYXJhdGlvbiBpcyB1c2VmdWxcbiAgICogaW4gY2FzZSB5b3UgbmVlZCB0byByZXBsYWNlIGBhcHBseVN0eWxlYCB3aXRoIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1vZGlmaWVyIGhhcyBgODUwYCBhcyBgb3JkZXJgIHZhbHVlIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICogd2l0aCBwcmV2aW91cyB2ZXJzaW9ucyBvZiBQb3BwZXIuanMuIEV4cGVjdCB0aGUgbW9kaWZpZXJzIG9yZGVyaW5nIG1ldGhvZFxuICAgKiB0byBjaGFuZ2UgaW4gZnV0dXJlIG1ham9yIHZlcnNpb25zIG9mIHRoZSBsaWJyYXJ5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgY29tcHV0ZVN0eWxlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTg1MCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogODUwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogY29tcHV0ZVN0eWxlLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtCb29sZWFufSBncHVBY2NlbGVyYXRpb249dHJ1ZVxuICAgICAqIElmIHRydWUsIGl0IHVzZXMgdGhlIENTUyAzZCB0cmFuc2Zvcm1hdGlvbiB0byBwb3NpdGlvbiB0aGUgcG9wcGVyLlxuICAgICAqIE90aGVyd2lzZSwgaXQgd2lsbCB1c2UgdGhlIGB0b3BgIGFuZCBgbGVmdGAgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBncHVBY2NlbGVyYXRpb246IHRydWUsXG4gICAgLyoqXG4gICAgICogQHByb3Age3N0cmluZ30gW3g9J2JvdHRvbSddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBYIGF4aXMgKGBib3R0b21gIG9yIGB0b3BgKS4gQUtBIFggb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgYm90dG9tYFxuICAgICAqL1xuICAgIHg6ICdib3R0b20nLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdsZWZ0J11cbiAgICAgKiBXaGVyZSB0byBhbmNob3IgdGhlIFkgYXhpcyAoYGxlZnRgIG9yIGByaWdodGApLiBBS0EgWSBvZmZzZXQgb3JpZ2luLlxuICAgICAqIENoYW5nZSB0aGlzIGlmIHlvdXIgcG9wcGVyIHNob3VsZCBncm93IGluIGEgZGlyZWN0aW9uIGRpZmZlcmVudCBmcm9tIGByaWdodGBcbiAgICAgKi9cbiAgICB5OiAncmlnaHQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGNvbXB1dGVkIHN0eWxlcyB0byB0aGUgcG9wcGVyIGVsZW1lbnQuXG4gICAqXG4gICAqIEFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgYXJlIGxpbWl0ZWQgdG8gdGhpcyBtb2RpZmllci4gVGhpcyBpcyB1c2VmdWwgaW4gY2FzZVxuICAgKiB5b3Ugd2FudCB0byBpbnRlZ3JhdGUgUG9wcGVyLmpzIGluc2lkZSBhIGZyYW1ld29yayBvciB2aWV3IGxpYnJhcnkgYW5kIHlvdVxuICAgKiB3YW50IHRvIGRlbGVnYXRlIGFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgdG8gaXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB5b3UgZGlzYWJsZSB0aGlzIG1vZGlmaWVyLCB5b3UgbXVzdCBtYWtlIHN1cmUgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIGhhcyBpdHMgcG9zaXRpb24gc2V0IHRvIGBhYnNvbHV0ZWAgYmVmb3JlIFBvcHBlci5qcyBjYW4gZG8gaXRzIHdvcmshXG4gICAqXG4gICAqIEp1c3QgZGlzYWJsZSB0aGlzIG1vZGlmaWVyIGFuZCBkZWZpbmUgeW91IG93biB0byBhY2hpZXZlIHRoZSBkZXNpcmVkIGVmZmVjdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGFwcGx5U3R5bGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9OTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA5MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBhcHBseVN0eWxlLFxuICAgIC8qKiBAcHJvcCB7RnVuY3Rpb259ICovXG4gICAgb25Mb2FkOiBhcHBseVN0eWxlT25Mb2FkLFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS4xMC4wLCB0aGUgcHJvcGVydHkgbW92ZWQgdG8gYGNvbXB1dGVTdHlsZWAgbW9kaWZpZXJcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZ3B1QWNjZWxlcmF0aW9uPXRydWVcbiAgICAgKiBJZiB0cnVlLCBpdCB1c2VzIHRoZSBDU1MgM2QgdHJhbnNmb3JtYXRpb24gdG8gcG9zaXRpb24gdGhlIHBvcHBlci5cbiAgICAgKiBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB1bmRlZmluZWRcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYGRhdGFPYmplY3RgIGlzIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb25zIHVzZWQgYnkgUG9wcGVyLmpzXG4gKiB0aGlzIG9iamVjdCBnZXQgcGFzc2VkIHRvIG1vZGlmaWVycyBhbmQgdG8gdGhlIGBvbkNyZWF0ZWAgYW5kIGBvblVwZGF0ZWAgY2FsbGJhY2tzLlxuICogQG5hbWUgZGF0YU9iamVjdFxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuaW5zdGFuY2UgVGhlIFBvcHBlci5qcyBpbnN0YW5jZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEucGxhY2VtZW50IFBsYWNlbWVudCBhcHBsaWVkIHRvIHBvcHBlclxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgUGxhY2VtZW50IG9yaWdpbmFsbHkgZGVmaW5lZCBvbiBpbml0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRhdGEuZmxpcHBlZCBUcnVlIGlmIHBvcHBlciBoYXMgYmVlbiBmbGlwcGVkIGJ5IGZsaXAgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5oaWRlIFRydWUgaWYgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dCBvZiBib3VuZGFyaWVzLCB1c2VmdWwgdG8ga25vdyB3aGVuIHRvIGhpZGUgdGhlIHBvcHBlci5cbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGEuYXJyb3dFbGVtZW50IE5vZGUgdXNlZCBhcyBhcnJvdyBieSBhcnJvdyBtb2RpZmllclxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuc3R5bGVzIEFueSBDU1MgcHJvcGVydHkgZGVmaW5lZCBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLCBpdCBleHBlY3RzIHRoZSBKYXZhU2NyaXB0IG5vbWVuY2xhdHVyZSAoZWcuIGBtYXJnaW5Cb3R0b21gKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuYXJyb3dTdHlsZXMgQW55IENTUyBwcm9wZXJ0eSBkZWZpbmVkIGhlcmUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIgYXJyb3csIGl0IGV4cGVjdHMgdGhlIEphdmFTY3JpcHQgbm9tZW5jbGF0dXJlIChlZy4gYG1hcmdpbkJvdHRvbWApXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5ib3VuZGFyaWVzIE9mZnNldHMgb2YgdGhlIHBvcHBlciBib3VuZGFyaWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzIFRoZSBtZWFzdXJlbWVudHMgb2YgcG9wcGVyLCByZWZlcmVuY2UgYW5kIGFycm93IGVsZW1lbnRzLlxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5wb3BwZXIgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSBgdG9wYCwgYGxlZnRgLCBgd2lkdGhgLCBgaGVpZ2h0YCB2YWx1ZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMuYXJyb3ddIGB0b3BgIGFuZCBgbGVmdGAgb2Zmc2V0cywgb25seSBvbmUgb2YgdGhlbSB3aWxsIGJlIGRpZmZlcmVudCBmcm9tIDBcbiAqL1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBwcm92aWRlZCB0byBQb3BwZXIuanMgY29uc3RydWN0b3IuPGJyIC8+XG4gKiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGVuIHVzaW5nIHRoZSBgb3B0aW9uc2AgYXJndW1lbnQgb2YgUG9wcGVyLmpzLjxiciAvPlxuICogVG8gb3ZlcnJpZGUgYW4gb3B0aW9uLCBzaW1wbHkgcGFzcyBhcyAzcmQgYXJndW1lbnQgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWVcbiAqIHN0cnVjdHVyZSBvZiB0aGlzIG9iamVjdCwgZXhhbXBsZTpcbiAqIGBgYFxuICogbmV3IFBvcHBlcihyZWYsIHBvcCwge1xuICogICBtb2RpZmllcnM6IHtcbiAqICAgICBwcmV2ZW50T3ZlcmZsb3c6IHsgZW5hYmxlZDogZmFsc2UgfVxuICogICB9XG4gKiB9KVxuICogYGBgXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG52YXIgRGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBQb3BwZXIncyBwbGFjZW1lbnRcbiAgICogQHByb3Age1BvcHBlci5wbGFjZW1lbnRzfSBwbGFjZW1lbnQ9J2JvdHRvbSdcbiAgICovXG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgcG9wcGVyIHRvIHBvc2l0aW9uIGl0IHNlbGYgaW4gJ2ZpeGVkJyBtb2RlXG4gICAqIEBwcm9wIHtCb29sZWFufSBwb3NpdGlvbkZpeGVkPWZhbHNlXG4gICAqL1xuICBwb3NpdGlvbkZpeGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogV2hldGhlciBldmVudHMgKHJlc2l6ZSwgc2Nyb2xsKSBhcmUgaW5pdGlhbGx5IGVuYWJsZWRcbiAgICogQHByb3Age0Jvb2xlYW59IGV2ZW50c0VuYWJsZWQ9dHJ1ZVxuICAgKi9cbiAgZXZlbnRzRW5hYmxlZDogdHJ1ZSxcblxuICAvKipcbiAgICogU2V0IHRvIHRydWUgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSByZW1vdmUgdGhlIHBvcHBlciB3aGVuXG4gICAqIHlvdSBjYWxsIHRoZSBgZGVzdHJveWAgbWV0aG9kLlxuICAgKiBAcHJvcCB7Qm9vbGVhbn0gcmVtb3ZlT25EZXN0cm95PWZhbHNlXG4gICAqL1xuICByZW1vdmVPbkRlc3Ryb3k6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIGNyZWF0ZWQuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uQ3JlYXRlfVxuICAgKi9cbiAgb25DcmVhdGU6IGZ1bmN0aW9uIG9uQ3JlYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBwb3BwZXIgaXMgdXBkYXRlZCwgdGhpcyBjYWxsYmFjayBpcyBub3QgY2FsbGVkXG4gICAqIG9uIHRoZSBpbml0aWFsaXphdGlvbi9jcmVhdGlvbiBvZiB0aGUgcG9wcGVyLCBidXQgb25seSBvbiBzdWJzZXF1ZW50XG4gICAqIHVwZGF0ZXMuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uVXBkYXRlfVxuICAgKi9cbiAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kaWZpZXJzIHVzZWQgdG8gbW9kaWZ5IHRoZSBvZmZzZXRzIGJlZm9yZSB0aGV5IGFyZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuXG4gICAqIFRoZXkgcHJvdmlkZSBtb3N0IG9mIHRoZSBmdW5jdGlvbmFsaXRpZXMgb2YgUG9wcGVyLmpzXG4gICAqIEBwcm9wIHttb2RpZmllcnN9XG4gICAqL1xuICBtb2RpZmllcnM6IG1vZGlmaWVyc1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgb25DcmVhdGVcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIG9uVXBkYXRlXG4gKiBAcGFyYW0ge2RhdGFPYmplY3R9IGRhdGFcbiAqL1xuXG4vLyBVdGlsc1xuLy8gTWV0aG9kc1xudmFyIFBvcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBQb3BwZXIuanMgaW5zdGFuY2VcbiAgICogQGNsYXNzIFBvcHBlclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fHJlZmVyZW5jZU9iamVjdH0gcmVmZXJlbmNlIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcG9zaXRpb24gdGhlIHBvcHBlclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFlvdXIgY3VzdG9tIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIG9uZXMgZGVmaW5lZCBpbiBbRGVmYXVsdHNdKCNkZWZhdWx0cylcbiAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZSAtIFRoZSBnZW5lcmF0ZWQgUG9wcGVyLmpzIGluc3RhbmNlXG4gICAqL1xuICBmdW5jdGlvbiBQb3BwZXIocmVmZXJlbmNlLCBwb3BwZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFBvcHBlcik7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy51cGRhdGUpO1xuICAgIH07XG5cbiAgICAvLyBtYWtlIHVwZGF0ZSgpIGRlYm91bmNlZCwgc28gdGhhdCBpdCBvbmx5IHJ1bnMgYXQgbW9zdCBvbmNlLXBlci10aWNrXG4gICAgdGhpcy51cGRhdGUgPSBkZWJvdW5jZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIHdpdGgge30gd2UgY3JlYXRlIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvcHRpb25zIGluc2lkZSBpdFxuICAgIHRoaXMub3B0aW9ucyA9IF9leHRlbmRzKHt9LCBQb3BwZXIuRGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgLy8gaW5pdCBzdGF0ZVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0Rlc3Ryb3llZDogZmFsc2UsXG4gICAgICBpc0NyZWF0ZWQ6IGZhbHNlLFxuICAgICAgc2Nyb2xsUGFyZW50czogW11cbiAgICB9O1xuXG4gICAgLy8gZ2V0IHJlZmVyZW5jZSBhbmQgcG9wcGVyIGVsZW1lbnRzIChhbGxvdyBqUXVlcnkgd3JhcHBlcnMpXG4gICAgdGhpcy5yZWZlcmVuY2UgPSByZWZlcmVuY2UgJiYgcmVmZXJlbmNlLmpxdWVyeSA/IHJlZmVyZW5jZVswXSA6IHJlZmVyZW5jZTtcbiAgICB0aGlzLnBvcHBlciA9IHBvcHBlciAmJiBwb3BwZXIuanF1ZXJ5ID8gcG9wcGVyWzBdIDogcG9wcGVyO1xuXG4gICAgLy8gRGVlcCBtZXJnZSBtb2RpZmllcnMgb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucy5tb2RpZmllcnMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLm1vZGlmaWVycywgb3B0aW9ucy5tb2RpZmllcnMpKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBfdGhpcy5vcHRpb25zLm1vZGlmaWVyc1tuYW1lXSA9IF9leHRlbmRzKHt9LCBQb3BwZXIuRGVmYXVsdHMubW9kaWZpZXJzW25hbWVdIHx8IHt9LCBvcHRpb25zLm1vZGlmaWVycyA/IG9wdGlvbnMubW9kaWZpZXJzW25hbWVdIDoge30pO1xuICAgIH0pO1xuXG4gICAgLy8gUmVmYWN0b3JpbmcgbW9kaWZpZXJzJyBsaXN0IChPYmplY3QgPT4gQXJyYXkpXG4gICAgdGhpcy5tb2RpZmllcnMgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMubW9kaWZpZXJzKS5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7XG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICAgIH0sIF90aGlzLm9wdGlvbnMubW9kaWZpZXJzW25hbWVdKTtcbiAgICB9KVxuICAgIC8vIHNvcnQgdGhlIG1vZGlmaWVycyBieSBvcmRlclxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS5vcmRlciAtIGIub3JkZXI7XG4gICAgfSk7XG5cbiAgICAvLyBtb2RpZmllcnMgaGF2ZSB0aGUgYWJpbGl0eSB0byBleGVjdXRlIGFyYml0cmFyeSBjb2RlIHdoZW4gUG9wcGVyLmpzIGdldCBpbml0ZWRcbiAgICAvLyBzdWNoIGNvZGUgaXMgZXhlY3V0ZWQgaW4gdGhlIHNhbWUgb3JkZXIgb2YgaXRzIG1vZGlmaWVyXG4gICAgLy8gdGhleSBjb3VsZCBhZGQgbmV3IHByb3BlcnRpZXMgdG8gdGhlaXIgb3B0aW9ucyBjb25maWd1cmF0aW9uXG4gICAgLy8gQkUgQVdBUkU6IGRvbid0IGFkZCBvcHRpb25zIHRvIGBvcHRpb25zLm1vZGlmaWVycy5uYW1lYCBidXQgdG8gYG1vZGlmaWVyT3B0aW9uc2AhXG4gICAgdGhpcy5tb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXJPcHRpb25zKSB7XG4gICAgICBpZiAobW9kaWZpZXJPcHRpb25zLmVuYWJsZWQgJiYgaXNGdW5jdGlvbihtb2RpZmllck9wdGlvbnMub25Mb2FkKSkge1xuICAgICAgICBtb2RpZmllck9wdGlvbnMub25Mb2FkKF90aGlzLnJlZmVyZW5jZSwgX3RoaXMucG9wcGVyLCBfdGhpcy5vcHRpb25zLCBtb2RpZmllck9wdGlvbnMsIF90aGlzLnN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGZpcmUgdGhlIGZpcnN0IHVwZGF0ZSB0byBwb3NpdGlvbiB0aGUgcG9wcGVyIGluIHRoZSByaWdodCBwbGFjZVxuICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICB2YXIgZXZlbnRzRW5hYmxlZCA9IHRoaXMub3B0aW9ucy5ldmVudHNFbmFibGVkO1xuICAgIGlmIChldmVudHNFbmFibGVkKSB7XG4gICAgICAvLyBzZXR1cCBldmVudCBsaXN0ZW5lcnMsIHRoZXkgd2lsbCB0YWtlIGNhcmUgb2YgdXBkYXRlIHRoZSBwb3NpdGlvbiBpbiBzcGVjaWZpYyBzaXR1YXRpb25zXG4gICAgICB0aGlzLmVuYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkID0gZXZlbnRzRW5hYmxlZDtcbiAgfVxuXG4gIC8vIFdlIGNhbid0IHVzZSBjbGFzcyBwcm9wZXJ0aWVzIGJlY2F1c2UgdGhleSBkb24ndCBnZXQgbGlzdGVkIGluIHRoZVxuICAvLyBjbGFzcyBwcm90b3R5cGUgYW5kIGJyZWFrIHN0dWZmIGxpa2UgU2lub24gc3R1YnNcblxuXG4gIGNyZWF0ZUNsYXNzKFBvcHBlciwgW3tcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUkJDEoKSB7XG4gICAgICByZXR1cm4gdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3kkJDEoKSB7XG4gICAgICByZXR1cm4gZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZUV2ZW50TGlzdGVuZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlRXZlbnRMaXN0ZW5lcnMkJDEoKSB7XG4gICAgICByZXR1cm4gZW5hYmxlRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlRXZlbnRMaXN0ZW5lcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlRXZlbnRMaXN0ZW5lcnMkJDEoKSB7XG4gICAgICByZXR1cm4gZGlzYWJsZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2NoZWR1bGUgYW4gdXBkYXRlLCBpdCB3aWxsIHJ1biBvbiB0aGUgbmV4dCBVSSB1cGRhdGUgYXZhaWxhYmxlXG4gICAgICogQG1ldGhvZCBzY2hlZHVsZVVwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB1dGlsaXRpZXMgdXNlZnVsIHdoZW4gd3JpdGluZyBjdXN0b20gbW9kaWZpZXJzLlxuICAgICAqIFN0YXJ0aW5nIGZyb20gdmVyc2lvbiAxLjcsIHRoaXMgbWV0aG9kIGlzIGF2YWlsYWJsZSBvbmx5IGlmIHlvdVxuICAgICAqIGluY2x1ZGUgYHBvcHBlci11dGlscy5qc2AgYmVmb3JlIGBwb3BwZXIuanNgLlxuICAgICAqXG4gICAgICogKipERVBSRUNBVElPTioqOiBUaGlzIHdheSB0byBhY2Nlc3MgUG9wcGVyVXRpbHMgaXMgZGVwcmVjYXRlZFxuICAgICAqIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdjIhIFVzZSB0aGUgUG9wcGVyVXRpbHMgbW9kdWxlIGRpcmVjdGx5IGluc3RlYWQuXG4gICAgICogRHVlIHRvIHRoZSBoaWdoIGluc3RhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGNvbnRhaW5lZCBpbiBVdGlscywgd2UgY2FuJ3RcbiAgICAgKiBndWFyYW50ZWUgdGhlbSB0byBmb2xsb3cgc2VtdmVyLiBVc2UgdGhlbSBhdCB5b3VyIG93biByaXNrIVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjhcbiAgICAgKiBAbWVtYmVyIFV0aWxzXG4gICAgICogQG1lbWJlcm9mIFBvcHBlclxuICAgICAqL1xuXG4gIH1dKTtcbiAgcmV0dXJuIFBvcHBlcjtcbn0oKTtcblxuLyoqXG4gKiBUaGUgYHJlZmVyZW5jZU9iamVjdGAgaXMgYW4gb2JqZWN0IHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGNvbXBhdGlibGUgd2l0aCBQb3BwZXIuanNcbiAqIGFuZCBsZXRzIHlvdSB1c2UgaXQgYXMgcmVwbGFjZW1lbnQgb2YgYSByZWFsIERPTSBub2RlLjxiciAvPlxuICogWW91IGNhbiB1c2UgdGhpcyBtZXRob2QgdG8gcG9zaXRpb24gYSBwb3BwZXIgcmVsYXRpdmVseSB0byBhIHNldCBvZiBjb29yZGluYXRlc1xuICogaW4gY2FzZSB5b3UgZG9uJ3QgaGF2ZSBhIERPTSBub2RlIHRvIHVzZSBhcyByZWZlcmVuY2UuXG4gKlxuICogYGBgXG4gKiBuZXcgUG9wcGVyKHJlZmVyZW5jZU9iamVjdCwgcG9wcGVyTm9kZSk7XG4gKiBgYGBcbiAqXG4gKiBOQjogVGhpcyBmZWF0dXJlIGlzbid0IHN1cHBvcnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMFxuICogQG5hbWUgcmVmZXJlbmNlT2JqZWN0XG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBkYXRhLmdldEJvdW5kaW5nQ2xpZW50UmVjdFxuICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBzZXQgb2YgY29vcmRpbmF0ZXMgY29tcGF0aWJsZSB3aXRoIHRoZSBuYXRpdmUgYGdldEJvdW5kaW5nQ2xpZW50UmVjdGAgbWV0aG9kLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEuY2xpZW50V2lkdGhcbiAqIEFuIEVTNiBnZXR0ZXIgdGhhdCB3aWxsIHJldHVybiB0aGUgd2lkdGggb2YgdGhlIHZpcnR1YWwgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gZGF0YS5jbGllbnRIZWlnaHRcbiAqIEFuIEVTNiBnZXR0ZXIgdGhhdCB3aWxsIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSB2aXJ0dWFsIHJlZmVyZW5jZSBlbGVtZW50LlxuICovXG5cblxuUG9wcGVyLlV0aWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKS5Qb3BwZXJVdGlscztcblBvcHBlci5wbGFjZW1lbnRzID0gcGxhY2VtZW50cztcblBvcHBlci5EZWZhdWx0cyA9IERlZmF1bHRzO1xuXG5leHBvcnQgZGVmYXVsdCBQb3BwZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb3BwZXIuanMubWFwXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBkcm9wZG93bi5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgRHJvcGRvd24gPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgICA9ICdkcm9wZG93bidcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgICAgICAgPSAnYnMuZHJvcGRvd24nXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IERBVEFfQVBJX0tFWSAgICAgICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgICAgICA9ICQuZm5bTkFNRV1cbiAgY29uc3QgRVNDQVBFX0tFWUNPREUgICAgICAgICAgID0gMjcgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuICBjb25zdCBTUEFDRV9LRVlDT0RFICAgICAgICAgICAgPSAzMiAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBzcGFjZSBrZXlcbiAgY29uc3QgVEFCX0tFWUNPREUgICAgICAgICAgICAgID0gOSAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciB0YWIga2V5XG4gIGNvbnN0IEFSUk9XX1VQX0tFWUNPREUgICAgICAgICA9IDM4IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHVwIGFycm93IGtleVxuICBjb25zdCBBUlJPV19ET1dOX0tFWUNPREUgICAgICAgPSA0MCAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBkb3duIGFycm93IGtleVxuICBjb25zdCBSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0ggPSAzIC8vIE1vdXNlRXZlbnQud2hpY2ggdmFsdWUgZm9yIHRoZSByaWdodCBidXR0b24gKGFzc3VtaW5nIGEgcmlnaHQtaGFuZGVkIG1vdXNlKVxuICBjb25zdCBSRUdFWFBfS0VZRE9XTiAgICAgICAgICAgPSBuZXcgUmVnRXhwKGAke0FSUk9XX1VQX0tFWUNPREV9fCR7QVJST1dfRE9XTl9LRVlDT0RFfXwke0VTQ0FQRV9LRVlDT0RFfWApXG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgSElERSAgICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBISURERU4gICAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gICAgU0hPVyAgICAgICAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XTiAgICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDSyAgICAgICAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSAgIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBLRVlET1dOX0RBVEFfQVBJIDogYGtleWRvd24ke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gLFxuICAgIEtFWVVQX0RBVEFfQVBJICAgOiBga2V5dXAke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG4gIH1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgRElTQUJMRUQgIDogJ2Rpc2FibGVkJyxcbiAgICBTSE9XICAgICAgOiAnc2hvdycsXG4gICAgRFJPUFVQICAgIDogJ2Ryb3B1cCcsXG4gICAgRFJPUFJJR0hUIDogJ2Ryb3ByaWdodCcsXG4gICAgRFJPUExFRlQgIDogJ2Ryb3BsZWZ0JyxcbiAgICBNRU5VUklHSFQgOiAnZHJvcGRvd24tbWVudS1yaWdodCcsXG4gICAgTUVOVUxFRlQgIDogJ2Ryb3Bkb3duLW1lbnUtbGVmdCcsXG4gICAgUE9TSVRJT05fU1RBVElDIDogJ3Bvc2l0aW9uLXN0YXRpYydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIERBVEFfVE9HR0xFICAgOiAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nLFxuICAgIEZPUk1fQ0hJTEQgICAgOiAnLmRyb3Bkb3duIGZvcm0nLFxuICAgIE1FTlUgICAgICAgICAgOiAnLmRyb3Bkb3duLW1lbnUnLFxuICAgIE5BVkJBUl9OQVYgICAgOiAnLm5hdmJhci1uYXYnLFxuICAgIFZJU0lCTEVfSVRFTVMgOiAnLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWl0ZW06bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZCknXG4gIH1cblxuICBjb25zdCBBdHRhY2htZW50TWFwID0ge1xuICAgIFRPUCAgICAgICA6ICd0b3Atc3RhcnQnLFxuICAgIFRPUEVORCAgICA6ICd0b3AtZW5kJyxcbiAgICBCT1RUT00gICAgOiAnYm90dG9tLXN0YXJ0JyxcbiAgICBCT1RUT01FTkQgOiAnYm90dG9tLWVuZCcsXG4gICAgUklHSFQgICAgIDogJ3JpZ2h0LXN0YXJ0JyxcbiAgICBSSUdIVEVORCAgOiAncmlnaHQtZW5kJyxcbiAgICBMRUZUICAgICAgOiAnbGVmdC1zdGFydCcsXG4gICAgTEVGVEVORCAgIDogJ2xlZnQtZW5kJ1xuICB9XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBvZmZzZXQgICAgICA6IDAsXG4gICAgZmxpcCAgICAgICAgOiB0cnVlLFxuICAgIGJvdW5kYXJ5ICAgIDogJ3Njcm9sbFBhcmVudCcsXG4gICAgcmVmZXJlbmNlICAgOiAndG9nZ2xlJyxcbiAgICBkaXNwbGF5ICAgICA6ICdkeW5hbWljJ1xuICB9XG5cbiAgY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gICAgb2Zmc2V0ICAgICAgOiAnKG51bWJlcnxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICBmbGlwICAgICAgICA6ICdib29sZWFuJyxcbiAgICBib3VuZGFyeSAgICA6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgICByZWZlcmVuY2UgICA6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgICBkaXNwbGF5ICAgICA6ICdzdHJpbmcnXG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIERyb3Bkb3duIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgID0gZWxlbWVudFxuICAgICAgdGhpcy5fcG9wcGVyICAgPSBudWxsXG4gICAgICB0aGlzLl9jb25maWcgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl9tZW51ICAgICA9IHRoaXMuX2dldE1lbnVFbGVtZW50KClcbiAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKClcblxuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudC5kaXNhYmxlZCB8fCAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmVudCAgID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9ICQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIERyb3Bkb3duLl9jbGVhck1lbnVzKClcblxuICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICB9XG4gICAgICBjb25zdCBzaG93RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1csIHJlbGF0ZWRUYXJnZXQpXG5cbiAgICAgICQocGFyZW50KS50cmlnZ2VyKHNob3dFdmVudClcblxuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gRGlzYWJsZSB0b3RhbGx5IFBvcHBlci5qcyBmb3IgRHJvcGRvd24gaW4gTmF2YmFyXG4gICAgICBpZiAoIXRoaXMuX2luTmF2YmFyKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBmb3IgUG9wcGVyIGRlcGVuZGVuY3lcbiAgICAgICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXAgZHJvcGRvd24gcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UgPT09ICdwYXJlbnQnKSB7XG4gICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHBhcmVudFxuICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VcblxuICAgICAgICAgIC8vIENoZWNrIGlmIGl0J3MgalF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VbMF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBib3VuZGFyeSBpcyBub3QgYHNjcm9sbFBhcmVudGAsIHRoZW4gc2V0IHBvc2l0aW9uIHRvIGBzdGF0aWNgXG4gICAgICAgIC8vIHRvIGFsbG93IHRoZSBtZW51IHRvIFwiZXNjYXBlXCIgdGhlIHNjcm9sbCBwYXJlbnQncyBib3VuZGFyaWVzXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjQyNTFcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5ib3VuZGFyeSAhPT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICAgICAgICAkKHBhcmVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlBPU0lUSU9OX1NUQVRJQylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHRoaXMuX21lbnUsIHRoaXMuX2dldFBvcHBlckNvbmZpZygpKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgICAgLy8gb25seSBuZWVkZWQgYmVjYXVzZSBvZiBicm9rZW4gZXZlbnQgZGVsZWdhdGlvbiBvbiBpT1NcbiAgICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxuICAgICAgICAgJChwYXJlbnQpLmNsb3Nlc3QoU2VsZWN0b3IuTkFWQkFSX05BVikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vbignbW91c2VvdmVyJywgbnVsbCwgJC5ub29wKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgICAgJCh0aGlzLl9tZW51KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgICQocGFyZW50KVxuICAgICAgICAudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAgIC50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuU0hPV04sIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgICAgdGhpcy5fbWVudSA9IG51bGxcbiAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKVxuICAgICAgICB0aGlzLl9wb3BwZXIgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKVxuICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wb3BwZXIuc2NoZWR1bGVVcGRhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0ssIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMudG9nZ2xlKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgLi4udGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0LFxuICAgICAgICAuLi4kKHRoaXMuX2VsZW1lbnQpLmRhdGEoKSxcbiAgICAgICAgLi4uY29uZmlnXG4gICAgICB9XG5cbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKFxuICAgICAgICBOQU1FLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGVcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9nZXRNZW51RWxlbWVudCgpIHtcbiAgICAgIGlmICghdGhpcy5fbWVudSkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgIHRoaXMuX21lbnUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5NRU5VKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fbWVudVxuICAgIH1cblxuICAgIF9nZXRQbGFjZW1lbnQoKSB7XG4gICAgICBjb25zdCAkcGFyZW50RHJvcGRvd24gPSAkKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSlcbiAgICAgIGxldCBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkJPVFRPTVxuXG4gICAgICAvLyBIYW5kbGUgZHJvcHVwXG4gICAgICBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QVVApKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuVE9QXG4gICAgICAgIGlmICgkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5NRU5VUklHSFQpKSB7XG4gICAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1BFTkRcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BSSUdIVCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5SSUdIVFxuICAgICAgfSBlbHNlIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BMRUZUKSkge1xuICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkxFRlRcbiAgICAgIH0gZWxzZSBpZiAoJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkJPVFRPTUVORFxuICAgICAgfVxuICAgICAgcmV0dXJuIHBsYWNlbWVudFxuICAgIH1cblxuICAgIF9kZXRlY3ROYXZiYXIoKSB7XG4gICAgICByZXR1cm4gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KCcubmF2YmFyJykubGVuZ3RoID4gMFxuICAgIH1cblxuICAgIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgICBjb25zdCBvZmZzZXRDb25mID0ge31cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLm9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvZmZzZXRDb25mLmZuID0gKGRhdGEpID0+IHtcbiAgICAgICAgICBkYXRhLm9mZnNldHMgPSB7XG4gICAgICAgICAgICAuLi5kYXRhLm9mZnNldHMsXG4gICAgICAgICAgICAuLi50aGlzLl9jb25maWcub2Zmc2V0KGRhdGEub2Zmc2V0cykgfHwge31cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0Q29uZi5vZmZzZXQgPSB0aGlzLl9jb25maWcub2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvcHBlckNvbmZpZyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXRDb25mLFxuICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuX2NvbmZpZy5mbGlwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiB0aGlzLl9jb25maWcuYm91bmRhcnlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRGlzYWJsZSBQb3BwZXIuanMgaWYgd2UgaGF2ZSBhIHN0YXRpYyBkaXNwbGF5XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmRpc3BsYXkgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIHBvcHBlckNvbmZpZy5tb2RpZmllcnMuYXBwbHlTdHlsZSA9IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9wcGVyQ29uZmlnXG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbFxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2NsZWFyTWVudXMoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudCAmJiAoZXZlbnQud2hpY2ggPT09IFJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCB8fFxuICAgICAgICBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LndoaWNoICE9PSBUQUJfS0VZQ09ERSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvZ2dsZXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9UT0dHTEUpKVxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvZ2dsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRvZ2dsZXNbaV0pXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSAkKHRvZ2dsZXNbaV0pLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogdG9nZ2xlc1tpXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0LmNsaWNrRXZlbnQgPSBldmVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duTWVudSA9IGNvbnRleHQuX21lbnVcbiAgICAgICAgaWYgKCEkKHBhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJyAmJlxuICAgICAgICAgICAgL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkgfHwgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC53aGljaCA9PT0gVEFCX0tFWUNPREUpICYmXG4gICAgICAgICAgICAkLmNvbnRhaW5zKHBhcmVudCwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUsIHJlbGF0ZWRUYXJnZXQpXG4gICAgICAgICQocGFyZW50KS50cmlnZ2VyKGhpZGVFdmVudClcbiAgICAgICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgJChkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9mZignbW91c2VvdmVyJywgbnVsbCwgJC5ub29wKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlc1tpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuXG4gICAgICAgICQoZHJvcGRvd25NZW51KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgICAgJChwYXJlbnQpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgICAgIC50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldFBhcmVudEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnRcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyZW50IHx8IGVsZW1lbnQucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgc3RhdGljIF9kYXRhQXBpS2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICAgIC8vIElmIG5vdCBpbnB1dC90ZXh0YXJlYTpcbiAgICAgIC8vICAtIEFuZCBub3QgYSBrZXkgaW4gUkVHRVhQX0tFWURPV04gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgLy8gSWYgaW5wdXQvdGV4dGFyZWE6XG4gICAgICAvLyAgLSBJZiBzcGFjZSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgLy8gIC0gSWYga2V5IGlzIG90aGVyIHRoYW4gZXNjYXBlXG4gICAgICAvLyAgICAtIElmIGtleSBpcyBub3QgdXAgb3IgZG93biA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICAvLyAgICAtIElmIHRyaWdnZXIgaW5zaWRlIHRoZSBtZW51ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKVxuICAgICAgICA/IGV2ZW50LndoaWNoID09PSBTUEFDRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoICE9PSBFU0NBUEVfS0VZQ09ERSAmJlxuICAgICAgICAoZXZlbnQud2hpY2ggIT09IEFSUk9XX0RPV05fS0VZQ09ERSAmJiBldmVudC53aGljaCAhPT0gQVJST1dfVVBfS0VZQ09ERSB8fFxuICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFNlbGVjdG9yLk1FTlUpLmxlbmd0aCkgOiAhUkVHRVhQX0tFWURPV04udGVzdChldmVudC53aGljaCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyZW50ICAgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcylcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBpZiAoIWlzQWN0aXZlICYmIChldmVudC53aGljaCAhPT0gRVNDQVBFX0tFWUNPREUgfHwgZXZlbnQud2hpY2ggIT09IFNQQUNFX0tFWUNPREUpIHx8XG4gICAgICAgICAgIGlzQWN0aXZlICYmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUgfHwgZXZlbnQud2hpY2ggPT09IFNQQUNFX0tFWUNPREUpKSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgICBjb25zdCB0b2dnbGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5EQVRBX1RPR0dMRSlcbiAgICAgICAgICAkKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbGljaycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IFtdLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuVklTSUJMRV9JVEVNUykpXG5cbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KVxuXG4gICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEFSUk9XX1VQX0tFWUNPREUgJiYgaW5kZXggPiAwKSB7IC8vIFVwXG4gICAgICAgIGluZGV4LS1cbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7IC8vIERvd25cbiAgICAgICAgaW5kZXgrK1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gMFxuICAgICAgfVxuXG4gICAgICBpdGVtc1tpbmRleF0uZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyKVxuICAgIC5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5NRU5VLCBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyKVxuICAgIC5vbihgJHtFdmVudC5DTElDS19EQVRBX0FQSX0gJHtFdmVudC5LRVlVUF9EQVRBX0FQSX1gLCBEcm9wZG93bi5fY2xlYXJNZW51cylcbiAgICAub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0aGlzKSwgJ3RvZ2dsZScpXG4gICAgfSlcbiAgICAub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkZPUk1fQ0hJTEQsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfSlcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBEcm9wZG93blxufSkoJCwgUG9wcGVyKVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93blxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJ1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjEuMyk6IG1vZGFsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBNb2RhbCA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ21vZGFsJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdicy5tb2RhbCdcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuICBjb25zdCBFU0NBUEVfS0VZQ09ERSAgICAgPSAyNyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBiYWNrZHJvcCA6IHRydWUsXG4gICAga2V5Ym9hcmQgOiB0cnVlLFxuICAgIGZvY3VzICAgIDogdHJ1ZSxcbiAgICBzaG93ICAgICA6IHRydWVcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIGJhY2tkcm9wIDogJyhib29sZWFufHN0cmluZyknLFxuICAgIGtleWJvYXJkIDogJ2Jvb2xlYW4nLFxuICAgIGZvY3VzICAgIDogJ2Jvb2xlYW4nLFxuICAgIHNob3cgICAgIDogJ2Jvb2xlYW4nXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBISURERU4gICAgICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgICBGT0NVU0lOICAgICAgICAgICA6IGBmb2N1c2luJHtFVkVOVF9LRVl9YCxcbiAgICBSRVNJWkUgICAgICAgICAgICA6IGByZXNpemUke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLX0RJU01JU1MgICAgIDogYGNsaWNrLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICAgIEtFWURPV05fRElTTUlTUyAgIDogYGtleWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VVUF9ESVNNSVNTICAgOiBgbW91c2V1cC5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRURPV05fRElTTUlTUyA6IGBtb3VzZWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0tfREFUQV9BUEkgICAgOiBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG4gIH1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgU0NST0xMQkFSX01FQVNVUkVSIDogJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJyxcbiAgICBCQUNLRFJPUCAgICAgICAgICAgOiAnbW9kYWwtYmFja2Ryb3AnLFxuICAgIE9QRU4gICAgICAgICAgICAgICA6ICdtb2RhbC1vcGVuJyxcbiAgICBGQURFICAgICAgICAgICAgICAgOiAnZmFkZScsXG4gICAgU0hPVyAgICAgICAgICAgICAgIDogJ3Nob3cnXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBESUFMT0cgICAgICAgICAgICAgOiAnLm1vZGFsLWRpYWxvZycsXG4gICAgREFUQV9UT0dHTEUgICAgICAgIDogJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJyxcbiAgICBEQVRBX0RJU01JU1MgICAgICAgOiAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJyxcbiAgICBGSVhFRF9DT05URU5UICAgICAgOiAnLmZpeGVkLXRvcCwgLmZpeGVkLWJvdHRvbSwgLmlzLWZpeGVkLCAuc3RpY2t5LXRvcCcsXG4gICAgU1RJQ0tZX0NPTlRFTlQgICAgIDogJy5zdGlja3ktdG9wJ1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBNb2RhbCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9jb25maWcgICAgICAgICAgICAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgICAgPSBlbGVtZW50XG4gICAgICB0aGlzLl9kaWFsb2cgICAgICAgICAgICAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkRJQUxPRylcbiAgICAgIHRoaXMuX2JhY2tkcm9wICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pc1Nob3duICAgICAgICAgICAgID0gZmFsc2VcbiAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nICAgPSBmYWxzZVxuICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCAgICAgID0gMFxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIHRvZ2dsZShyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gICAgfVxuXG4gICAgc2hvdyhyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8IHRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywge1xuICAgICAgICByZWxhdGVkVGFyZ2V0XG4gICAgICB9KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgICBpZiAodGhpcy5faXNTaG93biB8fCBzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlXG5cbiAgICAgIHRoaXMuX2NoZWNrU2Nyb2xsYmFyKClcbiAgICAgIHRoaXMuX3NldFNjcm9sbGJhcigpXG5cbiAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpXG5cbiAgICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pXG5cbiAgICAgIHRoaXMuX3NldEVzY2FwZUV2ZW50KClcbiAgICAgIHRoaXMuX3NldFJlc2l6ZUV2ZW50KClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihcbiAgICAgICAgRXZlbnQuQ0xJQ0tfRElTTUlTUyxcbiAgICAgICAgU2VsZWN0b3IuREFUQV9ESVNNSVNTLFxuICAgICAgICAoZXZlbnQpID0+IHRoaXMuaGlkZShldmVudClcbiAgICAgIClcblxuICAgICAgJCh0aGlzLl9kaWFsb2cpLm9uKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTLCAoKSA9PiB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub25lKEV2ZW50Lk1PVVNFVVBfRElTTUlTUywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcyh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICB0aGlzLl9zaG93QmFja2Ryb3AoKCkgPT4gdGhpcy5fc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCkpXG4gICAgfVxuXG4gICAgaGlkZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCAhdGhpcy5faXNTaG93bikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuXG4gICAgICBpZiAoIXRoaXMuX2lzU2hvd24gfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc1Nob3duID0gZmFsc2VcbiAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldEVzY2FwZUV2ZW50KClcbiAgICAgIHRoaXMuX3NldFJlc2l6ZUV2ZW50KClcblxuICAgICAgJChkb2N1bWVudCkub2ZmKEV2ZW50LkZPQ1VTSU4pXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LkNMSUNLX0RJU01JU1MpXG4gICAgICAkKHRoaXMuX2RpYWxvZykub2ZmKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTKVxuXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiAgPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgKGV2ZW50KSA9PiB0aGlzLl9oaWRlTW9kYWwoZXZlbnQpKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oaWRlTW9kYWwoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG5cbiAgICAgICQod2luZG93LCBkb2N1bWVudCwgdGhpcy5fZWxlbWVudCwgdGhpcy5fYmFja2Ryb3ApLm9mZihFVkVOVF9LRVkpXG5cbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9lbGVtZW50ICAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fZGlhbG9nICAgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2JhY2tkcm9wICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pc1Nob3duICAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgICA9IG51bGxcbiAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCAgICAgID0gbnVsbFxuICAgIH1cblxuICAgIGhhbmRsZVVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpXG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgLi4uRGVmYXVsdCxcbiAgICAgICAgLi4uY29uZmlnXG4gICAgICB9XG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSlcblxuICAgICAgaWYgKCF0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUgfHxcbiAgICAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgLy8gRG9uJ3QgbW92ZSBtb2RhbCdzIERPTSBwb3NpdGlvblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbFRvcCA9IDBcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgVXRpbC5yZWZsb3codGhpcy5fZWxlbWVudClcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICB0aGlzLl9lbmZvcmNlRm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzaG93bkV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0XG4gICAgICB9KVxuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZVxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudClcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uICA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgICAkKHRoaXMuX2RpYWxvZylcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIHRyYW5zaXRpb25Db21wbGV0ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbkNvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5mb3JjZUZvY3VzKCkge1xuICAgICAgJChkb2N1bWVudClcbiAgICAgICAgLm9mZihFdmVudC5GT0NVU0lOKSAvLyBHdWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgICAgLm9uKEV2ZW50LkZPQ1VTSU4sIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChkb2N1bWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhcyhldmVudC50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIF9zZXRFc2NhcGVFdmVudCgpIHtcbiAgICAgIGlmICh0aGlzLl9pc1Nob3duICYmIHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LktFWURPV05fRElTTUlTUywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duKSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LktFWURPV05fRElTTUlTUylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0UmVzaXplRXZlbnQoKSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgICAkKHdpbmRvdykub24oRXZlbnQuUkVTSVpFLCAoZXZlbnQpID0+IHRoaXMuaGFuZGxlVXBkYXRlKGV2ZW50KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQod2luZG93KS5vZmYoRXZlbnQuUkVTSVpFKVxuICAgICAgfVxuICAgIH1cblxuICAgIF9oaWRlTW9kYWwoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpXG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKCgpID0+IHtcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuT1BFTilcbiAgICAgICAgdGhpcy5fcmVzZXRBZGp1c3RtZW50cygpXG4gICAgICAgIHRoaXMuX3Jlc2V0U2Nyb2xsYmFyKClcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LkhJRERFTilcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgX3JlbW92ZUJhY2tkcm9wKCkge1xuICAgICAgaWYgKHRoaXMuX2JhY2tkcm9wKSB7XG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIF9zaG93QmFja2Ryb3AoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGFuaW1hdGUgPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKVxuICAgICAgICA/IENsYXNzTmFtZS5GQURFIDogJydcblxuICAgICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmJhY2tkcm9wKSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLkJBQ0tEUk9QXG5cbiAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICB0aGlzLl9iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKGFuaW1hdGUpXG4gICAgICAgIH1cblxuICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KVxuXG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0tfRElTTUlTUywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJykge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgVXRpbC5yZWZsb3codGhpcy5fYmFja2Ryb3ApXG4gICAgICAgIH1cblxuICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFuaW1hdGUpIHtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fYmFja2Ryb3ApXG5cbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNhbGxiYWNrKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24gJiYgdGhpcy5fYmFja2Ryb3ApIHtcbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICAgY29uc3QgY2FsbGJhY2tSZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICAgIGNvbnN0IGJhY2tkcm9wVHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9iYWNrZHJvcClcblxuICAgICAgICAgICQodGhpcy5fYmFja2Ryb3ApXG4gICAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKGJhY2tkcm9wVHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG4gICAgLy8gdG9kbyAoZmF0KTogdGhlc2Ugc2hvdWxkIHByb2JhYmx5IGJlIHJlZmFjdG9yZWQgb3V0IG9mIG1vZGFsLmpzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgX2FkanVzdERpYWxvZygpIHtcbiAgICAgIGNvbnN0IGlzTW9kYWxPdmVyZmxvd2luZyA9XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuXG4gICAgICBpZiAoIXRoaXMuX2lzQm9keU92ZXJmbG93aW5nICYmIGlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gYCR7dGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiAhaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgXG4gICAgICB9XG4gICAgfVxuXG4gICAgX3Jlc2V0QWRqdXN0bWVudHMoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gJydcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJydcbiAgICB9XG5cbiAgICBfY2hlY2tTY3JvbGxiYXIoKSB7XG4gICAgICBjb25zdCByZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgPSByZWN0LmxlZnQgKyByZWN0LnJpZ2h0IDwgd2luZG93LmlubmVyV2lkdGhcbiAgICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoID0gdGhpcy5fZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICAgIH1cblxuICAgIF9zZXRTY3JvbGxiYXIoKSB7XG4gICAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgLy8gTm90ZTogRE9NTm9kZS5zdHlsZS5wYWRkaW5nUmlnaHQgcmV0dXJucyB0aGUgYWN0dWFsIHZhbHVlIG9yICcnIGlmIG5vdCBzZXRcbiAgICAgICAgLy8gICB3aGlsZSAkKERPTU5vZGUpLmNzcygncGFkZGluZy1yaWdodCcpIHJldHVybnMgdGhlIGNhbGN1bGF0ZWQgdmFsdWUgb3IgMCBpZiBub3Qgc2V0XG4gICAgICAgIGNvbnN0IGZpeGVkQ29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5GSVhFRF9DT05URU5UKSlcbiAgICAgICAgY29uc3Qgc3RpY2t5Q29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5TVElDS1lfQ09OVEVOVCkpXG5cbiAgICAgICAgLy8gQWRqdXN0IGZpeGVkIGNvbnRlbnQgcGFkZGluZ1xuICAgICAgICAkKGZpeGVkQ29udGVudCkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBhY3R1YWxQYWRkaW5nID0gZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHRcbiAgICAgICAgICBjb25zdCBjYWxjdWxhdGVkUGFkZGluZyA9ICQoZWxlbWVudCkuY3NzKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICAgICAkKGVsZW1lbnQpXG4gICAgICAgICAgICAuZGF0YSgncGFkZGluZy1yaWdodCcsIGFjdHVhbFBhZGRpbmcpXG4gICAgICAgICAgICAuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYCR7cGFyc2VGbG9hdChjYWxjdWxhdGVkUGFkZGluZykgKyB0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGApXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQWRqdXN0IHN0aWNreSBjb250ZW50IG1hcmdpblxuICAgICAgICAkKHN0aWNreUNvbnRlbnQpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgYWN0dWFsTWFyZ2luID0gZWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodFxuICAgICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRNYXJnaW4gPSAkKGVsZW1lbnQpLmNzcygnbWFyZ2luLXJpZ2h0JylcbiAgICAgICAgICAkKGVsZW1lbnQpXG4gICAgICAgICAgICAuZGF0YSgnbWFyZ2luLXJpZ2h0JywgYWN0dWFsTWFyZ2luKVxuICAgICAgICAgICAgLmNzcygnbWFyZ2luLXJpZ2h0JywgYCR7cGFyc2VGbG9hdChjYWxjdWxhdGVkTWFyZ2luKSAtIHRoaXMuX3Njcm9sbGJhcldpZHRofXB4YClcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBZGp1c3QgYm9keSBwYWRkaW5nXG4gICAgICAgIGNvbnN0IGFjdHVhbFBhZGRpbmcgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodFxuICAgICAgICBjb25zdCBjYWxjdWxhdGVkUGFkZGluZyA9ICQoZG9jdW1lbnQuYm9keSkuY3NzKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KVxuICAgICAgICAgIC5kYXRhKCdwYWRkaW5nLXJpZ2h0JywgYWN0dWFsUGFkZGluZylcbiAgICAgICAgICAuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYCR7cGFyc2VGbG9hdChjYWxjdWxhdGVkUGFkZGluZykgKyB0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGApXG4gICAgICB9XG4gICAgfVxuXG4gICAgX3Jlc2V0U2Nyb2xsYmFyKCkge1xuICAgICAgLy8gUmVzdG9yZSBmaXhlZCBjb250ZW50IHBhZGRpbmdcbiAgICAgIGNvbnN0IGZpeGVkQ29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5GSVhFRF9DT05URU5UKSlcbiAgICAgICQoZml4ZWRDb250ZW50KS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBwYWRkaW5nID0gJChlbGVtZW50KS5kYXRhKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICAgJChlbGVtZW50KS5yZW1vdmVEYXRhKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nID8gcGFkZGluZyA6ICcnXG4gICAgICB9KVxuXG4gICAgICAvLyBSZXN0b3JlIHN0aWNreSBjb250ZW50XG4gICAgICBjb25zdCBlbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgJHtTZWxlY3Rvci5TVElDS1lfQ09OVEVOVH1gKSlcbiAgICAgICQoZWxlbWVudHMpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9ICQoZWxlbWVudCkuZGF0YSgnbWFyZ2luLXJpZ2h0JylcbiAgICAgICAgaWYgKHR5cGVvZiBtYXJnaW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgJChlbGVtZW50KS5jc3MoJ21hcmdpbi1yaWdodCcsIG1hcmdpbikucmVtb3ZlRGF0YSgnbWFyZ2luLXJpZ2h0JylcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gUmVzdG9yZSBib2R5IHBhZGRpbmdcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAkKGRvY3VtZW50LmJvZHkpLmRhdGEoJ3BhZGRpbmctcmlnaHQnKVxuICAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVEYXRhKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZyA/IHBhZGRpbmcgOiAnJ1xuICAgIH1cblxuICAgIF9nZXRTY3JvbGxiYXJXaWR0aCgpIHsgLy8gdGh4IGQud2Fsc2hcbiAgICAgIGNvbnN0IHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLlNDUk9MTEJBUl9NRUFTVVJFUlxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpXG4gICAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aFxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZywgcmVsYXRlZFRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBjb25zdCBfY29uZmlnID0ge1xuICAgICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgICAgLi4uJCh0aGlzKS5kYXRhKCksXG4gICAgICAgICAgLi4udHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge31cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgTW9kYWwodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKHJlbGF0ZWRUYXJnZXQpXG4gICAgICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5zaG93KSB7XG4gICAgICAgICAgZGF0YS5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgdGFyZ2V0XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcylcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICB9XG5cbiAgICBjb25zdCBjb25maWcgPSAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSlcbiAgICAgID8gJ3RvZ2dsZScgOiB7XG4gICAgICAgIC4uLiQodGFyZ2V0KS5kYXRhKCksXG4gICAgICAgIC4uLiQodGhpcykuZGF0YSgpXG4gICAgICB9XG5cbiAgICBpZiAodGhpcy50YWdOYW1lID09PSAnQScgfHwgdGhpcy50YWdOYW1lID09PSAnQVJFQScpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBjb25zdCAkdGFyZ2V0ID0gJCh0YXJnZXQpLm9uZShFdmVudC5TSE9XLCAoc2hvd0V2ZW50KSA9PiB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIC8vIE9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgICR0YXJnZXQub25lKEV2ZW50LkhJRERFTiwgKCkgPT4ge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0YXJnZXQpLCBjb25maWcsIHRoaXMpXG4gIH0pXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBNb2RhbFxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gTW9kYWxcbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiB0b29sdGlwLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBUb29sdGlwID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgPSAndG9vbHRpcCdcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnYnMudG9vbHRpcCdcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuICBjb25zdCBDTEFTU19QUkVGSVggICAgICAgPSAnYnMtdG9vbHRpcCdcbiAgY29uc3QgQlNDTFNfUFJFRklYX1JFR0VYID0gbmV3IFJlZ0V4cChgKF58XFxcXHMpJHtDTEFTU19QUkVGSVh9XFxcXFMrYCwgJ2cnKVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIGFuaW1hdGlvbiAgICAgICAgICAgOiAnYm9vbGVhbicsXG4gICAgdGVtcGxhdGUgICAgICAgICAgICA6ICdzdHJpbmcnLFxuICAgIHRpdGxlICAgICAgICAgICAgICAgOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKScsXG4gICAgdHJpZ2dlciAgICAgICAgICAgICA6ICdzdHJpbmcnLFxuICAgIGRlbGF5ICAgICAgICAgICAgICAgOiAnKG51bWJlcnxvYmplY3QpJyxcbiAgICBodG1sICAgICAgICAgICAgICAgIDogJ2Jvb2xlYW4nLFxuICAgIHNlbGVjdG9yICAgICAgICAgICAgOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgcGxhY2VtZW50ICAgICAgICAgICA6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgb2Zmc2V0ICAgICAgICAgICAgICA6ICcobnVtYmVyfHN0cmluZyknLFxuICAgIGNvbnRhaW5lciAgICAgICAgICAgOiAnKHN0cmluZ3xlbGVtZW50fGJvb2xlYW4pJyxcbiAgICBmYWxsYmFja1BsYWNlbWVudCAgIDogJyhzdHJpbmd8YXJyYXkpJyxcbiAgICBib3VuZGFyeSAgICAgICAgICAgIDogJyhzdHJpbmd8ZWxlbWVudCknXG4gIH1cblxuICBjb25zdCBBdHRhY2htZW50TWFwID0ge1xuICAgIEFVVE8gICA6ICdhdXRvJyxcbiAgICBUT1AgICAgOiAndG9wJyxcbiAgICBSSUdIVCAgOiAncmlnaHQnLFxuICAgIEJPVFRPTSA6ICdib3R0b20nLFxuICAgIExFRlQgICA6ICdsZWZ0J1xuICB9XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBhbmltYXRpb24gICAgICAgICAgIDogdHJ1ZSxcbiAgICB0ZW1wbGF0ZSAgICAgICAgICAgIDogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgdHJpZ2dlciAgICAgICAgICAgICA6ICdob3ZlciBmb2N1cycsXG4gICAgdGl0bGUgICAgICAgICAgICAgICA6ICcnLFxuICAgIGRlbGF5ICAgICAgICAgICAgICAgOiAwLFxuICAgIGh0bWwgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICBzZWxlY3RvciAgICAgICAgICAgIDogZmFsc2UsXG4gICAgcGxhY2VtZW50ICAgICAgICAgICA6ICd0b3AnLFxuICAgIG9mZnNldCAgICAgICAgICAgICAgOiAwLFxuICAgIGNvbnRhaW5lciAgICAgICAgICAgOiBmYWxzZSxcbiAgICBmYWxsYmFja1BsYWNlbWVudCAgIDogJ2ZsaXAnLFxuICAgIGJvdW5kYXJ5ICAgICAgICAgICAgOiAnc2Nyb2xsUGFyZW50J1xuICB9XG5cbiAgY29uc3QgSG92ZXJTdGF0ZSA9IHtcbiAgICBTSE9XIDogJ3Nob3cnLFxuICAgIE9VVCAgOiAnb3V0J1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgSElERSAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBISURERU4gICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gICAgU0hPVyAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XTiAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgICBJTlNFUlRFRCAgIDogYGluc2VydGVkJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDSyAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9YCxcbiAgICBGT0NVU0lOICAgIDogYGZvY3VzaW4ke0VWRU5UX0tFWX1gLFxuICAgIEZPQ1VTT1VUICAgOiBgZm9jdXNvdXQke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFRU5URVIgOiBgbW91c2VlbnRlciR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VMRUFWRSA6IGBtb3VzZWxlYXZlJHtFVkVOVF9LRVl9YFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIEZBREUgOiAnZmFkZScsXG4gICAgU0hPVyA6ICdzaG93J1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgVE9PTFRJUCAgICAgICA6ICcudG9vbHRpcCcsXG4gICAgVE9PTFRJUF9JTk5FUiA6ICcudG9vbHRpcC1pbm5lcicsXG4gICAgQVJST1cgICAgICAgICA6ICcuYXJyb3cnXG4gIH1cblxuICBjb25zdCBUcmlnZ2VyID0ge1xuICAgIEhPVkVSICA6ICdob3ZlcicsXG4gICAgRk9DVVMgIDogJ2ZvY3VzJyxcbiAgICBDTElDSyAgOiAnY2xpY2snLFxuICAgIE1BTlVBTCA6ICdtYW51YWwnXG4gIH1cblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgVG9vbHRpcCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIGZvciBQb3BwZXIgZGVwZW5kZW5jeVxuICAgICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgUG9wcGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXAgdG9vbHRpcHMgcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKVxuICAgICAgfVxuXG4gICAgICAvLyBwcml2YXRlXG4gICAgICB0aGlzLl9pc0VuYWJsZWQgICAgID0gdHJ1ZVxuICAgICAgdGhpcy5fdGltZW91dCAgICAgICA9IDBcbiAgICAgIHRoaXMuX2hvdmVyU3RhdGUgICAgPSAnJ1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IHt9XG4gICAgICB0aGlzLl9wb3BwZXIgICAgICAgID0gbnVsbFxuXG4gICAgICAvLyBQcm90ZWN0ZWRcbiAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICAgIHRoaXMuY29uZmlnICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLnRpcCAgICAgPSBudWxsXG5cbiAgICAgIHRoaXMuX3NldExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEQVRBX0tFWSgpIHtcbiAgICAgIHJldHVybiBEQVRBX0tFWVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRXZlbnQoKSB7XG4gICAgICByZXR1cm4gRXZlbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0tFWSgpIHtcbiAgICAgIHJldHVybiBFVkVOVF9LRVlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICBlbmFibGUoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuXG4gICAgdG9nZ2xlRW5hYmxlZCgpIHtcbiAgICAgIHRoaXMuX2lzRW5hYmxlZCA9ICF0aGlzLl9pc0VuYWJsZWRcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5faXNFbmFibGVkKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVlcbiAgICAgICAgbGV0IGNvbnRleHQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSlcblxuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoXG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgICAgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKVxuICAgICAgICAgIClcbiAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXIuY2xpY2sgPSAhY29udGV4dC5fYWN0aXZlVHJpZ2dlci5jbGlja1xuXG4gICAgICAgIGlmIChjb250ZXh0Ll9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgICBjb250ZXh0Ll9lbnRlcihudWxsLCBjb250ZXh0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRleHQuX2xlYXZlKG51bGwsIGNvbnRleHQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICB0aGlzLl9sZWF2ZShudWxsLCB0aGlzKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZW50ZXIobnVsbCwgdGhpcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpXG5cbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLmVsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVkpXG5cbiAgICAgICQodGhpcy5lbGVtZW50KS5vZmYodGhpcy5jb25zdHJ1Y3Rvci5FVkVOVF9LRVkpXG4gICAgICAkKHRoaXMuZWxlbWVudCkuY2xvc2VzdCgnLm1vZGFsJykub2ZmKCdoaWRlLmJzLm1vZGFsJylcblxuICAgICAgaWYgKHRoaXMudGlwKSB7XG4gICAgICAgICQodGhpcy50aXApLnJlbW92ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzRW5hYmxlZCAgICAgPSBudWxsXG4gICAgICB0aGlzLl90aW1lb3V0ICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faG92ZXJTdGF0ZSAgICA9IG51bGxcbiAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSBudWxsXG4gICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbFxuICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICAgICAgdGhpcy5jb25maWcgID0gbnVsbFxuICAgICAgdGhpcy50aXAgICAgID0gbnVsbFxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBpZiAoJCh0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdXNlIHNob3cgb24gdmlzaWJsZSBlbGVtZW50cycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5TSE9XKVxuICAgICAgaWYgKHRoaXMuaXNXaXRoQ29udGVudCgpICYmIHRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICAgICAgY29uc3QgaXNJblRoZURvbSA9ICQuY29udGFpbnMoXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICAgIHRoaXMuZWxlbWVudFxuICAgICAgICApXG5cbiAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaXNJblRoZURvbSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGlwICAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKVxuICAgICAgICBjb25zdCB0aXBJZCA9IFV0aWwuZ2V0VUlEKHRoaXMuY29uc3RydWN0b3IuTkFNRSlcblxuICAgICAgICB0aXAuc2V0QXR0cmlidXRlKCdpZCcsIHRpcElkKVxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgdGlwSWQpXG5cbiAgICAgICAgdGhpcy5zZXRDb250ZW50KClcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgJCh0aXApLmFkZENsYXNzKENsYXNzTmFtZS5GQURFKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGxhY2VtZW50ICA9IHR5cGVvZiB0aGlzLmNvbmZpZy5wbGFjZW1lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMuY29uZmlnLnBsYWNlbWVudC5jYWxsKHRoaXMsIHRpcCwgdGhpcy5lbGVtZW50KVxuICAgICAgICAgIDogdGhpcy5jb25maWcucGxhY2VtZW50XG5cbiAgICAgICAgY29uc3QgYXR0YWNobWVudCA9IHRoaXMuX2dldEF0dGFjaG1lbnQocGxhY2VtZW50KVxuICAgICAgICB0aGlzLmFkZEF0dGFjaG1lbnRDbGFzcyhhdHRhY2htZW50KVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29uZmlnLmNvbnRhaW5lciA9PT0gZmFsc2UgPyBkb2N1bWVudC5ib2R5IDogJChkb2N1bWVudCkuZmluZCh0aGlzLmNvbmZpZy5jb250YWluZXIpXG5cbiAgICAgICAgJCh0aXApLmRhdGEodGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWSwgdGhpcylcblxuICAgICAgICBpZiAoISQuY29udGFpbnModGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLnRpcCkpIHtcbiAgICAgICAgICAkKHRpcCkuYXBwZW5kVG8oY29udGFpbmVyKVxuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5JTlNFUlRFRClcblxuICAgICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHRoaXMuZWxlbWVudCwgdGlwLCB7XG4gICAgICAgICAgcGxhY2VtZW50OiBhdHRhY2htZW50LFxuICAgICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgIG9mZnNldDogdGhpcy5jb25maWcub2Zmc2V0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICBiZWhhdmlvcjogdGhpcy5jb25maWcuZmFsbGJhY2tQbGFjZW1lbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcnJvdzoge1xuICAgICAgICAgICAgICBlbGVtZW50OiBTZWxlY3Rvci5BUlJPV1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5jb25maWcuYm91bmRhcnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ3JlYXRlOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgIT09IGRhdGEucGxhY2VtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZShkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25VcGRhdGU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UoZGF0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgJCh0aXApLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgICAgLy8gb25seSBuZWVkZWQgYmVjYXVzZSBvZiBicm9rZW4gZXZlbnQgZGVsZWdhdGlvbiBvbiBpT1NcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpeFRyYW5zaXRpb24oKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwcmV2SG92ZXJTdGF0ZSA9IHRoaXMuX2hvdmVyU3RhdGVcbiAgICAgICAgICB0aGlzLl9ob3ZlclN0YXRlICAgICA9IG51bGxcblxuICAgICAgICAgICQodGhpcy5lbGVtZW50KS50cmlnZ2VyKHRoaXMuY29uc3RydWN0b3IuRXZlbnQuU0hPV04pXG5cbiAgICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWF2ZShudWxsLCB0aGlzKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMudGlwKVxuXG4gICAgICAgICAgJCh0aGlzLnRpcClcbiAgICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBsZXRlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHRpcCAgICAgICA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpXG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSElERSlcbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faG92ZXJTdGF0ZSAhPT0gSG92ZXJTdGF0ZS5TSE9XICYmIHRpcC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGlwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGlwKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xlYW5UaXBDbGFzcygpXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkhJRERFTilcbiAgICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG5cbiAgICAgIGlmIChoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgICQodGlwKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vZmYoJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkNMSUNLXSA9IGZhbHNlXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuRk9DVVNdID0gZmFsc2VcbiAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5IT1ZFUl0gPSBmYWxzZVxuXG4gICAgICBpZiAoJCh0aGlzLnRpcCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGlwKVxuXG4gICAgICAgICQodGlwKVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5faG92ZXJTdGF0ZSA9ICcnXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wb3BwZXIuc2NoZWR1bGVVcGRhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByb3RlY3RlZFxuXG4gICAgaXNXaXRoQ29udGVudCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0VGl0bGUoKSlcbiAgICB9XG5cbiAgICBhZGRBdHRhY2htZW50Q2xhc3MoYXR0YWNobWVudCkge1xuICAgICAgJCh0aGlzLmdldFRpcEVsZW1lbnQoKSkuYWRkQ2xhc3MoYCR7Q0xBU1NfUFJFRklYfS0ke2F0dGFjaG1lbnR9YClcbiAgICB9XG5cbiAgICBnZXRUaXBFbGVtZW50KCkge1xuICAgICAgdGhpcy50aXAgPSB0aGlzLnRpcCB8fCAkKHRoaXMuY29uZmlnLnRlbXBsYXRlKVswXVxuICAgICAgcmV0dXJuIHRoaXMudGlwXG4gICAgfVxuXG4gICAgc2V0Q29udGVudCgpIHtcbiAgICAgIGNvbnN0IHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpXG4gICAgICB0aGlzLnNldEVsZW1lbnRDb250ZW50KCQodGlwLnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuVE9PTFRJUF9JTk5FUikpLCB0aGlzLmdldFRpdGxlKCkpXG4gICAgICAkKHRpcCkucmVtb3ZlQ2xhc3MoYCR7Q2xhc3NOYW1lLkZBREV9ICR7Q2xhc3NOYW1lLlNIT1d9YClcbiAgICB9XG5cbiAgICBzZXRFbGVtZW50Q29udGVudCgkZWxlbWVudCwgY29udGVudCkge1xuICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY29uZmlnLmh0bWxcbiAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ29iamVjdCcgJiYgKGNvbnRlbnQubm9kZVR5cGUgfHwgY29udGVudC5qcXVlcnkpKSB7XG4gICAgICAgIC8vIENvbnRlbnQgaXMgYSBET00gbm9kZSBvciBhIGpRdWVyeVxuICAgICAgICBpZiAoaHRtbCkge1xuICAgICAgICAgIGlmICghJChjb250ZW50KS5wYXJlbnQoKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAgICRlbGVtZW50LmVtcHR5KCkuYXBwZW5kKGNvbnRlbnQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbGVtZW50LnRleHQoJChjb250ZW50KS50ZXh0KCkpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRlbGVtZW50W2h0bWwgPyAnaHRtbCcgOiAndGV4dCddKGNvbnRlbnQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGl0bGUoKSB7XG4gICAgICBsZXQgdGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcblxuICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICB0aXRsZSA9IHR5cGVvZiB0aGlzLmNvbmZpZy50aXRsZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gdGhpcy5jb25maWcudGl0bGUuY2FsbCh0aGlzLmVsZW1lbnQpXG4gICAgICAgICAgOiB0aGlzLmNvbmZpZy50aXRsZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGl0bGVcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfZ2V0QXR0YWNobWVudChwbGFjZW1lbnQpIHtcbiAgICAgIHJldHVybiBBdHRhY2htZW50TWFwW3BsYWNlbWVudC50b1VwcGVyQ2FzZSgpXVxuICAgIH1cblxuICAgIF9zZXRMaXN0ZW5lcnMoKSB7XG4gICAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMuY29uZmlnLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICAgIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgJCh0aGlzLmVsZW1lbnQpLm9uKFxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5DTElDSyxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdG9yLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLnRvZ2dsZShldmVudClcbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPT0gVHJpZ2dlci5NQU5VQUwpIHtcbiAgICAgICAgICBjb25zdCBldmVudEluID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUlxuICAgICAgICAgICAgPyB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFRU5URVJcbiAgICAgICAgICAgIDogdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5GT0NVU0lOXG4gICAgICAgICAgY29uc3QgZXZlbnRPdXQgPSB0cmlnZ2VyID09PSBUcmlnZ2VyLkhPVkVSXG4gICAgICAgICAgICA/IHRoaXMuY29uc3RydWN0b3IuRXZlbnQuTU9VU0VMRUFWRVxuICAgICAgICAgICAgOiB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTT1VUXG5cbiAgICAgICAgICAkKHRoaXMuZWxlbWVudClcbiAgICAgICAgICAgIC5vbihcbiAgICAgICAgICAgICAgZXZlbnRJbixcbiAgICAgICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgICAgIChldmVudCkgPT4gdGhpcy5fZW50ZXIoZXZlbnQpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAub24oXG4gICAgICAgICAgICAgIGV2ZW50T3V0LFxuICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RvcixcbiAgICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9sZWF2ZShldmVudClcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5lbGVtZW50KS5jbG9zZXN0KCcubW9kYWwnKS5vbihcbiAgICAgICAgICAnaGlkZS5icy5tb2RhbCcsXG4gICAgICAgICAgKCkgPT4gdGhpcy5oaWRlKClcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgIC4uLnRoaXMuY29uZmlnLFxuICAgICAgICAgIHRyaWdnZXI6ICdtYW51YWwnLFxuICAgICAgICAgIHNlbGVjdG9yOiAnJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9maXhUaXRsZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX2ZpeFRpdGxlKCkge1xuICAgICAgY29uc3QgdGl0bGVUeXBlID0gdHlwZW9mIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuICAgICAgaWYgKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgfHxcbiAgICAgICAgIHRpdGxlVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAnZGF0YS1vcmlnaW5hbC10aXRsZScsXG4gICAgICAgICAgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCAnJ1xuICAgICAgICApXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX2VudGVyKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICBjb25zdCBkYXRhS2V5ID0gdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWVxuXG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSlcblxuICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKClcbiAgICAgICAgKVxuICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbXG4gICAgICAgICAgZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nID8gVHJpZ2dlci5GT0NVUyA6IFRyaWdnZXIuSE9WRVJcbiAgICAgICAgXSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCQoY29udGV4dC5nZXRUaXBFbGVtZW50KCkpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSB8fFxuICAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLlNIT1dcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dChjb250ZXh0Ll90aW1lb3V0KVxuXG4gICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5TSE9XXG5cbiAgICAgIGlmICghY29udGV4dC5jb25maWcuZGVsYXkgfHwgIWNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpIHtcbiAgICAgICAgY29udGV4dC5zaG93KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuU0hPVykge1xuICAgICAgICAgIGNvbnRleHQuc2hvdygpXG4gICAgICAgIH1cbiAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpXG4gICAgfVxuXG4gICAgX2xlYXZlKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICBjb25zdCBkYXRhS2V5ID0gdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWVxuXG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSlcblxuICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKClcbiAgICAgICAgKVxuICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbXG4gICAgICAgICAgZXZlbnQudHlwZSA9PT0gJ2ZvY3Vzb3V0JyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXG4gICAgICAgIF0gPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoY29udGV4dC5fdGltZW91dClcblxuICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuT1VUXG5cbiAgICAgIGlmICghY29udGV4dC5jb25maWcuZGVsYXkgfHwgIWNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpIHtcbiAgICAgICAgY29udGV4dC5oaWRlKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgY29udGV4dC5oaWRlKClcbiAgICAgICAgfVxuICAgICAgfSwgY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSlcbiAgICB9XG5cbiAgICBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICAgIGZvciAoY29uc3QgdHJpZ2dlciBpbiB0aGlzLl9hY3RpdmVUcmlnZ2VyKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVUcmlnZ2VyW3RyaWdnZXJdKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICAuLi50aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsXG4gICAgICAgIC4uLiQodGhpcy5lbGVtZW50KS5kYXRhKCksXG4gICAgICAgIC4uLnR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25maWcuZGVsYXkgPSB7XG4gICAgICAgICAgc2hvdzogY29uZmlnLmRlbGF5LFxuICAgICAgICAgIGhpZGU6IGNvbmZpZy5kZWxheVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRpdGxlID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25maWcudGl0bGUgPSBjb25maWcudGl0bGUudG9TdHJpbmcoKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5jb250ZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25maWcuY29udGVudCA9IGNvbmZpZy5jb250ZW50LnRvU3RyaW5nKClcbiAgICAgIH1cblxuICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoXG4gICAgICAgIE5BTUUsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0VHlwZVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2dldERlbGVnYXRlQ29uZmlnKCkge1xuICAgICAgY29uc3QgY29uZmlnID0ge31cblxuICAgICAgaWYgKHRoaXMuY29uZmlnKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29uZmlnKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFtrZXldICE9PSB0aGlzLmNvbmZpZ1trZXldKSB7XG4gICAgICAgICAgICBjb25maWdba2V5XSA9IHRoaXMuY29uZmlnW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9jbGVhblRpcENsYXNzKCkge1xuICAgICAgY29uc3QgJHRpcCA9ICQodGhpcy5nZXRUaXBFbGVtZW50KCkpXG4gICAgICBjb25zdCB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpXG4gICAgICBpZiAodGFiQ2xhc3MgIT09IG51bGwgJiYgdGFiQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICR0aXAucmVtb3ZlQ2xhc3ModGFiQ2xhc3Muam9pbignJykpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZShwb3BwZXJEYXRhKSB7XG4gICAgICBjb25zdCBwb3BwZXJJbnN0YW5jZSA9IHBvcHBlckRhdGEuaW5zdGFuY2VcbiAgICAgIHRoaXMudGlwID0gcG9wcGVySW5zdGFuY2UucG9wcGVyXG4gICAgICB0aGlzLl9jbGVhblRpcENsYXNzKClcbiAgICAgIHRoaXMuYWRkQXR0YWNobWVudENsYXNzKHRoaXMuX2dldEF0dGFjaG1lbnQocG9wcGVyRGF0YS5wbGFjZW1lbnQpKVxuICAgIH1cblxuICAgIF9maXhUcmFuc2l0aW9uKCkge1xuICAgICAgY29uc3QgdGlwID0gdGhpcy5nZXRUaXBFbGVtZW50KClcbiAgICAgIGNvbnN0IGluaXRDb25maWdBbmltYXRpb24gPSB0aGlzLmNvbmZpZy5hbmltYXRpb25cbiAgICAgIGlmICh0aXAuZ2V0QXR0cmlidXRlKCd4LXBsYWNlbWVudCcpICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgJCh0aXApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFKVxuICAgICAgdGhpcy5jb25maWcuYW5pbWF0aW9uID0gZmFsc2VcbiAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB0aGlzLnNob3coKVxuICAgICAgdGhpcy5jb25maWcuYW5pbWF0aW9uID0gaW5pdENvbmZpZ0FuaW1hdGlvblxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcblxuICAgICAgICBpZiAoIWRhdGEgJiYgL2Rpc3Bvc2V8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFRvb2x0aXAodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IFRvb2x0aXAuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVG9vbHRpcFxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBUb29sdGlwXG59KSgkLCBQb3BwZXIpXG5cbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXBcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBUb29sdGlwIGZyb20gJy4vdG9vbHRpcCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBwb3BvdmVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBQb3BvdmVyID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgID0gJ3BvcG92ZXInXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgPSAnYnMucG9wb3ZlcidcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG4gIGNvbnN0IENMQVNTX1BSRUZJWCAgICAgICAgPSAnYnMtcG9wb3ZlcidcbiAgY29uc3QgQlNDTFNfUFJFRklYX1JFR0VYICA9IG5ldyBSZWdFeHAoYChefFxcXFxzKSR7Q0xBU1NfUFJFRklYfVxcXFxTK2AsICdnJylcblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIC4uLlRvb2x0aXAuRGVmYXVsdCxcbiAgICBwbGFjZW1lbnQgOiAncmlnaHQnLFxuICAgIHRyaWdnZXIgICA6ICdjbGljaycsXG4gICAgY29udGVudCAgIDogJycsXG4gICAgdGVtcGxhdGUgIDogJzxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCI+PC9oMz4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBvcG92ZXItYm9keVwiPjwvZGl2PjwvZGl2PidcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIC4uLlRvb2x0aXAuRGVmYXVsdFR5cGUsXG4gICAgY29udGVudCA6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJ1xuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIEZBREUgOiAnZmFkZScsXG4gICAgU0hPVyA6ICdzaG93J1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgVElUTEUgICA6ICcucG9wb3Zlci1oZWFkZXInLFxuICAgIENPTlRFTlQgOiAnLnBvcG92ZXItYm9keSdcbiAgfVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIEhJREUgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gICAgU0hPV04gICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gICAgSU5TRVJURUQgICA6IGBpbnNlcnRlZCR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0sgICAgICA6IGBjbGljayR7RVZFTlRfS0VZfWAsXG4gICAgRk9DVVNJTiAgICA6IGBmb2N1c2luJHtFVkVOVF9LRVl9YCxcbiAgICBGT0NVU09VVCAgIDogYGZvY3Vzb3V0JHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUVOVEVSIDogYG1vdXNlZW50ZXIke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFTEVBVkUgOiBgbW91c2VsZWF2ZSR7RVZFTlRfS0VZfWBcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgUG9wb3ZlciBleHRlbmRzIFRvb2x0aXAge1xuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICByZXR1cm4gTkFNRVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgREFUQV9LRVkoKSB7XG4gICAgICByZXR1cm4gREFUQV9LRVlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEV2ZW50KCkge1xuICAgICAgcmV0dXJuIEV2ZW50XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBFVkVOVF9LRVkoKSB7XG4gICAgICByZXR1cm4gRVZFTlRfS0VZXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlc1xuXG4gICAgaXNXaXRoQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgfVxuXG4gICAgYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpIHtcbiAgICAgICQodGhpcy5nZXRUaXBFbGVtZW50KCkpLmFkZENsYXNzKGAke0NMQVNTX1BSRUZJWH0tJHthdHRhY2htZW50fWApXG4gICAgfVxuXG4gICAgZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJCh0aGlzLmNvbmZpZy50ZW1wbGF0ZSlbMF1cbiAgICAgIHJldHVybiB0aGlzLnRpcFxuICAgIH1cblxuICAgIHNldENvbnRlbnQoKSB7XG4gICAgICBjb25zdCAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSlcblxuICAgICAgLy8gV2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuVElUTEUpLCB0aGlzLmdldFRpdGxlKCkpXG4gICAgICBsZXQgY29udGVudCA9IHRoaXMuX2dldENvbnRlbnQoKVxuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50LmNhbGwodGhpcy5lbGVtZW50KVxuICAgICAgfVxuICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuQ09OVEVOVCksIGNvbnRlbnQpXG5cbiAgICAgICR0aXAucmVtb3ZlQ2xhc3MoYCR7Q2xhc3NOYW1lLkZBREV9ICR7Q2xhc3NOYW1lLlNIT1d9YClcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfZ2V0Q29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSB8fFxuICAgICAgICB0aGlzLmNvbmZpZy5jb250ZW50XG4gICAgfVxuXG4gICAgX2NsZWFuVGlwQ2xhc3MoKSB7XG4gICAgICBjb25zdCAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSlcbiAgICAgIGNvbnN0IHRhYkNsYXNzID0gJHRpcC5hdHRyKCdjbGFzcycpLm1hdGNoKEJTQ0xTX1BSRUZJWF9SRUdFWClcbiAgICAgIGlmICh0YWJDbGFzcyAhPT0gbnVsbCAmJiB0YWJDbGFzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICR0aXAucmVtb3ZlQ2xhc3ModGFiQ2xhc3Muam9pbignJykpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbFxuXG4gICAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgUG9wb3Zlcih0aGlzLCBfY29uZmlnKVxuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gUG9wb3Zlci5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBQb3BvdmVyXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIFBvcG92ZXJcbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXJcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBzY3JvbGxzcHkuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFNjcm9sbFNweSA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ3Njcm9sbHNweSdcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnYnMuc2Nyb2xsc3B5J1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgPSAnLmRhdGEtYXBpJ1xuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBvZmZzZXQgOiAxMCxcbiAgICBtZXRob2QgOiAnYXV0bycsXG4gICAgdGFyZ2V0IDogJydcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIG9mZnNldCA6ICdudW1iZXInLFxuICAgIG1ldGhvZCA6ICdzdHJpbmcnLFxuICAgIHRhcmdldCA6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgQUNUSVZBVEUgICAgICA6IGBhY3RpdmF0ZSR7RVZFTlRfS0VZfWAsXG4gICAgU0NST0xMICAgICAgICA6IGBzY3JvbGwke0VWRU5UX0tFWX1gLFxuICAgIExPQURfREFUQV9BUEkgOiBgbG9hZCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBEUk9QRE9XTl9JVEVNIDogJ2Ryb3Bkb3duLWl0ZW0nLFxuICAgIERST1BET1dOX01FTlUgOiAnZHJvcGRvd24tbWVudScsXG4gICAgQUNUSVZFICAgICAgICA6ICdhY3RpdmUnXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBEQVRBX1NQWSAgICAgICAgOiAnW2RhdGEtc3B5PVwic2Nyb2xsXCJdJyxcbiAgICBBQ1RJVkUgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gICAgTkFWX0xJU1RfR1JPVVAgIDogJy5uYXYsIC5saXN0LWdyb3VwJyxcbiAgICBOQVZfTElOS1MgICAgICAgOiAnLm5hdi1saW5rJyxcbiAgICBOQVZfSVRFTVMgICAgICAgOiAnLm5hdi1pdGVtJyxcbiAgICBMSVNUX0lURU1TICAgICAgOiAnLmxpc3QtZ3JvdXAtaXRlbScsXG4gICAgRFJPUERPV04gICAgICAgIDogJy5kcm9wZG93bicsXG4gICAgRFJPUERPV05fSVRFTVMgIDogJy5kcm9wZG93bi1pdGVtJyxcbiAgICBEUk9QRE9XTl9UT0dHTEUgOiAnLmRyb3Bkb3duLXRvZ2dsZSdcbiAgfVxuXG4gIGNvbnN0IE9mZnNldE1ldGhvZCA9IHtcbiAgICBPRkZTRVQgICA6ICdvZmZzZXQnLFxuICAgIFBPU0lUSU9OIDogJ3Bvc2l0aW9uJ1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBTY3JvbGxTcHkge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBlbGVtZW50LnRhZ05hbWUgPT09ICdCT0RZJyA/IHdpbmRvdyA6IGVsZW1lbnRcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgICAgdGhpcy5fc2VsZWN0b3IgICAgICA9IGAke3RoaXMuX2NvbmZpZy50YXJnZXR9ICR7U2VsZWN0b3IuTkFWX0xJTktTfSxgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLl9jb25maWcudGFyZ2V0fSAke1NlbGVjdG9yLkxJU1RfSVRFTVN9LGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3RoaXMuX2NvbmZpZy50YXJnZXR9ICR7U2VsZWN0b3IuRFJPUERPV05fSVRFTVN9YFxuICAgICAgdGhpcy5fb2Zmc2V0cyAgICAgICA9IFtdXG4gICAgICB0aGlzLl90YXJnZXRzICAgICAgID0gW11cbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCAgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgID0gMFxuXG4gICAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9uKEV2ZW50LlNDUk9MTCwgKGV2ZW50KSA9PiB0aGlzLl9wcm9jZXNzKGV2ZW50KSlcblxuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICAgIHRoaXMuX3Byb2Nlc3MoKVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIHJlZnJlc2goKSB7XG4gICAgICBjb25zdCBhdXRvTWV0aG9kID0gdGhpcy5fc2Nyb2xsRWxlbWVudCA9PT0gdGhpcy5fc2Nyb2xsRWxlbWVudC53aW5kb3dcbiAgICAgICAgPyBPZmZzZXRNZXRob2QuT0ZGU0VUIDogT2Zmc2V0TWV0aG9kLlBPU0lUSU9OXG5cbiAgICAgIGNvbnN0IG9mZnNldE1ldGhvZCA9IHRoaXMuX2NvbmZpZy5tZXRob2QgPT09ICdhdXRvJ1xuICAgICAgICA/IGF1dG9NZXRob2QgOiB0aGlzLl9jb25maWcubWV0aG9kXG5cbiAgICAgIGNvbnN0IG9mZnNldEJhc2UgPSBvZmZzZXRNZXRob2QgPT09IE9mZnNldE1ldGhvZC5QT1NJVElPTlxuICAgICAgICA/IHRoaXMuX2dldFNjcm9sbFRvcCgpIDogMFxuXG4gICAgICB0aGlzLl9vZmZzZXRzID0gW11cbiAgICAgIHRoaXMuX3RhcmdldHMgPSBbXVxuXG4gICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB0aGlzLl9nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgICBjb25zdCB0YXJnZXRzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NlbGVjdG9yKSlcblxuICAgICAgdGFyZ2V0c1xuICAgICAgICAubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgbGV0IHRhcmdldFxuICAgICAgICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgICAgICBpZiAodGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0U2VsZWN0b3IpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0QkNSID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBpZiAodGFyZ2V0QkNSLndpZHRoIHx8IHRhcmdldEJDUi5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyAoZmF0KTogcmVtb3ZlIHNrZXRjaCByZWxpYW5jZSBvbiBqUXVlcnkgcG9zaXRpb24vb2Zmc2V0XG4gICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpW29mZnNldE1ldGhvZF0oKS50b3AgKyBvZmZzZXRCYXNlLFxuICAgICAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGFbMF0gLSBiWzBdKVxuICAgICAgICAuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuX29mZnNldHMucHVzaChpdGVtWzBdKVxuICAgICAgICAgIHRoaXMuX3RhcmdldHMucHVzaChpdGVtWzFdKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gbnVsbFxuICAgICAgdGhpcy5fY29uZmlnICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX3NlbGVjdG9yICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9vZmZzZXRzICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdGFyZ2V0cyAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCAgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgIC4uLnR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRhcmdldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGV0IGlkID0gJChjb25maWcudGFyZ2V0KS5hdHRyKCdpZCcpXG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICBpZCA9IFV0aWwuZ2V0VUlEKE5BTUUpXG4gICAgICAgICAgJChjb25maWcudGFyZ2V0KS5hdHRyKCdpZCcsIGlkKVxuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy50YXJnZXQgPSBgIyR7aWR9YFxuICAgICAgfVxuXG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2dldFNjcm9sbFRvcCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB3aW5kb3dcbiAgICAgICAgPyB0aGlzLl9zY3JvbGxFbGVtZW50LnBhZ2VZT2Zmc2V0IDogdGhpcy5fc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3BcbiAgICB9XG5cbiAgICBfZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IE1hdGgubWF4KFxuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodFxuICAgICAgKVxuICAgIH1cblxuICAgIF9nZXRPZmZzZXRIZWlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudCA9PT0gd2luZG93XG4gICAgICAgID8gd2luZG93LmlubmVySGVpZ2h0IDogdGhpcy5fc2Nyb2xsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICB9XG5cbiAgICBfcHJvY2VzcygpIHtcbiAgICAgIGNvbnN0IHNjcm9sbFRvcCAgICA9IHRoaXMuX2dldFNjcm9sbFRvcCgpICsgdGhpcy5fY29uZmlnLm9mZnNldFxuICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5fZ2V0U2Nyb2xsSGVpZ2h0KClcbiAgICAgIGNvbnN0IG1heFNjcm9sbCAgICA9IHRoaXMuX2NvbmZpZy5vZmZzZXQgK1xuICAgICAgICBzY3JvbGxIZWlnaHQgLVxuICAgICAgICB0aGlzLl9nZXRPZmZzZXRIZWlnaHQoKVxuXG4gICAgICBpZiAodGhpcy5fc2Nyb2xsSGVpZ2h0ICE9PSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0c1t0aGlzLl90YXJnZXRzLmxlbmd0aCAtIDFdXG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGUodGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IHRoaXMuX29mZnNldHNbMF0gJiYgdGhpcy5fb2Zmc2V0c1swXSA+IDApIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgICAgICB0aGlzLl9jbGVhcigpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBvZmZzZXRMZW5ndGggPSB0aGlzLl9vZmZzZXRzLmxlbmd0aFxuICAgICAgZm9yIChsZXQgaSA9IG9mZnNldExlbmd0aDsgaS0tOykge1xuICAgICAgICBjb25zdCBpc0FjdGl2ZVRhcmdldCA9IHRoaXMuX2FjdGl2ZVRhcmdldCAhPT0gdGhpcy5fdGFyZ2V0c1tpXSAmJlxuICAgICAgICAgICAgc2Nyb2xsVG9wID49IHRoaXMuX29mZnNldHNbaV0gJiZcbiAgICAgICAgICAgICh0eXBlb2YgdGhpcy5fb2Zmc2V0c1tpICsgMV0gPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1tpICsgMV0pXG5cbiAgICAgICAgaWYgKGlzQWN0aXZlVGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGUodGhpcy5fdGFyZ2V0c1tpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIF9hY3RpdmF0ZSh0YXJnZXQpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IHRhcmdldFxuXG4gICAgICB0aGlzLl9jbGVhcigpXG5cbiAgICAgIGxldCBxdWVyaWVzID0gdGhpcy5fc2VsZWN0b3Iuc3BsaXQoJywnKVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycm93LWJvZHktc3R5bGVcbiAgICAgIHF1ZXJpZXMgPSBxdWVyaWVzLm1hcCgoc2VsZWN0b3IpID0+IHtcbiAgICAgICAgcmV0dXJuIGAke3NlbGVjdG9yfVtkYXRhLXRhcmdldD1cIiR7dGFyZ2V0fVwiXSxgICtcbiAgICAgICAgICAgICAgIGAke3NlbGVjdG9yfVtocmVmPVwiJHt0YXJnZXR9XCJdYFxuICAgICAgfSlcblxuICAgICAgY29uc3QgJGxpbmsgPSAkKFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyaWVzLmpvaW4oJywnKSkpKVxuXG4gICAgICBpZiAoJGxpbmsuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BET1dOX0lURU0pKSB7XG4gICAgICAgICRsaW5rLmNsb3Nlc3QoU2VsZWN0b3IuRFJPUERPV04pLmZpbmQoU2VsZWN0b3IuRFJPUERPV05fVE9HR0xFKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICAkbGluay5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IHRyaWdnZXJlZCBsaW5rIGFzIGFjdGl2ZVxuICAgICAgICAkbGluay5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICAvLyBTZXQgdHJpZ2dlcmVkIGxpbmtzIHBhcmVudHMgYXMgYWN0aXZlXG4gICAgICAgIC8vIFdpdGggYm90aCA8dWw+IGFuZCA8bmF2PiBtYXJrdXAgYSBwYXJlbnQgaXMgdGhlIHByZXZpb3VzIHNpYmxpbmcgb2YgYW55IG5hdiBhbmNlc3RvclxuICAgICAgICAkbGluay5wYXJlbnRzKFNlbGVjdG9yLk5BVl9MSVNUX0dST1VQKS5wcmV2KGAke1NlbGVjdG9yLk5BVl9MSU5LU30sICR7U2VsZWN0b3IuTElTVF9JVEVNU31gKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlIHdoZW4gLm5hdi1saW5rIGlzIGluc2lkZSAubmF2LWl0ZW1cbiAgICAgICAgJGxpbmsucGFyZW50cyhTZWxlY3Rvci5OQVZfTElTVF9HUk9VUCkucHJldihTZWxlY3Rvci5OQVZfSVRFTVMpLmNoaWxkcmVuKFNlbGVjdG9yLk5BVl9MSU5LUykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9zY3JvbGxFbGVtZW50KS50cmlnZ2VyKEV2ZW50LkFDVElWQVRFLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRhcmdldFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBfY2xlYXIoKSB7XG4gICAgICBjb25zdCBub2RlcyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZWxlY3RvcikpXG4gICAgICAkKG5vZGVzKS5maWx0ZXIoU2VsZWN0b3IuQUNUSVZFKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFNjcm9sbFNweSh0aGlzLCBfY29uZmlnKVxuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQod2luZG93KS5vbihFdmVudC5MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsU3B5cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1NQWSkpXG5cbiAgICBjb25zdCBzY3JvbGxTcHlzTGVuZ3RoID0gc2Nyb2xsU3B5cy5sZW5ndGhcbiAgICBmb3IgKGxldCBpID0gc2Nyb2xsU3B5c0xlbmd0aDsgaS0tOykge1xuICAgICAgY29uc3QgJHNweSA9ICQoc2Nyb2xsU3B5c1tpXSlcbiAgICAgIFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIFNjcm9sbFNweVxufSkoJClcblxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsU3B5XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogdGFiLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBUYWIgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICd0YWInXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjEuMydcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2JzLnRhYidcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIEhJREUgICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICAgIEhJRERFTiAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gICAgU0hPVyAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gICAgU0hPV04gICAgICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLX0RBVEFfQVBJIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIERST1BET1dOX01FTlUgOiAnZHJvcGRvd24tbWVudScsXG4gICAgQUNUSVZFICAgICAgICA6ICdhY3RpdmUnLFxuICAgIERJU0FCTEVEICAgICAgOiAnZGlzYWJsZWQnLFxuICAgIEZBREUgICAgICAgICAgOiAnZmFkZScsXG4gICAgU0hPVyAgICAgICAgICA6ICdzaG93J1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgRFJPUERPV04gICAgICAgICAgICAgIDogJy5kcm9wZG93bicsXG4gICAgTkFWX0xJU1RfR1JPVVAgICAgICAgIDogJy5uYXYsIC5saXN0LWdyb3VwJyxcbiAgICBBQ1RJVkUgICAgICAgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gICAgQUNUSVZFX1VMICAgICAgICAgICAgIDogJz4gbGkgPiAuYWN0aXZlJyxcbiAgICBEQVRBX1RPR0dMRSAgICAgICAgICAgOiAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS10b2dnbGU9XCJwaWxsXCJdLCBbZGF0YS10b2dnbGU9XCJsaXN0XCJdJyxcbiAgICBEUk9QRE9XTl9UT0dHTEUgICAgICAgOiAnLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgRFJPUERPV05fQUNUSVZFX0NISUxEIDogJz4gLmRyb3Bkb3duLW1lbnUgLmFjdGl2ZSdcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgVGFiIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICBzaG93KCkge1xuICAgICAgaWYgKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSAmJlxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiZcbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpIHx8XG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgdGFyZ2V0XG4gICAgICBsZXQgcHJldmlvdXNcbiAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLk5BVl9MSVNUX0dST1VQKVswXVxuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgaWYgKGxpc3RFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1TZWxlY3RvciA9IGxpc3RFbGVtZW50Lm5vZGVOYW1lID09PSAnVUwnID8gU2VsZWN0b3IuQUNUSVZFX1VMIDogU2VsZWN0b3IuQUNUSVZFXG4gICAgICAgIHByZXZpb3VzID0gJC5tYWtlQXJyYXkoJChsaXN0RWxlbWVudCkuZmluZChpdGVtU2VsZWN0b3IpKVxuICAgICAgICBwcmV2aW91cyA9IHByZXZpb3VzW3ByZXZpb3VzLmxlbmd0aCAtIDFdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KVxuXG4gICAgICBjb25zdCBzaG93RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1csIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICAgIH0pXG5cbiAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICAkKHByZXZpb3VzKS50cmlnZ2VyKGhpZGVFdmVudClcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudClcblxuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fFxuICAgICAgICAgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWN0aXZhdGUoXG4gICAgICAgIHRoaXMuX2VsZW1lbnQsXG4gICAgICAgIGxpc3RFbGVtZW50XG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBoaWRkZW5FdmVudCA9ICQuRXZlbnQoRXZlbnQuSElEREVOLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHNob3duRXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1dOLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICAgICAgfSlcblxuICAgICAgICAkKHByZXZpb3VzKS50cmlnZ2VyKGhpZGRlbkV2ZW50KVxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudClcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0YXJnZXQsIHRhcmdldC5wYXJlbnROb2RlLCBjb21wbGV0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfYWN0aXZhdGUoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgICAgbGV0IGFjdGl2ZUVsZW1lbnRzXG4gICAgICBpZiAoY29udGFpbmVyLm5vZGVOYW1lID09PSAnVUwnKSB7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnRzID0gJChjb250YWluZXIpLmZpbmQoU2VsZWN0b3IuQUNUSVZFX1VMKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlRWxlbWVudHMgPSAkKGNvbnRhaW5lcikuY2hpbGRyZW4oU2VsZWN0b3IuQUNUSVZFKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhY3RpdmUgPSBhY3RpdmVFbGVtZW50c1swXVxuICAgICAgY29uc3QgaXNUcmFuc2l0aW9uaW5nID0gY2FsbGJhY2sgJiZcbiAgICAgICAgKGFjdGl2ZSAmJiAkKGFjdGl2ZSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHRoaXMuX3RyYW5zaXRpb25Db21wbGV0ZShcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgYWN0aXZlLFxuICAgICAgICBjYWxsYmFja1xuICAgICAgKVxuXG4gICAgICBpZiAoYWN0aXZlICYmIGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZSlcblxuICAgICAgICAkKGFjdGl2ZSlcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zaXRpb25Db21wbGV0ZShlbGVtZW50LCBhY3RpdmUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICQoYWN0aXZlKS5yZW1vdmVDbGFzcyhgJHtDbGFzc05hbWUuU0hPV30gJHtDbGFzc05hbWUuQUNUSVZFfWApXG5cbiAgICAgICAgY29uc3QgZHJvcGRvd25DaGlsZCA9ICQoYWN0aXZlLnBhcmVudE5vZGUpLmZpbmQoXG4gICAgICAgICAgU2VsZWN0b3IuRFJPUERPV05fQUNUSVZFX0NISUxEXG4gICAgICAgIClbMF1cblxuICAgICAgICBpZiAoZHJvcGRvd25DaGlsZCkge1xuICAgICAgICAgICQoZHJvcGRvd25DaGlsZCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3RpdmUuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICd0YWInKSB7XG4gICAgICAgICAgYWN0aXZlLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAndGFiJykge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIFV0aWwucmVmbG93KGVsZW1lbnQpXG4gICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICYmXG4gICAgICAgICAgJChlbGVtZW50LnBhcmVudE5vZGUpLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9NRU5VKSkge1xuICAgICAgICBjb25zdCBkcm9wZG93bkVsZW1lbnQgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoU2VsZWN0b3IuRFJPUERPV04pWzBdXG4gICAgICAgIGlmIChkcm9wZG93bkVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCBkcm9wZG93blRvZ2dsZUxpc3QgPSBbXS5zbGljZS5jYWxsKGRyb3Bkb3duRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRST1BET1dOX1RPR0dMRSkpXG4gICAgICAgICAgJChkcm9wZG93blRvZ2dsZUxpc3QpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcylcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKERBVEFfS0VZKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgVGFiKHRoaXMpXG4gICAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBUYWIuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGhpcyksICdzaG93JylcbiAgICB9KVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gVGFiLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRhYlxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBUYWIuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIFRhYlxufSkoJClcblxuZXhwb3J0IGRlZmF1bHQgVGFiXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQWxlcnQgZnJvbSAnLi9hbGVydCdcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9idXR0b24nXG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jYXJvdXNlbCdcbmltcG9ydCBDb2xsYXBzZSBmcm9tICcuL2NvbGxhcHNlJ1xuaW1wb3J0IERyb3Bkb3duIGZyb20gJy4vZHJvcGRvd24nXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbCdcbmltcG9ydCBQb3BvdmVyIGZyb20gJy4vcG9wb3ZlcidcbmltcG9ydCBTY3JvbGxzcHkgZnJvbSAnLi9zY3JvbGxzcHknXG5pbXBvcnQgVGFiIGZyb20gJy4vdGFiJ1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi90b29sdGlwJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJ1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjEuMyk6IGluZGV4LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4oKCQpID0+IHtcbiAgaWYgKHR5cGVvZiAkID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkuIGpRdWVyeSBtdXN0IGJlIGluY2x1ZGVkIGJlZm9yZSBCb290c3RyYXBcXCdzIEphdmFTY3JpcHQuJylcbiAgfVxuXG4gIGNvbnN0IHZlcnNpb24gPSAkLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJylcbiAgY29uc3QgbWluTWFqb3IgPSAxXG4gIGNvbnN0IGx0TWFqb3IgPSAyXG4gIGNvbnN0IG1pbk1pbm9yID0gOVxuICBjb25zdCBtaW5QYXRjaCA9IDFcbiAgY29uc3QgbWF4TWFqb3IgPSA0XG5cbiAgaWYgKHZlcnNpb25bMF0gPCBsdE1ham9yICYmIHZlcnNpb25bMV0gPCBtaW5NaW5vciB8fCB2ZXJzaW9uWzBdID09PSBtaW5NYWpvciAmJiB2ZXJzaW9uWzFdID09PSBtaW5NaW5vciAmJiB2ZXJzaW9uWzJdIDwgbWluUGF0Y2ggfHwgdmVyc2lvblswXSA+PSBtYXhNYWpvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGF0IGxlYXN0IGpRdWVyeSB2MS45LjEgYnV0IGxlc3MgdGhhbiB2NC4wLjAnKVxuICB9XG59KSgkKVxuXG5leHBvcnQge1xuICBVdGlsLFxuICBBbGVydCxcbiAgQnV0dG9uLFxuICBDYXJvdXNlbCxcbiAgQ29sbGFwc2UsXG4gIERyb3Bkb3duLFxuICBNb2RhbCxcbiAgUG9wb3ZlcixcbiAgU2Nyb2xsc3B5LFxuICBUYWIsXG4gIFRvb2x0aXBcbn1cbiJdLCJuYW1lcyI6WyJVdGlsIiwiJCIsIlRSQU5TSVRJT05fRU5EIiwiTUFYX1VJRCIsIk1JTExJU0VDT05EU19NVUxUSVBMSUVSIiwidG9UeXBlIiwib2JqIiwidG9TdHJpbmciLCJjYWxsIiwibWF0Y2giLCJ0b0xvd2VyQ2FzZSIsImdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQiLCJiaW5kVHlwZSIsImRlbGVnYXRlVHlwZSIsImhhbmRsZSIsImV2ZW50IiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uRW5kRW11bGF0b3IiLCJkdXJhdGlvbiIsImNhbGxlZCIsIm9uZSIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyVHJhbnNpdGlvbkVuZCIsInNldFRyYW5zaXRpb25FbmRTdXBwb3J0IiwiZm4iLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsInNwZWNpYWwiLCJnZXRVSUQiLCJwcmVmaXgiLCJNYXRoIiwicmFuZG9tIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldFNlbGVjdG9yRnJvbUVsZW1lbnQiLCJlbGVtZW50Iiwic2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwiZXJyIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJjc3MiLCJmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJzcGxpdCIsInJlZmxvdyIsIm9mZnNldEhlaWdodCIsInRyaWdnZXIiLCJzdXBwb3J0c1RyYW5zaXRpb25FbmQiLCJCb29sZWFuIiwiaXNFbGVtZW50Iiwibm9kZVR5cGUiLCJ0eXBlQ2hlY2tDb25maWciLCJjb21wb25lbnROYW1lIiwiY29uZmlnIiwiY29uZmlnVHlwZXMiLCJwcm9wZXJ0eSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiZXhwZWN0ZWRUeXBlcyIsInZhbHVlIiwidmFsdWVUeXBlIiwiUmVnRXhwIiwidGVzdCIsIkVycm9yIiwidG9VcHBlckNhc2UiLCJBbGVydCIsIk5BTUUiLCJWRVJTSU9OIiwiREFUQV9LRVkiLCJFVkVOVF9LRVkiLCJEQVRBX0FQSV9LRVkiLCJKUVVFUllfTk9fQ09ORkxJQ1QiLCJTZWxlY3RvciIsIkRJU01JU1MiLCJFdmVudCIsIkNMT1NFIiwiQ0xPU0VEIiwiQ0xJQ0tfREFUQV9BUEkiLCJDbGFzc05hbWUiLCJBTEVSVCIsIkZBREUiLCJTSE9XIiwiX2VsZW1lbnQiLCJjbG9zZSIsInJvb3RFbGVtZW50IiwiX2dldFJvb3RFbGVtZW50IiwiY3VzdG9tRXZlbnQiLCJfdHJpZ2dlckNsb3NlRXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJfcmVtb3ZlRWxlbWVudCIsImRpc3Bvc2UiLCJyZW1vdmVEYXRhIiwicGFyZW50IiwiY2xvc2VzdCIsImNsb3NlRXZlbnQiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiX2Rlc3Ryb3lFbGVtZW50IiwiZGV0YWNoIiwicmVtb3ZlIiwiX2pRdWVyeUludGVyZmFjZSIsImVhY2giLCIkZWxlbWVudCIsImRhdGEiLCJfaGFuZGxlRGlzbWlzcyIsImFsZXJ0SW5zdGFuY2UiLCJwcmV2ZW50RGVmYXVsdCIsIm9uIiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0IiwiQnV0dG9uIiwiQUNUSVZFIiwiQlVUVE9OIiwiRk9DVVMiLCJEQVRBX1RPR0dMRV9DQVJST1QiLCJEQVRBX1RPR0dMRSIsIklOUFVUIiwiRk9DVVNfQkxVUl9EQVRBX0FQSSIsInRvZ2dsZSIsInRyaWdnZXJDaGFuZ2VFdmVudCIsImFkZEFyaWFQcmVzc2VkIiwiaW5wdXQiLCJ0eXBlIiwiY2hlY2tlZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWN0aXZlRWxlbWVudCIsImhhc0F0dHJpYnV0ZSIsImZvY3VzIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlQ2xhc3MiLCJidXR0b24iLCJDYXJvdXNlbCIsIkFSUk9XX0xFRlRfS0VZQ09ERSIsIkFSUk9XX1JJR0hUX0tFWUNPREUiLCJUT1VDSEVWRU5UX0NPTVBBVF9XQUlUIiwiRGVmYXVsdCIsImludGVydmFsIiwia2V5Ym9hcmQiLCJzbGlkZSIsInBhdXNlIiwid3JhcCIsIkRlZmF1bHRUeXBlIiwiRGlyZWN0aW9uIiwiTkVYVCIsIlBSRVYiLCJMRUZUIiwiUklHSFQiLCJTTElERSIsIlNMSUQiLCJLRVlET1dOIiwiTU9VU0VFTlRFUiIsIk1PVVNFTEVBVkUiLCJUT1VDSEVORCIsIkxPQURfREFUQV9BUEkiLCJDQVJPVVNFTCIsIklURU0iLCJBQ1RJVkVfSVRFTSIsIk5FWFRfUFJFViIsIklORElDQVRPUlMiLCJEQVRBX1NMSURFIiwiREFUQV9SSURFIiwiX2l0ZW1zIiwiX2ludGVydmFsIiwiX2FjdGl2ZUVsZW1lbnQiLCJfaXNQYXVzZWQiLCJfaXNTbGlkaW5nIiwidG91Y2hUaW1lb3V0IiwiX2NvbmZpZyIsIl9nZXRDb25maWciLCJfaW5kaWNhdG9yc0VsZW1lbnQiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJuZXh0IiwiX3NsaWRlIiwibmV4dFdoZW5WaXNpYmxlIiwiaGlkZGVuIiwicHJldiIsImN5Y2xlIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwidmlzaWJpbGl0eVN0YXRlIiwiYmluZCIsInRvIiwiaW5kZXgiLCJhY3RpdmVJbmRleCIsIl9nZXRJdGVtSW5kZXgiLCJsZW5ndGgiLCJkaXJlY3Rpb24iLCJvZmYiLCJfa2V5ZG93biIsImRvY3VtZW50RWxlbWVudCIsImNsZWFyVGltZW91dCIsInRhZ05hbWUiLCJ3aGljaCIsInBhcmVudE5vZGUiLCJzbGljZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmRleE9mIiwiX2dldEl0ZW1CeURpcmVjdGlvbiIsImlzTmV4dERpcmVjdGlvbiIsImlzUHJldkRpcmVjdGlvbiIsImxhc3RJdGVtSW5kZXgiLCJpc0dvaW5nVG9XcmFwIiwiZGVsdGEiLCJpdGVtSW5kZXgiLCJfdHJpZ2dlclNsaWRlRXZlbnQiLCJyZWxhdGVkVGFyZ2V0IiwiZXZlbnREaXJlY3Rpb25OYW1lIiwidGFyZ2V0SW5kZXgiLCJmcm9tSW5kZXgiLCJzbGlkZUV2ZW50IiwiZnJvbSIsIl9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50IiwiaW5kaWNhdG9ycyIsIm5leHRJbmRpY2F0b3IiLCJjaGlsZHJlbiIsImFkZENsYXNzIiwiYWN0aXZlRWxlbWVudEluZGV4IiwibmV4dEVsZW1lbnQiLCJuZXh0RWxlbWVudEluZGV4IiwiaXNDeWNsaW5nIiwiZGlyZWN0aW9uYWxDbGFzc05hbWUiLCJvcmRlckNsYXNzTmFtZSIsInNsaWRFdmVudCIsImFjdGlvbiIsIlR5cGVFcnJvciIsIl9kYXRhQXBpQ2xpY2tIYW5kbGVyIiwic2xpZGVJbmRleCIsIndpbmRvdyIsImNhcm91c2VscyIsImkiLCJsZW4iLCIkY2Fyb3VzZWwiLCJDb2xsYXBzZSIsIlNIT1dOIiwiSElERSIsIkhJRERFTiIsIkNPTExBUFNFIiwiQ09MTEFQU0lORyIsIkNPTExBUFNFRCIsIkRpbWVuc2lvbiIsIldJRFRIIiwiSEVJR0hUIiwiQUNUSVZFUyIsIl9pc1RyYW5zaXRpb25pbmciLCJfdHJpZ2dlckFycmF5IiwibWFrZUFycmF5IiwiaWQiLCJ0b2dnbGVMaXN0IiwiZWxlbSIsImZpbHRlckVsZW1lbnQiLCJmaWx0ZXIiLCJmb3VuZEVsZW0iLCJfc2VsZWN0b3IiLCJwdXNoIiwiX3BhcmVudCIsIl9nZXRQYXJlbnQiLCJfYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzIiwiaGlkZSIsInNob3ciLCJhY3RpdmVzIiwiYWN0aXZlc0RhdGEiLCJub3QiLCJzdGFydEV2ZW50IiwiZGltZW5zaW9uIiwiX2dldERpbWVuc2lvbiIsInN0eWxlIiwiYXR0ciIsInNldFRyYW5zaXRpb25pbmciLCJjb21wbGV0ZSIsImNhcGl0YWxpemVkRGltZW5zaW9uIiwic2Nyb2xsU2l6ZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRyaWdnZXJBcnJheUxlbmd0aCIsIiRlbGVtIiwiaXNUcmFuc2l0aW9uaW5nIiwiaGFzV2lkdGgiLCJqcXVlcnkiLCJfZ2V0VGFyZ2V0RnJvbUVsZW1lbnQiLCJ0cmlnZ2VyQXJyYXkiLCJpc09wZW4iLCIkdGhpcyIsImN1cnJlbnRUYXJnZXQiLCIkdHJpZ2dlciIsInNlbGVjdG9ycyIsIiR0YXJnZXQiLCJEcm9wZG93biIsIkVTQ0FQRV9LRVlDT0RFIiwiU1BBQ0VfS0VZQ09ERSIsIlRBQl9LRVlDT0RFIiwiQVJST1dfVVBfS0VZQ09ERSIsIkFSUk9XX0RPV05fS0VZQ09ERSIsIlJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCIsIlJFR0VYUF9LRVlET1dOIiwiQ0xJQ0siLCJLRVlET1dOX0RBVEFfQVBJIiwiS0VZVVBfREFUQV9BUEkiLCJESVNBQkxFRCIsIkRST1BVUCIsIkRST1BSSUdIVCIsIkRST1BMRUZUIiwiTUVOVVJJR0hUIiwiTUVOVUxFRlQiLCJQT1NJVElPTl9TVEFUSUMiLCJGT1JNX0NISUxEIiwiTUVOVSIsIk5BVkJBUl9OQVYiLCJWSVNJQkxFX0lURU1TIiwiQXR0YWNobWVudE1hcCIsIlRPUCIsIlRPUEVORCIsIkJPVFRPTSIsIkJPVFRPTUVORCIsIlJJR0hURU5EIiwiTEVGVEVORCIsIm9mZnNldCIsImZsaXAiLCJib3VuZGFyeSIsInJlZmVyZW5jZSIsImRpc3BsYXkiLCJfcG9wcGVyIiwiX21lbnUiLCJfZ2V0TWVudUVsZW1lbnQiLCJfaW5OYXZiYXIiLCJfZGV0ZWN0TmF2YmFyIiwiZGlzYWJsZWQiLCJfZ2V0UGFyZW50RnJvbUVsZW1lbnQiLCJpc0FjdGl2ZSIsIl9jbGVhck1lbnVzIiwic2hvd0V2ZW50IiwiUG9wcGVyIiwicmVmZXJlbmNlRWxlbWVudCIsIl9nZXRQb3BwZXJDb25maWciLCJib2R5Iiwibm9vcCIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJzY2hlZHVsZVVwZGF0ZSIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnN0cnVjdG9yIiwiX2dldFBsYWNlbWVudCIsIiRwYXJlbnREcm9wZG93biIsInBsYWNlbWVudCIsIm9mZnNldENvbmYiLCJvZmZzZXRzIiwicG9wcGVyQ29uZmlnIiwibW9kaWZpZXJzIiwiZW5hYmxlZCIsInByZXZlbnRPdmVyZmxvdyIsImJvdW5kYXJpZXNFbGVtZW50IiwiYXBwbHlTdHlsZSIsInRvZ2dsZXMiLCJjb250ZXh0IiwiY2xpY2tFdmVudCIsImRyb3Bkb3duTWVudSIsImhpZGVFdmVudCIsIl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIiLCJpdGVtcyIsImUiLCJNb2RhbCIsImJhY2tkcm9wIiwiRk9DVVNJTiIsIlJFU0laRSIsIkNMSUNLX0RJU01JU1MiLCJLRVlET1dOX0RJU01JU1MiLCJNT1VTRVVQX0RJU01JU1MiLCJNT1VTRURPV05fRElTTUlTUyIsIlNDUk9MTEJBUl9NRUFTVVJFUiIsIkJBQ0tEUk9QIiwiT1BFTiIsIkRJQUxPRyIsIkRBVEFfRElTTUlTUyIsIkZJWEVEX0NPTlRFTlQiLCJTVElDS1lfQ09OVEVOVCIsIl9kaWFsb2ciLCJfYmFja2Ryb3AiLCJfaXNTaG93biIsIl9pc0JvZHlPdmVyZmxvd2luZyIsIl9pZ25vcmVCYWNrZHJvcENsaWNrIiwiX3Njcm9sbGJhcldpZHRoIiwiX2NoZWNrU2Nyb2xsYmFyIiwiX3NldFNjcm9sbGJhciIsIl9hZGp1c3REaWFsb2ciLCJfc2V0RXNjYXBlRXZlbnQiLCJfc2V0UmVzaXplRXZlbnQiLCJfc2hvd0JhY2tkcm9wIiwiX3Nob3dFbGVtZW50IiwidHJhbnNpdGlvbiIsIl9oaWRlTW9kYWwiLCJoYW5kbGVVcGRhdGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzY3JvbGxUb3AiLCJfZW5mb3JjZUZvY3VzIiwic2hvd25FdmVudCIsInRyYW5zaXRpb25Db21wbGV0ZSIsImhhcyIsIl9yZXNldEFkanVzdG1lbnRzIiwiX3Jlc2V0U2Nyb2xsYmFyIiwiX3JlbW92ZUJhY2tkcm9wIiwiY2FsbGJhY2siLCJhbmltYXRlIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFkZCIsImFwcGVuZFRvIiwiYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24iLCJjYWxsYmFja1JlbW92ZSIsImlzTW9kYWxPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicmVjdCIsImxlZnQiLCJyaWdodCIsImlubmVyV2lkdGgiLCJfZ2V0U2Nyb2xsYmFyV2lkdGgiLCJmaXhlZENvbnRlbnQiLCJzdGlja3lDb250ZW50IiwiYWN0dWFsUGFkZGluZyIsImNhbGN1bGF0ZWRQYWRkaW5nIiwiYWN0dWFsTWFyZ2luIiwibWFyZ2luUmlnaHQiLCJjYWxjdWxhdGVkTWFyZ2luIiwicGFkZGluZyIsImVsZW1lbnRzIiwibWFyZ2luIiwic2Nyb2xsRGl2Iiwic2Nyb2xsYmFyV2lkdGgiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJUb29sdGlwIiwiQ0xBU1NfUFJFRklYIiwiQlNDTFNfUFJFRklYX1JFR0VYIiwiYW5pbWF0aW9uIiwidGVtcGxhdGUiLCJ0aXRsZSIsImRlbGF5IiwiaHRtbCIsImNvbnRhaW5lciIsImZhbGxiYWNrUGxhY2VtZW50IiwiQVVUTyIsIkhvdmVyU3RhdGUiLCJPVVQiLCJJTlNFUlRFRCIsIkZPQ1VTT1VUIiwiVE9PTFRJUCIsIlRPT0xUSVBfSU5ORVIiLCJBUlJPVyIsIlRyaWdnZXIiLCJIT1ZFUiIsIk1BTlVBTCIsIl9pc0VuYWJsZWQiLCJfdGltZW91dCIsIl9ob3ZlclN0YXRlIiwiX2FjdGl2ZVRyaWdnZXIiLCJ0aXAiLCJfc2V0TGlzdGVuZXJzIiwiZW5hYmxlIiwiZGlzYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJkYXRhS2V5IiwiX2dldERlbGVnYXRlQ29uZmlnIiwiY2xpY2siLCJfaXNXaXRoQWN0aXZlVHJpZ2dlciIsIl9lbnRlciIsIl9sZWF2ZSIsImdldFRpcEVsZW1lbnQiLCJpc1dpdGhDb250ZW50IiwiaXNJblRoZURvbSIsIm93bmVyRG9jdW1lbnQiLCJ0aXBJZCIsInNldENvbnRlbnQiLCJhdHRhY2htZW50IiwiX2dldEF0dGFjaG1lbnQiLCJhZGRBdHRhY2htZW50Q2xhc3MiLCJmaW5kIiwiYmVoYXZpb3IiLCJhcnJvdyIsIm9uQ3JlYXRlIiwib3JpZ2luYWxQbGFjZW1lbnQiLCJfaGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlIiwib25VcGRhdGUiLCJfZml4VHJhbnNpdGlvbiIsInByZXZIb3ZlclN0YXRlIiwiX2NsZWFuVGlwQ2xhc3MiLCJnZXRUaXRsZSIsInNldEVsZW1lbnRDb250ZW50IiwiY29udGVudCIsImVtcHR5IiwiYXBwZW5kIiwidGV4dCIsInRyaWdnZXJzIiwiZm9yRWFjaCIsImV2ZW50SW4iLCJldmVudE91dCIsIl9maXhUaXRsZSIsInRpdGxlVHlwZSIsImtleSIsIiR0aXAiLCJ0YWJDbGFzcyIsImpvaW4iLCJwb3BwZXJEYXRhIiwicG9wcGVySW5zdGFuY2UiLCJpbnN0YW5jZSIsInBvcHBlciIsImluaXRDb25maWdBbmltYXRpb24iLCJQb3BvdmVyIiwiVElUTEUiLCJDT05URU5UIiwiX2dldENvbnRlbnQiLCJTY3JvbGxTcHkiLCJtZXRob2QiLCJBQ1RJVkFURSIsIlNDUk9MTCIsIkRST1BET1dOX0lURU0iLCJEUk9QRE9XTl9NRU5VIiwiREFUQV9TUFkiLCJOQVZfTElTVF9HUk9VUCIsIk5BVl9MSU5LUyIsIk5BVl9JVEVNUyIsIkxJU1RfSVRFTVMiLCJEUk9QRE9XTiIsIkRST1BET1dOX0lURU1TIiwiRFJPUERPV05fVE9HR0xFIiwiT2Zmc2V0TWV0aG9kIiwiT0ZGU0VUIiwiUE9TSVRJT04iLCJfc2Nyb2xsRWxlbWVudCIsIl9vZmZzZXRzIiwiX3RhcmdldHMiLCJfYWN0aXZlVGFyZ2V0IiwiX3Njcm9sbEhlaWdodCIsIl9wcm9jZXNzIiwicmVmcmVzaCIsImF1dG9NZXRob2QiLCJvZmZzZXRNZXRob2QiLCJvZmZzZXRCYXNlIiwiX2dldFNjcm9sbFRvcCIsIl9nZXRTY3JvbGxIZWlnaHQiLCJ0YXJnZXRzIiwibWFwIiwidGFyZ2V0U2VsZWN0b3IiLCJ0YXJnZXRCQ1IiLCJoZWlnaHQiLCJ0b3AiLCJpdGVtIiwic29ydCIsImEiLCJiIiwicGFnZVlPZmZzZXQiLCJtYXgiLCJfZ2V0T2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJtYXhTY3JvbGwiLCJfYWN0aXZhdGUiLCJfY2xlYXIiLCJvZmZzZXRMZW5ndGgiLCJpc0FjdGl2ZVRhcmdldCIsInF1ZXJpZXMiLCIkbGluayIsInBhcmVudHMiLCJub2RlcyIsInNjcm9sbFNweXMiLCJzY3JvbGxTcHlzTGVuZ3RoIiwiJHNweSIsIlRhYiIsIkFDVElWRV9VTCIsIkRST1BET1dOX0FDVElWRV9DSElMRCIsInByZXZpb3VzIiwibGlzdEVsZW1lbnQiLCJpdGVtU2VsZWN0b3IiLCJub2RlTmFtZSIsImhpZGRlbkV2ZW50IiwiYWN0aXZlRWxlbWVudHMiLCJhY3RpdmUiLCJfdHJhbnNpdGlvbkNvbXBsZXRlIiwiZHJvcGRvd25DaGlsZCIsImRyb3Bkb3duRWxlbWVudCIsImRyb3Bkb3duVG9nZ2xlTGlzdCIsInZlcnNpb24iLCJtaW5NYWpvciIsImx0TWFqb3IiLCJtaW5NaW5vciIsIm1pblBhdGNoIiwibWF4TWFqb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUVBOzs7Ozs7O0VBT0EsSUFBTUEsT0FB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RUEsU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtFQUN0QyxFQUFFLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxHQUFHLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztFQUM1QyxFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssS0FBSyxNQUFNLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQzs7RUFFcEQsRUFBRSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7RUFDakgsQ0FBQzs7RUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUU7RUFDbEQsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxRQUFRLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDalQsQ0FBQzs7RUFFRCxTQUFTLGNBQWMsR0FBRztFQUMxQixFQUFFLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENB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TyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVCLENBQUM7O0VBRUQ7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtFQUM3QyxFQUFFLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxTQUFTLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7O0VBRS9HLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLFFBQVEsRUFBRTtFQUM3QyxJQUFJLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0VBQzlCO0VBQ0EsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7RUFDNUUsS0FBSztFQUNMLElBQUksSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDakQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzVDO0VBQ0E7RUFDQTtFQUNBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDL0QsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7RUFFckUsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztFQUNoQyxLQUFLO0VBQ0wsR0FBRyxDQUFDLENBQUM7O0VBRUwsRUFBRSxPQUFPLElBQUksQ0FBQztFQUNkLENBQUM7O0VBRUQ7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7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RUFDSCxDQUFDOztFQUVEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ3RCLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxDQUFDOztFQUVEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO0VBQ3BDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUU7RUFDOUMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFDbEI7RUFDQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDL0csTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2xCLEtBQUs7RUFDTCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztFQUM5QyxHQUFHLENBQUMsQ0FBQztFQUNMLENBQUM7O0VBRUQ7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUU7RUFDNUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtFQUNsRCxJQUFJLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENB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RUFDQTtFQUNBLElBQUksQ0FBQyxFQUFFLFFBQVE7RUFDZjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsSUFBSSxDQUFDLEVBQUUsT0FBTztFQUNkLEdBQUc7O0VBRUg7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsRUFBRSxVQUFVLEVBQUU7RUFDZDtFQUNBLElBQUksS0FBSyxFQUFFLEdBQUc7RUFDZDtFQUNBLElBQUksT0FBTyxFQUFFLElBQUk7RUFDakI7RUFDQSxJQUFJLEVBQUUsRUFBRSxVQUFVO0VBQ2xCO0VBQ0EsSUFBSSxNQUFNLEVBQUUsZ0JBQWdCO0VBQzVCO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLElBQUksZUFBZSxFQUFFLFNBQVM7RUFDOUIsR0FBRztFQUNILENBQUMsQ0FBQzs7RUFFRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxJQUFJLFFBQVEsR0FBRztFQUNmO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsRUFBRSxTQUFTLEVBQUUsUUFBUTs7RUFFckI7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLGFBQWEsRUFBRSxLQUFLOztFQUV0QjtFQUNBO0VBQ0E7RUFDQTtFQUNBLEVBQUUsYUFBYSxFQUFFLElBQUk7O0VBRXJCO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLGVBQWUsRUFBRSxLQUFLOztFQUV4QjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLFFBQVEsRUFBRSxTQUFTLFFBQVEsR0FBRyxFQUFFOztFQUVsQztFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsRUFBRSxRQUFRLEVBQUUsU0FBUyxRQUFRLEdBQUcsRUFBRTs7RUFFbEM7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLEVBQUUsU0FBUyxFQUFFLFNBQVM7RUFDdEIsQ0FBQyxDQUFDOztFQUVGO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQSxJQUFJLE1BQU0sR0FBRyxZQUFZO0VBQ3pCO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLFNBQVMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7RUFDckMsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0VBRXJCLElBQUksSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ3pGLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzs7RUFFakMsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVk7RUFDdEMsTUFBTSxPQUFPLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNqRCxLQUFLLENBQUM7O0VBRU47RUFDQSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0VBRW5EO0VBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7RUFFMUQ7RUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUc7RUFDakIsTUFBTSxXQUFXLEVBQUUsS0FBSztFQUN4QixNQUFNLFNBQVMsRUFBRSxLQUFLO0VBQ3RCLE1BQU0sYUFBYSxFQUFFLEVBQUU7RUFDdkIsS0FBSyxDQUFDOztFQUVOO0VBQ0EsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7RUFDOUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7O0VBRS9EO0VBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7RUFDaEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0VBQ3BHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQzVJLEtBQUssQ0FBQyxDQUFDOztFQUVQO0VBQ0EsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7RUFDN0UsTUFBTSxPQUFPLFFBQVEsQ0FBQztFQUN0QixRQUFRLElBQUksRUFBRSxJQUFJO0VBQ2xCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLEtBQUssQ0FBQztFQUNOO0VBQ0EsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FB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
