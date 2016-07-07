var d3 = require('d3');

var defaultOptions = {
  graphPath: null,

  rootSelector: '.polygraph',
  linkClass: 'polygraph__link',
  nodeClass: 'polygraph__node',
  nodeCircleClass: 'polygraph__node__circle',
  nodeTextClass: 'polygraph__node__text',
  selectedClass: 'selected',

  linkDistance: 60,
  linkCharge: -200,
  nodeRadius: 20,
  restartAlpha: 0.1
};

function Polygraph(userOptions) {
  this.options = extend({}, defaultOptions, userOptions);
  this.rootNode = d3.select(this.options.rootSelector);
  this.selected = null;

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
  this.simulation = d3.forceSimulation(this.graph.nodes)
    .force('link', d3.forceLink(this.graph.links)
          .distance(this.options.linkDistance)
          .id(function(node) { return node.id; }))
    .force('charge', d3.forceManyBody()
          .strength(this.options.linkCharge))
    .force('gravityx', d3.forceX())
    .force('gravityy', d3.forceY());
};

// We have DOM. Configure it and start the sim.

Polygraph.prototype.domLoaded = function() {
  this.initDom();
  this.setSize();
  this.registerHandlers();
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
      .attr('class', this.options.nodeCircleClass)
      .attr('r', this.options.nodeRadius);
  this.nodeGroup.append('text')
      .attr('class', this.options.nodeTextClass)
      .text(function(d) { return d.display; });
};

Polygraph.prototype.registerHandlers = function() {
  var self = this;

  d3.select(window).on('resize', this.setSize.bind(this));

  /* Distinguish between click and drag.
   * See: http://bl.ocks.org/mbostock/a84aeb78fea81e1ad806 */
  this.svg.on('touchstart', function() { d3.event.preentDefault(); });
  this.svg.on('touchmove', function() { d3.event.preentDefault(); });

  this.svg.call(d3.drag()
      .subject(this.dragSubject.bind(this))
      .on('start', this.dragStart.bind(this))
      .on('drag', this.dragMoved.bind(this))
      .on('end', this.dragEnd.bind(this)));

  this.simulation.on('tick', this.tick.bind(this));
  this.nodeGroup.on('click', function(d) { return self.click(this, d); });
};

Polygraph.prototype.dragSubject = function() {
  var simCoords = this.px2sim(d3.event.x, d3.event.y);
  return this.simulation.find(simCoords.x, simCoords.y, this.options.nodeRadius);
};

Polygraph.prototype.dragStart = function() {
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
  this.simulation.alpha(this.options.restartAlpha).restart();
};

Polygraph.prototype.dragMoved = function() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
};

Polygraph.prototype.dragEnd = function() {
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
};

Polygraph.prototype.click = function(elt, d) {
  if (d3.event.defaultPrevented) {
    return;
  }
  this.select(elt, d);
  
};

  d3.select(elt).classed(this.options.selectedClass, true);
  this.selected = {
    elt: elt,
    d: d
  };
}

Polygraph.prototype.deselect = function() {
  if (this.selected) {
    d3.select(this.selected.elt).classed(this.options.selectedClass, false);
    this.selected = null;
  }
}

Polygraph.prototype.px2sim = function(x, y) {
  return {
    x: x - this.width / 2,
    y: y - this.height / 2
  }
}

Polygraph.prototype.sim2px = function(x, y) {
  return {
    x: x + this.width / 2,
    y: y + this.height / 2
  }
}

Polygraph.prototype.tick = function() {
  this.link.attr('x1', function(d) { return d.source.x; });
  this.link.attr('y1', function(d) { return d.source.y; });
  this.link.attr('x2', function(d) { return d.target.x; });
  this.link.attr('y2', function(d) { return d.target.y; });

  this.nodeGroup.attr('transform',
    function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
};

Polygraph.prototype.setSize = function() {
  this.width = window.innerWidth,
  this.height = window.innerHeight;
  this.svg.attr('viewBox',
      [-this.width / 2, -this.height / 2, this.width, this.height].join(' '));
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
};

module.exports = Polygraph;
