import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { questions, cities, dimensions } from './data';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('intro');
  const [captcha, setCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [exporting, setExporting] = useState(false);

  const CORRECT_CAPTCHA = '1234';

  const handleCaptchaSubmit = () => {
    if (captcha === CORRECT_CAPTCHA) {
      setCaptchaError('');
      setCurrentPage('test');
    } else {
      setCaptchaError('验证码错误，请重试');
    }
  };

  const handleAnswer = (optionScores) => {
    const newAnswers = [...answers, optionScores];
    setAnswers(newAnswers);

    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    const cityScores = cities.map(city => {
      let totalScore = 0;
      city.dominantScores.forEach(dimension => {
        totalScore += finalScores[dimension] || 0;
      });
      return { ...city, totalScore };
    });

    cityScores.sort((a, b) => b.totalScore - a.totalScore);
    setResult(cityScores[0]);
    setCurrentPage('result');
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const element = document.getElementById('result-card');
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `我的灵魂城市 - ${result.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('导出失败:', error);
    }
    setExporting(false);
  };

  const restartTest = () => {
    setCurrentPage('intro');
    setCaptcha('');
    setCaptchaError('');
    setCurrentQuestion(0);
    setAnswers([]);
    setScores({});
    setResult(null);
  };

  const getSortedDimensions = () => {
    return dimensions
      .map(dim => ({ ...dim, score: scores[dim.key] || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {currentPage === 'intro' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌆</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                测测你的灵魂城市
              </h1>
              <p className="text-gray-600">发现与你灵魂最契合的城市</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">测试说明</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>共25道选择题，每题4个选项</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>根据你的真实想法选择</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>完成后获取专属灵魂城市</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                请输入验证码开始测试
              </label>
              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCaptchaSubmit()}
                placeholder="请输入验证码"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
              {captchaError && (
                <p className="text-red-500 text-sm mt-2">{captchaError}</p>
              )}
            </div>

            <button
              onClick={handleCaptchaSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              开始测试
            </button>
          </div>
        </div>
      )}

      {currentPage === 'test' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>进度</span>
                <span>{currentQuestion + 1} / {questions.length}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.scores)}
                  className="w-full text-left px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 rounded-xl border-2 border-transparent hover:border-indigo-300 transition-all transform hover:scale-102 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm group-hover:scale-110 transition">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'result' && result && (
        <div className="min-h-screen p-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div
              id="result-card"
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${result.color} p-8 text-white text-center`}>
                <div className="text-5xl mb-4">✨</div>
                <h2 className="text-lg opacity-90 mb-2">你的灵魂城市是</h2>
                <h1 className="text-4xl font-bold mb-2">{result.name}</h1>
                <p className="text-lg opacity-90">{result.subtitle}</p>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span>💫</span> 城市特质
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{result.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span>🎯</span> 你的性格标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📊</span> 性格维度分析
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {getSortedDimensions().map((dim, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-center"
                      >
                        <div className="text-2xl mb-2">{dim.icon}</div>
                        <div className="font-medium text-gray-800">{dim.label}</div>
                        <div className="text-sm text-gray-500">
                          {dim.score > 8 ? '极高' : dim.score > 5 ? '较高' : '一般'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="text-center text-gray-500 text-sm">
                    <p>测试完成时间: {new Date().toLocaleDateString('zh-CN')}</p>
                    <p className="mt-1">© 测测你的灵魂城市</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting ? '导出中...' : '📥 保存结果图片'}
              </button>
              <button
                onClick={restartTest}
                className="flex-1 bg-white border-2 border-indigo-500 text-indigo-600 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105"
              >
                🔄 重新测试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
