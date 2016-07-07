'use strict';

var express = require('express');
var models = require('../models/index');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('root', {
    title: 'polygraph',
    fullpage: true,
  });
});

router.get('/graph.json', function(req, res, next) {
  var people = models.Person.findAll();
  var links = models.Link.findAll();

  Promise.all([people, links]).then(function(values) {
    var people = values[0],
        links = values[1];
    res.send(createGraph(people, links));
  });
});

function createGraph(people, links) {
  return {
    nodes: people.map((person) => {
             id: person.id,
             display: person.display
           }),
    links: links.map((link) => {
             id: link.id,
             source: link.personAId,
             target: link.personBId
           })
  };
}

module.exports = router;
