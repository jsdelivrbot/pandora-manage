/*global define*/
'use strict';

define([], function () {

    function OnEnterDirective() {

        return function (scope, element, attrs) {


            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.onEnter);
                    });
     
                    event.preventDefault();
                }
            });
        }
    }

    return {'onEnter': [OnEnterDirective]};
});
