function defaultOpen() {
  console.log("Start create Accounting Ledger");
  setLoginData();
}

async function createAccountingLedgerEvent() {
  let liKeypairString = localStorage.getItem("liKeypair");
  if(liKeypairString !== null) {
    document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "Loading.";
    try {
      let creationRelay = document.getElementById("relay").value;
      let creationRelays = [ creationRelay ];
      console.log("Creation Relay: " + creationRelays);
      let liKeypair = JSON.parse(liKeypairString);
      let ledgerEvent = createExampleLedgerEvent(creationRelays, liKeypair.pk, liKeypair.sk);
      console.log("Example Ledger Event: " + ledgerEvent);
      let nAddrC = getAccountingLedgerNaddr(ledgerEvent);
      console.log("Naddr example ledger Event: " + nAddrC);
      let ledgerEventReceived = await sendLedgerEvent(ledgerEvent, liKeypair.sk, creationRelays);
      console.log("Created Accounting Ledger Event: " + ledgerEventReceived);
      document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "Succesfully created accounting ledger:<br><p style='color:red'>To view detailed accounting ledger event, copy and paste the respective 'naddr...' in Menu-point 'View Accounting Ledger'.</p>Naddr: " + nAddrC + "<br>";
    } catch (error) {
      document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "Accounting Ledger Creation Failed: " + error;
      document.getElementById("createAccountingLedgerViewList").innerHTML = "<li>...</li>";
    }
  } else {
    document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "No account logged in. Log in account before searching.";
    document.getElementById("createAccountingLedgerViewList").innerHTML = "<li>...</li>";
  }
}

function createExampleLedgerEvent(cRelays, cPk, cSk) {
  let exampleLedgerEvent = "";
  //Create example ledger
  const d = "spal";
  const relays = cRelays;
  const spalData = {
    tags: [
      ["d", d],
      ["L", "leaccountingnip"],
      ["l", "ledger", "leaccountingnip"],
      ["r", relays[0]],
      ["p", cPk]
    ], 
    content: {
      name: "Simple test ledger", 
      acc_units: ["sats"],
      acc_account_categories: [
        { id: "acc_c_0", name: "Income" },
        { id: "acc_c_1", name: "Expense" },
        { id: "acc_c_2", name: "Asset" }
      ], 
      acc_accounts: [ 
        { id: "acc_0001", name: "Incoming Zaps", parent_id: ["acc_c_0"] },
        { id: "acc_0002", name: "Incoming Donations", parent_id: ["acc_c_0"] },
        { id: "acc_0003", name: "Sales", parent_id: ["acc_c_0"] },
        { id: "acc_0004", name: "Remuneration", parent_id: ["acc_c_0"] },
        { id: "acc_0005", name: "Own Deposit on Wallet", parent_id: ["acc_c_0"] },
        { id: "acc_1001", name: "Outgoing Zaps", parent_id: ["acc_c_1"] },
        { id: "acc_1002", name: "Outgoing Donations", parent_id: ["acc_c_1"] },
        { id: "acc_1003", name: "Purchases", parent_id: ["acc_c_1"] },
        { id: "acc_1004", name: "Payments", parent_id: ["acc_c_1"] },
        { id: "acc_1005", name: "Own Withdrawal from Wallet", parent_id: ["acc_c_1"] },
        { id: "acc_2001", name: "Wallet Balance", parent_id: ["acc_c_2"] }
      ],
      acc_accountant_categories: [
        { id: "acc_ac_0", name: "admin" }
      ],
      acc_accountants: [
        { id: "acc_a_0", name: "Le me", parent_id: ["acc_ac_0"], pubkey: [cPk] }
      ]
    }   
  };
  let spal = NostrTools.finalizeEvent({
    kind: 37701,
    created_at: Math.floor(Date.now() / 1000),
    tags: spalData.tags,
    content: JSON.stringify(spalData.content),
  }, cSk);
  console.log(spal);
  exampleLedgerEvent = spal;
  return exampleLedgerEvent;
}
