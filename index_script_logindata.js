function setLoginData() {
  let liKeypairString = localStorage.getItem("liKeypair");
  
  if(liKeypairString !== null) {
    let liKeypair = JSON.parse(liKeypairString);
    document.getElementById("topNavLoginDataNpub").innerHTML = "<b>Currently logged in: </b>" + liKeypair.npubShort;
  } 
}
