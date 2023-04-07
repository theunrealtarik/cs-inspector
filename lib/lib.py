class Entity:
  def __init__(self, addr: int, health: int, armor: int, team_id: int) -> None:
    self.addr = addr
    self.health = health
    self.armor = armor
    self.team_id = team_id
