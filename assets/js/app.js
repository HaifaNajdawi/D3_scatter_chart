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

var margin = { top: 10, right: 30, bottom: 100, left: 100 };

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


var xkey = "poverty";
var ykey = "healthcare";


function xAxisScale(journalData, xkey) {
    xScale = d3.scaleLinear()
        .domain([d3.min(journalData, d => d[xkey]), d3.max(journalData, d => d[xkey])])
        .range([0, chartWidth])
    return xScale

}


function yAxisScale(journalData, ykey) {
    yScale = d3.scaleLinear()
        .domain([d3.min(journalData, d => d[ykey]), d3.max(journalData, d => d[ykey])])
        .range([chartHeight, 0])
    return yScale
}

function xrenderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

function yrenderAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

function renderXCircle(circleGroup, newXScale, xkey) {
    circleGroup.transition()
        .attr("cx", d => newXScale(d[xkey]))
    return circleGroup

}

function renderYCircle(circleGroup, newYScale, ykey) {
    circleGroup.transition()
        .attr("cy", d => newYScale(d[ykey]))
    return circleGroup

}

function renderTextCircle(journalData, circleGroup) {
    circleGroup.transition()
        .text(d => journalData(d.abbr))
    return circleGroup

}
d3.csv("assets/data/data.csv").then(function (journalData) {
    console.log("data", journalData)

    journalData.forEach(function (data) {
        data.poverty = parseFloat(data.poverty)
        data.age = parseFloat(data.age)
        data.income = +data.income
        data.healthcare = parseFloat(data.healthcare)
        data.smokes = parseFloat(data.smokes)
        data.obesity = +data.obesity
        // console.log(data.poverty)


    })
    var xLinear = xAxisScale(journalData, xkey)
    var yLinear = yAxisScale(journalData, ykey)

    var bottomAxis = d3.axisBottom(xLinear);
    var leftAxis = d3.axisLeft(yLinear)

    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g").selectAll(".stateCircle")
        .data(journalData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinear(d[xkey]))
        .attr("cy", d => yLinear(d[ykey]))
        .attr("r", 10);

    // Create group for three x-axis labels
    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    // x axis title
    povertyLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("class", "active")
        .attr("value", "poverty") // value to grab for event listener
        .text("In Poverty %");

    ageLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("class", "inactive")
        .attr("value", "age") // value to grab for event listener
        .text("Age (Median)");

    incomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("class", "inactive")
        .attr("value", "income") // value to grab for event listener
        .text("Houshold Income (Median)");

    var yLabelsGroup = chartGroup.append("g")
        .attr("x", 0 - (chartHeight / 2))
        .attr("y", 0 - margin.left +20)

        .attr("transform", "rotate(-90)")
        

    healthcareLabel = yLabelsGroup.append("text")
        // .attr("x", 20)
        // .attr("y", 0)
        .attr("class", "active")
        .attr("value", "healthcare")
        .text("Lack Healthcare %");

    smokesLabel = yLabelsGroup.append("text")
        // .attr("x", 40)
        // .attr("y", 0)
        .attr("class", "inactive")
        .attr("value", "smokes")
        .text("Smokes %");

    obesityLabel = yLabelsGroup.append("text")
        // .attr("x", 60)
        // .attr("y", 0)
        .attr("class", "inactive")
        .attr("value", "obesity")
        .text("Obese %");



    // updateToolTip function above csv import
    // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== xkey) {

                // replaces chosenXAxis with value
                xkey = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(journalData, xkey);

                // updates x axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, xkey);

                // updates tooltips with new info
                //   circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                // changes classes to change bold text
                if (xkey === "age") {
                    ageLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true)
                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (xkey === "income") {
                    incomeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    povertyLabel
                        .classed("active", true)
                        .classed("inactive", false)

                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);


                }

            }
        })
    yLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== ykey) {

                // replaces chosenXAxis with value
                ykey = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                yLinearScale = yScale(journalData, ykey);

                // updates x axis with transition
                yAxis = renderAxes(yLinearScale, yAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, yLinearScale, ykey);

                // updates tooltips with new info
                //   circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                // changes classes to change bold text
                if (ykey === "smokes") {
                    smokesLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    healthcareLabel
                        .classed("active", false)
                        .classed("inactive", true)
                    obesityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (ykey === "obesity") {
                    obesityLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    smokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    healthcareLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    healthcareLabel
                        .classed("active", true)
                        .classed("inactive", false)

                    smokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    obesityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }

            }

        });



    }).catch(function(error) {
        console.log(error);
      










})
