const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const totalCostElement = document.getElementById("total-cost");

const renderProducts = () => {
  const products = ProductManager.getProducts();
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const total = (product.quantity * product.price).toFixed(2);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>R$ ${product.price.toFixed(2)}</td>
      <td>R$ ${total}</td>
      <td><button onclick="handleRemoveProduct(${index})">Remover</button></td>
    `;
    productList.appendChild(row);
  });
};

const handleRemoveProduct = (index) => {
  ProductManager.removeProduct(index);
  renderProducts();
};

const handleCalculateTotal = () => {
  const total = ProductManager.calculateTotal();
  totalCostElement.textContent = `Total Gasto: R$ ${total.toFixed(2)}`;
};

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  if (!name || quantity <= 0 || price <= 0) {
    alert("Por favor, insira dados válidos.");
    return;
  }

  ProductManager.addProduct(name, quantity, price);

  productForm.reset();
  renderProducts();
});

document.getElementById("calculate-total").addEventListener("click", handleCalculateTotal);
