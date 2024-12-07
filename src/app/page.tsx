import VerificationPage from "./ui/recaptha";

export default function Home() {
  return (
    <div
      className="container bg-red-500 w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/darktwo.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <VerificationPage />
    </div>
  );
}
