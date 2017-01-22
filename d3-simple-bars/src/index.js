function setOpacity(selection, opacity) {
	selection.style(`fill-opacity`, opacity);
}

d3.json('data/data.json', (points)=>{
	 var bar = d3.select(`.chart`)
	 .append(`svg`)
		.attr(`width`,`200`)
		.attr(`height`,`350`)
	.selectAll(`g`)
	.data(points)
	.enter()
	.append(`g`)
		.attr(`transform`, (d, i) => `translate(0,${i*33})`);



	bar.append(`rect`)
		.style(`width`, d => d.age*2)
		.attr(`class`, `bar`)
		.on(`mouseover`, function (d, i, e) {
			d3.selectAll(e)
				.filter(`:not(:hover)`)
				.call(setOpacity, 0.5);
		})
		.on(`mouseout`, function (d, i, e) {
			d3.selectAll(e)
				.call(setOpacity, 1);
		});

	bar.append(`text`)
		.text(d =>  d.name)
		.attr(`y`, 20);
	
});