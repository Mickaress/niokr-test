const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ProjectController {
  async getAll(req, res) {
    try {
      const query = req.query;
      const title = query.title;
      const payment = query.payment;
      const skills = query.skills?.map(Number);
      const page = parseInt(query.page) || 1;
      const perPage = parseInt(query.perPage) || 3;

      // Базовый фильтр с фильтрацией архивных проектов
      const filter = {
        AND: [
          {
            stateId: 1,
          },
        ],
      };
      // Фильтр по оплате
      if (payment && payment.length === 1) {
        const value = payment[0] === 'true';
        filter.AND.push({
          payment: value,
        });
      }
      // Фильтр по названию
      if (title) {
        filter.AND.push({
          OR: [
            {
              title: {
                startsWith: title,
                mode: 'insensitive',
              },
            },
            {
              title: {
                contains: ` ${title}`,
                mode: 'insensitive',
              },
            },
          ],
        });
      }
      // Фильтр по навыкам
      if (skills) {
        filter.AND.push({
          skills: {
            some: {
              skillId: {
                in: skills,
              },
            },
          },
        });
      }

      // Итоговый запрос с пагинацией
      let projects = await prisma.project.findMany({
        where: filter,
        include: {
          supervisor: true,
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

      const projectsCount = await prisma.project.findMany({
        where: filter,
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

      res.json({ projectCount: projectsCount.length, projects: projects });
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;

      let project = await prisma.project.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          supervisor: true,
          vacancies: true,
          skills: {
            select: {
              skill: true,
            },
          },
          state: true,
        },
      });

      await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      const skills = project.skills.map((skill) => {
        return skill.skill;
      });

      project = {
        ...project,
        period: `${project.dateStart.toLocaleDateString(
          'ru-RU',
        )} - ${project.dateEnd.toLocaleDateString('ru-RU')}`,
        skills: skills,
      };

      res.json(project);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProjectController();
