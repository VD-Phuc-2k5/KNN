import PropTypes from "prop-types";
import { Col, Form } from "react-bootstrap";

const FeatureInput = ({ index, title, value, onChange }) => {
  return (
    <Col md='4' className='mb-3'>
      <Form.Group controlId={`feature${index}`}>
        <Form.Label>{title}</Form.Label>
        <Form.Control
          type='number'
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          required
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a valid number for {title}.
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};

FeatureInput.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FeatureInput;
