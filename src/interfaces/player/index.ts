import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  team_id: string;
  created_at?: any;
  updated_at?: any;

  team?: TeamInterface;
  _count?: {};
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  team_id?: string;
}
