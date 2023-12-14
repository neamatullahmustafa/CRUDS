var productContainer = [],
  index,
  updatedIndex,
  regExproductName = /^[A-Z]{3,9}$/i,
  regExproductPrice = /^([0-9]{4}|10000)$/,
  regExproductCategory = /^(TV|Laptop|Mobile)$/i,
  regExproductDescription = /^\w{55,}$/;
if (localStorage.getItem("productContainerStorage") != null) {
  productContainer = JSON.parse(
    localStorage.getItem("productContainerStorage")
  );
  displayItem(productContainer);
}
function clearItemFromInput() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productDescription").value = "";
}
function setItemToInput(index) {
  updatedIndex = index;
  document.getElementById("productName").value =
    productContainer[index].productName;
  document.getElementById("productPrice").value =
    productContainer[index].productPrice;
  document.getElementById("productCategory").value =
    productContainer[index].productCategory;
  document.getElementById("productDescription").value =
    productContainer[index].productDescription;
  document
    .getElementById("addItemButton")
    .classList.replace("d-block", "d-none");
  document
    .getElementById("updateItemButton")
    .classList.replace("d-none", "d-block");
}
function displayItem(productDisplay) {
  document.getElementById("displayItems").innerHTML = ``;
  for (index = 0; index < productDisplay.length; index++) {
    document.getElementById("displayItems").innerHTML += `  <tr>
        <td>${index + 1}</td>
        <td>${productDisplay[index].productName}</td>
        <td>${productDisplay[index].productPrice}</td>
        <td>${productDisplay[index].productCategory}</td>
        <td>${productDisplay[index].productDescription}</td>
        <td>
            <button class="btn btn-warning" onclick="setItemToInput(${index})">Update</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
        </td>
    </tr>`;
  }
}
function addItem() {
  var productItem = {
    productName: document.getElementById("productName").value,
    productPrice: document.getElementById("productPrice").value,
    productCategory: document.getElementById("productCategory").value,
    productDescription: document.getElementById("productDescription").value,
  };
  if (!regExproductName.test(productItem.productName)) {
    document.getElementById("productName").style.borderColor = "red";
    return;
  } else {
    document.getElementById("productName").style.borderColor = "black";
  }
  if (!regExproductPrice.test(productItem.productPrice)) {
    document.getElementById("productPrice").style.borderColor = "red";
    return;
  } else {
    document.getElementById("productPrice").style.borderColor = "black";
  }
  if (!regExproductCategory.test(productItem.productCategory)) {
    document.getElementById("productCategory").style.borderColor = "red";
    return;
  } else {
    document.getElementById("productCategory").style.borderColor = "black";
  }
  if (!regExproductDescription.test(productItem.productDescription)) {
    document.getElementById("productDescription").style.borderColor = "red";
    return;
  } else {
    document.getElementById("productDescription").style.borderColor = "black";
  }
  productContainer.push(productItem);
  localStorage.setItem(
    "productContainerStorage",
    JSON.stringify(productContainer)
  );
  displayItem(productContainer);
  clearItemFromInput();
}
function updateItem() {
  var productItem = {
    productName: document.getElementById("productName").value,
    productPrice: document.getElementById("productPrice").value,
    productCategory: document.getElementById("productCategory").value,
    productDescription: document.getElementById("productDescription").value,
  };

  productContainer.splice(updatedIndex, 1, productItem);
  localStorage.setItem(
    "productContainerStorage",
    JSON.stringify(productContainer)
  );
  displayItem(productContainer);
  document
    .getElementById("updateItemButton")
    .classList.replace("d-block", "d-none");
  document
    .getElementById("addItemButton")
    .classList.replace("d-none", "d-block");
  localStorage;
  clearItemFromInput();
}
function deleteItem(index) {
  productContainer.splice(index, 1);
  localStorage.setItem(
    "productContainerStorage",
    JSON.stringify(productContainer)
  );
  displayItem(productContainer);
}
function search() {
  var productContainerSearch = [];
  for (index = 0; index < productContainer.length; index++) {
    if (
      productContainer[index].productName.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase())
    ) {productContainerSearch.push(productContainer[index]);
  }
  }
displayItem(productContainerSearch);
}