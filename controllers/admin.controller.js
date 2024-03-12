const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminController {
  async getProjectsInterest(req, res) {
    try {
      const projects = await prisma.project.findMany({
        where: {
          stateId: 1,
        },
        include: {
          supervisor: true,
          skills: {
            include: {
              skill: true,
            },
          },
          state: true,
        },
      });
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AdminController();
