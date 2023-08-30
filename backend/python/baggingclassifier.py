import pandas as pd

# ---------------------------
# ---- IMPORTING DATASET ----
# ---------------------------
dataset = pd.read_csv('../data/summer-products-with-rating-and-performance_2020-08.csv')

# ----------------------------
# ---- DATA PREPROCESSING ----
# ----------------------------
preprocessedData = dataset[['price', 'units_sold', 'product_variation_size_id', 'rating_count']]

# If NaN, drop records
preprocessedData.dropna(inplace=True)