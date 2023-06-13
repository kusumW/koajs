// controller/controller.js
const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');


const prisma = new PrismaClient();

const findAll = async (ctx) => {
    const users = await prisma.user.findMany();
    ctx.body = { message: 'User list', data: users };
};

const create = async (ctx) => {
    const { name, email } = ctx.request.body;
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        ctx.status = httpStatus.CONFLICT;
        ctx.body = { message: 'Email already exists' };
    } else {
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        ctx.status = httpStatus.OK;
        ctx.body = { message: 'User created successfully', data: newUser };
    }
};

// Get a specific user by ID
const findOne = async (ctx) => {
    const { id } = ctx.params;
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
    if (user) {
        ctx.body = { message: 'User list', data: user };
        return user;

    } else {
        ctx.status = httpStatus.NOT_FOUND;
        ctx.body = { message: 'not found', data: {} };
    }
};


// Update a user
const update = async (ctx) => {
    const { id } = ctx.params;
    const user = await findOne(ctx);
    if (!user) {
        ctx.body = { message: 'Not found', data: {} };
    } else {
        const { name, email } = ctx.request.body;
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email },
        });
        ctx.status = httpStatus.OK;
        ctx.body = { message: 'User updated successfully', data: updatedUser };
    }
};

// Delete a user
const remove = async (ctx) => {
    const { id } = ctx.params;

    const findUser = await findOne(ctx);
    if (!findUser) {
        ctx.status = httpStatus.NOT_FOUND;
        ctx.body = { message: 'Not Found', data: {} };
    }
    else {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        ctx.status = httpStatus.OK;
        ctx.body = { message: 'User deleted successfully', data: user };
    }
};

module.exports = {
    remove,
    findAll,
    findOne,
    create,
    update
};
