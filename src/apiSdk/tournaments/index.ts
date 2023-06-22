import axios from 'axios';
import queryString from 'query-string';
import { TournamentInterface, TournamentGetQueryInterface } from 'interfaces/tournament';
import { GetQueryInterface } from '../../interfaces';

export const getTournaments = async (query?: TournamentGetQueryInterface) => {
  const response = await axios.get(`/api/tournaments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTournament = async (tournament: TournamentInterface) => {
  const response = await axios.post('/api/tournaments', tournament);
  return response.data;
};

export const updateTournamentById = async (id: string, tournament: TournamentInterface) => {
  const response = await axios.put(`/api/tournaments/${id}`, tournament);
  return response.data;
};

export const getTournamentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tournaments/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTournamentById = async (id: string) => {
  const response = await axios.delete(`/api/tournaments/${id}`);
  return response.data;
};
