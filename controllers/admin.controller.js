const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminController {
  async getProjectsInterest(req, res) {
    try {
      let projects = await prisma.project.findMany({
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
      projects = projects.map((project) => {
        const skills = project.skills.map((skill) => {
          return skill.skill;
        });

        return {
          ...project,
          period: `${project.dateStart.toLocaleDateString(
            'ru-RU',
          )} - ${project.dateEnd.toLocaleDateString('ru-RU')}`,
          skills: skills,
        };
      });
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AdminController();
