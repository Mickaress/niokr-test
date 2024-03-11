const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class SkillController {
  async getAll(req, res) {
    try {
      const skills = await prisma.skill.findMany({});
      res.json(skills);
    } catch (error) {
      console.log(error);
    }
  }

  async addSkill(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SkillController();
