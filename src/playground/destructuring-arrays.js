const address = ["FC.Ripensia nR.26", "Timisoara", "Timis", "19147"];

const [, , state = "Arad"] = address;

console.log(`You are in  ${state}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);
