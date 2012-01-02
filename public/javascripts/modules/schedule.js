(function(Schedule) {

  // Dependencies
  var Show = app.module("show");

  Schedule.Collection = Backbone.Collection.extend({
    model: Show.Model,
    url: 'http://localhost:3000/schedule'
  });

  var schedule = new Schedule.Collection();

  Schedule.View = Backbone.View.extend({ 
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
        var showView = new Show.View({
          model: show
        });
        var dotw = show.get('dotw');
        $('table#dotw' + dotw + ' > tbody', this.el).append(showView.render().el);
      });
      return this;
    }
  });

  Schedule.GridView = Backbone.View.extend({    
    el: $('#schedule > tbody'),
    events: {
      //'click button#add': 'addTrack'
    },
    initialize: function(){
      _.bindAll(this, 'render');

      this.collection = schedule;
      //this.collection.bind('add', this.appendShow);
      //this.render();
    },
    render: function(){
      var current_dotw = 0;
      var html = '<tr>';
      html += '<td>';
      _(this.collection.models).each(function(show){
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
      $(this.el).append(html);
      return this;
    }
  });
})(app.module("schedule"));