FROM golang:alpine AS build

#RUN apk add --no-cache git

WORKDIR /app

#COPY go.mod go.sum ./
#RUN go mod download

COPY . .

#RUN go build -o my-app
RUN go mod tidy 

#WORKDIR /app

##COPY --from=build /app/my-app ./

##ENTRYPOINT ["./my-app"]
CMD [ "go", "run","main.go" ]
EXPOSE 5200