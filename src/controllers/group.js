import { groupDetails } from '../db/userDB';

class groupController {
  static createGroup(req, res) {
    const group = {
      id: String(groupDetails.length + 1),
      name: req.body.name,
      role: 'user',
    };
    groupDetails.push(group);
    res.status(200).json({
      status: 201,
      data: group,
      success: true,
    });
  }
}

export default groupController;
