
var svg = d3.select("#visual").append("svg").style('position', 'fixed')
.attr('viewBox', '-20 -20 700 800').attr('preserveAspectRatio', 'xMidYMid meet');
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

// Add the red line at the bottom
svg.append("line")
    .attr("x1", 0)
    .attr("x2", 300)
    .attr("y1", 100)
    .attr("y2", 100)
    .attr("stroke-width", 5).attr("stroke", "red");
// Add white background to hide the line at the center
svg.append("rect")
    .attr("width", "210")
    .attr("height", "150")
    .attr("fill", "white")
    .attr("transform", "translate(45,0)");
// Add container to house the arch    
svg.append("g").attr("transform", "translate(150,100)");

var arcGenerator = slices.map(d => {
    d3.select("#visual g")
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
    .attr("stroke-width", 1);
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

function rotateIndicator(input) {
    var angleNumber = null
    if (input > 100) {
        angleNumber = 180
    }
    if (input => -100 && input <= -67) {
        angleNumber = 10
    } 
    if (input > -67 && input <= -33) {
        angleNumber = 60
    }
    if (input > -33 && input <= 1) {
        angleNumber = 80
    }
    if (input > 1 && input <= 33) {
        angleNumber = 110
    }
    if (input > 33 && input <= 67) {
        angleNumber = 140
    }
    if (input > 67 && input <= 100) {
        angleNumber = 170
    }

    return angleNumber
};

var dataNps = -90
var numberOfint = dataNps.toString().length
console.log(dataNps.toString().length)
svg.append("line")
    .attr("x1", 80)
    .attr("x2", 150)
    .attr("y1", 100)
    .attr("y2", 100)
    .attr("pathLength", 100)
    .attr("stroke-width", 5).attr("stroke", "#333")
    .attr('transform','translate(1 1) rotate(' + rotateIndicator(dataNps) + ')')
    .attr('transform-origin', '150 100');

var score = svg.append("text")
    .attr("dx", numberOfint > 2 ? 120 : 130)
    .attr("dy", 140)
    .style("font-size", "38px")
    .attr("fill", "#333")
    .style("font-family", "Arial, Helvetica, sans-serif")
    .text(dataNps);
