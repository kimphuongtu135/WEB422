/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Kim Phuong Tu  Student ID: 148886179 Date: Jun 12, 2020
*
*
********************************************************************************/


let saleDate = [];
let page = 1;
const perPage = 10;


const saleTableTemplate = _.template(
    `<% _.forEach(saleData, function(index) { %>
            <tr data-id=<%- index._id %>>
                <td><%- index.customer.email %></td>
                <td><%- index.storeLocation %></td>
                <td><%- index.items.length %></td>
                <td><%- moment.utc(index.saleDate).local().format("LLLL") %></td>
                
            </tr>
        <% }); %>`
);


const saleModalBodyTemplate = _.template(
    `<h4>Customer</h4>
        <strong>email:</strong> <%- customer.email %><br>
        <strong>age:</strong> <%- customer.age %><br>
        <strong>satisfaction:</strong> <%- customer.satisfaction %> / 5
        <br><br>
        <h4>Items: $<%- total.toFixed(2) %></h4>
        <table class="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <% _.forEach(items, function(sale) { %>
                    <tr>
                        <td><%- sale.name %></td>
                        <td><%- sale.quantity %></td>
                        <td>$<%- sale.price %></td>
                    </tr>
                <% }); %>
            </tbody>
        </table>`
);

function loadSaleData() {
    fetch(`https://boiling-island-93955.herokuapp.com/api/sales?page=${page}&perPage=${perPage}`)
        .then((res) => res.json())
        .then((data) => {
            saleData = data;
            let rowsSaleTable = saleTableTemplate(saleDate);
            $("#sale-table tbody").html(rowsSaleTable);
            $("#current-page").html(page);
        })
}

$(function () {
    loadSaleData();
    $("#sale-table tbody").on("click", "tr", function () {
        let clickedId = $(this).attr("data-id");
        let clickedSale = saleData.find(({ _id }) => _id === clickedId);

        clickedSale.total = 0;

        for (let i = 0; i < clickedSale.items.length; i++) {
            clickedSale.total += clickedSale.items[i].price * clickedSale.items[i].quantity;
        }

        $("#sale-modal .modal-title").html(`Sale: ${clickedSale._id}`);
        $("#modal-body").html(saleModalBodyTemplate(clickedSale));

        $('#sale-modal').modal({
            backdrop: 'static',
            keyboard: false
        });
    });
});


$("#previous-page").on("click", function () {
    if (page > 1) {
        page--;
        loadSaleData();
    }
});


$("#next-page").on("click", function () {
    page++;
    loadSaleData();
});




