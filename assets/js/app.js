// set the dimentions and the margins of the graph
var margin = {top:10, right:30, bottom:30 , left:10};
var svgWidth = 900;
var svgHeight = 600;

var chartWidth= svgWidth-margin.left-margin.right;
var chartHeight=svgHeight-margin.top-margin.bottom;

// append svg object to the body

var svg= d3.select("#scatter")
    .append("svg")
        .attr("width",svgWidth)
        .attr("height",svgHeight)
    .append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`)

// read the data path based to index file 
d3.csv("assets/data/data.csv").then(function(journalData){
    console.log("data",journalData)
})

