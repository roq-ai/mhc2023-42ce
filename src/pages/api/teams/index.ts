import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { teamValidationSchema } from 'validationSchema/teams';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTeams();
    case 'POST':
      return createTeam();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeams() {
    const data = await prisma.team
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'team'));
    return res.status(200).json(data);
  }

  async function createTeam() {
    await teamValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.match_match_team_a_idToteam?.length > 0) {
      const create_match_match_team_a_idToteam = body.match_match_team_a_idToteam;
      body.match_match_team_a_idToteam = {
        create: create_match_match_team_a_idToteam,
      };
    } else {
      delete body.match_match_team_a_idToteam;
    }
    if (body?.match_match_team_b_idToteam?.length > 0) {
      const create_match_match_team_b_idToteam = body.match_match_team_b_idToteam;
      body.match_match_team_b_idToteam = {
        create: create_match_match_team_b_idToteam,
      };
    } else {
      delete body.match_match_team_b_idToteam;
    }
    if (body?.player?.length > 0) {
      const create_player = body.player;
      body.player = {
        create: create_player,
      };
    } else {
      delete body.player;
    }
    const data = await prisma.team.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
