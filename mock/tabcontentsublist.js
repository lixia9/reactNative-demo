// tab 分类内容
var faker = require('faker/locale/zh_CN');

function generateList () {
	
	let list = [1, 2, 3].map((item, index) => {
		let type = 1;
		let id = faker.random.uuid();
		let code = faker.random.uuid();
		let title = faker.name.lastName();
		let subtitle = faker.name.jobTitle();
		let icon = 'https://gw.alipayobjects.com/zos/rmsportal/KUmyjoMxFFbjEdjiIWOw.png';
		let price = faker.commerce.price();
		let salePrice = faker.commerce.price();
		return {
			type,
			id,
			code,
			title,
			subtitle,
			icon,
			price,
			salePrice
		}
	})
	return { list }
}

module.exports = generateList