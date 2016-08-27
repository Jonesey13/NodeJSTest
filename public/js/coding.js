var app = angular.module('CodingBlog', []);

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

app.controller('BlogController', function TestController($scope, $http, $location) {
  var search_obj = QueryStringToJSON();
  
  $http.get("/text/pagedata")
    .then(function(response) {
      var blog_entries = response.data;
      $scope.totalpages = blog_entries.length;
      var blog_entry = search_obj.page || blog_entries[0].filename;
      var blog_entry_number = _.findIndex(blog_entries, function(o) {return o.filename === blog_entry});
      $scope.current_entry = blog_entries[blog_entry_number];
      
      var prev_entry = blog_entries[blog_entry_number - 1];
      var next_entry = blog_entries[blog_entry_number + 1];      
      $scope.prev = {
	available: blog_entry_number !== 0,
	value: prev_entry && prev_entry.filename
      };
      $scope.next = {
	available: blog_entry_number !== $scope.totalpages - 1,
	value: next_entry && next_entry.filename
      };

      $http.get("/text/page/" + blog_entry)
	.then(function(response) {
	  $scope.response = response.data;
	  $scope.ready = true;
	});      
      
      $scope.$watch( "response" , function(n,o){  
	if(n==o) return;
	
	$scope.$evalAsync(
	  function( $scope ) {
	    angular.element('pre code').each(function(i, block) {
	      hljs.highlightBlock(block);
	    });
	  }
	);
      });
    });
});

function QueryStringToJSON() {            
    var pairs = location.search.slice(1).split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}
