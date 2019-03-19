import { groupDetails } from '../db/userDB';

class groupController {
  static createGroup(req, res) {
    const group = {
      id: String(groupDetails.length + 1),
      name: req.body.name,
      role: 'user',
    };
    groupDetails.push(group);
    res.status(201).json({
      status: 201,
      data: group,
      success: true,
    });
  }

  static fetchGroups(req, res) {
    res.status(200).json({
      status: 200,
      data: groupDetails,
      success: true,
    });
  }

  static fetchGroup(req, res) {
    const { id } = req.params;
    const groupId = groupDetails.filter(group => group.id === id);
    if (!id) {
      res.status(404).json({
        success: false,
        message: 'Group not found',
      });
    } else {
      res.status(200).json({
        message: 'Group successfully retrieved',
        status: 200,
        data: groupId,
        success: true,
      });
    }
  }
}

export default groupController;
