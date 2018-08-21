// tab 分类内容
var faker = require('faker/locale/zh_CN');

function generateTabList () {
	
	let tabList = [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
			let id = faker.random.uuid();
			let code = faker.random.uuid();
			let title = faker.name.lastName();
			let subtitle = faker.name.jobTitle();
			let icon = 'https://gw.alipayobjects.com/zos/rmsportal/KUmyjoMxFFbjEdjiIWOw.png';
			let recommend = 0;
			return {
				id,
				code,
				title,
				subtitle,
				icon,
				recommend,
				subCatalogs: [

// {
// 	"id": "100",
// 	"code": "s100",
// 	"title": faker.name.lastName(),
// 	"subtitle": faker.name.jobTitle(),
// 	"icon": "https://gw.alipayobjects.com/zos/rmsportal/KUmyjoMxFFbjEdjiIWOw.png",
// 	"recommend": 0
// }, {
// 	"id": "101",
// 		"code": "s200",
// 		"title": faker.name.lastName(),
// 		"subtitle": faker.name.jobTitle(),
// 		"icon": "https://gw.alipayobjects.com/zos/rmsportal/KUmyjoMxFFbjEdjiIWOw.png",
// 		"recommend": 0
// }
				]
			}
	})
	return { tabList }
}

module.exports = generateTabList

