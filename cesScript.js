
var svg = d3.select("#vis").append("svg").style('position', 'fixed')
.attr('viewBox', '-50 -20 410 160').attr('preserveAspectRatio', 'xMidYMid meet');
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
// function will check the range between 1 - 7 and if it's out of range then the return is error 'string'
// function rotateIndicator(input) {
//     var score = null
//     if (input > 0 && input < 6) {
//         if (input <= 1.3) {
//             score = 40
//         }
//         if (input > 1.3 && input <= 1.7) {
//             score = 60
//         }
//         if (input > 1.7 && input <= 2.4) {
//             score = 80
//         }
//         if (input > 2.4 && input <= 3.4) {
//             score = 90
//         }
//         if (input > 3.4 && input <= 4.5) {
//             score = 130
//         }
//         if (input > 4.5) {
//             score = 150
//         }
//     } else {
//         score = 'Out of range!';
//     }

//     return score
// };

// compare the input number with the first range against the second range
function convertRange( input, range1, range2 ) {
    // check if the input is less than 1 or more than 5
    if (input > (range1[0] - 0.1) && input < (range1[1] + 0.1) ) {
        return ( input - range1[ 0 ] ) * ( range2[ 1 ] - range2[ 0 ] ) / ( range1[ 1 ] - range1[ 0 ] ) + range2[ 0 ]
    } else {
        return 'Out of range!'
    }
}

var dataNps = 5;
var isString = isNaN(convertRange(dataNps, [1, 5], [0, 180]));
var numberOfint = dataNps.toString().length;

console.log(convertRange(dataNps, [1, 5], [0, 180]))

svg.append("line")
    .attr("x1", 80)
    .attr("x2", 150)
    .attr("y1", 100)
    .attr("y2", 100)
    .attr("pathLength", 100)
    .attr("stroke-width", 5).attr("stroke", "#333")
    .attr('transform','translate(1 1) rotate(' + convertRange(dataNps, [1, 5], [0, 180]) + ')')
    .attr('transform-origin', '150 100');
// Check whither the function output is a number or a string
var score = isString ? svg.append("text")
    .attr("dx", 40)
    .attr("dy", 120)
    .style('font-size', '10px')
    .attr("fill", "red")
    .style("font-family", "Arial, Helvetica, sans-serif")
    .style('cursor', 'pointer')
    .text('Out of range!, your input must be between 1 to 5') : 
    svg.append("text")
    .attr("dx", numberOfint > 2 ? 120 : 130)
    .attr("dy", 140)
    .style("font-size", "38px")
    .attr("fill", "#333")
    .style("font-family", "Arial, Helvetica, sans-serif")
    .style('cursor', 'pointer')
    .text(dataNps);
