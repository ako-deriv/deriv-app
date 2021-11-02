/*! For license information please see trader.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@deriv/account/dist/account/css/reset-trading-password-modal.css"),require("@deriv/account/dist/account/js/file-uploader-container"),require("@deriv/account/dist/account/js/form-sub-header"),require("@deriv/account/dist/account/js/poa-expired"),require("@deriv/account/dist/account/js/poa-needs-review"),require("@deriv/account/dist/account/js/poa-status-codes"),require("@deriv/account/dist/account/js/poa-submitted"),require("@deriv/account/dist/account/js/poa-unverified"),require("@deriv/account/dist/account/js/poa-verified"),require("@deriv/account/dist/account/js/populate-verification-status"),require("@deriv/account/dist/account/js/proof-of-identity-container"),require("@deriv/account/dist/account/js/reset-trading-password-modal"),require("@deriv/account/dist/account/js/sent-email-modal"),require("@deriv/components"),require("@deriv/components/src/components/icon"),require("@deriv/deriv-charts"),require("@deriv/shared"),require("@deriv/shared/src/utils/constants-storage/CFD"),require("@deriv/translations"),require("mobx"),require("mobx-react"),require("react"),require("react-dom"),require("react-router"),require("react-router-dom")):"function"==typeof define&&define.amd?define(["@deriv/account/dist/account/css/reset-trading-password-modal.css","@deriv/account/dist/account/js/file-uploader-container","@deriv/account/dist/account/js/form-sub-header","@deriv/account/dist/account/js/poa-expired","@deriv/account/dist/account/js/poa-needs-review","@deriv/account/dist/account/js/poa-status-codes","@deriv/account/dist/account/js/poa-submitted","@deriv/account/dist/account/js/poa-unverified","@deriv/account/dist/account/js/poa-verified","@deriv/account/dist/account/js/populate-verification-status","@deriv/account/dist/account/js/proof-of-identity-container","@deriv/account/dist/account/js/reset-trading-password-modal","@deriv/account/dist/account/js/sent-email-modal","@deriv/components","@deriv/components/src/components/icon","@deriv/deriv-charts","@deriv/shared","@deriv/shared/src/utils/constants-storage/CFD","@deriv/translations","mobx","mobx-react","react","react-dom","react-router","react-router-dom"],t):"object"==typeof exports?exports["@deriv/trader"]=t(require("@deriv/account/dist/account/css/reset-trading-password-modal.css"),require("@deriv/account/dist/account/js/file-uploader-container"),require("@deriv/account/dist/account/js/form-sub-header"),require("@deriv/account/dist/account/js/poa-expired"),require("@deriv/account/dist/account/js/poa-needs-review"),require("@deriv/account/dist/account/js/poa-status-codes"),require("@deriv/account/dist/account/js/poa-submitted"),require("@deriv/account/dist/account/js/poa-unverified"),require("@deriv/account/dist/account/js/poa-verified"),require("@deriv/account/dist/account/js/populate-verification-status"),require("@deriv/account/dist/account/js/proof-of-identity-container"),require("@deriv/account/dist/account/js/reset-trading-password-modal"),require("@deriv/account/dist/account/js/sent-email-modal"),require("@deriv/components"),require("@deriv/components/src/components/icon"),require("@deriv/deriv-charts"),require("@deriv/shared"),require("@deriv/shared/src/utils/constants-storage/CFD"),require("@deriv/translations"),require("mobx"),require("mobx-react"),require("react"),require("react-dom"),require("react-router"),require("react-router-dom")):e["@deriv/trader"]=t(e["@deriv/account/dist/account/css/reset-trading-password-modal.css"],e["@deriv/account/dist/account/js/file-uploader-container"],e["@deriv/account/dist/account/js/form-sub-header"],e["@deriv/account/dist/account/js/poa-expired"],e["@deriv/account/dist/account/js/poa-needs-review"],e["@deriv/account/dist/account/js/poa-status-codes"],e["@deriv/account/dist/account/js/poa-submitted"],e["@deriv/account/dist/account/js/poa-unverified"],e["@deriv/account/dist/account/js/poa-verified"],e["@deriv/account/dist/account/js/populate-verification-status"],e["@deriv/account/dist/account/js/proof-of-identity-container"],e["@deriv/account/dist/account/js/reset-trading-password-modal"],e["@deriv/account/dist/account/js/sent-email-modal"],e["@deriv/components"],e["@deriv/components/src/components/icon"],e["@deriv/deriv-charts"],e["@deriv/shared"],e["@deriv/shared/src/utils/constants-storage/CFD"],e["@deriv/translations"],e.mobx,e["mobx-react"],e.react,e["react-dom"],e["react-router"],e["react-router-dom"])}(self,(function(e,t,r,n,o,i,a,s,c,d,u,l,f,p,v,h,m,y,b,g,_,j,w,x,E){return(()=>{var C,T,q,S,A,O,R,P={"../../../node_modules/event-source-polyfill/src/eventsource.js":function(e,t){var r,n,o;!function(i){"use strict";var a=i.setTimeout,s=i.clearTimeout,c=i.XMLHttpRequest,d=i.XDomainRequest,u=i.ActiveXObject,l=i.EventSource,f=i.document,p=i.Promise,v=i.fetch,h=i.Response,m=i.TextDecoder,y=i.TextEncoder,b=i.AbortController;if("undefined"==typeof window||void 0===f||"readyState"in f||null!=f.body||(f.readyState="loading",window.addEventListener("load",(function(e){f.readyState="complete"}),!1)),null==c&&null!=u&&(c=function(){return new u("Microsoft.XMLHTTP")}),null==Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),Date.now||(Date.now=function(){return(new Date).getTime()}),null==b){var g=v;v=function(e,t){var r=t.signal;return g(e,{headers:t.headers,credentials:t.credentials,cache:t.cache}).then((function(e){var t=e.body.getReader();return r._reader=t,r._aborted&&r._reader.cancel(),{status:e.status,statusText:e.statusText,headers:e.headers,body:{getReader:function(){return t}}}}))},b=function(){this.signal={_reader:null,_aborted:!1},this.abort=function(){null!=this.signal._reader&&this.signal._reader.cancel(),this.signal._aborted=!0}}}function _(){this.bitsNeeded=0,this.codePoint=0}_.prototype.decode=function(e){function t(e,t,r){if(1===r)return e>=128>>t&&e<<t<=2047;if(2===r)return e>=2048>>t&&e<<t<=55295||e>=57344>>t&&e<<t<=65535;if(3===r)return e>=65536>>t&&e<<t<=1114111;throw new Error}function r(e,t){if(6===e)return t>>6>15?3:t>31?2:1;if(12===e)return t>15?3:2;if(18===e)return 3;throw new Error}for(var n=65533,o="",i=this.bitsNeeded,a=this.codePoint,s=0;s<e.length;s+=1){var c=e[s];0!==i&&(c<128||c>191||!t(a<<6|63&c,i-6,r(i,a)))&&(i=0,a=n,o+=String.fromCharCode(a)),0===i?(c>=0&&c<=127?(i=0,a=c):c>=192&&c<=223?(i=6,a=31&c):c>=224&&c<=239?(i=12,a=15&c):c>=240&&c<=247?(i=18,a=7&c):(i=0,a=n),0===i||t(a,i,r(i,a))||(i=0,a=n)):(i-=6,a=a<<6|63&c),0===i&&(a<=65535?o+=String.fromCharCode(a):(o+=String.fromCharCode(55296+(a-65535-1>>10)),o+=String.fromCharCode(56320+(a-65535-1&1023))))}return this.bitsNeeded=i,this.codePoint=a,o},null!=m&&null!=y&&function(){try{return"test"===(new m).decode((new y).encode("test"),{stream:!0})}catch(e){console.debug("TextDecoder does not support streaming option. Using polyfill instead: "+e)}return!1}()||(m=_);var j=function(){};function w(e){this.withCredentials=!1,this.readyState=0,this.status=0,this.statusText="",this.responseText="",this.onprogress=j,this.onload=j,this.onerror=j,this.onreadystatechange=j,this._contentType="",this._xhr=e,this._sendTimeout=0,this._abort=j}function x(e){return e.replace(/[A-Z]/g,(function(e){return String.fromCharCode(e.charCodeAt(0)+32)}))}function E(e){for(var t=Object.create(null),r=e.split("\r\n"),n=0;n<r.length;n+=1){var o=r[n].split(": "),i=o.shift(),a=o.join(": ");t[x(i)]=a}this._map=t}function C(){}function T(e){this._headers=e}function q(){}function S(){this._listeners=Object.create(null)}function A(e){a((function(){throw e}),0)}function O(e){this.type=e,this.target=void 0}function R(e,t){O.call(this,e),this.data=t.data,this.lastEventId=t.lastEventId}function P(e,t){O.call(this,e),this.status=t.status,this.statusText=t.statusText,this.headers=t.headers}function D(e,t){O.call(this,e),this.error=t.error}w.prototype.open=function(e,t){this._abort(!0);var r=this,n=this._xhr,o=1,i=0;this._abort=function(e){0!==r._sendTimeout&&(s(r._sendTimeout),r._sendTimeout=0),1!==o&&2!==o&&3!==o||(o=4,n.onload=j,n.onerror=j,n.onabort=j,n.onprogress=j,n.onreadystatechange=j,n.abort(),0!==i&&(s(i),i=0),e||(r.readyState=4,r.onabort(null),r.onreadystatechange())),o=0};var d=function(){if(1===o){var e=0,t="",i=void 0;if("contentType"in n)e=200,t="OK",i=n.contentType;else try{e=n.status,t=n.statusText,i=n.getResponseHeader("Content-Type")}catch(r){e=0,t="",i=void 0}0!==e&&(o=2,r.readyState=2,r.status=e,r.statusText=t,r._contentType=i,r.onreadystatechange())}},u=function(){if(d(),2===o||3===o){o=3;var e="";try{e=n.responseText}catch(e){}r.readyState=3,r.responseText=e,r.onprogress()}},l=function(e,t){if(null!=t&&null!=t.preventDefault||(t={preventDefault:j}),u(),1===o||2===o||3===o){if(o=4,0!==i&&(s(i),i=0),r.readyState=4,"load"===e)r.onload(t);else if("error"===e)r.onerror(t);else{if("abort"!==e)throw new TypeError;r.onabort(t)}r.onreadystatechange()}},f=function(){i=a((function(){f()}),500),3===n.readyState&&u()};"onload"in n&&(n.onload=function(e){l("load",e)}),"onerror"in n&&(n.onerror=function(e){l("error",e)}),"onabort"in n&&(n.onabort=function(e){l("abort",e)}),"onprogress"in n&&(n.onprogress=u),"onreadystatechange"in n&&(n.onreadystatechange=function(e){!function(e){null!=n&&(4===n.readyState?"onload"in n&&"onerror"in n&&"onabort"in n||l(""===n.responseText?"error":"load",e):3===n.readyState?"onprogress"in n||u():2===n.readyState&&d())}(e)}),!("contentType"in n)&&"ontimeout"in c.prototype||(t+=(-1===t.indexOf("?")?"?":"&")+"padding=true"),n.open(e,t,!0),"readyState"in n&&(i=a((function(){f()}),0))},w.prototype.abort=function(){this._abort(!1)},w.prototype.getResponseHeader=function(e){return this._contentType},w.prototype.setRequestHeader=function(e,t){var r=this._xhr;"setRequestHeader"in r&&r.setRequestHeader(e,t)},w.prototype.getAllResponseHeaders=function(){return null!=this._xhr.getAllResponseHeaders&&this._xhr.getAllResponseHeaders()||""},w.prototype.send=function(){if("ontimeout"in c.prototype&&("sendAsBinary"in c.prototype||"mozAnon"in c.prototype)||null==f||null==f.readyState||"complete"===f.readyState){var e=this._xhr;"withCredentials"in e&&(e.withCredentials=this.withCredentials);try{e.send(void 0)}catch(e){throw e}}else{var t=this;t._sendTimeout=a((function(){t._sendTimeout=0,t.send()}),4)}},E.prototype.get=function(e){return this._map[x(e)]},null!=c&&null==c.HEADERS_RECEIVED&&(c.HEADERS_RECEIVED=2),C.prototype.open=function(e,t,r,n,o,i,a){e.open("GET",o);var s=0;for(var d in e.onprogress=function(){var t=e.responseText.slice(s);s+=t.length,r(t)},e.onerror=function(e){e.preventDefault(),n(new Error("NetworkError"))},e.onload=function(){n(null)},e.onabort=function(){n(null)},e.onreadystatechange=function(){if(e.readyState===c.HEADERS_RECEIVED){var r=e.status,n=e.statusText,o=e.getResponseHeader("Content-Type"),i=e.getAllResponseHeaders();t(r,n,o,new E(i))}},e.withCredentials=i,a)Object.prototype.hasOwnProperty.call(a,d)&&e.setRequestHeader(d,a[d]);return e.send(),e},T.prototype.get=function(e){return this._headers.get(e)},q.prototype.open=function(e,t,r,n,o,i,a){var s=null,c=new b,d=c.signal,u=new m;return v(o,{headers:a,credentials:i?"include":"same-origin",signal:d,cache:"no-store"}).then((function(e){return s=e.body.getReader(),t(e.status,e.statusText,e.headers.get("Content-Type"),new T(e.headers)),new p((function(e,t){var n=function(){s.read().then((function(t){if(t.done)e(void 0);else{var o=u.decode(t.value,{stream:!0});r(o),n()}})).catch((function(e){t(e)}))};n()}))})).catch((function(e){return"AbortError"===e.name?void 0:e})).then((function(e){n(e)})),{abort:function(){null!=s&&s.cancel(),c.abort()}}},S.prototype.dispatchEvent=function(e){e.target=this;var t=this._listeners[e.type];if(null!=t)for(var r=t.length,n=0;n<r;n+=1){var o=t[n];try{"function"==typeof o.handleEvent?o.handleEvent(e):o.call(this,e)}catch(e){A(e)}}},S.prototype.addEventListener=function(e,t){e=String(e);var r=this._listeners,n=r[e];null==n&&(n=[],r[e]=n);for(var o=!1,i=0;i<n.length;i+=1)n[i]===t&&(o=!0);o||n.push(t)},S.prototype.removeEventListener=function(e,t){e=String(e);var r=this._listeners,n=r[e];if(null!=n){for(var o=[],i=0;i<n.length;i+=1)n[i]!==t&&o.push(n[i]);0===o.length?delete r[e]:r[e]=o}},R.prototype=Object.create(O.prototype),P.prototype=Object.create(O.prototype),D.prototype=Object.create(O.prototype);var N=/^text\/event\-stream(;.*)?$/i,k=function(e,t){var r=null==e?t:parseInt(e,10);return r!=r&&(r=t),F(r)},F=function(e){return Math.min(Math.max(e,1e3),18e6)},H=function(e,t,r){try{"function"==typeof t&&t.call(e,r)}catch(e){A(e)}};function I(e,t){S.call(this),t=t||{},this.onopen=void 0,this.onmessage=void 0,this.onerror=void 0,this.url=void 0,this.readyState=void 0,this.withCredentials=void 0,this.headers=void 0,this._close=void 0,function(e,t,r){t=String(t);var n=Boolean(r.withCredentials),o=r.lastEventIdQueryParameterName||"lastEventId",i=F(1e3),u=k(r.heartbeatTimeout,45e3),l="",f=i,p=!1,v=0,h=r.headers||{},m=r.Transport,y=L&&null==m?void 0:new w(null!=m?new m:null!=c&&"withCredentials"in c.prototype||null==d?new c:new d),b=null!=m&&"string"!=typeof m?new m:null==y?new q:new C,g=void 0,_=0,j=-1,x="",E="",T="",S="",A=0,O=0,I=0,M=function(t,r,n,o){if(0===j)if(200===t&&null!=n&&N.test(n)){j=1,p=Date.now(),f=i,e.readyState=1;var a=new P("open",{status:t,statusText:r,headers:o});e.dispatchEvent(a),H(e,e.onopen,a)}else{var s="";200!==t?(r&&(r=r.replace(/\s+/g," ")),s="EventSource's response has a status "+t+" "+r+" that is not 200. Aborting the connection."):s="EventSource's response has a Content-Type specifying an unsupported type: "+(null==n?"-":n.replace(/\s+/g," "))+". Aborting the connection.",X(),a=new P("error",{status:t,statusText:r,headers:o}),e.dispatchEvent(a),H(e,e.onerror,a),console.error(s)}},B=function(t){if(1===j){for(var r=-1,n=0;n<t.length;n+=1)(d=t.charCodeAt(n))!=="\n".charCodeAt(0)&&d!=="\r".charCodeAt(0)||(r=n);var o=(-1!==r?S:"")+t.slice(0,r+1);S=(-1===r?S:"")+t.slice(r+1),""!==t&&(p=Date.now(),v+=t.length);for(var c=0;c<o.length;c+=1){var d=o.charCodeAt(c);if(-1===A&&d==="\n".charCodeAt(0))A=0;else if(-1===A&&(A=0),d==="\r".charCodeAt(0)||d==="\n".charCodeAt(0)){if(0!==A){1===A&&(I=c+1);var h=o.slice(O,I-1),m=o.slice(I+(I<c&&o.charCodeAt(I)===" ".charCodeAt(0)?1:0),c);"data"===h?(x+="\n",x+=m):"id"===h?E=m:"event"===h?T=m:"retry"===h?(i=k(m,i),f=i):"heartbeatTimeout"===h&&(u=k(m,u),0!==_&&(s(_),_=a((function(){G()}),u)))}if(0===A){if(""!==x){l=E,""===T&&(T="message");var y=new R(T,{data:x.slice(1),lastEventId:E});if(e.dispatchEvent(y),"open"===T?H(e,e.onopen,y):"message"===T?H(e,e.onmessage,y):"error"===T&&H(e,e.onerror,y),2===j)return}x="",T=""}A=d==="\r".charCodeAt(0)?-1:0}else 0===A&&(O=c,A=1),1===A?d===":".charCodeAt(0)&&(I=c+1,A=2):2===A&&(A=3)}}},U=function(t){if(1===j||0===j){j=-1,0!==_&&(s(_),_=0),_=a((function(){G()}),f),f=F(Math.min(16*i,2*f)),e.readyState=0;var r=new D("error",{error:t});e.dispatchEvent(r),H(e,e.onerror,r),null!=t&&console.error(t)}},X=function(){j=2,null!=g&&(g.abort(),g=void 0),0!==_&&(s(_),_=0),e.readyState=2},G=function(){if(_=0,-1===j){p=!1,v=0,_=a((function(){G()}),u),j=0,x="",T="",E=l,S="",O=0,I=0,A=0;var r=t;if("data:"!==t.slice(0,5)&&"blob:"!==t.slice(0,5)&&""!==l){var n=t.indexOf("?");r=-1===n?t:t.slice(0,n+1)+t.slice(n+1).replace(/(?:^|&)([^=&]*)(?:=[^&]*)?/g,(function(e,t){return t===o?"":e})),r+=(-1===t.indexOf("?")?"?":"&")+o+"="+encodeURIComponent(l)}var i=e.withCredentials,s={Accept:"text/event-stream"},c=e.headers;if(null!=c)for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(s[d]=c[d]);try{g=b.open(y,M,B,U,r,i,s)}catch(e){throw X(),e}}else if(p||null==g){var f=Math.max((p||Date.now())+u-Date.now(),1);p=!1,_=a((function(){G()}),f)}else U(new Error("No activity within "+u+" milliseconds. "+(0===j?"No response received.":v+" chars received.")+" Reconnecting.")),null!=g&&(g.abort(),g=void 0)};e.url=t,e.readyState=0,e.withCredentials=n,e.headers=h,e._close=X,G()}(this,e,t)}var L=null!=v&&null!=h&&"body"in h.prototype;I.prototype=Object.create(S.prototype),I.prototype.CONNECTING=0,I.prototype.OPEN=1,I.prototype.CLOSED=2,I.prototype.close=function(){this._close()},I.CONNECTING=0,I.OPEN=1,I.CLOSED=2,I.prototype.withCredentials=void 0;var M=l;null==c||null!=l&&"withCredentials"in l.prototype||(M=I),function(i){if("object"==typeof e.exports){var a=i(t);void 0!==a&&(e.exports=a)}else n=[t],void 0===(o="function"==typeof(r=i)?r.apply(t,n):r)||(e.exports=o)}((function(e){e.EventSourcePolyfill=I,e.NativeEventSource=l,e.EventSource=M}))}("undefined"==typeof globalThis?"undefined"!=typeof window?window:"undefined"!=typeof self?self:this:globalThis)},"./index.js":(e,t,r)=>{"use strict";r.d(t,{default:()=>y});var n=setTimeout,o="undefined"!=typeof setImmediate?setImmediate:null;function i(e){return Boolean(e&&void 0!==e.length)}function a(){}function s(e){if(!(this instanceof s))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function c(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,s._immediateFn((function(){var r=1===e._state?t.onFulfilled:t.onRejected;if(null!==r){var n;try{n=r(e._value)}catch(e){return void u(t.promise,e)}d(t.promise,n)}else(1===e._state?d:u)(t.promise,e._value)}))):e._deferreds.push(t)}function d(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof s)return e._state=3,e._value=t,void l(e);if("function"==typeof r)return void p((n=r,o=t,function(){n.apply(o,arguments)}),e)}e._state=1,e._value=t,l(e)}catch(t){u(e,t)}var n,o}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&s._immediateFn((function(){e._handled||s._unhandledRejectionFn(e._value)}));for(var t=0,r=e._deferreds.length;t<r;t++)c(e,e._deferreds[t]);e._deferreds=null}function f(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function p(e,t){var r=!1;try{e((function(e){r||(r=!0,d(t,e))}),(function(e){r||(r=!0,u(t,e))}))}catch(e){if(r)return;r=!0,u(t,e)}}s.prototype.catch=function(e){return this.then(null,e)},s.prototype.then=function(e,t){var r=new this.constructor(a);return c(this,new f(e,t,r)),r},s.prototype.finally=function(e){var t=this.constructor;return this.then((function(r){return t.resolve(e()).then((function(){return r}))}),(function(r){return t.resolve(e()).then((function(){return t.reject(r)}))}))},s.all=function(e){return new s((function(t,r){if(!i(e))return r(new TypeError("Promise.all accepts an array"));var n=Array.prototype.slice.call(e);if(0===n.length)return t([]);var o=n.length;function a(e,i){try{if(i&&("object"==typeof i||"function"==typeof i)){var s=i.then;if("function"==typeof s)return void s.call(i,(function(t){a(e,t)}),r)}n[e]=i,0==--o&&t(n)}catch(e){r(e)}}for(var s=0;s<n.length;s++)a(s,n[s])}))},s.allSettled=function(e){return new this((function(t,r){if(!e||void 0===e.length)return r(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var n=Array.prototype.slice.call(e);if(0===n.length)return t([]);var o=n.length;function i(e,r){if(r&&("object"==typeof r||"function"==typeof r)){var a=r.then;if("function"==typeof a)return void a.call(r,(function(t){i(e,t)}),(function(r){n[e]={status:"rejected",reason:r},0==--o&&t(n)}))}n[e]={status:"fulfilled",value:r},0==--o&&t(n)}for(var a=0;a<n.length;a++)i(a,n[a])}))},s.resolve=function(e){return e&&"object"==typeof e&&e.constructor===s?e:new s((function(t){t(e)}))},s.reject=function(e){return new s((function(t,r){r(e)}))},s.race=function(e){return new s((function(t,r){if(!i(e))return r(new TypeError("Promise.race accepts an array"));for(var n=0,o=e.length;n<o;n++)s.resolve(e[n]).then(t,r)}))},s._immediateFn="function"==typeof o&&function(e){o(e)}||function(e){n(e,0)},s._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},r("../../../node_modules/event-source-polyfill/src/eventsource.js");var v=r("react"),h=r("@deriv/shared"),m=r("@deriv/components");const y=(0,h.makeLazyLoader)((function(){return Promise.all([r.e("vendors-node_modules_classnames_index_js-node_modules_extend_index_js-node_modules_lodash_deb-c9ff82"),r.e("trader-app")]).then(r.bind(r,"./App/app.jsx"))}),(function(){return v.createElement(m.Loading,null)}))()},"@deriv/account/dist/account/css/reset-trading-password-modal.css":t=>{"use strict";t.exports=e},"@deriv/account/dist/account/js/file-uploader-container":e=>{"use strict";e.exports=t},"@deriv/account/dist/account/js/form-sub-header":e=>{"use strict";e.exports=r},"@deriv/account/dist/account/js/poa-expired":e=>{"use strict";e.exports=n},"@deriv/account/dist/account/js/poa-needs-review":e=>{"use strict";e.exports=o},"@deriv/account/dist/account/js/poa-status-codes":e=>{"use strict";e.exports=i},"@deriv/account/dist/account/js/poa-submitted":e=>{"use strict";e.exports=a},"@deriv/account/dist/account/js/poa-unverified":e=>{"use strict";e.exports=s},"@deriv/account/dist/account/js/poa-verified":e=>{"use strict";e.exports=c},"@deriv/account/dist/account/js/populate-verification-status":e=>{"use strict";e.exports=d},"@deriv/account/dist/account/js/proof-of-identity-container":e=>{"use strict";e.exports=u},"@deriv/account/dist/account/js/reset-trading-password-modal":e=>{"use strict";e.exports=l},"@deriv/account/dist/account/js/sent-email-modal":e=>{"use strict";e.exports=f},"@deriv/components":e=>{"use strict";e.exports=p},"@deriv/components/src/components/icon":e=>{"use strict";e.exports=v},"@deriv/deriv-charts":e=>{"use strict";e.exports=h},"@deriv/shared":e=>{"use strict";e.exports=m},"@deriv/shared/src/utils/constants-storage/CFD":e=>{"use strict";e.exports=y},"@deriv/translations":e=>{"use strict";e.exports=b},mobx:e=>{"use strict";e.exports=g},"mobx-react":e=>{"use strict";e.exports=_},react:e=>{"use strict";e.exports=j},"react-dom":e=>{"use strict";e.exports=w},"react-router":e=>{"use strict";e.exports=x},"react-router-dom":e=>{"use strict";e.exports=E}},D={};function N(e){var t=D[e];if(void 0!==t)return t.exports;var r=D[e]={id:e,loaded:!1,exports:{}};return P[e].call(r.exports,r,r.exports,N),r.loaded=!0,r.exports}N.m=P,N.F={},N.E=e=>{Object.keys(N.F).map((t=>{N.F[t](e)}))},N.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return N.d(t,{a:t}),t},T=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,N.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var r=Object.create(null);N.r(r);var n={};C=C||[null,T({}),T([]),T(T)];for(var o=2&t&&e;"object"==typeof o&&!~C.indexOf(o);o=T(o))Object.getOwnPropertyNames(o).forEach((t=>n[t]=()=>e[t]));return n.default=()=>e,N.d(r,n),r},N.d=(e,t)=>{for(var r in t)N.o(t,r)&&!N.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},N.f={},N.e=e=>Promise.all(Object.keys(N.f).reduce(((t,r)=>(N.f[r](e,t),t)),[])),N.u=e=>"trader/js/trader."+e+"."+{"vendors-node_modules_classnames_index_js-node_modules_extend_index_js-node_modules_lodash_deb-c9ff82":"be3f686c66f37322f9cf","trader-app":"f979a15f8fb83fee2028","trade-modals":"dae71c313228f0b5d02c","error-component":"2a9528bbd627586406ba",contract:"4624329671a28587e4f9","vendors-node_modules_formik_dist_formik_esm_js":"0d77f9946ac052ccfd81",cfd:"908a166f9d8073bc7439",reports:"b8c9bdbd6b1a79e14e7f","Modules_Trading_Components_Form_TradeParams_Multiplier_expiration_jsx-Modules_Trading_Compone-90e657":"92e3b1a42fb6878e9736","screen-small":"cf7766a0f9a71835ed7c","screen-large":"8be37cfaff9bda30a80a","settings-chart":"9fcc560117e9ad8881ef","two-month-picker":"8ebf7d95a51438c53778"}[e]+".js",N.miniCssF=e=>"trader/css/trader."+e+"."+{"trader-app":"a2ce398fb59bcb9097e6","trade-modals":"0486d2d15ecbb957a717",cfd:"e742083324d1445388a0",reports:"6ed8596848436192b08e","screen-small":"db2186ef35aaa0ac0e21"}[e]+".css",N.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),N.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),q={},S="@deriv/trader:",N.l=(e,t,r,n)=>{if(q[e])q[e].push(t);else{var o,i;if(void 0!==r)for(var a=document.getElementsByTagName("script"),s=0;s<a.length;s++){var c=a[s];if(c.getAttribute("src")==e||c.getAttribute("data-webpack")==S+r){o=c;break}}o||(i=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,N.nc&&o.setAttribute("nonce",N.nc),o.setAttribute("data-webpack",S+r),o.src=e),q[e]=[t];var d=(t,r)=>{o.onerror=o.onload=null,clearTimeout(u);var n=q[e];if(delete q[e],o.parentNode&&o.parentNode.removeChild(o),n&&n.forEach((e=>e(r))),t)return t(r)},u=setTimeout(d.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=d.bind(null,o.onerror),o.onload=d.bind(null,o.onload),i&&document.head.appendChild(o)}},N.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},N.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),N.p="/br_something/",A=e=>new Promise(((t,r)=>{var n=N.miniCssF(e),o=N.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=(a=r[n]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){var a;if((o=(a=i[n]).getAttribute("data-href"))===e||o===t)return a}})(n,o))return t();((e,t,r,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=i=>{if(o.onerror=o.onload=null,"load"===i.type)r();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=s,o.parentNode.removeChild(o),n(c)}},o.href=t,document.head.appendChild(o)})(e,o,t,r)})),O={trader:0},N.f.miniCss=(e,t)=>{O[e]?t.push(O[e]):0!==O[e]&&{"trader-app":1,"trade-modals":1,cfd:1,reports:1,"screen-small":1}[e]&&t.push(O[e]=A(e).then((()=>{O[e]=0}),(t=>{throw delete O[e],t})))},(()=>{var e={trader:0};N.f.j=(t,r)=>{var n=N.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=o);var i=N.p+N.u(t),a=new Error;N.l(i,(r=>{if(N.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}}),"chunk-"+t,t)}},N.F.j=t=>{if(!N.o(e,t)||void 0===e[t]){e[t]=null;var r=document.createElement("link");N.nc&&r.setAttribute("nonce",N.nc),r.rel="prefetch",r.as="script",r.href=N.p+N.u(t),document.head.appendChild(r)}};var t=(t,r)=>{var n,o,[i,a,s]=r,c=0;for(n in a)N.o(a,n)&&(N.m[n]=a[n]);for(s&&s(N),t&&t(r);c<i.length;c++)o=i[c],N.o(e,o)&&e[o]&&e[o][0](),e[i[c]]=0},r=self.webpackChunk_deriv_trader=self.webpackChunk_deriv_trader||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),R={"trader-app":["vendors-node_modules_formik_dist_formik_esm_js","cfd","trade-modals","settings-chart"]},N.f.prefetch=(e,t)=>Promise.all(t).then((()=>{var t=R[e];Array.isArray(t)&&t.map(N.E)}));var k=N("./index.js");return k.default})()}));