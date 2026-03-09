Create Student 

```
curl -X POST http://localhost:3000/student \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 21
  }'
```

Get all Student 

```
curl -X GET http://localhost:3000/student
```


Get Particular Student

```
curl -X GET http://localhost:3000/student/1
````

Update Student

```curl -X PATCH http://localhost:3000/student/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 22
  }'
```

Delete Student 

```
curl -X DELETE http://localhost:3000/student/1
```