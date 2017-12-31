from flask import Flask,render_template,jsonify
from flask import request
from sklearn.externals import joblib

app = Flask(__name__,static_folder='vendors')

def loadModel():
    return joblib.load('model/neighbor.pkl')

def loadScaler():
    return joblib.load('model/scaler.pkl')
model =loadModel()
scaler = loadScaler()
@app.route('/submit',methods=['GET','POST'])
def submit():
    tenure = float(request.form['tenure'])
    MonthlyCharges = float(request.form['MonthlyCharges'])

    lst=['MultipleLines_No', 'MultipleLines_No phone service',
       'MultipleLines_Yes', 'InternetService_DSL',
       'InternetService_Fiber optic', 'InternetService_No', 'StreamingTV_No',
       'StreamingTV_No internet service', 'StreamingTV_Yes',
       'StreamingMovies_No', 'StreamingMovies_No internet service',
       'StreamingMovies_Yes', 'Contract_Month-to-month', 'Contract_One year',
       'Contract_Two year', 'PaperlessBilling_No', 'PaperlessBilling_Yes',
       'PaymentMethod_Bank transfer (automatic)',
       'PaymentMethod_Credit card (automatic)',
       'PaymentMethod_Electronic check', 'PaymentMethod_Mailed check']
    onehotlst=[]
    for x in lst:
        prefix = x.split('_')[0]
        value=x.split('_')[1]
        if(prefix in request.form) and value==request.form[prefix]:
            onehotlst.append(1)
        else: onehotlst.append(0)

    scaleData = scaler.transform([[tenure,MonthlyCharges]])
    data=list(scaleData[0]) +onehotlst

    predict  = model.predict([data])
    res='is' if predict[0]==1 else 'is not'

    color = 'color: #0000ff;' if predict[0] == 0 else 'color: #ff0000;'
    return render_template('result.html', result=res, mycolor=color)
@app.route('/')
def hello_world():
    return render_template('dan/webspeechdemo.html')

@app.route('/.well-known/.well-known/acme-challenge/zKrpj-P9_MzEv2LdM5bdIT9WzKTUlvBjrnnU51o5kYg')
def ssl():
    return render_template('zKrpj-P9_MzEv2LdM5bdIT9WzKTUlvBjrnnU51o5kYg')
if __name__ == '__main__':
    app.run(debug=True,ssl_context ='adhoc')
