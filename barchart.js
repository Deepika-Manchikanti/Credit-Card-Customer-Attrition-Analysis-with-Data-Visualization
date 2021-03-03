function drawBarChart(val){
    
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
document.getElementById('mybarchart').innerHTML = "";
var svg = d3.select("#mybarchart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("BankChurners.csv", function(data) {
    var countObj = {};

// count how much each gender occurs in list and store in countObj
data.forEach(function(d) {
       
    if(countObj[d[val]] == undefined) {
        countObj[d[val]] = 0;
    } else {
        countObj[d[val]] = countObj[d[val]] + 1;
        
    }
});
// now store the count in each data member
data.forEach(function(d) {
    d.count = countObj[d[val]];
    // console.log(d.count);
});


// X axis
var x = d3.scaleBand()
  .rangeRound([ 0, width ])
  .domain(data.map(function(d) { return d[val]; }))
  .paddingInner(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(5,5)")
    .style("text-anchor", "end");
    
  
// Add Y axis
var y = d3.scaleLinear()
  .range([height,0])
  .domain([0,d3.max(data, function(d) { return d.count; })])   
svg.append("g")
  .call(d3.axisLeft(y));

// Add X axis label:
svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width - 20)
  .attr("y", height + margin.top + 15)
  .text(val)

// Y axis label:
svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+20)
  .attr("x", -margin.top)
  .text("Number of Customers")


// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d[val]); })
    .attr("y", function(d) { return y(d.count); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.count); })
    .attr("fill", "#FFC300")

    .on("mouseover", function(d) {
        var xPosition = x.bandwidth() / 2;
		var yPosition = height;
        d3.select(this)
            .attr("fill", "red")
       
        svg.append("text")
          
           .attr('class', 'val') // add class to text label
           .attr('x', function() {
            return x(d[val])+x.bandwidth() / 2 - 15;
       })
           .attr('y', function() {
           return y(d.count)-5;
       })
           .attr('width',x.bandwidth())
           .text(function() {
            return [d.count] ;  // Value of the text
     });
     
    })
 
    .on("mouseout", function() {
        d3.select(this)
            .attr("fill", "#FFC300");
        

        d3.selectAll('.val')
        .remove()
        
    });
    
    
});

}
