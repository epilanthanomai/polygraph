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
  var nodeList = [],
      nodeMap = {};

  for (var i = 0; i < people.length; i++) {
    var person = people[i],
        node = {
          index: i,
          id: person.id,
          display: person.display
        };
    nodeList.push(node);
    nodeMap[person.id] = i;
  }

  var linkList = links.map((link) => {
    return {
      id: link.id,
      source: nodeMap[link.personAId],
      target: nodeMap[link.personBId]
    };
  });

  return {
    nodes: nodeList,
    links: linkList
  };
}

module.exports = router;
