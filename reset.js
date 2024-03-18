const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/', async (req, res) => {
  await prisma.user.createMany({
    data: [
      {
        fio: 'Смирнов Игорь Олегович',
        role: 'student_candidate',
        email: 'student@mail.ru',
        phone: '+79503456712',
        institute: 'Институт информационных технологий и анализа данных',
        competencies: 'Умение работать в команде.',
        mailing: true,
        group: 'АСУб-20-1',
        birthday: new Date('12.12.2002'),
      },
      {
        fio: 'Смирнов Игорь Олегович',
        role: 'employee_candidate',
        email: 'employee@mail.ru',
        phone: '+79503445687',
        institute: 'Институт информационных технологий и анализа данных',
        post: 'Профессор',
        competencies: 'Умение работать в команде.',
        mailing: true,
      },
      {
        fio: 'Иванов Илья Ильич',
        role: 'supervisor',
        email: 'ivanov@mail.ru',
        phone: '+79001112233',
      },
      {
        fio: 'Журавлёв Валерий Петрович',
        role: 'admin',
      },
    ],
  });
  await prisma.state.createMany({
    data: [
      {
        state: 'Активный',
      },
      {
        state: 'В архиве',
      },
      {
        state: 'Проверяется',
      },
      {
        state: 'Одобрено',
      },
      {
        state: 'Отклонено',
      },
    ],
  });
  await prisma.project.createMany({
    data: [
      {
        title:
          'Исследование параметров объектов производственной среды и разработка технических предложений для проектирования классификаторов',
        conditions: 'Полный день, полная занятость.',
        description:
          'В этом проекте вам предстоит провести исследование параметров производственной среды и разработать технические предложения для проектирования классификаторов. Это важная задача для оптимизации производственных процессов.',
        goal: 'Создать технические предложения, которые помогут оптимизировать работу производственной среды и улучшить производительность.',
        dateStart: new Date('01.01.2024'),
        dateEnd: new Date('01.01.2025'),
        payment: true,
        supervisorId: 3,
      },
      {
        title: 'Разработка интерактивных веб-приложений',
        conditions: 'Полный день, полная занятость.',
        description:
          'В этом проекте вы будете заниматься разработкой интерактивных веб-приложений. Это отличная возможность применить свои навыки веб-разработки и создать увлекательные веб-приложения.',
        goal: 'Разработать интерактивные веб-приложения, которые предоставят пользователю уникальный и привлекательный опыт.',
        dateStart: new Date('01.01.2024'),
        dateEnd: new Date('01.01.2025'),
        payment: true,
        supervisorId: 3,
      },
      {
        title: 'Управление контентом на сайте',
        conditions: 'Полный день, полная занятость.',
        description:
          'В этом проекте вашей задачей будет управление контентом на веб-сайте. Вы будете обновлять информацию, добавлять новые материалы и поддерживать актуальность сайта.',
        goal: 'Обеспечить актуальность и качество контента на сайте, что способствует удовлетворенности пользователей.',
        dateStart: new Date('01.01.2023'),
        dateEnd: new Date('01.01.2024'),
        payment: true,
        stateId: 2,
        supervisorId: 3,
      },
      {
        title: 'Тестирование новой версии программы',
        conditions: 'Полный день, полная занятость',
        description:
          'В этом проекте вам предстоит провести тестирование новой версии программного обеспечения. Вы будете выявлять и отчитывать об ошибках и несоответствиях.',
        goal: 'Обнаружить и устранить ошибки и несоответствия в новой версии программы, чтобы обеспечить качество продукта.',
        dateStart: new Date('01.01.2024'),
        dateEnd: new Date('01.01.2025'),
        payment: false,
        supervisorId: 3,
      },
      {
        title: 'Разработка мобильных приложений для клиентов',
        conditions: 'Полный день, полная занятость.',
        description:
          'В этом проекте вашей задачей будет разработка мобильных приложений для клиентов. Вы создадите инновационные приложения, которые улучшат опыт пользователей.',
        goal: 'Разработать мобильные приложения, которые предоставят клиентам удобный и полезный функционал.',
        dateStart: new Date('01.01.2024'),
        dateEnd: new Date('01.01.2025'),
        payment: true,
        supervisorId: 3,
      },
    ],
  });
  await prisma.vacancy.createMany({
    data: [
      {
        title: 'UI/UX-дизайнер',
        conditions: 'Полный день, полная занятость.',
        responsibilities: 'Создать платформу (страничку) для рекламы олимпиад.',
        requirements: 'Знание основ верстки и дизайна веб-страниц.',
        dateStart: new Date('01.04.2024'),
        dateEnd: new Date('01.10.2024'),
        salary: 50000,
        stateId: 1,
        projectId: 2,
      },
      {
        title: 'Веб-разработчик',
        conditions: 'Удаленная работа, гибкий график.',
        responsibilities: 'Разработка и поддержка веб-приложений.',
        requirements:
          'Знание HTML, CSS, JavaScript, опыт работы с фреймворками.',
        dateStart: new Date('01.04.2024'),
        dateEnd: new Date('01.10.2024'),
        salary: 55000,
        stateId: 1,
        projectId: 2,
      },
      {
        title: 'Тестировщик ПО',
        conditions: 'Офис, полный рабочий день.',
        responsibilities:
          'Тестирование программного обеспечения, составление отчетов.',
        requirements: 'Опыт тестирования, знание методологий.',
        dateStart: new Date('01.04.2024'),
        dateEnd: new Date('01.10.2024'),
        salary: 0,
        stateId: 1,
        projectId: 4,
      },
      {
        title: 'Разработчик мобильных приложений',
        conditions: 'Удаленная работа, гибкий график.',
        responsibilities: 'Разработка мобильных приложений для Android и iOS.',
        requirements: 'Знание Java и Kotlin (для Android), Swift (для iOS).',
        dateStart: new Date('01.04.2024'),
        dateEnd: new Date('01.10.2024'),
        salary: 45000,
        stateId: 1,
        projectId: 5,
      },
    ],
  });
  await prisma.skill.createMany({
    data: [
      {
        name: 'Figma',
      },
      {
        name: 'Photoshop',
      },
      {
        name: 'HTML',
      },
      {
        name: 'CSS',
      },
      {
        name: 'JavaScript',
      },
      {
        name: 'Копирайтинг',
      },
      {
        name: 'SEO',
      },
      {
        name: 'Тестирование',
      },
      {
        name: 'Автоматизация',
      },
      {
        name: 'Android',
      },
      {
        name: 'iOS',
      },
    ],
  });
  await prisma.vacancySkill.createMany({
    data: [
      {
        vacancyId: 1,
        skillId: 1,
      },
      {
        vacancyId: 1,
        skillId: 2,
      },
      {
        vacancyId: 2,
        skillId: 3,
      },
      {
        vacancyId: 2,
        skillId: 4,
      },
      {
        vacancyId: 2,
        skillId: 5,
      },
      {
        vacancyId: 3,
        skillId: 8,
      },
      {
        vacancyId: 4,
        skillId: 10,
      },
      {
        vacancyId: 4,
        skillId: 11,
      },
    ],
  });
  await prisma.projectSkill.createMany({
    data: [
      {
        projectId: 1,
        skillId: 9,
      },
      {
        projectId: 2,
        skillId: 1,
      },
      {
        projectId: 2,
        skillId: 2,
      },
      {
        projectId: 2,
        skillId: 3,
      },
      {
        projectId: 2,
        skillId: 4,
      },
      {
        projectId: 2,
        skillId: 5,
      },
      {
        projectId: 3,
        skillId: 6,
      },
      {
        projectId: 3,
        skillId: 7,
      },
      {
        projectId: 4,
        skillId: 8,
      },
      {
        projectId: 5,
        skillId: 10,
      },
      {
        projectId: 5,
        skillId: 11,
      },
    ],
  });
  res.send('Hello World');
});

app.listen(3000, () => console.log(`Server start on port ${3000}`));
