const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminController {
  async getProjectsInterest(req, res) {
    try {
      const projects = await prisma.project.findMany({
        where: {
          stateId: 1,
        },
      });
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AdminController();
