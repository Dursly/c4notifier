module index { export var html =  '<html ng-csp><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]--><!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]--><!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]--><!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->  <head>    <meta charset="utf-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <title></title>    <meta name="description" content="">    <meta name="viewport" content="width=device-width">    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->    <!-- build:css({.tmp,app}) styles/main.css -->    <link rel="stylesheet" href="styles/main.css">    <!-- endbuild -->        <style>            body { overflow: auto }        </style>        <script type="text/ng-template" id="confermaRemove.html">          <div class="modal-header">              <button type="button" class="close" ng-click="cancel()" data-dismiss="modal" aria-hidden="true">&times;</button>              <h4 class="modal-title" id="myModalLabel">{{\'removeUser\' | translate}}</h4>          </div>          <div class="modal-body">             {{\'removeUserMsg\' | translate}} {{nome}}?          </div>          <div class="modal-footer">             <button type="button" class="btn btn-default" ng-click="cancel()" data-dismiss="modal">{{\'annulla\' | translate}}</button>             <button type="button" class="btn btn-primary" ng-click="remove()">{{\'rimuovi\' | translate}}</button>          </div>          </script>  </head>  <body ng-app="contactListManager">    <!--[if lt IE 7]>      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>    <![endif]-->    <!-- Add your site or application content here -->    <div ng-view=""></div>    <!--[if lt IE 9]>    <script src="bower_components/es5-shim/es5-shim.js"></script>    <script src="bower_components/json3/lib/json3.min.js"></script>    <![endif]-->    <!-- build:js scripts/vendor.js -->    <!-- bower:js -->    <script src="bower_components/jquery/dist/jquery.js"></script>    <script src="bower_components/angular/angular.js"></script>    <script src="bower_components/angular-animate/angular-animate.js"></script>    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>    <script src="bower_components/angular-route/angular-route.js"></script>    <!-- endbower -->    <!-- endbuild -->        <!-- build:js({.tmp,app}) scripts/scripts.js -->                <script src="scripts/app.js"></script>        <script src="scripts/controllers/main.js"></script>        <!-- endbuild --></body></html>' } 