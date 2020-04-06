// 1) create funtion to display metadata (use filter function to extract name id # dictionary info)**All dictionaries are contained within metadata dictionary key (Demographic Info id="sample-metadata" )


function metadata(demoInfo){

    d3.json("samples.json").then((data)=>{
     
        var metadata = data.metadata;
        var filterData = metadata.filter(object=>object.id==demoInfo);
        var result = filterData[0];
        var demoGraphic = d3.select("#sample-metadata");
        
        demoGraphic.html("");
        
        Object.entries(result).forEach(([key,value])=>{
            demoGraphic.append("h6").text(`${key.toUpperCase()}: ${value}`);

        });

    });

}
// 2)Create funtion to populate the drop down and call metadata function and chart function(id="selDataset")

function dropMenu(){

    var nameId = d3.select("#selDataset");
    
    d3.json("samples.json").then((data)=>{
     
        var sampleNames = data.names;

        sampleNames.forEach((sample)=>{
            nameId.append("option")
            .text(sample)
            .property("value",sample)
        });
        
        var firstSample = sampleNames[0];
        metadata(firstSample);
        createBubChart(firstSample)
        createBarChart(firstSample)
    });
}

dropMenu()

function optionChanged(newData){
    metadata(newData);
    createBubChart(newData)
    createBarChart(newData)
}

// 3) Create function to display and populate the bar and bubble chart (id="bubble" id="bar")

function createBubChart(bubbleInfo){

    d3.json("samples.json").then((data)=>{
     
        var dataBubSample = data.samples;
        var filterBubData = dataBubSample.filter(object=>object.id==bubbleInfo);
        var resultBub = filterBubData[0];
        var otuIdBub = resultBub.otu_ids;
        var sampleBubValues = resultBub.sample_values;
        var otuBubLabels = resultBub.otu_labels;
        console.log(sampleBubValues);
        var bubble_layout = {
            title: "Bacteria Culture per Sample"
        };
        var bubble_data = [{
            x: otuIdBub,
            y: sampleBubValues,
            text: otuBubLabels,
            mode: "markers",
            maker: {
                size: sampleBubValues,
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                colorscale: "Earth"
            }
        }];

        Plotly.newPlot("bubble", bubble_data, bubble_layout)

    });
}

function createBarChart(barInfo){

    d3.json("samples.json").then((data)=>{
     
        var dataBarSample = data.samples;
        var filterBarData = dataBarSample.filter(object=>object.id==barInfo);
        var resultBar = filterBarData[0];
        var otuIdBar = resultBar.otu_ids;
        var sampleBarValues = resultBar.sample_values;
        var otuBarLabels = resultBar.otu_labels;
        // var sortBarValue = sampleBarValues.sort(object)
        // var top10 = 
        console.log(sampleBarValues);
        var bar_layout = {
            title: "Bacteria Culture per Sample"
        };
        var bar_data = [{
            type: "bar",
            orientation: 'h',
            x: sampleBarValues,
            y: otuIdBar,
            text: otuBarLabels,
            // mode: "markers",
            maker: {
                size: sampleBarValues,
                color: otuIdBar,
                colorscale: "Earth"
            }
        }];

        Plotly.newPlot('bar', bar_data, bar_layout)

    });
}
// 4) Call option change function with new sample values. Call chart function and metadata function inside option change
