/** Class implementing the bubblechart. */
class Bubble {
    /**
     * Creates a Table Object
     */
    constructor(wordData, tableObject) {
        this.bubbleElements = wordData.slice();
        this.categoryList = [
            "Economy/fiscal issues",
            "Energy/environment",
            "Crime/justice",
            "Education",
            "Health care",
            "Mental health/substance abuse",
        ];
        this.categoryDic = {
            "economy/fiscal issues" : "mediumseagreen",
            "health care" : "darkorange",
            "crime/justice" : "cornflowerblue",
            "energy/environment" : "red",
            "education": "purple",
            "mental health/substance abuse" : "yellow"
        };
        this.circleScale = d3.scaleLinear()
            .domain([
                d3.min(this.bubbleElements.map(d => +d.total)),
                d3.max(this.bubbleElements.map(d => +d.total))
            ])
            .range([3, 12])
            .nice();
        this.table = tableObject;
    };

    createBubble() {
        let that = this;
        const tooltip = d3.select("#tooltip");
        let spanned = false;

        //brushes
        let activeBrush = null;
        let activeBrushNode = null;
        let svg = d3.select("#brushes");
        const g1 = svg.append('g').attr('transform', 'translate(10,85)').classed('brushes', true).attr("class", "brush1");
        const g2 = svg.append('g').attr('transform', 'translate(10,215)').classed('brushes', true).attr("class", "brush2");
        const g3 = svg.append('g').attr('transform', 'translate(10,345)').classed('brushes', true).attr("class", "brush3");
        const g4 = svg.append('g').attr('transform', 'translate(10,475)').classed('brushes', true).attr("class", "brush4");
        const g5 = svg.append('g').attr('transform', 'translate(10,605)').classed('brushes', true).attr("class", "brush5");
        const g6 = svg.append('g').attr('transform', 'translate(10,735)').classed('brushes', true).attr("class", "brush6");

        g1.append('rect').attr('height', 130).attr('width', 880).attr('fill', 'none');
        g2.append('rect').attr('height', 130).attr('width', 880).attr('fill', 'none');
        g3.append('rect').attr('height', 130).attr('width', 880).attr('fill', 'none');
        g4.append('rect').attr('height', 130).attr('width', 880).attr('fill', 'none');
        g5.append('rect').attr('height', 130).attr('width', 880).attr('fill', 'none');
        g6.append('rect').attr('height', 130).attr('width', 880).attr('fill', 'none');

        d3.selectAll(".brush1").each(function(){
            let bubbleData = that.bubbleElements;
            let selection = d3.select(this);

            let brush = d3.brushX().extent([[0,0], [900, 130]])
                .on('start', function() {
                    if (activeBrush && selection !== activeBrushNode) {
                        activeBrushNode.call(activeBrush.move, null);
                    }
                    activeBrush = brush;
                    activeBrushNode = selection;

                })
                .on("brush end", function () {
                    const selectRange = d3.brushSelection(this);
                    const selectedPoints = [];
                    that.bubbles.style("fill", "gray");
                    if (selectRange) {
                        const [left, right] = selectRange;
                        bubbleData.forEach(d => {
                            if (
                                d.sourceX - 10>= left &&
                                d.sourceX -10 <= right &&
                                !spanned) {
                                selectedPoints.push(d);
                            }
                            else if (
                                d.category === "economy/fiscal issues" &&
                                d.moveX -10 >= left &&
                                d.moveX -10 <= right &&
                                spanned) {
                                selectedPoints.push(d);
                            }
                        });
                        that.table.tableElements = selectedPoints.slice();
                        that.table.updateTable();
                        that.bubbles.filter(d => selectedPoints.includes(d))
                            .style("fill", d => {
                                return that.categoryDic[d.category]
                            });
                    }

                    else {
                        that.table.tableElements = that.bubbleElements;
                        that.table.updateTable();
                        that.bubbles.style("fill", d => {
                            return that.categoryDic[d.category]
                        })
                    }
                });

            selection.call(brush);
        });

        d3.selectAll(".brush2").each(function(){
            let bubbleData = that.bubbleElements;
            let selection = d3.select(this);
            let brush = d3.brushX().extent([[0,0], [900, 130]])
                .on('start', function() {
                    if (activeBrush && selection !== activeBrushNode) {
                        activeBrushNode.call(activeBrush.move, null);
                    }
                    activeBrush = brush;
                    activeBrushNode = selection;
                })
                .on("brush end", function () {
                    const selectRange = d3.brushSelection(this);
                    const selectedPoints = [];
                    that.bubbles.style("fill", "gray");
                    if (selectRange) {
                        const [left, right] = selectRange;
                        bubbleData.forEach(d => {
                            if (
                                d.category === "energy/environment" &&
                                d.moveX -10 >= left &&
                                d.moveX -10 <= right &&
                                spanned) {
                                selectedPoints.push(d);
                            }
                        });
                        that.table.tableElements = selectedPoints.slice();
                        that.table.updateTable();
                        that.bubbles.filter(d => selectedPoints.includes(d))
                            .style("fill", d => {
                                return that.categoryDic[d.category]
                            });
                    }

                    else {
                        that.table.tableElements = that.bubbleElements;
                        that.table.updateTable();
                        that.bubbles.style("fill", d => {
                            return that.categoryDic[d.category]
                        })
                    }
                });

            selection.call(brush);
        });

        d3.selectAll(".brush3").each(function(){
            let bubbleData = that.bubbleElements;
            let selection = d3.select(this);

            let brush = d3.brushX().extent([[0,0], [900, 130]])
                .on('start', function() {
                    if (activeBrush && selection !== activeBrushNode) {
                        activeBrushNode.call(activeBrush.move, null);
                    }
                    activeBrush = brush;
                    activeBrushNode = selection;
                })
                .on("brush end", function () {
                    const selectRange = d3.brushSelection(this);
                    const selectedPoints = [];
                    that.bubbles.style("fill", "gray");
                    if (selectRange) {
                        const [left, right] = selectRange;
                        bubbleData.forEach(d => {
                            if (
                                d.category === "crime/justice" &&
                                d.moveX -10 >= left &&
                                d.moveX -10 <= right &&
                                spanned) {
                                selectedPoints.push(d);
                            }
                        });
                        that.table.tableElements = selectedPoints.slice();
                        that.table.updateTable();
                        that.bubbles.filter(d => selectedPoints.includes(d))
                            .style("fill", d => {
                                return that.categoryDic[d.category]
                            });
                    }

                    else {
                        that.table.tableElements = that.bubbleElements;
                        that.table.updateTable();
                        that.bubbles.style("fill", d => {
                            return that.categoryDic[d.category]
                        })
                    }
                });

            selection.call(brush);
        });

        d3.selectAll(".brush4").each(function(){
            let bubbleData = that.bubbleElements;
            let selection = d3.select(this);

            let brush = d3.brushX().extent([[0,0], [900, 130]])
                .on('start', function() {
                    if (activeBrush && selection !== activeBrushNode) {
                        activeBrushNode.call(activeBrush.move, null);
                    }
                    activeBrush = brush;
                    activeBrushNode = selection;
                })
                .on("brush end", function () {
                    const selectRange = d3.brushSelection(this);
                    const selectedPoints = [];
                    that.bubbles.style("fill", "gray");
                    if (selectRange) {
                        const [left, right] = selectRange;
                        bubbleData.forEach(d => {
                            if (
                                d.category === "education" &&
                                d.moveX -10 >= left &&
                                d.moveX -10 <= right &&
                                spanned) {
                                selectedPoints.push(d);
                            }
                        });
                        that.table.tableElements = selectedPoints.slice();
                        that.table.updateTable();
                        that.bubbles.filter(d => selectedPoints.includes(d))
                            .style("fill", d => {
                                return that.categoryDic[d.category]
                            });
                    }

                    else {
                        that.table.tableElements = that.bubbleElements;
                        that.table.updateTable();
                        that.bubbles.style("fill", d => {
                            return that.categoryDic[d.category]
                        })
                    }
                });

            selection.call(brush);
        });

        d3.selectAll(".brush5").each(function(){
            let bubbleData = that.bubbleElements;
            let selection = d3.select(this);

            let brush = d3.brushX().extent([[0,0], [900, 130]])
                .on('start', function() {
                    if (activeBrush && selection !== activeBrushNode) {
                        activeBrushNode.call(activeBrush.move, null);
                    }
                    activeBrush = brush;
                    activeBrushNode = selection;
                })
                .on("brush end", function () {
                    const selectRange = d3.brushSelection(this);
                    const selectedPoints = [];
                    that.bubbles.style("fill", "gray");
                    if (selectRange) {
                        const [left, right] = selectRange;
                        bubbleData.forEach(d => {
                            if (
                                d.category === "health care" &&
                                d.moveX -10 >= left &&
                                d.moveX -10 <= right &&
                                spanned) {
                                selectedPoints.push(d);
                            }
                        });
                        that.table.tableElements = selectedPoints.slice();
                        that.table.updateTable();
                        that.bubbles.filter(d => selectedPoints.includes(d))
                            .style("fill", d => {
                                return that.categoryDic[d.category]
                            });
                    }

                    else {
                        that.table.tableElements = that.bubbleElements;
                        that.table.updateTable();
                        that.bubbles.style("fill", d => {
                            return that.categoryDic[d.category]
                        })
                    }
                });

            selection.call(brush);
        });

        d3.selectAll(".brush6").each(function(){
            let bubbleData = that.bubbleElements;
            let selection = d3.select(this);

            let brush = d3.brushX().extent([[0,0], [900, 130]])
                .on('start', function() {
                    if (activeBrush && selection !== activeBrushNode) {
                        activeBrushNode.call(activeBrush.move, null);
                    }
                    activeBrush = brush;
                    activeBrushNode = selection;
                })
                .on("brush end", function () {
                    const selectRange = d3.brushSelection(this);
                    const selectedPoints = [];
                    that.bubbles.style("fill", "gray");
                    if (selectRange) {
                        const [left, right] = selectRange;
                        bubbleData.forEach(d => {
                            if (
                                d.category === "mental health/substance abuse" &&
                                d.moveX -10 >= left &&
                                d.moveX -10 <= right &&
                                spanned) {
                                selectedPoints.push(d);
                            }
                        });
                        that.table.tableElements = selectedPoints.slice();
                        that.table.updateTable();
                        that.bubbles.filter(d => selectedPoints.includes(d))
                            .style("fill", d => {
                                return that.categoryDic[d.category]
                            });
                    }

                    else {
                        that.table.tableElements = that.bubbleElements;
                        that.table.updateTable();
                        that.bubbles.style("fill", d => {
                            return that.categoryDic[d.category]
                        })
                    }
                });

            selection.call(brush);
        });


        let ghead = d3.select("#bubblehead").attr("transform", "translate(0,30)");

        let gaxis = d3.select("#bubbleaxis").attr("transform", "translate(20,60)");

        let xScale = d3.scaleLinear()
            .domain([-50, 53])
            .range([0, 860]);

        gaxis.call(d3.axisTop(xScale)
            .tickFormat(d => Math.abs(d)));

        ghead.append("text").attr("x", 0).attr("y", 0).text("Democratic Leaning").attr("font-size", "22px").attr("font-weight", "bold");
        ghead.append("text").attr("x", 680).attr("y", 0).text("Republican Leaning").attr("font-size", "22px").attr("font-weight", "bold");

        //bubbles
        let g = d3.select("#bubblechart").attr("transform", "translate(0,150)");

        let titles = g.selectAll("text").data(this.categoryList)
            .enter().append("text")
            .attr("x", 0)
            .attr("y", -50)
            .text(d => d)
            .attr("font-size", "20px")
            .style("opacity", 0);

        let zeroline = g.append("line")
            .attr("x1", 438)
            .attr("x2", 438)
            .attr("y1", -70)
            .attr("y2", 80)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);


