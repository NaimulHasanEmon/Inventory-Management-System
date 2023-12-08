let choice;
let name;
let quantity;
let inventory = [];

function selectOption(option) {
  choice = option;
  updateUI();
}

function updateUI() {
  const inputFields = document.getElementById("inputFields");
  const nameLabel = document.getElementById("nameLabel");
  const quantityLabel = document.getElementById("quantityLabel");

  switch (choice) {
    case 1:
      nameLabel.textContent = "Product Name:";
      quantityLabel.textContent = "Quantity:";
      inputFields.classList.remove("hidden");
      break;
    case 2:
      nameLabel.textContent = "Product Name to Sell:";
      quantityLabel.textContent = "Quantity to Sell:";
      inputFields.classList.remove("hidden");
      break;
    case 3:
      displayInventory();
      break;
    case 4:
      document.getElementById("output").textContent = "Exiting...";
      break;
    default:
      inputFields.classList.add("hidden");
  }
}

function submitForm() {
  const productNameInput = document.getElementById("productNameInput");
  const quantityInput = document.getElementById("quantityInput");

  name = productNameInput.value;
  quantity = parseInt(quantityInput.value);

  switch (choice) {
    case 1:
      addProduct();
      break;
    case 2:
      sellProduct();
      break;
  }
}

function addProduct() {
  let existingProduct = inventory.find((product) => product.name === name);

  if (existingProduct) {
    existingProduct.quantity += quantity;
    document.getElementById(
      "output"
    ).textContent = `${name} updated in inventory. New quantity: ${existingProduct.quantity}`;
  } else {
    const newProduct = { name, quantity };
    inventory.push(newProduct);
    document.getElementById(
      "output"
    ).textContent = `${name} added to inventory with quantity ${quantity}`;
  }
}

function sellProduct() {
  let existingProduct = inventory.find((product) => product.name === name);

  if (existingProduct) {
    if (existingProduct.quantity >= quantity) {
      existingProduct.quantity -= quantity;
      document.getElementById(
        "output"
      ).textContent = `${quantity} ${name} sold. Remaining quantity: ${existingProduct.quantity}`;
    } else {
      document.getElementById(
        "output"
      ).textContent = `Insufficient quantity of ${name} to sell.`;
    }
  } else {
    document.getElementById(
      "output"
    ).textContent = `${name} not found in inventory`;
  }
}

function displayInventory() {
  let inventoryText = "Current Inventory:\n";

  for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];
    inventoryText += `${product.name}: ${product.quantity}\n`;
  }

  document.getElementById("output").textContent = inventoryText.trim();
}
