from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
uri = "mongodb+srv://saniyarajbnt:smriti1234@cluster0.gycxnx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
db = client.dbhomework  
@app.route('/')
def home():
   return render_template('index.html')

@app.route("/food_project", methods=["POST"])
def food_post():
    # sample_receive = request.form['sample_give']
    food_receive = request.form['food_give']

    count = db.food.count_documents({})
    num = count + 1

    doc = {
        'num': num,
        'food': food_receive,
        'done': 0,
    }
    db.food.insert_one(doc)
    return jsonify({'msg': 'Your order is saved successfully!'})

@app.route("/food/done", methods=["POST"])
def food_done():
    num_receive = request.form['num_give']
    db.food.update_one(
        {'num': int(num_receive)},
        {'$set': {'done': 1}}
    )
    return jsonify({'msg': 'Your item is updated now!'})

@app.route("/delete", methods=["POST"])
def delete_food():
    num_receive = request.form['num_give']
    db.food.delete_one({'num': int(num_receive)})
    return jsonify({'msg': 'Your order is succesfully deleted!'})

@app.route("/food_project", methods=["GET"])
def food_get():
    foods_list = list(db.food.find({}, {'_id': False}))
    return jsonify({'foods': foods_list})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)


