# LESSERAFIND
![cover](https://github.com/jamnavarro/bitcamp/assets/60476667/25dd0b34-a6c4-4612-b85f-612fd5a9f10c)

## Inspiration
We're both interested in Kpop groups, and have the shared experience of being overwhelmed trying to figure out who's who at first.

## What it does
When users input an image of a member into LE SSERAFIND, the program tries to identify what member it is, and outputs their name.

## How we built it
The classification model is a small convolutional neural network built using PyTorch. The website itself is React-based, and mainly consists of a "Choose file" button. When a file is selected, it's sent to the CNN and the final classification is returned and displayed. 

## Challenges we ran into
We collected all of the data on our own, which meant that we weren't able to collect a significant amount of data. Because of this, our model struggled with overfitting and didn't have a particularly high accuracy on the test set.

## Accomplishments that we're proud of
We're both usually the designers instead of the programmers, so we're proud of ourselves for taking on such a big task, achieving an accuracy better than guessing, and dipping our toes into full-stack development.

## What we learned
How to use Github pages, how to connect the interface to the model, how to address overfitting in models

## What's next for LE SSERAFIND
Collecting more data
