
$(function(){
  var Show = Backbone.Model.extend({

  });

  var ShowView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      var start_time = new Date(this.model.get('start_time'));
      $(this.el).html(''
        +'<td>'+start_time.toLocaleTimeString()+'</td>'
        +'<td>'+this.model.get('shows')[0].djs[0]+'</td>'
        +'<td>'
          +'<a href="/#/show/'+ this.model.get('shows')[0].show_id +'">'+this.model.get('shows')[0].show_name+'</a>'
          //+'<br /><br />'
          //+this.model.get('shows')[0].description
        +'</td>'
        +'<td>'+this.model.get('shows')[0].description+'</td>'
        //+'<td>'+this.model.get('shows')[0].genres+'</td>'

      );
      return this;
    }

  });
  
  var ShowGridView = Backbone.View.extend({
    tagName: 'div',
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      
      $(this.el).html(html)
      var html = '';
      var minutes = this.model.get('minutes');
      var start_time = new Date(this.model.get('start_time'));
      html += '<div class="event" style="height: ' + (minutes * 2 - 5) + 'px;" >';
      html += '<strong>' + start_time.toLocaleTimeString() + '</strong><br />';
      html += this.model.get('shows')[0].show_name
      if(this.model.get('shows')[1]){
        html += '<br /><br />Alternates With<br /><br />';
        html += this.model.get('shows')[1].show_name
      }
      html += '</div>';
      $(this.el).html(html)
      return this;
    }
  });


  var Schedule = Backbone.Collection.extend({
    model: Show,
    url: 'http://localhost:3000/schedule'
  });

  var schedule = new Schedule();

  var ScheduleView = Backbone.View.extend({ 
    el: $('#schedule-content'),
    events: {

    },
    initialize: function(){
      _.bindAll(this, 'render');

      this.collection = schedule;
      //this.collection.bind('add', this.appendShow);
      //this.render();
    },
    render: function(){
      var current_dotw = 0;
      
      _(this.collection.models).each(function(show){
        var showView = new ShowView({
          model: show
        });
        var dotw = show.get('dotw');
        $('table#dotw' + dotw + ' > tbody', this.el).append(showView.render().el);
      });
      return this;
    }
  });

  var ScheduleGridView = Backbone.View.extend({    
    el: $('#schedule > tbody'),
    events: {
      //'click button#add': 'addTrack'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'appendShow');

      this.collection = schedule;
      //this.collection.bind('add', this.appendShow);
      //this.render();
    },
    render: function(){
      //$('tbody', this.el).append('<tr><td colspan="5"><button id="add">Add track</button></td></tr>');
      /*
      var html = '<tr>';
      var current_time = new Date(0,0,0,0,0,0,0).getTime();
      _(this.collection.models).each(function(show){
        //appendSong(song);
        var start_time = new Date(show.get('start_time')).getTime();
        var end_time = new Date(show.get('end_time')).getTime();
        var time_diff = (end_time - start_time) / 1000; //time diff in seconds
        if(time_diff < 0){
          time_diff = time_diff + 24 * 60 * 60; //to deal with midnight = 00:00
        }
        var rowspan = Math.ceil(time_diff / (60 * 30)); //number of half hours in a show
        if(start_time > current_time){
          current_time = start_time;
          html += "</tr>\n<tr>";
        }
        html += '<td rowspan="'+rowspan+'">';
        //html += gridShowView.render();
        html += show.get('shows')[0].show_name;
        html += '</td>';
      }, this);
      html += '</tr>';
      $(this.el).append(html);
      */
      var current_dotw = 0;
      var html = '<tr>';
      html += '<td>';
      _(this.collection.models).each(function(show){
        var showGridView = new ShowGridView({
          model: show
        });
        if(show.get('dotw') > current_dotw){
          current_dotw = show.get('dotw');
          html += "</td>\n<td>";
        }
        //html += showGridView.render().el.html();
        var shows = show.get('shows');
        var minutes = show.get('minutes');
        var start_time = new Date(show.get('start_time'));
        html += '<div class="event" style="height: ' + (minutes * 2 - 5) + 'px;" >';
        html += '<strong>' + start_time.toLocaleTimeString() + '</strong><br />';
        html += '<a href="/#/show/'+ shows[0].show_id +'">';
        html +=  + shows[0].show_name;
        html += '</a>';
        if(show.get('shows')[1]){
          html += '<br /><br />Alternates with<br /><br />';
          html += '<a href="#">' + show.get('shows')[1].show_name + '</a>';
        }
        html += '</div>';
        
      });
      html += '</td>';
      html += '</tr>';
      $(this.el).html(html);
      return this;
    },
    appendShow: function(show){
      var gridShowView = new GridShowView({
        model: show
      });
      $(this.el).append(gridShowView.render().el);
    }
  });
  
  var scheduleView = new ScheduleView();
  var scheduleGridView = new ScheduleGridView();
  
  /* START PLAYLIST CODE */
  
  var Track = Backbone.Model.extend({

  });

  var TrackView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      var html = '<td>';
      if(this.model.get('artist')){
        html += '<strong>'+this.model.get('artist')+'</strong>';
      }
      if(this.model.get('artist') && this.model.get('song')){
        html += ' - ';
      }
      if(this.model.get('song')){
        html += '"'+this.model.get('song')+'"';
      }
      if(this.model.get('album')){
        html += ' on <em>'+this.model.get('album')+'</em>';
      }
      if(this.model.get('label')){
        html += ' ('+this.model.get('label')+')';
      }
      html += '</td>';
      $(this.el).html(html);
      return this;
    }
  });


  var Tracks = Backbone.Collection.extend({
    model: Track,
    url: "http://localhost:3000/show/1855/playlist/2011-12-12"
  });

  var tracks = new Tracks();

  var PlaylistView = Backbone.View.extend({    
    el: $('table#playlist > tbody'),
    initialize: function(){
      _.bindAll(this, 'render');

      this.collection = tracks;
      this.render();
    },
    render: function(){
      _(this.collection.models).each(function(track){
        var trackView = new TrackView({
          model: track
        });
        $(this.el).append(trackView.render().el);
        if(track.get('airbreak_after')){
          $(this.el).append('<tr><td><center><strong>Airbreak</strong></center></td></tr>')
        }
      }, this);
    },
  });
  
  var playlistView = new PlaylistView();

  var Workspace = Backbone.Router.extend({
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
          tracks.add(data);
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
          schedule.add(data);
          scheduleView.render();
          scheduleGridView.render();
          $('#schedule_container').show();
        }
      });
    }
  });
  
  var workspace = new Workspace;
  
  Backbone.history.start();

});