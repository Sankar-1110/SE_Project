import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bitprediction.css'; // Import the CSS file for styling

function BitPrediction() {
  
  const [historicalData, setHistoricalData] = useState([]);
  const [predictionDate, setPredictionDate] = useState('');
  const [predictedValue, setPredictedValue] = useState(null);
  const [forecast, setForecast] = useState([]);

  // Fetch historical data (assuming your Flask backend is running on http://127.0.0.1:5000)
  useEffect(() => {
    axios.get('https://se-project-backend-jfga.onrender.com/api/bitcoin/historical')
      .then(response => {
        if (Array.isArray(response.data)) {
          setHistoricalData(response.data);
        } else {
          console.error('Invalid data format returned from API');
        }
      })
      .catch(error => console.error('Error fetching historical data:', error));
  }, []);

  // Handle prediction request
  const handlePredict = async () => {
    if (!predictionDate) {
      alert('Please enter a prediction date!');
      return;
    }

    try {
      const response = await axios.post('https://se-project-backend-jfga.onrender.com/api/bitcoin/predict', { date: predictionDate });
      setPredictedValue(response.data.predicted_value);
      setForecast(response.data.forecast);
     
    } catch (error) {
      console.error('Error predicting price:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    
      <div className='bit-container'>
    <div className="container ">
      
      <h1>Bitcoin Price Prediction</h1>

      {/* Historical Data */}
      <p className='note'><span>Note:</span>This prediction is based on previous years data</p>
      
     

      {/* Prediction */}
      <div className="prediction-section">
        <h2>Predict Future Value</h2>
        <input
          className="date-input"
          type="date"
          value={predictionDate}
          onChange={(e) => setPredictionDate(e.target.value)}
        />
        <button className="predict-button" onClick={handlePredict}>Predict</button>
       
        {predictedValue && (
          <div className="prediction-result">
            <h3>Predicted Value for {predictionDate}: <span>${-1*(predictedValue/100).toFixed(2)}</span></h3>
          </div>
        )}
      </div>
      </div>
      
    </div>
  );
}

export default BitPrediction;
