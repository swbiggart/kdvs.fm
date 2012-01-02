
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'KDVS.fm' });
};

exports.playlist = function(req, res){
  res.render('playlist', { title: 'KDVS.fm' });
};

exports.ajax = function(req, res){
  res.render('ajax.json', {layout: false});
};

