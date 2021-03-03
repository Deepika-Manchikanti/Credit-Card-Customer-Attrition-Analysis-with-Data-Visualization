function drawHistogram(val){
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 40, bottom: 40, left: 70},
        width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        nBin = 10;
    
    // append the svg object to the body of the page
    document.getElementById('myhistogram').innerHTML = "";
    
    var svg = d3.select("#myhistogram")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
    
    // get the data
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
            
        });
        
    
      // X axis: scale and draw:
      var x = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d[val] })])  
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
    
    
          var y = d3.scaleLinear()
          .range([height, 0]);
    
        var yAxis = svg.append("g");  
    
    function updatebincount(nBin) {
      console.log("updatebincount");
    
    if(nBin<3){
        nBin = 3;
    }
    
    if(nBin>70)
    {
        nBin = 70;
    }
    
      // set the parameters for the histogram
      var histogram = d3.histogram()
          .value(function(d) { return d[val]; })   // Giving the vector a value
          .domain(x.domain())  // then the domain of the graphic
          .thresholds(x.ticks(nBin)); // then the numbers of bins
          console.log("nBin"+ nBin);
      // and applying this function to data to get the bins
      var bins = histogram(data);
    
      // Y axis: scale and draw:
      
          y.domain([0, d3.max(bins, function(d) { return d.length; })])  // d3.histogram has to be called before the Y axis 
      
          yAxis.call(d3.axisLeft(y));
    
          // X axis label:
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
    
    
      svg.selectAll("rect").remove();
    
      // append the bar rectangles to the svg element
       svg.selectAll("rect")
          .data(bins)
          .enter()
          .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .attr("fill", "#FFC300")
            .on("mouseover", function(d) {
                d3.select(this)
                    .attr("fill", "red")
                    svg.append("text")
              
                    .attr('class', 'val') // add class to text label
                    .attr('x', function() {
                     return (x(d.x1) + x(d.x0))/2 - 15;
                })
                   .attr('y',function(){
                       return y(d.length)-5;
                   })
                    .attr('width',x(d.x1) - x(d.x0) -1)
                    .text(function() {
                        
                     return [d.length] ;  // Value of the text
              });
                
            })
        
            .on("mouseout", function() {
                d3.select(this)
                    .attr("fill", "#FFC300");
    
                    d3.selectAll('.val')
            .remove()
                    
            });
           
        }
    
        updatebincount(20)
           
        d3.select("#myhistogram").on("mousedown", function(d){
                
               var startX = d3.event.pageX;
               attrclr = d3.select(this).classed("active",true);
    
               var w = d3.select(window)
                    .on("mousemove",function(d){
                        
                        var xpos = d3.event.pageX;
                        const posdiff = startX - xpos;
                        
                        if(posdiff>0){
                            //left
                            
                            nBin = nBin - 2;
                            updatebincount(nBin);
                        }else if(posdiff < 0){
                            //right
                            
                            nBin = nBin + 2;
                            updatebincount(nBin);
                        }
                    })
                    .on("mouseup",function(d){
                       
                        attrclr.classed("active",false);
    
                        w.on("mousemove",null)
                         .on("mouseup",null);
                    })
                    
           });
    
    
    });
    
    }
    