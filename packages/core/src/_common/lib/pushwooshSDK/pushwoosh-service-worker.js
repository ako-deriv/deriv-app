!(function(e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = (t[r] = { i: r, l: !1, exports: {} });
        return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = e),
        (n.c = t),
        (n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: r });
        }),
        (n.r = function(e) {
            Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        (n.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default;
                      }
                    : function() {
                          return e;
                      };
            return n.d(t, 'a', t), t;
        }),
        (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ''),
        n((n.s = 18));
})([
    function(e, t, n) {
        'use strict';
        var r =
                (this && this.__assign) ||
                Object.assign ||
                function(e) {
                    for (var t, n = 1, r = arguments.length; r > n; n++)
                        for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                },
            o =
                (this && this.__rest) ||
                function(e, t) {
                    var n = {};
                    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
                    if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                        var o = 0;
                        for (r = Object.getOwnPropertySymbols(e); r.length > o; o++)
                            0 > t.indexOf(r[o]) && (n[r[o]] = e[r[o]]);
                    }
                    return n;
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var i = n(2),
            a = n(1);
        function s() {
            return Function('return this')();
        }
        function u() {
            return !!s().safari && navigator.userAgent.indexOf('Safari') > -1;
        }
        function c() {
            return navigator.serviceWorker && 'PushManager' in window && 'Notification' in window;
        }
        function l() {
            return (u() && 'PC' === h()) || c();
        }
        function f() {
            return u()
                ? a.BROWSER_TYPE_SAFARI
                : ~navigator.userAgent.toLowerCase().indexOf('firefox')
                ? a.BROWSER_TYPE_FF
                : a.BROWSER_TYPE_CHROME;
        }
        function h() {
            var e = navigator.userAgent;
            return e.match(/Android/i) ||
                e.match(/webOS/i) ||
                e.match(/iPhone/i) ||
                e.match(/iPad/i) ||
                e.match(/iPod/i) ||
                e.match(/BlackBerry/i) ||
                e.match(/Windows Phone/i)
                ? 'Phone'
                : 'PC';
        }
        function p(e) {
            for (var t = '', n = 0; 32 > n; n++) {
                var r = e.length - n - 1,
                    o = 0;
                0 > r || (o = e.charCodeAt(r)), (t += '0123456789abcdef'.substr(o % 16, 1));
            }
            return t;
        }
        function d() {
            return localStorage.getItem(a.KEY_FAKE_PUSH_TOKEN);
        }
        function _() {
            var e = (function(e) {
                e = e || 32;
                for (
                    var t = '', n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', r = 0;
                    e > r;
                    r++
                )
                    t += n.charAt(Math.floor(62 * Math.random()));
                return t;
            })();
            return localStorage.setItem(a.KEY_FAKE_PUSH_TOKEN, e), e;
        }
        function E(e, t) {
            var n = e && e.getKey && e.getKey(t);
            return n ? btoa(String.fromCharCode.apply(String, new Uint8Array(n))) : '';
        }
        function g() {
            return 'Promise' in s();
        }
        (t.getGlobal = s),
            (t.getVersion = function() {
                return '3.2.15';
            }),
            (t.isSafariBrowser = u),
            (t.isOperaBrowser = function() {
                return -1 !== navigator.userAgent.indexOf('Opera') || -1 !== navigator.userAgent.indexOf('OPR');
            }),
            (t.canUseServiceWorkers = c),
            (t.isSupportSDK = l),
            (t.getBrowserType = f),
            (t.getBrowserVersion = function() {
                var e = navigator.userAgent,
                    t = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
                    n = null;
                return /trident/i.test(t[1])
                    ? 'IE ' + ((n = /\brv[ :]+(\d+)/g.exec(e) || [])[1] || '')
                    : 'Chrome' === t[1] && null !== (n = e.match(/\bOPR\/(\d+)/))
                    ? 'Opera ' + n[1]
                    : ((t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, '-?']),
                      null !== (n = e.match(/version\/([.\d]+)/i)) && t.splice(1, 1, n[1]),
                      t.join(' '));
            }),
            (t.urlB64ToUint8Array = function(e) {
                for (
                    var t = (e + '='.repeat((4 - (e.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/'),
                        n = window.atob(t),
                        r = new Uint8Array(n.length),
                        o = 0;
                    n.length > o;
                    ++o
                )
                    r[o] = n.charCodeAt(o);
                return r;
            }),
            (t.getDeviceName = h),
            (t.createUUID = p),
            (t.generateHwid = function(e, t) {
                return e + '_' + p((t = d() || t || _()));
            }),
            (t.getFakePushToken = d),
            (t.generateFakePushToken = _),
            (t.getPushToken = function(e) {
                return e
                    ? e.subscriptionId
                        ? e.subscriptionId
                        : 12 === f()
                        ? e.endpoint
                        : e.endpoint.split('/').pop() || ''
                    : '';
            }),
            (t.getFcmKey = function(e, t) {
                return e
                    ? new Promise(function(e) {
                          i.keyValue
                              .get(a.KEY_FCM_SUBSCRIPTION)
                              .then(function(n) {
                                  e((n && n[t]) || '');
                              })
                              .catch(function() {
                                  e('');
                              });
                      })
                    : Promise.resolve('');
            }),
            (t.getAuthToken = function(e) {
                return E(e, 'auth');
            }),
            (t.getPublicKey = function(e) {
                return E(e, 'p256dh');
            }),
            (t.getPushwooshUrl = function(e, t) {
                var n = 'cp';
                u() || !e || ~e.indexOf('.') || (n = e + '.api');
                var r = 'https://' + (t || n + '.pushwoosh.com') + '/json/1.3/';
                return new Promise(function(e) {
                    i.keyValue
                        .get(a.KEY_API_BASE_URL)
                        .then(function(t) {
                            void 0 === t && (t = null), e(t || r);
                        })
                        .catch(function() {
                            e(r);
                        });
                });
            }),
            (t.patchConsole = function() {
                for (
                    var e,
                        t = function() {},
                        n = [
                            'assert',
                            'clear',
                            'count',
                            'debug',
                            'dir',
                            'dirxml',
                            'error',
                            'exception',
                            'group',
                            'groupCollapsed',
                            'groupEnd',
                            'info',
                            'log',
                            'markTimeline',
                            'profile',
                            'profileEnd',
                            'table',
                            'time',
                            'timeEnd',
                            'timeStamp',
                            'trace',
                            'warn',
                        ],
                        r = n.length,
                        o = s(),
                        i = (o.console = o.console || {});
                    r--;

                )
                    i[(e = n[r])] || (i[e] = t);
            }),
            (t.patchPromise = function() {
                var e = s();
                !g() &&
                    l() &&
                    (e.Promise = function() {
                        return { then: function() {}, catch: function() {} };
                    });
            }),
            (t.canUsePromise = g),
            (t.clearLocationHash = function() {
                'history' in s() && history.pushState ? history.pushState(null, '', '#') : (location.hash = '#');
            }),
            (t.prepareDuration = function(e) {
                return isNaN(e) ? 20 : Math.min(60, 0 > (e = Math.round(e)) ? 20 : e);
            }),
            (t.validateParams = function(e) {
                var t = o(e, []);
                return !t.userId || ('user_id' !== t.userId && 0 != !!t.userId) || delete t.userId, t;
            }),
            (t.sendInternalPostEvent = function(e) {
                i.keyValue.get(a.KEY_INTERNAL_EVENTS).then(function(t) {
                    void 0 === t && (t = {}), 0 === Object.keys(t).length && i.keyValue.set(a.KEY_INTERNAL_EVENTS, {});
                    var n,
                        o = new Date().setHours(0, 0, 0, 0),
                        s = t[e.event];
                    if (!s || o > s) {
                        i.keyValue.extend(a.KEY_INTERNAL_EVENTS, (((n = {})[e.event] = o), n));
                        var u = new XMLHttpRequest(),
                            c = r({ application: 'DD275-06947' }, e);
                        u.open('POST', 'https://cp.pushwoosh.com/json/1.3/postEvent', !0),
                            u.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8'),
                            u.send(JSON.stringify({ request: c }));
                    }
                });
            });
    },
    function(e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.DEFAULT_SERVICE_WORKER_URL = 'pushwoosh-service-worker.js'),
            (t.PERIOD_SEND_APP_OPEN = 36e5),
            (t.PERIOD_GOAL_EVENT = 864e5),
            (t.DEFAULT_NOTIFICATION_TITLE = 'Pushwoosh notification'),
            (t.DEFAULT_NOTIFICATION_IMAGE = 'https://cp.pushwoosh.com/img/logo-medium.png'),
            (t.DEFAULT_NOTIFICATION_URL = '/'),
            (t.KEY_API_PARAMS = 'API_PARAMS'),
            (t.KEY_INIT_PARAMS = 'INIT_PARAMS'),
            (t.KEY_SDK_VERSION = 'SDK_VERSION'),
            (t.KEY_WORKER_VERSION = 'WORKER_VERSION'),
            (t.KEY_LAST_SENT_APP_OPEN = 'LAST_SENT_APP_OPEN'),
            (t.KEY_LAST_OPEN_MESSAGE = 'LAST_OPEN_MESSAGE'),
            (t.KEY_API_BASE_URL = 'API_BASE_URL'),
            (t.KEY_SHOW_SUBSCRIBE_WIDGET = 'WIDGET_SHOWED'),
            (t.KEY_CLICK_SUBSCRIBE_WIDGET = 'WIDGET_CLICKED'),
            (t.KEY_DELAYED_EVENT = 'DELAYED_EVENT'),
            (t.KEY_COMMUNICATION_ENABLED = 'COMMUNICATION_ENABLED'),
            (t.KEY_DEVICE_DATA_REMOVED = 'DEVICE_DATA_REMOVED'),
            (t.KEY_INTERNAL_EVENTS = 'INTERNAL_EVENTS'),
            (t.KEY_FAKE_PUSH_TOKEN = 'fakePushToken'),
            (t.KEY_DEVICE_REGISTRATION_STATUS = 'deviceRegistrationStatus'),
            (t.KEY_SAFARI_PREVIOUS_PERMISSION = 'safariPreviousPermission'),
            (t.MANUAL_SET_LOGGER_LEVEL = 'PW_SET_LOGGER_LEVEL'),
            (t.DEVICE_REGISTRATION_STATUS_REGISTERED = 'registered'),
            (t.DEVICE_REGISTRATION_STATUS_UNREGISTERED = 'unregistered'),
            (t.KEY_SENDER_ID = 'GCM_SENDER_ID'),
            (t.KEY_FCM_SUBSCRIPTION = 'FCM_SUBSCRIPTION'),
            (t.PERMISSION_DENIED = 'denied'),
            (t.PERMISSION_GRANTED = 'granted'),
            (t.PERMISSION_PROMPT = 'default'),
            (t.BROWSER_TYPE_SAFARI = 10),
            (t.BROWSER_TYPE_CHROME = 11),
            (t.BROWSER_TYPE_FF = 12),
            (t.EVENT_ON_READY = 'onReady'),
            (t.EVENT_ON_SUBSCRIBE = 'onSubscribe'),
            (t.EVENT_ON_UNSUBSCRIBE = 'onUnsubscribe'),
            (t.EVENT_ON_REGISTER = 'onRegister'),
            (t.EVENT_ON_PERMISSION_PROMPT = 'onPermissionPrompt'),
            (t.EVENT_ON_PERMISSION_DENIED = 'onPermissionDenied'),
            (t.EVENT_ON_PERMISSION_GRANTED = 'onPermissionGranted'),
            (t.EVENT_ON_SW_INIT_ERROR = 'onSWInitError'),
            (t.EVENT_ON_PUSH_DELIVERY = 'onPushDelivery'),
            (t.EVENT_ON_NOTIFICATION_CLICK = 'onNotificationClick'),
            (t.EVENT_ON_NOTIFICATION_CLOSE = 'onNotificationClose'),
            (t.EVENT_ON_CHANGE_COMMUNICATION_ENABLED = 'onChangeCommunicationEnabled'),
            (t.EVENT_SHOW_SUBSCRIBE_BUTTON = 'showSubscribeButton'),
            (t.EVENT_CLICK_SUBSCRIBE_BUTTON = 'clickSubscribeButton'),
            (t.EVENT_GDPR_CONSENT = 'GDPRConsent'),
            (t.EVENT_GDPR_DELETE = 'GDPRDelete');
    },
    function(e, t, n) {
        'use strict';
        var r,
            o =
                (this && this.__extends) ||
                ((r =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function(e, t) {
                            e.__proto__ = t;
                        }) ||
                    function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                    }),
                function(e, t) {
                    function n() {
                        this.constructor = e;
                    }
                    r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                }),
            i =
                (this && this.__assign) ||
                Object.assign ||
                function(e) {
                    for (var t, n = 1, r = arguments.length; r > n; n++)
                        for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                },
            a =
                (this && this.__awaiter) ||
                function(e, t, n, r) {
                    return new (n || (n = Promise))(function(o, i) {
                        function a(e) {
                            try {
                                u(r.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            try {
                                u(r.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function u(e) {
                            e.done
                                ? o(e.value)
                                : new n(function(t) {
                                      t(e.value);
                                  }).then(a, s);
                        }
                        u((r = r.apply(e, t || [])).next());
                    });
                },
            s =
                (this && this.__generator) ||
                function(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        a = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1];
                            },
                            trys: [],
                            ops: [],
                        };
                    return (
                        (i = { next: s(0), throw: s(1), return: s(2) }),
                        'function' == typeof Symbol &&
                            (i[Symbol.iterator] = function() {
                                return this;
                            }),
                        i
                    );
                    function s(i) {
                        return function(s) {
                            return (function(i) {
                                if (n) throw new TypeError('Generator is already executing.');
                                for (; a; )
                                    try {
                                        if (
                                            ((n = 1),
                                            r &&
                                                (o = r[2 & i[0] ? 'return' : i[0] ? 'throw' : 'next']) &&
                                                !(o = o.call(r, i[1])).done)
                                        )
                                            return o;
                                        switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return a.label++, { value: i[1], done: !1 };
                                            case 5:
                                                a.label++, (r = i[1]), (i = [0]);
                                                continue;
                                            case 7:
                                                (i = a.ops.pop()), a.trys.pop();
                                                continue;
                                            default:
                                                if (
                                                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                                                    (6 === i[0] || 2 === i[0])
                                                ) {
                                                    a = 0;
                                                    continue;
                                                }
                                                if (3 === i[0] && (!o || (i[1] > o[0] && o[3] > i[1]))) {
                                                    a.label = i[1];
                                                    break;
                                                }
                                                if (6 === i[0] && o[1] > a.label) {
                                                    (a.label = o[1]), (o = i);
                                                    break;
                                                }
                                                if (o && o[2] > a.label) {
                                                    (a.label = o[2]), a.ops.push(i);
                                                    break;
                                                }
                                                o[2] && a.ops.pop(), a.trys.pop();
                                                continue;
                                        }
                                        i = t.call(e, a);
                                    } catch (e) {
                                        (i = [6, e]), (r = 0);
                                    } finally {
                                        n = o = 0;
                                    }
                                if (5 & i[0]) throw i[1];
                                return { value: i[0] ? i[1] : void 0, done: !0 };
                            })([i, s]);
                        };
                    }
                },
            u =
                (this && this.__rest) ||
                function(e, t) {
                    var n = {};
                    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
                    if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                        var o = 0;
                        for (r = Object.getOwnPropertySymbols(e); r.length > o; o++)
                            0 > t.indexOf(r[o]) && (n[r[o]] = e[r[o]]);
                    }
                    return n;
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var c,
            l = 'keyValue',
            f = 'logs',
            h = 'messages';
        function p(e) {
            console.info('onversionchange', e);
        }
        function d(e) {
            return (c ||
                (c = new Promise(function(e, t) {
                    var n = indexedDB.open('PUSHWOOSH_SDK_STORE', 6);
                    (n.onsuccess = function(t) {
                        var n = t.target.result;
                        (n.onversionchange = p), e(n);
                    }),
                        (n.onerror = function() {
                            return t(n.error);
                        }),
                        (n.onupgradeneeded = function(e) {
                            var t = e.target.result;
                            (t.onversionchange = p),
                                t.objectStoreNames.contains(l) || t.createObjectStore(l, { keyPath: 'key' });
                            var n = { keyPath: 'id', autoIncrement: !0 },
                                r = { unique: !1 };
                            if (!t.objectStoreNames.contains(f)) {
                                var o = t.createObjectStore(f, n);
                                o.createIndex('environment', 'environment', r),
                                    o.createIndex('date', 'date', r),
                                    o.createIndex('type', 'type', r);
                            }
                            t.objectStoreNames.contains(h) || t.createObjectStore(h, n).createIndex('date', 'date', r);
                        });
                })),
            c).then(function(t) {
                return new Promise(function(n, r) {
                    return e(t, n, r);
                });
            });
        }
        var _ = (function() {
            function e() {}
            return (
                (e.prototype._add = function(e) {
                    var t = this;
                    return d(function(n, r, o) {
                        var i = n
                            .transaction([t.name], 'readwrite')
                            .objectStore(t.name)
                            .add(e);
                        (i.onsuccess = function() {
                            r(e);
                        }),
                            (i.onerror = function() {
                                o(i.error);
                            });
                    }).then(function(e) {
                        return t.getAll().then(function(n) {
                            if (Array.isArray(n)) {
                                var r = n
                                    .map(function(e) {
                                        return e.id;
                                    })
                                    .sort(function(e, t) {
                                        return e == t ? 0 : t > e ? 1 : -1;
                                    });
                                if (r.length > t.maxItems)
                                    return Promise.all(
                                        r.slice(t.maxItems).map(function(e) {
                                            return t.delete(e);
                                        })
                                    ).then(function() {
                                        return e;
                                    });
                            }
                            return e;
                        });
                    });
                }),
                (e.prototype.delete = function(e) {
                    var t = this;
                    return d(function(n, r, o) {
                        var i = n
                            .transaction([t.name], 'readwrite')
                            .objectStore(t.name)
                            .delete(e);
                        (i.onsuccess = function() {
                            r(i.result);
                        }),
                            (i.onerror = function() {
                                o(i.error);
                            });
                    });
                }),
                (e.prototype.getAll = function() {
                    var e = this;
                    return d(function(t, n, r) {
                        var o = [],
                            i = t
                                .transaction(e.name)
                                .objectStore(e.name)
                                .openCursor();
                        (i.onsuccess = function(e) {
                            var t = e.target.result;
                            t ? (o.push(t.value), t.continue()) : n(o);
                        }),
                            (i.onerror = function() {
                                r(i.error);
                            });
                    });
                }),
                e
            );
        })();
        t.LogBase = _;
        var E = (function(e) {
            function t() {
                var t = (null !== e && e.apply(this, arguments)) || this;
                return (
                    (t.name = f),
                    (t.maxItems = 100),
                    (t.environment = 'undefined' != typeof self && self.registration ? 'worker' : 'browser'),
                    t
                );
            }
            return (
                o(t, e),
                (t.prototype.add = function(e, t, n) {
                    var r = { type: e, environment: this.environment, message: '' + t, date: new Date() };
                    return t instanceof Error && (r.stack = t.stack), n && (r.additional = n), this._add(r);
                }),
                t
            );
        })(_);
        t.LogLog = E;
        var g,
            v = (function(e) {
                function t() {
                    var t = (null !== e && e.apply(this, arguments)) || this;
                    return (t.name = h), (t.maxItems = 25), t;
                }
                return (
                    o(t, e),
                    (t.prototype.add = function(e) {
                        return this._add(i({}, e, { date: new Date() }));
                    }),
                    t
                );
            })(_);
        (t.LogMessage = v),
            (t.keyValue =
                ((g = l),
                {
                    get: function(e) {
                        return d(function(t, n, r) {
                            var o = t
                                .transaction(g)
                                .objectStore(g)
                                .get(e);
                            (o.onsuccess = function() {
                                var e = o.result;
                                n(e && e.value);
                            }),
                                (o.onerror = function() {
                                    r(o.error);
                                });
                        });
                    },
                    getAll: function() {
                        return d(function(e, t, n) {
                            var r = {},
                                o = e
                                    .transaction(g)
                                    .objectStore(g)
                                    .openCursor();
                            (o.onsuccess = function(e) {
                                var n = e.target.result;
                                n ? ((r[n.key] = n.value.value), n.continue()) : t(r);
                            }),
                                (o.onerror = function() {
                                    n(o.error);
                                });
                        });
                    },
                    extend: function(e, t) {
                        return a(this, void 0, void 0, function() {
                            var n, r;
                            return s(this, function(o) {
                                switch (o.label) {
                                    case 0:
                                        return [4, this.get(e)];
                                    case 1:
                                        return (n = o.sent()), (r = u(t, [])), [4, this.set(e, i({}, n, r))];
                                    case 2:
                                        return o.sent(), [2];
                                }
                            });
                        });
                    },
                    set: function(e, t) {
                        return d(function(n, r, o) {
                            var i = n
                                .transaction([g], 'readwrite')
                                .objectStore(g)
                                .put({ key: e, value: t });
                            (i.onsuccess = function() {
                                r(e);
                            }),
                                (i.onerror = function() {
                                    o(i.error);
                                });
                        });
                    },
                })),
            (t.log = new E()),
            (t.message = new v());
    },
    function(e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r = n(2),
            o = { error: 1, info: 2, debug: 3 },
            i = 3;
        n(0).patchConsole();
        var a = {
            setLevel: function(e) {
                o[e] || (e = 'error'), (i = o[e]);
            },
            write: function(e, t, n) {
                return 'error' === e ? this.error(t) : this.info(t), r.log.add(e, t, n);
            },
        };
        Object.keys(o).forEach(function(e) {
            var t = o[e];
            a[e] = function() {
                for (var n = [], r = 0; arguments.length > r; r++) n[r] = arguments[r];
                t > i ||
                    (console.groupCollapsed(e),
                    console.info.apply(console, [''].concat(n)),
                    console.trace('trace'),
                    console.groupEnd());
            };
        }),
            (t.logAndThrowError = function(e) {
                var t = Error(e);
                throw (a.write('error', t, 'logAndThrowError'), t);
            }),
            (t.logAndRejectError = function(e, t) {
                var n = Error(e);
                a.write('error', n, 'logAndRejectError'), t(n);
            }),
            (t.default = a);
    },
    function(e, t, n) {
        'use strict';
        var r =
                (this && this.__assign) ||
                Object.assign ||
                function(e) {
                    for (var t, n = 1, r = arguments.length; r > n; n++)
                        for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                },
            o =
                (this && this.__awaiter) ||
                function(e, t, n, r) {
                    return new (n || (n = Promise))(function(o, i) {
                        function a(e) {
                            try {
                                u(r.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            try {
                                u(r.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function u(e) {
                            e.done
                                ? o(e.value)
                                : new n(function(t) {
                                      t(e.value);
                                  }).then(a, s);
                        }
                        u((r = r.apply(e, t || [])).next());
                    });
                },
            i =
                (this && this.__generator) ||
                function(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        a = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1];
                            },
                            trys: [],
                            ops: [],
                        };
                    return (
                        (i = { next: s(0), throw: s(1), return: s(2) }),
                        'function' == typeof Symbol &&
                            (i[Symbol.iterator] = function() {
                                return this;
                            }),
                        i
                    );
                    function s(i) {
                        return function(s) {
                            return (function(i) {
                                if (n) throw new TypeError('Generator is already executing.');
                                for (; a; )
                                    try {
                                        if (
                                            ((n = 1),
                                            r &&
                                                (o = r[2 & i[0] ? 'return' : i[0] ? 'throw' : 'next']) &&
                                                !(o = o.call(r, i[1])).done)
                                        )
                                            return o;
                                        switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return a.label++, { value: i[1], done: !1 };
                                            case 5:
                                                a.label++, (r = i[1]), (i = [0]);
                                                continue;
                                            case 7:
                                                (i = a.ops.pop()), a.trys.pop();
                                                continue;
                                            default:
                                                if (
                                                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                                                    (6 === i[0] || 2 === i[0])
                                                ) {
                                                    a = 0;
                                                    continue;
                                                }
                                                if (3 === i[0] && (!o || (i[1] > o[0] && o[3] > i[1]))) {
                                                    a.label = i[1];
                                                    break;
                                                }
                                                if (6 === i[0] && o[1] > a.label) {
                                                    (a.label = o[1]), (o = i);
                                                    break;
                                                }
                                                if (o && o[2] > a.label) {
                                                    (a.label = o[2]), a.ops.push(i);
                                                    break;
                                                }
                                                o[2] && a.ops.pop(), a.trys.pop();
                                                continue;
                                        }
                                        i = t.call(e, a);
                                    } catch (e) {
                                        (i = [6, e]), (r = 0);
                                    } finally {
                                        n = o = 0;
                                    }
                                if (5 & i[0]) throw i[1];
                                return { value: i[0] ? i[1] : void 0, done: !0 };
                            })([i, s]);
                        };
                    }
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var a = n(1),
            s = n(0),
            u = n(2),
            c = n(3),
            l = (function() {
                function e(e, t, n) {
                    (this.doPushwooshApiMethod = e),
                        (this.apiParams = t),
                        (this.lastOpenMessage = n),
                        (this.timezone = 60 * -new Date().getTimezoneOffset());
                }
                return (
                    Object.defineProperty(e.prototype, 'params', {
                        get: function() {
                            return (
                                console.error(
                                    'Property "Pushwoosh.api.params" will be deprecated in next minor version. Instead, use the async method "Pushwoosh.api.getParams()"'
                                ),
                                s.sendInternalPostEvent({
                                    hwid: this.apiParams.hwid,
                                    userId: this.apiParams.userId,
                                    device_type: this.apiParams.deviceType,
                                    event: 'API Params',
                                    attributes: {
                                        app_code: this.apiParams.applicationCode,
                                        device_type: this.apiParams.deviceType,
                                        url:
                                            this.apiParams.applicationCode +
                                            ' - ' +
                                            (location ? location.href : 'none'),
                                    },
                                }),
                                this.apiParams
                            );
                        },
                        enumerable: !0,
                        configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, 'isSafari', {
                        get: function() {
                            return s.isSafariBrowser();
                        },
                        enumerable: !0,
                        configurable: !0,
                    }),
                    (e.prototype.getParams = function() {
                        return o(this, void 0, void 0, function() {
                            var e;
                            return i(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return [4, u.keyValue.getAll()];
                                    case 1:
                                        return (e = t.sent()), [2, r({}, e[a.KEY_API_PARAMS], e[a.KEY_INIT_PARAMS])];
                                }
                            });
                        });
                    }),
                    (e.prototype.callAPI = function(e, t) {
                        return o(this, void 0, void 0, function() {
                            var n, o, l, f, h, p, d, _;
                            return i(this, function(i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, this.getParams()];
                                    case 1:
                                        return (n = i.sent()), [4, u.keyValue.get(a.KEY_DEVICE_DATA_REMOVED)];
                                    case 2:
                                        return i.sent()
                                            ? (c.default.error('Device data has been removed'), [2])
                                            : ((l = void 0 === (o = n.hwid) ? '' : o),
                                              (h = void 0 === (f = n.applicationCode) ? '' : f),
                                              (d = void 0 === (p = n.userId) ? '' : p),
                                              this.isSafari && !l
                                                  ? [2]
                                                  : ((_ = {
                                                        hwid: l,
                                                        application: h,
                                                        userId: (t && t.userId) || d || l,
                                                        device_type: n.deviceType,
                                                        v: s.getVersion(),
                                                    }),
                                                    [2, this.doPushwooshApiMethod(e, r({}, t, _))]));
                                }
                            });
                        });
                    }),
                    (e.prototype.registerDevice = function() {
                        return o(this, void 0, void 0, function() {
                            var e, t;
                            return i(this, function(n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, this.getParams()];
                                    case 1:
                                        if (!(e = n.sent()).pushToken || this.isSafari) return [2];
                                        n.label = 2;
                                    case 2:
                                        return (
                                            n.trys.push([2, 5, , 6]), [4, u.keyValue.get(a.KEY_COMMUNICATION_ENABLED)]
                                        );
                                    case 3:
                                        return 0 !== n.sent()
                                            ? [
                                                  4,
                                                  this.callAPI('registerDevice', {
                                                      push_token: e.pushToken,
                                                      public_key: e.publicKey,
                                                      auth_token: e.authToken,
                                                      fcm_token: e.fcmToken,
                                                      fcm_push_set: e.fcmPushSet,
                                                      language: e.tags.Language,
                                                      timezone: this.timezone,
                                                      device_model: e.tags['Device Model'],
                                                  }),
                                              ]
                                            : (c.default.error('Communication is disabled'), [2]);
                                    case 4:
                                        return (
                                            n.sent(),
                                            localStorage.setItem(
                                                a.KEY_DEVICE_REGISTRATION_STATUS,
                                                a.DEVICE_REGISTRATION_STATUS_REGISTERED
                                            ),
                                            [3, 6]
                                        );
                                    case 5:
                                        return (t = n.sent()), c.logAndThrowError(t), [3, 6];
                                    case 6:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (e.prototype.unregisterDevice = function() {
                        return o(this, void 0, void 0, function() {
                            var e;
                            return i(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        if (this.isSafari) return [2];
                                        t.label = 1;
                                    case 1:
                                        return t.trys.push([1, 3, , 4]), [4, this.callAPI('unregisterDevice')];
                                    case 2:
                                        return (
                                            t.sent(),
                                            localStorage.setItem(
                                                a.KEY_DEVICE_REGISTRATION_STATUS,
                                                a.DEVICE_REGISTRATION_STATUS_UNREGISTERED
                                            ),
                                            [3, 4]
                                        );
                                    case 3:
                                        return (e = t.sent()), c.logAndThrowError(e), [3, 4];
                                    case 4:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (e.prototype.registerUser = function(e) {
                        return o(this, void 0, void 0, function() {
                            var t, n;
                            return i(this, function(r) {
                                switch (r.label) {
                                    case 0:
                                        return [4, this.getParams()];
                                    case 1:
                                        return (t = r.sent()).userId || e
                                            ? [
                                                  4,
                                                  u.keyValue.extend(
                                                      a.KEY_INIT_PARAMS,
                                                      s.validateParams(
                                                          (n = { timezone: this.timezone, userId: e || t.userId })
                                                      )
                                                  ),
                                              ]
                                            : [2];
                                    case 2:
                                        return r.sent(), this.callAPI('registerUser', n), [2];
                                }
                            });
                        });
                    }),
                    (e.prototype.applicationOpen = function() {
                        return o(this, void 0, void 0, function() {
                            var e;
                            return i(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return [4, this.getParams()];
                                    case 1:
                                        return (
                                            (e = t.sent()),
                                            this.callAPI('applicationOpen', {
                                                push_token: e.pushToken,
                                                timezone: this.timezone,
                                            }),
                                            [2]
                                        );
                                }
                            });
                        });
                    }),
                    (e.prototype.setTags = function(e) {
                        return this.callAPI('setTags', { tags: e });
                    }),
                    (e.prototype.getTags = function() {
                        return this.callAPI('getTags');
                    }),
                    (e.prototype.pushStat = function(e) {
                        return this.callAPI('pushStat', { hash: e });
                    }),
                    (e.prototype.messageDeliveryEvent = function(e) {
                        return this.callAPI('messageDeliveryEvent', { hash: e });
                    }),
                    (e.prototype.postEvent = function(e, t) {
                        var n = this.lastOpenMessage,
                            o = new Date(),
                            i = o.getTime(),
                            a = Math.floor(i / 1e3),
                            s = a - (o.getTimezoneOffset() / 60) * 3600;
                        if (n.expiry > Date.now()) {
                            if (t.msgHash) return Promise.reject('attribute msgHash already defined');
                            t = r({}, t, { msgHash: n.messageHash });
                        }
                        return this.callAPI('postEvent', {
                            event: e,
                            attributes: t,
                            timestampUTC: a,
                            timestampCurrent: s,
                        });
                    }),
                    (e.prototype.triggerEvent = function(e, t) {
                        return o(this, void 0, void 0, function() {
                            var n;
                            return i(this, function(r) {
                                switch (r.label) {
                                    case 0:
                                        return t ? [4, u.keyValue.get(t)] : [3, 2];
                                    case 1:
                                        return (n = r.sent()), [3, 3];
                                    case 2:
                                        (n = null), (r.label = 3);
                                    case 3:
                                        return t && n ? [2] : [4, this.callAPI('triggerEvent', e)];
                                    case 4:
                                        return r.sent(), t && u.keyValue.set(t, 1), [2];
                                }
                            });
                        });
                    }),
                    e
                );
            })();
        t.default = l;
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(e, t, n) {
        'use strict';
        var r =
                (this && this.__assign) ||
                Object.assign ||
                function(e) {
                    for (var t, n = 1, r = arguments.length; r > n; n++)
                        for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                },
            o =
                (this && this.__awaiter) ||
                function(e, t, n, r) {
                    return new (n || (n = Promise))(function(o, i) {
                        function a(e) {
                            try {
                                u(r.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            try {
                                u(r.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function u(e) {
                            e.done
                                ? o(e.value)
                                : new n(function(t) {
                                      t(e.value);
                                  }).then(a, s);
                        }
                        u((r = r.apply(e, t || [])).next());
                    });
                },
            i =
                (this && this.__generator) ||
                function(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        a = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1];
                            },
                            trys: [],
                            ops: [],
                        };
                    return (
                        (i = { next: s(0), throw: s(1), return: s(2) }),
                        'function' == typeof Symbol &&
                            (i[Symbol.iterator] = function() {
                                return this;
                            }),
                        i
                    );
                    function s(i) {
                        return function(s) {
                            return (function(i) {
                                if (n) throw new TypeError('Generator is already executing.');
                                for (; a; )
                                    try {
                                        if (
                                            ((n = 1),
                                            r &&
                                                (o = r[2 & i[0] ? 'return' : i[0] ? 'throw' : 'next']) &&
                                                !(o = o.call(r, i[1])).done)
                                        )
                                            return o;
                                        switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return a.label++, { value: i[1], done: !1 };
                                            case 5:
                                                a.label++, (r = i[1]), (i = [0]);
                                                continue;
                                            case 7:
                                                (i = a.ops.pop()), a.trys.pop();
                                                continue;
                                            default:
                                                if (
                                                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                                                    (6 === i[0] || 2 === i[0])
                                                ) {
                                                    a = 0;
                                                    continue;
                                                }
                                                if (3 === i[0] && (!o || (i[1] > o[0] && o[3] > i[1]))) {
                                                    a.label = i[1];
                                                    break;
                                                }
                                                if (6 === i[0] && o[1] > a.label) {
                                                    (a.label = o[1]), (o = i);
                                                    break;
                                                }
                                                if (o && o[2] > a.label) {
                                                    (a.label = o[2]), a.ops.push(i);
                                                    break;
                                                }
                                                o[2] && a.ops.pop(), a.trys.pop();
                                                continue;
                                        }
                                        i = t.call(e, a);
                                    } catch (e) {
                                        (i = [6, e]), (r = 0);
                                    } finally {
                                        n = o = 0;
                                    }
                                if (5 & i[0]) throw i[1];
                                return { value: i[0] ? i[1] : void 0, done: !0 };
                            })([i, s]);
                        };
                    }
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var a = n(2),
            s = n(1),
            u = n(0),
            c = n(3),
            l = n(19),
            f = n(21),
            h = (self.Pushwoosh = new l.default()),
            p = [];
        function d(e) {
            return o(this, void 0, void 0, function() {
                return i(this, function(t) {
                    switch (t.label) {
                        case 0:
                            return [4, self.clients.matchAll()];
                        case 1:
                            return (
                                t.sent().forEach(function(t) {
                                    t.postMessage(e);
                                }),
                                [2]
                            );
                    }
                });
            });
        }
        function _(e, t) {
            return o(this, void 0, void 0, function() {
                var n;
                return i(this, function(r) {
                    switch (r.label) {
                        case 0:
                            if ('string' != typeof e) return [3, 4];
                            r.label = 1;
                        case 1:
                            return r.trys.push([1, 2, , 4]), [2, JSON.parse(e)];
                        case 2:
                            return (
                                (n = r.sent()), [4, c.default.write('error', n, 'Error occurred during json parsing')]
                            );
                        case 3:
                            return r.sent(), [3, 4];
                        case 4:
                            return [2, void 0 === e && void 0 !== t ? t : e];
                    }
                });
            });
        }
        function E(e) {
            return o(this, void 0, void 0, function() {
                var t, n, l, p, E;
                return i(this, function(g) {
                    switch (g.label) {
                        case 0:
                            return g.trys.push([0, 5, , 6]), [4, a.keyValue.get(s.KEY_INIT_PARAMS)];
                        case 1:
                            return (
                                (t = g.sent()),
                                [
                                    4,
                                    (function(e, t) {
                                        return o(this, void 0, void 0, function() {
                                            var n, r, o, a;
                                            return i(this, function(i) {
                                                switch (i.label) {
                                                    case 0:
                                                        return [4, e.data.json()];
                                                    case 1:
                                                        return (n = i.sent()), [4, _((r = n.data || n).buttons, [])];
                                                    case 2:
                                                        return (o = i.sent()), [4, _(r.u, {})];
                                                    case 3:
                                                        return (
                                                            (a = i.sent()),
                                                            [
                                                                2,
                                                                {
                                                                    title:
                                                                        r.header ||
                                                                        t.defaultNotificationTitle ||
                                                                        s.DEFAULT_NOTIFICATION_TITLE,
                                                                    body: r.body,
                                                                    buttons: o,
                                                                    customData: a,
                                                                    icon:
                                                                        r.i ||
                                                                        t.defaultNotificationImage ||
                                                                        s.DEFAULT_NOTIFICATION_IMAGE,
                                                                    image: r.image || '',
                                                                    messageHash: r.p || '',
                                                                    campaignCode: r.pwcid || '',
                                                                    duration: u.prepareDuration(r.duration),
                                                                    openUrl: r.l || s.DEFAULT_NOTIFICATION_URL,
                                                                },
                                                            ]
                                                        );
                                                }
                                            });
                                        });
                                    })(e, t),
                                ]
                            );
                        case 2:
                            return (
                                (n = g.sent()),
                                c.default.setLevel(t.logLevel),
                                [4, c.default.write('info', JSON.stringify(n), 'onPush')]
                            );
                        case 3:
                            return (
                                g.sent(),
                                (l = n.messageHash),
                                (p = new f.default(n)),
                                [
                                    4,
                                    h.getListeners('onPush').reduce(function(e, t) {
                                        return e.then(function() {
                                            return t(p);
                                        });
                                    }, Promise.resolve()),
                                ]
                            );
                        case 4:
                            return (
                                g.sent(),
                                [
                                    2,
                                    Promise.all([
                                        p.show(),
                                        l &&
                                            h.initApi().then(function() {
                                                return h.api.messageDeliveryEvent(l);
                                            }),
                                        a.message.add(r({}, p._forLog(), { payload: n })),
                                        d({ type: s.EVENT_ON_PUSH_DELIVERY, payload: n }),
                                    ]),
                                ]
                            );
                        case 5:
                            return (
                                (E = g.sent()),
                                [2, a.message.add({ error: '' + E, stack: E.stack, payload: e.data.text() })]
                            );
                        case 6:
                            return [2];
                    }
                });
            });
        }
        function g(e) {
            return o(this, void 0, void 0, function() {
                var t, n, r, o, a, s;
                return i(this, function(i) {
                    switch (i.label) {
                        case 0:
                            return (r = (n = void 0 === (t = e.notification) ? {} : t).data), [4, _(n.tag, {})];
                        case 1:
                            return (
                                (o = i.sent()),
                                (a = ''),
                                e.action && Array.isArray(r.buttons)
                                    ? ((s =
                                          r.buttons.find(function(t) {
                                              return t.action === e.action;
                                          }) || {}),
                                      (a = s.url))
                                    : (a = o.url),
                                [
                                    2,
                                    {
                                        requireInteraction: n.requireInteraction,
                                        title: n.title,
                                        body: n.body,
                                        icon: n.icon,
                                        buttons: r.buttons,
                                        duration: r.duration,
                                        image: r.image,
                                        code: r.code,
                                        campaignCode: r.campaignCode,
                                        messageHash: o.messageHash,
                                        customData: o.customData,
                                        openUrl: o.url,
                                        tag: n.tag,
                                        url: a,
                                    },
                                ]
                            );
                    }
                });
            });
        }
        function v(e) {
            return o(this, void 0, void 0, function() {
                var t, n, r, u, c;
                return i(this, function(l) {
                    switch (l.label) {
                        case 0:
                            return [4, g(e)];
                        case 1:
                            return (
                                (t = l.sent()),
                                (n = t.messageHash),
                                (r = t.url),
                                (u = t.code) && p.push(u),
                                e.notification.close(),
                                (c = { type: s.EVENT_ON_NOTIFICATION_CLICK, payload: t }),
                                r
                                    ? [
                                          4,
                                          e.waitUntil(
                                              self.clients.matchAll({ type: 'window' }).then(function(e) {
                                                  return (function(e, t, n) {
                                                      return o(this, void 0, void 0, function() {
                                                          var r, o;
                                                          return i(this, function(i) {
                                                              switch (i.label) {
                                                                  case 0:
                                                                      for (r = e.length - 1; r > -1; --r)
                                                                          if (
                                                                              (t === (o = e[r]).url || '/' === t) &&
                                                                              'focus' in o
                                                                          )
                                                                              return o.focus(), [2];
                                                                      return self.clients.openWindow
                                                                          ? [4, a.keyValue.set(s.KEY_DELAYED_EVENT, n)]
                                                                          : [3, 2];
                                                                  case 1:
                                                                      return i.sent(), [2, self.clients.openWindow(t)];
                                                                  case 2:
                                                                      return [2];
                                                              }
                                                          });
                                                      });
                                                  })(e, r, c);
                                              })
                                          ),
                                      ]
                                    : [3, 3]
                            );
                        case 2:
                            l.sent(), (l.label = 3);
                        case 3:
                            return [
                                2,
                                Promise.all([
                                    h.initApi().then(function() {
                                        return h.api.pushStat(n);
                                    }),
                                    a.keyValue.set(s.KEY_LAST_OPEN_MESSAGE, {
                                        url: r,
                                        messageHash: n,
                                        expiry: Date.now() + s.PERIOD_GOAL_EVENT,
                                    }),
                                    d(c),
                                ]),
                            ];
                    }
                });
            });
        }
        self.addEventListener('install', function(e) {
            e.waitUntil(
                Promise.all([
                    a.keyValue.set(s.KEY_WORKER_VERSION, u.getVersion()),
                    c.default.write('info', 'install'),
                ]).then(function() {
                    return self.skipWaiting();
                })
            );
        }),
            self.addEventListener('activate', function(e) {
                e.waitUntil(
                    Promise.all([c.default.write('info', 'activate')]).then(function() {
                        return self.clients.claim();
                    })
                );
            }),
            self.addEventListener('push', function(e) {
                e.waitUntil(
                    Promise.resolve(self.clients.claim()).then(function() {
                        return E(e).catch(function(e) {
                            return console.log(e);
                        });
                    })
                );
            }),
            self.addEventListener('notificationclick', function(e) {
                e.waitUntil(
                    Promise.resolve(self.clients.claim()).then(function() {
                        return v(e).catch(function(e) {
                            return console.log(e);
                        });
                    })
                );
            }),
            self.addEventListener('notificationclose', function(e) {
                e.waitUntil(
                    (function(e) {
                        return o(this, void 0, void 0, function() {
                            var t, n, r;
                            return i(this, function(o) {
                                switch (o.label) {
                                    case 0:
                                        return [4, g(e)];
                                    case 1:
                                        return (
                                            (t = o.sent()),
                                            (n = t.code),
                                            e.notification.close(),
                                            n
                                                ? 0 > (r = p.indexOf(n))
                                                    ? [2, d({ type: s.EVENT_ON_NOTIFICATION_CLOSE, payload: t })]
                                                    : (p.splice(r, 1), [2])
                                                : [2]
                                        );
                                }
                            });
                        });
                    })(e).catch(function(e) {
                        return console.log(e);
                    })
                );
            });
    },
    function(e, t, n) {
        'use strict';
        var r =
                (this && this.__assign) ||
                Object.assign ||
                function(e) {
                    for (var t, n = 1, r = arguments.length; r > n; n++)
                        for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                },
            o =
                (this && this.__awaiter) ||
                function(e, t, n, r) {
                    return new (n || (n = Promise))(function(o, i) {
                        function a(e) {
                            try {
                                u(r.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            try {
                                u(r.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function u(e) {
                            e.done
                                ? o(e.value)
                                : new n(function(t) {
                                      t(e.value);
                                  }).then(a, s);
                        }
                        u((r = r.apply(e, t || [])).next());
                    });
                },
            i =
                (this && this.__generator) ||
                function(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        a = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1];
                            },
                            trys: [],
                            ops: [],
                        };
                    return (
                        (i = { next: s(0), throw: s(1), return: s(2) }),
                        'function' == typeof Symbol &&
                            (i[Symbol.iterator] = function() {
                                return this;
                            }),
                        i
                    );
                    function s(i) {
                        return function(s) {
                            return (function(i) {
                                if (n) throw new TypeError('Generator is already executing.');
                                for (; a; )
                                    try {
                                        if (
                                            ((n = 1),
                                            r &&
                                                (o = r[2 & i[0] ? 'return' : i[0] ? 'throw' : 'next']) &&
                                                !(o = o.call(r, i[1])).done)
                                        )
                                            return o;
                                        switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return a.label++, { value: i[1], done: !1 };
                                            case 5:
                                                a.label++, (r = i[1]), (i = [0]);
                                                continue;
                                            case 7:
                                                (i = a.ops.pop()), a.trys.pop();
                                                continue;
                                            default:
                                                if (
                                                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                                                    (6 === i[0] || 2 === i[0])
                                                ) {
                                                    a = 0;
                                                    continue;
                                                }
                                                if (3 === i[0] && (!o || (i[1] > o[0] && o[3] > i[1]))) {
                                                    a.label = i[1];
                                                    break;
                                                }
                                                if (6 === i[0] && o[1] > a.label) {
                                                    (a.label = o[1]), (o = i);
                                                    break;
                                                }
                                                if (o && o[2] > a.label) {
                                                    (a.label = o[2]), a.ops.push(i);
                                                    break;
                                                }
                                                o[2] && a.ops.pop(), a.trys.pop();
                                                continue;
                                        }
                                        i = t.call(e, a);
                                    } catch (e) {
                                        (i = [6, e]), (r = 0);
                                    } finally {
                                        n = o = 0;
                                    }
                                if (5 & i[0]) throw i[1];
                                return { value: i[0] ? i[1] : void 0, done: !0 };
                            })([i, s]);
                        };
                    }
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var a = n(2),
            s = n(1),
            u = n(4),
            c = n(20),
            l = (function() {
                function e() {
                    this._listeners = {};
                }
                return (
                    (e.prototype.push = function(e) {
                        Array.isArray(e) &&
                            'onPush' === e[0] &&
                            'function' == typeof e[1] &&
                            (this._listeners[e[0]] || (this._listeners[e[0]] = []), this._listeners[e[0]].push(e[1]));
                    }),
                    (e.prototype.getListeners = function(e) {
                        return this._listeners[e] || [];
                    }),
                    (e.prototype.initApi = function() {
                        return o(this, void 0, void 0, function() {
                            var e, t, n, o, l;
                            return i(this, function(i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, a.keyValue.getAll()];
                                    case 1:
                                        return (
                                            (e = i.sent()),
                                            (t = e[s.KEY_INIT_PARAMS]),
                                            (n = e[s.KEY_LAST_OPEN_MESSAGE] || {}),
                                            (o = r({}, e[s.KEY_API_PARAMS], {
                                                deviceType: t.deviceType,
                                                deviceModel: t.tags['Device Model'],
                                                applicationCode: t.applicationCode,
                                                language: t.tags.Language,
                                                pushwooshApiUrl: t.pushwooshApiUrl,
                                            })),
                                            t.userId && (o.userId = t.userId),
                                            (l = c.default(t.applicationCode, t.pushwooshApiUrl)),
                                            (this.api = new u.default(l, o, n)),
                                            [2]
                                        );
                                }
                            });
                        });
                    }),
                    e
                );
            })();
        t.default = l;
    },
    function(e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r = n(3),
            o = n(0);
        t.default = function(e, t) {
            return function(n, i) {
                return new Promise(function(a, s) {
                    o.getPushwooshUrl(e, t).then(function(e) {
                        try {
                            fetch('' + e + n, {
                                method: 'post',
                                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                                body: JSON.stringify({ request: i }),
                            }).then(function(e) {
                                e.ok
                                    ? e.json().then(function(e) {
                                          200 != e.status_code
                                              ? r.logAndRejectError(
                                                    'Error occurred during the ' +
                                                        n +
                                                        ' call to Pushwoosh: ' +
                                                        e.status_message,
                                                    s
                                                )
                                              : (r.default.write(
                                                    'apirequest',
                                                    n +
                                                        ' call with arguments: ' +
                                                        JSON.stringify(i) +
                                                        ' to Pushwoosh has been successful. Result: ' +
                                                        JSON.stringify(e.response),
                                                    'createDoApiFetch'
                                                ),
                                                a(e.response));
                                      })
                                    : r.logAndRejectError(e.statusText || 'response not ok', s);
                            });
                        } catch (e) {
                            r.logAndRejectError('Exception while ' + n + ' the device: ' + e, s);
                        }
                    });
                });
            };
        };
    },
    function(e, t, n) {
        'use strict';
        var r =
                (this && this.__assign) ||
                Object.assign ||
                function(e) {
                    for (var t, n = 1, r = arguments.length; r > n; n++)
                        for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                },
            o =
                (this && this.__awaiter) ||
                function(e, t, n, r) {
                    return new (n || (n = Promise))(function(o, i) {
                        function a(e) {
                            try {
                                u(r.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            try {
                                u(r.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function u(e) {
                            e.done
                                ? o(e.value)
                                : new n(function(t) {
                                      t(e.value);
                                  }).then(a, s);
                        }
                        u((r = r.apply(e, t || [])).next());
                    });
                },
            i =
                (this && this.__generator) ||
                function(e, t) {
                    var n,
                        r,
                        o,
                        i,
                        a = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1];
                            },
                            trys: [],
                            ops: [],
                        };
                    return (
                        (i = { next: s(0), throw: s(1), return: s(2) }),
                        'function' == typeof Symbol &&
                            (i[Symbol.iterator] = function() {
                                return this;
                            }),
                        i
                    );
                    function s(i) {
                        return function(s) {
                            return (function(i) {
                                if (n) throw new TypeError('Generator is already executing.');
                                for (; a; )
                                    try {
                                        if (
                                            ((n = 1),
                                            r &&
                                                (o = r[2 & i[0] ? 'return' : i[0] ? 'throw' : 'next']) &&
                                                !(o = o.call(r, i[1])).done)
                                        )
                                            return o;
                                        switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return a.label++, { value: i[1], done: !1 };
                                            case 5:
                                                a.label++, (r = i[1]), (i = [0]);
                                                continue;
                                            case 7:
                                                (i = a.ops.pop()), a.trys.pop();
                                                continue;
                                            default:
                                                if (
                                                    !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                                                    (6 === i[0] || 2 === i[0])
                                                ) {
                                                    a = 0;
                                                    continue;
                                                }
                                                if (3 === i[0] && (!o || (i[1] > o[0] && o[3] > i[1]))) {
                                                    a.label = i[1];
                                                    break;
                                                }
                                                if (6 === i[0] && o[1] > a.label) {
                                                    (a.label = o[1]), (o = i);
                                                    break;
                                                }
                                                if (o && o[2] > a.label) {
                                                    (a.label = o[2]), a.ops.push(i);
                                                    break;
                                                }
                                                o[2] && a.ops.pop(), a.trys.pop();
                                                continue;
                                        }
                                        i = t.call(e, a);
                                    } catch (e) {
                                        (i = [6, e]), (r = 0);
                                    } finally {
                                        n = o = 0;
                                    }
                                if (5 & i[0]) throw i[1];
                                return { value: i[0] ? i[1] : void 0, done: !0 };
                            })([i, s]);
                        };
                    }
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var a = (function() {
            function e(e) {
                (this._canceled = !1), (this._origMess = e), (this._changedMess = r({}, e));
            }
            return (
                Object.defineProperty(e.prototype, 'title', {
                    get: function() {
                        return this._changedMess.title;
                    },
                    set: function(e) {
                        this._changedMess.title = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'body', {
                    get: function() {
                        return this._changedMess.body || '';
                    },
                    set: function(e) {
                        this._changedMess.body = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'icon', {
                    get: function() {
                        return this._changedMess.icon;
                    },
                    set: function(e) {
                        this._changedMess.icon = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'openUrl', {
                    get: function() {
                        return this._changedMess.openUrl;
                    },
                    set: function(e) {
                        this._changedMess.openUrl = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'duration', {
                    get: function() {
                        return this._changedMess.duration;
                    },
                    set: function(e) {
                        this._changedMess.duration = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'messageHash', {
                    get: function() {
                        return this._changedMess.messageHash;
                    },
                    set: function(e) {
                        this._changedMess.messageHash = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'customData', {
                    get: function() {
                        return this._changedMess.customData;
                    },
                    set: function(e) {
                        this._changedMess.customData = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                Object.defineProperty(e.prototype, 'campaignCode', {
                    get: function() {
                        return this._changedMess.campaignCode;
                    },
                    set: function(e) {
                        this._changedMess.campaignCode = e;
                    },
                    enumerable: !0,
                    configurable: !0,
                }),
                (e.prototype.show = function() {
                    return o(this, void 0, void 0, function() {
                        var e,
                            t,
                            n,
                            r,
                            o = this;
                        return i(this, function(i) {
                            switch (i.label) {
                                case 0:
                                    return this._canceled
                                        ? [3, 3]
                                        : ((e = 'notificationCode-' + Date.now()),
                                          (t = this._changedMess.image),
                                          (n = this._changedMess.buttons) &&
                                              Array.isArray(n) &&
                                              n.forEach(function(e, t) {
                                                  e.action = 'action-' + t;
                                              }),
                                          (r = {
                                              body: this.body,
                                              icon: this.icon,
                                              requireInteraction: 0 === this.duration || this.duration > 20,
                                              tag: JSON.stringify({
                                                  url: this.openUrl,
                                                  messageHash: this.messageHash,
                                                  customData: this.customData,
                                              }),
                                              data: {
                                                  code: e,
                                                  buttons: n,
                                                  duration: this.duration,
                                                  image: t,
                                                  campaignCode: this.campaignCode,
                                              },
                                              actions: n,
                                              image: t,
                                          }),
                                          [4, self.registration.showNotification(this.title, r)]);
                                case 1:
                                    return i.sent(), [4, self.registration.getNotifications()];
                                case 2:
                                    i.sent().forEach(function(t) {
                                        t.data &&
                                            t.data.code === e &&
                                            o.duration &&
                                            setTimeout(function() {
                                                return t.close();
                                            }, 1e3 * o.duration);
                                    }),
                                        (i.label = 3);
                                case 3:
                                    return [2];
                            }
                        });
                    });
                }),
                (e.prototype.cancel = function() {
                    this._canceled = !0;
                }),
                (e.prototype._forLog = function() {
                    return { orig: this._origMess, changed: this._changedMess, canceled: this._canceled };
                }),
                e
            );
        })();
        t.default = a;
    },
]);
