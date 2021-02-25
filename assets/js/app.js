// // set the dimentions and the margins of the graph
// var margin = { top: 10, right: 30, bottom: 70, left: 50 };

// var svgWidth = 800;
// var svgHeight = 400;

// var chartWidth = svgWidth - margin.left - margin.right;
// var chartHeight = svgHeight - margin.top - margin.bottom;

// // append svg object to the body

// var svg = d3.select("#scatter")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight)

// const chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`)

// // read the data path based to index file 
// d3.csv("assets/data/data.csv").then(function (journalData) {
//     console.log("data", journalData)

//     console.log(d3.max(journalData, d => +(d.poverty)))

//     // add x axis
//     var xScale = d3.scaleLinear()
//         .domain(d3.extent(journalData, d => +(d.poverty)))
//         .range([0, chartWidth])

//     chartGroup.append("g")
//         // x axis to bottom
//         .attr("transform", `translate(0,${chartHeight})`)
//         // ticks loction
//         .call(d3.axisBottom(xScale));

//     // add y axis ticks 
//     var yScale = d3.scaleLinear()
//         .domain(d3.extent(journalData, d => +(d.healthcare)))
//         .range([chartHeight, 0])

//     chartGroup.append("g")
//         .call(d3.axisLeft(yScale));

//     // append circles to chart 
//     chartGroup.append("g").selectAll(".stateCircle")
//         .data(journalData)
//         .enter()
//         .append("circle")
//         .classed("stateCircle", true)
//         .attr("cx", d => xScale(d.poverty))
//         .attr("cy", d => yScale(d.healthcare))
//         .attr("r", 10);

//     // append text to circles 
//     chartGroup.append("g").selectAll(".stateText")
//     .data(journalData)
//     .enter()
//     .append("text")
//     .classed("stateText", true)
//     .attr("x",  d => xScale(d.poverty))
//     .attr("y", d => yScale(d.healthcare))
//     .text(d => d.abbr );

//     // x axis title
//     chartGroup.append("text")
//     .attr("class", "active")
//     .attr("x",chartWidth/2)
//     .attr("y", chartHeight+ margin.top + 23)
//     .text("In Poverty %");

//     // y axis title
//     chartGroup.append("text")
//     .attr("class", "active")
//     .attr("x", 0 - (chartHeight / 2))
//     .attr("y", 0 - margin.left +20)
//     .attr("transform","rotate(-90)")
//     .text("Lack Helathcare %");



// });

var margin = { top: 10, right: 30, bottom: 70, left: 50 };

var svgWidth = 800;
var svgHeight = 400;

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// append svg object to the body

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

function xAxisScale(csvData, key) {
    xScale = d3.scaleLinear()
        .domain([d3.min(csvData, d => d[key]), d3.max(csvData, d => d[key])])
        .range([0, chartWidth])
    return xScale

};

function yAxisScale(csvData, key) {
    yScale = d3.scaleLinear()
        .domain([d3.min(csvData, d => d[key]), d3.max(csvData, d => d[key])])
        .range([chartHeight, 0])
    return yScale
};

function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

function renderAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

function renderXCircle(circleGroup, newXScale, key) {
    circleGroup.transition()
        .attr("cx", d => newXScale(d[key]))
    return circleGroup

}

function renderYCircle(circleGroup, newYScale, key) {
    circleGroup.transition()
        .attr("cy", d => newYScale(d[key]))
    return circleGroup

}


