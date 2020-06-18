const url='http://localhost:3050/api/';
window.onload=async ()=>{
    const chart = am4core.create("chartdiv", am4charts.PieChart);

    const films=await fetch(`${url}film`).then(data=>data.json());
    const genres={};

    films.forEach(film=>{
        film.genres.forEach(filmGenre=>{
            const genreName=filmGenre.genreName;
            if(!genres.hasOwnProperty(genreName)){
                genres[genreName]=0;
            }
            genres[genreName]++;
        })
    })

    const data=[];

    for(let key in genres){
        const dataObject={
            genre:key,
            amount:genres[key]
        }
        data.push(dataObject);
    }


    // Add data
    chart.data = data;

// Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "genre";


// Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#4a2abb");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

}
