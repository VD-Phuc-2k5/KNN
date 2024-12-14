from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and prepare the dataset
data = pd.read_csv("breast_cancer.csv")
data = data.drop(['Unnamed: 32', 'id'], axis=1)

# Encode the target variable
label_encoder = LabelEncoder()
data['diagnosis'] = label_encoder.fit_transform(data['diagnosis'])

# Split the dataset into features and target
X = data.drop('diagnosis', axis=1)
y = data['diagnosis']

# Split the data for training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train the KNN model
knn = KNeighborsClassifier(n_neighbors=11)
knn.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json['features']
    input_data = np.array(input_data).reshape(1, -1)
    prediction = knn.predict(input_data)
    predicted_class = label_encoder.inverse_transform(prediction)
    return jsonify({'prediction': predicted_class[0]})

if __name__ == '__main__':
    app.run(debug=True)