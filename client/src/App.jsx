import { useState } from "react";
import "./App.css";

function App() {
  const [features, setFeatures] = useState(Array(30).fill(0)); // Adjust size based on your dataset
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = parseFloat(value);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features }),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(`Error connecting to the server: ${err}`);
    }
  };

  return (
    <div className='App'>
      <h1>Breast Cancer Prediction</h1>
      <form onSubmit={handleSubmit}>
        {features.map((feature, index) => (
          <div key={index}>
            <label>
              Feature {index + 1}:
              <input
                type='number'
                value={feature}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <button type='submit'>Predict</button>
      </form>
      {prediction && <h2>Prediction: {prediction}</h2>}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
    </div>
  );
}

export default App;
