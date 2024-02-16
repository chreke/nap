# nap

nap id an automatic REST database

## Installation

## Basic operation

All data in nap is entered and retrieved using regular HTTP calls. Different operations can be performed by using different HTTP verbs:

 - `GET` `/collection` Lists all resources in the collection
 - `GET` `/collection/id` Fetches the item in `collection` with the given `id`
 - POST: Creates a new item in a collection and assigns it an ID. If the collection doesn't exist, it is created automatically
 - PUT: Replaces the given resource or collection
 - DELETE: Removes the given resource or collection

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
