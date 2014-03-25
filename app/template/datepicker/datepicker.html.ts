module datepicker { export var html =  '<table style="table-layout:fixed;" class="table-condensed">  <!-- secondary: last month, disabled: disabled -->  <thead class="text-center">    <tr>      <th style="overflow: hidden; min-width: 26px">        <button type="button" class="btn btn-xs btn-link" ng-click="move(-1)">           <span class="glyphicon glyphicon-chevron-left"> </span>         </button>      </th>      <th colspan="{{rows[0].length - 2 + showWeekNumbers}}"><button type="button" class="btn btn-md btn-link btn-block" ng-click="toggleMode()"><strong>{{title}}</strong></button></th></th>      <th style="overflow: hidden; min-width: 26px">        <button type="button" class="btn btn-xs btn-link" ng-click="move(1)">           <span class="glyphicon glyphicon-chevron-right"> </span>         </button>      </th>    </tr>    <tr ng-show="labels.length > 0">      <th class="text-center" ng-show="showWeekNumbers" style="overflow: hidden; min-width: 26px"><h6>#</h6></th>      <th class="text-center" ng-repeat="label in labels" style="overflow: hidden; min-width: 26px"><h6>{{label}}</h6></th>    </tr>  </thead>  <tbody>    <tr ng-repeat="row in rows">      <td ng-show="showWeekNumbers" class="text-center" style="overflow: hidden; min-width: 26px"><button type="button" class="btn btn-xs btn-link" disabled><strong><em>{{ getWeekNumber(row) }}</em></strong></button></td>      <td ng-repeat="dt in row" class="text-center" style="overflow: hidden; min-width: 26px">        <button type="button" style="width: 100%; border: 0px" class="btn btn-xs" ng-class="{\'btn-primary\': dt.selected, \'btn-default\': !dt.selected}" ng-click="select(dt.date)" ng-disabled="dt.disabled"><span ng-class="{\'text-muted\': dt.secondary && !dt.selected}">{{dt.label}}</span></button>      </td>    </tr>  </tbody></table>' } 