global.jQuery = require('jquery');

var $ = jQuery;
var d3 = require('d3');

$.fn.polygraph = function(options) {
  this.each(function() { init(this, options); });
}

function init(polygraph, options) {
  var $polygraph = $(polygraph),
      svg = d3.select(polygraph).append('svg'),
      force = d3.layout.force()
        .size([$polygraph.innerWidth(), $polygraph.innerHeight()]);

  $polygraph.data('polygraph', {
    options: options,
    force: force
  });

  d3.json(options.graphPath, function(error, graph) {
    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

    var link = svg.selectAll('.polygraph__link')
        .data(graph.links)
      .enter().append('line')
        .attr('class', 'polygraph__link');

    var node = svg.selectAll('.polygraph__node')
        .data(graph.nodes)
      .enter().append('circle')
        .attr('class', 'polygraph__node')
        .attr('r', 5)
        .call(force.drag);

    node.append('title')
        .text(function(d) { return d.display; });

    force.on('tick', function() {
      link.attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

      node.attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });
    });
  });
}
