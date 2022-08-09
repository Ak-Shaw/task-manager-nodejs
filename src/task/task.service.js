/* eslint-disable operator-linebreak */
/* eslint-disable indent */
// eslint-disable-next-line no-unused-vars
const createError = require('http-errors');
const generateId = require('../common/helpers/generateId');
const Task = require('./entity/task.entity');

const tasks = [];

module.exports = {
  createTask: (createTaskDto) => {
    const task = new Task(
      generateId(),
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.deadline,
      createTaskDto.notes || [],
      false,
    );
    tasks.push(task);
    return task;
  },

  getTasks: () => {
    return tasks;
  },

  getTask: (taskId) => {
    return tasks.find((task) => task.id === parseInt(taskId));
  },

  updateTask: (taskId, updateTaskDto) => {
    const task = tasks.find((task) => task.id === parseInt(taskId));
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    for (const key in updateTaskDto) {
      if (Object.prototype.hasOwnProperty.call(updateTaskDto, key)) {
        task[key] = updateTaskDto[key];
      }
    }
    return task;
  },
};