        this.bubbles = g.selectAll("circle").data(this.bubbleElements)
            .join("circle")
            .attr("cx", d => d.sourceX)
            .attr("cy", d => d.sourceY)
            .attr("r", d => {
                return that.circleScale(d.total)
            })
            .style("fill", d => {
                return that.categoryDic[d.category]
            })
            .style("stroke", "black")
            .style("stroke-width", "1px");

        //tooltip hover
        this.bubbles.on("mouseover", function(d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 1);
            tooltip
                .html(that.bubbleToolTipRender(d))
                .style("left", `${d3.event.pageX}px`)
                .style("top", `${d3.event.pageY}px`);
        })
            .on("mouseleave", function(d) {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // toggle the checkbox to expand the bubbles
        d3.select("#toggle").on("click", () => {
            if (spanned === false) {
                zeroline.transition()
                    .duration(300)
                    .attr("y2", 6 * 130 - 50);
                titles.transition()
                    .duration(300)
                    .attr("y", (d, i) => i * 130 - 50)
                    .style("fill", "gray")
                    .style("opacity", 1);
                that.bubbles.transition()
                    .duration(300)
                    .attr("cx", d => d.moveX)
                    .attr("cy", d => d.moveY);
                spanned = true
            }
            else {
                zeroline.transition()
                    .duration(300)
                    .attr("y2", 80)
                titles.transition()
                    .duration(300)
                    .attr("y", -50)
                    .style("opacity", 0);
                that.bubbles.transition()
                    .duration(300)
                    .attr("cx", d => d.sourceX)
                    .attr("cy", d => d.sourceY);
                spanned = false
            }
        });

        //story telling button
        let button = d3.select('#button-wrap').on("click", ()=>{
            if (spanned === false) {
                that.highlightData(false)
            }
            else {
                that.highlightData(true)
            }
        });
    };

    updateBrush(selectedPoints) {
        let that = this;
        this.bubbles.classed("dimmed", true);
        that.table(selectedPoints).updateTable();
        if (selectedPoints.length > 0) {
            this.bubbles
                .filter((d, i) => selectedPoints.includes(i))
                .classed("dimmed", false);
        }
    }

    highlightData(checked){
        let data = [
            {"sX": 26.920504490731886, "sY": 3.262762753382392e-14, "mX": 26.920504490731886, "mY":129.9606781328506},
            {"sX": 875, "sY": 6.525525506764785e-14, "mX": 875, "mY":259.9213562657012}
            ];
        let speech = [
            "Democratic speeches ",
            "mentioned climate change",
            "49.11% more",
            "Republican speeches",
            "mentioned prison",
            "52.33% more"];

        let paneWrap = d3.select('body').append('div').attr('class', 'pane');
        let pane = paneWrap.append('svg');
        let rectCover = pane.append('rect')
            .classed('pane-rect', true)
            .attr('opacity', 0)
            .transition()
            .delay(500).attr('opacity', 0.5);
        ///

        let g = pane.selectAll("g").data(data);
        g.exit().remove();
        let gEnter = g.enter().append("g");
        g = gEnter.merge(g)
            .attr("transform", "translate(33, 406)");

        let circles = g.append("circle")
            .attr("cx", d => checked ? d.mX : d.sX)
            .attr("cy", d => checked ? d.mY : d.sY)
            .attr("r", 8)
            .style("fill", d => d.sX === 875 ? "red" : "blue")
            .attr('opacity', 0)
            .transition()
            .delay(500).attr('opacity', 1);

        let lines = g.append("line")
            .attr('x1', d => checked ? d.mX : d.sX)
            .attr('x2', d => checked ? d.mX : d.sX)
            .attr('y1', d => checked ? d.mY : d.sY)
            .attr('y2', d => checked ? d.mY-50 : d.sY-50)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('opacity', 0)
            .transition()
            .delay(500).attr('opacity', 1);

        let rects = g.append("rect")
            .attr('width', 200)
            .attr('height', 100)
            .attr('x', d => checked ? d.mX : d.sX)
            .attr('y', d => checked ? d.mY - 150 : d.sY -150)
            .attr('fill', '#fff')
            .style("stroke", "black")
            .attr('opacity', 0)
            .transition()
            .delay(500).attr('opacity', 1);

        let text1 = g.append('text')
            .attr('x', d => checked ? d.mX + 10: d.sX + 10)
            .attr('y', d => checked ? d.mY - 120 : d.sY -120)
            .attr('opacity', 0)
            .transition()
            .delay(500)
            .attr('opacity', 1)
            .text(d => d.sX === 875 ? speech[3]: speech[0]);
        let text2 = g.append('text')
            .attr('x', d => checked ? d.mX + 10: d.sX + 10)
            .attr('y', d => checked ? d.mY - 100 : d.sY -100)
            .attr('opacity', 0)
            .transition()
            .delay(500)
            .attr('opacity', 1)
            .text(d => d.sX === 875 ? speech[4]: speech[1]);
        let text3 = g.append('text')
            .attr('x', d => checked ? d.mX + 10: d.sX + 10)
            .attr('y', d => checked ? d.mY - 80 : d.sY -80)
            .attr('opacity', 0)
            .transition()
            .delay(500)
            .attr('opacity', 1)
            .text(d => d.sX === 875 ? speech[5]: speech[2]);

        pane.on('click', function(){
            paneWrap.remove();
        });
    }

    bubbleToolTipRender(data) {
                return `
        <h2 class="city">${data.phrase}</h2>
        <div>R ${data.position > 0 
                    ? `+ ${data.position.toFixed(3)}`
                    : `${data.position.toFixed(3)}`
                } %</div>
        <div>In ${(data.total)*2}% of speeches</div>
        `;
    }
}