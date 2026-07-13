export const Schema = z.object({
  user_origin: z.enum(['six', 'partner', 'local']).prefault('six'),
  user_codename: z.string().prefault('六号'),
  evil_points: z.coerce.number().prefault(0),
  milestone_arrived: z.boolean().prefault(true),
  milestone_joined_葛瑞丝: z.boolean().prefault(true),
  milestone_first_battle: z.boolean().prefault(true),
  milestone_met_海涅: z.boolean().prefault(false),
  milestone_温泉乡: z.boolean().prefault(false),
  milestone_海涅_转向: z.boolean().prefault(false),
  milestone_钨丝_到来: z.boolean().prefault(false),
  milestone_钨丝_暴露: z.boolean().prefault(false),
  milestone_罗素_和平: z.boolean().prefault(false),
  milestone_魔王军_分裂: z.boolean().prefault(false),
  milestone_final_battle: z.boolean().prefault(false),
  milestone_归属选择: z.boolean().prefault(false),
  date: z.coerce.number().prefault(1).transform(d => _.clamp(d, 1, 999)),
  location: z.string().prefault('王都'),
  好感度: z.object({
    爱丽丝: z.coerce.number().prefault(30).transform(v => _.clamp(v, 0, 100)),
    雪诺: z.coerce.number().prefault(20).transform(v => _.clamp(v, 0, 100)),
    萝丝: z.coerce.number().prefault(40).transform(v => _.clamp(v, 0, 100)),
    格琳: z.coerce.number().prefault(15).transform(v => _.clamp(v, 0, 100)),
    海涅: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    钨丝: z.coerce.number().prefault(25).transform(v => _.clamp(v, 0, 100))
  }).prefault({}),
  阶段: z.object({
    爱丽丝: z.enum(['初期搭档', '亲密期']).prefault('初期搭档'),
    雪诺: z.enum(['初期', '战友期', '恋爱期']).prefault('初期'),
    萝丝: z.enum(['初期', '觉醒期']).prefault('初期'),
    格琳: z.enum(['初期', '信赖期']).prefault('初期'),
    海涅: z.enum(['敌对期', '酒友期', '同居依赖期']).prefault('敌对期'),
    钨丝: z.enum(['监视期', '同化期']).prefault('监视期')
  }).prefault({})
}).prefault({
  user_origin: 'six',
  user_codename: '六号',
  evil_points: 0,
  milestone_arrived: true,
  milestone_joined_葛瑞丝: true,
  milestone_first_battle: true,
  milestone_met_海涅: false,
  milestone_温泉乡: false,
  milestone_海涅_转向: false,
  milestone_钨丝_到来: false,
  milestone_钨丝_暴露: false,
  milestone_罗素_和平: false,
  milestone_魔王军_分裂: false,
  milestone_final_battle: false,
  milestone_归属选择: false,
  date: 1,
  location: '王都',
  好感度: {
    爱丽丝: 30,
    雪诺: 20,
    萝丝: 40,
    格琳: 15,
    海涅: 0,
    钨丝: 25
  },
  阶段: {
    爱丽丝: '初期搭档',
    雪诺: '初期',
    萝丝: '初期',
    格琳: '初期',
    海涅: '敌对期',
    钨丝: '监视期'
  }
});

export type Schema = z.output<typeof Schema>;
