const person = {
  age: 32,
  location: {
    city: "Timisoara",
    temperature: 27
  }
};

const { name: firstName = "Anonymous", age } = person;
console.log(`${firstName} is ${age}.`);

const { temperature: temp, city } = person.location;
if (city && temp) {
  console.log(`It's ${temp} in ${city}`);
}

const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
  publisher: {
    // name: "Penguin"
  }
};

const { name: publisherName = "Self-Published" } = book.publisher;

console.log(publisherName);
