const products = [
  { id: "Laptop Pro 15", name: "Laptop Pro 15" },
  { id: "Smartphone X", name: "Smartphone X" },
  { id: "Wireless Headphones", name: "Wireless Headphones" },
  { id: "Smart Watch Series 5", name: "Smart Watch Series 5" },
  { id: "Smart Watch Series 5", name: "Smart Watch Series 5" },
  { id: "Bluetooth Speaker", name: "Bluetooth Speaker" },
];

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("productinfo");
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });
});

function handlePrint() {
  const docketNo = document.getElementById("docketno").value;
  const dated = document.getElementById("dated").value;
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const productInfo = document.getElementById("productinfo").value;
  const labelCount = parseInt(document.getElementById("labelCount").value);

  let labelsHtml = "";
  console.log("productInfo", productInfo);

  for (let i = 1; i <= labelCount; i++) {
    labelsHtml += `
        <div class="label">
          <div class="field docket">${docketNo}</div>
          <div class="field dated">${dated}</div>
          <div class="field pkg">${i}/${labelCount}</div>
          <div class="field origin">${origin}</div>
          <div class="field destination">${destination}</div>
          <svg class="barcode" id="barcode-${i}"></svg>
        </div>
        <div style="page-break-after: always;"></div>
      `;
  }

  const printWindow = window.open("", "_blank", "width=600,height=400");

  printWindow.document.write(`
      <html>
      <head>
        <title>Print Labels</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        ${labelsHtml}
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
        <script>
          window.onload = function () {
            for (let i = 1; i <= ${labelCount}; i++) {
              JsBarcode("#barcode-" + i, "${productInfo}", {
                format: "CODE128",
                lineColor: "#000",
                width: 2,
                height: 40,
                displayValue: false
              });
            }
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
      </html>
    `);

  printWindow.document.close();
}
