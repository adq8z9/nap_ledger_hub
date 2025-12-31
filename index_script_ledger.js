function getAccountingLedgerName(event) {
  try {
    let content = JSON.parse(event.content);
    let name = content.name;
    return name;
  } catch (error) {
    throw "Error reading Event.";
  }
}

function getAccountingLedgerIdentifier(event) {
  try {
    let d = "";
    for (let j = 0; j < event.tags.length; j++) {
      if (event.tags[j][0] == 'd') {
        d = event.tags[j][1];
      }
    }
    return d;
  } catch (error) {
    throw "Error reading Event.";
  }
}

function getAccountingLedgerRelays(event) {
  try {
    let r = [];
    let k = 0;
    for (let j = 0; j < event.tags.length; j++) {
      if (event.tags[j][0] == 'r') {
        r[k] = event.tags[j][1];
      }
    }
    return r;
  } catch (error) {
    throw "Error reading Event.";
  }
}

function getAccountingLedgerReference(event) {
  try {
    let reference = "";
    let d = getAccountingLedgerIdentifier(event);
    reference = event.kind + ":" + event.pubkey + ":" + d;
    return reference;
  } catch (error) {
    throw "Error reading Event.";
  }
}

function getAccountingLedgerNaddr(event) {
  try {
    let naddr = "";
    let d = getAccountingLedgerIdentifier(event);
    let r = getAccountingLedgerRelays(event);
    naddr = NostrTools.nip19.naddrEncode( { "identifier": d, "relays": r, "pubkey": event.pubkey, "kind": event.kind } );
    return naddr;
  } catch (error) {
    throw "Error reading Event.";
  }
}

