var d3 = require('d3');

function Polygraph({ rootSelector, graphPath }) {
  this.rootSelector = rootSelector;
  this.graphPath = graphPath;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', self.domLoaded.bind(this));
  } else {
    this.domLoaded();
  }
}

Polygraph.prototype.domLoaded = function() {
  this.svg = d3.select(this.rootSelector).append('svg');
  this.force = d3.layout.force()
        .linkDistance(60)
        .charge(-200);

  this.resize();
  d3.select(window).on('resize', this.resize.bind(this));
  d3.json(this.graphPath, this.dataLoaded.bind(this));
};

Polygraph.prototype.resize = function() {
  this.force
    .size([window.innerWidth, window.innerHeight])
    .resume();
};

Polygraph.prototype.dataLoaded = function(error, graph) {
  this.force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

  this.link = this.svg.selectAll('.polygraph__link')
      .data(graph.links)
    .enter().append('line')
      .attr('class', 'polygraph__link');

  this.nodeGroup = this.svg.selectAll('.polygraph__node')
      .data(graph.nodes)
    .enter().append('g')
      .attr('class', 'polygraph__node')
      .call(this.force.drag);
  this.nodeGroup.append('circle')
          .attr('class', 'polygraph__node__circle')
          .attr('r', 20);
  this.nodeGroup.append('text')
          .attr('class', 'polygraph__node__text')
          .text(function(d) { return d.display; });

  this.force.on('tick', this.tick.bind(this));
};

Polygraph.prototype.tick = function() {
  this.link.attr('x1', function(d) { return d.source.x; })
           .attr('y1', function(d) { return d.source.y; })
           .attr('x2', function(d) { return d.target.x; })
           .attr('y2', function(d) { return d.target.y; });

  this.nodeGroup.attr('transform',
    function(d){
      return 'translate(' + d.x + ',' + d.y + ')';
    });
};

module.exports = Polygraph;
