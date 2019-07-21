const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("This is my resolved data");
    // resolve("This is my other resolved data");
    reject("something went wrong!");
  }, 1500);
});

console.log("before");

promise
  .then(data => {
    console.log("1", data);
  })
  .catch(error => {
    console.log("error:", error);
  });

console.log("after");
