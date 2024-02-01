import cv2 as cv
import mediapipe as mp
import torch
import torchvision
from torch import nn

mpHands=mp.solutions.hands
hands=mpHands.Hands()
mpDraw= mp.solutions.drawing_utils

alphabets=['0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z']
device="cuda" if torch.cuda.is_available() else "cpu"

def load_model(model_path):
    with torch.no_grad():
        predictor=torchvision.models.googlenet()
        #predictor.classifier[3] = nn.Linear(in_features=1280, out_features=25)
        '''predictor.classifier = nn.Sequential(
            nn.Dropout(p=0.2),
            nn.Linear(in_features=1280, out_features=512),
            nn.Dropout(p=0.2),
            nn.Linear(in_features=512, out_features=25)
        )
        predictor.classifier=nn.Sequential(
            nn.Dropout(p=0.2),
            nn.Linear(in_features=1280, out_features=256),
            nn.Dropout(p=0.2),
            nn.Linear(in_features=256, out_features=36)
        )'''
        predictor.aux1=None
        predictor.aux2=None #LeNet
        predictor.fc = nn.Linear(in_features=1024, out_features=36, bias=True)
        state_dict=torch.load(model_path,map_location=device)
        predictor.load_state_dict(state_dict)
        predictor.to(device)
        predictor.eval()
        return predictor


def predict_letter(model,img):
    img=torch.Tensor(img)
    img=img.reshape(3,224,224)
    img=img.unsqueeze(dim=0)
    labels=model(img)
    labels=torch.softmax(labels,dim=1)
    label=torch.argmax(labels,dim=1)
    return label.item()


def find_hands(img):
    model=load_model("Sign Language Model_LeNetV2_Try3.pth")
    img_rgb = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    h, w, c = img.shape
    results = hands.process(img_rgb)



    if results.multi_hand_landmarks:
        for handLMs in results.multi_hand_landmarks:
            mpDraw.draw_landmarks(img, handLMs, mpHands.HAND_CONNECTIONS)
            x_max = 0
            y_max = 0
            x_min = w
            y_min = h

            for lm in handLMs.landmark:
                x, y = int(lm.x * w), int(lm.y * h)
                if x > x_max:
                    x_max = x
                if x < x_min:
                    x_min = x
                if y > y_max:
                    y_max = y
                if y < y_min:
                    y_min = y
            y_min -= 20
            y_max += 20
            x_min -= 20
            x_max += 20

            cv.rectangle(img, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
            img2=img[y_min:y_max,x_min:x_max]
            if img2.size!=0:
                print(img2.shape)
                img2=cv.resize(img2,(224,224))
                letter=predict_letter(model,img2)
                cv.putText(img,alphabets[letter], (x_min+5, y_max+5), cv.FONT_HERSHEY_TRIPLEX, 3,(0, 255, 0), 2)

    cv.imshow("Image", img)

