'use strict';
const search = require('youtube-search');
const API_KEY = 'AIzaSyBcah3xTtWUqa0TfqCLRf_9X36S0KTOgJ4';

let playlist = [];
module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.get('/search', (req, res) => {
      console.log(res);
      var opts = {
        maxResults: 10,
        key: API_KEY,
        type: 'video'
      };
      search(req.query['q'], opts, function(err, results) {
        if(err) return console.log(err);

         res.send(results);
      });
  });

  router.post('/playlist', (req, res) => {
      const song = req.body.song;
      song.url = 'https://www.youtube.com/embed/' + song.id;
      playlist.push(req.body.song)
      res.send(playlist);
  });

  router.get('/playlist', (req, res) => {
      res.send(playlist);
  });

  server.use(router);
};
