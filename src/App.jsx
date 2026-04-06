import React, { useState } from 'react';

// 测试题目数据
const questions = [
  {
    id: 1,
    question: '你更喜欢哪种天气？',
    options: [
      { text: '阳光明媚，温暖舒适', score: { warm: 3, active: 2 } },
      { text: '细雨绵绵，凉爽湿润', score: { calm: 3, creative: 2 } },
      { text: '雪花飞舞，银装素裹', score: { calm: 2, introvert: 3 } },
      { text: '微风习习，秋高气爽', score: { balanced: 3, calm: 2 } }
    ]
  },
  {
    id: 2,
    question: '周末你通常会怎么度过？',
    options: [
      { text: '和朋友聚会，参加社交活动', score: { active: 3, social: 3 } },
      { text: '在家看书、看电影，享受独处时光', score: { introvert: 3, calm: 2 } },
      { text: '探索城市的新地方，寻找美食', score: { active: 2, curious: 3 } },
      { text: '运动、健身，保持活力', score: { active: 3, balanced: 2 } }
    ]
  },
  {
    id: 3,
    question: '你更喜欢哪种建筑风格？',
    options: [
      { text: '现代简约，线条流畅', score: { modern: 3, clean: 2 } },
      { text: '古典优雅，历史感浓厚', score: { traditional: 3, cultural: 2 } },
      { text: '自然生态，与环境融合', score: { natural: 3, calm: 2 } },
      { text: '创意十足，独特设计', score: { creative: 3, modern: 2 } }
    ]
  },
  {
    id: 4,
    question: '你理想的工作环境是？',
    options: [
      { text: '快节奏，充满挑战', score: { active: 3, ambitious: 2 } },
      { text: '稳定舒适，有规律', score: { calm: 3, balanced: 2 } },
      { text: '创意空间，自由发挥', score: { creative: 3, free: 2 } },
      { text: '团队合作，充满活力', score: { social: 3, active: 2 } }
    ]
  },
  {
    id: 5,
    question: '你更喜欢哪种旅行方式？',
    options: [
      { text: '背包客，自由探索', score: { adventurous: 3, curious: 2 } },
      { text: '豪华度假，享受舒适', score: { comfortable: 3, relaxed: 2 } },
      { text: '文化之旅，了解历史', score: { cultural: 3, curious: 2 } },
      { text: '自然探索，亲近大自然', score: { natural: 3, calm: 2 } }
    ]
  },
  {
    id: 6,
    question: '你如何看待社交生活？',
    options: [
      { text: '越多越好，喜欢热闹', score: { social: 3, active: 2 } },
      { text: '质量胜于数量，深交几个朋友', score: { introvert: 2, deep: 3 } },
      { text: '适度社交，保持平衡', score: { balanced: 3, social: 2 } },
      { text: '更倾向于独处，享受个人空间', score: { introvert: 3, calm: 2 } }
    ]
  },
  {
    id: 7,
    question: '你更喜欢哪种音乐风格？',
    options: [
      { text: '流行音乐，节奏明快', score: { active: 3, modern: 2 } },
      { text: '古典音乐，优雅庄重', score: { calm: 3, traditional: 2 } },
      { text: '摇滚乐，充满激情', score: { active: 3, adventurous: 2 } },
      { text: '轻音乐，舒缓放松', score: { calm: 3, relaxed: 2 } }
    ]
  },
  {
    id: 8,
    question: '你理想的居住环境是？',
    options: [
      { text: '繁华都市，便利快捷', score: { active: 3, modern: 2 } },
      { text: '宁静小镇，慢节奏生活', score: { calm: 3, traditional: 2 } },
      { text: '海边别墅，面朝大海', score: { relaxed: 3, natural: 2 } },
      { text: '山间小屋，亲近自然', score: { natural: 3, calm: 2 } }
    ]
  },
  {
    id: 9,
    question: '你如何处理压力？',
    options: [
      { text: '运动锻炼，释放压力', score: { active: 3, balanced: 2 } },
      { text: '冥想放松，调整心态', score: { calm: 3, balanced: 2 } },
      { text: '与朋友倾诉，寻求支持', score: { social: 3, balanced: 2 } },
      { text: '投入工作，转移注意力', score: { ambitious: 3, active: 2 } }
    ]
  },
  {
    id: 10,
    question: '你更喜欢哪种颜色？',
    options: [
      { text: '明亮的红色、橙色', score: { active: 3, warm: 2 } },
      { text: '清新的蓝色、绿色', score: { calm: 3, natural: 2 } },
      { text: '优雅的紫色、金色', score: { creative: 3, luxurious: 2 } },
      { text: '简约的白色、灰色', score: { calm: 2, clean: 3 } }
    ]
  },
  {
    id: 11,
    question: '你理想的约会方式是？',
    options: [
      { text: '烛光晚餐，浪漫氛围', score: { romantic: 3, luxurious: 2 } },
      { text: '户外活动，共同探索', score: { active: 3, adventurous: 2 } },
      { text: '在家做饭，温馨舒适', score: { calm: 3, relaxed: 2 } },
      { text: '文化活动，增长见识', score: { cultural: 3, curious: 2 } }
    ]
  },
  {
    id: 12,
    question: '你如何看待冒险？',
    options: [
      { text: '热爱冒险，寻求刺激', score: { adventurous: 3, active: 2 } },
      { text: '谨慎对待，确保安全', score: { balanced: 3, calm: 2 } },
      { text: '偶尔尝试，保持新鲜', score: { curious: 3, balanced: 2 } },
      { text: '不太喜欢， prefer稳定', score: { calm: 3, traditional: 2 } }
    ]
  },
  {
    id: 13,
    question: '你更喜欢哪种食物？',
    options: [
      { text: '辛辣刺激，口味浓郁', score: { active: 3, adventurous: 2 } },
      { text: '清淡健康，营养均衡', score: { balanced: 3, natural: 2 } },
      { text: '精致美食，讲究品质', score: { luxurious: 3, cultural: 2 } },
      { text: '家常便饭，温暖舒适', score: { calm: 3, traditional: 2 } }
    ]
  },
  {
    id: 14,
    question: '你理想的休闲活动是？',
    options: [
      { text: '阅读书籍，增长知识', score: { introvert: 3, curious: 2 } },
      { text: '观看电影，放松心情', score: { calm: 3, relaxed: 2 } },
      { text: '参加派对，尽情狂欢', score: { social: 3, active: 2 } },
      { text: '户外徒步，亲近自然', score: { natural: 3, active: 2 } }
    ]
  },
  {
    id: 15,
    question: '你如何看待财富？',
    options: [
      { text: '重要，努力追求', score: { ambitious: 3, modern: 2 } },
      { text: '够用就好，注重生活质量', score: { balanced: 3, relaxed: 2 } },
      { text: '不是最重要的，精神追求更重要', score: { introvert: 3, cultural: 2 } },
      { text: '通过努力获得，享受成果', score: { ambitious: 2, balanced: 3 } }
    ]
  },
  {
    id: 16,
    question: '你更喜欢哪种季节？',
    options: [
      { text: '春天，万物复苏', score: { warm: 3, natural: 2 } },
      { text: '夏天，活力四射', score: { active: 3, warm: 2 } },
      { text: '秋天，宁静致远', score: { calm: 3, balanced: 2 } },
      { text: '冬天，温馨浪漫', score: { calm: 2, romantic: 3 } }
    ]
  },
  {
    id: 17,
    question: '你理想的交通工具是？',
    options: [
      { text: '跑车，速度与激情', score: { active: 3, luxurious: 2 } },
      { text: '自行车，环保健康', score: { natural: 3, balanced: 2 } },
      { text: '公共交通，便捷经济', score: { balanced: 3, modern: 2 } },
      { text: '步行，欣赏沿途风景', score: { calm: 3, natural: 2 } }
    ]
  },
  {
    id: 18,
    question: '你如何看待艺术？',
    options: [
      { text: '非常喜欢，是生活的一部分', score: { creative: 3, cultural: 2 } },
      { text: '欣赏，但不深入了解', score: { curious: 2, balanced: 3 } },
      { text: '不太感兴趣，更关注实际', score: { active: 2, ambitious: 3 } },
      { text: '喜欢特定类型，有自己的品味', score: { creative: 2, cultural: 3 } }
    ]
  },
  {
    id: 19,
    question: '你理想的社交圈是？',
    options: [
      { text: '多元化，各领域的朋友', score: { social: 3, curious: 2 } },
      { text: '小而精，知心好友', score: { introvert: 2, deep: 3 } },
      { text: '志同道合，共同兴趣', score: { balanced: 3, social: 2 } },
      { text: '职场伙伴，互相支持', score: { ambitious: 3, social: 2 } }
    ]
  },
  {
    id: 20,
    question: '你如何看待时间管理？',
    options: [
      { text: '严格规划，高效利用', score: { ambitious: 3, active: 2 } },
      { text: '灵活安排，顺其自然', score: { calm: 3, relaxed: 2 } },
      { text: '有计划，但留有余地', score: { balanced: 3, calm: 2 } },
      { text: '随遇而安，享受当下', score: { relaxed: 3, introvert: 2 } }
    ]
  },
  {
    id: 21,
    question: '你更喜欢哪种动物？',
    options: [
      { text: '狮子，王者之气', score: { active: 3, ambitious: 2 } },
      { text: '猫，独立优雅', score: { introvert: 3, calm: 2 } },
      { text: '狗，忠诚友好', score: { social: 3, active: 2 } },
      { text: '熊猫，温和可爱', score: { calm: 3, relaxed: 2 } }
    ]
  },
  {
    id: 22,
    question: '你理想的教育方式是？',
    options: [
      { text: '传统教育，重视基础', score: { traditional: 3, balanced: 2 } },
      { text: '创新教育，注重实践', score: { creative: 3, modern: 2 } },
      { text: '个性化教育，因材施教', score: { balanced: 3, creative: 2 } },
      { text: '自主学习，培养兴趣', score: { curious: 3, free: 2 } }
    ]
  },
  {
    id: 23,
    question: '你如何看待科技发展？',
    options: [
      { text: '积极拥抱，引领潮流', score: { modern: 3, active: 2 } },
      { text: '谨慎接受，保持理性', score: { balanced: 3, calm: 2 } },
      { text: '不太关注，更重视传统', score: { traditional: 3, introvert: 2 } },
      { text: '适度使用，避免依赖', score: { balanced: 3, natural: 2 } }
    ]
  },
  {
    id: 24,
    question: '你理想的退休生活是？',
    options: [
      { text: '环游世界，探索未知', score: { adventurous: 3, curious: 2 } },
      { text: '回归田园，宁静度日', score: { natural: 3, calm: 2 } },
      { text: '继续工作，发挥余热', score: { ambitious: 3, active: 2 } },
      { text: '与家人共度，享受天伦之乐', score: { social: 3, calm: 2 } }
    ]
  },
  {
    id: 25,
    question: '你认为人生的意义是什么？',
    options: [
      { text: '实现自我价值，追求成功', score: { ambitious: 3, active: 2 } },
      { text: '享受生活，体验美好', score: { relaxed: 3, balanced: 2 } },
      { text: '帮助他人，贡献社会', score: { social: 3, balanced: 2 } },
      { text: '追求内心平静，精神富足', score: { introvert: 3, calm: 2 } }
    ]
  }
];

