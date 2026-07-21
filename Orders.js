import { EventEmitter } from "node:events";

class OrderSystem extends EventEmitter {
    placeOrder(order) {
        console.log(`Order received: ${order.id} for ${order.customerName}`);
        console.log(`Saving order to database...`);
        this.emit("orderPlaced", order);
    }
}

const orderObj = new OrderSystem();

// Sending email
orderObj.on("orderPlaced", (order) => {
    console.log(`Sending confirmation email to ${order.email}`);
});

// Updating inventory
orderObj.on("orderPlaced", (order) => {
    order.items.forEach((item) => {
        console.log(`Reducing stock of ${item.name} by ${item.quantity}`);
    });
});

// Shipping the order
orderObj.on("orderPlaced", (order) => {
    console.log(`Creating shipping label for order ${order.id}`);
});

// Logging the order
orderObj.on("orderPlaced", (order) => {
    console.log(
        `Logging order ${order.id} - total ${order.totalItems} items, Amount ₹${order.totalAmount}`
    );
});

// Error handling
orderObj.on("error", (err) => {
    console.error(`Error occurred: ${err.message}`);
});

// Place order
orderObj.placeOrder({
    id: "# ORD1001",
    customerName: "John Doe",
    email: "john.doe@example.com",
    items: [
        { name: "Laptop", quantity: 1 },
        { name: "Mouse", quantity: 2 },
        { name: "Keyboard", quantity: 1 },
        { name: "Monitor", quantity: 1 }
    ],
    totalItems: 5,
    totalAmount: 150000
});