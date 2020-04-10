/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYm9vdHN0cmFwLmpzIiwic291cmNlcyI6WyIuLi8uLi9qcy9zcmMvdXRpbC5qcyIsIi4uLy4uL2pzL3NyYy9hbGVydC5qcyIsIi4uLy4uL2pzL3NyYy9idXR0b24uanMiLCIuLi8uLi9qcy9zcmMvY2Fyb3VzZWwuanMiLCIuLi8uLi9qcy9zcmMvY29sbGFwc2UuanMiLCIuLi8uLi9qcy9zcmMvZHJvcGRvd24uanMiLCIuLi8uLi9qcy9zcmMvbW9kYWwuanMiLCIuLi8uLi9qcy9zcmMvdG9vbHRpcC5qcyIsIi4uLy4uL2pzL3NyYy9wb3BvdmVyLmpzIiwiLi4vLi4vanMvc3JjL3Njcm9sbHNweS5qcyIsIi4uLy4uL2pzL3NyYy90YWIuanMiLCIuLi8uLi9qcy9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjEuMyk6IHV0aWwuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFV0aWwgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCdcbiAgY29uc3QgTUFYX1VJRCA9IDEwMDAwMDBcbiAgY29uc3QgTUlMTElTRUNPTkRTX01VTFRJUExJRVIgPSAxMDAwXG5cbiAgLy8gU2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuICBmdW5jdGlvbiB0b1R5cGUob2JqKSB7XG4gICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmluZFR5cGU6IFRSQU5TSVRJT05fRU5ELFxuICAgICAgZGVsZWdhdGVUeXBlOiBUUkFOU0lUSU9OX0VORCxcbiAgICAgIGhhbmRsZShldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZEVtdWxhdG9yKGR1cmF0aW9uKSB7XG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlXG5cbiAgICAkKHRoaXMpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoKSA9PiB7XG4gICAgICBjYWxsZWQgPSB0cnVlXG4gICAgfSlcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgVXRpbC50cmlnZ2VyVHJhbnNpdGlvbkVuZCh0aGlzKVxuICAgICAgfVxuICAgIH0sIGR1cmF0aW9uKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCkge1xuICAgICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uRW5kRW11bGF0b3JcbiAgICAkLmV2ZW50LnNwZWNpYWxbVXRpbC5UUkFOU0lUSU9OX0VORF0gPSBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KClcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQdWJsaWMgVXRpbCBBcGlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgVXRpbCA9IHtcblxuICAgIFRSQU5TSVRJT05fRU5EOiAnYnNUcmFuc2l0aW9uRW5kJyxcblxuICAgIGdldFVJRChwcmVmaXgpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKSAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgICAgcmV0dXJuIHByZWZpeFxuICAgIH0sXG5cbiAgICBnZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG4gICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnXG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbFxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgfSxcblxuICAgIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdHJhbnNpdGlvbi1kdXJhdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgbGV0IHRyYW5zaXRpb25EdXJhdGlvbiA9ICQoZWxlbWVudCkuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJylcbiAgICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pXG5cbiAgICAgIC8vIFJldHVybiAwIGlmIGVsZW1lbnQgb3IgdHJhbnNpdGlvbiBkdXJhdGlvbiBpcyBub3QgZm91bmRcbiAgICAgIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cblxuICAgICAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF1cblxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSXG4gICAgfSxcblxuICAgIHJlZmxvdyhlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICB9LFxuXG4gICAgdHJpZ2dlclRyYW5zaXRpb25FbmQoZWxlbWVudCkge1xuICAgICAgJChlbGVtZW50KS50cmlnZ2VyKFRSQU5TSVRJT05fRU5EKVxuICAgIH0sXG5cbiAgICAvLyBUT0RPOiBSZW1vdmUgaW4gdjVcbiAgICBzdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbihUUkFOU0lUSU9OX0VORClcbiAgICB9LFxuXG4gICAgaXNFbGVtZW50KG9iaikge1xuICAgICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZVxuICAgIH0sXG5cbiAgICB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZSwgY29uZmlnLCBjb25maWdUeXBlcykge1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBjb25maWdUeXBlcykge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZ1R5cGVzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldXG4gICAgICAgICAgY29uc3QgdmFsdWUgICAgICAgICA9IGNvbmZpZ1twcm9wZXJ0eV1cbiAgICAgICAgICBjb25zdCB2YWx1ZVR5cGUgICAgID0gdmFsdWUgJiYgVXRpbC5pc0VsZW1lbnQodmFsdWUpXG4gICAgICAgICAgICA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSlcblxuICAgICAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYCR7Y29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpfTogYCArXG4gICAgICAgICAgICAgIGBPcHRpb24gXCIke3Byb3BlcnR5fVwiIHByb3ZpZGVkIHR5cGUgXCIke3ZhbHVlVHlwZX1cIiBgICtcbiAgICAgICAgICAgICAgYGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKVxuXG4gIHJldHVybiBVdGlsXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogYWxlcnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IEFsZXJ0ID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgID0gJ2FsZXJ0J1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmFsZXJ0J1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgRElTTUlTUyA6ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBDTE9TRSAgICAgICAgICA6IGBjbG9zZSR7RVZFTlRfS0VZfWAsXG4gICAgQ0xPU0VEICAgICAgICAgOiBgY2xvc2VkJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBBTEVSVCA6ICdhbGVydCcsXG4gICAgRkFERSAgOiAnZmFkZScsXG4gICAgU0hPVyAgOiAnc2hvdydcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgQWxlcnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIGNsb3NlKGVsZW1lbnQpIHtcbiAgICAgIGxldCByb290RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudClcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VzdG9tRXZlbnQgPSB0aGlzLl90cmlnZ2VyQ2xvc2VFdmVudChyb290RWxlbWVudClcblxuICAgICAgaWYgKGN1c3RvbUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHJvb3RFbGVtZW50KVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuICAgICAgbGV0IHBhcmVudCAgICAgPSBmYWxzZVxuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50ID0gJChlbGVtZW50KS5jbG9zZXN0KGAuJHtDbGFzc05hbWUuQUxFUlR9YClbMF1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmVudFxuICAgIH1cblxuICAgIF90cmlnZ2VyQ2xvc2VFdmVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBjbG9zZUV2ZW50ID0gJC5FdmVudChFdmVudC5DTE9TRSlcblxuICAgICAgJChlbGVtZW50KS50cmlnZ2VyKGNsb3NlRXZlbnQpXG4gICAgICByZXR1cm4gY2xvc2VFdmVudFxuICAgIH1cblxuICAgIF9yZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGlmICghJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQoZWxlbWVudClcblxuICAgICAgJChlbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCwgZXZlbnQpKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIF9kZXN0cm95RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAkKGVsZW1lbnQpXG4gICAgICAgIC5kZXRhY2goKVxuICAgICAgICAudHJpZ2dlcihFdmVudC5DTE9TRUQpXG4gICAgICAgIC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKHRoaXMpXG4gICAgICAgIGxldCBkYXRhICAgICAgID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IEFsZXJ0KHRoaXMpXG4gICAgICAgICAgJGVsZW1lbnQuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcgPT09ICdjbG9zZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10odGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2hhbmRsZURpc21pc3MoYWxlcnRJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH1cblxuICAgICAgICBhbGVydEluc3RhbmNlLmNsb3NlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oXG4gICAgRXZlbnQuQ0xJQ0tfREFUQV9BUEksXG4gICAgU2VsZWN0b3IuRElTTUlTUyxcbiAgICBBbGVydC5faGFuZGxlRGlzbWlzcyhuZXcgQWxlcnQoKSlcbiAgKVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gQWxlcnQuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQWxlcnRcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBBbGVydFxufSkoJClcblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBidXR0b24uanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IEJ1dHRvbiA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdidXR0b24nXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgPSAnYnMuYnV0dG9uJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIEFDVElWRSA6ICdhY3RpdmUnLFxuICAgIEJVVFRPTiA6ICdidG4nLFxuICAgIEZPQ1VTICA6ICdmb2N1cydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIERBVEFfVE9HR0xFX0NBUlJPVCA6ICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJyxcbiAgICBEQVRBX1RPR0dMRSAgICAgICAgOiAnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScsXG4gICAgSU5QVVQgICAgICAgICAgICAgIDogJ2lucHV0JyxcbiAgICBBQ1RJVkUgICAgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gICAgQlVUVE9OICAgICAgICAgICAgIDogJy5idG4nXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBDTElDS19EQVRBX0FQSSAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBGT0NVU19CTFVSX0RBVEFfQVBJIDogYGZvY3VzJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBibHVyJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBCdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgIGxldCB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSB0cnVlXG4gICAgICBsZXQgYWRkQXJpYVByZXNzZWQgPSB0cnVlXG4gICAgICBjb25zdCByb290RWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuY2xvc2VzdChcbiAgICAgICAgU2VsZWN0b3IuREFUQV9UT0dHTEVcbiAgICAgIClbMF1cblxuICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLklOUFVUKVxuXG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgIGlmIChpbnB1dC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuY2hlY2tlZCAmJlxuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFKVxuXG4gICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fFxuICAgICAgICAgICAgICByb290RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHxcbiAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpIHx8XG4gICAgICAgICAgICAgIHJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSAhdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgICAgICQoaW5wdXQpLnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW5wdXQuZm9jdXMoKVxuICAgICAgICAgIGFkZEFyaWFQcmVzc2VkID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRkQXJpYVByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsXG4gICAgICAgICAgIXRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5BQ1RJVkUpKVxuICAgICAgfVxuXG4gICAgICBpZiAodHJpZ2dlckNoYW5nZUV2ZW50KSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQnV0dG9uKHRoaXMpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ3RvZ2dsZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRV9DQVJST1QsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBsZXQgYnV0dG9uID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgIGlmICghJChidXR0b24pLmhhc0NsYXNzKENsYXNzTmFtZS5CVVRUT04pKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQoYnV0dG9uKS5jbG9zZXN0KFNlbGVjdG9yLkJVVFRPTilcbiAgICAgIH1cblxuICAgICAgQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKGJ1dHRvbiksICd0b2dnbGUnKVxuICAgIH0pXG4gICAgLm9uKEV2ZW50LkZPQ1VTX0JMVVJfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFX0NBUlJPVCwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBidXR0b24gPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChTZWxlY3Rvci5CVVRUT04pWzBdXG4gICAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkZPQ1VTLCAvXmZvY3VzKGluKT8kLy50ZXN0KGV2ZW50LnR5cGUpKVxuICAgIH0pXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBCdXR0b24uX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQnV0dG9uXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gQnV0dG9uXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBjYXJvdXNlbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgQ2Fyb3VzZWwgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgPSAnY2Fyb3VzZWwnXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgICAgPSAnYnMuY2Fyb3VzZWwnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICAgICA9ICQuZm5bTkFNRV1cbiAgY29uc3QgQVJST1dfTEVGVF9LRVlDT0RFICAgICA9IDM3IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIGxlZnQgYXJyb3cga2V5XG4gIGNvbnN0IEFSUk9XX1JJR0hUX0tFWUNPREUgICAgPSAzOSAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciByaWdodCBhcnJvdyBrZXlcbiAgY29uc3QgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCA9IDUwMCAvLyBUaW1lIGZvciBtb3VzZSBjb21wYXQgZXZlbnRzIHRvIGZpcmUgYWZ0ZXIgdG91Y2hcblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIGludGVydmFsIDogNTAwMCxcbiAgICBrZXlib2FyZCA6IHRydWUsXG4gICAgc2xpZGUgICAgOiBmYWxzZSxcbiAgICBwYXVzZSAgICA6ICdob3ZlcicsXG4gICAgd3JhcCAgICAgOiB0cnVlXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBpbnRlcnZhbCA6ICcobnVtYmVyfGJvb2xlYW4pJyxcbiAgICBrZXlib2FyZCA6ICdib29sZWFuJyxcbiAgICBzbGlkZSAgICA6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICBwYXVzZSAgICA6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgICB3cmFwICAgICA6ICdib29sZWFuJ1xuICB9XG5cbiAgY29uc3QgRGlyZWN0aW9uID0ge1xuICAgIE5FWFQgICAgIDogJ25leHQnLFxuICAgIFBSRVYgICAgIDogJ3ByZXYnLFxuICAgIExFRlQgICAgIDogJ2xlZnQnLFxuICAgIFJJR0hUICAgIDogJ3JpZ2h0J1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgU0xJREUgICAgICAgICAgOiBgc2xpZGUke0VWRU5UX0tFWX1gLFxuICAgIFNMSUQgICAgICAgICAgIDogYHNsaWQke0VWRU5UX0tFWX1gLFxuICAgIEtFWURPV04gICAgICAgIDogYGtleWRvd24ke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFRU5URVIgICAgIDogYG1vdXNlZW50ZXIke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFTEVBVkUgICAgIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gLFxuICAgIFRPVUNIRU5EICAgICAgIDogYHRvdWNoZW5kJHtFVkVOVF9LRVl9YCxcbiAgICBMT0FEX0RBVEFfQVBJICA6IGBsb2FkJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBDQVJPVVNFTCA6ICdjYXJvdXNlbCcsXG4gICAgQUNUSVZFICAgOiAnYWN0aXZlJyxcbiAgICBTTElERSAgICA6ICdzbGlkZScsXG4gICAgUklHSFQgICAgOiAnY2Fyb3VzZWwtaXRlbS1yaWdodCcsXG4gICAgTEVGVCAgICAgOiAnY2Fyb3VzZWwtaXRlbS1sZWZ0JyxcbiAgICBORVhUICAgICA6ICdjYXJvdXNlbC1pdGVtLW5leHQnLFxuICAgIFBSRVYgICAgIDogJ2Nhcm91c2VsLWl0ZW0tcHJldicsXG4gICAgSVRFTSAgICAgOiAnY2Fyb3VzZWwtaXRlbSdcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEFDVElWRSAgICAgIDogJy5hY3RpdmUnLFxuICAgIEFDVElWRV9JVEVNIDogJy5hY3RpdmUuY2Fyb3VzZWwtaXRlbScsXG4gICAgSVRFTSAgICAgICAgOiAnLmNhcm91c2VsLWl0ZW0nLFxuICAgIE5FWFRfUFJFViAgIDogJy5jYXJvdXNlbC1pdGVtLW5leHQsIC5jYXJvdXNlbC1pdGVtLXByZXYnLFxuICAgIElORElDQVRPUlMgIDogJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyxcbiAgICBEQVRBX1NMSURFICA6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gICAgREFUQV9SSURFICAgOiAnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJ1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBDYXJvdXNlbCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9pdGVtcyAgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pbnRlcnZhbCAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9hY3RpdmVFbGVtZW50ICAgICAgPSBudWxsXG5cbiAgICAgIHRoaXMuX2lzUGF1c2VkICAgICAgICAgICA9IGZhbHNlXG4gICAgICB0aGlzLl9pc1NsaWRpbmcgICAgICAgICAgPSBmYWxzZVxuXG4gICAgICB0aGlzLnRvdWNoVGltZW91dCAgICAgICAgPSBudWxsXG5cbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl9lbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpWzBdXG4gICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCAgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuSU5ESUNBVE9SUylcblxuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIG5leHQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uTkVYVClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0V2hlblZpc2libGUoKSB7XG4gICAgICAvLyBEb24ndCBjYWxsIG5leHQgd2hlbiB0aGUgcGFnZSBpc24ndCB2aXNpYmxlXG4gICAgICAvLyBvciB0aGUgY2Fyb3VzZWwgb3IgaXRzIHBhcmVudCBpc24ndCB2aXNpYmxlXG4gICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbiAmJlxuICAgICAgICAoJCh0aGlzLl9lbGVtZW50KS5pcygnOnZpc2libGUnKSAmJiAkKHRoaXMuX2VsZW1lbnQpLmNzcygndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJykpIHtcbiAgICAgICAgdGhpcy5uZXh0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2KCkge1xuICAgICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLlBSRVYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2UoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTkVYVF9QUkVWKSkge1xuICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIHRoaXMuY3ljbGUodHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgIH1cblxuICAgIGN5Y2xlKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmludGVydmFsICYmICF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICAgIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPyB0aGlzLm5leHRXaGVuVmlzaWJsZSA6IHRoaXMubmV4dCkuYmluZCh0aGlzKSxcbiAgICAgICAgICB0aGlzLl9jb25maWcuaW50ZXJ2YWxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRvKGluZGV4KSB7XG4gICAgICB0aGlzLl9hY3RpdmVFbGVtZW50ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkFDVElWRV9JVEVNKVxuXG4gICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9hY3RpdmVFbGVtZW50KVxuXG4gICAgICBpZiAoaW5kZXggPiB0aGlzLl9pdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5TTElELCAoKSA9PiB0aGlzLnRvKGluZGV4KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICAgIHRoaXMuY3ljbGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gaW5kZXggPiBhY3RpdmVJbmRleFxuICAgICAgICA/IERpcmVjdGlvbi5ORVhUXG4gICAgICAgIDogRGlyZWN0aW9uLlBSRVZcblxuICAgICAgdGhpcy5fc2xpZGUoZGlyZWN0aW9uLCB0aGlzLl9pdGVtc1tpbmRleF0pXG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEVWRU5UX0tFWSlcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgICAgdGhpcy5faXRlbXMgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9jb25maWcgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faW50ZXJ2YWwgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pc1BhdXNlZCAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2lzU2xpZGluZyAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAuLi5jb25maWdcbiAgICAgIH1cbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgICAgLm9uKEV2ZW50LktFWURPV04sIChldmVudCkgPT4gdGhpcy5fa2V5ZG93bihldmVudCkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcucGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAgIC5vbihFdmVudC5NT1VTRUVOVEVSLCAoZXZlbnQpID0+IHRoaXMucGF1c2UoZXZlbnQpKVxuICAgICAgICAgIC5vbihFdmVudC5NT1VTRUxFQVZFLCAoZXZlbnQpID0+IHRoaXMuY3ljbGUoZXZlbnQpKVxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgLy8gSWYgaXQncyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlLCBtb3VzZWVudGVyL2xlYXZlIGFyZSBmaXJlZCBhc1xuICAgICAgICAgIC8vIHBhcnQgb2YgdGhlIG1vdXNlIGNvbXBhdGliaWxpdHkgZXZlbnRzIG9uIGZpcnN0IHRhcCAtIHRoZSBjYXJvdXNlbFxuICAgICAgICAgIC8vIHdvdWxkIHN0b3AgY3ljbGluZyB1bnRpbCB1c2VyIHRhcHBlZCBvdXQgb2YgaXQ7XG4gICAgICAgICAgLy8gaGVyZSwgd2UgbGlzdGVuIGZvciB0b3VjaGVuZCwgZXhwbGljaXRseSBwYXVzZSB0aGUgY2Fyb3VzZWxcbiAgICAgICAgICAvLyAoYXMgaWYgaXQncyB0aGUgc2Vjb25kIHRpbWUgd2UgdGFwIG9uIGl0LCBtb3VzZWVudGVyIGNvbXBhdCBldmVudFxuICAgICAgICAgIC8vIGlzIE5PVCBmaXJlZCkgYW5kIGFmdGVyIGEgdGltZW91dCAodG8gYWxsb3cgZm9yIG1vdXNlIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAvLyBldmVudHMgdG8gZmlyZSkgd2UgZXhwbGljaXRseSByZXN0YXJ0IGN5Y2xpbmdcbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LlRPVUNIRU5ELCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgICAgICAgIGlmICh0aGlzLnRvdWNoVGltZW91dCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50b3VjaFRpbWVvdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRvdWNoVGltZW91dCA9IHNldFRpbWVvdXQoKGV2ZW50KSA9PiB0aGlzLmN5Y2xlKGV2ZW50KSwgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCArIHRoaXMuX2NvbmZpZy5pbnRlcnZhbClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2tleWRvd24oZXZlbnQpIHtcbiAgICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIEFSUk9XX0xFRlRfS0VZQ09ERTpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgdGhpcy5wcmV2KClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEFSUk9XX1JJR0hUX0tFWUNPREU6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHRoaXMubmV4dCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2l0ZW1zID0gZWxlbWVudCAmJiBlbGVtZW50LnBhcmVudE5vZGVcbiAgICAgICAgPyBbXS5zbGljZS5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLklURU0pKVxuICAgICAgICA6IFtdXG4gICAgICByZXR1cm4gdGhpcy5faXRlbXMuaW5kZXhPZihlbGVtZW50KVxuICAgIH1cblxuICAgIF9nZXRJdGVtQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBhY3RpdmVFbGVtZW50KSB7XG4gICAgICBjb25zdCBpc05leHREaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUXG4gICAgICBjb25zdCBpc1ByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWXG4gICAgICBjb25zdCBhY3RpdmVJbmRleCAgICAgPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudClcbiAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggICA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDFcbiAgICAgIGNvbnN0IGlzR29pbmdUb1dyYXAgICA9IGlzUHJldkRpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNOZXh0RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSBsYXN0SXRlbUluZGV4XG5cbiAgICAgIGlmIChpc0dvaW5nVG9XcmFwICYmICF0aGlzLl9jb25maWcud3JhcCkge1xuICAgICAgICByZXR1cm4gYWN0aXZlRWxlbWVudFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWx0YSAgICAgPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWID8gLTEgOiAxXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLl9pdGVtcy5sZW5ndGhcblxuICAgICAgcmV0dXJuIGl0ZW1JbmRleCA9PT0gLTFcbiAgICAgICAgPyB0aGlzLl9pdGVtc1t0aGlzLl9pdGVtcy5sZW5ndGggLSAxXSA6IHRoaXMuX2l0ZW1zW2l0ZW1JbmRleF1cbiAgICB9XG5cbiAgICBfdHJpZ2dlclNsaWRlRXZlbnQocmVsYXRlZFRhcmdldCwgZXZlbnREaXJlY3Rpb25OYW1lKSB7XG4gICAgICBjb25zdCB0YXJnZXRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChyZWxhdGVkVGFyZ2V0KVxuICAgICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSkpXG4gICAgICBjb25zdCBzbGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5TTElERSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0LFxuICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgICAgZnJvbTogZnJvbUluZGV4LFxuICAgICAgICB0bzogdGFyZ2V0SW5kZXhcbiAgICAgIH0pXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkZUV2ZW50KVxuXG4gICAgICByZXR1cm4gc2xpZGVFdmVudFxuICAgIH1cblxuICAgIF9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JzID0gW10uc2xpY2UuY2FsbCh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkFDVElWRSkpXG4gICAgICAgICQoaW5kaWNhdG9ycylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcblxuICAgICAgICBjb25zdCBuZXh0SW5kaWNhdG9yID0gdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQuY2hpbGRyZW5bXG4gICAgICAgICAgdGhpcy5fZ2V0SXRlbUluZGV4KGVsZW1lbnQpXG4gICAgICAgIF1cblxuICAgICAgICBpZiAobmV4dEluZGljYXRvcikge1xuICAgICAgICAgICQobmV4dEluZGljYXRvcikuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIF9zbGlkZShkaXJlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFX0lURU0pXG4gICAgICBjb25zdCBhY3RpdmVFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudClcbiAgICAgIGNvbnN0IG5leHRFbGVtZW50ICAgPSBlbGVtZW50IHx8IGFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgdGhpcy5fZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudClcbiAgICAgIGNvbnN0IG5leHRFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgobmV4dEVsZW1lbnQpXG4gICAgICBjb25zdCBpc0N5Y2xpbmcgPSBCb29sZWFuKHRoaXMuX2ludGVydmFsKVxuXG4gICAgICBsZXQgZGlyZWN0aW9uYWxDbGFzc05hbWVcbiAgICAgIGxldCBvcmRlckNsYXNzTmFtZVxuICAgICAgbGV0IGV2ZW50RGlyZWN0aW9uTmFtZVxuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5MRUZUXG4gICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLk5FWFRcbiAgICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLkxFRlRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpcmVjdGlvbmFsQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLlJJR0hUXG4gICAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLlBSRVZcbiAgICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLlJJR0hUXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0RWxlbWVudCAmJiAkKG5leHRFbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2xpZGVFdmVudCA9IHRoaXMuX3RyaWdnZXJTbGlkZUV2ZW50KG5leHRFbGVtZW50LCBldmVudERpcmVjdGlvbk5hbWUpXG4gICAgICBpZiAoc2xpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmVFbGVtZW50IHx8ICFuZXh0RWxlbWVudCkge1xuICAgICAgICAvLyBTb21lIHdlaXJkbmVzcyBpcyBoYXBwZW5pbmcsIHNvIHdlIGJhaWxcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWVcblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudClcblxuICAgICAgY29uc3Qgc2xpZEV2ZW50ID0gJC5FdmVudChFdmVudC5TTElELCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IG5leHRFbGVtZW50LFxuICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgICAgZnJvbTogYWN0aXZlRWxlbWVudEluZGV4LFxuICAgICAgICB0bzogbmV4dEVsZW1lbnRJbmRleFxuICAgICAgfSlcblxuICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNMSURFKSkge1xuICAgICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhvcmRlckNsYXNzTmFtZSlcblxuICAgICAgICBVdGlsLnJlZmxvdyhuZXh0RWxlbWVudClcblxuICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLmFkZENsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuICAgICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSlcblxuICAgICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZUVsZW1lbnQpXG5cbiAgICAgICAgJChhY3RpdmVFbGVtZW50KVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgJChuZXh0RWxlbWVudClcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGAke2RpcmVjdGlvbmFsQ2xhc3NOYW1lfSAke29yZGVyQ2xhc3NOYW1lfWApXG4gICAgICAgICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuXG4gICAgICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5BQ1RJVkV9ICR7b3JkZXJDbGFzc05hbWV9ICR7ZGlyZWN0aW9uYWxDbGFzc05hbWV9YClcblxuICAgICAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZEV2ZW50KSwgMClcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLmN5Y2xlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBsZXQgX2NvbmZpZyA9IHtcbiAgICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAgIC4uLiQodGhpcykuZGF0YSgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBfY29uZmlnID0ge1xuICAgICAgICAgICAgLi4uX2NvbmZpZyxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnID8gY29uZmlnIDogX2NvbmZpZy5zbGlkZVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQ2Fyb3VzZWwodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBkYXRhLnRvKGNvbmZpZylcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVthY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHthY3Rpb259XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2FjdGlvbl0oKVxuICAgICAgICB9IGVsc2UgaWYgKF9jb25maWcuaW50ZXJ2YWwpIHtcbiAgICAgICAgICBkYXRhLnBhdXNlKClcbiAgICAgICAgICBkYXRhLmN5Y2xlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2RhdGFBcGlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpXG5cbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICQoc2VsZWN0b3IpWzBdXG5cbiAgICAgIGlmICghdGFyZ2V0IHx8ICEkKHRhcmdldCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNBUk9VU0VMKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAuLi4kKHRhcmdldCkuZGF0YSgpLFxuICAgICAgICAuLi4kKHRoaXMpLmRhdGEoKVxuICAgICAgfVxuICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlLXRvJylcblxuICAgICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgY29uZmlnLmludGVydmFsID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGFyZ2V0KSwgY29uZmlnKVxuXG4gICAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgICAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkudG8oc2xpZGVJbmRleClcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1NMSURFLCBDYXJvdXNlbC5fZGF0YUFwaUNsaWNrSGFuZGxlcilcblxuICAkKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgKCkgPT4ge1xuICAgIGNvbnN0IGNhcm91c2VscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1JJREUpKVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjYXJvdXNlbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0ICRjYXJvdXNlbCA9ICQoY2Fyb3VzZWxzW2ldKVxuICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDYXJvdXNlbFxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gQ2Fyb3VzZWxcbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IENvbGxhcHNlID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgID0gJ2NvbGxhcHNlJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmNvbGxhcHNlJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICB0b2dnbGUgOiB0cnVlLFxuICAgIHBhcmVudCA6ICcnXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICB0b2dnbGUgOiAnYm9vbGVhbicsXG4gICAgcGFyZW50IDogJyhzdHJpbmd8ZWxlbWVudCknXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBTSE9XICAgICAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XTiAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gICAgSElERSAgICAgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBTSE9XICAgICAgIDogJ3Nob3cnLFxuICAgIENPTExBUFNFICAgOiAnY29sbGFwc2UnLFxuICAgIENPTExBUFNJTkcgOiAnY29sbGFwc2luZycsXG4gICAgQ09MTEFQU0VEICA6ICdjb2xsYXBzZWQnXG4gIH1cblxuICBjb25zdCBEaW1lbnNpb24gPSB7XG4gICAgV0lEVEggIDogJ3dpZHRoJyxcbiAgICBIRUlHSFQgOiAnaGVpZ2h0J1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgQUNUSVZFUyAgICAgOiAnLnNob3csIC5jb2xsYXBzaW5nJyxcbiAgICBEQVRBX1RPR0dMRSA6ICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXSdcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgQ29sbGFwc2Uge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgICAgPSAkLm1ha2VBcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMke2VsZW1lbnQuaWR9XCJdLGAgK1xuICAgICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJHtlbGVtZW50LmlkfVwiXWBcbiAgICAgICkpXG4gICAgICBjb25zdCB0b2dnbGVMaXN0ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSlcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0b2dnbGVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSB0b2dnbGVMaXN0W2ldXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pXG4gICAgICAgIGNvbnN0IGZpbHRlckVsZW1lbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICAgICAgICAgIC5maWx0ZXIoKGZvdW5kRWxlbSkgPT4gZm91bmRFbGVtID09PSBlbGVtZW50KVxuXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50ID8gdGhpcy5fZ2V0UGFyZW50KCkgOiBudWxsXG5cbiAgICAgIGlmICghdGhpcy5fY29uZmlnLnBhcmVudCkge1xuICAgICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fZWxlbWVudCwgdGhpcy5fdHJpZ2dlckFycmF5KVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnRvZ2dsZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKVxuICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgYWN0aXZlc1xuICAgICAgbGV0IGFjdGl2ZXNEYXRhXG5cbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgYWN0aXZlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQUNUSVZFUykpXG4gICAgICAgICAgLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JykgPT09IHRoaXMuX2NvbmZpZy5wYXJlbnQpXG5cbiAgICAgICAgaWYgKGFjdGl2ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWN0aXZlcyA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICBhY3RpdmVzRGF0YSA9ICQoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1cpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJChhY3RpdmVzKS5ub3QodGhpcy5fc2VsZWN0b3IpLCAnaGlkZScpXG4gICAgICAgIGlmICghYWN0aXZlc0RhdGEpIHtcbiAgICAgICAgICAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVksIG51bGwpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDBcblxuICAgICAgaWYgKHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgJCh0aGlzLl90cmlnZ2VyQXJyYXkpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSlcblxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG4gICAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJydcblxuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpXG5cbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjYXBpdGFsaXplZERpbWVuc2lvbiA9IGRpbWVuc2lvblswXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKDEpXG4gICAgICBjb25zdCBzY3JvbGxTaXplID0gYHNjcm9sbCR7Y2FwaXRhbGl6ZWREaW1lbnNpb259YFxuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IGAke3RoaXMuX2VsZW1lbnRbc2Nyb2xsU2l6ZV19cHhgXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHxcbiAgICAgICAgISQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGFydEV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dfXB4YFxuXG4gICAgICBVdGlsLnJlZmxvdyh0aGlzLl9lbGVtZW50KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORylcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBjb25zdCB0cmlnZ2VyQXJyYXlMZW5ndGggPSB0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoXG4gICAgICBpZiAodHJpZ2dlckFycmF5TGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWdnZXJBcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuX3RyaWdnZXJBcnJheVtpXVxuICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRyaWdnZXIpXG4gICAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCAkZWxlbSA9ICQoW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkpXG4gICAgICAgICAgICBpZiAoISRlbGVtLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgICAgICAkKHRyaWdnZXIpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKHRydWUpXG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpXG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG4gICAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgICAudHJpZ2dlcihFdmVudC5ISURERU4pXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnXG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gaXNUcmFuc2l0aW9uaW5nXG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fcGFyZW50ICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdHJpZ2dlckFycmF5ICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgIC4uLmNvbmZpZ1xuICAgICAgfVxuICAgICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSkgLy8gQ29lcmNlIHN0cmluZyB2YWx1ZXNcbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2dldERpbWVuc2lvbigpIHtcbiAgICAgIGNvbnN0IGhhc1dpZHRoID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhEaW1lbnNpb24uV0lEVEgpXG4gICAgICByZXR1cm4gaGFzV2lkdGggPyBEaW1lbnNpb24uV0lEVEggOiBEaW1lbnNpb24uSEVJR0hUXG4gICAgfVxuXG4gICAgX2dldFBhcmVudCgpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBudWxsXG4gICAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5fY29uZmlnLnBhcmVudCkpIHtcbiAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudFxuXG4gICAgICAgIC8vIEl0J3MgYSBqUXVlcnkgb2JqZWN0XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnBhcmVudC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudFswXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NvbmZpZy5wYXJlbnQpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbGVjdG9yID1cbiAgICAgICAgYFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJHt0aGlzLl9jb25maWcucGFyZW50fVwiXWBcblxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgICAgICQoY2hpbGRyZW4pLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFxuICAgICAgICAgIENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICBbZWxlbWVudF1cbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHBhcmVudFxuICAgIH1cblxuICAgIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZWxlbWVudCwgdHJpZ2dlckFycmF5KSB7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBpc09wZW4gPSAkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICAgIGlmICh0cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgJCh0cmlnZ2VyQXJyYXkpXG4gICAgICAgICAgICAudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCwgIWlzT3BlbilcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG4gICAgICByZXR1cm4gc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IG51bGxcbiAgICB9XG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgICBsZXQgZGF0YSAgICAgID0gJHRoaXMuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAgIC4uLiR0aGlzLmRhdGEoKSxcbiAgICAgICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhICYmIF9jb25maWcudG9nZ2xlICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgIF9jb25maWcudG9nZ2xlID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkdGhpcy5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgY29uc3QgJHRyaWdnZXIgPSAkKHRoaXMpXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcylcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICAgICQoc2VsZWN0b3JzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKHRoaXMpXG4gICAgICBjb25zdCBkYXRhICAgID0gJHRhcmdldC5kYXRhKERBVEFfS0VZKVxuICAgICAgY29uc3QgY29uZmlnICA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0cmlnZ2VyLmRhdGEoKVxuICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCR0YXJnZXQsIGNvbmZpZylcbiAgICB9KVxuICB9KVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIENvbGxhcHNlXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogZHJvcGRvd24uanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IERyb3Bkb3duID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgICAgICAgPSAnZHJvcGRvd24nXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgICAgICA9ICc0LjEuMydcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgICAgICAgID0gJ2JzLmRyb3Bkb3duJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgICAgICAgPSAnLmRhdGEtYXBpJ1xuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgICAgICAgPSAkLmZuW05BTUVdXG4gIGNvbnN0IEVTQ0FQRV9LRVlDT0RFICAgICAgICAgICA9IDI3IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIEVzY2FwZSAoRXNjKSBrZXlcbiAgY29uc3QgU1BBQ0VfS0VZQ09ERSAgICAgICAgICAgID0gMzIgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3Igc3BhY2Uga2V5XG4gIGNvbnN0IFRBQl9LRVlDT0RFICAgICAgICAgICAgICA9IDkgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdGFiIGtleVxuICBjb25zdCBBUlJPV19VUF9LRVlDT0RFICAgICAgICAgPSAzOCAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciB1cCBhcnJvdyBrZXlcbiAgY29uc3QgQVJST1dfRE9XTl9LRVlDT0RFICAgICAgID0gNDAgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgZG93biBhcnJvdyBrZXlcbiAgY29uc3QgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMyAvLyBNb3VzZUV2ZW50LndoaWNoIHZhbHVlIGZvciB0aGUgcmlnaHQgYnV0dG9uIChhc3N1bWluZyBhIHJpZ2h0LWhhbmRlZCBtb3VzZSlcbiAgY29uc3QgUkVHRVhQX0tFWURPV04gICAgICAgICAgID0gbmV3IFJlZ0V4cChgJHtBUlJPV19VUF9LRVlDT0RFfXwke0FSUk9XX0RPV05fS0VZQ09ERX18JHtFU0NBUEVfS0VZQ09ERX1gKVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIEhJREUgICAgICAgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gICAgU0hPV04gICAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0sgICAgICAgICAgICA6IGBjbGljayR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0tfREFUQV9BUEkgICA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gICAgS0VZRE9XTl9EQVRBX0FQSSA6IGBrZXlkb3duJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBLRVlVUF9EQVRBX0FQSSAgIDogYGtleXVwJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIERJU0FCTEVEICA6ICdkaXNhYmxlZCcsXG4gICAgU0hPVyAgICAgIDogJ3Nob3cnLFxuICAgIERST1BVUCAgICA6ICdkcm9wdXAnLFxuICAgIERST1BSSUdIVCA6ICdkcm9wcmlnaHQnLFxuICAgIERST1BMRUZUICA6ICdkcm9wbGVmdCcsXG4gICAgTUVOVVJJR0hUIDogJ2Ryb3Bkb3duLW1lbnUtcmlnaHQnLFxuICAgIE1FTlVMRUZUICA6ICdkcm9wZG93bi1tZW51LWxlZnQnLFxuICAgIFBPU0lUSU9OX1NUQVRJQyA6ICdwb3NpdGlvbi1zdGF0aWMnXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBEQVRBX1RPR0dMRSAgIDogJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyxcbiAgICBGT1JNX0NISUxEICAgIDogJy5kcm9wZG93biBmb3JtJyxcbiAgICBNRU5VICAgICAgICAgIDogJy5kcm9wZG93bi1tZW51JyxcbiAgICBOQVZCQVJfTkFWICAgIDogJy5uYXZiYXItbmF2JyxcbiAgICBWSVNJQkxFX0lURU1TIDogJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xuICB9XG5cbiAgY29uc3QgQXR0YWNobWVudE1hcCA9IHtcbiAgICBUT1AgICAgICAgOiAndG9wLXN0YXJ0JyxcbiAgICBUT1BFTkQgICAgOiAndG9wLWVuZCcsXG4gICAgQk9UVE9NICAgIDogJ2JvdHRvbS1zdGFydCcsXG4gICAgQk9UVE9NRU5EIDogJ2JvdHRvbS1lbmQnLFxuICAgIFJJR0hUICAgICA6ICdyaWdodC1zdGFydCcsXG4gICAgUklHSFRFTkQgIDogJ3JpZ2h0LWVuZCcsXG4gICAgTEVGVCAgICAgIDogJ2xlZnQtc3RhcnQnLFxuICAgIExFRlRFTkQgICA6ICdsZWZ0LWVuZCdcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgb2Zmc2V0ICAgICAgOiAwLFxuICAgIGZsaXAgICAgICAgIDogdHJ1ZSxcbiAgICBib3VuZGFyeSAgICA6ICdzY3JvbGxQYXJlbnQnLFxuICAgIHJlZmVyZW5jZSAgIDogJ3RvZ2dsZScsXG4gICAgZGlzcGxheSAgICAgOiAnZHluYW1pYydcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIG9mZnNldCAgICAgIDogJyhudW1iZXJ8c3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgZmxpcCAgICAgICAgOiAnYm9vbGVhbicsXG4gICAgYm91bmRhcnkgICAgOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gICAgcmVmZXJlbmNlICAgOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gICAgZGlzcGxheSAgICAgOiAnc3RyaW5nJ1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBEcm9wZG93biB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX3BvcHBlciAgID0gbnVsbFxuICAgICAgdGhpcy5fY29uZmlnICAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgICAgdGhpcy5fbWVudSAgICAgPSB0aGlzLl9nZXRNZW51RWxlbWVudCgpXG4gICAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpXG5cbiAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKHRoaXMuX2VsZW1lbnQuZGlzYWJsZWQgfHwgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJlbnQgICA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuICAgICAgY29uc3QgaXNBY3RpdmUgPSAkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBEcm9wZG93bi5fY2xlYXJNZW51cygpXG5cbiAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgICAgfVxuICAgICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCByZWxhdGVkVGFyZ2V0KVxuXG4gICAgICAkKHBhcmVudCkudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIERpc2FibGUgdG90YWxseSBQb3BwZXIuanMgZm9yIERyb3Bkb3duIGluIE5hdmJhclxuICAgICAgaWYgKCF0aGlzLl9pbk5hdmJhcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgZm9yIFBvcHBlciBkZXBlbmRlbmN5XG4gICAgICAgICAqIFBvcHBlciAtIGh0dHBzOi8vcG9wcGVyLmpzLm9yZ1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwIGRyb3Bkb3duIHJlcXVpcmUgUG9wcGVyLmpzIChodHRwczovL3BvcHBlci5qcy5vcmcpJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fZWxlbWVudFxuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSBwYXJlbnRcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzRWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKSkge1xuICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlXG5cbiAgICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGpRdWVyeSBlbGVtZW50XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcucmVmZXJlbmNlLmpxdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlWzBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYm91bmRhcnkgaXMgbm90IGBzY3JvbGxQYXJlbnRgLCB0aGVuIHNldCBwb3NpdGlvbiB0byBgc3RhdGljYFxuICAgICAgICAvLyB0byBhbGxvdyB0aGUgbWVudSB0byBcImVzY2FwZVwiIHRoZSBzY3JvbGwgcGFyZW50J3MgYm91bmRhcmllc1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzI0MjUxXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuYm91bmRhcnkgIT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICAgICAgJChwYXJlbnQpLmFkZENsYXNzKENsYXNzTmFtZS5QT1NJVElPTl9TVEFUSUMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCB0aGlzLl9tZW51LCB0aGlzLl9nZXRQb3BwZXJDb25maWcoKSlcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgICAgICAgICQocGFyZW50KS5jbG9zZXN0KFNlbGVjdG9yLk5BVkJBUl9OQVYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpXG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAgICQodGhpcy5fbWVudSkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAkKHBhcmVudClcbiAgICAgICAgLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KEV2ZW50LlNIT1dOLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKVxuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICAgIHRoaXMuX21lbnUgPSBudWxsXG4gICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKClcbiAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLnNjaGVkdWxlVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICB0aGlzLnRvZ2dsZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgIC4uLnRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgICAgLi4uJCh0aGlzLl9lbGVtZW50KS5kYXRhKCksXG4gICAgICAgIC4uLmNvbmZpZ1xuICAgICAgfVxuXG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhcbiAgICAgICAgTkFNRSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG5cbiAgICBfZ2V0TWVudUVsZW1lbnQoKSB7XG4gICAgICBpZiAoIXRoaXMuX21lbnUpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9tZW51ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTUVOVSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX21lbnVcbiAgICB9XG5cbiAgICBfZ2V0UGxhY2VtZW50KCkge1xuICAgICAgY29uc3QgJHBhcmVudERyb3Bkb3duID0gJCh0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUpXG4gICAgICBsZXQgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5CT1RUT01cblxuICAgICAgLy8gSGFuZGxlIGRyb3B1cFxuICAgICAgaWYgKCRwYXJlbnREcm9wZG93bi5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUFVQKSkge1xuICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLlRPUFxuICAgICAgICBpZiAoJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuVE9QRU5EXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QUklHSFQpKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuUklHSFRcbiAgICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QTEVGVCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5MRUZUXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk1FTlVSSUdIVCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5CT1RUT01FTkRcbiAgICAgIH1cbiAgICAgIHJldHVybiBwbGFjZW1lbnRcbiAgICB9XG5cbiAgICBfZGV0ZWN0TmF2YmFyKCkge1xuICAgICAgcmV0dXJuICQodGhpcy5fZWxlbWVudCkuY2xvc2VzdCgnLm5hdmJhcicpLmxlbmd0aCA+IDBcbiAgICB9XG5cbiAgICBfZ2V0UG9wcGVyQ29uZmlnKCkge1xuICAgICAgY29uc3Qgb2Zmc2V0Q29uZiA9IHt9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5vZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2Zmc2V0Q29uZi5mbiA9IChkYXRhKSA9PiB7XG4gICAgICAgICAgZGF0YS5vZmZzZXRzID0ge1xuICAgICAgICAgICAgLi4uZGF0YS5vZmZzZXRzLFxuICAgICAgICAgICAgLi4udGhpcy5fY29uZmlnLm9mZnNldChkYXRhLm9mZnNldHMpIHx8IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldENvbmYub2Zmc2V0ID0gdGhpcy5fY29uZmlnLm9mZnNldFxuICAgICAgfVxuXG4gICAgICBjb25zdCBwb3BwZXJDb25maWcgPSB7XG4gICAgICAgIHBsYWNlbWVudDogdGhpcy5fZ2V0UGxhY2VtZW50KCksXG4gICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgIG9mZnNldDogb2Zmc2V0Q29uZixcbiAgICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLl9jb25maWcuZmxpcFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIERpc2FibGUgUG9wcGVyLmpzIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheVxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5kaXNwbGF5ID09PSAnc3RhdGljJykge1xuICAgICAgICBwb3BwZXJDb25maWcubW9kaWZpZXJzLmFwcGx5U3R5bGUgPSB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcHBlckNvbmZpZ1xuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGxcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMsIF9jb25maWcpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIF9jbGVhck1lbnVzKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LndoaWNoID09PSBSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0ggfHxcbiAgICAgICAgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC53aGljaCAhPT0gVEFCX0tFWUNPREUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB0b2dnbGVzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSlcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0b2dnbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0b2dnbGVzW2ldKVxuICAgICAgICBjb25zdCBjb250ZXh0ID0gJCh0b2dnbGVzW2ldKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRvZ2dsZXNbaV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldC5jbGlja0V2ZW50ID0gZXZlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcm9wZG93bk1lbnUgPSBjb250ZXh0Ll9tZW51XG4gICAgICAgIGlmICghJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiZcbiAgICAgICAgICAgIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQud2hpY2ggPT09IFRBQl9LRVlDT0RFKSAmJlxuICAgICAgICAgICAgJC5jb250YWlucyhwYXJlbnQsIGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCByZWxhdGVkVGFyZ2V0KVxuICAgICAgICAkKHBhcmVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG4gICAgICAgIGlmIChoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vZmYoJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZXNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcblxuICAgICAgICAkKGRyb3Bkb3duTWVudSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAgICQocGFyZW50KVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgICAgICAudHJpZ2dlcigkLkV2ZW50KEV2ZW50LkhJRERFTiwgcmVsYXRlZFRhcmdldCkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIF9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICBsZXQgcGFyZW50XG4gICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmVudCB8fCBlbGVtZW50LnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIHN0YXRpYyBfZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgICAvLyBJZiBub3QgaW5wdXQvdGV4dGFyZWE6XG4gICAgICAvLyAgLSBBbmQgbm90IGEga2V5IGluIFJFR0VYUF9LRVlET1dOID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgIC8vIElmIGlucHV0L3RleHRhcmVhOlxuICAgICAgLy8gIC0gSWYgc3BhY2Uga2V5ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgIC8vICAtIElmIGtleSBpcyBvdGhlciB0aGFuIGVzY2FwZVxuICAgICAgLy8gICAgLSBJZiBrZXkgaXMgbm90IHVwIG9yIGRvd24gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgLy8gICAgLSBJZiB0cmlnZ2VyIGluc2lkZSB0aGUgbWVudSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgICAgPyBldmVudC53aGljaCA9PT0gU1BBQ0VfS0VZQ09ERSB8fCBldmVudC53aGljaCAhPT0gRVNDQVBFX0tFWUNPREUgJiZcbiAgICAgICAgKGV2ZW50LndoaWNoICE9PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgZXZlbnQud2hpY2ggIT09IEFSUk9XX1VQX0tFWUNPREUgfHxcbiAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChTZWxlY3Rvci5NRU5VKS5sZW5ndGgpIDogIVJFR0VYUF9LRVlET1dOLnRlc3QoZXZlbnQud2hpY2gpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAkKHRoaXMpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmVudCAgID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMpXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9ICQocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgaWYgKCFpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggIT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoICE9PSBTUEFDRV9LRVlDT0RFKSB8fFxuICAgICAgICAgICBpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoID09PSBTUEFDRV9LRVlDT0RFKSkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgY29uc3QgdG9nZ2xlID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuREFUQV9UT0dHTEUpXG4gICAgICAgICAgJCh0b2dnbGUpLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcykudHJpZ2dlcignY2xpY2snKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlZJU0lCTEVfSVRFTVMpKVxuXG4gICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgaW5kZXggPSBpdGVtcy5pbmRleE9mKGV2ZW50LnRhcmdldClcblxuICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19VUF9LRVlDT0RFICYmIGluZGV4ID4gMCkgeyAvLyBVcFxuICAgICAgICBpbmRleC0tXG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC53aGljaCA9PT0gQVJST1dfRE9XTl9LRVlDT0RFICYmIGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkgeyAvLyBEb3duXG4gICAgICAgIGluZGV4KytcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBpbmRleCA9IDBcbiAgICAgIH1cblxuICAgICAgaXRlbXNbaW5kZXhdLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcilcbiAgICAub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuTUVOVSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcilcbiAgICAub24oYCR7RXZlbnQuQ0xJQ0tfREFUQV9BUEl9ICR7RXZlbnQuS0VZVVBfREFUQV9BUEl9YCwgRHJvcGRvd24uX2NsZWFyTWVudXMpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGhpcyksICd0b2dnbGUnKVxuICAgIH0pXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5GT1JNX0NISUxELCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH0pXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBEcm9wZG93blxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gRHJvcGRvd25cbn0pKCQsIFBvcHBlcilcblxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBtb2RhbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTW9kYWwgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdtb2RhbCdcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnYnMubW9kYWwnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IERBVEFfQVBJX0tFWSAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cbiAgY29uc3QgRVNDQVBFX0tFWUNPREUgICAgID0gMjcgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgYmFja2Ryb3AgOiB0cnVlLFxuICAgIGtleWJvYXJkIDogdHJ1ZSxcbiAgICBmb2N1cyAgICA6IHRydWUsXG4gICAgc2hvdyAgICAgOiB0cnVlXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBiYWNrZHJvcCA6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICBrZXlib2FyZCA6ICdib29sZWFuJyxcbiAgICBmb2N1cyAgICA6ICdib29sZWFuJyxcbiAgICBzaG93ICAgICA6ICdib29sZWFuJ1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgSElERSAgICAgICAgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XICAgICAgICAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XTiAgICAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gICAgRk9DVVNJTiAgICAgICAgICAgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfWAsXG4gICAgUkVTSVpFICAgICAgICAgICAgOiBgcmVzaXplJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19ESVNNSVNTICAgICA6IGBjbGljay5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgICBLRVlET1dOX0RJU01JU1MgICA6IGBrZXlkb3duLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFVVBfRElTTUlTUyAgIDogYG1vdXNldXAuZGlzbWlzcyR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VET1dOX0RJU01JU1MgOiBgbW91c2Vkb3duLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLX0RBVEFfQVBJICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIFNDUk9MTEJBUl9NRUFTVVJFUiA6ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZScsXG4gICAgQkFDS0RST1AgICAgICAgICAgIDogJ21vZGFsLWJhY2tkcm9wJyxcbiAgICBPUEVOICAgICAgICAgICAgICAgOiAnbW9kYWwtb3BlbicsXG4gICAgRkFERSAgICAgICAgICAgICAgIDogJ2ZhZGUnLFxuICAgIFNIT1cgICAgICAgICAgICAgICA6ICdzaG93J1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgRElBTE9HICAgICAgICAgICAgIDogJy5tb2RhbC1kaWFsb2cnLFxuICAgIERBVEFfVE9HR0xFICAgICAgICA6ICdbZGF0YS10b2dnbGU9XCJtb2RhbFwiXScsXG4gICAgREFUQV9ESVNNSVNTICAgICAgIDogJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsXG4gICAgRklYRURfQ09OVEVOVCAgICAgIDogJy5maXhlZC10b3AsIC5maXhlZC1ib3R0b20sIC5pcy1maXhlZCwgLnN0aWNreS10b3AnLFxuICAgIFNUSUNLWV9DT05URU5UICAgICA6ICcuc3RpY2t5LXRvcCdcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgTW9kYWwge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl9lbGVtZW50ICAgICAgICAgICAgID0gZWxlbWVudFxuICAgICAgdGhpcy5fZGlhbG9nICAgICAgICAgICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5ESUFMT0cpXG4gICAgICB0aGlzLl9iYWNrZHJvcCAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNTaG93biAgICAgICAgICAgICA9IGZhbHNlXG4gICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAgID0gZmFsc2VcbiAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggICAgICA9IDBcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICB0b2dnbGUocmVsYXRlZFRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhyZWxhdGVkVGFyZ2V0KVxuICAgIH1cblxuICAgIHNob3cocmVsYXRlZFRhcmdldCkge1xuICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCB0aGlzLl9pc1Nob3duKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzaG93RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1csIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldFxuICAgICAgfSlcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudClcblxuICAgICAgaWYgKHRoaXMuX2lzU2hvd24gfHwgc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZVxuXG4gICAgICB0aGlzLl9jaGVja1Njcm9sbGJhcigpXG4gICAgICB0aGlzLl9zZXRTY3JvbGxiYXIoKVxuXG4gICAgICB0aGlzLl9hZGp1c3REaWFsb2coKVxuXG4gICAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKENsYXNzTmFtZS5PUEVOKVxuXG4gICAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpXG4gICAgICB0aGlzLl9zZXRSZXNpemVFdmVudCgpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oXG4gICAgICAgIEV2ZW50LkNMSUNLX0RJU01JU1MsXG4gICAgICAgIFNlbGVjdG9yLkRBVEFfRElTTUlTUyxcbiAgICAgICAgKGV2ZW50KSA9PiB0aGlzLmhpZGUoZXZlbnQpXG4gICAgICApXG5cbiAgICAgICQodGhpcy5fZGlhbG9nKS5vbihFdmVudC5NT1VTRURPV05fRElTTUlTUywgKCkgPT4ge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5NT1VTRVVQX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaXModGhpcy5fZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKCgpID0+IHRoaXMuX3Nob3dFbGVtZW50KHJlbGF0ZWRUYXJnZXQpKVxuICAgIH1cblxuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSlcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGhpZGVFdmVudClcblxuICAgICAgaWYgKCF0aGlzLl9pc1Nob3duIHx8IGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlXG4gICAgICBjb25zdCB0cmFuc2l0aW9uID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSlcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpXG4gICAgICB0aGlzLl9zZXRSZXNpemVFdmVudCgpXG5cbiAgICAgICQoZG9jdW1lbnQpLm9mZihFdmVudC5GT0NVU0lOKVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFdmVudC5DTElDS19ESVNNSVNTKVxuICAgICAgJCh0aGlzLl9kaWFsb2cpLm9mZihFdmVudC5NT1VTRURPV05fRElTTUlTUylcblxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5faGlkZU1vZGFsKGV2ZW50KSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGlkZU1vZGFsKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuXG4gICAgICAkKHdpbmRvdywgZG9jdW1lbnQsIHRoaXMuX2VsZW1lbnQsIHRoaXMuX2JhY2tkcm9wKS5vZmYoRVZFTlRfS0VZKVxuXG4gICAgICB0aGlzLl9jb25maWcgICAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2RpYWxvZyAgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9iYWNrZHJvcCAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNTaG93biAgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nICAgPSBudWxsXG4gICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gbnVsbFxuICAgICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggICAgICA9IG51bGxcbiAgICB9XG5cbiAgICBoYW5kbGVVcGRhdGUoKSB7XG4gICAgICB0aGlzLl9hZGp1c3REaWFsb2coKVxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgIC4uLmNvbmZpZ1xuICAgICAgfVxuICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSlcbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG5cbiAgICBfc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCkge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbiA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG5cbiAgICAgIGlmICghdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlIHx8XG4gICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIC8vIERvbid0IG1vdmUgbW9kYWwncyBET00gcG9zaXRpb25cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxuICAgICAgdGhpcy5fZWxlbWVudC5zY3JvbGxUb3AgPSAwXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgICAgdGhpcy5fZW5mb3JjZUZvY3VzKClcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2hvd25FdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPV04sIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldFxuICAgICAgfSlcblxuICAgICAgY29uc3QgdHJhbnNpdGlvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3duRXZlbnQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiAgPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICAgJCh0aGlzLl9kaWFsb2cpXG4gICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCB0cmFuc2l0aW9uQ29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX2VuZm9yY2VGb2N1cygpIHtcbiAgICAgICQoZG9jdW1lbnQpXG4gICAgICAgIC5vZmYoRXZlbnQuRk9DVVNJTikgLy8gR3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAgIC5vbihFdmVudC5GT0NVU0lOLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiZcbiAgICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5oYXMoZXZlbnQudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBfc2V0RXNjYXBlRXZlbnQoKSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5LRVlET1dOX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFdmVudC5LRVlET1dOX0RJU01JU1MpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX3NldFJlc2l6ZUV2ZW50KCkge1xuICAgICAgaWYgKHRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgJCh3aW5kb3cpLm9uKEV2ZW50LlJFU0laRSwgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZVVwZGF0ZShldmVudCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHdpbmRvdykub2ZmKEV2ZW50LlJFU0laRSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGlkZU1vZGFsKCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKVxuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX3Nob3dCYWNrZHJvcCgoKSA9PiB7XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pXG4gICAgICAgIHRoaXMuX3Jlc2V0QWRqdXN0bWVudHMoKVxuICAgICAgICB0aGlzLl9yZXNldFNjcm9sbGJhcigpXG4gICAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihFdmVudC5ISURERU4pXG4gICAgICB9KVxuICAgIH1cblxuICAgIF9yZW1vdmVCYWNrZHJvcCgpIHtcbiAgICAgIGlmICh0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5yZW1vdmUoKVxuICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfc2hvd0JhY2tkcm9wKGNhbGxiYWNrKSB7XG4gICAgICBjb25zdCBhbmltYXRlID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSlcbiAgICAgICAgPyBDbGFzc05hbWUuRkFERSA6ICcnXG5cbiAgICAgIGlmICh0aGlzLl9pc1Nob3duICYmIHRoaXMuX2NvbmZpZy5iYWNrZHJvcCkge1xuICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHRoaXMuX2JhY2tkcm9wLmNsYXNzTmFtZSA9IENsYXNzTmFtZS5CQUNLRFJPUFxuXG4gICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NMaXN0LmFkZChhbmltYXRlKVxuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSlcblxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2JhY2tkcm9wKVxuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhbmltYXRlKSB7XG4gICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2JhY2tkcm9wKVxuXG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApXG4gICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFjaylcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuX2JhY2tkcm9wKSB7XG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICBjb25zdCBiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fYmFja2Ryb3ApXG5cbiAgICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKVxuICAgICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuICAgIC8vIHRvZG8gKGZhdCk6IHRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSByZWZhY3RvcmVkIG91dCBvZiBtb2RhbC5qc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIF9hZGp1c3REaWFsb2coKSB7XG4gICAgICBjb25zdCBpc01vZGFsT3ZlcmZsb3dpbmcgPVxuICAgICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgICAgaWYgKCF0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiBpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IGAke3RoaXMuX3Njcm9sbGJhcldpZHRofXB4YFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMuX3Njcm9sbGJhcldpZHRofXB4YFxuICAgICAgfVxuICAgIH1cblxuICAgIF9yZXNldEFkanVzdG1lbnRzKCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICcnXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnXG4gICAgfVxuXG4gICAgX2NoZWNrU2Nyb2xsYmFyKCkge1xuICAgICAgY29uc3QgcmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nID0gcmVjdC5sZWZ0ICsgcmVjdC5yaWdodCA8IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IHRoaXMuX2dldFNjcm9sbGJhcldpZHRoKClcbiAgICB9XG5cbiAgICBfc2V0U2Nyb2xsYmFyKCkge1xuICAgICAgaWYgKHRoaXMuX2lzQm9keU92ZXJmbG93aW5nKSB7XG4gICAgICAgIC8vIE5vdGU6IERPTU5vZGUuc3R5bGUucGFkZGluZ1JpZ2h0IHJldHVybnMgdGhlIGFjdHVhbCB2YWx1ZSBvciAnJyBpZiBub3Qgc2V0XG4gICAgICAgIC8vICAgd2hpbGUgJChET01Ob2RlKS5jc3MoJ3BhZGRpbmctcmlnaHQnKSByZXR1cm5zIHRoZSBjYWxjdWxhdGVkIHZhbHVlIG9yIDAgaWYgbm90IHNldFxuICAgICAgICBjb25zdCBmaXhlZENvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRklYRURfQ09OVEVOVCkpXG4gICAgICAgIGNvbnN0IHN0aWNreUNvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlQpKVxuXG4gICAgICAgIC8vIEFkanVzdCBmaXhlZCBjb250ZW50IHBhZGRpbmdcbiAgICAgICAgJChmaXhlZENvbnRlbnQpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgYWN0dWFsUGFkZGluZyA9IGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0XG4gICAgICAgICAgY29uc3QgY2FsY3VsYXRlZFBhZGRpbmcgPSAkKGVsZW1lbnQpLmNzcygncGFkZGluZy1yaWdodCcpXG4gICAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgICAgLmRhdGEoJ3BhZGRpbmctcmlnaHQnLCBhY3R1YWxQYWRkaW5nKVxuICAgICAgICAgICAgLmNzcygncGFkZGluZy1yaWdodCcsIGAke3BhcnNlRmxvYXQoY2FsY3VsYXRlZFBhZGRpbmcpICsgdGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIEFkanVzdCBzdGlja3kgY29udGVudCBtYXJnaW5cbiAgICAgICAgJChzdGlja3lDb250ZW50KS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFjdHVhbE1hcmdpbiA9IGVsZW1lbnQuc3R5bGUubWFyZ2luUmlnaHRcbiAgICAgICAgICBjb25zdCBjYWxjdWxhdGVkTWFyZ2luID0gJChlbGVtZW50KS5jc3MoJ21hcmdpbi1yaWdodCcpXG4gICAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgICAgLmRhdGEoJ21hcmdpbi1yaWdodCcsIGFjdHVhbE1hcmdpbilcbiAgICAgICAgICAgIC5jc3MoJ21hcmdpbi1yaWdodCcsIGAke3BhcnNlRmxvYXQoY2FsY3VsYXRlZE1hcmdpbikgLSB0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGApXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQWRqdXN0IGJvZHkgcGFkZGluZ1xuICAgICAgICBjb25zdCBhY3R1YWxQYWRkaW5nID0gZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHRcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlZFBhZGRpbmcgPSAkKGRvY3VtZW50LmJvZHkpLmNzcygncGFkZGluZy1yaWdodCcpXG4gICAgICAgICQoZG9jdW1lbnQuYm9keSlcbiAgICAgICAgICAuZGF0YSgncGFkZGluZy1yaWdodCcsIGFjdHVhbFBhZGRpbmcpXG4gICAgICAgICAgLmNzcygncGFkZGluZy1yaWdodCcsIGAke3BhcnNlRmxvYXQoY2FsY3VsYXRlZFBhZGRpbmcpICsgdGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgKVxuICAgICAgfVxuICAgIH1cblxuICAgIF9yZXNldFNjcm9sbGJhcigpIHtcbiAgICAgIC8vIFJlc3RvcmUgZml4ZWQgY29udGVudCBwYWRkaW5nXG4gICAgICBjb25zdCBmaXhlZENvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRklYRURfQ09OVEVOVCkpXG4gICAgICAkKGZpeGVkQ29udGVudCkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9ICQoZWxlbWVudCkuZGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgICAgICQoZWxlbWVudCkucmVtb3ZlRGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgICAgIGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZyA/IHBhZGRpbmcgOiAnJ1xuICAgICAgfSlcblxuICAgICAgLy8gUmVzdG9yZSBzdGlja3kgY29udGVudFxuICAgICAgY29uc3QgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCR7U2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlR9YCkpXG4gICAgICAkKGVsZW1lbnRzKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBtYXJnaW4gPSAkKGVsZW1lbnQpLmRhdGEoJ21hcmdpbi1yaWdodCcpXG4gICAgICAgIGlmICh0eXBlb2YgbWFyZ2luICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICQoZWxlbWVudCkuY3NzKCdtYXJnaW4tcmlnaHQnLCBtYXJnaW4pLnJlbW92ZURhdGEoJ21hcmdpbi1yaWdodCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlc3RvcmUgYm9keSBwYWRkaW5nXG4gICAgICBjb25zdCBwYWRkaW5nID0gJChkb2N1bWVudC5ib2R5KS5kYXRhKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlRGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHBhZGRpbmcgPyBwYWRkaW5nIDogJydcbiAgICB9XG5cbiAgICBfZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7IC8vIHRoeCBkLndhbHNoXG4gICAgICBjb25zdCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9IENsYXNzTmFtZS5TQ1JPTExCQVJfTUVBU1VSRVJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KVxuICAgICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KVxuICAgICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcsIHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAgIC4uLiQodGhpcykuZGF0YSgpLFxuICAgICAgICAgIC4uLnR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IE1vZGFsKHRoaXMsIF9jb25maWcpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KVxuICAgICAgICB9IGVsc2UgaWYgKF9jb25maWcuc2hvdykge1xuICAgICAgICAgIGRhdGEuc2hvdyhyZWxhdGVkVGFyZ2V0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHRhcmdldFxuICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0gJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpXG4gICAgICA/ICd0b2dnbGUnIDoge1xuICAgICAgICAuLi4kKHRhcmdldCkuZGF0YSgpLFxuICAgICAgICAuLi4kKHRoaXMpLmRhdGEoKVxuICAgICAgfVxuXG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJ0EnIHx8IHRoaXMudGFnTmFtZSA9PT0gJ0FSRUEnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgY29uc3QgJHRhcmdldCA9ICQodGFyZ2V0KS5vbmUoRXZlbnQuU0hPVywgKHNob3dFdmVudCkgPT4ge1xuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAvLyBPbmx5IHJlZ2lzdGVyIGZvY3VzIHJlc3RvcmVyIGlmIG1vZGFsIHdpbGwgYWN0dWFsbHkgZ2V0IHNob3duXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAkdGFyZ2V0Lm9uZShFdmVudC5ISURERU4sICgpID0+IHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgTW9kYWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGFyZ2V0KSwgY29uZmlnLCB0aGlzKVxuICB9KVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gTW9kYWwuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gTW9kYWxcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gTW9kYWwuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIE1vZGFsXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogdG9vbHRpcC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgVG9vbHRpcCA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ3Rvb2x0aXAnXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjEuMydcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2JzLnRvb2x0aXAnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cbiAgY29uc3QgQ0xBU1NfUFJFRklYICAgICAgID0gJ2JzLXRvb2x0aXAnXG4gIGNvbnN0IEJTQ0xTX1BSRUZJWF9SRUdFWCA9IG5ldyBSZWdFeHAoYChefFxcXFxzKSR7Q0xBU1NfUFJFRklYfVxcXFxTK2AsICdnJylcblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBhbmltYXRpb24gICAgICAgICAgIDogJ2Jvb2xlYW4nLFxuICAgIHRlbXBsYXRlICAgICAgICAgICAgOiAnc3RyaW5nJyxcbiAgICB0aXRsZSAgICAgICAgICAgICAgIDogJyhzdHJpbmd8ZWxlbWVudHxmdW5jdGlvbiknLFxuICAgIHRyaWdnZXIgICAgICAgICAgICAgOiAnc3RyaW5nJyxcbiAgICBkZWxheSAgICAgICAgICAgICAgIDogJyhudW1iZXJ8b2JqZWN0KScsXG4gICAgaHRtbCAgICAgICAgICAgICAgICA6ICdib29sZWFuJyxcbiAgICBzZWxlY3RvciAgICAgICAgICAgIDogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICAgIHBsYWNlbWVudCAgICAgICAgICAgOiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICAgIG9mZnNldCAgICAgICAgICAgICAgOiAnKG51bWJlcnxzdHJpbmcpJyxcbiAgICBjb250YWluZXIgICAgICAgICAgIDogJyhzdHJpbmd8ZWxlbWVudHxib29sZWFuKScsXG4gICAgZmFsbGJhY2tQbGFjZW1lbnQgICA6ICcoc3RyaW5nfGFycmF5KScsXG4gICAgYm91bmRhcnkgICAgICAgICAgICA6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICB9XG5cbiAgY29uc3QgQXR0YWNobWVudE1hcCA9IHtcbiAgICBBVVRPICAgOiAnYXV0bycsXG4gICAgVE9QICAgIDogJ3RvcCcsXG4gICAgUklHSFQgIDogJ3JpZ2h0JyxcbiAgICBCT1RUT00gOiAnYm90dG9tJyxcbiAgICBMRUZUICAgOiAnbGVmdCdcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgYW5pbWF0aW9uICAgICAgICAgICA6IHRydWUsXG4gICAgdGVtcGxhdGUgICAgICAgICAgICA6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIHRyaWdnZXIgICAgICAgICAgICAgOiAnaG92ZXIgZm9jdXMnLFxuICAgIHRpdGxlICAgICAgICAgICAgICAgOiAnJyxcbiAgICBkZWxheSAgICAgICAgICAgICAgIDogMCxcbiAgICBodG1sICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgc2VsZWN0b3IgICAgICAgICAgICA6IGZhbHNlLFxuICAgIHBsYWNlbWVudCAgICAgICAgICAgOiAndG9wJyxcbiAgICBvZmZzZXQgICAgICAgICAgICAgIDogMCxcbiAgICBjb250YWluZXIgICAgICAgICAgIDogZmFsc2UsXG4gICAgZmFsbGJhY2tQbGFjZW1lbnQgICA6ICdmbGlwJyxcbiAgICBib3VuZGFyeSAgICAgICAgICAgIDogJ3Njcm9sbFBhcmVudCdcbiAgfVxuXG4gIGNvbnN0IEhvdmVyU3RhdGUgPSB7XG4gICAgU0hPVyA6ICdzaG93JyxcbiAgICBPVVQgIDogJ291dCdcbiAgfVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIEhJREUgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gICAgU0hPV04gICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gICAgSU5TRVJURUQgICA6IGBpbnNlcnRlZCR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0sgICAgICA6IGBjbGljayR7RVZFTlRfS0VZfWAsXG4gICAgRk9DVVNJTiAgICA6IGBmb2N1c2luJHtFVkVOVF9LRVl9YCxcbiAgICBGT0NVU09VVCAgIDogYGZvY3Vzb3V0JHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUVOVEVSIDogYG1vdXNlZW50ZXIke0VWRU5UX0tFWX1gLFxuICAgIE1PVVNFTEVBVkUgOiBgbW91c2VsZWF2ZSR7RVZFTlRfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBGQURFIDogJ2ZhZGUnLFxuICAgIFNIT1cgOiAnc2hvdydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIFRPT0xUSVAgICAgICAgOiAnLnRvb2x0aXAnLFxuICAgIFRPT0xUSVBfSU5ORVIgOiAnLnRvb2x0aXAtaW5uZXInLFxuICAgIEFSUk9XICAgICAgICAgOiAnLmFycm93J1xuICB9XG5cbiAgY29uc3QgVHJpZ2dlciA9IHtcbiAgICBIT1ZFUiAgOiAnaG92ZXInLFxuICAgIEZPQ1VTICA6ICdmb2N1cycsXG4gICAgQ0xJQ0sgIDogJ2NsaWNrJyxcbiAgICBNQU5VQUwgOiAnbWFudWFsJ1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIFRvb2x0aXAge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayBmb3IgUG9wcGVyIGRlcGVuZGVuY3lcbiAgICAgICAqIFBvcHBlciAtIGh0dHBzOi8vcG9wcGVyLmpzLm9yZ1xuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwIHRvb2x0aXBzIHJlcXVpcmUgUG9wcGVyLmpzIChodHRwczovL3BvcHBlci5qcy5vcmcpJylcbiAgICAgIH1cblxuICAgICAgLy8gcHJpdmF0ZVxuICAgICAgdGhpcy5faXNFbmFibGVkICAgICA9IHRydWVcbiAgICAgIHRoaXMuX3RpbWVvdXQgICAgICAgPSAwXG4gICAgICB0aGlzLl9ob3ZlclN0YXRlICAgID0gJydcbiAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSB7fVxuICAgICAgdGhpcy5fcG9wcGVyICAgICAgICA9IG51bGxcblxuICAgICAgLy8gUHJvdGVjdGVkXG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICB0aGlzLmNvbmZpZyAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgICAgdGhpcy50aXAgICAgID0gbnVsbFxuXG4gICAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICByZXR1cm4gTkFNRVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgREFUQV9LRVkoKSB7XG4gICAgICByZXR1cm4gREFUQV9LRVlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEV2ZW50KCkge1xuICAgICAgcmV0dXJuIEV2ZW50XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBFVkVOVF9LRVkoKSB7XG4gICAgICByZXR1cm4gRVZFTlRfS0VZXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgZW5hYmxlKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIHRvZ2dsZUVuYWJsZWQoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSAhdGhpcy5faXNFbmFibGVkXG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZXG4gICAgICAgIGxldCBjb250ZXh0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpXG5cbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICAgIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKClcbiAgICAgICAgICApXG4gICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpXG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyLmNsaWNrID0gIWNvbnRleHQuX2FjdGl2ZVRyaWdnZXIuY2xpY2tcblxuICAgICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgY29udGV4dC5fZW50ZXIobnVsbCwgY29udGV4dClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZXh0Ll9sZWF2ZShudWxsLCBjb250ZXh0KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoJCh0aGlzLmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VudGVyKG51bGwsIHRoaXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KVxuXG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKVxuXG4gICAgICAkKHRoaXMuZWxlbWVudCkub2ZmKHRoaXMuY29uc3RydWN0b3IuRVZFTlRfS0VZKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmNsb3Nlc3QoJy5tb2RhbCcpLm9mZignaGlkZS5icy5tb2RhbCcpXG5cbiAgICAgIGlmICh0aGlzLnRpcCkge1xuICAgICAgICAkKHRoaXMudGlwKS5yZW1vdmUoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc0VuYWJsZWQgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdGltZW91dCAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2hvdmVyU3RhdGUgICAgPSBudWxsXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0gbnVsbFxuICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3BvcHBlciA9IG51bGxcbiAgICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgICAgIHRoaXMuY29uZmlnICA9IG51bGxcbiAgICAgIHRoaXMudGlwICAgICA9IG51bGxcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgaWYgKCQodGhpcy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHVzZSBzaG93IG9uIHZpc2libGUgZWxlbWVudHMnKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzaG93RXZlbnQgPSAkLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuU0hPVylcbiAgICAgIGlmICh0aGlzLmlzV2l0aENvbnRlbnQoKSAmJiB0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgICAgIGNvbnN0IGlzSW5UaGVEb20gPSAkLmNvbnRhaW5zKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgICB0aGlzLmVsZW1lbnRcbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgIWlzSW5UaGVEb20pIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpcCAgID0gdGhpcy5nZXRUaXBFbGVtZW50KClcbiAgICAgICAgY29uc3QgdGlwSWQgPSBVdGlsLmdldFVJRCh0aGlzLmNvbnN0cnVjdG9yLk5BTUUpXG5cbiAgICAgICAgdGlwLnNldEF0dHJpYnV0ZSgnaWQnLCB0aXBJZClcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRpcElkKVxuXG4gICAgICAgIHRoaXMuc2V0Q29udGVudCgpXG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgICAgICQodGlwKS5hZGRDbGFzcyhDbGFzc05hbWUuRkFERSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBsYWNlbWVudCAgPSB0eXBlb2YgdGhpcy5jb25maWcucGxhY2VtZW50ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB0aGlzLmNvbmZpZy5wbGFjZW1lbnQuY2FsbCh0aGlzLCB0aXAsIHRoaXMuZWxlbWVudClcbiAgICAgICAgICA6IHRoaXMuY29uZmlnLnBsYWNlbWVudFxuXG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSB0aGlzLl9nZXRBdHRhY2htZW50KHBsYWNlbWVudClcbiAgICAgICAgdGhpcy5hZGRBdHRhY2htZW50Q2xhc3MoYXR0YWNobWVudClcblxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbmZpZy5jb250YWluZXIgPT09IGZhbHNlID8gZG9jdW1lbnQuYm9keSA6ICQoZG9jdW1lbnQpLmZpbmQodGhpcy5jb25maWcuY29udGFpbmVyKVxuXG4gICAgICAgICQodGlwKS5kYXRhKHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVksIHRoaXMpXG5cbiAgICAgICAgaWYgKCEkLmNvbnRhaW5zKHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpcy50aXApKSB7XG4gICAgICAgICAgJCh0aXApLmFwcGVuZFRvKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5lbGVtZW50KS50cmlnZ2VyKHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSU5TRVJURUQpXG5cbiAgICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcih0aGlzLmVsZW1lbnQsIHRpcCwge1xuICAgICAgICAgIHBsYWNlbWVudDogYXR0YWNobWVudCxcbiAgICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMuY29uZmlnLm9mZnNldFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgYmVoYXZpb3I6IHRoaXMuY29uZmlnLmZhbGxiYWNrUGxhY2VtZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXJyb3c6IHtcbiAgICAgICAgICAgICAgZWxlbWVudDogU2VsZWN0b3IuQVJST1dcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IHRoaXMuY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNyZWF0ZTogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLm9yaWdpbmFsUGxhY2VtZW50ICE9PSBkYXRhLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UoZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVXBkYXRlOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKGRhdGEpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgICQodGlwKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgdG8gdGhlIGJvZHkncyBpbW1lZGlhdGUgY2hpbGRyZW47XG4gICAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgJChkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9uKCdtb3VzZW92ZXInLCBudWxsLCAkLm5vb3ApXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9maXhUcmFuc2l0aW9uKClcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcHJldkhvdmVyU3RhdGUgPSB0aGlzLl9ob3ZlclN0YXRlXG4gICAgICAgICAgdGhpcy5faG92ZXJTdGF0ZSAgICAgPSBudWxsXG5cbiAgICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LlNIT1dOKVxuXG4gICAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLk9VVCkge1xuICAgICAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh0aGlzLnRpcCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLnRpcClcblxuICAgICAgICAgICQodGhpcy50aXApXG4gICAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wbGV0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKGNhbGxiYWNrKSB7XG4gICAgICBjb25zdCB0aXAgICAgICAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKVxuICAgICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkhJREUpXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2hvdmVyU3RhdGUgIT09IEhvdmVyU3RhdGUuU0hPVyAmJiB0aXAucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRpcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRpcClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NsZWFuVGlwQ2xhc3MoKVxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5ISURERU4pXG4gICAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuXG4gICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAkKHRpcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSByZW1vdmUgdGhlIGV4dHJhXG4gICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub2ZmKCdtb3VzZW92ZXInLCBudWxsLCAkLm5vb3ApXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5DTElDS10gPSBmYWxzZVxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkZPQ1VTXSA9IGZhbHNlXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuSE9WRVJdID0gZmFsc2VcblxuICAgICAgaWYgKCQodGhpcy50aXApLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRpcClcblxuICAgICAgICAkKHRpcClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hvdmVyU3RhdGUgPSAnJ1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLnNjaGVkdWxlVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcm90ZWN0ZWRcblxuICAgIGlzV2l0aENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldFRpdGxlKCkpXG4gICAgfVxuXG4gICAgYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpIHtcbiAgICAgICQodGhpcy5nZXRUaXBFbGVtZW50KCkpLmFkZENsYXNzKGAke0NMQVNTX1BSRUZJWH0tJHthdHRhY2htZW50fWApXG4gICAgfVxuXG4gICAgZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJCh0aGlzLmNvbmZpZy50ZW1wbGF0ZSlbMF1cbiAgICAgIHJldHVybiB0aGlzLnRpcFxuICAgIH1cblxuICAgIHNldENvbnRlbnQoKSB7XG4gICAgICBjb25zdCB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKVxuICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkKHRpcC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlRPT0xUSVBfSU5ORVIpKSwgdGhpcy5nZXRUaXRsZSgpKVxuICAgICAgJCh0aXApLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5GQURFfSAke0NsYXNzTmFtZS5TSE9XfWApXG4gICAgfVxuXG4gICAgc2V0RWxlbWVudENvbnRlbnQoJGVsZW1lbnQsIGNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNvbmZpZy5odG1sXG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdvYmplY3QnICYmIChjb250ZW50Lm5vZGVUeXBlIHx8IGNvbnRlbnQuanF1ZXJ5KSkge1xuICAgICAgICAvLyBDb250ZW50IGlzIGEgRE9NIG5vZGUgb3IgYSBqUXVlcnlcbiAgICAgICAgaWYgKGh0bWwpIHtcbiAgICAgICAgICBpZiAoISQoY29udGVudCkucGFyZW50KCkuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpLmFwcGVuZChjb250ZW50KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZWxlbWVudC50ZXh0KCQoY29udGVudCkudGV4dCgpKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWxlbWVudFtodG1sID8gJ2h0bWwnIDogJ3RleHQnXShjb250ZW50KVxuICAgICAgfVxuICAgIH1cblxuICAgIGdldFRpdGxlKCkge1xuICAgICAgbGV0IHRpdGxlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScpXG5cbiAgICAgIGlmICghdGl0bGUpIHtcbiAgICAgICAgdGl0bGUgPSB0eXBlb2YgdGhpcy5jb25maWcudGl0bGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMuY29uZmlnLnRpdGxlLmNhbGwodGhpcy5lbGVtZW50KVxuICAgICAgICAgIDogdGhpcy5jb25maWcudGl0bGVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRpdGxlXG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX2dldEF0dGFjaG1lbnQocGxhY2VtZW50KSB7XG4gICAgICByZXR1cm4gQXR0YWNobWVudE1hcFtwbGFjZW1lbnQudG9VcHBlckNhc2UoKV1cbiAgICB9XG5cbiAgICBfc2V0TGlzdGVuZXJzKCkge1xuICAgICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmNvbmZpZy50cmlnZ2VyLnNwbGl0KCcgJylcblxuICAgICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgICBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICQodGhpcy5lbGVtZW50KS5vbihcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuRXZlbnQuQ0xJQ0ssXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RvcixcbiAgICAgICAgICAgIChldmVudCkgPT4gdGhpcy50b2dnbGUoZXZlbnQpXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT09IFRyaWdnZXIuTUFOVUFMKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnRJbiA9IHRyaWdnZXIgPT09IFRyaWdnZXIuSE9WRVJcbiAgICAgICAgICAgID8gdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUVOVEVSXG4gICAgICAgICAgICA6IHRoaXMuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNJTlxuICAgICAgICAgIGNvbnN0IGV2ZW50T3V0ID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUlxuICAgICAgICAgICAgPyB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFTEVBVkVcbiAgICAgICAgICAgIDogdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5GT0NVU09VVFxuXG4gICAgICAgICAgJCh0aGlzLmVsZW1lbnQpXG4gICAgICAgICAgICAub24oXG4gICAgICAgICAgICAgIGV2ZW50SW4sXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdG9yLFxuICAgICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2VudGVyKGV2ZW50KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLm9uKFxuICAgICAgICAgICAgICBldmVudE91dCxcbiAgICAgICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgICAgIChldmVudCkgPT4gdGhpcy5fbGVhdmUoZXZlbnQpXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICAkKHRoaXMuZWxlbWVudCkuY2xvc2VzdCgnLm1vZGFsJykub24oXG4gICAgICAgICAgJ2hpZGUuYnMubW9kYWwnLFxuICAgICAgICAgICgpID0+IHRoaXMuaGlkZSgpXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3Rvcikge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgICAuLi50aGlzLmNvbmZpZyxcbiAgICAgICAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICAgICAgICBzZWxlY3RvcjogJydcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZml4VGl0bGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIF9maXhUaXRsZSgpIHtcbiAgICAgIGNvbnN0IHRpdGxlVHlwZSA9IHR5cGVvZiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8XG4gICAgICAgICB0aXRsZVR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgfHwgJydcbiAgICAgICAgKVxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsICcnKVxuICAgICAgfVxuICAgIH1cblxuICAgIF9lbnRlcihldmVudCwgY29udGV4dCkge1xuICAgICAgY29uc3QgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVlcblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpXG5cbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpXG4gICAgICAgIClcbiAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW1xuICAgICAgICAgIGV2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXG4gICAgICAgIF0gPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgkKGNvbnRleHQuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykgfHxcbiAgICAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuU0hPVykge1xuICAgICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5TSE9XXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoY29udGV4dC5fdGltZW91dClcblxuICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuU0hPV1xuXG4gICAgICBpZiAoIWNvbnRleHQuY29uZmlnLmRlbGF5IHx8ICFjb250ZXh0LmNvbmZpZy5kZWxheS5zaG93KSB7XG4gICAgICAgIGNvbnRleHQuc2hvdygpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb250ZXh0Ll90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChjb250ZXh0Ll9ob3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLlNIT1cpIHtcbiAgICAgICAgICBjb250ZXh0LnNob3coKVxuICAgICAgICB9XG4gICAgICB9LCBjb250ZXh0LmNvbmZpZy5kZWxheS5zaG93KVxuICAgIH1cblxuICAgIF9sZWF2ZShldmVudCwgY29udGV4dCkge1xuICAgICAgY29uc3QgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVlcblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpXG5cbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpXG4gICAgICAgIClcbiAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW1xuICAgICAgICAgIGV2ZW50LnR5cGUgPT09ICdmb2N1c291dCcgPyBUcmlnZ2VyLkZPQ1VTIDogVHJpZ2dlci5IT1ZFUlxuICAgICAgICBdID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRleHQuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpXG5cbiAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLk9VVFxuXG4gICAgICBpZiAoIWNvbnRleHQuY29uZmlnLmRlbGF5IHx8ICFjb250ZXh0LmNvbmZpZy5kZWxheS5oaWRlKSB7XG4gICAgICAgIGNvbnRleHQuaGlkZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb250ZXh0Ll90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChjb250ZXh0Ll9ob3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLk9VVCkge1xuICAgICAgICAgIGNvbnRleHQuaGlkZSgpXG4gICAgICAgIH1cbiAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpXG4gICAgfVxuXG4gICAgX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSB7XG4gICAgICBmb3IgKGNvbnN0IHRyaWdnZXIgaW4gdGhpcy5fYWN0aXZlVHJpZ2dlcikge1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlVHJpZ2dlclt0cmlnZ2VyXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgLi4udGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0LFxuICAgICAgICAuLi4kKHRoaXMuZWxlbWVudCkuZGF0YSgpLFxuICAgICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICAgIHNob3c6IGNvbmZpZy5kZWxheSxcbiAgICAgICAgICBoaWRlOiBjb25maWcuZGVsYXlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlLnRvU3RyaW5nKClcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcuY29udGVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLmNvbnRlbnQgPSBjb25maWcuY29udGVudC50b1N0cmluZygpXG4gICAgICB9XG5cbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKFxuICAgICAgICBOQU1FLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGVcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9nZXREZWxlZ2F0ZUNvbmZpZygpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHt9XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRba2V5XSAhPT0gdGhpcy5jb25maWdba2V5XSkge1xuICAgICAgICAgICAgY29uZmlnW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG5cbiAgICBfY2xlYW5UaXBDbGFzcygpIHtcbiAgICAgIGNvbnN0ICR0aXAgPSAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKVxuICAgICAgY29uc3QgdGFiQ2xhc3MgPSAkdGlwLmF0dHIoJ2NsYXNzJykubWF0Y2goQlNDTFNfUFJFRklYX1JFR0VYKVxuICAgICAgaWYgKHRhYkNsYXNzICE9PSBudWxsICYmIHRhYkNsYXNzLmxlbmd0aCkge1xuICAgICAgICAkdGlwLnJlbW92ZUNsYXNzKHRhYkNsYXNzLmpvaW4oJycpKVxuICAgICAgfVxuICAgIH1cblxuICAgIF9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UocG9wcGVyRGF0YSkge1xuICAgICAgY29uc3QgcG9wcGVySW5zdGFuY2UgPSBwb3BwZXJEYXRhLmluc3RhbmNlXG4gICAgICB0aGlzLnRpcCA9IHBvcHBlckluc3RhbmNlLnBvcHBlclxuICAgICAgdGhpcy5fY2xlYW5UaXBDbGFzcygpXG4gICAgICB0aGlzLmFkZEF0dGFjaG1lbnRDbGFzcyh0aGlzLl9nZXRBdHRhY2htZW50KHBvcHBlckRhdGEucGxhY2VtZW50KSlcbiAgICB9XG5cbiAgICBfZml4VHJhbnNpdGlvbigpIHtcbiAgICAgIGNvbnN0IHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpXG4gICAgICBjb25zdCBpbml0Q29uZmlnQW5pbWF0aW9uID0gdGhpcy5jb25maWcuYW5pbWF0aW9uXG4gICAgICBpZiAodGlwLmdldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnKSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgICQodGlwKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuRkFERSlcbiAgICAgIHRoaXMuY29uZmlnLmFuaW1hdGlvbiA9IGZhbHNlXG4gICAgICB0aGlzLmhpZGUoKVxuICAgICAgdGhpcy5zaG93KClcbiAgICAgIHRoaXMuY29uZmlnLmFuaW1hdGlvbiA9IGluaXRDb25maWdBbmltYXRpb25cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBjb25zdCBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnXG5cbiAgICAgICAgaWYgKCFkYXRhICYmIC9kaXNwb3NlfGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBUb29sdGlwKHRoaXMsIF9jb25maWcpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRvb2x0aXBcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gVG9vbHRpcFxufSkoJCwgUG9wcGVyKVxuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL3Rvb2x0aXAnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogcG9wb3Zlci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgUG9wb3ZlciA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdwb3BvdmVyJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMS4zJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLnBvcG92ZXInXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuICBjb25zdCBDTEFTU19QUkVGSVggICAgICAgID0gJ2JzLXBvcG92ZXInXG4gIGNvbnN0IEJTQ0xTX1BSRUZJWF9SRUdFWCAgPSBuZXcgUmVnRXhwKGAoXnxcXFxccykke0NMQVNTX1BSRUZJWH1cXFxcUytgLCAnZycpXG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICAuLi5Ub29sdGlwLkRlZmF1bHQsXG4gICAgcGxhY2VtZW50IDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyICAgOiAnY2xpY2snLFxuICAgIGNvbnRlbnQgICA6ICcnLFxuICAgIHRlbXBsYXRlICA6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8aDMgY2xhc3M9XCJwb3BvdmVyLWhlYWRlclwiPjwvaDM+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWJvZHlcIj48L2Rpdj48L2Rpdj4nXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICAuLi5Ub29sdGlwLkRlZmF1bHRUeXBlLFxuICAgIGNvbnRlbnQgOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKSdcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBGQURFIDogJ2ZhZGUnLFxuICAgIFNIT1cgOiAnc2hvdydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIFRJVExFICAgOiAnLnBvcG92ZXItaGVhZGVyJyxcbiAgICBDT05URU5UIDogJy5wb3BvdmVyLWJvZHknXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICAgIEhJRERFTiAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICAgIElOU0VSVEVEICAgOiBgaW5zZXJ0ZWQke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICAgIEZPQ1VTSU4gICAgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfWAsXG4gICAgRk9DVVNPVVQgICA6IGBmb2N1c291dCR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VFTlRFUiA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUxFQVZFIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gXG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIFBvcG92ZXIgZXh0ZW5kcyBUb29sdGlwIHtcbiAgICAvLyBHZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUVcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERBVEFfS0VZKCkge1xuICAgICAgcmV0dXJuIERBVEFfS0VZXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBFdmVudCgpIHtcbiAgICAgIHJldHVybiBFdmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRVZFTlRfS0VZKCkge1xuICAgICAgcmV0dXJuIEVWRU5UX0tFWVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZXNcblxuICAgIGlzV2l0aENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKVxuICAgIH1cblxuICAgIGFkZEF0dGFjaG1lbnRDbGFzcyhhdHRhY2htZW50KSB7XG4gICAgICAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5hZGRDbGFzcyhgJHtDTEFTU19QUkVGSVh9LSR7YXR0YWNobWVudH1gKVxuICAgIH1cblxuICAgIGdldFRpcEVsZW1lbnQoKSB7XG4gICAgICB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQodGhpcy5jb25maWcudGVtcGxhdGUpWzBdXG4gICAgICByZXR1cm4gdGhpcy50aXBcbiAgICB9XG5cbiAgICBzZXRDb250ZW50KCkge1xuICAgICAgY29uc3QgJHRpcCA9ICQodGhpcy5nZXRUaXBFbGVtZW50KCkpXG5cbiAgICAgIC8vIFdlIHVzZSBhcHBlbmQgZm9yIGh0bWwgb2JqZWN0cyB0byBtYWludGFpbiBqcyBldmVudHNcbiAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLlRJVExFKSwgdGhpcy5nZXRUaXRsZSgpKVxuICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLl9nZXRDb250ZW50KClcbiAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5jYWxsKHRoaXMuZWxlbWVudClcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLkNPTlRFTlQpLCBjb250ZW50KVxuXG4gICAgICAkdGlwLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5GQURFfSAke0NsYXNzTmFtZS5TSE9XfWApXG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX2dldENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JykgfHxcbiAgICAgICAgdGhpcy5jb25maWcuY29udGVudFxuICAgIH1cblxuICAgIF9jbGVhblRpcENsYXNzKCkge1xuICAgICAgY29uc3QgJHRpcCA9ICQodGhpcy5nZXRUaXBFbGVtZW50KCkpXG4gICAgICBjb25zdCB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpXG4gICAgICBpZiAodGFiQ2xhc3MgIT09IG51bGwgJiYgdGFiQ2xhc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAkdGlwLnJlbW92ZUNsYXNzKHRhYkNsYXNzLmpvaW4oJycpKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGxcblxuICAgICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBQb3BvdmVyXG59KSgkKVxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMS4zKTogc2Nyb2xsc3B5LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBTY3JvbGxTcHkgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdzY3JvbGxzcHknXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjEuMydcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2JzLnNjcm9sbHNweSdcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgb2Zmc2V0IDogMTAsXG4gICAgbWV0aG9kIDogJ2F1dG8nLFxuICAgIHRhcmdldCA6ICcnXG4gIH1cblxuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBvZmZzZXQgOiAnbnVtYmVyJyxcbiAgICBtZXRob2QgOiAnc3RyaW5nJyxcbiAgICB0YXJnZXQgOiAnKHN0cmluZ3xlbGVtZW50KSdcbiAgfVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIEFDVElWQVRFICAgICAgOiBgYWN0aXZhdGUke0VWRU5UX0tFWX1gLFxuICAgIFNDUk9MTCAgICAgICAgOiBgc2Nyb2xsJHtFVkVOVF9LRVl9YCxcbiAgICBMT0FEX0RBVEFfQVBJIDogYGxvYWQke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG4gIH1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgRFJPUERPV05fSVRFTSA6ICdkcm9wZG93bi1pdGVtJyxcbiAgICBEUk9QRE9XTl9NRU5VIDogJ2Ryb3Bkb3duLW1lbnUnLFxuICAgIEFDVElWRSAgICAgICAgOiAnYWN0aXZlJ1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgREFUQV9TUFkgICAgICAgIDogJ1tkYXRhLXNweT1cInNjcm9sbFwiXScsXG4gICAgQUNUSVZFICAgICAgICAgIDogJy5hY3RpdmUnLFxuICAgIE5BVl9MSVNUX0dST1VQICA6ICcubmF2LCAubGlzdC1ncm91cCcsXG4gICAgTkFWX0xJTktTICAgICAgIDogJy5uYXYtbGluaycsXG4gICAgTkFWX0lURU1TICAgICAgIDogJy5uYXYtaXRlbScsXG4gICAgTElTVF9JVEVNUyAgICAgIDogJy5saXN0LWdyb3VwLWl0ZW0nLFxuICAgIERST1BET1dOICAgICAgICA6ICcuZHJvcGRvd24nLFxuICAgIERST1BET1dOX0lURU1TICA6ICcuZHJvcGRvd24taXRlbScsXG4gICAgRFJPUERPV05fVE9HR0xFIDogJy5kcm9wZG93bi10b2dnbGUnXG4gIH1cblxuICBjb25zdCBPZmZzZXRNZXRob2QgPSB7XG4gICAgT0ZGU0VUICAgOiAnb2Zmc2V0JyxcbiAgICBQT1NJVElPTiA6ICdwb3NpdGlvbidcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgU2Nyb2xsU3B5IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgPSBlbGVtZW50XG4gICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gZWxlbWVudC50YWdOYW1lID09PSAnQk9EWScgPyB3aW5kb3cgOiBlbGVtZW50XG4gICAgICB0aGlzLl9jb25maWcgICAgICAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICAgIHRoaXMuX3NlbGVjdG9yICAgICAgPSBgJHt0aGlzLl9jb25maWcudGFyZ2V0fSAke1NlbGVjdG9yLk5BVl9MSU5LU30sYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7dGhpcy5fY29uZmlnLnRhcmdldH0gJHtTZWxlY3Rvci5MSVNUX0lURU1TfSxgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLl9jb25maWcudGFyZ2V0fSAke1NlbGVjdG9yLkRST1BET1dOX0lURU1TfWBcbiAgICAgIHRoaXMuX29mZnNldHMgICAgICAgPSBbXVxuICAgICAgdGhpcy5fdGFyZ2V0cyAgICAgICA9IFtdXG4gICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgID0gbnVsbFxuICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ICA9IDBcblxuICAgICAgJCh0aGlzLl9zY3JvbGxFbGVtZW50KS5vbihFdmVudC5TQ1JPTEwsIChldmVudCkgPT4gdGhpcy5fcHJvY2VzcyhldmVudCkpXG5cbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgICB0aGlzLl9wcm9jZXNzKClcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgY29uc3QgYXV0b01ldGhvZCA9IHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHRoaXMuX3Njcm9sbEVsZW1lbnQud2luZG93XG4gICAgICAgID8gT2Zmc2V0TWV0aG9kLk9GRlNFVCA6IE9mZnNldE1ldGhvZC5QT1NJVElPTlxuXG4gICAgICBjb25zdCBvZmZzZXRNZXRob2QgPSB0aGlzLl9jb25maWcubWV0aG9kID09PSAnYXV0bydcbiAgICAgICAgPyBhdXRvTWV0aG9kIDogdGhpcy5fY29uZmlnLm1ldGhvZFxuXG4gICAgICBjb25zdCBvZmZzZXRCYXNlID0gb2Zmc2V0TWV0aG9kID09PSBPZmZzZXRNZXRob2QuUE9TSVRJT05cbiAgICAgICAgPyB0aGlzLl9nZXRTY3JvbGxUb3AoKSA6IDBcblxuICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdXG4gICAgICB0aGlzLl90YXJnZXRzID0gW11cblxuICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gdGhpcy5fZ2V0U2Nyb2xsSGVpZ2h0KClcblxuICAgICAgY29uc3QgdGFyZ2V0cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZWxlY3RvcikpXG5cbiAgICAgIHRhcmdldHNcbiAgICAgICAgLm1hcCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgIGxldCB0YXJnZXRcbiAgICAgICAgICBjb25zdCB0YXJnZXRTZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuXG4gICAgICAgICAgaWYgKHRhcmdldFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEJDUiA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgaWYgKHRhcmdldEJDUi53aWR0aCB8fCB0YXJnZXRCQ1IuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gKGZhdCk6IHJlbW92ZSBza2V0Y2ggcmVsaWFuY2Ugb24galF1ZXJ5IHBvc2l0aW9uL29mZnNldFxuICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KVtvZmZzZXRNZXRob2RdKCkudG9wICsgb2Zmc2V0QmFzZSxcbiAgICAgICAgICAgICAgICB0YXJnZXRTZWxlY3RvclxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhWzBdIC0gYlswXSlcbiAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLl9vZmZzZXRzLnB1c2goaXRlbVswXSlcbiAgICAgICAgICB0aGlzLl90YXJnZXRzLnB1c2goaXRlbVsxXSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuICAgICAgJCh0aGlzLl9zY3JvbGxFbGVtZW50KS5vZmYoRVZFTlRfS0VZKVxuXG4gICAgICB0aGlzLl9lbGVtZW50ICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fc2Nyb2xsRWxlbWVudCA9IG51bGxcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9zZWxlY3RvciAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fb2Zmc2V0cyAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX3RhcmdldHMgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgID0gbnVsbFxuICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ICA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy50YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGxldCBpZCA9ICQoY29uZmlnLnRhcmdldCkuYXR0cignaWQnKVxuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgaWQgPSBVdGlsLmdldFVJRChOQU1FKVxuICAgICAgICAgICQoY29uZmlnLnRhcmdldCkuYXR0cignaWQnLCBpZClcbiAgICAgICAgfVxuICAgICAgICBjb25maWcudGFyZ2V0ID0gYCMke2lkfWBcbiAgICAgIH1cblxuICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSlcblxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9nZXRTY3JvbGxUb3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudCA9PT0gd2luZG93XG4gICAgICAgID8gdGhpcy5fc2Nyb2xsRWxlbWVudC5wYWdlWU9mZnNldCA6IHRoaXMuX3Njcm9sbEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfVxuXG4gICAgX2dldFNjcm9sbEhlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heChcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgICAgIClcbiAgICB9XG5cbiAgICBfZ2V0T2Zmc2V0SGVpZ2h0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHdpbmRvd1xuICAgICAgICA/IHdpbmRvdy5pbm5lckhlaWdodCA6IHRoaXMuX3Njcm9sbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgfVxuXG4gICAgX3Byb2Nlc3MoKSB7XG4gICAgICBjb25zdCBzY3JvbGxUb3AgICAgPSB0aGlzLl9nZXRTY3JvbGxUb3AoKSArIHRoaXMuX2NvbmZpZy5vZmZzZXRcbiAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuX2dldFNjcm9sbEhlaWdodCgpXG4gICAgICBjb25zdCBtYXhTY3JvbGwgICAgPSB0aGlzLl9jb25maWcub2Zmc2V0ICtcbiAgICAgICAgc2Nyb2xsSGVpZ2h0IC1cbiAgICAgICAgdGhpcy5fZ2V0T2Zmc2V0SGVpZ2h0KClcblxuICAgICAgaWYgKHRoaXMuX3Njcm9sbEhlaWdodCAhPT0gc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb3AgPj0gbWF4U2Nyb2xsKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX3RhcmdldHNbdGhpcy5fdGFyZ2V0cy5sZW5ndGggLSAxXVxuXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRhcmdldCkge1xuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRhcmdldClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCAmJiBzY3JvbGxUb3AgPCB0aGlzLl9vZmZzZXRzWzBdICYmIHRoaXMuX29mZnNldHNbMF0gPiAwKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGxcbiAgICAgICAgdGhpcy5fY2xlYXIoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2Zmc2V0TGVuZ3RoID0gdGhpcy5fb2Zmc2V0cy5sZW5ndGhcbiAgICAgIGZvciAobGV0IGkgPSBvZmZzZXRMZW5ndGg7IGktLTspIHtcbiAgICAgICAgY29uc3QgaXNBY3RpdmVUYXJnZXQgPSB0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRoaXMuX3RhcmdldHNbaV0gJiZcbiAgICAgICAgICAgIHNjcm9sbFRvcCA+PSB0aGlzLl9vZmZzZXRzW2ldICYmXG4gICAgICAgICAgICAodHlwZW9mIHRoaXMuX29mZnNldHNbaSArIDFdID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA8IHRoaXMuX29mZnNldHNbaSArIDFdKVxuXG4gICAgICAgIGlmIChpc0FjdGl2ZVRhcmdldCkge1xuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRoaXMuX3RhcmdldHNbaV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBfYWN0aXZhdGUodGFyZ2V0KSB7XG4gICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgICAgdGhpcy5fY2xlYXIoKVxuXG4gICAgICBsZXQgcXVlcmllcyA9IHRoaXMuX3NlbGVjdG9yLnNwbGl0KCcsJylcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJvdy1ib2R5LXN0eWxlXG4gICAgICBxdWVyaWVzID0gcXVlcmllcy5tYXAoKHNlbGVjdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiBgJHtzZWxlY3Rvcn1bZGF0YS10YXJnZXQ9XCIke3RhcmdldH1cIl0sYCArXG4gICAgICAgICAgICAgICBgJHtzZWxlY3Rvcn1baHJlZj1cIiR7dGFyZ2V0fVwiXWBcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0ICRsaW5rID0gJChbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcmllcy5qb2luKCcsJykpKSlcblxuICAgICAgaWYgKCRsaW5rLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9JVEVNKSkge1xuICAgICAgICAkbGluay5jbG9zZXN0KFNlbGVjdG9yLkRST1BET1dOKS5maW5kKFNlbGVjdG9yLkRST1BET1dOX1RPR0dMRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgJGxpbmsuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNldCB0cmlnZ2VyZWQgbGluayBhcyBhY3RpdmVcbiAgICAgICAgJGxpbmsuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgLy8gU2V0IHRyaWdnZXJlZCBsaW5rcyBwYXJlbnRzIGFzIGFjdGl2ZVxuICAgICAgICAvLyBXaXRoIGJvdGggPHVsPiBhbmQgPG5hdj4gbWFya3VwIGEgcGFyZW50IGlzIHRoZSBwcmV2aW91cyBzaWJsaW5nIG9mIGFueSBuYXYgYW5jZXN0b3JcbiAgICAgICAgJGxpbmsucGFyZW50cyhTZWxlY3Rvci5OQVZfTElTVF9HUk9VUCkucHJldihgJHtTZWxlY3Rvci5OQVZfTElOS1N9LCAke1NlbGVjdG9yLkxJU1RfSVRFTVN9YCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVuIC5uYXYtbGluayBpcyBpbnNpZGUgLm5hdi1pdGVtXG4gICAgICAgICRsaW5rLnBhcmVudHMoU2VsZWN0b3IuTkFWX0xJU1RfR1JPVVApLnByZXYoU2VsZWN0b3IuTkFWX0lURU1TKS5jaGlsZHJlbihTZWxlY3Rvci5OQVZfTElOS1MpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fc2Nyb2xsRWxlbWVudCkudHJpZ2dlcihFdmVudC5BQ1RJVkFURSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0YXJnZXRcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgX2NsZWFyKCkge1xuICAgICAgY29uc3Qgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2VsZWN0b3IpKVxuICAgICAgJChub2RlcykuZmlsdGVyKFNlbGVjdG9yLkFDVElWRSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBjb25zdCBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnXG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFNweXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9TUFkpKVxuXG4gICAgY29uc3Qgc2Nyb2xsU3B5c0xlbmd0aCA9IHNjcm9sbFNweXMubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IHNjcm9sbFNweXNMZW5ndGg7IGktLTspIHtcbiAgICAgIGNvbnN0ICRzcHkgPSAkKHNjcm9sbFNweXNbaV0pXG4gICAgICBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRzcHksICRzcHkuZGF0YSgpKVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBTY3JvbGxTcHlcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBTY3JvbGxTcHlcbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFNweVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJ1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjEuMyk6IHRhYi5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgVGFiID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgPSAndGFiJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgPSAnNC4xLjMnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdicy50YWInXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IERBVEFfQVBJX0tFWSAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBISURERU4gICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBEUk9QRE9XTl9NRU5VIDogJ2Ryb3Bkb3duLW1lbnUnLFxuICAgIEFDVElWRSAgICAgICAgOiAnYWN0aXZlJyxcbiAgICBESVNBQkxFRCAgICAgIDogJ2Rpc2FibGVkJyxcbiAgICBGQURFICAgICAgICAgIDogJ2ZhZGUnLFxuICAgIFNIT1cgICAgICAgICAgOiAnc2hvdydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIERST1BET1dOICAgICAgICAgICAgICA6ICcuZHJvcGRvd24nLFxuICAgIE5BVl9MSVNUX0dST1VQICAgICAgICA6ICcubmF2LCAubGlzdC1ncm91cCcsXG4gICAgQUNUSVZFICAgICAgICAgICAgICAgIDogJy5hY3RpdmUnLFxuICAgIEFDVElWRV9VTCAgICAgICAgICAgICA6ICc+IGxpID4gLmFjdGl2ZScsXG4gICAgREFUQV9UT0dHTEUgICAgICAgICAgIDogJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXSwgW2RhdGEtdG9nZ2xlPVwicGlsbFwiXSwgW2RhdGEtdG9nZ2xlPVwibGlzdFwiXScsXG4gICAgRFJPUERPV05fVE9HR0xFICAgICAgIDogJy5kcm9wZG93bi10b2dnbGUnLFxuICAgIERST1BET1dOX0FDVElWRV9DSElMRCA6ICc+IC5kcm9wZG93bi1tZW51IC5hY3RpdmUnXG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIFRhYiB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgc2hvdygpIHtcbiAgICAgIGlmICh0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUgJiZcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmXG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSB8fFxuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHRhcmdldFxuICAgICAgbGV0IHByZXZpb3VzXG4gICAgICBjb25zdCBsaXN0RWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZfTElTVF9HUk9VUClbMF1cbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgIGlmIChsaXN0RWxlbWVudCkge1xuICAgICAgICBjb25zdCBpdGVtU2VsZWN0b3IgPSBsaXN0RWxlbWVudC5ub2RlTmFtZSA9PT0gJ1VMJyA/IFNlbGVjdG9yLkFDVElWRV9VTCA6IFNlbGVjdG9yLkFDVElWRVxuICAgICAgICBwcmV2aW91cyA9ICQubWFrZUFycmF5KCQobGlzdEVsZW1lbnQpLmZpbmQoaXRlbVNlbGVjdG9yKSlcbiAgICAgICAgcHJldmlvdXMgPSBwcmV2aW91c1twcmV2aW91cy5sZW5ndGggLSAxXVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgICAgfSlcblxuICAgICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXZpb3VzXG4gICAgICB9KVxuXG4gICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgJChwcmV2aW91cykudHJpZ2dlcihoaWRlRXZlbnQpXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHxcbiAgICAgICAgIGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FjdGl2YXRlKFxuICAgICAgICB0aGlzLl9lbGVtZW50LFxuICAgICAgICBsaXN0RWxlbWVudFxuICAgICAgKVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaGlkZGVuRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJRERFTiwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzaG93bkV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXZpb3VzXG4gICAgICAgIH0pXG5cbiAgICAgICAgJChwcmV2aW91cykudHJpZ2dlcihoaWRkZW5FdmVudClcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3duRXZlbnQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUodGFyZ2V0LCB0YXJnZXQucGFyZW50Tm9kZSwgY29tcGxldGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsXG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX2FjdGl2YXRlKGVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICAgIGxldCBhY3RpdmVFbGVtZW50c1xuICAgICAgaWYgKGNvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1VMJykge1xuICAgICAgICBhY3RpdmVFbGVtZW50cyA9ICQoY29udGFpbmVyKS5maW5kKFNlbGVjdG9yLkFDVElWRV9VTClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnRzID0gJChjb250YWluZXIpLmNoaWxkcmVuKFNlbGVjdG9yLkFDVElWRSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWN0aXZlID0gYWN0aXZlRWxlbWVudHNbMF1cbiAgICAgIGNvbnN0IGlzVHJhbnNpdGlvbmluZyA9IGNhbGxiYWNrICYmXG4gICAgICAgIChhY3RpdmUgJiYgJChhY3RpdmUpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSlcblxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB0aGlzLl90cmFuc2l0aW9uQ29tcGxldGUoXG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIGFjdGl2ZSxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgIClcblxuICAgICAgaWYgKGFjdGl2ZSAmJiBpc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudChhY3RpdmUpXG5cbiAgICAgICAgJChhY3RpdmUpXG4gICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcGxldGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIF90cmFuc2l0aW9uQ29tcGxldGUoZWxlbWVudCwgYWN0aXZlLCBjYWxsYmFjaykge1xuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAkKGFjdGl2ZSkucmVtb3ZlQ2xhc3MoYCR7Q2xhc3NOYW1lLlNIT1d9ICR7Q2xhc3NOYW1lLkFDVElWRX1gKVxuXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQ2hpbGQgPSAkKGFjdGl2ZS5wYXJlbnROb2RlKS5maW5kKFxuICAgICAgICAgIFNlbGVjdG9yLkRST1BET1dOX0FDVElWRV9DSElMRFxuICAgICAgICApWzBdXG5cbiAgICAgICAgaWYgKGRyb3Bkb3duQ2hpbGQpIHtcbiAgICAgICAgICAkKGRyb3Bkb3duQ2hpbGQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aXZlLmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAndGFiJykge1xuICAgICAgICAgIGFjdGl2ZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3RhYicpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBVdGlsLnJlZmxvdyhlbGVtZW50KVxuICAgICAgJChlbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSAmJlxuICAgICAgICAgICQoZWxlbWVudC5wYXJlbnROb2RlKS5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUERPV05fTUVOVSkpIHtcbiAgICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gJChlbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLkRST1BET1dOKVswXVxuICAgICAgICBpZiAoZHJvcGRvd25FbGVtZW50KSB7XG4gICAgICAgICAgY29uc3QgZHJvcGRvd25Ub2dnbGVMaXN0ID0gW10uc2xpY2UuY2FsbChkcm9wZG93bkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpKVxuICAgICAgICAgICQoZHJvcGRvd25Ub2dnbGVMaXN0KS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFRhYih0aGlzKVxuICAgICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgVGFiLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gICAgfSlcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IFRhYi5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBUYWJcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gVGFiLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBUYWJcbn0pKCQpXG5cbmV4cG9ydCBkZWZhdWx0IFRhYlxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEFsZXJ0IGZyb20gJy4vYWxlcnQnXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJ1xuaW1wb3J0IENhcm91c2VsIGZyb20gJy4vY2Fyb3VzZWwnXG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi9jb2xsYXBzZSdcbmltcG9ydCBEcm9wZG93biBmcm9tICcuL2Ryb3Bkb3duJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwnXG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL3BvcG92ZXInXG5pbXBvcnQgU2Nyb2xsc3B5IGZyb20gJy4vc2Nyb2xsc3B5J1xuaW1wb3J0IFRhYiBmcm9tICcuL3RhYidcbmltcG9ydCBUb29sdGlwIGZyb20gJy4vdG9vbHRpcCdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBpbmRleC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuKCgkKSA9PiB7XG4gIGlmICh0eXBlb2YgJCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5LiBqUXVlcnkgbXVzdCBiZSBpbmNsdWRlZCBiZWZvcmUgQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0LicpXG4gIH1cblxuICBjb25zdCB2ZXJzaW9uID0gJC5mbi5qcXVlcnkuc3BsaXQoJyAnKVswXS5zcGxpdCgnLicpXG4gIGNvbnN0IG1pbk1ham9yID0gMVxuICBjb25zdCBsdE1ham9yID0gMlxuICBjb25zdCBtaW5NaW5vciA9IDlcbiAgY29uc3QgbWluUGF0Y2ggPSAxXG4gIGNvbnN0IG1heE1ham9yID0gNFxuXG4gIGlmICh2ZXJzaW9uWzBdIDwgbHRNYWpvciAmJiB2ZXJzaW9uWzFdIDwgbWluTWlub3IgfHwgdmVyc2lvblswXSA9PT0gbWluTWFqb3IgJiYgdmVyc2lvblsxXSA9PT0gbWluTWlub3IgJiYgdmVyc2lvblsyXSA8IG1pblBhdGNoIHx8IHZlcnNpb25bMF0gPj0gbWF4TWFqb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBhdCBsZWFzdCBqUXVlcnkgdjEuOS4xIGJ1dCBsZXNzIHRoYW4gdjQuMC4wJylcbiAgfVxufSkoJClcblxuZXhwb3J0IHtcbiAgVXRpbCxcbiAgQWxlcnQsXG4gIEJ1dHRvbixcbiAgQ2Fyb3VzZWwsXG4gIENvbGxhcHNlLFxuICBEcm9wZG93bixcbiAgTW9kYWwsXG4gIFBvcG92ZXIsXG4gIFNjcm9sbHNweSxcbiAgVGFiLFxuICBUb29sdGlwXG59XG4iXSwibmFtZXMiOlsiVXRpbCIsIiQiLCJUUkFOU0lUSU9OX0VORCIsIk1BWF9VSUQiLCJNSUxMSVNFQ09ORFNfTVVMVElQTElFUiIsInRvVHlwZSIsIm9iaiIsInRvU3RyaW5nIiwiY2FsbCIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50IiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJldmVudCIsInRhcmdldCIsImlzIiwiaGFuZGxlT2JqIiwiaGFuZGxlciIsImFwcGx5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvbkVuZEVtdWxhdG9yIiwiZHVyYXRpb24iLCJjYWxsZWQiLCJvbmUiLCJzZXRUaW1lb3V0IiwidHJpZ2dlclRyYW5zaXRpb25FbmQiLCJzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCIsImZuIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJzcGVjaWFsIiwiZ2V0VUlEIiwicHJlZml4IiwiTWF0aCIsInJhbmRvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRTZWxlY3RvckZyb21FbGVtZW50IiwiZWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwicXVlcnlTZWxlY3RvciIsImVyciIsImdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiY3NzIiwiZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0Iiwic3BsaXQiLCJyZWZsb3ciLCJvZmZzZXRIZWlnaHQiLCJ0cmlnZ2VyIiwic3VwcG9ydHNUcmFuc2l0aW9uRW5kIiwiQm9vbGVhbiIsImlzRWxlbWVudCIsIm5vZGVUeXBlIiwidHlwZUNoZWNrQ29uZmlnIiwiY29tcG9uZW50TmFtZSIsImNvbmZpZyIsImNvbmZpZ1R5cGVzIiwicHJvcGVydHkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImV4cGVjdGVkVHlwZXMiLCJ2YWx1ZSIsInZhbHVlVHlwZSIsIlJlZ0V4cCIsInRlc3QiLCJFcnJvciIsInRvVXBwZXJDYXNlIiwiQWxlcnQiLCJOQU1FIiwiVkVSU0lPTiIsIkRBVEFfS0VZIiwiRVZFTlRfS0VZIiwiREFUQV9BUElfS0VZIiwiSlFVRVJZX05PX0NPTkZMSUNUIiwiU2VsZWN0b3IiLCJESVNNSVNTIiwiRXZlbnQiLCJDTE9TRSIsIkNMT1NFRCIsIkNMSUNLX0RBVEFfQVBJIiwiQ2xhc3NOYW1lIiwiQUxFUlQiLCJGQURFIiwiU0hPVyIsIl9lbGVtZW50IiwiY2xvc2UiLCJyb290RWxlbWVudCIsIl9nZXRSb290RWxlbWVudCIsImN1c3RvbUV2ZW50IiwiX3RyaWdnZXJDbG9zZUV2ZW50IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiX3JlbW92ZUVsZW1lbnQiLCJkaXNwb3NlIiwicmVtb3ZlRGF0YSIsInBhcmVudCIsImNsb3Nlc3QiLCJjbG9zZUV2ZW50IiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsIl9kZXN0cm95RWxlbWVudCIsImRldGFjaCIsInJlbW92ZSIsIl9qUXVlcnlJbnRlcmZhY2UiLCJlYWNoIiwiJGVsZW1lbnQiLCJkYXRhIiwiX2hhbmRsZURpc21pc3MiLCJhbGVydEluc3RhbmNlIiwicHJldmVudERlZmF1bHQiLCJvbiIsIkNvbnN0cnVjdG9yIiwibm9Db25mbGljdCIsIkJ1dHRvbiIsIkFDVElWRSIsIkJVVFRPTiIsIkZPQ1VTIiwiREFUQV9UT0dHTEVfQ0FSUk9UIiwiREFUQV9UT0dHTEUiLCJJTlBVVCIsIkZPQ1VTX0JMVVJfREFUQV9BUEkiLCJ0b2dnbGUiLCJ0cmlnZ2VyQ2hhbmdlRXZlbnQiLCJhZGRBcmlhUHJlc3NlZCIsImlucHV0IiwidHlwZSIsImNoZWNrZWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFjdGl2ZUVsZW1lbnQiLCJoYXNBdHRyaWJ1dGUiLCJmb2N1cyIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZUNsYXNzIiwiYnV0dG9uIiwiQ2Fyb3VzZWwiLCJBUlJPV19MRUZUX0tFWUNPREUiLCJBUlJPV19SSUdIVF9LRVlDT0RFIiwiVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCIsIkRlZmF1bHQiLCJpbnRlcnZhbCIsImtleWJvYXJkIiwic2xpZGUiLCJwYXVzZSIsIndyYXAiLCJEZWZhdWx0VHlwZSIsIkRpcmVjdGlvbiIsIk5FWFQiLCJQUkVWIiwiTEVGVCIsIlJJR0hUIiwiU0xJREUiLCJTTElEIiwiS0VZRE9XTiIsIk1PVVNFRU5URVIiLCJNT1VTRUxFQVZFIiwiVE9VQ0hFTkQiLCJMT0FEX0RBVEFfQVBJIiwiQ0FST1VTRUwiLCJJVEVNIiwiQUNUSVZFX0lURU0iLCJORVhUX1BSRVYiLCJJTkRJQ0FUT1JTIiwiREFUQV9TTElERSIsIkRBVEFfUklERSIsIl9pdGVtcyIsIl9pbnRlcnZhbCIsIl9hY3RpdmVFbGVtZW50IiwiX2lzUGF1c2VkIiwiX2lzU2xpZGluZyIsInRvdWNoVGltZW91dCIsIl9jb25maWciLCJfZ2V0Q29uZmlnIiwiX2luZGljYXRvcnNFbGVtZW50IiwiX2FkZEV2ZW50TGlzdGVuZXJzIiwibmV4dCIsIl9zbGlkZSIsIm5leHRXaGVuVmlzaWJsZSIsImhpZGRlbiIsInByZXYiLCJjeWNsZSIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInZpc2liaWxpdHlTdGF0ZSIsImJpbmQiLCJ0byIsImluZGV4IiwiYWN0aXZlSW5kZXgiLCJfZ2V0SXRlbUluZGV4IiwibGVuZ3RoIiwiZGlyZWN0aW9uIiwib2ZmIiwiX2tleWRvd24iLCJkb2N1bWVudEVsZW1lbnQiLCJjbGVhclRpbWVvdXQiLCJ0YWdOYW1lIiwid2hpY2giLCJwYXJlbnROb2RlIiwic2xpY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5kZXhPZiIsIl9nZXRJdGVtQnlEaXJlY3Rpb24iLCJpc05leHREaXJlY3Rpb24iLCJpc1ByZXZEaXJlY3Rpb24iLCJsYXN0SXRlbUluZGV4IiwiaXNHb2luZ1RvV3JhcCIsImRlbHRhIiwiaXRlbUluZGV4IiwiX3RyaWdnZXJTbGlkZUV2ZW50IiwicmVsYXRlZFRhcmdldCIsImV2ZW50RGlyZWN0aW9uTmFtZSIsInRhcmdldEluZGV4IiwiZnJvbUluZGV4Iiwic2xpZGVFdmVudCIsImZyb20iLCJfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudCIsImluZGljYXRvcnMiLCJuZXh0SW5kaWNhdG9yIiwiY2hpbGRyZW4iLCJhZGRDbGFzcyIsImFjdGl2ZUVsZW1lbnRJbmRleCIsIm5leHRFbGVtZW50IiwibmV4dEVsZW1lbnRJbmRleCIsImlzQ3ljbGluZyIsImRpcmVjdGlvbmFsQ2xhc3NOYW1lIiwib3JkZXJDbGFzc05hbWUiLCJzbGlkRXZlbnQiLCJhY3Rpb24iLCJUeXBlRXJyb3IiLCJfZGF0YUFwaUNsaWNrSGFuZGxlciIsInNsaWRlSW5kZXgiLCJ3aW5kb3ciLCJjYXJvdXNlbHMiLCJpIiwibGVuIiwiJGNhcm91c2VsIiwiQ29sbGFwc2UiLCJTSE9XTiIsIkhJREUiLCJISURERU4iLCJDT0xMQVBTRSIsIkNPTExBUFNJTkciLCJDT0xMQVBTRUQiLCJEaW1lbnNpb24iLCJXSURUSCIsIkhFSUdIVCIsIkFDVElWRVMiLCJfaXNUcmFuc2l0aW9uaW5nIiwiX3RyaWdnZXJBcnJheSIsIm1ha2VBcnJheSIsImlkIiwidG9nZ2xlTGlzdCIsImVsZW0iLCJmaWx0ZXJFbGVtZW50IiwiZmlsdGVyIiwiZm91bmRFbGVtIiwiX3NlbGVjdG9yIiwicHVzaCIsIl9wYXJlbnQiLCJfZ2V0UGFyZW50IiwiX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsImhpZGUiLCJzaG93IiwiYWN0aXZlcyIsImFjdGl2ZXNEYXRhIiwibm90Iiwic3RhcnRFdmVudCIsImRpbWVuc2lvbiIsIl9nZXREaW1lbnNpb24iLCJzdHlsZSIsImF0dHIiLCJzZXRUcmFuc2l0aW9uaW5nIiwiY29tcGxldGUiLCJjYXBpdGFsaXplZERpbWVuc2lvbiIsInNjcm9sbFNpemUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0cmlnZ2VyQXJyYXlMZW5ndGgiLCIkZWxlbSIsImlzVHJhbnNpdGlvbmluZyIsImhhc1dpZHRoIiwianF1ZXJ5IiwiX2dldFRhcmdldEZyb21FbGVtZW50IiwidHJpZ2dlckFycmF5IiwiaXNPcGVuIiwiJHRoaXMiLCJjdXJyZW50VGFyZ2V0IiwiJHRyaWdnZXIiLCJzZWxlY3RvcnMiLCIkdGFyZ2V0IiwiRHJvcGRvd24iLCJFU0NBUEVfS0VZQ09ERSIsIlNQQUNFX0tFWUNPREUiLCJUQUJfS0VZQ09ERSIsIkFSUk9XX1VQX0tFWUNPREUiLCJBUlJPV19ET1dOX0tFWUNPREUiLCJSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0giLCJSRUdFWFBfS0VZRE9XTiIsIkNMSUNLIiwiS0VZRE9XTl9EQVRBX0FQSSIsIktFWVVQX0RBVEFfQVBJIiwiRElTQUJMRUQiLCJEUk9QVVAiLCJEUk9QUklHSFQiLCJEUk9QTEVGVCIsIk1FTlVSSUdIVCIsIk1FTlVMRUZUIiwiUE9TSVRJT05fU1RBVElDIiwiRk9STV9DSElMRCIsIk1FTlUiLCJOQVZCQVJfTkFWIiwiVklTSUJMRV9JVEVNUyIsIkF0dGFjaG1lbnRNYXAiLCJUT1AiLCJUT1BFTkQiLCJCT1RUT00iLCJCT1RUT01FTkQiLCJSSUdIVEVORCIsIkxFRlRFTkQiLCJvZmZzZXQiLCJmbGlwIiwiYm91bmRhcnkiLCJyZWZlcmVuY2UiLCJkaXNwbGF5IiwiX3BvcHBlciIsIl9tZW51IiwiX2dldE1lbnVFbGVtZW50IiwiX2luTmF2YmFyIiwiX2RldGVjdE5hdmJhciIsImRpc2FibGVkIiwiX2dldFBhcmVudEZyb21FbGVtZW50IiwiaXNBY3RpdmUiLCJfY2xlYXJNZW51cyIsInNob3dFdmVudCIsIlBvcHBlciIsInJlZmVyZW5jZUVsZW1lbnQiLCJfZ2V0UG9wcGVyQ29uZmlnIiwiYm9keSIsIm5vb3AiLCJkZXN0cm95IiwidXBkYXRlIiwic2NoZWR1bGVVcGRhdGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjb25zdHJ1Y3RvciIsIl9nZXRQbGFjZW1lbnQiLCIkcGFyZW50RHJvcGRvd24iLCJwbGFjZW1lbnQiLCJvZmZzZXRDb25mIiwib2Zmc2V0cyIsInBvcHBlckNvbmZpZyIsIm1vZGlmaWVycyIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZGFyaWVzRWxlbWVudCIsImFwcGx5U3R5bGUiLCJ0b2dnbGVzIiwiY29udGV4dCIsImNsaWNrRXZlbnQiLCJkcm9wZG93bk1lbnUiLCJoaWRlRXZlbnQiLCJfZGF0YUFwaUtleWRvd25IYW5kbGVyIiwiaXRlbXMiLCJlIiwiTW9kYWwiLCJiYWNrZHJvcCIsIkZPQ1VTSU4iLCJSRVNJWkUiLCJDTElDS19ESVNNSVNTIiwiS0VZRE9XTl9ESVNNSVNTIiwiTU9VU0VVUF9ESVNNSVNTIiwiTU9VU0VET1dOX0RJU01JU1MiLCJTQ1JPTExCQVJfTUVBU1VSRVIiLCJCQUNLRFJPUCIsIk9QRU4iLCJESUFMT0ciLCJEQVRBX0RJU01JU1MiLCJGSVhFRF9DT05URU5UIiwiU1RJQ0tZX0NPTlRFTlQiLCJfZGlhbG9nIiwiX2JhY2tkcm9wIiwiX2lzU2hvd24iLCJfaXNCb2R5T3ZlcmZsb3dpbmciLCJfaWdub3JlQmFja2Ryb3BDbGljayIsIl9zY3JvbGxiYXJXaWR0aCIsIl9jaGVja1Njcm9sbGJhciIsIl9zZXRTY3JvbGxiYXIiLCJfYWRqdXN0RGlhbG9nIiwiX3NldEVzY2FwZUV2ZW50IiwiX3NldFJlc2l6ZUV2ZW50IiwiX3Nob3dCYWNrZHJvcCIsIl9zaG93RWxlbWVudCIsInRyYW5zaXRpb24iLCJfaGlkZU1vZGFsIiwiaGFuZGxlVXBkYXRlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsImFwcGVuZENoaWxkIiwicmVtb3ZlQXR0cmlidXRlIiwic2Nyb2xsVG9wIiwiX2VuZm9yY2VGb2N1cyIsInNob3duRXZlbnQiLCJ0cmFuc2l0aW9uQ29tcGxldGUiLCJoYXMiLCJfcmVzZXRBZGp1c3RtZW50cyIsIl9yZXNldFNjcm9sbGJhciIsIl9yZW1vdmVCYWNrZHJvcCIsImNhbGxiYWNrIiwiYW5pbWF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhZGQiLCJhcHBlbmRUbyIsImJhY2tkcm9wVHJhbnNpdGlvbkR1cmF0aW9uIiwiY2FsbGJhY2tSZW1vdmUiLCJpc01vZGFsT3ZlcmZsb3dpbmciLCJzY3JvbGxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInJlY3QiLCJsZWZ0IiwicmlnaHQiLCJpbm5lcldpZHRoIiwiX2dldFNjcm9sbGJhcldpZHRoIiwiZml4ZWRDb250ZW50Iiwic3RpY2t5Q29udGVudCIsImFjdHVhbFBhZGRpbmciLCJjYWxjdWxhdGVkUGFkZGluZyIsImFjdHVhbE1hcmdpbiIsIm1hcmdpblJpZ2h0IiwiY2FsY3VsYXRlZE1hcmdpbiIsInBhZGRpbmciLCJlbGVtZW50cyIsIm1hcmdpbiIsInNjcm9sbERpdiIsInNjcm9sbGJhcldpZHRoIiwid2lkdGgiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwiVG9vbHRpcCIsIkNMQVNTX1BSRUZJWCIsIkJTQ0xTX1BSRUZJWF9SRUdFWCIsImFuaW1hdGlvbiIsInRlbXBsYXRlIiwidGl0bGUiLCJkZWxheSIsImh0bWwiLCJjb250YWluZXIiLCJmYWxsYmFja1BsYWNlbWVudCIsIkFVVE8iLCJIb3ZlclN0YXRlIiwiT1VUIiwiSU5TRVJURUQiLCJGT0NVU09VVCIsIlRPT0xUSVAiLCJUT09MVElQX0lOTkVSIiwiQVJST1ciLCJUcmlnZ2VyIiwiSE9WRVIiLCJNQU5VQUwiLCJfaXNFbmFibGVkIiwiX3RpbWVvdXQiLCJfaG92ZXJTdGF0ZSIsIl9hY3RpdmVUcmlnZ2VyIiwidGlwIiwiX3NldExpc3RlbmVycyIsImVuYWJsZSIsImRpc2FibGUiLCJ0b2dnbGVFbmFibGVkIiwiZGF0YUtleSIsIl9nZXREZWxlZ2F0ZUNvbmZpZyIsImNsaWNrIiwiX2lzV2l0aEFjdGl2ZVRyaWdnZXIiLCJfZW50ZXIiLCJfbGVhdmUiLCJnZXRUaXBFbGVtZW50IiwiaXNXaXRoQ29udGVudCIsImlzSW5UaGVEb20iLCJvd25lckRvY3VtZW50IiwidGlwSWQiLCJzZXRDb250ZW50IiwiYXR0YWNobWVudCIsIl9nZXRBdHRhY2htZW50IiwiYWRkQXR0YWNobWVudENsYXNzIiwiZmluZCIsImJlaGF2aW9yIiwiYXJyb3ciLCJvbkNyZWF0ZSIsIm9yaWdpbmFsUGxhY2VtZW50IiwiX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZSIsIm9uVXBkYXRlIiwiX2ZpeFRyYW5zaXRpb24iLCJwcmV2SG92ZXJTdGF0ZSIsIl9jbGVhblRpcENsYXNzIiwiZ2V0VGl0bGUiLCJzZXRFbGVtZW50Q29udGVudCIsImNvbnRlbnQiLCJlbXB0eSIsImFwcGVuZCIsInRleHQiLCJ0cmlnZ2VycyIsImZvckVhY2giLCJldmVudEluIiwiZXZlbnRPdXQiLCJfZml4VGl0bGUiLCJ0aXRsZVR5cGUiLCJrZXkiLCIkdGlwIiwidGFiQ2xhc3MiLCJqb2luIiwicG9wcGVyRGF0YSIsInBvcHBlckluc3RhbmNlIiwiaW5zdGFuY2UiLCJwb3BwZXIiLCJpbml0Q29uZmlnQW5pbWF0aW9uIiwiUG9wb3ZlciIsIlRJVExFIiwiQ09OVEVOVCIsIl9nZXRDb250ZW50IiwiU2Nyb2xsU3B5IiwibWV0aG9kIiwiQUNUSVZBVEUiLCJTQ1JPTEwiLCJEUk9QRE9XTl9JVEVNIiwiRFJPUERPV05fTUVOVSIsIkRBVEFfU1BZIiwiTkFWX0xJU1RfR1JPVVAiLCJOQVZfTElOS1MiLCJOQVZfSVRFTVMiLCJMSVNUX0lURU1TIiwiRFJPUERPV04iLCJEUk9QRE9XTl9JVEVNUyIsIkRST1BET1dOX1RPR0dMRSIsIk9mZnNldE1ldGhvZCIsIk9GRlNFVCIsIlBPU0lUSU9OIiwiX3Njcm9sbEVsZW1lbnQiLCJfb2Zmc2V0cyIsIl90YXJnZXRzIiwiX2FjdGl2ZVRhcmdldCIsIl9zY3JvbGxIZWlnaHQiLCJfcHJvY2VzcyIsInJlZnJlc2giLCJhdXRvTWV0aG9kIiwib2Zmc2V0TWV0aG9kIiwib2Zmc2V0QmFzZSIsIl9nZXRTY3JvbGxUb3AiLCJfZ2V0U2Nyb2xsSGVpZ2h0IiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldFNlbGVjdG9yIiwidGFyZ2V0QkNSIiwiaGVpZ2h0IiwidG9wIiwiaXRlbSIsInNvcnQiLCJhIiwiYiIsInBhZ2VZT2Zmc2V0IiwibWF4IiwiX2dldE9mZnNldEhlaWdodCIsImlubmVySGVpZ2h0IiwibWF4U2Nyb2xsIiwiX2FjdGl2YXRlIiwiX2NsZWFyIiwib2Zmc2V0TGVuZ3RoIiwiaXNBY3RpdmVUYXJnZXQiLCJxdWVyaWVzIiwiJGxpbmsiLCJwYXJlbnRzIiwibm9kZXMiLCJzY3JvbGxTcHlzIiwic2Nyb2xsU3B5c0xlbmd0aCIsIiRzcHkiLCJUYWIiLCJBQ1RJVkVfVUwiLCJEUk9QRE9XTl9BQ1RJVkVfQ0hJTEQiLCJwcmV2aW91cyIsImxpc3RFbGVtZW50IiwiaXRlbVNlbGVjdG9yIiwibm9kZU5hbWUiLCJoaWRkZW5FdmVudCIsImFjdGl2ZUVsZW1lbnRzIiwiYWN0aXZlIiwiX3RyYW5zaXRpb25Db21wbGV0ZSIsImRyb3Bkb3duQ2hpbGQiLCJkcm9wZG93bkVsZW1lbnQiLCJkcm9wZG93blRvZ2dsZUxpc3QiLCJ2ZXJzaW9uIiwibWluTWFqb3IiLCJsdE1ham9yIiwibWluTWlub3IiLCJtaW5QYXRjaCIsIm1heE1ham9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBRUE7Ozs7Ozs7RUFPQSxJQUFNQSxPQUFRLFVBQUNDLElBQUQsRUFBTztFQUNuQjs7Ozs7RUFNQSxNQUFNQyxpQkFBaUIsZUFBdkI7RUFDQSxNQUFNQyxVQUFVLE9BQWhCO0VBQ0EsTUFBTUMsMEJBQTBCLElBQWhDLENBVG1COztFQVluQixXQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQjtFQUNuQixXQUFPLEdBQUdDLFFBQUgsQ0FBWUMsSUFBWixDQUFpQkYsR0FBakIsRUFBc0JHLEtBQXRCLENBQTRCLGFBQTVCLEVBQTJDLENBQTNDLEVBQThDQyxXQUE5QyxFQUFQO0VBQ0Q7O0VBRUQsV0FBU0MsNEJBQVQsR0FBd0M7RUFDdEMsV0FBTztFQUNMQyxnQkFBVVYsY0FETDtFQUVMVyxvQkFBY1gsY0FGVDtFQUdMWSxZQUhLLGtCQUdFQyxLQUhGLEVBR1M7RUFDWixZQUFJZCxLQUFFYyxNQUFNQyxNQUFSLEVBQWdCQyxFQUFoQixDQUFtQixJQUFuQixDQUFKLEVBQThCO0VBQzVCLGlCQUFPRixNQUFNRyxTQUFOLENBQWdCQyxPQUFoQixDQUF3QkMsS0FBeEIsQ0FBOEIsSUFBOUIsRUFBb0NDLFNBQXBDLENBQVAsQ0FENEI7RUFFN0I7O0VBQ0QsZUFBT0MsU0FBUCxDQUpZO0VBS2I7RUFSSSxLQUFQO0VBVUQ7O0VBRUQsV0FBU0MscUJBQVQsQ0FBK0JDLFFB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
