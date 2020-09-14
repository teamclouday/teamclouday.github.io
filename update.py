# a script to update
# main page (recent work and recent blog)
# blog page (recent added new blogs)
# project page (recent added new projects)

import os
from datetime import datetime
from bs4 import BeautifulSoup

def update_about():
    """
    Update the 'Last Update' date in About subpage
    """
    with open(os.path.join("subpage", "about", "index.html"), "r") as inFile:
        html = BeautifulSoup(inFile.read(), "lxml")
    html.find('div', {'class':'last_update'}).string = "Last Update: {}".format(datetime.now().strftime("%Y-%m-%d %H:%M"))
    with open(os.path.join("subpage", "about", "index.html"), "wb") as outFile:
        outFile.write(html.prettify('utf-8'))

def update_blogs():
    pass

def update_main():
    pass

if __name__=="__main__":
    update_about()
    update_blogs()
    update_main()