function defaultOpen() {
  console.log("Start create Accounting Ledger");
  setLoginData();
}

async function createAccountingLedgerView() {
  let liKeypairString = localStorage.getItem("liKeypair");
  if(liKeypairString !== null) {
    document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "Loading.";
    try {
      let creationRelay = document.getElementById("relay").value;
      let creationRelays = [ creationRelay ];
      console.log("Creation Relay: " + creationRelays);
      let liKeypair = JSON.parse(liKeypairString);
      let ledgerEvent = createExampleLedgerEvent();
      console.log("Example Ledger Event: " + ledgerEvent);
      /*let createdLedgerEvent = await sendLedgerEvent(discoveryRelays, liKeypair.sk);
      console.log("Discovered Accounting Ledger Events: " + discoveredLedgerEvents);
      document.getElementById("discoverAccountingLedgerViewFeedback").innerHTML = "Discovered accounting Ledgers: <br><p style='color:red'>To view detailed accounting ledger event, copy and paste the respective 'naddr...' in Menu-point 'View Accounting Ledger'.</p>";
      let discoveredAccountingLedgerEventsList = "";
      for (let i = 0; i < discoveredLedgerEvents.length; i++) {
        let name = "";
        let naddr = "";
        let reference = "";
        try {
          let content = JSON.parse(discoveredLedgerEvents[i].content);
          console.log(content);
          name = getAccountingLedgerName(discoveredLedgerEvents[i]);
          reference = getAccountingLedgerReference(discoveredLedgerEvents[i]);
          naddr = getAccountingLedgerNaddr(discoveredLedgerEvents[i]);
        } catch (error) {
          name = "Error reading Event.";
        }
        discoveredAccountingLedgerEventsList += "<li>Name: " + name + ", <br>Reference-ID: " + reference + ", <br>Naddr: " + naddr + "</li>"; 
      }
      document.getElementById("discoverAccountingLedgerViewList").innerHTML = discoveredAccountingLedgerEventsList;*/
    } catch (error) {
      document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "Accounting Ledger Discovery Failed: " + error;
      document.getElementById("createAccountingLedgerViewList").innerHTML = "<li>...</li>";
    }
  } else {
    document.getElementById("createAccountingLedgerViewFeedback").innerHTML = "No account logged in. Log in account before searching.";
    document.getElementById("createAccountingLedgerViewList").innerHTML = "<li>...</li>";
  }
}

function createExampleLedgerEvent() {
  let exampleLedgerEvent = "Test Event";
  return exampleLedgerEvent;
}
