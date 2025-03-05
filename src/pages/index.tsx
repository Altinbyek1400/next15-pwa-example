import InstallButton from "@/components/InstallButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to My PWA App</h1>
      <InstallButton />
    </div>
  );
}
