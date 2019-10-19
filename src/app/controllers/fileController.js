import File from '../models/File';

class FireController {
  async store(req, res) {
    // name and path: São como essas variaveis seram visualizadas
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path
    });

    return res.json(file);
  }
}

export default new FireController();

