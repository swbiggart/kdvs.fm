
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.playlist = function(req, res){
  res.render('playlist', { title: 'Playlist' });
};

exports.ajax = function(req, res){
  res.render('ajax.json', {layout: false});
};