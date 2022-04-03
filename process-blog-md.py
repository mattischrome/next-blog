# Save at root of next-blog

import os
import re
posts_dir = './data/blog'

date_search = re.compile('[0-9]{4}-[0-9]{2}-[0-9]{2}-')

for filename in os.scandir(posts_dir):
    if (filename.path.endswith(".md") and filename.is_file()):
        new_file = date_search.sub('',filename.path,1)
        print(new_file)
        os.rename(filename.path, new_file)