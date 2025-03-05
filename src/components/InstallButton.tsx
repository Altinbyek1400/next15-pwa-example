import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    // if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      }
      setDeferredPrompt(null);
    });
  };

  return (
    <button
      onClick={handleInstallClick}
      className="p-2 bg-blue-600 text-white rounded-md"
    >
      Install App
    </button>
  );
};

export default InstallButton;
