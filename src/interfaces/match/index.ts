import { TeamInterface } from 'interfaces/team';
import { TournamentInterface } from 'interfaces/tournament';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MatchInterface {
  id?: string;
  team_a_id: string;
  team_b_id: string;
  score_a: number;
  score_b: number;
  tournament_id: string;
  scorekeeper_id: string;
  created_at?: any;
  updated_at?: any;

  team_match_team_a_idToteam?: TeamInterface;
  team_match_team_b_idToteam?: TeamInterface;
  tournament?: TournamentInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  team_a_id?: string;
  team_b_id?: string;
  tournament_id?: string;
  scorekeeper_id?: string;
}
