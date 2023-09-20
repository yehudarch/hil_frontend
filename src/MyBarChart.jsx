import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { BLUE_SHADES_MANY, BLUE_SHADES_TWO, COLORFUL_MANY, COLORFUL_TWO, GREEN_ORANGE_MANY, GREEN_ORANGE_TWO } from './config';
import { AppContext } from './App';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const MyBarChart = ({ data, selectedDate, setSelectedDate}) => {
    const [chartData, setChartData] = useState({});
    // const [selectedDate, setSelectedDate] = useState(null)

    const [chosenColors, setChosenColors] = useState(GREEN_ORANGE_TWO)

    const {colorTheme, setColorTheme, filters, setFilters, versionFilter, setVersionFilter} = useContext(AppContext)

    useEffect(()=>{
        setVersionFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            console.log('dashboard_selectedDate', selectedDate);
            updatedFilters['version_date'] = selectedDate;
            return updatedFilters;
          });

    }, [selectedDate])

    useEffect(()=>{
        console.log(colorTheme);
        if (colorTheme === 'green_orange') {
            setChosenColors(GREEN_ORANGE_MANY)
        }
        if (colorTheme === 'blue_shades') {
            setChosenColors(BLUE_SHADES_MANY)
        }
        if (colorTheme === 'colorful') {
            setChosenColors(COLORFUL_MANY)
        }
        console.log(chosenColors);
    }, [colorTheme])


    const generateShadesOfGrey = (count) => {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const shade = 200 - i * 50; // Adjust the step for shades
        colors.push(`rgba(${shade}, ${shade}, ${shade}, 0.6)`);
      }
      return colors;
    };
  
    useEffect(() => {
      if (data && data.length > 0) {
        const dateCounts = {};
        data.forEach((item) => {
            const date = item.version_date.split('T')[0];
        //   dateCounts[date] = (dateCounts[date] || 0) + 1;
            const rootCause = item.root_cause;

            if (!dateCounts[date]) {
            dateCounts[date] = {};
            }
        
            if (!dateCounts[date][rootCause]) {
            dateCounts[date][rootCause] = 1;
            } else {
            dateCounts[date][rootCause]++;
            }
      
        });
        console.log(dateCounts);
        const dates = Object.keys(dateCounts);
        const labels = dates.sort((a, b) => new Date(b) - new Date(a));
        const latestDate = labels[0]
        setSelectedDate(latestDate)
        const counts = Object.values(dateCounts);
        console.log('counts', counts);
        const rootCauseOptions = Object.keys(counts[0])
        console.log('root causes', rootCauseOptions.map((rootCause) => (counts.map((count)=>(count[rootCause])))))
        const backgroundColors = generateShadesOfGrey(labels.length); // Use shades of grey
        console.log(labels.min);
        const dataset = {
          labels: labels,
//           datasets: [
//             {  barThickness: 25,
// //   barPercentage: 0.5,

//               label: 'Event Count',
//               data: counts,
//               backgroundColor: chosenColors,
//               borderWidth: 1,
//             },
//           ],
            datasets: rootCauseOptions.map((rootCause, index) => (
                {
                    barThickness: 25,
                    label: rootCause,
                    data: counts.map((count)=>(count[rootCause])),
                    backgroundColor: chosenColors[index % chosenColors.length],
                    borderWidth: 1,

                }
                ))
        };
  
        setChartData(dataset);
      }
    }, [data, chosenColors]);
  
    const options = {
    responsive: true,
    maintainAspectRatio: false,
    
      scales: {
        x: {
            grid: {
              display: false, 
            },
          },
        y: {
            grid: {
              display: false, 
            },
          },
      },
      onClick: (_, elements) => {
        if (elements.length > 0) {
          // Get the clicked date from the chart
          const clickedDate = chartData.labels[elements[0].index];
          console.log('before_click_bar', selectedDate);
          setSelectedDate(clickedDate)
          console.log('after_click_bar', selectedDate, clickedDate);

          
        //   alert(`Clicked Date: ${clickedDate}`);
        }
      },
    };
  
    return (
      <div style={{height: '30vh'}}>
        {chartData && chartData.labels && chartData.labels.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>No data available for chart</p>
        )}
      </div>
    );
  };
  
export default MyBarChart