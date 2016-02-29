var express = require('express');
var router = express.Router();

var rawGraph = require('../graph.json'),
    graph = prepareGraph(rawGraph);
function prepareGraph(graph) {
  var nodes = [],
      links = [],
      nameMap = {};

  for (var i=0; i < graph.nodes.length; i++) {
    var sourceNode = graph.nodes[i],
        destNode = {
          display: sourceNode.display,
          index: i
        };
    nodes.push(destNode);
    nameMap[sourceNode.name] = destNode;
  }

  for (var i=0; i < graph.links.length; i++) {
    var sourceLink = graph.links[i],
        destLink = {
          source: nameMap[sourceLink[0]].index,
          target: nameMap[sourceLink[1]].index
        };
    links.push(destLink);
  }

  return {
    nodes: nodes,
    links: links
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('root', {
    title: 'polygraph',
    fullpage: true,
  });
});

router.get('/graph.json', function(req, res, next) {
  res.send(graph);
});

module.exports = router;
