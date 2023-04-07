import { useProcess, useData } from "hooks";
import { Spinner } from "@vechaiui/react";
import { Player } from "components/Player";

function App() {
  const process = useProcess();
  const data = useData();

  return (
    <main className="w-full h-screen overflow-hidden flex flex-col gap-y-2">
      <section className="h-full rounded p-2 grid grid-cols-5 gap-x-2">
        {!data && (
          <div className="h-full grid col-span-5 place-content-center">
            <Spinner size="xl" />
          </div>
        )}
        {data &&
          data.map((enemy, index) => (
            <div className="col-span-1" key={index}>
              <Player index={index} data={enemy} />
            </div>
          ))}
      </section>

      <footer className="flex justify-between p-2 bg-black/[.2]">
        <div className="inline-flex gap-x-2 items-center">
          <img src="/csi.svg" className="h-8 w-8" />
          <span>
            {process.isGameRunning ? process.pid : "GAME IS NOT RUNNING"}
          </span>
        </div>

        <img className="h-12" src={data?.at(0)?.team.icon} />
      </footer>
    </main>
  );
}

export default App;
