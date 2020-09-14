# a script to update
# main page (recent work and recent blog)
# blog page (recent added new blogs)
# project page (recent added new projects)

import os
from datetime import datetime
from bs4 import BeautifulSoup, Tag

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
    """
    Update the recently added blogs
    """
    with open(os.path.join("subpage", "blogs", "index.html"), "r") as inFile:
        blog = BeautifulSoup(inFile.read(), "lxml")
    blogMainBody = blog.find('div', {'id':'page_body'})
    # define template
    template = """
    <a tag="{0}" href="{0}.html" style="text-decoration: none;">
      <div class="blog">
        <div class="title">{1}</div>
        <div class="abstract">{2}</div>
      </div>
    </a>
    """
    # loop the directory
    for filename in os.listdir(os.path.join("subpage", "blogs")):
        if filename.endswith("html") and filename != "index.html" and filename != "template.html":
            # search the date
            date = os.path.splitext(filename)[0]
            found = False
            for child in blogMainBody.findChildren("a", recursive=False):
                if child["tag"] == date:
                    found = True
                    break
            if not found:
                # retrieve information
                with open(os.path.join("subpage", "blogs", filename), "r") as inFile:
                    currentBlog = BeautifulSoup(inFile.read(), "lxml")
                title = Tag(builder=blog.builder, name="div", attrs={"class":"title"})
                title.string = currentBlog.find("title").string
                abstract = Tag(builder=blog.builder, name="div", attrs={"class":"abstract"})
                abstract.string = currentBlog.find("div", {"class": "normal"}).text.strip().replace("\n", " ") + "... [Click to see more]"
                # insert newData
                newData0 = Tag(builder=blog.builder, name="a", attrs={"tag":date, "href":"{}.html".format(date), "style": "text-decoration: none;"})
                newData1 = Tag(builder=blog.builder, name="div", attrs={"class":"blog"})
                newData1.insert(0, title)
                newData1.insert(1, abstract)
                newData0.insert(0, newData1)
                blogMainBody.insert(0, newData0)
    # finally, update the file
    with open(os.path.join("subpage", "blogs", "index.html"), "wb") as outFile:
        outFile.write(blog.prettify('utf-8'))

def update_main():
    pass

if __name__=="__main__":
    update_about()
    update_blogs()
    update_main()