(function(Show) {
  Show.Model = Backbone.Model.extend({

  });

  Show.View = Backbone.View.extend({
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
  
})(app.module("show"));