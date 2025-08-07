app.innerHTML = `
  <h1>Party Planner</h1>
  <main id="main-container">
    <section id="party-list-section" class="shadow-sm">
      <h2 class="text-primary">All Parties</h2>
      <ul id="party-list" class="p-0"></ul>
    </section>
    <section id="single-party-section" class="shadow-sm">
      <h2 class="text-success">Party Details</h2>
      <div id="party-details"></div>
    </section>
  </main>
`;

const base = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const cohort = "2507";
const res = "/events";
const API = `${base}/${cohort}${res}`;

let partyList = [];
let selectedParty = null;

async function fetchAllParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    partyList = result.data;
    renderPartyList();
    renderSelectedParty();
  } catch (error) {
    console.error("Failed to Fetch", error);
  }
}

async function fetchSingleParty(partyId) {
  try {
    const response = await fetch(`${API}/${partyId}`);
    const result = await response.json();
    selectedParty = result.data;
    renderSelectedParty();
  } catch (error) {
    console.error("Failed to Fetch by ID", error);
  }
}

function PartyListItem(partyObj) {
  const listItem = document.createElement("li");
  listItem.textContent = partyObj.name;
  listItem.style.cursor = "pointer";

  listItem.addEventListener("click", async () => {
    await fetchSingleParty(partyObj.id);
  });

  return listItem;
}

function renderPartyList() {
  const listContainer = document.getElementById("party-list") || document.createElement("ul")
  listContainer.id = "party-list"
  listContainer.innerHTML = ""

  partyList.forEach((party) => {
    const item = PartyListItem(party)
    listContainer.appendChild(item)
  })

  if (!document.body.contains(listContainer)) {
    document.body.appendChild(listContainer)
  }
}

function renderSelectedParty() {
  const detailContainer = document.getElementById("party-details") || document.createElement("div")
  detailContainer.id = "party-details"
  detailContainer.innerHTML = ""

  if (selectedParty) {
    const name = document.createElement("h2")
    name.textContent = selectedParty.name

    const id = document.createElement("p")
    id.textContent = `ID: ${selectedParty.id}`

    const date = document.createElement("p")
    date.textContent = `Date: ${selectedParty.date}`

    const desc = document.createElement("p")
    desc.textContent = `Description: ${selectedParty.description}`

    const loc = document.createElement("p")
    loc.textContent = `Location: ${selectedParty.location}`

    detailContainer.appendChild(name)
    detailContainer.appendChild(id)
    detailContainer.appendChild(date)
    detailContainer.appendChild(desc)
    detailContainer.appendChild(loc)
  } else {
    const msg = document.createElement("p")
    msg.textContent = "Click a party to see the details."
    detailContainer.appendChild(msg)
  }

  if (!document.body.contains(detailContainer)) {
    document.body.appendChild(detailContainer)
  }
}

fetchAllParties()