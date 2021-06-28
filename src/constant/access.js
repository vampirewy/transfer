export default [
  {
    name: '首页', // 模块
    access: 'home',
  },
  {
    name: '工作台',
    access: 'workspace',
    child: [
      {
        name: '我的任务',
        access: 'my_task',
      },
      {
        name: '工作绩效统计',
        access: 'work_statistics',
      },
    ],
  },
  {
    name: '客户管理',
    access: 'customer_management',
    child: [
      {
        name: '客户池',
        access: 'customer_pool',
        child: [
          { name: '新增', access: 'customer_pool_add' },
          { name: '批量删除', access: 'customer_pool_batch_delete' },
          { name: '分配', access: 'customer_pool_distribute' },
          { name: '编辑', access: 'customer_pool_edit' },
          { name: '认领', access: 'customer_pool_claim' },
          { name: '启用/禁用', access: 'customer_pool_on_off' },
        ],
      },
      {
        name: '负责客户',
        access: 'customers',
        child: [
          { name: '新增', access: 'customers_add' },
          { name: '批量转交', access: 'customers_batch_transfer' },
          { name: '批量转入用户池', access: 'customers_batch_switch_user_pool' },
          { name: '编辑', access: 'customers_edit' },
          { name: '转交', access: 'customers_transfer' },
          { name: '查看', access: 'customers_view' },
          { name: '转入用户池', access: 'customers_switch_user_pool' },
        ],
      },
      {
        name: '单位管理',
        access: 'company_manage',
        child: [
          { name: '编辑', access: 'company_manage_edit' },
          { name: '查看', access: 'company_manage_view' },
        ],
      },
      {
        name: '类别管理',
        access: 'type_manage',
        child: [
          { name: '新增', access: 'type_manage_add' },
          { name: '批量删除', access: 'type_manage_batch_delete' },
          { name: '编辑', access: 'type_manage_edit' },
          { name: '查看', access: 'type_manage_view' },
        ],
      },
      {
        name: '效价评估',
        access: 'esuser_manageassessment',
      },
    ],
  },
  {
    name: '系统管理',
    access: 'system_manage',
    child: [
      {
        name: '员工列表',
        access: 'staff_list',
        child: [
          {
            name: '新增',
            access: 'staff_list_add',
          },
          {
            name: '编辑',
            access: 'staff_list_edit',
          },
          {
            name: '查看',
            access: 'staff_list_view',
          },
          {
            name: '启用/禁用',
            access: 'staff_list_on_off',
          },
        ],
      },
      {
        name: '角色列表',
        access: 'role_list',
        child: [
          {
            name: '新增',
            access: 'role_list_add',
          },
          {
            name: '编辑',
            access: 'role_list_edit',
          },
          {
            name: '查看',
            access: 'role_list_view',
          },
          {
            name: '删除',
            access: 'role_list_delete',
          },
        ],
      },
    ],
  },
  {
    name: '方案中心',
    access: 'plan_center',
    child: [
      {
        name: '生活方式',
        access: 'life_style',
        child: [
          {
            name: '新增',
            access: 'life_style_add',
          },
          {
            name: '批量删除',
            access: 'life_style_batch_delete',
          },
          {
            name: '编辑',
            access: 'life_style_edit',
          },
          {
            name: '查看',
            access: 'life_style_view',
          },
          {
            name: '删除',
            access: 'life_style_delete',
          },
        ],
      },
      {
        name: '干预模板',
        access: 'intervention_template',
        child: [
          {
            name: '新增',
            access: 'intervention_template_add',
          },
          {
            name: '批量删除',
            access: 'intervention_template_batch_delete',
          },
          {
            name: '编辑',
            access: 'intervention_template_edit',
          },
          {
            name: '条件配置编辑',
            access: 'intervention_template_config_edit',
          },
          {
            name: '计划编辑',
            access: 'intervention_template_plan_edit',
          },
        ],
      },
      {
        name: '运动库',
        access: 'sport_list',
        child: [
          {
            name: '新增',
            access: 'sport_list_add',
          },
          {
            name: '批量删除',
            access: 'sport_list_batch_delete',
          },
          {
            name: '编辑',
            access: 'sport_list_edit',
          },
          {
            name: '查看',
            access: 'sport_list_view',
          },
          {
            name: '删除',
            access: 'sport_list_delete',
          },
        ],
      },
    ],
  },
  {
    name: '基础数据',
    access: 'basic_data',
    child: [
      {
        name: '体检项目模板',
        access: 'physical_project_template',
        child: [
          {
            name: '新增',
            access: 'physical_project_template_add',
          },
          {
            name: '批量删除',
            access: 'physical_project_template_batch_delete',
          },
          {
            name: '编辑',
            access: 'physical_project_template_edit',
          },
          {
            name: '查看',
            access: 'physical_project_template_view',
          },
        ],
      },
      {
        name: '体检项目库',
        access: 'physical_project_list',
        child: [
          {
            name: '新增',
            access: 'physical_project_list_add',
          },
          {
            name: '批量删除',
            access: 'physical_project_list_batch_delete',
          },
          {
            name: '编辑',
            access: 'physical_project_list_edit',
          },
          {
            name: '查看',
            access: 'physical_project_list_view',
          },
          {
            name: '删除',
            access: 'physical_project_list_delete',
          },
        ],
      },
      {
        name: '异常库',
        access: 'unusual_list',
        child: [
          {
            name: '新增',
            access: 'unusual_list_add',
          },
          {
            name: '批量删除',
            access: 'unusual_list_batch_delete',
          },
          {
            name: '编辑',
            access: 'unusual_list_edit',
          },
          {
            name: '查看',
            access: 'unusual_list_view',
          },
        ],
      },
      {
        name: '项目匹配',
        access: 'project_list',
        child: [
          {
            name: '匹配',
            access: 'project_list_match',
          },
        ],
      },
    ],
  },
  {
    name: '服务管理',
    access: 'service_management',
    child: [
      {
        name: '服务订单',
        access: 'service_order',
        child: [
          {
            name: '新增',
            access: 'service_order_add',
          },
          {
            name: '批量删除',
            access: 'service_order_batch_delete',
          },
          {
            name: '操作',
            access: 'service_order_edit',
          },
          {
            name: '查看',
            access: 'service_order_view',
          },
        ],
      },
      {
        name: '我的服务',
        access: 'my_service',
        child: [
          {
            name: '新增',
            access: 'my_service_add',
          },
          {
            name: '批量删除',
            access: 'my_service_batch_delete',
          },
          {
            name: '编辑',
            access: 'my_service_edit',
          },
          {
            name: '查看',
            access: 'my_service_view',
          },
          {
            name: '启用/禁用',
            access: 'my_service_on_off',
          },
        ],
      },
    ],
  },
  {
    name: '档案管理',
    access: 'archives_manage',
    child: [
      {
        name: '体检报告',
        access: 'physical_examination_report',
        child: [
          {
            name: '新增',
            access: 'physical_examination_report_add',
          },
          {
            name: '批量删除',
            access: 'physical_examination_report_batch_delete',
          },
          {
            name: '编辑',
            access: 'physical_examination_report_edit',
          },
          {
            name: '查看',
            access: 'physical_examination_report_view',
          },
          {
            name: '删除',
            access: 'physical_examination_report_delete',
          },
        ],
      },
      {
        name: '健康问卷',
        access: 'life_style_questionnaire',
        child: [
          {
            name: '新增',
            access: 'health_questionnaire_add',
          },
          {
            name: '批量删除',
            access: 'health_questionnaire_batch_delete',
          },
          {
            name: '编辑',
            access: 'health_questionnaire_edit',
          },
          {
            name: '查看',
            access: 'health_questionnaire_view',
          },
        ],
      },
      {
        name: '就医历史',
        access: 'medical_history',
        child: [
          {
            name: '新增',
            access: 'medical_history_add',
          },
          {
            name: '批量删除',
            access: 'medical_history_batch_delete',
          },
          {
            name: '编辑',
            access: 'medical_history_edit',
          },
          {
            name: '查看',
            access: 'medical_history_view',
          },
          {
            name: '删除',
            access: 'medical_history_delete',
          },
        ],
      },
      {
        name: '用药历史',
        access: 'medication_history',
        child: [
          {
            name: '新增',
            access: 'medication_history_add',
          },
          {
            name: '批量删除',
            access: 'medication_history_batch_delete',
          },
          {
            name: '编辑',
            access: 'medication_history_edit',
          },
          {
            name: '查看',
            access: 'medication_history_view',
          },
          {
            name: '删除',
            access: 'medication_history_delete',
          },
        ],
      },
      {
        name: '健康监测',
        access: 'health_monitor',
        child: [
          {
            name: '趋势查看',
            access: 'health_monitor_trend_view',
          },
        ],
      },
    ],
  },
  {
    name: '评估报告',
    access: 'assessment_report',
    child: [
      {
        name: '点评',
        access: 'assessment_report_comment',
      },
      {
        name: '生成报告',
        access: 'assessment_report_generate',
      },
    ],
  },
  {
    name: '健管计划',
    access: 'health_management_plan',
    child: [
      {
        name: '干预方案',
        access: 'intervention_plan',
        child: [
          {
            name: '新增',
            access: 'intervention_plan_add',
          },
          {
            name: '批量删除',
            access: 'intervention_plan_batch_delete',
          },
          {
            name: '编辑',
            access: 'intervention_plan_edit',
          },
          {
            name: '查看',
            access: 'intervention_plan_view',
          },
          {
            name: '删除',
            access: 'intervention_plan_delete',
          },
        ],
      },
      {
        name: '创建计划',
        access: 'create_plan',
        child: [
          {
            name: '人工精准创建',
            access: 'create_plan_personal_create',
          },
          {
            name: '批量创建',
            access: 'create_plan_batch_create',
          },
        ],
      },
      {
        name: '待随访计划',
        access: 'wait_visit_plan',
        child: [
          {
            name: '批量删除',
            access: 'wait_visit_plan_batch_delete',
          },
          {
            name: '编辑',
            access: 'wait_visit_plan_edit',
          },
          {
            name: '执行',
            access: 'wait_visit_plan_exec',
          },
        ],
      },
      {
        name: '随访记录',
        access: 'visited_record',
        child: [
          {
            name: '批量删除',
            access: 'visited_record_batch_delete',
          },
          {
            name: '查看',
            access: 'visited_record_view',
          },
        ],
      },
      {
        name: '随访问卷',
        access: 'visited_questionaire',
        child: [
          {
            name: '新增',
            access: 'visited_questionaire_add',
          },
          {
            name: '批量删除',
            access: 'visited_questionaire_batch_delete',
          },
          {
            name: '编辑',
            access: 'visited_questionaire_edit',
          },
          {
            name: '查看',
            access: 'visited_questionaire_view',
          },
        ],
      },
    ],
  },
];
