var d3 = require('d3');

var defaultOptions = {
  graphPath: null,

  rootSelector: '.polygraph',
  linkClass: 'polygraph__link',
  nodeClass: 'polygraph__node',
  nodeCircleClass: 'polygraph__node__circle',
  nodeTextClass: 'polygraph__node__text',

  linkDistance: 60,
  linkCharge: -200,
  nodeRadius: 20
};

function Polygraph(userOptions) {
  this.options = extend({}, defaultOptions, userOptions);
  this.rootNode = d3.select(this.options.rootSelector);

  d3.json(this.options.graphPath, this.dataLoaded.bind(this));
};

// We have data. Init what we can of the sim.

Polygraph.prototype.dataLoaded = function(error, graph) {
  this.graph = graph;

  this.initSimulation();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', this.domLoaded.bind(this));
  } else {
    this.domLoaded();
  }
};

Polygraph.prototype.initSimulation = function() {
  this.simulation = d3.layout.force()
        .linkDistance(this.options.linkDistance)
        .charge(this.options.linkCharge);
  this.simulation
    .nodes(this.graph.nodes)
    .links(this.graph.links);
  this.setSize();
};

// We have DOM. Configure it and start the sim.

Polygraph.prototype.domLoaded = function() {
  this.initDom();
  this.registerHandlers();
  this.simulation.start();
};

Polygraph.prototype.initDom = function() {
  this.svg = this.rootNode.append('svg');

  this.link = this.svg.selectAll('.' + this.options.linkClass)
      .data(this.graph.links)
    .enter().append('line')
      .attr('class', this.options.linkClass);

  this.nodeGroup = this.svg.selectAll('.' + this.options.nodeClass)
      .data(this.graph.nodes)
    .enter().append('g')
      .attr('class', this.options.nodeClass);
  this.nodeGroup.append('circle')
          .attr({
            'class': this.options.nodeCircleClass,
            r: this.options.nodeRadius
          });
  this.nodeGroup.append('text')
          .attr('class', this.options.nodeTextClass)
          .text(function(d) { return d.display; });
};

Polygraph.prototype.registerHandlers = function() {
  this.nodeGroup.call(this.simulation.drag);
  d3.select(window).on('resize', this.resize.bind(this));
  this.simulation.on('tick', this.tick.bind(this));
};

Polygraph.prototype.resize = function() {
  this.setSize();
  this.simulation.resume();
};

Polygraph.prototype.setSize = function() {
  this.simulation.size([window.innerWidth, window.innerHeight]);
};

Polygraph.prototype.tick = function() {
  this.link.attr({
    x1: function(d) { return d.source.x; },
    y1: function(d) { return d.source.y; },
    x2: function(d) { return d.target.x; },
    y2: function(d) { return d.target.y; }
  });

  this.nodeGroup.attr('transform',
    function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
};

// Poor-man's _.extend until we use enough lodash to actually require it
function extend(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

module.exports = Polygraph;
