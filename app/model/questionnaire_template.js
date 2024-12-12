// 问卷模板表
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const QuestionnaireTemplate = app.model.define('questionnaire_template', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(100),
    description: TEXT,
    status: INTEGER, // 0: 禁用, 1: 启用
    created_at: DATE,
    updated_at: DATE,
  });

  QuestionnaireTemplate.associate = function() {
    // 与问题模板的一对多关系
    app.model.QuestionnaireTemplate.hasMany(app.model.QuestionTemplate, {
      foreignKey: 'questionnaire_id',
      as: 'questions',
    });

    // 与用户问卷的一对多关系
    app.model.QuestionnaireTemplate.hasMany(app.model.UserQuestionnaire, {
      foreignKey: 'template_id',
    });
  };
  QuestionnaireTemplate.sync({ force: false }) // force: false 确保不会删除表
    .then(() => {
      console.log('QuestionnaireTemplate 表已同步');
    })
    .catch(err => {
      console.error('同步 QuestionnaireTemplate 表失败:', err);
    });

  return QuestionnaireTemplate;
};