
var svg = d3.select("#vis").append("svg").style('position', 'fixed')
.attr('viewBox', '-85 0 510 185').attr('preserveAspectRatio', 'xMidYMid meet');
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
        y: 130
    }, 
    {
        lable: 'Very high effort (5)',
        x: 252,
        y: 130
    }
];

svg.append("g").attr("transform", "translate(150,140)");

var font = `"Google Sans", "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif`;

var title =svg.append("text")
    .attr("dx", 105)
    .attr("dy", 0)
    .style("font-size", "1.125rem")
    .attr("fill", "#333")
    .style("font-family", font)
    .style('cursor', 'pointer')
    .attr("transform", "translate(2,17)")
    .text("NPS Score");

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
    .style("font-family", font)
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

var dataNps = 6;
var isString = dataNps !== null && isNaN(convertRange(dataNps, [1, 5], [0, 180]));
var numberOfint = dataNps !== null && dataNps.toString().length;
var rotationValue = dataNps !== null ? (convertRange(dataNps, [1, 5], [0, 180])) : 0;
var message = 'Out of range!, your input must be between 1 to 5'

svg.append("line")
    .attr("x1", 80)
    .attr("x2", 150)
    .attr("y1", 140)
    .attr("y2", 140)
    .attr("pathLength", 100)
    .attr("stroke-width", 5).attr("stroke", "#333")
    .attr('transform','translate(1 1) rotate(' + rotationValue + ')')
    .attr('transform-origin', '150 140');

function getNumberPositions() {
    if (isString) {
        return 40
    } else if (dataNps === null) {
        return 125
    } else if (numberOfint === 4) {
        return 110
    } else if (numberOfint == 2) {
        return 130
    } else if (numberOfint > 2) {
        return 110
    } else {
        return 140
    }
}

var score = svg.append("text")
    .attr("dx", getNumberPositions())
    .attr("dy", (isString || dataNps === null) ? 160 : 180)
    .style('font-size', (isString || dataNps === null) ? '10px' : "38px")
    .attr("fill", isString ? "red" : "#333")
    .style("font-family", font)
    .style('cursor', 'pointer')
    .text(isString ? 
        message : 
        dataNps === null ? 
        'No Results' : 
        dataNps);
