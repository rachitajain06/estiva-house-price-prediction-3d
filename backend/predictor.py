import os
import joblib
import numpy as np
import pandas as pd


# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")


# --------------------------------------------------
# Load trained model and supporting files
# --------------------------------------------------

model = joblib.load(
    os.path.join(MODEL_DIR, "final_xgboost_house_price_model.pkl")
)

feature_columns = joblib.load(
    os.path.join(MODEL_DIR, "feature_columns.pkl")
)

default_feature_values = joblib.load(
    os.path.join(MODEL_DIR, "default_feature_values.pkl")
)


# --------------------------------------------------
# Create model input
# --------------------------------------------------

def create_input_dataframe(data: dict) -> pd.DataFrame:

    # Start with default values for all model features
    input_data = default_feature_values.copy()

    # Update values supplied by the user
    for key, value in data.items():
        if key in input_data:
            input_data[key] = value

    # Convert to DataFrame
    df = pd.DataFrame([input_data])

    # Make sure columns are in exactly the same order
    # as used during model training
    df = df.reindex(columns=feature_columns, fill_value=0)

    return df


# --------------------------------------------------
# Predict house price
# --------------------------------------------------

def predict_price(data: dict) -> float:

    df = create_input_dataframe(data)

    # Model predicts log-transformed price
    prediction_log = model.predict(df)[0]

    # Convert back to original house-price scale
    prediction = np.expm1(prediction_log)

    return float(prediction)