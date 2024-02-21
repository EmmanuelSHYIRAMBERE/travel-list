import { useEffect, useState } from "react";
import Flatlist from "./Components/Flatlist/Flatlist";
import Counters from "./Components/Counter/Counter";
import Accordion from "./Components/Accordion/Accordion";

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Counters />
      <Form />
      <Flatlist />
      <Accordion />
    </div>
  );
}
function Logo() {
  return <h1>🏝️ Discover 🎒</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [packedItems, setPackedItems] = useState(0);
  const [average, setAverage] = useState(0);
  const [sortBy, setSortBy] = useState("input");

  function handlePacked(items) {
    let value = 0;
    const size = items.length;
    for (let i = 0; i < size; i++) {
      if (items[i].packed) {
        value++;
      }
    }

    const avg = size === 0 ? 0 : (value / size) * 100;

    setAverage(avg);
    setPackedItems(value);
  }

  function handleDeletItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    let value = 0;
    const size = items.length;
    for (let i = 0; i < size; i++) {
      if (items[i].packed) {
        value++;
      }
    }

    const avg = size === 0 ? 0 : (value / size) * 100;

    setAverage(avg);
    setPackedItems(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      id: items.length + 1,
      description,
      quantity,
      packed: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);

    setDescription("");
    setQuantity(1);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items"
    );

    if (confirmed) setItems([]);
  }

  useEffect(() => {
    handlePacked(items);
  }, [items]);

  let sortedItems = "items";

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <>
      <div>
        <form className="add-form" onSubmit={handleSubmit}>
          <h3>What do you need for your 😎 trip?</h3>
          <select
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="item"
            id="item"
            placeholder="Item..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
      <div className="list">
        <ul>
          {items !== undefined &&
            sortedItems.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  name="toggleItem"
                  id="toggleItem"
                  value={item.packed}
                  onChange={() => handleToggleItem(item.id)}
                />
                <span
                  style={item.packed ? { textDecoration: "line-through" } : {}}
                >
                  {item.quantity}
                  {"  "}
                  {item.description}
                </span>
                <button onClick={() => handleDeletItem(item.id)}>❌</button>
              </li>
            ))}
        </ul>
        <div className="actionS">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">SORT BY INPUT ORDER</option>
            <option value="description">SORT BY DESCRIPTION</option>
            <option value="packed">SORT BY PACKED STATUS</option>
          </select>
          <button onClick={handleClearList}>CLEARLIST</button>
        </div>
      </div>
      <footer className="stats">
        {average === 100 ? (
          <em>👍 You gotta everything, and ready to go ✈️</em>
        ) : !items.length ? (
          <em>Start adding some items to your packing list 🚀</em>
        ) : (
          <em>
            💼 You have {items.length} items on your list,
            <p>
              and you already packed{" "}
              {packedItems > 1 ? `${packedItems} items` : `${packedItems} item`}
              {`( ${Math.floor(average)}%)`}
            </p>
          </em>
        )}
      </footer>
    </>
  );
}
