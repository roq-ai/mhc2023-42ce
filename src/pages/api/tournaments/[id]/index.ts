import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tournamentValidationSchema } from 'validationSchema/tournaments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.tournament
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTournamentById();
    case 'PUT':
      return updateTournamentById();
    case 'DELETE':
      return deleteTournamentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTournamentById() {
    const data = await prisma.tournament.findFirst(convertQueryToPrismaUtil(req.query, 'tournament'));
    return res.status(200).json(data);
  }

  async function updateTournamentById() {
    await tournamentValidationSchema.validate(req.body);
    const data = await prisma.tournament.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTournamentById() {
    const data = await prisma.tournament.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
