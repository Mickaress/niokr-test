const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class VacancyController {
  async getAll(req, res) {
    try {
      const query = req.query;
      const title = query.title;
      const payment = query.payment;
      const skills = query.skills?.map(Number);
      const page = parseInt(query.page) || 1;
      const perPage = parseInt(query.perPage) || 3;

      // Базовый фильтр с фильтрацией архивных вакансий
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
        filter.AND.push(
          value
            ? {
                salary: {
                  gt: 0,
                },
              }
            : {
                salary: 0,
              },
        );
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
      let vacancies = await prisma.vacancy.findMany({
        where: filter,
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
        },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          id: 'asc',
        },
      });

      const vacanciesCount = await prisma.vacancy.findMany({
        where: filter,
      });

      // Форматирование
      vacancies = vacancies.map((vacancy) => {
        const skills = vacancy.skills.map((skill) => {
          return skill.skill;
        });

        return {
          ...vacancy,
          period: `${vacancy.dateStart.toLocaleDateString()} - ${vacancy.dateEnd.toLocaleDateString()}`,
          skills: skills,
        };
      });

      res.json({ vacancyCount: vacanciesCount.length, vacancies: vacancies });
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;

      let vacancy = await prisma.vacancy.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          skills: {
            select: {
              skill: true,
            },
          },
          project: {
            include: {
              supervisor: true,
              skills: {
                select: {
                  skill: true,
                },
              },
            },
          },
        },
      });

      const skills = vacancy.skills.map((skill) => skill.skill);

      const projectSkills = vacancy.project.skills.map((skill) => skill.skill);

      vacancy = {
        ...vacancy,
        project: {
          ...vacancy.project,
          period: `${vacancy.project.dateStart.toLocaleDateString()} - ${vacancy.project.dateEnd.toLocaleDateString()}`,
          skills: projectSkills,
        },
        period: `${vacancy.dateStart.toLocaleDateString()} - ${vacancy.dateEnd.toLocaleDateString()}`,
        skills: skills,
      };

      res.json(vacancy);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new VacancyController();
