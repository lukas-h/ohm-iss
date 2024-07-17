function addAplusBplusC(a, b, c) {
    return a + b + c
}

var result = addAplusBplusC("Good", "morning",".")

console.log(result)
//OPPURE//
const names = [
    "Alessio", "Silvia", "Dario", "Matilde"
]

function test (a, b, c) {
    return a + "" + b + "" + c
}

for (name of names) {
    const result = test ("Good", "Morning", name)
}
console.log (result)