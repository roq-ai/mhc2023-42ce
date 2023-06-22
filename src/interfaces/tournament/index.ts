import { MatchInterface } from 'interfaces/match';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TournamentInterface {
  id?: string;
  name: string;
  start_date: any;
  end_date: any;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  match?: MatchInterface[];
  organization?: OrganizationInterface;
  _count?: {
    match?: number;
  };
}

export interface TournamentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
