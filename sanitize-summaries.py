# Converts markdown to HTML using Python.markdown
# Then from HTML to plain text using beautiful soup
# This is overkill, but we only have to do it once for this batch of posts
# We also use the python.frontmatter package to set the summary key

import os
import frontmatter
import markdown
from bs4 import BeautifulSoup

posts_dir = './data/blog'

def md_to_text(md):
    html = markdown.markdown(md)
    soup = BeautifulSoup(html, features='html.parser')
    return soup.get_text()

for filename in os.scandir(posts_dir):
    if (filename.path.endswith(".md") and filename.is_file()):
        with open(filename.path, "r") as f:
            post = frontmatter.loads(f.read())
            new_summary = md_to_text(post.content.split('\n')[0]) # first 240 characters of the content
            post['summary'] = new_summary
        with open(filename.path, "w") as f2:
            print(filename.path)
            f2.write(frontmatter.dumps(post))

