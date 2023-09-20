import React, { useContext, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

// import { PieChart } from 'react-minimal-pie-chart';
// import {Chart, ArcElement} from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BLUE_SHADES_MANY, COLORFUL_MANY, GREEN_ORANGE_MANY } from './config';
import { AppContext } from './App';

// Chart.register(ArcElement);
ChartJS.register(ArcElement, Tooltip, Legend);

const MyPieChart = ({data, column}) => {
    const nav = useNavigate()

    const [chosenColors, setChosenColors] = useState(GREEN_ORANGE_MANY)

    const {colorTheme, setColorTheme, filters, setFilters} = useContext(AppContext)

    useEffect(()=>{
        if (colorTheme === 'green_orange') {
            setChosenColors(GREEN_ORANGE_MANY)
        }
        if (colorTheme === 'blue_shades') {
            setChosenColors(BLUE_SHADES_MANY)
        }
        if (colorTheme === 'colorful') {
            setChosenColors(COLORFUL_MANY)
        }
    }, [colorTheme])

    // console.log(column);
    const valueCounts = {};
    // console.log(data);
    data.forEach((row) => {
      const value = row[column];
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
    // console.log(valueCounts);
    // Extract unique values and their counts
    const labels = Object.keys(valueCounts);
    const dataCounts = Object.values(valueCounts);
    // console.log(labels);
    // console.log(dataCounts);
    // Define the dataset
    const dataset = {
      labels: labels,
      datasets: [
        {
          data: dataCounts,
          backgroundColor: chosenColors,
        },
      ],
    };

    const options = {
        plugins: {
          legend: {
            display: false,
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: ${value}`;
              },
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            // Redirect to './report-table' on click
            nav('/report-table');
          }
        },
      };
    
    return (
      <div style={{width: '15%', margin: '40px', display: "flex", flexDirection: "column", alignItems: "center",}}>
        <h4 style={{color: 'grey'}}>{column}</h4>
        <Pie data={dataset} options={options} />
      </div>
    );
  }

export default MyPieChart