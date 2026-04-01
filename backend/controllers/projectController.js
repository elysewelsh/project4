import Project from '../models/Project.js'
import Task from '../models/Task.js'

const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find(
        {user: { $eq: req.user._id}})
        .populate('user')
    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('user');
    if (req.user._id != project.user._id) {
        return res.status(403).json({ message: 'User forbidden from viewing this project!' });
    }
    if (!project) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    res.json(project);
  } catch (err) {
    let errorName = err.name;
    if (errorName = "CastError") {
        return res.status(500).json({ message: 'Project ID in improper format!' })
    }
    res.status(500).json(err.name);
  }
}

const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      user: req.user._id
    });
    // console.log("New Project:" + project)
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json(err);
  }
}

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'});
    if (req.user._id != project.user._id) {
        return res.status(403).json({ message: 'User forbidden from updating this project' });
    }
    if (!project) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteProject = async (req, res) => {
  try {
    const parentProject = await Project.findById(req.params.id);
    if (!parentProject) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    if (req.user._id != parentProject.user._id) {
        return res.status(403).json({ message: 'User forbidden from deleting this project' });
    }
    // const tasks = await Task.find({
    //     project: {$eq: req.params.id}
    // })
    // console.log(tasks);
    const deleteProject = await Project.findByIdAndDelete(req.params.id);
    const deleteTasks = await Task.deleteMany({ project: { $eq: req.params.id}});
    res.json({ message: `Project ID ${deleteProject._id} deleted! ${deleteTasks.deletedCount} task(s) deleted as well` });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
}

export default {
    getUserProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}