var faker = require('faker/locale/zh_CN');

function generateCustomers () {
  var customers = []

  for (var id = 0; id < 50; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var phoneNumber = faker.phone.phoneNumberFormat()

    customers.push({
      "id": id,
      "first_name": firstName,
      "last_name": lastName,
      "phone": phoneNumber
    })
  }

  return { "customers": customers }
}

// 如果你要用json-server的话，就需要export这个生成fake data的function
module.exports = generateCustomers