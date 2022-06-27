
var svg = d3.select("#vis").append("svg").style('position', 'fixed')
.attr('viewBox', '-20 0 350 160').attr('preserveAspectRatio', 'xMidYMid meet');
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
        number: '-100',
        x: 15,
        y: 90
    }, 
    {
        number: '100',
        x: 255,
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
    .style("font-size", "15px")
    .attr("fill", "#333")
    .style("font-family", "Arial, Helvetica, sans-serif")
    .text(d.number);
});
// // function will check the range between 1 - 7 and if it's out of range then the return is error 'string'
// function rotateIndicator(input) {
//     var angleNumber = null

//     if (input > -101 && input < 101) {
//         if (input <= -90) {
//             angleNumber = 20
//         } 
//         if (input > -90 && input <= -67) {
//             angleNumber = 40
//         } 
//         if (input > -67 && input <= -33) {
//             angleNumber = 60
//         }
//         if (input > -33 && input <= 1) {
//             angleNumber = 80
//         }
//         if (input > 1 && input <= 33) {
//             angleNumber = 110
//         }
//         if (input > 33 && input <= 67) {
//             angleNumber = 140
//         }
//         if (input > 67 && input <= 100) {
//             angleNumber = 170
//         }
//     } else {
//         angleNumber = 'Out of range!'
//     }

//     return angleNumber
// };

// compare the input number with the first range against the second range
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
var isString = dataNps !== null && isNaN(convertRange(dataNps, [-100, 100], [0, 180]));
var numberOfint = dataNps !== null && dataNps.toString().length;
var rotationValue = dataNps !== null ? (convertRange(dataNps, [-100, 100], [0, 180])) : 0;
var message = 'Out of range!, your input must be between -100 to 100';
console.log(dataNps)

svg.append("line")
    .attr("x1", 80)
    .attr("x2", 150)
    .attr("y1", 100)
    .attr("y2", 100)
    .attr("pathLength", 100)
    .attr("stroke-width", 5).attr("stroke", "#333")
    .attr('transform','translate(1 1) rotate(' + rotationValue + ')')
    .attr('transform-origin', '150 100');
// Check whither the function output is a number or a string
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
