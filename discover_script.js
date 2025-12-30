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
        let addr = "";
        try {
          let content = JSON.parse(discoveredLedgerEvents[i].content);
          console.log(content);
          name = content.name;
          let d = "";
          let r = [];
          let k = 0;
          for (let j = 0; j < discoveredLedgerEvents[i].tags.length; j++) {
            if (discoveredLedgerEvents[i].tags[j][0] == 'd') {
              d = discoveredLedgerEvents[i].tags[j][1];
            }
            if (discoveredLedgerEvents[i].tags[j][0] == 'r') {
              r[k] = discoveredLedgerEvents[i].tags[j][1];
            }
          }
          naddr = NostrTools.nip19.naddrEncode( { "identifier": d, "relays": r, "pubkey": discoveredLedgerEvents[i].pubkey, "kind": discoveredLedgerEvents[i].kind } );
          addr = discoveredLedgerEvents[i].kind + ":" + discoveredLedgerEvents[i].pubkey + ":" + d;
        } catch (error) {
          name = "Error reading Event.";
        }
        discoveredAccountingLedgerEventsList += "<li>Name: " + name + ", <br>Naddr: " + naddr + ", <br>addr: " + addr + "</li>"; 
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
