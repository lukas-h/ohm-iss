var totalYears = 0
var ages = [31, 23, 23, 24, 25, 21]

for (age of ages) {
    totalYears = totalYears + age
}

const average = totalYears / ages.length
console.log ('total:'+ totalYears)
console.log ('average:'+ average)