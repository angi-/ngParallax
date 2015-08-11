(function ()
{
  'use strict';

  angular
    /**
     * Angular parallax module
     */
    .module('ngParallax', [])

    /**
     * Angular parallax directive
     */
    .directive('parallax', ['$window', function ($window)
    {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, elm, attr)
        {
          var
            /**
             * CSS property that will be changed with scroll
             * @type {string}
             */
            property = attr.property,

            /**
             * Template for updating the CSS property. "{var}" is the variable part of the template
             * @type string
             */
            template = attr.template,

            /**
             * Parallax scroll ratio
             */
            ratio = attr.ratio ? +attr.ratio : 1.1,

            /**
             * The calculated value that needs to be applied
             * @type {string}
             */
            calcVal,

            /**
             * The final CSS value
             * @type {string}
             */
            resultVal;

          // Bind events
          _bind();

          /**
           * Function called by the scroll and touch move events
           */
          function _update()
          {
            // Don't update if element is not in fold or visible
            if( ! _isElementInFold() || elm[0].offsetParent === null)
            {
              return;
            }

            // Calculate and apply
            calcVal = $window.pageYOffset * ratio + 'px';
            resultVal = template.split("{var}").join(calcVal);
            elm.css(property, resultVal);
          }

          /**
           * Checks if element is in the fold
           * @return {bool}
           */
          function _isElementInFold()
          {
            return ($window.pageYOffset + $window.innerHeight >= elm[0].offsetTop && $window.pageYOffset <= elm[0].offsetTop + elm[0].offsetHeight);
          }

          /**
           * Binds scroll and touch move events to the update function
           */
          function _bind()
          {
            // Listen for scroll and touch move events
            angular.element($window).bind('scroll', _update);
            angular.element($window).bind('touchmove', _update);
            angular.element($window).bind('resize', _update);
          }

          /**
           * Cleans up bindings on destroy
           */
          function _cleanup()
          {
            angular.element($window).unbind('scroll', _update);
            angular.element($window).unbind('touchmove', _update);
            angular.element($window).unbind('resize', _update);
          }

          // Clean up bindings
          scope.$on('$destroy', _cleanup);
        }
      };
    }]);

})();