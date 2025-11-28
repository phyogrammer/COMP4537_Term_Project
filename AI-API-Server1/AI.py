import torch
from flask import Flask, request, jsonify
from transformers import MobileBertTokenizer, MobileBertForSequenceClassification
import os

app = Flask(__name__)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
tokenizer = MobileBertTokenizer.from_pretrained('google/mobilebert-uncased')
model = MobileBertForSequenceClassification.from_pretrained('./mobilebert-sql-injection-detect')
model.to(device)
model.eval()

def predict(text):

    inputs = tokenizer(text, padding=False, truncation=True, return_tensors='pt', max_length=512)
    input_ids = inputs['input_ids'].to(device)
    attention_mask = inputs['attention_mask'].to(device)

    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)

    logits = outputs.logits
    probabilities = torch.softmax(logits, dim=1)
    predicted_class = torch.argmax(probabilities, dim=1).item()
    return predicted_class, probabilities[0][predicted_class].item()

@app.route("/verifySQL", methods=["POST"])
def verifySQL():
    data = request.get_json()

    text = data.get("text", "")
    predicted_class, confidence = predict(text)
    if predicted_class > 0.7:
        result = {
            "lable": "Prediction: SQL Injection Detected",
            "confidence": round(confidence, 4)
        }
        return jsonify(result)
    else:
        result = {
            "lable": "Prediction: No SQL Injection Detected",
            "confidence": round(confidence, 4)
        }
        return jsonify(result)

@app.route("/LLM_file", methods=["GET"])
def LLM_file():
    path = "./mobilebert-sql-injection-detect"
    stats = os.stat(path)
    data = {
	"fileName": os.path.basename(path),
	"location": os.path.abspath(path),
	"size": stats.st_size,
	"last_modified": stats.st_mtime,
	"last_accessed": stats.st_atime,
	"created": stats.st_ctime
    }
    return jsonify(data)
#text = "SELECT * FROM users WHERE username = 'admin' AND password = 'password';"
#text = "select * from users where username = 'admin' and password = 'password';"
#text = "SELECT * from USERS where id  =  '1' or @ @1  =  1 union select 1,version  (    )   -- 1'"
#text = "select * from data where id  =  '1'  or @"

# OUTPUT
# Prediction: SQL Injection Detected
# Confidence: 1.00

if __name__ == "__main__":
    app.run(host="localhost", port=8009)