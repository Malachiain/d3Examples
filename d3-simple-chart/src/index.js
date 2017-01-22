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
    .call(responsivefy)
    .append(`g`)
    .attr(`transform`, `translate(${margin.left},${margin.top})`);

var data = [{
    name: `Frank`,
    latin: `83`,
    greek: `85`,
    spanish: null
},
    {
        name: `Jordan`,
        latin: `63`,
        greek: `92`,
        spanish: `83`
    },
    {
        name: `Misty`,
        latin: `42`,
        greek: `92`,
        spanish: `83`
    }];

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

var yAxis = d3.axisLeft(yScale);
svg.call(yAxis);

var xScale = d3.scaleBand()
    .padding(0.2)
    .domain(data.map(value => value.name))
    .range([0, width]);

var xAxis = d3.axisBottom(xScale);

svg.append(`g`)
    .attr(`transform`, `translate(0, ${height})`)
    .call(xAxis)
    .selectAll(`text`)
    .style(`text-anchor`, `end`)
    .attr(`transform`, `rotate(-45)`);

function render(subject = `latin`) {
    var t = d3.transition().duration(1000);

    var update = svg.selectAll(`rect`)
        .data(data.filter(d => d[subject]), d => d.name);

    update.exit()
        .transition(t)
        .attr(`y`, height)
        .attr(`height`, 0)
        .remove();

    update
        .transition(t)
        .delay(1000)
        .attr(`y`, d => yScale(d[subject]))
        .attr(`height`, d => height - yScale(d[subject]))
        .style(`fill`, `blue`);


    update.enter()
        .append(`rect`)
        .attr(`y`, height)
        .attr(`height`, 0)
        .attr(`x`, d => xScale(d.name))
        .attr(`width`, d => xScale.bandwidth())
        .style(`fill`, `lime`)
        .transition(t)
        .delay(update.exit().size() ? 2000 : 0)
        .attr(`y`, d => yScale(d[subject]))
        .attr(`height`, d => height - yScale(d[subject]));
}

render(`latin`);
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}