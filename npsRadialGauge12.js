const visObject = {
    updateAsync: function (
      data,
      element,
      config,
      queryResponse,
      details,
      doneRendering
    ) {
        element.innerHTML = "";

        var meas = queryResponse["fields"]["measure_like"];
        var mesID = meas[0]["name"];
        var mesData = data[0][mesID];
        var mesLink = mesData.links;
        var mesRendered = mesData.rendered === undefined ? mesData.value : mesData.rendered;
        var title = "NPS Score";
        var font = `"Google Sans", "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif`;


        var svg = d3.select("#vis")
                    .append("svg")
                    .style('position', 'fixed')
                    .attr('viewBox', '-85 0 510 185')
                    .attr('preserveAspectRatio', 'xMidYMid meet');
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
                y: 130
            }, 
            {
                number: '+100',
                x: 255,
                y: 130
            }
        ];

        svg.append("g").attr("transform", "translate(150,140)");
        
        svg.append("text")
            .attr("dx", 105)
            .attr("dy", 0)
            .style("font-size", "1.125rem")
            .attr("fill", "#333")
            .style("font-family", font)
            .attr("transform", "translate(2,17)")
            .text(title);

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
            .style('cursor', 'pointer')
            .on("click", function (d, i) {
                LookerCharts.Utils.openDrillMenu({
                    links: mesLink,
                    event: event,
                });
            });
        });

        var sideText = texts.map(d => {
            svg.append("text")
            .attr("dx", d.x)
            .attr("dy", d.y)
            .style("font-size", "15px")
            .attr("fill", "#333")
            .style("font-family", font)
            .text(d.number);
        });

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
            .attr("y1", 140)
            .attr("y2", 140)
            .attr("pathLength", 100)
            .attr("stroke-width", 5).attr("stroke", "#333")
            .attr('transform','translate(1 1) rotate(' + rotationValue + ')')
            .attr('transform-origin', '150 140');
        
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
        .attr("dy", (isString || mesRendered === null) ? 160 : 180)
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
                links: mesLink,
                event: event,
            });
        });
  
      doneRendering();
    },
  };
  
  looker.plugins.visualizations.add(visObject);
  