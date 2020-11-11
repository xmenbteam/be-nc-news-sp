\c nc_news_test

SELECT articles.*, COUNT (comments.article_id) AS comment_count FROM articles 
LEFT JOIN comments ON comments.article_id = articles.article_id
WHERE articles.article_id = 2
   GROUP BY articles.article_id;

