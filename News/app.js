// Tab Content Map
const tabContentMap = {
  dashboard: `<h2>Dashboard</h2>
  <div id="dashboardContent"></div>`,
  travel: `<h2>Travel Requests</h2>
  <button onclick="newTravel()">+ New Travel Request</button>
  <div id="travelList"></div>`,
  expenses: `<h2>Expenses</h2>
  <button onclick="newExpense()">+ Add Expense</button>
  <div id="expenseList"></div>`,
  settle: `<h2>Settlements</h2>
  <div id="settleList"></div>`,
  advance: `<h2>Advance Requests</h2>
  <div id="advanceList"></div>`,
  more: `<h2>More</h2>
  <ul>
    <li>Monthly TADA Report</li>
    <li>Monthly Expense Report</li>
    <li>Travel Policy</li>
    <li>Expense Policy</li>
    <li>Help & Support</li>
    <li>Settings</li>
  </ul>`
};

const fabActions = {
  dashboard: ()=>alert('Choose "+ New Travel" or "+ Add Expense"'),
  travel: ()=>newTravel(),
  expenses: ()=>newExpense(),
  settle: ()=>alert('Submit settlement here'),
  advance: ()=>alert('Upload receipt for advance'),
  more: ()=>{}
};

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContent = document.getElementById('tabContent');
const currentScreen = document.getElementById('currentScreen');
const fab = document.getElementById('fab');

function loadTab(tab){
  tabContent.innerHTML = tabContentMap[tab] || '';
  currentScreen.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
  fab.classList.toggle('hidden', !fabActions[tab]);
  fab.onclick = fabActions[tab] || null;
  renderData(tab);
  updateBadges();
}

tabButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    tabButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    loadTab(btn.dataset.tab);
  });
});

// Storage initialization
if(!localStorage.getItem('travelRequests')) localStorage.setItem('travelRequests', JSON.stringify([]));
if(!localStorage.getItem('addedExpenses')) localStorage.setItem('addedExpenses', JSON.stringify([]));
if(!localStorage.getItem('advanceRequests')) localStorage.setItem('advanceRequests', JSON.stringify([]));
if(!localStorage.getItem('postSettlements')) localStorage.setItem('postSettlements', JSON.stringify([]));

// ======= Render Data per tab ========
function renderData(tab){
  if(tab==='dashboard'){
    const dash = document.getElementById('dashboardContent');
    const travels = JSON.parse(localStorage.getItem('travelRequests'));
    const expenses = JSON.parse(localStorage.getItem('addedExpenses'));
    dash.innerHTML = `<p>Pending Travels: ${travels.filter(t=>t.status==='Pending').length}</p>
                      <p>Pending Expenses: ${expenses.filter(e=>e.status==='Pending').length}</p>`;
  }
  if(tab==='travel'){
    const list = document.getElementById('travelList');
    const travels = JSON.parse(localStorage.getItem('travelRequests'));
    if(travels.length===0) list.innerHTML="<p>No travel requests</p>";
    else list.innerHTML=travels.map((t,i)=>`<div>${i+1}. ${t.purpose} - ${t.status}</div>`).join('');
  }
  if(tab==='expenses'){
    const list = document.getElementById('expenseList');
    const expenses = JSON.parse(localStorage.getItem('addedExpenses'));
    if(expenses.length===0) list.innerHTML="<p>No expenses</p>";
    else list.innerHTML=expenses.map((e,i)=>`<div>${i+1}. ${e.category} - ${e.amount} - ${e.status}</div>`).join('');
  }
  if(tab==='advance'){
    const list = document.getElementById('advanceList');
    const adv = JSON.parse(localStorage.getItem('advanceRequests'));
    const eligibleAdv = adv.filter(a=>a.eligible && a.status==='Approved' && !a.settled);
    if(eligibleAdv.length===0) list.innerHTML="<p>No advance pending settlement</p>";
    else list.innerHTML=eligibleAdv.map((a,i)=>`<div>${i+1}. ${a.travelPurpose} - ${a.amount} - Pending Settlement</div>`).join('');
  }
}

// ======= FAB helpers ========
function newTravel(){
  const purpose = prompt("Enter travel purpose:");
  if(!purpose) return;
  const type = prompt("Travel Type (Eligible/Non-Eligible):",'Eligible');
  const advance = type.toLowerCase()=='eligible'?prompt("Advance Required? Yes/No",'Yes'):'No';
  const advanceAmount = advance.toLowerCase()=='yes'?prompt("Enter advance amount:",0):0;
  const travels = JSON.parse(localStorage.getItem('travelRequests'));
  travels.push({purpose,status:'Pending',type,advanceAmount:Number(advanceAmount)});
  localStorage.setItem('travelRequests',JSON.stringify(travels));
  if(advance.toLowerCase()=='yes'){
    const adv = JSON.parse(localStorage.getItem('advanceRequests'));
    adv.push({travelPurpose:purpose,eligible:true,status:'Approved',settled:false,amount:Number(advanceAmount)});
    localStorage.setItem('advanceRequests',JSON.stringify(adv));
  }
  loadTab('travel');
}

function newExpense(){
  const category = prompt("Enter category (Petrol/Fuel, Vehicle Maintenance, etc):");
  if(!category) return;
  const amount = prompt("Enter amount:");
  const desc = prompt("Enter description:");
  const expenses = JSON.parse(localStorage.getItem('addedExpenses'));
  expenses.push({category,amount,status:'Pending',description:desc});
  localStorage.setItem('addedExpenses',JSON.stringify(expenses));
  loadTab('expenses');
}

// ======= Badges ========
function updateBadges(){
  const travelData = JSON.parse(localStorage.getItem('travelRequests'));
  const expenseData = JSON.parse(localStorage.getItem('addedExpenses'));
  const settleData = JSON.parse(localStorage.getItem('postSettlements'));
  const advanceData = JSON.parse(localStorage.getItem('advanceRequests'));

  document.getElementById('dashboardBadge').textContent = travelData.filter(t=>t.status==='Pending').length + expenseData.filter(e=>e.status==='Pending').length;
  document.getElementById('travelBadge').textContent = travelData.filter(t=>t.status==='Pending').length;
  document.getElementById('expensesBadge').textContent = expenseData.filter(e=>e.status==='Pending').length;
  document.getElementById('settleBadge').textContent = settleData.filter(s=>s.status==='Pending').length;
  const advanceCount = advanceData.filter(a=>a.eligible && a.status==='Approved' && !a.settled).length;
  document.getElementById('advanceBadge').textContent = advanceCount;
}

// Initialize
loadTab('dashboard');
