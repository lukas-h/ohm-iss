const names = [
    'Nick','Maria', 'Renata', 'Anna', 'Do Yeon', 'Rachele'
];

function test(a, b, c) {
    return a + " " + b + " " + c + "!";
}

// for loop
for(name of names) {
    const result = test("Good", "Morning,", name)
    console.log(result)
}

// 1. define an array of ages of everyone
// 2. loop over the ages and add it to a totalYears variable
// 3. get the average age by dividing totalYears by the length of the array of ages
var totalYears = 0
var ages = [31, 23, 23, 24, 25, 21]

for(age of ages) {
    totalYears = totalYears + age
}

const average = totalYears / ages.length
console.log("total: " + totalYears)
console.log('average: ' + average)

// 1st iteration: totalYears = 0 + 31
// 2nd iteration: totalYears = 31 + 23
// 3rd iteration: totalYears = 54 + 23
// 4th iteration: totalYears = 77 + 24
// ...