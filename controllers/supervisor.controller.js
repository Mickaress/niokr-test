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

  async getActiveProjects(req, res) {
    const supervisorId = parseInt(req.headers['token']);

    let projects = await prisma.project.findMany({
      where: {
        supervisorId: supervisorId,
        stateId: 1,
      },
      orderBy: {
        title: 'asc',
      },
    });

    res.json(projects);
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async createVacancies(req, res) {
    const {
      title,
      conditions,
      responsibilities,
      requirements,
      dateStart,
      dateEnd,
      salary,
      skillIds,
      projectId,
    } = req.body;

    const vacancy = await prisma.vacancy.create({
      data: {
        title: title,
        conditions: conditions,
        responsibilities: responsibilities,
        requirements: requirements,
        dateStart: dateStart,
        dateEnd: dateEnd,
        salary: salary,
        projectId: projectId,
      },
    });

    const data = skillIds.map((skillId) => {
      return {
        vacancyId: vacancy.id,
        skillId: skillId,
      };
    });
    await prisma.vacancySkill.createMany({
      data: data,
    });

    res.json({ projects: projects, projectsCount: projectsCount.length });
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async getProjectVacancies(req, res) {
    const query = req.query;
    const projectId = parseInt(query.projectId);
    const page = parseInt(query.page) || 1;
    const perPage = parseInt(query.perPage) || 3;

    let vacancies = await prisma.vacancy.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        project: {
          include: {
            supervisor: true,
          },
        },
        skills: {
          select: {
            skill: true,
          },
        },
        state: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        id: 'asc',
      },
    });

    const vacanciesCount = await prisma.vacancy.findMany({
      where: {
        projectId: projectId,
      },
    });

    // Форматирование
    vacancies = vacancies.map((vacancy) => {
      const skills = vacancy.skills.map((skill) => {
        return skill.skill;
      });

      return {
        ...vacancy,
        period: `${vacancy.dateStart.toLocaleDateString(
          'ru-RU',
        )} - ${vacancy.dateEnd.toLocaleDateString('ru-RU')}`,
        skills: skills,
      };
    });

    res.json({ vacancyCount: vacanciesCount.length, vacancies: vacancies });
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async getVacancyResponses(req, res) {
    const { vacancyId } = req.params;
    const query = req.query;
    const stateId = query.stateId || 3;
    const page = query.page || 1;
    const perPage = query.perPage || 10;

    const responses = await prisma.response.findMany({
      where: {
        vacancyId: parseInt(vacancyId),
        stateId: parseInt(stateId),
      },
      include: {
        candidate: {
          include: {
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        id: 'asc',
      },
    });

    const responsesCount = await prisma.response.findMany({
      where: {
        vacancyId: parseInt(vacancyId),
        stateId: parseInt(stateId),
      },
    });

    res.json({ responses: responses, count: responsesCount });
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SupervisorController();
