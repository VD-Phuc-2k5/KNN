import { useState } from "react";
import { Button, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FileUpload from "./Components/FileUpload/FileUpload";
import FeatureInput from "./Components/FeatureInput/FeatureInput";
import { titles } from "./Data";

function App() {
  const [features, setFeatures] = useState(Array(30).fill(0));
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);

  // Handle the change of feature input values
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = parseFloat(value);
    setFeatures(newFeatures);
  };

  // Handle the file upload and set features
  const handleFileUpload = (values) => {
    setFeatures(values);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate the form
    if (!form.checkValidity()) {
      setIsFormValid(false);
      return;
    }

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
      setError(`Error connecting to the server: ${err.message}`);
    }
  };

  return (
    <Container className='App'>
      <h1 className='mt-4'>Breast Cancer Prediction</h1>
      <form noValidate onSubmit={handleSubmit}>
        <FileUpload onFileUpload={handleFileUpload} setError={setError} />
        <Row>
          {titles.map((title, index) => (
            <FeatureInput
              key={index}
              index={index}
              title={title}
              value={features[index]}
              onChange={handleFeatureChange}
              isFormValid={isFormValid}
            />
          ))}
        </Row>
        <Button type='submit' variant='primary'>
          Predict
        </Button>
      </form>
      {prediction && <h2 className='mt-4'>Prediction: {prediction}</h2>}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
    </Container>
  );
}

export default App;
