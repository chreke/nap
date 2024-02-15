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

nap will reply with the following response:

```json
{"message": "Hello, world!", "url": "/messages/<UUID>"}
```
