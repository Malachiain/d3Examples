var margin = {top: 10, bottom: 50, left: 30, right: 30};

var width = 800 - margin.left - margin.right;
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
    var parseTime = d3.timeParse(`%Y/%m/%d`);
    data.forEach((company)=>{
        company.values.forEach((value)=>{
            value.date = parseTime(value.date);
            value.close = +value.close;
        });
    });


    var xScale = d3.scaleTime()
        .domain([
            d3.min(data, c => d3.min(c.values, d => d.date)),
            d3.max(data, c => d3.max(c.values, d => d.date))
        ])
        .range([0, width])
        .nice();

    var xAxis = d3.axisBottom(xScale);
    svg.append(`g`)
        .attr(`transform`, `translate(0, ${height})`)
        .call(xAxis);

    var yScale = d3.scaleLinear()
        .domain([
            d3.min(data, c => d3.min(c.values, d => d.close)),
            d3.max(data, c => d3.max(c.values, d => d.close))
        ])
        .range([height,0])
        .nice();
    svg
        .append(`g`)
        .call(d3.axisLeft(yScale));

    var line = d3.line()
        .x( d => xScale(d.date))
        .y(d => yScale(d.close));

    svg
        .selectAll(`.line`)
        .data(data)
        .enter()
        .append(`path`)
        .attr(`class`,`line`)
        .attr(`d`, d => line(d.values))
        .style(`stroke`, (d, i) => [`orange`,`blue`][i])
        .style(`fill`,`none`)
        .style(`stroke-width`, 2);
    });