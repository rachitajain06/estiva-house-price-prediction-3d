from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predictor import predict_price


# --------------------------------------------------
# Create FastAPI app
# --------------------------------------------------

app = FastAPI(
    title="ESTIVA House Price Prediction API",
    description="Backend API for ESTIVA House Price Prediction",
    version="1.0.0"
)


# --------------------------------------------------
# Allow frontend to communicate with backend
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Input data model
# Matches the React frontend request
# --------------------------------------------------

class HouseInput(BaseModel):
    overall_qual: int
    year_built: int
    living_area: float
    basement_area: float
    first_floor: float
    fireplaces: int
    garage_cars: int
    full_bath: int
    half_bath: int
    exterior_quality: str
    kitchen_quality: str


# --------------------------------------------------
# Validation RMSE
# Used to create the displayed estimate range
# --------------------------------------------------

VALIDATION_RMSE = 25978.03


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "ESTIVA House Price Prediction API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict(house: HouseInput):

    data = {
        "OverallQual": house.overall_qual,
        "YearBuilt": house.year_built,
        "GrLivArea": house.living_area,
        "TotalBsmtSF": house.basement_area,
        "1stFlrSF": house.first_floor,
        "Fireplaces": house.fireplaces,
        "GarageCars": house.garage_cars,
        "FullBath": house.full_bath,
        "HalfBath": house.half_bath,

        # Exterior Quality
        f"ExterQual_{house.exterior_quality}": 1,

        # Kitchen Quality
        f"KitchenQual_{house.kitchen_quality}": 1,
    }

    # Get prediction from trained XGBoost model
    price = predict_price(data)

    # Create statistical estimate range
    lower_estimate = max(0, price - VALIDATION_RMSE)
    upper_estimate = price + VALIDATION_RMSE

    return {
        "estimated_price": round(price, 2),
        "lower_estimate": round(lower_estimate, 2),
        "upper_estimate": round(upper_estimate, 2)
    }

# --------------------------------------------------
# Scenario Lab endpoint
# --------------------------------------------------

class ScenarioInput(BaseModel):
    label: str
    overall_qual: int
    living_area: float
    year_built: int
    garage_cars: int
    full_bath: int
    fireplaces: int


class ScenarioRequest(BaseModel):
    scenarios: list[ScenarioInput]


@app.post("/scenario")
def run_scenarios(request: ScenarioRequest):

    results = []

    for scenario in request.scenarios:

        data = {
            "OverallQual": scenario.overall_qual,
            "YearBuilt": scenario.year_built,
            "GrLivArea": scenario.living_area,
            "GarageCars": scenario.garage_cars,
            "FullBath": scenario.full_bath,
            "Fireplaces": scenario.fireplaces,
        }

        price = predict_price(data)

        results.append({
            "label": scenario.label,
            "overall_qual": scenario.overall_qual,
            "living_area": scenario.living_area,
            "year_built": scenario.year_built,
            "garage_cars": scenario.garage_cars,
            "full_bath": scenario.full_bath,
            "fireplaces": scenario.fireplaces,
            "estimated_price": round(price, 2)
        })

    return {
        "scenarios": results
    }