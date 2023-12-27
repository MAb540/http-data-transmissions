FROM node:16

WORKDIR /app

COPY . /app

RUN chmod 777 *.sh

CMD ["./timer.sh"]


