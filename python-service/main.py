from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/python-service')
def service():
    dictionary = {'message': 'Hello from Python!'}
    return jsonify(dictionary)

if __name__ == '__main__':
    app.run(debug=True)