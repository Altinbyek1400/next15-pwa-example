import { useEffect, useState } from "react";

const InstallButton = () => {
  const [isSafari, setIsSafari] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // iOS Safari шалгах
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsSafari(isIOS && !isStandalone);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (!(deferredPrompt instanceof Event)) return;
    (deferredPrompt as any).prompt();
    (deferredPrompt as any).userChoice.then(
      (choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      }
    );
  };

  return (
    <>
      {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="p-2 bg-blue-600 text-white rounded-md"
        >
          Install App
        </button>
      )}

      {isSafari && (
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <p>To install this app on your iPhone:</p>
          <p>
            1. Tap <strong>Share</strong> (<i className="fas fa-share-alt"></i>)
            2. Scroll down and tap <strong>"Add to Home Screen"</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default InstallButton;
