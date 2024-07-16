# JavaScript Basics

JavaScript is one of the most popular programming languages, both for data visualization (in the browser) and for data analysis (locally, on the server).

## constants and variables
```js
const pi = 3.14; // definition of a constant
var foo = 3.14; // definition of a variable
```

```js
foo = pi + 2; // assignment
foo = pi - 2;
foo = pi * 2;
foo = pi / 2;
```

## functions

functions in mathematics:
```
y=f(x)
f(x) -> x +2
f(2) -> 4
```

signature of a function in mathematics:
```
RETURN VALUE=NAME(PARAMETER)
```

### function definition
```js
function xPlusTwo(x) {
    return x + 2;
}
```

### function call
```js
xPlusTwo(2);
```

assign the result to a variable
```js
var y;
y = xPlusTwo(2);
```
or a slightly shorter version:
```js
var y = xPlusTwo(2);
```

## data types
### simple data types
```js
var a = 1; // integer
var b = 1.0; // floating point number
var c = "hello, "; // text string
c = c + "world!";
```

### array
```js
var l = [1, 2, 4, 9];
```
accessing values with an index (starting at 0):
```js
l[0];
```

### objects
key value data structures

```js
var o = {
    name: "Lukas",
    city: "Nuremberg",
};
```

accessing values from an object
```js
o.name;
o.city;
```

## run a javascript program

1. Create a `.js` file in your Codespace
2. Open the terminal/console
3. Type `node <YOUR FILENAME>.js` and press enter to execute it
