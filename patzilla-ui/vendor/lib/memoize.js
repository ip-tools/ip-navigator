/*
 * memoize.js
 * by @philogb and @addyosmani
 * https://github.com/addyosmani/memoize.js
 * further optimizations by @mathias, @DmitryBaranovsk & @GotNoSugarBaby
 * fixes by @AutoSponge
 * perf tests: http://bit.ly/q3zpG3
 * Released under an MIT license.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.memoize = factory();
    }
}(this, function() {
    "use strict";

    var memoize = function(func, context) {
        var stringifyJson = JSON.stringify,
            cache = {};

        var cachedfun = function() {
            var hash = stringifyJson(arguments);
            return (hash in cache) ? cache[hash] : cache[hash] = func.apply(context, arguments);
        };

        cachedfun.__cache = (function() {
            cache.remove || (cache.remove = function() {
                var hash = stringifyJson(arguments);
                return (delete cache[hash]);
            });
            cache.purge || (cache.purge = function() {
                var hash = stringifyJson(arguments);
                cache = {};
            });
            return cache;
        }).call(context);

        return cachedfun;
    };

    return memoize;
}));