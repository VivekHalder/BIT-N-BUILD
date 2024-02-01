import cv2 as cv
import streamlit
import HandModule2
from flask import Flask,render_template,Response

app=Flask(__name__)
cap=cv.VideoCapture(0)

def frames():
    while True:
        k = cv.waitKey(1)
        if k % 256 == 27:
            # ESC pressed
            print("Escape hit, closing...")
            break

        success,img=cap.read()
        img=cv.flip(img,1)
        HandModule2.find_hands(img)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=="__main__":
    app.run(debug=True)