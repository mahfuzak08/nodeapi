module.exports = (sequelize, Sequelize) => {
	const Position = sequelize.define("position", {
		name: {
			type: Sequelize.STRING
		},
		basic: {
			type: Sequelize.INTEGER
		}
	});

	return Position;
};
