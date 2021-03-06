﻿/*
 *  jQuery Console Plugin
 *
 *  Copyright (c) 2009 Erik Zaadi
 *
 *  Home Page : http://erikzaadi.github.com/jQueryPlugins/jQuery.Console
 *  jQuery Plugin home page : http://plugins.jquery.com/project/Console
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;
(function($){

    //http://getfirebug.com/console.html
    var functions = {
        Log: 'log',
        Trace: 'trace',
        Debug: 'debug',
        Info: 'info',
        Warn: 'warn',
        Error: 'error',
        Dir: 'dir',
        DirXML: 'dirxml',
        Group: 'group',
        GroupCollapsed: 'groupCollapsed',
        GroupEnd: 'groupEnd',
        Time: 'time',
        TimeEnd: 'timeEnd',
        Profile: 'profile',
        ProfileEnd: 'profileEnd',
        Count: 'count'
    };
    
    $.Console = {};
    
    _initExports();
    
    $.Console.functions = functions;
    
    $.fn.Console = function(functionName){
        //log is default
        var funcToCall = functionName || functions.Log;
        return this.each(function(){
            _consoleCaller(funcToCall, this);
        });
    };
    
    function _initExports(){
        for (var fn in functions) {
            $.Console[fn] = function(){
                _consoleCaller(arguments.callee.fn, arguments);
            };
            $.Console[fn].fn = functions[fn];
        }
    };
    
    function _consoleCaller(func, params){
        //if it's the argument object
        if (params.callee) {
            for (var x = 0; x < params.length; x++) {
                _consoleCaller(func, params[x]);
            }
            return false;
        }
        if (typeof(window['console']) != 'undefined') {
            if (console[func]) {
                console[func](params);
            }
            else {
                if (console.log) 
                    console.log(params);
            }
        }
        else {
            if (window.opera) {
                opera.postError(params);
            }
        }
        return false;
    }
})(jQuery);
