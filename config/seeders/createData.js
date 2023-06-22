const faker = require('faker');
const Department = require('../../models/Department');

async function createExampleDepartments() {
  try {
    // Tạo 10 phòng ban ví dụ
    const departments = [];
    for (let i = 0; i < 10; i++) {
      const department = {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        created_at: new Date(),
        deleted_at: null,
        updated_at: new Date(),
        status: faker.random.number({ min: 1, max: 3 }),
      };
      departments.push(department);
    }

    // Tạo các bản ghi trong cơ sở dữ liệu
    await Department.bulkCreate(departments);

    console.log('Dữ liệu ví dụ phòng ban đã được tạo thành công.');
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu ví dụ:', error);
  }
}

module.exports = createExampleDepartments;
