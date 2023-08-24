FROM openjdk:17

LABEL maintainer="marv"

EXPOSE 8080

ADD backend/target/app.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]