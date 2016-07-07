var d3 = require('d3');

exports.init = ({ rootSelector, graphPath }) => {
  var svg = d3.select(rootSelector).append('svg')
      force = d3.layout.force()
        .linkDistance(60)
        .charge(-200);

  resize(force);
  d3.select(window).on('resize', resize);

  function resize() {
    force
      .size([window.innerWidth, window.innerHeight])
      .resume();
  }

  d3.json(graphPath, function(error, graph) {
    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

    var link = svg.selectAll('.polygraph__link')
        .data(graph.links)
      .enter().append('line')
        .attr('class', 'polygraph__link');

    var nodeGroup = svg.selectAll('.polygraph__node')
        .data(graph.nodes)
      .enter().append('g')
        .attr('class', 'polygraph__node')
        .call(force.drag);
    nodeGroup.append('circle')
        .attr('class', 'polygraph__node__circle')
        .attr('r', 20);
    nodeGroup.append('text')
        .attr('class', 'polygraph__node__text')
        .text(function(d) { return d.display; });

    force.on('tick', tick);
    function tick() {
      link.attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

      nodeGroup.attr('transform',
        function(d){
          return 'translate(' + d.x + ',' + d.y + ')';
        });
    }
  });
}
