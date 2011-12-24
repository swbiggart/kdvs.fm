
$(function(){
  
  Backbone.sync = function(method, model, success, error){
    success();
  }
  
  var Track = Backbone.Model.extend({
    defaults: {
      artist: '',
      song: '',
      album: '',
      track: '',
      label: '',
      comments: '',
      airbreak_after: false
    }
  });
  
  var TrackView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      $(this.el).html(' \
        <td>'+this.model.get('track')+'</td> \
        <td>'+this.model.get('album')+'</td> \
        <td>'+this.model.get('artist')+'</td> \
        <td>'+this.model.get('song')+'</td> \
        <td>'+this.model.get('label')+'</td> \
      ');
      return this;
    }
  });
  
  var Playlist = Backbone.Collection.extend({
    model: Track
  });
  
  var PlaylistView = Backbone.View.extend({    
    el: $('table#playlist'),
    events: {
      'click button#add': 'addTrack'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addTrack', 'appendSong');
      
      this.collection = new Playlist();
      this.collection.bind('add', this.appendSong);
      
      this.counter = 0;
      this.render();
    },
    render: function(){
      //$('tbody', this.el).append('<tr><td colspan="5"><button id="add">Add track</button></td></tr>');
      _(this.collection.models).each(function(song){
        appendSong(song);
      }, this);
    },
    addTrack: function(){
      this.counter++;
      var track = new Track();
      track.set({
        track: this.counter
      });
      this.collection.add(track);
    },
    appendSong: function(track){
      var trackView = new TrackView({
        model: track
      });
      $('tbody', this.el).append(trackView.render().el);
    }
  });
  var playlistView = new PlaylistView();
    
  //should be relplaced with Backbone sync
  $.ajax({
    url: "/ajax",
    dataType: 'json',
    success: function(data){
      playlistView.collection.add(data.playlist);
    }
  });
});