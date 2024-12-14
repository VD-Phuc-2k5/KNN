import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const FileUpload = ({ onFileUpload, setError }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const values = text.split(",").map(Number); // Split by commas

      if (values.length === 30) {
        // Assuming there should be 30 values
        onFileUpload(values);
      } else {
        setError(
          "The number of values does not match the expected number of features."
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <Form.Group controlId='formFile' className='mb-3'>
      <h3>Upload .txt File</h3>
      <Form.Control type='file' accept='.txt' onChange={handleFileChange} />
    </Form.Group>
  );
};

FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default FileUpload;
