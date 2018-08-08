(function(){
    'use strict';
    app.service('utils', ['notify', function(notify){
        this.notify = function(data){
            notify.closeAll();
            var defaults = {
                message: '',
                type: 'alert',
                duration: 3000
            }
            data = angular.extend(defaults, data);
            notify({
                message: data.message,
                classes: 'alert alert-' + data.type
            })
        }
    }]);
})();