import { useProcess } from "hooks";

function App() {
  const process = useProcess();
  return (
    <main className="w-full h-screen overflow-hidden flex flex-col gap-y-2">
      <section className="h-full rounded p-2"></section>

      <footer className="inline-flex items-center gap-x-2 p-2 bg-black/[.2]">
        <img src="/csi.svg" className="h-8 w-8" />
        <span>
          {process.isGameRunning ? process.pid : "GAME IS NOT RUNNING"}
        </span>
      </footer>
    </main>
  );
}

export default App;
