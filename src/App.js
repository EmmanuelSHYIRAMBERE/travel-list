import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Charger", quantity: 3, packed: true },
  { id: 3, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <ParkingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🏝️ Far Away 🎒</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [id, setId] = useState(1);

  function handleSubmit(event) {
    // const items = initialItems.push({
    //   id: 7,
    //   description: { description },
    //   quantity: 3,
    //   packed: false,
    // });
    console.log("items", initialItems);
    event.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip?</h3>
      <select name="itemId" id="itemId">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option
            value={id}
            key={id}
            onChange={(event) => {
              setId(event.target.value);
              console.log("Id", id);
            }}
          >
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
  );
}

function ParkingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>
        💼 You have {initialItems.length} items on your list, and you arleady
        packed X (X%)
      </em>
    </footer>
  );
}
