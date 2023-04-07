import App from "App";

import { Spinner } from "@vechaiui/react";
import { useConnect, useProcess } from "hooks";

export default function Entry() {
  const connection = useConnect();
  const process = useProcess();

  if (connection.isLoading && !connection.isError) {
    return (
      <div className="h-screen grid place-content-center">
        <div className="inline-flex space-x-2 items-center">
          <span className="font-medium text-lg">Loading</span>
          <Spinner size="md" />
        </div>
      </div>
    );
  }

  if (connection.isError) {
    return (
      <main className="h-screen grid place-content-center">
        <div className="font-medium text-lg">
          Connection to CSI's server failed; please check sure it is up and
          running
        </div>
      </main>
    );
  }

  return <App />;
}
