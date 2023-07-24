FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="bs@schaefer-inet.de"

EXPOSE 8080

ADD backend/target/capstone.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]