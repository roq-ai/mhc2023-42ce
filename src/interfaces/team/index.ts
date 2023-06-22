import { MatchInterface } from 'interfaces/match';
import { PlayerInterface } from 'interfaces/player';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  name: string;
  organization_id: string;
  team_manager_id: string;
  created_at?: any;
  updated_at?: any;
  match_match_team_a_idToteam?: MatchInterface[];
  match_match_team_b_idToteam?: MatchInterface[];
  player?: PlayerInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    match_match_team_a_idToteam?: number;
    match_match_team_b_idToteam?: number;
    player?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
  team_manager_id?: string;
}
