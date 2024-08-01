
const registrarServiceWorker = async () => {
  if("serviceWorker" in navigator){
    try{
      const registro = await navigator.serviceWorker.register("/service-worker.js",
        {
          scope: "/",
        }
      )
      if (registro.installing){
        console.log("SW instalando");
      }
      else if (registro.waiting){
        console.log("SW instalado");
      }
      else if (registro.active){
        console.log("SW activo")
      }
    } catch (error) {
      console.log("Fallo al registrar con error: ",error);
    }
  }
}


registrarServiceWorker();