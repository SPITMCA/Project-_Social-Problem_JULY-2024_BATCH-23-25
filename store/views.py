from django.shortcuts import render
from django.http import HttpResponse
from .models.product import Product
from .models.category import Category
import joblib
# Create your views here.

def etrade(request):
    products = Product.get_all_products()
    categories = Category.get_all_categories()
    category_id = request.GET.get('category')
    if category_id:
        products = Product.get_all_products_by_category_id(category_id)
    else:
        products = Product.get_all_products()
    data = {}
    data['products'] = products
    data['categories'] = categories
    return render(request,'etrade.html',data)

def index(request):
    return render(request,'index.html')

def crop_pred(request):
    return render(request,'crop_pred.html')

def predict(request):
    # Retrieve the input values from the POST request
    temperature = float(request.POST.get('tempVal'))
    humidity = float(request.POST.get('humidityVal'))
    ph_value = float(request.POST.get('phVal'))
    rainfall = float(request.POST.get('rainfallVal'))

    # Combine the input values into a single list
    data = [temperature, humidity, ph_value, rainfall]

    # Load the trained model
    md = joblib.load('final_model.sav')

    # Predict the crop based on the input data
    predictions = md.predict([data])

    # List of crops corresponding to the model's output
    crops = ['wheat', 'mungbean', 'tea', 'millet', 'maize', 'lentil', 'jute', 'coffee', 'cotton', 'groundnut',
             'peas', 'rubber', 'sugarcane', 'tobacco', 'kidney beans', 'moth beans', 'coconut', 'blackgram',
             'adzuki beans', 'pigeon peas', 'chick peas', 'banana', 'grapes', 'apple', 'mango', 'muskmelon',
             'orange', 'papaya', 'watermelon', 'pomegranate']

    # Default crop suggestion if no match is found
    default_crop = 'rice'

    # Determine the appropriate crop suggestion
    suggested_crop = default_crop
    for i in range(len(crops)):
        if predictions[0][i] == 1:
            suggested_crop = crops[i]
            break

    # Pass the suggested crop to the template
    context = {'ans': suggested_crop}
    return render(request, 'crop_pred.html', context)



