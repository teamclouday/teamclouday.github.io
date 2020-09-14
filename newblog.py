# a script to create a new blog page based on template and current date

import os
from datetime import datetime
from bs4 import BeautifulSoup

if __name__=="__main__":
    # load template
    with open(os.path.join("subpage", "blogs", "template.html"), "r") as inFile:
        html = BeautifulSoup(inFile.read(), "lxml")
    # get current time
    currentTime = datetime.now().strftime("%Y_%m_%d_%H_%M")
    if not os.path.exists(os.path.join("subpage", "blogs", "{}.html".format(currentTime))):
        html.find('div', {'class':'last_update'}).string = "Last Update: {}".format(datetime.now().strftime("%Y-%m-%d %H:%M"))
        with open(os.path.join("subpage", "blogs", "{}.html".format(currentTime)), "wb") as outFile:
            outFile.write(html.prettify('utf-8'))
    # update blog time
    # create assets folder
    if not os.path.exists(os.path.join("subpage", "blogs", currentTime)):
        os.makedirs(os.path.join("subpage", "blogs", currentTime))