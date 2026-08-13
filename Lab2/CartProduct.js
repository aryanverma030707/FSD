import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";

const FILE = "product.json";

const getCart = async () => {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
};

const saveCart = async (cart) => {
  await writeFile(FILE, JSON.stringify(cart, null, 2));
};

const addToCart = async (product) => {
  const cart = await getCart();
  const isFoundInCart = cart.find((item) => item.id === product.id);
  if (isFoundInCart) {
    isFoundInCart.qty += product.qty;
  } else {
    cart.push(product);
  }
  await saveCart(cart);
  console.log(`${product.name} added/updated to 🛒`);
};

const displayCart = async () => {
  const cart = await getCart();
  if (cart.length === 0) {
    console.log("\nCart is empty\n");
    return;
  }
  console.table(cart);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  console.log(`Total payable amount Rs. ${total}`);
};

const removeProduct = async (id) => {
  const cart = await getCart();
  const index = cart.findIndex((item) => item.id === id);
  if (index === -1) {
    console.log("❌ Product not found");
    return;
  }
  const removedProduct = cart[index];
  cart.splice(index, 1);
  await saveCart(cart);
  console.log(`${removedProduct.name} removed from 🛒`);
};

const updateQuantity = async (id, qty) => {
  const cart = await getCart();
  const product = cart.find((item) => item.id === id);
  if (!product) {
    console.log("❌ Product not found");
    return;
  }
  if (qty <= 0) {
    console.log("❌ Quantity must be greater than 0");
    return;
  }
  product.qty = qty;
  await saveCart(cart);
  console.log(`${product.name} quantity updated to ${qty}`);
};

const checkout = async () => {
  const cart = await getCart();
  if (cart.length === 0) {
    console.log("\nCart is empty. Nothing to checkout.\n");
    return;
  }
  console.log("\n========== BILL ==========");
  console.table(cart);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  console.log(`Total Amount: Rs. ${total}`);
  console.log("==========================");
  console.log("✅ Order placed successfully!");
  await saveCart([]);
};

const main = async () => {
  let choice;

  const cin = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  do {
    console.log("\n\nWelcome to Amazon Shopping 🛒");
    console.log("1........Show Cart");
    console.log("2........Add Product");
    console.log("3........Remove Product");
    console.log("4........Update Quantity");
    console.log("5........Checkout");

    choice = await cin.question("Enter your choice: ");

    switch (Number(choice)) {
      case 1:
        await displayCart();
        break;

      case 2: {
        const item = await cin.question("Enter id,name,price,qty: ");
        const [id, name, price, qty] = item
          .split(",")
          .map((p) => p.trim());

        await addToCart({
          id: Number(id),
          name,
          price: Number(price),
          qty: Number(qty),
        });
        break;
      }

      case 3: {
        const id = await cin.question("Enter product id to remove: ");
        await removeProduct(Number(id));
        break;
      }

      case 4: {
        const id = await cin.question("Enter product id: ");
        const qty = await cin.question("Enter new quantity: ");
        await updateQuantity(Number(id), Number(qty));
        break;
      }

      case 5:
        await checkout();
        break;
      default:
        console.log("🛑 Invalid choice! Try again");
    }
  } while (Number(choice) !== 5);

  cin.close();
};

main();