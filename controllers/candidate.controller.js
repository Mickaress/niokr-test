const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class CandidateController {
  async createResponse(req, res) {
    try {
      const candidateId = parseInt(req.headers['token']);
      const { id: vacancyId } = req.params;
      if (candidateId && vacancyId) {
        await prisma.response.create({
          data: {
            candidateId: candidateId,
            vacancyId: parseInt(vacancyId),
          },
        });
        return;
      }
      res.status(401).send('Вы не авторизованы');
    } catch (error) {
      console.log(error);
    }
  }
  async getResponses(req, res) {
    try {
      const candidateId = parseInt(req.headers['token']);
      if (candidateId) {
        let responses = await prisma.response.findMany({
          where: {
            candidateId: candidateId,
          },
          include: {
            state: true,
            vacancy: {
              include: {
                project: true,
              },
            },
          },
        });
        responses = responses.map((response) => {
          return {
            ...response,
            date: response.date.toLocaleDateString('ru-RU'),
          };
        });
        res.json(responses);
        return;
      }
      res.status(401).send('Вы не авторизованы');
    } catch (error) {
      console.log(error);
    }
  }
  async updateSkills(req, res) {
    try {
      const { skillIds } = req.body;
      const candidateId = parseInt(req.headers['token']);

      await prisma.candidateSkill.deleteMany({
        where: {
          candidateId: candidateId,
        },
      });
      const data = skillIds.map((skillId) => {
        return {
          candidateId: candidateId,
          skillId: skillId,
        };
      });

      await prisma.candidateSkill.createMany({
        data: data,
      });
      res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async updateCompetencies(req, res) {
    try {
      const { competencies } = req.body;
      const candidateId = parseInt(req.headers['token']);

      await prisma.user.update({
        where: {
          id: candidateId,
        },
        data: {
          competencies: competencies,
        },
      });
      res.json();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CandidateController();
