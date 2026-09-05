🏠 ESTIVA — Smart Home Price Estimation

ESTIVA is a machine-learning based web application that estimates house prices from property characteristics using a trained XGBoost regression model.

It combines a Next.js frontend, FastAPI backend, and XGBoost model to provide an interactive house price estimation experience.

Note: ESTIVA provides model-based estimates using historical housing data and is intended for educational and analytical purposes.

✨ Features
🏠 Interactive house price prediction
🤖 XGBoost regression model
⚡ FastAPI backend
⚛️ Next.js + React frontend
🔬 Scenario comparison through Scenario Lab
📊 Model performance and feature insights
📱 Responsive modern UI
🛠️ Technology Stack
Machine Learning & Data
Python
Pandas
NumPy
Scikit-learn
XGBoost
Joblib
Backend
FastAPI
Pydantic
Uvicorn
Frontend
Next.js
React
TypeScript
Tailwind CSS
📁 Project Structure
estiva-house-price-prediction-3d/
│
├── app/
│   ├── about/
│   ├── estimate/
│   ├── insights/
│   ├── scenario-lab/
│   └── page.tsx
│
├── components/
│   ├── brand/
│   ├── estimate/
│   ├── insights/
│   ├── layout/
│   ├── overview/
│   ├── scenario/
│   ├── shared/
│   └── ui/
│
├── lib/
│   ├── api.ts
│   ├── model-data.ts
│   ├── nav.ts
│   ├── prediction-history.ts
│   └── utils.ts
│
├── backend/
│   ├── models/
│   │   ├── default_feature_values.pkl
│   │   ├── feature_columns.pkl
│   │   └── final_xgboost_house_price_model.pkl
│   ├── main.py
│   ├── predictor.py
│   └── requirements.txt
│
├── public/
├── .gitignore
├── package.json
└── README.md
📊 Model Performance
Metric	Value
Model	XGBoost
Validation R²	91.2%
RMSE	$25,978
MAE	$15,671
Features	260
Training Homes	1,460
🔄 How It Works

Property Details
↓
Next.js / React Frontend
↓
FastAPI Prediction API
↓
Feature Processing
↓
Trained XGBoost Model
↓
Estimated House Price

🚀 Run Locally
1. Install frontend dependencies
npm install
2. Create .env.local

Create a .env.local file in the project root:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
3. Start the backend

Open a terminal in the project root:

cd backend
uvicorn main:app --reload --port 8000
4. Start the frontend

Open a new terminal in the project root:

npm run dev

Then open:

http://localhost:3000
⚠️ Disclaimer

ESTIVA is an educational machine learning project. Predictions are generated from historical housing data and may not reflect current real-world market prices. They should not be considered professional real-estate valuations.

👩‍💻 Author

Rachita Jain
B.Tech — Data Science