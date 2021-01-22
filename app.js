var svgWidth = 960;
var svgHeight = 660;


var chartMargin = {
  top: 30,
  right: 50,
  bottom: 80,
  left: 100
};


var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  
d3.csv("data.csv").then(function(socialData) {

  console.log(socialData);

  
  socialData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data.healthcare);

  var xScale = d3.scaleLinear()
      .domain([5, 25])
      .range([0, chartWidth]) 

  var yScale = d3.scaleLinear()
      .domain([0, 30])
      .range([0, chartHeight]);

  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

   
  chartGroup.append("g")
    .call(bottomAxis);
    
  chartGroup.append("g")
    .call(leftAxis);  

  var state = data.abbr;
  console.log(state);

  var circlesGroup = chartGroup.selectAll("circle")
        .data(socialData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "8")
        .attr("fill", "grey", state)
        .text(state)
        .text("white");

      let texts = chartGroup.selectAll(null)
        .data(socialData)
        .enter()
        .append('text')
        .text(d => d.abbr)
        .attr("class", "stateText")
  
        let ticked = () => {
      
          texts.attr('dx',  d => xScale(d.poverty))
                  
              .attr('dy', d => yScale(d.healthcare))         
      }
      ticked()

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (d.state);
        });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left + 0)
      .attr("x", 0 - (chartHeight/2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare(%)");

    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty(%");
    });
  });
});