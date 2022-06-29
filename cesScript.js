
var svg = d3.select("#vis").append("svg").style('position', 'fixed')
.attr('viewBox', '-50 0 310 185').attr('preserveAspectRatio', 'xMidYMid meet');
const slices = [
    {
        starts: -1.48999 * Math.PI/3,
        ends: -0.5 * Math.PI/3,
        color: 'rgb(228, 86, 33)'
    },
    {
        starts: -0.5 * Math.PI/3,
        ends: 0.5 * Math.PI/3,
        color: 'rgb(252, 207, 132)'
    },
    {
        starts: 0.5 * Math.PI/3,
        ends: 1.5 * Math.PI/3,
        color: 'rgb(85, 158, 56)'
    },
];
const texts = [
    {
        lable: 'Very low effort (1) ',
        x: -31,
        y: 90
    }, 
    {
        lable: 'Very high effort (5)',
        x: 252,
        y: 90
    }
];

svg.append("g").attr("transform", "translate(150,100)");

var arcGenerator = slices.map(d => {
    d3.select("#vis g")
    .append("path")
    .attr("d", 
        d3.arc()
        .innerRadius(35)
        .outerRadius(100)
        .startAngle(d.starts)
        .endAngle(d.ends)
    )
    .attr("fill", d.color)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .style('cursor', 'pointer');
});
var sideText = texts.map(d => {
    svg.append("text")
    .attr("dx", d.x)
    .attr("dy", d.y)
    .style("font-size", "10px")
    .attr("fill", "#333")
    .style("font-family", "Arial, Helvetica, sans-serif")
    .text(d.lable);
});
function convertRange( input, range1, range2 ) {
    if (input !== null) {
        // check if the input is less than 100 or more than -100
        if (input > (range1[0] - 0.1) && input < (range1[1] + 0.1) ) {
            return ( input - range1[ 0 ] ) * ( range2[ 1 ] - range2[ 0 ] ) / ( range1[ 1 ] - range1[ 0 ] ) + range2[ 0 ]
        } else {
            return 'Out of range!'
        }
    } else {
        return null
    }
}

var dataNps = null;
var isString = dataNps !== null && isNaN(convertRange(dataNps, [1, 5], [0, 180]));
var numberOfint = dataNps !== null && dataNps.toString().length;
var rotationValue = dataNps !== null ? (convertRange(dataNps, [1, 5], [0, 180])) : 0;
var message = 'Out of range!, your input must be between 1 to 5'

svg.append("line")
    .attr("x1", 80)
    .attr("x2", 150)
    .attr("y1", 100)
    .attr("y2", 100)
    .attr("pathLength", 100)
    .attr("stroke-width", 5).attr("stroke", "#333")
    .attr('transform','translate(1 1) rotate(' + rotationValue + ')')
    .attr('transform-origin', '150 100');

var score = svg.append("text")
    .attr("dx", isString ? 40 : (numberOfint > 2 ? 120 : 130))
    .attr("dy", (isString || dataNps === null) ? 120 : 140)
    .style('font-size', (isString || dataNps === null) ? '10px' : "38px")
    .attr("fill", isString ? "red" : "#333")
    .style("font-family", "Arial, Helvetica, sans-serif")
    .style('cursor', 'pointer')
    .text(isString ? 
        message : 
        dataNps === null ? 
        'No Results' : 
        dataNps);
