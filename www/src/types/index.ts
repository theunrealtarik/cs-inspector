export interface IRawEntity {
  addr: number;
  health: number;
  armor: number;
  team_id: number;
}

export interface IEntity {
  id: number;
  health: number;
  armor: number;
  team: {
    label: string;
    id: number;
    icon: string;
  };
}
