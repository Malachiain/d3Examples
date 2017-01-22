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


    var xAxis = d3.axisBottom(xScale);

    svg.append(`g`)
        .attr(`transform`, `translate(0, ${height})`)
        .call(xAxis);

    var rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.population)])
        .range([0,40]);

    var circles = svg.selectAll(`.ball`)
        .data(data)
        .enter()
        .append(`g`)
        .attr(`class`, `ball`)
        .attr(`transform`, d => `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`);

    circles
        .append(`circle`)
        .attr(`cx`, d => 0)
        .attr(`cy`, d => 0)
        .attr(`r`, d => rScale(d.population))
        .style(`fill`, `blue`)
        .style(`fill-opacity`, 0.50);
    circles
    .append(`text`)
    .style(`text-anchor`, `middle`)
    .style(`fill`, `black`)
    .attr(`y`, 4)
    .text( d => d.code);





});

