const visObject = {
    create: function (element, config) {
        element.innerHTML = "";
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        element.innerHTML = "";
        var meas = queryResponse && queryResponse["fields"]["measure_like"];
        var mesID = meas && meas[0]["name"];
        var mesData = data && ( mesID !== undefined ? ( data[0] ? ( data[0][mesID] ? data[0][mesID] : null ) : null ) : null );
        var mesLink = mesData && mesData.links;
        var mesRendered = mesData && (mesData.rendered === undefined ? mesData.value : mesData.rendered);
        var title = "NPS Score";
        var font = `"Google Sans", "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif`;

        var svg = d3.select("#vis")
                    .append("svg")
                    .style('position', 'fixed')
                    .attr('viewBox', '-15 0 350 200')
                    .attr('preserveAspectRatio', 'xMidYMid meet');
        var slices = [
            {
                starts: -1.48999 * Math.PI/3,
                ends: -0.5 * Math.PI/3,
                color: 'rgb(227, 23, 10)'
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
        var texts = [
            {
                number: '-100',
                x: 15,
                y: 128
            }, 
            {
                number: '+100',
                x: 255,
                y: 128
            }
        ];
        
        svg.append("text")
            .attr("dx", 105)
            .attr("dy", 0)
            .style("font-size", "1.125rem")
            .attr("fill", "#333")
            .style("font-family", font)
            .attr("transform", "translate(2,17)")
            .text(title);

        var arcs = svg.append("g")
            .attr("transform", "translate(150,130)")
            .selectAll("path").data(slices)
            .enter()
            .append("path")
            .attr("d", d3.arc().innerRadius(35).outerRadius(100).startAngle(function (d) { return d.starts; }).endAngle(function (d) { return d.ends; }))
            .attr("fill", function (d) { return d.color; })
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .style('cursor', 'pointer');
    
        arcs.on("click", function (d, i) {
            LookerCharts.Utils.openDrillMenu({
                links: mesLink ? mesLink : null,
                event: event,
            });
        });

        var sideText = svg.selectAll("texts")
            .data(texts)
            .enter()
            .append("text")
            .attr("dx", function (d) { return d.x })
            .attr("dy", function (d) { return d.y })
            .style("font-size", "15px")
            .attr("fill", "#333")
            .style("font-family", font)
            .text( function (d) { return d.number });

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

        var isString = mesRendered !== null && isNaN(convertRange(mesRendered, [-100, 100], [0, 180]));
        var numberOfint = mesRendered !== null && mesRendered.toString().length;
        var rotationValue = mesRendered !== null ? convertRange(mesRendered, [-100, 100], [0, 180]) : 0;
        var message = 'Out of range!, your input must be between -100 to 100';

        svg.append("line")
            .attr("x1", 80)
            .attr("x2", 150)
            .attr("y1", 130)
            .attr("y2", 130)
            .attr("pathLength", 100)
            .attr("stroke-width", 5).attr("stroke", "#333")
            .attr('transform','translate(1 1) rotate(' + rotationValue + ')')
            .attr('transform-origin', '150 130');
        
        function getNumberPositions() {
            if (isString) {
                return 40
            } else if (mesRendered === null) {
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

        var score = 
            svg.append("text")
            .attr("dx", getNumberPositions())
            .attr("dy", (isString || mesRendered === null) ? 150 : 165)
            .style("font-size", (isString || mesRendered === null) ? '10px' : "38px")
            .attr("fill", isString ? "red" : "#333")
            .style("font-family", font)
            .style('cursor', 'pointer')
            .text(isString ? 
                message : 
                mesRendered === null ? 
                'No Results' : 
                mesRendered)
            .on("click", function (d, i) {
                LookerCharts.Utils.openDrillMenu({
                    links: mesLink ? mesLink : null,
                    event: event,
                });
            });
  
      doneRendering();
    },
  };
  
  looker.plugins.visualizations.add(visObject);
  