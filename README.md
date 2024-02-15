# nap

nap id an automatic REST database

## Installation

## Basic operation

All data in nap is entered and retrieved using regular HTTP calls. Different operations can be performed by 

## Example

To insert data into the database, issue a `POST` request. Given that nap is up and running on port 5000, you can issue the following `curl` command:

```sh
curl localhost:5000/messages --data '{"message": "Hello, world!"}'
```

nap will reply with the following response body and a `Location` header:

```json
{"message": "Hello, world!", "id": "<UUID>"}
```

You can then access the data you just inserted by issuing a `GET` request to the URL returned in the `Location` header:

```sh
curl localhost:5000/messages/<UUID> --data '{"message": "Hello, world!"}'
```

## Configuration

## TODO

 - [] Fully-qualified URLs
