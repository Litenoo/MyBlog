A django plan of project

I want to rewrite the entire project with docker+django+sql

-How to store posts.
Posts are just going to be saved in sql db, but the content will refer to 
the .md file in posts folder to keep it simple. It will be able to hold there 
jupyter notebook files as well, but they are going to be converted to 
markdown files cause it is simplier.


Version 1.0 requirements:

 1 The sites structure
-- /
    Main site (whoami etc.)
-- /articles
    The posts list sorted by release date 
-- /articles/<article_title>
    The article site, where fetched posts will be displayed ( just back button & article content)
-- /admin
    (just placeholder)

 2 The database:
Just a simple structure to store post, with md file reference as content
--article_title
--publish_date
--estaminated readtime (for v1.0 just placeholder)
--author (just placeholder with my nickname)
--content (reference to md file)

 3 The docker config
--Just a simple docker config to manage django and sql


Version > 1.0
- add search by name feature for posts
- add /pl & /en folders for english and polish lang
- add management tab for admin at /admin


