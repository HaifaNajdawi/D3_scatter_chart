// set the dimentions and the margins of the graph
var margin = {top:10, right:30, bottom:30 , left:30};
var svgWidth = 800;
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
    
    console.log(d3.max(journalData, d => +(d.poverty)))

    // add x axis
    var xScale=d3.scaleLinear()
            .domain([0,d3.max(journalData, d =>+(d.poverty))])
            .range([0,chartWidth])
        svg.append("g")
            // x axis to bottom
            .attr("transform",`translate(0,${chartHeight})`)
            // ticks loction
            .call(d3.axisBottom(xScale));
    // add y axis
    var yScale=d3.scaleLinear()
            .domain([0,d3.max(journalData,d => +(d.healthcare))])
            .range([chartHeight,0])
        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.append("g").selectAll(".stateCircle")
        .data(journalData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
            .attr("cx",d => +(d.poverty))
            .attr("cy",d => +(d.healthcare))
            .attr("r",10)


    

});


