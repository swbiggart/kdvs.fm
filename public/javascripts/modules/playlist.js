(function(Playlist) {
  Playlist.Track = Backbone.Model.extend({

  });
  
  var track = new Playlist.Track();

  Playlist.TrackView = Backbone.View.extend({
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


  Playlist.Tracks = Backbone.Collection.extend({
    model: Playlist.Track,
    url: "http://localhost:3000/show/1855/playlist/2011-12-12"
  });

  var tracks = new Playlist.Tracks();

  Playlist.View = Backbone.View.extend({    
    el: $('table#playlist > tbody'),
    initialize: function(){
      _.bindAll(this, 'render');

      this.collection = tracks;
      //this.render();
    },
    render: function(){
      _(this.collection.models).each(function(track){
        var trackView = new Playlist.TrackView({
          model: track
        });
        $(this.el).append(trackView.render().el);
        if(track.get('airbreak_after')){
          $(this.el).append('<tr><td><center><strong>Airbreak</strong></center></td></tr>')
        }
      }, this);
    },
  });
})(app.module("playlist"));