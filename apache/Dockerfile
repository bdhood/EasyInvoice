FROM httpd:2.4

ENV ServerName localhost

RUN apt update; apt upgrade;

COPY apache.conf /usr/local/apache2/conf/apache.conf
#COPY dist /usr/local/apache2/htdocs/
RUN printf "Include /usr/local/apache2/conf/apache.conf\n" \
    >> /usr/local/apache2/conf/httpd.conf