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

# Define common categories for pre-processing
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size-XS', 'XS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('M.', 'M')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S.', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('s', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XS.', 'XS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Suit-S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size S.', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('SIZE XS', 'XS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size XXS', 'XXS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S..', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size M', 'M')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('SizeL', 'L')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('SIZE XXS', 'XXS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('size S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('SIZE-XXS', 'XXS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S(bust 88cm)', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S (waist58-62cm)', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S(Pink & Black)', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('US-S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size -XXS', 'XXS')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('X   L', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size-S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S Diameter 30cm', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size/S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S Pink', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size-L', 'L')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size-XXS', 'L')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('L.', 'L')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('pants-S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size--S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('1 PC - XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('SIZE S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('25-S', 'S')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('2XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('3XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('4XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('5XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('6XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('SIZE-4XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size4XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('Size-5XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('04-3XL', 'XL')
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('daughter 24M', 'M')

