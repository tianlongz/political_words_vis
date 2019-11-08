/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData) {

        /**List of all elements that will populate the table.*/
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = teamData.slice();

        ///** Store all match data for the 2014 Fifa cup */
        this.teamData = teamData;

        this.tableHeaders = ["Frequency", "Percentage", "Total"];

        /** Set variables for commonly accessed data columns*/
        this.dHeader = 'percent_of_d_speeches';
        this.rHeader = 'percent_of_r_speeches';

        /** Setup the scales*/
        this.perScale = d3.scaleLinear()
            .range([0, 200])
            .domain([-100, 100]);

        /** Used for games/wins/losses*/
        this.freScale = d3.scaleLinear()
            .range([0, 100])
            .domain([0, 1]);

        this.categoryDic = {
            "economy/fiscal issues" : "mediumseagreen",
            "health care" : "darkorange",
            "crime/justice" : "cornflowerblue",
            "energy/environment" : "red",
            "education": "purple",
            "mental health/substance abuse" : "yellow"
        };

        this.partyDic = {
            "d" : "deepskyblue",
            "r" : "indianred",
        };
    }

    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {

        // ******* TODO: PART II *******
        //Update Scale Domains
        let that = this;
        let sortedTableHeaders = this.tableHeaders.map(() => false);

        // Create the axes
        //add GoalAxis to header of col 1.
        d3.select('#freHeader')
            .append('svg')
            .attr('width', 120)
            .attr('height', 20)
            .append('g')
            .attr("transform", "translate(10, 18)")
            .call(d3.axisTop(this.freScale)
                .tickValues([0,0.5,1.0]));

        //add GoalAxis to header of col 1.
        d3.select('#perHeader')
            .append('svg')
            .attr('width', 220)
            .attr('height', 20)
            .append('g')
            .attr("transform", "translate(10, 18)")
            .call(d3.axisTop(this.perScale)
                .tickFormat(d => Math.abs(d)));

        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers
        d3.selectAll("thead td").data(this.tableHeaders).on("click", (k, i) => {
            let invert;
            if (sortedTableHeaders[i] === true) {
                sortedTableHeaders[i] = false;
                invert = true;
            } else {
                sortedTableHeaders = this.tableHeaders.map(() =>{
                    return false
                });
                sortedTableHeaders[i] = true;
                invert = false;
            }

            that.tableElements = that.tableElements.sort((a, b) =>{
                if (invert) {
                    let temp = b;
                    b = a;
                    a = temp;
                }
                if (k === 'Percentage') {
                    if (b[that.dHeader] === a[that.dHeader]) {
                        return a['phrase'] < b['phrase'] ? -1 : 1
                    } else {
                        return (b[that.dHeader]) - (a[that.dHeader]);
                    }
                }
                else if (k === 'Frequency' || k === "Total") {
                    if (b.total === a.total) {
                        return a['phrase'] < b['phrase'] ? -1 : 1
                    } else {
                        return (b.total - a.total);
                    }
                }
                else {
                        return a['phrase'] < b['phrase'] ? 1 : -1
                }
            });
            this.updateTable();
        });

        let invert = false;
        d3.selectAll("thead th").data('Phrase').on("click", (k, i) => {
            if (invert === false) {
                invert = true;
            } else {
                invert = false;
            }
            that.tableElements = that.tableElements.sort((a, b) =>{
                if (invert) {
                    let temp = b;
                    b = a;
                    a = temp;
                }
                return a['phrase'] < b['phrase'] ? 1 : -1
            });
            this.updateTable();
        });

        d3.selectAll("thead").style("font-weight", "bold");
        d3.selectAll("thead th").style("background", "#6bfcff").style("padding", "2px");
        d3.selectAll("thead td").style("background", "#6bfcff").style("background-origin", "content-box");
    }


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
    **/
    updateTable() {
        // ******* TODO: PART III *******
        let that = this;
        //Create table rows
        let tr = d3.select("tbody").selectAll("tr")
            .data(this.tableElements);
        tr.exit().remove();

        let trEnter = tr.enter().append("tr");

        //Team Names
        trEnter.append("th");
        tr = trEnter.merge(tr);
        tr.select("th")
            .text(d => d.phrase)
            .style("overflow", "hidden")
            .style("white-space", "nowrap")
            .style("text-overflow", "ellipsis");

        //Data for each cell is of the type: {'value':<[array of 1 or two elements]>}
        let td = tr.selectAll("td")
            .data(d => {
                return that.tableHeaders.map((k, i) => {
                    if (i === 1) { //for the first column, you need a 2 element array
                        return {
                            'color' : that.categoryDic[d.category],
                            'vis': 'goals',
                            'value': [d[that.dHeader],d[that.rHeader]]
                        }
                    }
                    else if (i === 2) {
                        return {'color' : that.categoryDic[d.category], 'vis': 'text', 'value': d.total}
                    }
                    else {
                        return {'color' : that.categoryDic[d.category], 'vis': 'bars', 'value': (d.total)*0.02}
                    }
                });
            });

        td.exit().remove();

        let tdEnter = td.enter().append("td");

        let svgEnter = tdEnter.filter(d => {
            return d.vis !== 'text'
        })
            .append("svg");

        td = tdEnter.merge(td);

        let svg = td.select("svg")
            .attr("width", d => d.vis === 'bars' ? 120 : 220)
            .attr("height", 20)
            .attr("class", d => d.vis === 'bars' ? 'freTd' : 'perTd')
            .text(d => d.value);

        //Populate table

        let gameColumns = svg.filter(d => {
            return d.vis === 'bars';
        });

        gameColumns.append("rect");
        gameColumns.select("rect")
            .attr("x",10)
            .attr("y",0)
            .attr("height", 20)
            .attr("width", d => {
                return that.freScale(d.value);
            })
            .attr("fill", d => {
                return d.color;
            });

        let roundColumns = td.filter(d => {
            return d.vis === 'text';
        });

        roundColumns.join("text")
            .text(d => d.value)
            .style("text-align", "center");

        //Create diagrams in the goals column
        let goalColumns = svg.filter(d => {
            return d.vis === 'goals';
        });


        goalColumns.append("rect")
            .classed('first rect', true);
        goalColumns.select("rect.first")
            .attr("x", d => {
                return 110 - that.perScale(d.value[0])/2;
            })
            .attr("y", 0)
            .attr("width", d => {
                return that.perScale(d.value[0])/2;
            })
            .attr('height', 20)
            .attr('fill', "deepskyblue");

        goalColumns.append("rect")
            .classed('second', true);
        goalColumns.select("rect.second")
            .attr("x", 110)
            .attr("y", 0)
            .attr("width", d => {
                return that.perScale(d.value[1])/2;
            })
            .attr('height', 20)
            .attr('fill', "indianred");
    };

}
