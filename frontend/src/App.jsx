import {RouterProvider} from "react-router-dom";
import router from "./Route";


function App() {
  // useEffect(() => {
  //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   if (!userAgent.includes("TelegramWebView")) {
  //     alert("This app must be opened in Telegram!");
  //   }
  // }, []);

  return (
    
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
