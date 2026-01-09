// ================================
// Global App.js for TADA Prototype
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // FAB button logic
  const fab = document.querySelector(".fab");
  const currentPage = window.location.pathname.split("/").pop();

  fab.addEventListener("click", () => {
    switch (currentPage) {
      case "index.html":
        alert("Quick Action: New Travel / Add Expense");
        break;
      case "travel.html":
        alert("Open New Travel Form");
        break;
      case "expenses.html":
        alert("Open Add Expense Form");
        break;
      case "settle.html":
        alert("Submit Settlement");
        break;
      case "advance.html":
        alert("View Advance Summary");
        break;
      default:
        alert("FAB clicked!");
    }
  });

  // Travel advance logic
  const travelType = document.getElementById("travelType");
  const advanceSection = document.getElementById("advanceSection");
  const advanceRequired = document.getElementById("advanceRequired");
  const advanceAmountBox = document.getElementById("advanceAmountBox");

  if (travelType) {
    travelType.addEventListener("change", () => {
      if (["upcountry", "international"].includes(travelType.value)) {
        advanceSection.classList.remove("hidden");
      } else {
        advanceSection.classList.add("hidden");
      }
    });
  }

  if (advanceRequired) {
    advanceRequired.addEventListener("change", () => {
      advanceAmountBox.classList.toggle("hidden", !advanceRequired.checked);
    });
  }

  // Settlement calculation
  const actual = document.getElementById("actual");
  if (actual) {
    const advanceVal = parseInt(document.getElementById("advance").innerText);
    actual.addEventListener("input", () => {
      const net = parseInt(actual.value || 0) - advanceVal;
      document.getElementById("net").innerText = net;
    });
  }

  // Simple tab highlight for navigation
  const tabs = document.querySelectorAll(".tabs a");
  tabs.forEach(tab => {
    if (tab.getAttribute("href") === currentPage) {
      tab.classList.add("active-tab");
    }
  });
});
