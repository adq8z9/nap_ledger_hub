function defaultOpen() {
  console.log("Start discover Accounting Ledger");
  setLoginData();
}

async function discoverAccountingLedgerView() {
  let liKeypairString = localStorage.getItem("liKeypair");
  if(liKeypairString !== null) {
    document.getElementById("discoverAccountingLedgerViewFeedback").innerHTML = "Loading.";
    try {
      let discoveryRelay = document.getElementById("relay").value;
      let discoveryRelays = [ discoveryRelay ];
      console.log("Discovery Relay: " + discoveryRelays);
      let liKeypair = JSON.parse(liKeypairString);
      let discoveredLedgerEvents = await getLedgerEvents(discoveryRelays, liKeypair.sk);
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
      document.getElementById("discoverAccountingLedgerViewList").innerHTML = discoveredAccountingLedgerEventsList;
    } catch (error) {
      document.getElementById("discoverAccountingLedgerViewFeedback").innerHTML = "Accounting Ledger Discovery Failed: " + error;
    }
  } else {
    document.getElementById("discoverAccountingLedgerViewFeedback").innerHTML = "No account logged in. Log in account before searching.";
    document.getElementById("discoverAccountingLedgerViewList").innerHTML = "<li>...</li>";
  }
}
