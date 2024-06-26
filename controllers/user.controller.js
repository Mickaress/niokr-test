const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class UserController {
  async getUserInfo(req, res) {
    try {
      const id = parseInt(req.headers['token']);
      if (id) {
        let userInfo = await prisma.user.findUnique({
          where: {
            id: id,
          },
          include: {
            skills: {
              include: {
                skill: true,
              },
            },
          },
        });
        const skills = userInfo.skills.map((skill) => {
          return skill.id;
        });
        userInfo = {
          ...userInfo,
          skills: skills,
          birthday: userInfo.birthday?.toLocaleDateString('ru-RU'),
        };
        res.json(userInfo);
        return;
      }
      res.json(null);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
