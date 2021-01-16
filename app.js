var svgWidth = 960;
var svgHeight = 660;


var chartMargin = {
  top: 30,
  right: 40,
  bottom: 60,
  left: 100
};


var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


var svg = d3.select(".scatter")
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

    var xScale = d3.scaleLinear()
                .domain([20, d3.max(socialData, data => data.poverty)])
                .range([0, chartWidth]) 

    var yScale = d3.scaleLinear()
                .domain([0, d3.max(socialData, data => data.healthcare)])
                .range([chartHeight, 0]);
    
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    
    chartGroup.append("g")
        .attr("transform", 'translate(0, ${chartHeight})')
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

    /*

    var circlesGroup = chartGroup.selectAll("circle")
        .data(socialData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(data.poverty))
        .attr("cy", d => yScale(data.healthcare))
        .attr("r", "pink")
        .attr("fill", "pink")
        .attr("opacity", ".5");

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return ('${d.abbr}');
        });

    chartGroup.call(toolTip);

    //circlesGroup.on("click", function(data) {
    //  toolTip.show(data, this);
    //})

      //.on("mouseout", function(data, index) {
        //toolTip.hide(data);
      //});
    
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left + 40)
      .attr("x", 0 - (chartHeight/2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare(%)");

    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty(%");
  */
  });
});