// 城市数据
const cities = [
  {
    name: '东京',
    type: ['modern', 'active', 'ambitious'],
    description: '你是一个充满活力和野心的人，喜欢快节奏的生活和先进的科技。东京的繁华与创新完美匹配你的性格。',
    features: ['现代化', '高效', '创新', '美食'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tokyo%20skyline%20with%20Mount%20Fuji%20in%20background%2C%20modern%20city%2C%20bright%20lights%2C%20professional%20photography&image_size=landscape_16_9'
  },
  {
    name: '巴黎',
    type: ['romantic', 'cultural', 'creative'],
    description: '你是一个浪漫、有创造力的人，注重生活品质和艺术修养。巴黎的优雅与文化气息与你相得益彰。',
    features: ['浪漫', '艺术', '时尚', '美食'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Paris%20Eiffel%20Tower%20at%20sunset%2C%20romantic%20cityscape%2C%20artistic%20photography&image_size=landscape_16_9'
  },
  {
    name: '丽江',
    type: ['natural', 'calm', 'traditional'],
    description: '你是一个喜欢宁静、亲近自然的人，注重传统文化和内心的平静。丽江的古朴与自然美景与你完美契合。',
    features: ['自然', '宁静', '传统文化', '慢生活'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lijiang%20ancient%20town%20with%20traditional%20Naxi%20architecture%2C%20peaceful%20river%2C%20natural%20beauty&image_size=landscape_16_9'
  },
  {
    name: '纽约',
    type: ['active', 'ambitious', 'social'],
    description: '你是一个充满活力、野心勃勃的人，喜欢多元化的社交和无限的机会。纽约的活力与多样性与你一拍即合。',
    features: ['活力', '多元', '机会', '文化'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20City%20skyline%20with%20Empire%20State%20Building%2C%20busy%20streets%2C%20dynamic%20city&image_size=landscape_16_9'
  },
  {
    name: '杭州',
    type: ['natural', 'calm', 'balanced'],
    description: '你是一个注重平衡、喜欢自然的人，追求生活与工作的和谐。杭州的西湖美景与宜居环境与你完美匹配。',
    features: ['自然', '宜居', '平衡', '文化'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hangzhou%20West%20Lake%20scenery%2C%20peaceful%20water%2C%20traditional%20pavilions%2C%20natural%20beauty&image_size=landscape_16_9'
  },
  {
    name: '巴塞罗那',
    type: ['creative', 'social', 'active'],
    description: '你是一个充满创意、善于社交的人，喜欢艺术和活力的生活方式。巴塞罗那的艺术气息与热情与你相得益彰。',
    features: ['艺术', '活力', '社交', '美食'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Barcelona%20Sagrada%20Familia%20and%20cityscape%2C%20artistic%20architecture%2C%20vibrant%20city&image_size=landscape_16_9'
  },
  {
    name: '成都',
    type: ['relaxed', 'social', 'calm'],
    description: '你是一个喜欢放松、享受生活的人，注重社交和美食。成都的悠闲与美食文化与你完美契合。',
    features: ['悠闲', '美食', '社交', '文化'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20traditional%20teahouse%20with%20pandas%2C%20relaxed%20atmosphere%2C%20cultural%20scene&image_size=landscape_16_9'
  },
  {
    name: '京都',
    type: ['traditional', 'calm', 'cultural'],
    description: '你是一个注重传统、喜欢宁静的人，对文化和历史有深厚的兴趣。京都的古典与文化底蕴与你相得益彰。',
    features: ['传统', '文化', '宁静', '历史'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kyoto%20traditional%20temple%20with%20autumn%20maple%20leaves%2C%20cultural%20heritage%2C%20peaceful%20atmosphere&image_size=landscape_16_9'
  },
  {
    name: '深圳',
    type: ['modern', 'ambitious', 'active'],
    description: '你是一个追求创新、充满野心的人，喜欢快节奏的现代生活。深圳的创新与活力与你完美匹配。',
    features: ['创新', '现代', '活力', '机会'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shenzhen%20modern%20skyline%20with%20high-tech%20buildings%2C%20futuristic%20city%2C%20dynamic%20scene&image_size=landscape_16_9'
  },
  {
    name: '大理',
    type: ['natural', 'relaxed', 'calm'],
    description: '你是一个喜欢自然、追求放松的人，注重内心的平静和生活的简单。大理的自然风光与慢生活与你相得益彰。',
    features: ['自然', '放松', '宁静', '简单'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dali%20Erhai%20Lake%20scenery%20with%20traditional%20houses%2C%20peaceful%20landscape%2C%20natural%20beauty&image_size=landscape_16_9'
  },
  {
    name: '上海',
    type: ['modern', 'social', 'ambitious'],
    description: '你是一个喜欢现代生活、善于社交的人，追求成功和多元化的体验。上海的国际化与活力与你完美匹配。',
    features: ['现代', '国际化', '社交', '机会'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20Bund%20skyline%20at%20night%2C%20modern%20cityscape%2C%20vibrant%20lights&image_size=landscape_16_9'
  },
  {
    name: '阳朔',
    type: ['natural', 'relaxed', 'creative'],
    description: '你是一个喜欢自然、富有创造力的人，追求自由和独特的生活体验。阳朔的山水美景与艺术气息与你相得益彰。',
    features: ['自然', '艺术', '放松', '独特'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yangshuo%20karst%20mountains%20and%20Li%20River%2C%20natural%20beauty%2C%20artistic%20landscape&image_size=landscape_16_9'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('intro');
  const [verificationCode, setVerificationCode] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // 验证验证码
  const handleVerify = () => {
    if (verificationCode === '2024') {
      setShowSuccess(true);
      setTimeout(() => {
        setCurrentPage('test');
      }, 1000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  // 处理答案选择
  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 计算结果
      calculateResult(newAnswers);
    }
  };

  // 计算测试结果
  const calculateResult = (userAnswers) => {
    // 计算各维度得分
    const scores = {};
    userAnswers.forEach(answer => {
      Object.entries(answer.score).forEach(([key, value]) => {
        scores[key] = (scores[key] || 0) + value;
      });
    });

    // 找出得分最高的三个维度
    const topDimensions = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => key);

    // 匹配城市
    let bestMatch = null;
    let highestScore = 0;

    cities.forEach(city => {
      let cityScore = 0;
      topDimensions.forEach(dimension => {
        if (city.type.includes(dimension)) {
          cityScore += 1;
        }
      });
      
      if (cityScore > highestScore) {
        highestScore = cityScore;
        bestMatch = city;
      }
    });

    setResult(bestMatch);
    setCurrentPage('result');
  };

  // 重新开始测试
  const handleRestart = () => {
    setCurrentPage('intro');
    setVerificationCode('');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowSuccess(false);
    setShowError(false);
  };

  // 导出结果图片
  const handleExport = () => {
    // 这里可以使用html2canvas等库实现导出功能
    alert('导出功能开发中，敬请期待！');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 介绍页面 */}
        {currentPage === 'intro' && (
          <div className="p-8 md:p-12 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">测测你的灵魂城市</h1>
              <p className="text-lg text-gray-600 mb-8">探索你的内心，找到与你灵魂最契合的城市</p>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">测试说明</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span>本测试包含25道题目，每题4个选项</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span>请根据你的真实想法选择答案</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span>测试完成后，我们将为你匹配最适合的灵魂城市</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span>结果页支持导出测试结果图片</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">请输入验证码：</label>
              <div className="flex">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="默认验证码：2024"
                />
                <button
                  onClick={handleVerify}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
                >
                  开始测试
                </button>
              </div>
              {showSuccess && (
                <div className="mt-3 text-green-600 font-medium">验证码正确，即将开始测试...</div>
              )}
              {showError && (
                <div className="mt-3 text-red-600 font-medium">验证码错误，请重新输入！</div>
              )}
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              © 2024 灵魂城市测试 | 仅供娱乐
            </div>
          </div>
        )}

        {/* 测试页面 */}
        {currentPage === 'test' && (
          <div className="p-8 md:p-12 max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">问题 {currentQuestion + 1} / {questions.length}</h2>
                <div className="w-40 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8">
                <p className="text-xl font-medium text-gray-800 mb-6">{questions[currentQuestion].question}</p>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-6 py-4 bg-white border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                    >
                      <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}. {option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 结果页面 */}
        {currentPage === 'result' && result && (
          <div className="p-8 md:p-12 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">你的灵魂城市是</h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-64 md:h-96 lg:h-[400px]">
                <img 
                  src={result.image} 
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h2 className="text-4xl md:text-5xl font-bold text-white p-6 md:p-8">{result.name}</h2>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">{result.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">城市特色</h3>
                  <div className="flex flex-wrap gap-3">
                    {result.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="px-5 py-2.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    重新测试
                  </button>
                  <button
                    onClick={handleExport}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    导出结果
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              © 2024 灵魂城市测试 | 仅供娱乐
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;