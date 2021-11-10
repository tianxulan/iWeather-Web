/* BELOW CODE IS A MODIFED VERSION FROM A GIVEN EXAMPLE ON HOMEWORK DESCRIPTION  */

/**
 * This is a complex demo of how to set up a Highcharts chart, coupled to a
 * dynamic source and extended by drawing image sprites, wind arrow paths
 * and a second grid on top of the chart. The purpose of the demo is to inpire
 * developers to go beyond the basic chart types and show how the library can
 * be extended programmatically. This is what the demo does:
 *
 * - Loads weather forecast from www.yr.no in form of a JSON service.
 * - When the data arrives async, a Meteogram instance is created. We have
 *   created the Meteogram prototype to provide an organized structure of the
 *   different methods and subroutines associated with the demo.
 * - The parseYrData method parses the data from www.yr.no into several parallel
 *   arrays. These arrays are used directly as the data option for temperature,
 *   precipitation and air pressure.
 * - After this, the options structure is built, and the chart generated with
 *   the parsed data.
 * - On chart load, weather icons and the frames for the wind arrows are
 *   rendered using custom logic.
 */

 Highcharts.setOptions({
    time: {
        timezoneOffset: +7 * 60
   }
  });
  function Meteogram(json, container) {
    // Parallel arrays for the chart data, these are populated as the JSON file
    // is loaded
    this.symbols = [];
    //MODIFY: no precipitation in our digram
    //this.precipitations = [];
  
    this.humidity = []
  
    //MODIFY: no precipitationsErrors for our diagram
    // this.precipitationsError = []; // Only for some data sets
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];
  
    // Initialize
    this.json = json;
    this.container = container;
  
    // Run
    this.parseYrData();
  }
  
  /**
  * Mapping of the symbol code in yr.no's API to the icons in their public
  * GitHub repo, as well as the text used in the tooltip.
  *
  * https://api.met.no/weatherapi/weathericon/2.0/documentation
  */
  /**
  * Draw the weather symbols on top of the temperature series. The symbols are
  * fetched from yr.no's MIT licensed weather symbol collection.
  * https://github.com/YR/weather-symbols
  */
  
  
  
  /**
  * Draw blocks around wind arrows, below the plot area
  */
  Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
    const xAxis = chart.xAxis[0];
  
    for (
        let pos = xAxis.min, max = xAxis.max, i = 0;
        pos <= max + 36e5; pos += 36e5,
        i += 1
    ) {
  
        // Get the X position
        const isLast = pos === max + 36e5,
            x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);
  
        // Draw the vertical dividers and ticks
        const isLong = this.resolution > 36e5 ?
            pos % this.resolution === 0 :
            i % 2 === 0;
  
        chart.renderer
            .path([
                'M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
                'L', x, chart.plotTop + chart.plotHeight + 32,
                'Z'
            ])
            .attr({
                stroke: chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
            .add();
    }
  
    // Center items in block
    chart.get('windbarbs').markerGroup.attr({
        translateX: chart.get('windbarbs').markerGroup.translateX + 8
    });
  
  };
  
  /**
  * Build and return the Highcharts options structure
  */
  Meteogram.prototype.getChartOptions = function () {
    return {
        chart: {
            renderTo: this.container,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 500,
            alignTicks: false,
            scrollablePlotArea: {
                minWidth: 720
            }
        },
  
        defs: {
            patterns: [{
                id: 'precipitation-error',
                path: {
                    d: [
                        'M', 3.3, 0, 'L', -6.7, 10,
                        'M', 6.7, 0, 'L', -3.3, 10,
                        'M', 10, 0, 'L', 0, 10,
                        'M', 13.3, 0, 'L', 3.3, 10,
                        'M', 16.7, 0, 'L', 6.7, 10
                    ].join(' '),
                    stroke: '#68CFE8',
                    strokeWidth: 1
                }
            }]
        },
  
        title: {
            text: 'Hourly Weather (For Next 5 Days)',
            align: 'center',
            style: {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
  
        credits: {
            text: 'Forecast from <a href="https://yr.no">yr.no</a>',
            href: 'https://yr.no',
            position: {
                x: -40
            }
        },
  
        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat:
                '<small>{point.x:%A, %b %e, %H:%M}<small><br>',
            style:
                {
                    fontSize : "20px"
                }
        },
        
  
        xAxis: [{ // Bottom X axis
            type: 'datetime',
            tickInterval: 4 * 36e5, // two hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)',
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            showLastLabel: true,
            labels: {
                format: '{value:%H}'
            },
            crosshair: true
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: -5
            },
            opposite: true,
            tickLength: 20,
            gridLineWidth: 1
        }],
  
        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            maxPadding: 0.3,
            minRange: 8,
            tickInterval: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)'
  
        }, { // precipitation axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0,
            minRange: 10,
            min: 0
  
        }, { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'inHg',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '10px',
                    color: Highcharts.getOptions().colors[2]
                },
                textAlign: 'left',
                x: 3
            },
            labels: {
                style: {
                    fontSize: '8px',
                    color: Highcharts.getOptions().colors[2]
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        }],
  
        legend: {
            enabled: false
        },
  
        plotOptions: {
            series: {
                pointPlacement: 'between'
            }
        },
  
  
        series: [{
            name: 'Temperature',
            data: this.temperatures,
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '{series.name}: <b>{point.y}°F</b><br/>'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8'
        }, 
        // MODIFY: No this value for our diagram
        // {
        //     name: 'Precipitation',
        //     data: this.precipitationsError,
        //     type: 'column',
        //     color: 'url(#precipitation-error)',
        //     yAxis: 1,
        //     groupPadding: 0,
        //     pointPadding: 0,
        //     tooltip: {
        //         valueSuffix: ' mm',
        //         pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
        //             '{series.name}: <b>{point.minvalue} mm - {point.maxvalue} mm</b><br/>'
        //     },
        //     grouping: false,
        //     dataLabels: {
        //         enabled: this.hasPrecipitationError,
        //         filter: {
        //             operator: '>',
        //             property: 'maxValue',
        //             value: 0
        //         },
        //         style: {
        //             fontSize: '8px',
        //             color: 'gray'
        //         }
        //     }
        // },
         {
            // NOTICE: This is the blue column part
            // MODIFY: change precipition to humidty
            name: 'Humidity',
            data: this.humidity,
            type: 'column',
            color: '#9CCFFB',
            yAxis: 1,
            groupPadding: 0,
            pointPadding: 0,
            grouping: false,
            dataLabels: {
                enabled: !this.hasPrecipitationError,
                filter: {
                    operator: '>',
                    property: 'y',
                    value: 0
                },
                style: {
                    fontSize: '8px',
                    color: 'gray'
                }
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: 'Air pressure',
            color: "#F3B03D",
            data: this.pressures,
            marker: {
                enabled: false
            },
            shadow: false,
            tooltip: {
                valueSuffix: ' inHg'
            },
            dashStyle: 'shortdot',
            yAxis: 2
        }, {
            name: 'Wind',
            type: 'windbarb',
            id: 'windbarbs',
            color: Highcharts.getOptions().colors[1],
            lineWidth: 1.5,
            data: this.winds,
            vectorLength: 18,
            yOffset: -15,
            tooltip: {
                valueSuffix: ' mph'
            }
        }]
    };
  };
  
  /**
  * Post-process the chart from the callback function, the second argument
  * Highcharts.Chart.
  */
  Meteogram.prototype.onChartLoad = function (chart) {
  
    this.drawBlocksForWindArrows(chart);
  
  };
  
  /**
  * Create the chart. This function is called async when the data file is loaded
  * and parsed.
  */
  Meteogram.prototype.createChart = function () {
    this.chart = new Highcharts.Chart(this.getChartOptions(), chart => {
        this.onChartLoad(chart);
    });
  };
  
  Meteogram.prototype.error = function () {
    document.getElementById('loading').innerHTML =
        '<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
  };
  
  /**
  * Handle the data. This part of the code is not Highcharts specific, but deals
  * with yr.no's specific data format
  */
  Meteogram.prototype.parseYrData = function () {
  
    let pointStart;
    if (!this.json) {
        return this.error();
    }
  
    console.log(this.json);
  
    // Loop over hourly (or 6-hourly) forecasts
    this.json.data.timelines[0].intervals.forEach((node, i) => {
  
        const x = Date.parse(node.startTime)
            //MODIFY: no attribute called next 1/6 hour for our json
            //nextHours = node.data.next_1_hours || node.data.next_6_hours,
            //MODIFY: symbolCode is omitted for our digram
            //symbolCode = nextHours && nextHours.summary.symbol_code,
            //MODIFY: no attribute called next1hour in our json
            
            // ATTENTION MODIFY: don't know how to handle to varibale
            // to = node.data.next_1_hours ? x + 36e5 : x + 6 * 36e5;
  
        //// ATTENTION MODIFY: don't know how to handle to varibal
        // if (to > pointStart + 48 * 36e5) {
        //     return;
        // }
  
        // Populate the parallel arrays
        //this.symbols.push(nextHours.summary.symbol_code);
  
        this.temperatures.push({
            x,
            //y: node.data.instant.details.air_temperature,
            y: node.values.temperature,
            // custom options used in the tooltip formatter
  
            // ATTENTION MODIFY: don't know how to handle to
            //to,
  
            //MODIFY: No symbol code for our diagram
            //symbolName: Meteogram.dictionary[
            //    symbolCode.replace(/_(day|night)$/, '')
            //].text
        });
  
        // we don't need precipitation for our diagram
        // this.precipitations.push({
        //     x,
        //     y: nextHours.details.precipitation_amount
        // });
        
        this.humidity.push({
            x,
            y: node.values.humidity 
        });
  
        if (i % 2 === 0) {
            this.winds.push({
                x,
                //MODIFY different json path for wind speed and wind direction
                value: node.values.windSpeed,
                // direction: node.data.instant.details.wind_from_direction
                direction: node.values.windDirection
            });
        }
  
        this.pressures.push({
            x,
            // MODIFY: Different json path for pressure
            // y: node.data.instant.details.air_pressure_at_sea_level
            y: node.values.pressureSeaLevel
        });
  
        // ATTENTION MODIFY: don't know how to handle to varibale
        // if (i === 0) {
        //     pointStart = (x + to) / 2;
        // }
    });
  
    // Create the chart when the data is loaded
    this.createChart();
  };
  // End of the Meteogram protype
  
  function renderDataToHourly()
  {
    // temperature Ranges Chart
   // On DOM ready...
  
    // Set the hash to the yr.no URL we want to parse
    
    console.log(window.location.href.hash);
    const parms = window.location.href.split("/").pop();
    const params_array = parms.split(',');
    const latitude = params_array[0];
    const longitude = params_array[1];
    console.log(latitude);
    console.log(longitude);
    const url = `https://weather-node-330706.wn.r.appspot.com//search?latitude=${latitude}&longitude=${longitude}&type=hourly`

    console.log("Request sent for highchart diagram: " +url);
    Highcharts.ajax({
    url,
    dataType: 'json',
    success: json => {
        window.meteogram = new Meteogram(json, 'container');
    },
    error: Meteogram.prototype.error,
    headers: {
        // Override the Content-Type to avoid preflight problems with CORS
        // in the Highcharts demos
        'Content-Type': 'text/plain'
    }
    }); 
    
  
    
  
  }
  renderDataToHourly()