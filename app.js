var svgWidth = 960;
var svgHeight = 660;


var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};


var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv("data.csv").then(function(socialData) {

  console.log(socialData);

  
  socialData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;


//check out the hairdata solution.
//https://nu.bootcampcontent.com/NU-Coding-Bootcamp/nu-chi-data-pt-09-2020-u-c/blob/master/16-D3/3/Activities/09-Stu_Hair_Metal/Solved/app.js

    var canvas_width = 500;
    var canvas_height = 200;
    var padding = 25;

    var xScale = d3.scaleLinear()
                .domain([0, d3.max(data.poverty, function(d) {
                    return d[0];  // get the input domain as first column of array
                })])
                .range([padding, canvas_width - padding * 2]) 

    var yScale = d3.scaleLinear()
                .domain([0, d3.max(data.healthcare, function(d) {
                    return d[1];  // gets the input domain as the second column of array
                })])
                .range([canvas_height - padding, padding])  // set the output range
                

                svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("x", function(d) {
                    return xScale(d[0]);  // Location of x
                })
                .attr("y", function(d) {
                    return yScale(d[1]);  // Location of y
                })
                .attr("r", 4)  // Radius
                .attr("cx", function(d) {
                    return xScale(d[0]);  // Returns scaled circle x
                })
                .attr("cy", function(d) {
                    return yScale(d[1]);  // Returns scaled circle y
                });
                svg.selectAll("text")
                .data(data.abbr)
                .enter()
                .append("text")
                .text(function(d) {
                    return d[0] + "," + d[1];
                })
                .attr("x", function(d) {
                    return xScale(d[0]);  // Returns scaled location of x
                })
                .attr("y", function(d) {
                    return yScale(d[1]);  // Returns scaled circle y
                })
                .attr("font_family", "sans-serif")  // Font type
                .attr("font-size", "11px")  // Font size
                .attr("fill", "darkgreen");   // Font color
              
            

            // Define X axis and attach to graph
            var xAxis = d3.axisBottom()  // Create an x axis
                .scale(xScale)      // Scale x axis
                
                .ticks(10);  // Set rough # of ticks (optional)

            svg.append("g")     // Append a group element (itself invisible, but helps 'group' elements)
                .attr("class", "axis")  // Assign the 'axis' CSS
                .attr("transform", "translate(0," + (canvas_height - padding) + ")")  // Place axis at bottom
                .call(xAxis);  // Call function to create axis

            // Define Y axis and attach to graph
            var yAxis = d3.axisLeft()  // Create a y axis
                .scale(yScale)  // Scale y axis
                
                .ticks(5);  // Set rough # of ticks (optional)

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis);
                
  })
});
