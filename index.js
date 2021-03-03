function getBar(){
    document.getElementById("bar").classList.remove("hidden");
    document.getElementById("hist").classList.add("hidden");
    document.getElementById("scatt").classList.add("hidden");
}

function getHist(){
    document.getElementById("hist").classList.remove("hidden");
    document.getElementById("bar").classList.add("hidden");
    document.getElementById("scatt").classList.add("hidden");
}

function getScatt(){
    document.getElementById("scatt").classList.remove("hidden");
    document.getElementById("bar").classList.add("hidden");
    document.getElementById("hist").classList.add("hidden");
}

function getValue1(){
    var val = document.getElementById("categories1").value;
    
    document.getElementById("xaxisLabel").innerHTML = val;
    drawBarChart(val);
}

function getValue2(){
    var val = document.getElementById("categories2").value;
    
    document.getElementById("xaxisLabel").innerHTML = val;
    drawHistogram(val);
}

var xdata = "";
var ydata = "";

function getValue3(){
    var val1 = document.getElementById("categories3").value;

    if(document.getElementById("xaxis").checked){
        xdata = val1
    }else if(document.getElementById("yaxis").checked){
        ydata = val1
    }
    else{
        alert("Please select the axis");
    }

    if(xdata != "" && ydata != ""){
        drawScatterPlot(xdata, ydata)
        xdata="";
        ydata="";
    }
    document.getElementById("xaxis").checked = false;
    document.getElementById("yaxis").checked = false;
    var val1="";
    
    
}

var attrition = []
var customerage = []
var gender = []
var educationlevel = []
var maritalstatus = []
var incomecategory = []
var cardcategory = []
var monthsonbook = []
var creditlimit = []
var totalrevolvingbal = []
var avgopentobuy = []
var totalamtchng = []
var totaltranschng = []
var totaltransct = []
var totalctchng = []
var avgutilizationratio = []

d3.csv("BankChurners.csv", function(csvdata) {
    csvdata.map(function (d) {
        attrition.push(d.Attrition_Flag);
        customerage.push(d.Customer_Age);
        gender.push(d.Gender);
        educationlevel.push(d.Education_Level);
        maritalstatus.push(d.Marital_Status);
        incomecategory.push(d.Income_Category);
        cardcategory.push(d.Card_Category);
        monthsonbook.push(d.Months_on_book);
        creditlimit.push(d.Credit_Limit);
        totalrevolvingbal.push(d.Total_Revolving_Bal);
        avgopentobuy.push(d.Avg_Open_To_Buy);
        totalamtchng.push(d.Total_Amt_Chng_Q4_Q1);
        totaltranschng.push(d.Total_Trans_Amt);
        totaltransct.push(d.Total_Trans_Ct);
        totalctchng.push(d.Total_Ct_Chng_Q4_Q1);
        avgutilizationratio.push(d.Avg_Utilization_Ratio);
    });
   
});

