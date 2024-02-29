# nap

nap id an automatic REST database

## Installation

## Introduction

nap is a database that exposes a HTTP interface. You interact with the database much like you would any REST API; data can be inserted at a given URL with `POST` and `PUT`, retrieved with `GET` and deleted with `DELETE`.

nap has two basic data types: Collections and Resources. A Resource is a JSON value, and a Collection is a set of JSON values. Collections are created automatically whenever you `POST` to an URL that isn't already a collection.

## Example

To insert data into the database, issue a `POST` request. Given that nap is up and running on port 5000, you can issue the following `curl` command:

```sh
curl localhost:5000/messages --data '{"message": "Hello, world!"}'
```

nap will reply with the following response body and a `Location` header:

```json
{"key": "", "url": ""}
```

You can then access the data you just inserted by issuing a `GET` request to the URL returned in the `Location` header:

```sh
curl localhost:5000/messages/ID
```

## Using collections

Let's say that we want to create a blogging site, where users can upload blog posts. We start by creating a new user:

```sh
curl localhost:5000/users --data '{"username": "chreke"}'
```

This will create a `users` collection (unless it already exists) and insert an object that has an `username` key. The
response also returns the URL of the newly created user.

Given the newly created user URL, we can create a new collection that contains the user's blog posts:

```sh
curl localhost:5000/users/UUID/posts --data '{"title": "My first blog post", "createdAt": "2024-01-10", "content": "Hello, world!"}'
```

## Basic operation

All data in nap is entered and retrieved using regular HTTP calls. Different operations can be performed by using different HTTP verbs:

 - `GET` `/collection` Lists all resources in the collection
 - `GET` `/collection/id` Fetches the item in `collection` with the given `id`
 - `POST` Creates a new item in a collection and assigns it an ID. If the collection doesn't exist, it is created automatically
 - `PUT` Replaces the given resource or collection, or creates it if it doesn't exist.
 - `DELETE` Removes the given resource or collection
