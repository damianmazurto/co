(function() {
  'use strict';

  angular
    .module('crossover')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, $http, $rootScope, API, $state) {
    var vm = this;

	vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  	vm.data = [300, 500, 100];

    vm.options = {
        responsive: true,
        maintainAspectRatio: false   
    };


    vm.customItemMap = {
	    sizeX: 'item.size.x',
	    sizeY: 'item.size.y',
	    row: 'item.position[0]',
	    col: 'item.position[1]',
	    minSizeY: 'item.minSizeY',
	    maxSizeY: 'item.maxSizeY'
	};

	vm.customItems = [
	  { size: { x: 10, y: 10 }, position: [0, 0], type:'salesmandata', chart:'pie'},
	  { size: { x: 10, y: 10 }, position: [0, 10], type:'lastyeardata', series: [], chart:'bar' },
	  { size: { x: 10, y: 10 }, position: [10, 0],  type:'topsalesorders',chart:'table' },
	  { size: { x: 10, y: 10 }, position: [10, 10], type:'topsalesmen', chart:'table'},
	];

	vm.getUserData = function(type) 
	{
		return $http({url: API + '/' + type,
                  method: 'GET',
                  params: {sessionid:$rootScope.user.sessionId}})    
      	.then(function (res) {        
	    	console.log(res) ; 
	    	return res.data ;  
      	}, function() {

      		 $localStorage.user = null ;
      		 $rootScope.user = null ;
        	 $state.go('login', {reload:true}) ;
      	});
	}

	vm.gridsterOpts = {
		width: 'auto',
		mobileModeEnabled: true,
		mobileBreakPoint: 500,
		columns: 20,
		resizable: {
                enabled: true,
//                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {

                },
                resize: function(event, $element, widget) {
                  $timeout(window.dispatchEvent(new Event('resize'), 2000));
                },
                stop: function(event, $element, widget) {                	
                  window.dispatchEvent(new Event('resize'));
                  $timeout(vm.resize, 500);
                  console.log('stop') ;
                }
             }
	}
	vm.resize = function() {
		
		window.dispatchEvent(new Event('resize'));
	}
	vm.remove = function(type) {
		for(var index in vm.customItems)
		{
			if(vm.customItems[index].type === type)
			{
				vm.customItems.splice(index, 1);
				break ;
			}
		}
		
	}

	vm.add = function(type) {
		var type = type ;

		vm.getUserData(type).then(function(res) {
			console.log(res) ;

			var labels = [] ;
			var data = [] ;

			if(res.data)
			{
				
				if(type == 'topsalesorders' || type == 'topsalesmen')
				{
					data = res.data ;

				}
				else
				{
					for(var index in res.data)
					{
						labels.push(res.data[index][0]) ;
						data.push(res.data[index][1]) ;
					}
				}
			}
			else
			{
				  $localStorage.user = null ;
				 $rootScope.user = null ;
        		 $state.go('login', {reload:true}) ;
			}

			for(var index in vm.customItems)
			{
				if(vm.customItems[index].type === type)
				{				
					if(type == 'lastyeardata') {data = [data] ;} 

					vm.customItems[index].data = data ;
					console.log(vm.customItems[index].data) ;
					vm.customItems[index].labels = labels ;
					return ;
				}
			}

			var chart = 'pie' ;
			var series = [] ;
			if(type == 'lastyeardata') {data = [data] ; chart='bar' ;} 
			if(type == 'topsalesorders' || type == 'topsalesmen') { chart='table' ;}
			console.log(vm.customItems) ;
			vm.customItems.push({ size: { x: 10, y: 10 }, position: [0, 0], type:type, data:data, series:series,chart:chart, labels:labels}) ;
			console.log(vm.customItems) ;
		})
		
	}

	vm.add('salesmandata') ;
	vm.add('lastyeardata') ;
	vm.add('topsalesorders') ;
	vm.add('topsalesmen') ;

	$(document).ready(function() {
		console.log('ok') ;

	
	})
  }


})();
