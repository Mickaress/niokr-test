const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class SupervisorController {
  async getProjects(req, res) {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const supervisorId = parseInt(req.headers['token']);

    let projects = await prisma.project.findMany({
      where: {
        supervisorId: supervisorId,
      },
      include: {
        supervisor: true,
        skills: {
          select: {
            skill: true,
          },
        },
        state: true,
      },
      skip: (page - 1) * 3,
      take: 3,
      orderBy: {
        stateId: 'asc',
      },
    });

    const projectsCount = await prisma.project.findMany({
      where: {
        supervisorId: supervisorId,
      },
    });

    // Форматирование
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

    res.json({ projects: projects, projectsCount: projectsCount.length });
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SupervisorController();
