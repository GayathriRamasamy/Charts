import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  data = [
    {
      id: 1, name: 'Medical Incident', value: 1068, group: 'A'
    },
    {
      id: 17, name: 'Medical 4', value: 600, group: 'A'
    },
    {
      id: 3, name: 'Fire', value: 723, group: 'A'
    },
    {
      id: 11, name: 'Assist Police', value: 2, group: 'A'
    },
    {
      id: 12, name: 'Sample 1', value: 733, group: 'A'
    },
    {
      id: 6, name: 'Citizen Assist / Service Call', value: 271, group: 'A'
    },
    {
      id: 22, name: 'Medical 9', value: 1234, group: 'A'
    },
    {
      id: 19, name: 'Medical 6', value: 5634, group: 'A'
    },
    {
      id: 15, name: 'Medical 1', value: 128, group: 'A'
    },
    {
      id: 2, name: 'Alarms', value: 9702, group: 'B'
    },
    {
      id: 4, name: 'Vehicle - Related', value: 438, group: 'B'
    },
    {
      id: 13, name: 'Medical Group B', value: 650, group: 'B'
    },
    {
      id: 7, name: 'Environmental Hazard', value: 204, group: 'B'
    },
    {
      id: 10, name: 'Assist Policeq', value: 34, group: 'B'
    },
    {
      id: 18, name: 'Medical 5', value: 2900, group: 'B'
    },

    {
      id: 20, name: 'Medical 7', value: 1068, group: 'B'
    },
    {
      id: 5, name: 'Other', value: 379, group: 'C'
    },
    {
      id: 8, name: 'Rescue', value: 91, group: 'C'
    },
    {
      id: 9, name: 'Rescue12', value: 700, group: 'C'
    },
    {
      id: 14, name: 'Medical Group C', value: 823, group: 'C'
    },

    {
      id: 16, name: 'Medical 2', value: 254, group: 'C'
    },
    {
      id: 21, name: 'Medical 8', value: 2312, group: 'C'
    }

  ];
  pack = d3.pack()
    .size([400, 400])
    .padding(1.3);
  root = d3.hierarchy({ children: this.data })
    .sum(function (d) {
      return d.value;
    });

  values = this.pack(this.root).leaves();


  constructor() {
    this.values = this.values.sort((a, b) => {
      return a.value - b.value;
    });
  }
  ngOnInit() {
    console.log(this.pack(this.root).leaves())
    let svg = null;
    svg = d3.select('svg');
    // this.drawChart(false, svg);
  }

  onBubbleSelected(d) {
    console.log(d)
  }
  getColor(d) {
    if (d && d.data.group === 'A') {
      return '#1976d2';
    } else if (d.data.group === 'B') {
      return '#1cd219';
    } else {
      return '#d27f19';
    }
  }
  normalChart() {
    let svg;
    svg = d3.select('svg');
    svg.selectAll('*').remove();
    this.drawChart(false, svg);
  }
  onClick(e) {
    console.log(e)
    let svg;
    svg = d3.select('svg');
    svg.selectAll('*').remove();
    this.drawChart(true, svg);
  }
  drawChart(id, svg) {

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const center = { x: width / 2, y: height / 2 };
    const damper = 0.01;
    const year_centers = {
      A: { x: width / 3, y: height / 2 },
      B: { x: width / 2, y: height / 2 },
      C: { x: 2 * width / 3, y: height / 2 }
    };
    let nodes = [];
    const max_amount = d3.max(this.data, function (d) { return parseInt(d.value, 10); });
    const radius_scale = d3.scalePow().exponent(0.5).domain([0, max_amount]).range([2, 85]);
    this.data.forEach(function (d) {
      const node = {
        id: d.id,
        radius: radius_scale(d.value),
        value: d.value,
        name: d.name,
        group: d.group,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
      nodes.push(node);
    });
    nodes.sort(function (a, b) { return b.value - a.value; });

    svg.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .attr('dy', '0.4em')
      .attr('text-anchor', 'start')
      .style('font-size', '12px')
      .text('Bubble Chart');
    const color = d3.scaleOrdinal()
      .domain(['A', 'B', 'C'])
      .range(['#1976d2', '#1cd219', '#d27f19']);

    // .attr("id", (d) => "bubble_#{d.name}")
    // const pack = d3.pack()
    //   .size([width, height])
    //   .padding(1);
    // let circlePack = data =>
    //   d3
    //     .pack()
    //     .size([width, height])
    //     .padding(0)(
    //       d3.hierarchy({ children: data }).sum(hierarchyData => {
    //         return hierarchyData[`name`];
    //       })
    //     );
    // let pack = circlePack(nodes);
    //   const root = d3.hierarchy({ children: this.data })
    //     .sum(function (d) { return d.value; });
    //   const node = svg.selectAll('.node')
    //     .data(pack(root).leaves())
    //     .enter();
    //   node.append('circle')
    //     .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
    //     .attr('id', function (d) { return d.id; })
    //     .attr('r', function (d) { return d.r; })
    //     .style('fill', function (d) { return color(d.data.group); });
    // }
    // const root = d3.hierarchy({ children: this.data })
    //   .sum(function(d) { return d.value; });
    //     var pack = d3.pack()
    //       .size([width / 2, height / 2])
    //       .padding(10)(
    //         d3.hierarchy(nodes).sum(hierarchyData => {
    //             return hierarchyData[`value`];
    //         })
    //       );
    // console.log(pack)
    // nodes = d3.hierarchy(nodes)
    // .sum(function (d) { return d.value; });
    const node = svg.selectAll('circle')
      .data(nodes, function (d) { return d.id; })
      // .data(pack.descendants())
      // .data(pack(root).leaves())
      .enter();
    const circles = node.append('circle')
      .attr('r', function (data) {
        return data.radius;
      })
      .attr('fill', (d) => color(d.group))
      .attr('stroke-width', 2)
      .attr('stroke', (d) => d3.rgb(color(d.group)).darker());
    // const bubble = node
    //   .append('circle');
    // bubble
    //   .style('fill', (data, index) => {
    //     return color(data.data.group);

    //   })
    //   .attr('r', function (data, index) {
    //     return data.r;
    //   })
    //   .attr('cx', function (data, index) {
    //     return data.x;
    //   })
    //   .attr('cy', function (data, index) {
    //     console.log('bubl', data)
    //     return data.y;
    //   });

    // const circles = svg.selectAll('circle')
    //   .data(nodes, function(d) {
    //     return d;
    //   });

    // circles.enter().append('circle')
    //   .attr('r', function(d) { return d.radius; })
    //   .attr('fill', function(d) { return color(d.group); })
    //   .attr('stroke-width', 2)
    //   .attr('stroke', function(d) { return d3.rgb(color(d.group)).darker(); })
    //   .attr('id', function(d) { return 'bubble_' + d.id; });
    // circles.transition().duration(2000).attr('r', function(d) { return d.radius; });
    let simulation;

    const forceX = d3.forceX(width / 2).strength(-0.00001);
    const forceY = d3.forceY(height / 2).strength(-0.00001);

    if (id) {
      simulation = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force(
          'collision',
          d3.forceCollide().radius(function (data) {
            return +data.radius;
          }))
        .force('charge', d3.forceManyBody().strength(100).distanceMax(0).distanceMin(0));
    } else {
      simulation = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force(
          'collision',
          d3.forceCollide().radius(function (data) {
            return +data.radius;
          }).strength(1))
        .force('charge', d3.forceManyBody().strength(100).distanceMax(0).distanceMin(0));
    }
    simulation.nodes(nodes);

    function move_towards_center(alpha) {
      return function (d) {
        d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha;
        d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha;
      };
    }
    function move_towards_group(alpha) {
      return function (d) {
        const target = year_centers[d.group];
        d.x = d.x + (target.x - d.x) * (damper + 0.02) * alpha * 5.1;
        d.y = d.y + (target.y - d.y) * (damper + 0.02) * alpha * 2.1;
      };
    }
    function totalSort(alpha) {
      var that = this;
      return function (d) {
        this.boundingRadius = radiusScale(this.totalValue);
        this.centerX = this.width / 2;
        this.centerY = 300;
        var targetY = this.centerY;
        var targetX = this.width / 2;

        if (d.isNegative) {
          if (d.changeCategory > 0) {
            d.x = -200
          } else {
            d.x = 1100
          }
        }

        // if (d.positions.total) {
        //   targetX = d.positions.total.x
        //   targetY = d.positions.total.y
        // };



        // 
        d.y = d.y + (targetY - d.y) * (0.1 + 0.02) * alpha
        d.x = d.x + (targetX - d.x) * (0.1 + 0.02) * alpha

      };
    }

    function gravity(k) {
      return function (d) {
        if (typeof (d.tx) !== "undefined") {
          d.x = d.x + (d.tx - d.x) * k;
          d.y = d.y + (d.ty - d.y) * k;
        }
      };
    }

    function collide(k) {
      var q = d3.quadtree(nodes);
      return function (node) {
        var nr = node.r,
          nx1 = node.x - nr,
          nx2 = node.x + nr,
          ny1 = node.y - nr,
          ny2 = node.y + nr;
        q.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== node)) {
            var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = x * x + y * y,
              r = nr + quad.point.r;

            if (l < r * r) {
              l = ((l = Math.sqrt(l)) - r) / l * k;
              node.x -= x *= l;
              node.y -= y *= l;
              //bind(node)
              quad.point.x += x;
              quad.point.y += y;
              //bind(quad.point)
              //if (node.x-node.r<200) {node.x=node.r+200+x;}
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
    function radiusScale(n) {
      let rScale = d3.scalePow().exponent(0.5).domain([0, 1000000000]).range([1, 90])
      return rScale(Math.abs(n));
    };
    function buoyancy(alpha) {
      var that = this;
      return function (d) {
        this.boundingRadius = radiusScale(this.totalValue);
        this.centerX = this.width / 2;
        this.centerY = 300;
        // d.y -= 1000 * alpha * alpha * alpha * d.changeCategory

        // if (d.changeCategory >= 0) {
        //   d.y -= 1000 * alpha * alpha * alpha
        // } else {
        //   d.y += 1000 * alpha * alpha * alpha
        // }
        // centerX: null,
        // centerY: null,
        // scatterPlotY: null,

        // //d3 settings
        // defaultGravity: 0.1,

        var targetY = this.centerY * this.boundingRadius
        d.y = d.y + (targetY - d.y) * (0.1) * alpha * alpha * alpha * 100



      };
    }



    simulation.on('tick', function () {
      if (id) {
        circles
          .each(totalSort(this.alpha()))
          .each(buoyancy(this.alpha()))
          // .each(move_towards_group(this.alpha()))
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) { return d.y; });
      } else {
        circles
          .each(move_towards_center(this.alpha()))
          // .each(gravity(this.alpha() * 0.5))
          // .each(collide(0.1))
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) { return d.y; });
      }
    });

  }
}
