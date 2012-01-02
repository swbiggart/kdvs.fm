var app = {
 // Create this closure to contain the cached modules
 module: function() {
    // Internal module cache.
    var modules = {};
  
    // Create a new module reference scaffold or load an
    // existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return modules[name] = { Views: {} };
    };
  }()
};

jQuery(function($) {

  var Schedule = app.module("schedule");
  var Playlist = app.module("playlist");
  
  var scheduleView = new Schedule.View();
  var scheduleGridView = new Schedule.GridView();
  var playlistView = new Playlist.View();


  var Router = Backbone.Router.extend({
    routes: {
      "/schedule":              "schedule",
      "/about":                 "about",    // #help
      "/show/:show_id":         "show",  // #search/kiwis
      "/show/:show_id/:date":   "show"   // #search/kiwis/p7
    },

    about: function() {
      alert('about!');
    },

    show: function(show_id, date) {
      
      //should be relplaced with Backbone sync
      //playlistView.collection.fetch({dataType: 'jsonp'});
      $('#schedule_container').hide();
      //playlist.fetch({dataType: 'jsonp'});
      //$('#playlist_container').show();
      
      $.ajax({
        //url: "/ajax",
        url: 'http://localhost:3000/show/' + show_id + '/playlist/2011-12-12',
        dataType: 'jsonp',
        success: function(data){
          playlistView.collection.add(data);
          playlistView.render();
          $('#playlist_container').show();
        }
      });
      
    },
    schedule: function(){
      $('#playlist_container').hide();
      $.ajax({
        //url: "/ajax",
        url: 'http://localhost:3000/schedule',
        dataType: 'jsonp',
        success: function(data){
          scheduleView.collection.add(data);
          scheduleView.render();
          var today = new Date();
          var dotw = today.getDay();
          $('#tab_dotw'+dotw).addClass('active');
          $('#dotw'+dotw).addClass('active');
          scheduleGridView.render();
          $('#schedule_container').show();
        }
      });
    }
  });
  // Initialize it into the application namespace
  app.router = new Router();
  // Start tracking history
  Backbone.history.start();

});