# TokenManager

Token Manger with Express.js and Mongoose as Database.

# How to Use

```
1. Install the Project
2. Run in VSCode as Example
3. Run this in the Terminal: node .
4. The API is running.
```

# API Routes

To create a Token with text:
```
[POST]: https://localhost:3000/tokens/generate [Body]: "tokendata": "Test 123"
```
To get the token data back use:
```
[GET]: https://localhost:3000/tokens/validate?token=<token>
```