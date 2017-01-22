var margin = {top: 10, bottom: 50, left: 30, right: 30};

var width = 425 - margin.left - margin.right;
var height = 425 - margin.top - margin.bottom;
var fullWidth = width + margin.left + margin.right;
var fullHeight = height + margin.top + margin.bottom;

var svg = d3.select(`.chart`)
    .append(`svg`)
    .attr(`width`, width + margin.left + margin.right)
    .attr(`height`, height + margin.top + margin.bottom)
    .attr(`viewBox`, `0 0 ${fullWidth}, ${fullHeight}`)
    .append(`g`)
    .attr(`transform`, `translate(${margin.left},${margin.top})`);

d3.json(`data/data.json`,(err,data) =>{
    console.log(err, data);
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.expectancy))
        .range([height, 0])
        .nice();

    var yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.cost))
        .range([0, width])
        .nice();
    });