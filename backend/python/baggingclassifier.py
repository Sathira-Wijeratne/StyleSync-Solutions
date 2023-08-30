import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import BaggingClassifier
import sklearn.metrics as sm

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

# Remove unnecessary sizes
unnecessarySizes = ['choose a size', '32/L', 'EU 35', '4', '1m by 3m', 'Women Size 36', 'US 6.5 (EU 37)',
                    '26(Waist 72cm 28inch)', '29', '1pc', '100 cm', 'One Size', '1', 'S/M(child)', '2pcs', '30 cm',
                    '33', '100 x 100cm(39.3 x 39.3inch)', '100pcs', 'Base & Top & Matte Top Coat', '35', '34', '20pcs',
                    'White', '25', 'Round', 'Pack of 1', '1 pc.', 'AU plug Low quality', '5PAIRS',
                    '2', 'Baby Float Boat', '10 ml', '60', 'US5.5-EU35', '10pcs', '17', 'Women Size 37',
                    '3 layered anklet', '4-5 Years', 'first  generation', '80 X 200 CM', 'EU39(US8)', 'Base Coat', '36',
                    'Floating Chair for Kid', '20PCS-10PAIRS', 'B', '5', 'H01', '40 cm']

for size in unnecessarySizes:
    preprocessedData.drop(preprocessedData[preprocessedData['product_variation_size_id'] == size].index, inplace=True)

# Scaling sizes
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XXXS', 0)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XXS', 1)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XS', 2)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('S', 3)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('M', 4)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('L', 5)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XL', 6)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XXL', 7)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XXXL', 8)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XXXXL', 9)
preprocessedData['product_variation_size_id'] = preprocessedData['product_variation_size_id'].replace('XXXXXL', 10)

# ----------------------------
# ------ MODEL TRAINING ------
# ----------------------------

# Preparing X and Y Sets
x = preprocessedData.drop(['units_sold'], axis=1)
y = preprocessedData['units_sold']

featureList = list(x.columns)

# Preparing test and train sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=41)

# Training
baggingClassifier = BaggingClassifier(n_estimators=1200)
baggingClassifier.fit(x_train, y_train)

# Prediction
predicted4xTest = baggingClassifier.predict(x_test)
df = pd.DataFrame(predicted4xTest, columns=['Sales'])

# Evaluation
accuracy = sm.accuracy_score(y_test, predicted4xTest)
print('Accuracy', accuracy)