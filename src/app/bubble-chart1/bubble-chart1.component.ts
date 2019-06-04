import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bubble-chart1',
  templateUrl: './bubble-chart1.component.html',
  styleUrls: ['./bubble-chart1.component.css']
})
export class BubbleChart1Component implements OnInit {

  height = 200;
  width = 200;
  svg: any;
  data: any[] = [];
  dataSet;
  force: any;
  defaultGravity = 0.1;
  totalValue = 3700000000;
  boundingRadius: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.drawChart();
    this.convertData();

  }
  radiusScale(n) {
    const rScale = d3.scalePow().exponent(0.5).domain([0, 10000]).range([1, 90]);
    return rScale(Math.abs(n));
  }
  getData() {
    const data = [
      {
        id: 1, name: 'Medical Incident', value: 1068, group: 1, category: 'A'
      },
      {
        id: 17, name: 'Medical 4', value: 600, group: 1, category: 'A'
      },
      {
        id: 3, name: 'Fire', value: 7, group: 1, category: 'A'
      },
      {
        id: 11, name: 'Assist Police', value: 2, group: 1, category: 'A'
      },
      {
        id: 12, name: 'Sample 1', value: 733, group: 4, category: 'A'
      },
      {
        id: 6, name: 'Citizen Assist / Service Call', value: 271, group: 1, category: 'A'
      },
      {
        id: 22, name: 'Medical 9', value: 1234, group: 1, category: 'A'
      },
      {
        id: 19, name: 'Medical 6', value: 5634, group: 1, category: 'A'
      },
      {
        id: 15, name: 'Medical 1', value: 128, group: 4, category: 'A'
      },
      {
        id: 2, name: 'Alarms', value: 9702, group: 2, category: 'C'
      },
      {
        id: 4, name: 'Vehicle - Related', value: 438, group: 4, category: 'C'
      },
      {
        id: 13, name: 'Medical Group B', value: 650, group: 2, category: 'C'
      },
      {
        id: 7, name: 'Environmental Hazard', value: 204, group: 2, category: 'C'
      },
      {
        id: 10, name: 'Assist Policeq', value: 34, group: 2, category: 'C'
      },
      {
        id: 18, name: 'Medical 5', value: 2900, group: 2, category: 'C'
      },

      {
        id: 20, name: 'Medical 7', value: 1068, group: 2, category: 'C'
      },
      {
        id: 5, name: 'Other', value: 379, group: 3, category: 'B'
      },
      {
        id: 8, name: 'Rescue', value: 91, group: 3, category: 'B'
      },
      {
        id: 9, name: 'Rescue12', value: 700, group: 3, category: 'B'
      },
      {
        id: 14, name: 'Medical Group C', value: 823, group: 4, category: 'B'
      },

      {
        id: 16, name: 'Medical 2', value: 254, group: 3, category: 'B'
      },
      {
        id: 21, name: 'Medical 8', value: 2312, group: 3, category: 'B'
      },
      {
        id: 1, name: 'Medical Incident', value: 1068, group: 1, category: 'A'
      },
      {
        id: 17, name: 'Medical 4', value: 600, group: 1, category: 'A'
      },
      {
        id: 3, name: 'Fire', value: 723, group: 1, category: 'A'
      },
      {
        id: 11, name: 'Assist Police', value: 2, group: 1, category: 'A'
      },
      {
        id: 12, name: 'Sample 1', value: 733, group: 5, category: 'A'
      },
      {
        id: 6, name: 'Citizen Assist / Service Call', value: 271, group: 1, category: 'A'
      },
      {
        id: 22, name: 'Medical 9', value: 1234, group: 1, category: 'A'
      },
      {
        id: 19, name: 'Medical 6', value: 5634, group: 5, category: 'A'
      },
      {
        id: 15, name: 'Medical 1', value: 128, group: 1, category: 'A'
      },
      {
        id: 2, name: 'Alarms', value: 9702, group: 2, category: 'C'
      },
      {
        id: 4, name: 'Vehicle - Related', value: 438, group: 2, category: 'C'
      },
      {
        id: 13, name: 'Medical Group B', value: 650, group: 2, category: 'C'
      },
      {
        id: 7, name: 'Environmental Hazard', value: 204, group: 2, category: 'C'
      },
      {
        id: 10, name: 'Assist Policeq', value: 34, group: 5, category: 'C'
      },
      {
        id: 18, name: 'Medical 5', value: 2900, group: 2, category: 'C'
      },

      {
        id: 20, name: 'Medical 7', value: 1068, group: 2, category: 'C'
      },
      {
        id: 5, name: 'Other', value: 379, group: 3, category: 'B'
      },
      {
        id: 8, name: 'Rescue', value: 91, group: 5, category: 'B'
      },
      {
        id: 9, name: 'Rescue12', value: 700, group: 3, category: 'B'
      },
      {
        id: 14, name: 'Medical Group C', value: 823, group: 3, category: 'B'
      },

      {
        id: 23, name: 'Medical 2', value: 254, group: 3, category: 'B'
      },
      {
        id: 24, name: 'Medical 8', value: 2312, group: 3, category: 'B'
      }
      ,
      {
        id: 31, name: 'Medical Incident', value: 1068, group: 1, category: 'A'
      },
      {
        id: 25, name: 'Medical 4', value: 600, group: 1, category: 'A'
      },
      {
        id: 26, name: 'Fire', value: 723, group: 1, category: 'A'
      },
      {
        id: 27, name: 'Assist Police', value: 2, group: 5, category: 'A'
      },
      {
        id: 28, name: 'Sample 1', value: 733, group: 5, category: 'A'
      },
      {
        id: 36, name: 'Citizen Assist / Service Call', value: 271, group: 1, category: 'A'
      },
      {
        id: 29, name: 'Medical 9', value: 1234, group: 1, category: 'A'
      },
      {
        id: 39, name: 'Medical 6', value: 5634, group: 1, category: 'A'
      },
      {
        id: 35, name: 'Medical 1', value: 128, group: 5, category: 'A'
      },
      {
        id: 32, name: 'Alarms', value: 9702, group: 2, category: 'C'
      },
      {
        id: 34, name: 'Vehicle - Related', value: 438, group: 2, category: 'C'
      },
      {
        id: 43, name: 'Medical Group B', value: 650, group: 2, category: 'C'
      },
      {
        id: 47, name: 'Environmental Hazard', value: 204, group: 5, category: 'C'
      },
      {
        id: 40, name: 'Assist Policeq', value: 34, group: 2, category: 'C'
      },
      {
        id: 33, name: 'Medical 5', value: 2900, group: 4, category: 'C'
      },

      {
        id: 50, name: 'Medical 7', value: 1068, group: 2, category: 'C'
      },
      {
        id: 45, name: 'Other', value: 379, group: 3, category: 'B'
      },
      {
        id: 48, name: 'Rescue', value: 91, group: 3, category: 'B'
      },
      {
        id: 49, name: 'Rescue12', value: 700, group: 4, category: 'B'
      },
      {
        id: 54, name: 'Medical Group C', value: 823, group: 3, category: 'B'
      },

      {
        id: 56, name: 'Medical 2', value: 254, group: 4, category: 'B'
      },
      {
        id: 51, name: 'Medical 8', value: 2312, group: 3, category: 'B'
      }
    ];
    return data;
  }
  convertData() {
    let convertedData = {
      name: 'Chart',
      ingredient: 0,
      children: [
        { name: 'FABRIC CARE', children: [], ingredient: 0 },
        { name: 'PERSONAL WASH', children: [], ingredient: 0 },
        { name: 'FINE FRAGRANCE', children: [], ingredient: 0 },
        { name: 'HOME CARE', children: [], ingredient: 0 },
        { name: 'HAIR CARE', children: [], ingredient: 0 },
        { name: 'TOILETRIES', children: [], ingredient: 0 },
        { name: 'OTHER', children: [], ingredient: 0 },
        { name: 'null', children: [], ingredient: 0 }
      ]
    };
    let string = {
      "scentPortfolio": "all",
      "sortBy": "CATEGORY",
      "dropdown": "AVG_IFFINGREDNTS",
      "headerTab": "VOLUME",
      "YearOnYear": true,
      "filter": "string",
      "headerFilter": {
        "region": [

          "All"
        ],
        "category": [
          "All"
        ],
        "account": [
          "All"
        ]
      },
      "startDate": "2019-05-31",
      "endDate": "2019-05-31"
    }
      ;
    this.http.post('http://172.24.213.11:50512/chart/product/bubbleChart?dateRange=last12Months', string).subscribe(data => {
      console.log(data);



      let fabSum = 0;
      data['FABRIC CARE'].ipc.forEach(i => {
        fabSum += i.ingredient;
        convertedData.children.forEach(child => {
          if (child.name == 'FABRIC CARE') {
            child.children.push(i);
          }
        });
      });
      convertedData.children[0].ingredient = fabSum;
      let pwSum = 0;
      data['PERSONAL WASH'].ipc.forEach(i => {
        pwSum += i.ingredient;
        convertedData.children.forEach(child => {
          if (child.name == 'PERSONAL WASH') {
            child.children.push(i);
          }
        })
      });
      convertedData.children[1].ingredient = pwSum;
      let ffSum = 0;
      data['FINE FRAGRANCE'].ipc.forEach(i => {
        ffSum += i.ingredient;
        convertedData.children.forEach(child => {
          if (child.name == 'FINE FRAGRANCE') {
            child.children.push(i);
          }
        })
      });
      convertedData.children[2].ingredient = ffSum;
      data['HOME CARE'].ipc.forEach(i => {
        convertedData.children.forEach(child => {
          if (child.name == 'HOME CARE') {
            child.children.push(i);
          }
        })
      });
      data['HAIR CARE'].ipc.forEach(i => {
        convertedData.children.forEach(child => {
          if (child.name == 'HAIR CARE') {
            child.children.push(i);
          }
        })
      });
      convertedData.children[3].ingredient = ffSum;
      data['TOILETRIES'].ipc.forEach(i => {
        convertedData.children.forEach(child => {
          if (child.name == 'TOILETRIES') {
            child.children.push(i);
          }
        })
      });
      convertedData.children[4].ingredient = ffSum;
      data['OTHER'].ipc.forEach(i => {
        convertedData.children.forEach(child => {
          if (child.name == 'OTHER') {
            child.children.push(i);
          }
        })
      });
      convertedData.children[5].ingredient = ffSum;
      data['null'].ipc.forEach(i => {
        convertedData.children.forEach(child => {
          if (child.name == 'null') {
            child.children.push(i);
          }
        });
      });
      convertedData.children[6].ingredient = ffSum;
      convertedData.ingredient = 20000;
      this.dataSet = convertedData;
      this.drawCirclePack();
      // return convertedData;
      // return data;
    });
  }
  generateNodes() {
    const data = this.getData();
    const nodes = [];
    var i = Math.floor(Math.random() * 4)
    data.forEach((d) => {
      const node = {
        id: d.id,
        radius: this.radiusScale(d.value),
        value: d.value,
        name: d.name,
        group: d.group,
        x: 0,
        y: 0
        // x: Math.random() * 1000,
        // y: Math.random() * 1000
      };
      node.x = Math.cos(d.group / 4 * 2 * Math.PI) * 200 + this.width / 2;
      node.y = Math.sin(d.group / 4 * 2 * Math.PI) * 200 + this.height / 2;
      // node.x = node.x + (node.x - (400 / 2)) * 0.5;
      // node.y = node.y + (node.y - (150)) * 0.5;
      nodes.push(node);
    });
    nodes.sort((a, b) => b.group - a.group);
    return nodes;
  }
  drawCirclePack() {
    this.svg = d3.select('#bubble-chart1 svg');
    const color = d3.scaleOrdinal()
      // .domain(['A', 'B', 'C'])
      .domain('FABRIC CARE', 'PERSONAL WASH', 'FINE FRAGRANCE', 'HOME CARE', 'HAIR CARE', 'TOILETRIES', 'OTHER', 'null')
      .range(['#d23d67', '#3466c7', '#2e8098', '#faa838', '#7f7f75', '#a43b59', '#01addd', '#9c76a9']);
    this.svg = this.svg
      .style('width', this.width + 'px')
      .style('height', this.height + 'px');
    this.svg = this.svg.append('g');
    let nodes = [];
    let pack = d3.pack()
      .size([this.width, this.height])
      .padding(0.4);
    // let pack = d3.pack()
    //   .size([this.width, this.height])
    //   .padding(1)
    // (
    //   d3.hierarchy(data)
    //     .sum(hierarchyData => {
    //       console.log( hierarchyData['ingredient'])
    //       return hierarchyData['ingredient'];
    //     })
    //   // .sort(function(d) { return d.group; })
    //   // .sort((a, b) => b.value - a.value)
    // );
    this.dataSet = d3.hierarchy(this.dataSet)
      .sum(function (d) { return d.ingredient; })
      .sort(function (a, b) { return b.ingredient - a.ingredient; });

    nodes = pack(this.dataSet).descendants();
    // nodes=pack(this.dataSet).leaves();
    // console.log(nodes)
    let node = this.svg.selectAll('circle')
      .data(nodes, (d) => {
        console.log(d);
        return d.id;
      });

    node = node.enter().append('circle')
      .attr('r', (d) => {
        if (d.data.id) {

          return d.r;
        } else {
          return d.r;
        }
      })
      .attr('cx', (d) => {
        return d.x;
      })
      .attr('cy', (d) => {
        return d.y;
      })
      .style('fill', (d) => {
        if (!d.children && d.parent && d.parent.data) {
          return color(d.parent.data.name);
        } else {
          return '#fff';
        }
      })
      .attr('id', (d) => {
        if (d.data.id) {
          return 'circle-' + d.data.id;
        } else {
          return 'circle-outer';
        }
      })
      .style('stroke-width', 1)
      .attr('stroke-width', 2)
      .attr('stroke', (d) => {
        if (d.parent && d.parent.data) {
          d3.rgb(color(d.parent.data.name)).darker();
        } else {
          color('#000');
        }
      });
    // this.collapsedView(node, nodes)
  }

  drawChart() {
    this.svg = d3.select('#bubble-chart1 svg');
    const color = d3.scaleOrdinal()
      .domain(['A', 'B', 'C'])
      .range(['#d23d67', '#3466c7', '#2e8098', '#faa838', '#7f7f75']);
    this.svg = this.svg
      .style('width', this.width + 'px')
      .style('height', this.height + 'px');
    this.svg = this.svg.append('g');
    this.data = this.generateNodes();
    let nodes = [];
    let pack = d3.pack()
      .size([this.width, this.height])
      .padding(1)
      (
        d3.hierarchy({ children: this.data })
          .sum(hierarchyData => {
            return hierarchyData['value'];
          })
        // .sort(function(d) { return d.group; })
        // .sort((a, b) => b.value - a.value)
      );

    nodes = pack.leaves();

    let node = this.svg.selectAll('circle')
      .data(nodes, (d) => {
        return d.id;
      });

    node = node.enter().append('circle')
      .attr('r', (d) => {
        if (d.data.id) {

          return d.r;
        } else {
          return d.r;
        }
      })
      .attr('cx', (d) => {
        return d.x;
      })
      .attr('cy', (d) => {
        return d.y;
      })
      .style('fill', (d) => {
        if (!d.children) {
          return color(d.data.group);
        } else {
          return '#fff';
        }
      })
      .attr('id', (d) => {
        if (d.data.id) {
          return 'circle-' + d.data.id;
        } else {
          return 'circle-outer';
        }
      })
      .style('stroke-width', 1)
      .attr('stroke-width', 2)
      .attr('stroke', (d) => d3.rgb(color(d.data.group)).darker());

    // this.collapsedView(node, nodes);
  }

  collapsedView(node, nodes) {
    this.force = d3.forceSimulation(nodes)
      .force("x", d3.forceX().strength(0).x(this.width / 2))
      // .force("y", d3.forceY().strength(0.5).y(this.height / 2))
      // .force("center", d3.forceCenter().x(this.width / 2).y(this.height / 2)) // Attraction to the center of the svg area
      // .force("charge", d3.forceManyBody().strength(.9)) // Nodes are attracted one each other of value is > 0
      // .force("collide", d3.forceCollide().strength(.1).iterations(1))
      // .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      // .force('charge', d3.forceManyBody().strength((d) => {
      //   return -Math.pow(d.r, 0.2) / 8;
      // }))
      // .velocityDecay(0.3)
      .force(
        'collide',
        d3.forceCollide().radius((data) => {
          return +data.r + 0.3;
        }).strength(.5));
    this.force.on('tick', () => {
      node
        // .each(this.totalSort(this.force.alpha()))
        // .each(this.gravity(this.force.alpha() * 0.5))
        .each(this.collided(this.force.alpha(), nodes))
        // .each(this.buoyancy(this.force.alpha(), this.radiusScale))
        .attr('cx', (d) => {
          return d.x;
        })
        .attr('cy', (d) => {
          return d.y;
        });
    });
    // this.force.stop();
  }
  gravity(k) {
    return function (d) {
      // console.log((d))
      if (typeof (d.tx) !== "undefined") {
        d.x = Math.cos(d.group / 3 * 2 * Math.PI) * k + this.width / 3;
        d.y = Math.sin(d.group / 3 * 2 * Math.PI) * k + this.height / 2;
        // d.x = d.x + (d.tx - d.x) * k;
        // d.y = d.y + (d.ty - d.y) * k;
      }
    };
  }
  totalSort(alpha) {
    return (d) => {
      const targetY = 200;
      const targetX = (this.width - 10) / 2;
      d.y = d.y + (targetY - d.y) * (0.02) * alpha;
      d.x = d.x + (targetX - d.x) * (0.02) * alpha;
    };
  }

  collided(alpha, nodes) {
    let padding = 1.5, // separation between nodes
      maxRadius = 12;
    var quadtree = d3.quadtree(nodes);
    // console.log(nodes, quadtree)
    return function (d) {
      var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit(function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

  collide(k, nodes) {
    var q = d3.quadtree()
      .addAll(nodes);
    return function (node) {
      var nr = node.r,
        nx1 = node.x - nr,
        nx2 = node.x + nr,
        ny1 = node.y - nr,
        ny2 = node.y + nr;
      // console.log(nx1, q)
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
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }
  buoyancy(alpha, radiusScale) {
    return (d) => {
      this.boundingRadius = radiusScale(this.totalValue);
      const centerY = 300;
      const targetY = centerY * this.boundingRadius;
      d.y = d.y + (targetY - d.y) * (0.1) * alpha * alpha * alpha * 100;
    };
  }
}
