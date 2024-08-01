if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js")
    .then(registration=>{
      console.log("SW Registered!: ", registration);
    }).catch(error=>{
      console.log("SW Registration Failed: ", error);
    });
}else{
  console.log("Not supported");
}