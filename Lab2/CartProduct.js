import { readFile, writeFile } from "fs/promises";
import readline from "readline/promises";
import { stdin, stdout } from "process";

const FILE = "product.json";

// Read cart
const getCart = async () => {
    try {
        const data = await readFile(FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
};

// Save cart
const saveCart = async (cart) => {
    await writeFile(FILE, JSON.stringify(cart, null, 2));
};

// Add product
const addToCart = async (product) => {
    const cart = await getCart();

    const item = cart.find((p) => p.id === product.id);

    if (item) {
        item.qty += product.qty;
    } else {
        cart.push(product);
    }

    await saveCart(cart);
    console.log("✅ Product added successfully.");
};

// Display cart
const displayCart = async () => {
    const cart = await getCart();

    if (cart.length === 0) {
        console.log("\n🛒 Cart is Empty\n");
        return;
    }

    console.log("\n---------------- CART ----------------");

    let total = 0;

    cart.forEach((item) => {
        const amount = item.price * item.qty;
        total += amount;

        console.log(
            `ID:${item.id} | ${item.name} | ₹${item.price} | Qty:${item.qty} | Total: ₹${amount}`
        );
    });

    console.log("--------------------------------------");
    console.log(`Grand Total : ₹${total}\n`);
};

// Remove Product
const removeProduct = async (id) => {
    let cart = await getCart();

    const oldLength = cart.length;

    cart = cart.filter((item) => item.id !== id);

    if (oldLength === cart.length) {
        console.log("❌ Product not found.");
        return;
    }

    await saveCart(cart);
    console.log("🗑 Product removed.");
};

// Update Quantity
const updateQuantity = async (id, qty) => {
    const cart = await getCart();

    const item = cart.find((p) => p.id === id);

    if (!item) {
        console.log("❌ Product not found.");
        return;
    }

    item.qty = qty;

    await saveCart(cart);

    console.log("✅ Quantity updated.");
};

// Checkout
const checkout = async () => {
    const cart = await getCart();

    if (cart.length === 0) {
        console.log("🛒 Cart is Empty.");
        return;
    }

    let total = 0;

    console.log("\n========== BILL ==========");

    cart.forEach((item) => {
        const amount = item.price * item.qty;
        total += amount;

        console.log(
            `${item.name} (${item.qty}) = ₹${amount}`
        );
    });

    console.log("--------------------------");
    console.log(`Grand Total : ₹${total}`);
    console.log("==========================");

    await saveCart([]);

    console.log("🎉 Thank you for shopping!\n");
};

const main = async () => {
    const cin = readline.createInterface({
        input: stdin,
        output: stdout,
    });

    let choice;

    do {
        console.log("\n========= AMAZON SHOPPING =========");
        console.log("1. Display Cart");
        console.log("2. Add Product");
        console.log("3. Remove Product");
        console.log("4. Update Quantity");
        console.log("5. Checkout & Exit");

        choice = Number(await cin.question("Enter Choice: "));

        switch (choice) {
            case 1:
                await displayCart();
                break;

            case 2: {
                const id = Number(await cin.question("Enter ID: "));
                const name = await cin.question("Enter Name: ");
                const price = Number(await cin.question("Enter Price: "));
                const qty = Number(await cin.question("Enter Quantity: "));

                await addToCart({
                    id,
                    name,
                    price,
                    qty,
                });

                break;
            }

            case 3: {
                const id = Number(await cin.question("Enter ID to Remove: "));
                await removeProduct(id);
                break;
            }

            case 4: {
                const id = Number(await cin.question("Enter ID: "));
                const qty = Number(await cin.question("Enter New Quantity: "));
                await updateQuantity(id, qty);
                break;
            }

            case 5:
                await checkout();
                break;

            default:
                console.log("❌ Invalid Choice");
        }

    } while (choice !== 5);

    cin.close();
};

main();