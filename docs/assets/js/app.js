// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(demoData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    demoData.forEach(function(data) {
        data.state= data.state;
      data.poverty = +data.poverty;
      data.healthcareLow = +data.healthcareLow;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(demoData, d => d.healthcareLow), d3.max(demoData, d => d.healthcareLow)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(demoData, d => d.poverty), d3.max(demoData, d => d.poverty)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      console.log(demoData)

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("g circles").data(demoData).enter();

circlesGroup
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcareLow))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

circlesGroup
    .append("svg:text")
	.attr("class", "text")
    .attr("dx", d => xLinearScale(d.healthcareLow)-7)
    .attr("dy", d => yLinearScale(d.poverty)+3)
    .style("font-size", "12px")
    .style('fill', 'white')
	.text(function(d) { return d.abbr });
    
    

    // // Step 6: Initialize tool tip
    // // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>Poverty: ${d.Poverty}<br>Hits: ${d.HealthcareLow}`);
    //   });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(data) {
    //   toolTip.show(data, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    //   });

    // Create axes labels
 chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+5)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("In Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top+30})`)
      .attr("class", "axisText")
      .text("Percentage with Low Access to Health Care");
  });
console.log(chartGroup)