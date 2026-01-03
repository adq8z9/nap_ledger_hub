async function getLedgerEvent(naddrLedger, secK) {
  const pool = new NostrTools.SimplePool();
  const relays = naddrLedger.data.relays;
  console.log("Naddr relays: " + relays);
  console.log("Get Ledger event.");
  if (relays == "") {
    throw "No Relay-hint in naddr.";
  }
  function authF(eventA) {
    console.log("Relay authentication.");
    return NostrTools.finalizeEvent(eventA, secK);
  }
  const event = await pool.get(
    relays,
    {
      kinds: [37701],
      '#d': [naddrLedger.data.identifier],
      authors: [naddrLedger.data.pubkey]
    },
    { onauth : authF }
  );
  console.log('Event from Relay: ', event);
  if (event == null) { 
    throw "Event not found on relay."; 
  } else if (!NostrTools.verifyEvent(event)) {
    throw "Not valid event received from relay.";
  } else if (event.kind != 37701 || event.pubkey != naddrLedger.data.pubkey || getAccountingLedgerIdentifier(event) != naddrLedger.data.identifier) {
    throw "Not correct event received from relay.";
  } else {
    return event; 
  }
}

async function getLedgerEvents(dRelays, secK) {
  const pool = new NostrTools.SimplePool();
  const relays = dRelays;
  console.log("Discovery relays: " + relays);
  console.log("Get Ledger events.");
  if (relays == "") {
    throw "No Relay selected.";
  }
  function authF(eventA) {
    console.log("Relay authentication.");
    return NostrTools.finalizeEvent(eventA, secK);
  }
  const events = await pool.querySync(
    relays,
    {
      kinds: [37701],
      limit: 50
    },
    { onauth : authF }
  );
  console.log('Events from Relay: ', events);
  if (events == null || events.length == 0) { 
    throw "No Events found on relay."; 
  //} else if (!NostrTools.verifyEvent(event)) {
  //  throw "No valid events received from relay.";
  //} else if (event.kind != 37701 || event.pubkey != naddrLedger.data.pubkey || getIdentifier(event.tags) != naddrLedger.data.identifier) {
  //  throw "Not correct event received from relay.";
  } else {
    return events; 
  }
}

function delay(n) {
  return new Promise(function(resolve) {
    setTimeout(resolve, n * 1000);
  });
}
