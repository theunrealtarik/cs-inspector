import { Avatar } from "@vechaiui/react";
import { classNames } from "lib";
import type { IEntity } from "types";

// icons
import { GiHealthNormal } from "react-icons/gi";
import { BsFillShieldFill } from "react-icons/bs";

export function Player(props: { data: IEntity; index: number }) {
  return (
    <div className="flex flex-col gap-4 ring-1 ring-black/[.05] rounded h-full">
      <div className="inline-flex space-x-2 items-center mx-auto mt-4">
        <Avatar
          size="3xl"
          src={props.data.team.id === 2 ? "/t_pfp.png" : "/ct_pfp.png"}
        />
        <span className="font-mono text-2xl">Player #{props.index + 1}</span>
      </div>
      <div className="flex flex-col space-y-4 p-2">
        <div className="inline-flex justify-between gap-x-2">
          <div className="flex flex-col items-center justify-center w-10">
            <GiHealthNormal />
            <span>{props.data.health}</span>
          </div>
          <Bar
            className={healthColor(props.data.health)}
            width={props.data.health}
          />
        </div>

        <div className="inline-flex justify-between gap-x-2">
          <div className="flex flex-col items-center justify-center w-10">
            <BsFillShieldFill />
            <span>{props.data.armor}</span>
          </div>
          <Bar className="bg-gray-500" width={props.data.armor} />
        </div>
      </div>
    </div>
  );
}

function Bar(props: { className?: string; width: number }) {
  let width = props.width;
  if (width > 100 || width < 0) {
    width = 0;
  }

  return (
    <div className="w-full bg-white/[.05] rounded-lg h-8">
      <div
        className={classNames("h-8 rounded-lg", props.className ?? "")}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export function healthColor(health: number) {
  switch (true) {
    case health >= 90:
      return "bg-lime-500";

    case health >= 80:
      return "bg-green-400";

    case health >= 70:
      return "bg-yellow-400";

    case health >= 60:
      return "bg-yellow-500";

    case health >= 50:
      return "bg-yellow-600";

    case health >= 40:
      return "bg-orange-500";

    case health >= 30:
      return "bg-orange-600";

    case health >= 20:
      return "bg-red-500";

    case health >= 10:
      return "bg-red-600";

    default:
      return "bg-gray-400";
  }
}
