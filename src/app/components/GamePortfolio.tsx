import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Download } from 'lucide-react';
import { generatePortfolioPDF } from '../utils/pdfGenerator';

// Import game screenshots
import errorEcho1 from 'figma:asset/42d78137668fb5807902ca6a36fe70f2c717c026.png';
import errorEcho2 from 'figma:asset/048f7056cd05afab27959bdeb5a48df9ffd938e5.png';
import pretendedCollector1 from 'figma:asset/d8afdb14cd1db7230537aeedb2de483ed0039186.png';
import pretendedCollector2 from 'figma:asset/8f102d9fdcadc4b30646724e652a9019b71ebe28.png';
import controllerLiberator from 'figma:asset/eb9b07809eef3701f3bd6b456f3922b17902bbf2.png';
import controllerLiberator2 from 'figma:asset/39250fe6db51a9cd987d2ea51bfdeab407d3114c.png';
import punchball2 from 'figma:asset/28efbc61130f103612c7a10be3592ece06e384b6.png';
import oldIron1 from '../../imports/image-1.png';
import oldIron2 from '../../imports/image.png';
import valleyDesign1 from '../../imports/____.png';
import valleyDesign2 from '../../imports/________.png';

const valleyBg = 'https://images.unsplash.com/photo-1764686619734-6ddc43a3e3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080';

interface GameProject {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  role: string;
  links: { label: string; url: string }[];
  images: string[];
  tags?: string[];
}

const projects: GameProject[] = [
  {
    id: 1,
    title: 'Error Echo',
    subtitle: 'TapTap聚光灯 Game Jam',
    description: [
      '《Error Echo》是一款叙事向冒险游戏。',
      '你将化身在实验中意外觉醒自我意识的职员，在崩坏的系统与被篡改的现实中追寻真相。',
      '破解监控、释放收容、逃离追击、唤醒他人——每一次抉择都将改写未来，也在消耗你的存在。',
      '当真相浮现，你会选择独自存活，还是让所有人重启希望？\n"错误正在回响，而你，或许是最后的漏洞。"',
    ],
    role: '程序 + 策划',
    links: [
      { label: 'TapTap 链接（含视频）', url: 'https://www.taptap.cn/app/776791?os=pc' },
    ],
    images: [errorEcho1, errorEcho2],
    tags: ['2D平台', '叙事驱动', 'Game Jam'],
  },
  {
    id: 2,
    title: 'Pretended Collector',
    subtitle: '2026 GGJ HK站点',
    description: [
      '《Pretended Collector》是一款独特的生态模拟策略潜行游戏。在这个由严密食物链构成的世界里，你唯一的武器是"信息"与"面具"。',
      '扫描生物数据，将其制成可随时穿戴的"生物面具"，瞬间继承该生物在生态圈中的身份。',
      '面具会触发实时的连锁反应——弱小生物因恐惧逃窜，掠食者则视你为死敌展开追杀。利用生态法则，完成一场场惊心动魄的标本收集。',
    ],
    role: '程序 + 策划',
    links: [
      { label: 'GGJ官网链接（含视频）', url: 'https://globalgamejam.org/games/2026/prentened-collector-8' },
      { label: '演示视频', url: 'https://www.xiaohongshu.com/discovery/item/697f4b9b000000000b008e84?source=webshare&xhsshare=pc_web&xsec_token=AB0I2ClECqnH5W7ALEka9FlgdOB3ZpF_ZcWhi8-gDlyKA=&xsec_source=pc_share' },
    ],
    images: [pretendedCollector1, pretendedCollector2],
    tags: ['俯视角', '解密', 'Global Game Jam'],
  },
  {
    id: 3,
    title: 'Controller Liberator',
    subtitle: '基于手势的游戏控制器',
    description: [
      'Controller Liberator 是一个基于手势的游戏控制器,它使用计算机视觉和姿态检测技术将你的身体动作转换为游戏控制。',
      '通过利用 MediaPipe 的姿态估计,这个应用程序允许你通过摄像头捕获的手势和身体姿势来控制赛车游戏(或其他兼容游戏)。',
      '该系统提供实时视觉反馈,带有透明叠加窗口,显示你检测到的手部位置和当前控制状态(转向、油门、刹车)。',
    ],
    role: '开发',
    links: [
      { label: 'GitHub 项目链接', url: 'https://github.com/Rostave/controller-liberator/blob/main/README_zh-CN.md' },
    ],
    images: [controllerLiberator, controllerLiberator2],
    tags: ['计算机视觉', 'MediaPipe', '手势控制'],
  },
  {
    id: 4,
    title: 'Punchball 2D',
    subtitle: '俯视角双人竞技游戏',
    description: [
      '《Punchball 2D》是一款简单的俯视角双人竞技游戏，目标是通过将球击入对手的球门来得分。',
      '此外，玩家还可以攻击对方，以阻止对手得分。',
      '游戏中所有的美术作品均由我独立设计并创作。玩家可以通过击打球或对手来得分，率先达到 13 分的玩家获胜。',
    ],
    role: '独立完成',
    links: [
      { label: 'Itch.io 链接', url: 'https://flamberge-backtrace.itch.io/punchball' },
      { label: '视频演示', url: 'https://www.bilibili.com/video/BV1Qoo9YXExB/?spm_id_from=333.1387.homepage.video_card.click' },
    ],
    images: [punchball2, punchball2],
    tags: ['俯视角', 'PvP', '双人对战'],
  },
  {
    id: 5,
    title: '山谷遗迹',
    subtitle: '3D关卡白盒设计',
    description: [
      '《山谷遗迹》是一个以19世纪西部寻宝潮为背景的3D第三人称动作冒险游戏关卡白盒设计，玩家扮演宝藏猎人深入险峻山谷中的古老遗迹，寻找传说中的宝藏。',
      '关卡共分12个区域，以完整叙事节奏贯穿移动教学、潜行战斗、平台跑酷、古墓解谜到守护石像Boss战，每段均设计了对应的玩法机制与环境叙事。',
      'Boss战以三祭坛供能机制为核心——玩家需在躲避石像破坏攻击、处理增援杂兵的同时，完成跑酷并依次关闭三个祭坛，最终夺取宝石并乘直升机撤离。',
    ],
    role: '关卡设计',
    links: [
      { label: '设计文档', url: 'https://ycns3uy7khlx.feishu.cn/drive/folder/FcLPfGpCMlUNsgd6wjScb5Jwn3f' },
      { label: '视频演示', url: 'https://www.bilibili.com/video/BV1PcG96xEyt/?spm_id_from=333.1387.homepage.video_card.click' },
    ],
    images: [valleyBg, valleyDesign1, valleyDesign2],
    tags: ['关卡设计', '白盒设计', '3D冒险', 'Boss战', '叙事设计'],
  },
  {
    id: 6,
    title: 'Old Iron',
    subtitle: 'AI多媒体IP项目',
    description: [
      'Old Iron是一个创新的AI多媒体IP项目，融合了多种前沿AI技术进行内容创作。',
      '项目使用ComfyUI和Kling制作AI视频内容，呈现独特的视觉风格和叙事体验。',
      '同时结合Claude Desktop与MCP for Unity，实现了从概念到成品的全流程AI辅助开发，打造了一款2D俯视角双摇杆射击游戏，展示了AI在游戏开发中的应用潜力。',
    ],
    role: 'ComfyUI Workflow制作和AI游戏开发',
    links: [
      { label: 'GitHub 项目链接（含视频、游戏demo和工作流）', url: 'https://github.com/wannabeAundead/OldIron' },
    ],
    images: [oldIron1, oldIron2],
    tags: ['AI生成', 'ComfyUI', 'Kling', 'Claude MCP', '俯视角'],
  },
];

export function GamePortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  useState(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  });

  const currentProject = projects[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-900/50 to-black/80 z-0" />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 z-10"
        >
          <div className="w-full h-full flex items-center justify-center p-0 md:p-16">
            {/* Container - Desktop: 16:9, Mobile: Full height portrait */}
            <div className="relative w-full h-full md:h-auto md:max-w-7xl md:aspect-video bg-black/40 backdrop-blur-sm md:rounded-2xl shadow-2xl md:border border-white/10 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                {currentProject.images[0] ? (
                  <img
                    src={currentProject.images[0]}
                    alt={currentProject.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/60 to-black/20 md:from-black/80 md:via-black/60 md:to-transparent" />
              </div>

              {/* Content - Desktop Layout */}
              {currentProject.id === 4 ? (
                /* Project 4: wide text left, 16:9 image right */
                <div className="hidden md:flex relative z-10 h-full flex-row">
                  {/* Left: wide text column */}
                  <div className="flex-1 px-12 pt-16 pb-10 flex flex-col justify-between">
                    <div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5">
                        <div className="text-sm text-blue-400 mb-2 tracking-wider uppercase">{currentProject.subtitle}</div>
                        <h1 className="text-5xl text-white tracking-tight mb-4">{currentProject.title}</h1>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">{tag}</span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3 mb-5">
                        {currentProject.description.map((p, i) => (
                          <p key={i} className="text-gray-300 text-sm leading-relaxed">{p}</p>
                        ))}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <span className="text-gray-400 text-sm">项目担任：</span>
                        <span className="text-white text-sm ml-2">{currentProject.role}</span>
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
                      {currentProject.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                          {link.url.includes('github.com') ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                          <span className="group-hover:underline text-sm">{link.label}</span>
                        </a>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right: image with locked 16:9 ratio, centered and smaller */}
                  <div className="w-[45%] flex items-center justify-center p-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 }}
                      className="w-full cursor-zoom-in group relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                      style={{ aspectRatio: '16/9' }}
                      onClick={() => setLightboxSrc(currentProject.images[1] || currentProject.images[0])}
                    >
                      <img
                        src={currentProject.images[1] || currentProject.images[0]}
                        alt={currentProject.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 rounded-full px-3 py-1 text-xs">点击放大</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* Default layout: left info, right image */
                <div className="hidden md:flex relative z-10 h-full flex-row">
                  {/* Left side - Info */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                    {/* Header */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <div className="text-sm text-blue-400 mb-2 tracking-wider uppercase">
                          {currentProject.subtitle}
                        </div>
                        <h1 className="text-4xl md:text-6xl mb-4 text-white tracking-tight">
                          {currentProject.title}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentProject.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3 mb-6"
                      >
                        {currentProject.description.map((paragraph, i) => (
                          <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </motion.div>

                      {/* Role */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                      >
                        <span className="text-gray-400 text-sm">项目担任：</span>
                        <span className="text-white ml-2">{currentProject.role}</span>
                      </motion.div>
                    </div>

                    {/* Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3"
                    >
                      {currentProject.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                        >
                          {link.url.includes('github.com') ? (
                            <Github className="w-4 h-4" />
                          ) : (
                            <ExternalLink className="w-4 h-4" />
                          )}
                          <span className="group-hover:underline text-sm">{link.label}</span>
                        </a>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right side - Image preview */}
                  <div className="w-2/5 relative">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      {currentProject.images[2] ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-col gap-3 w-full h-full"
                        >
                          <div
                            className="flex-1 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 cursor-zoom-in group relative"
                            onClick={() => setLightboxSrc(currentProject.images[1])}
                          >
                            <img
                              src={currentProject.images[1]}
                              alt={`${currentProject.title} 1`}
                              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 rounded-full px-3 py-1 text-xs">点击放大</span>
                            </div>
                          </div>
                          <div
                            className="flex-1 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 cursor-zoom-in group relative"
                            onClick={() => setLightboxSrc(currentProject.images[2])}
                          >
                            <img
                              src={currentProject.images[2]}
                              alt={`${currentProject.title} 2`}
                              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 rounded-full px-3 py-1 text-xs">点击放大</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-white/20"
                        >
                          {(currentProject.images[1] || currentProject.images[0]) ? (
                            <img
                              src={currentProject.images[1] || currentProject.images[0]}
                              alt={currentProject.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                              <div className="text-center text-slate-400">
                                <div className="text-6xl mb-4">🎮</div>
                                <div className="text-sm">图片即将添加</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Content - Mobile Layout */}
              <div className="md:hidden relative z-10 h-full flex flex-col overflow-y-auto">
                <div className="flex-1 px-12 py-6 flex flex-col">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <div className="text-xs text-blue-400 mb-1 tracking-wider uppercase">
                      {currentProject.subtitle}
                    </div>
                    <h1 className="text-2xl mb-3 text-white tracking-tight">
                      {currentProject.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentProject.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Mobile Image Preview */}
                  {currentProject.images[2] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-4 flex flex-col gap-2"
                    >
                      <div className="rounded-lg overflow-hidden shadow-xl border border-white/20 cursor-zoom-in" onClick={() => setLightboxSrc(currentProject.images[1])}>
                        <img src={currentProject.images[1]} alt={`${currentProject.title} 1`} className="w-full aspect-video object-cover object-center" />
                      </div>
                      <div className="rounded-lg overflow-hidden shadow-xl border border-white/20 cursor-zoom-in" onClick={() => setLightboxSrc(currentProject.images[2])}>
                        <img src={currentProject.images[2]} alt={`${currentProject.title} 2`} className="w-full aspect-video object-cover object-center" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-4 rounded-lg overflow-hidden shadow-xl border border-white/20"
                    >
                      {(currentProject.images[1] || currentProject.images[0]) ? (
                        <img
                          src={currentProject.images[1] || currentProject.images[0]}
                          alt={currentProject.title}
                          className={`w-full aspect-video ${currentProject.id === 4 ? 'object-contain' : 'object-cover'}`}
                        />
                      ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                          <div className="text-center text-slate-400">
                            <div className="text-4xl mb-2">🎮</div>
                            <div className="text-xs">图片即将添加</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2 mb-4"
                  >
                    {currentProject.description.map((paragraph, i) => (
                      <p key={i} className="text-gray-300 text-xs leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>

                  {/* Role */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-4"
                  >
                    <span className="text-gray-400 text-xs">项目担任：</span>
                    <span className="text-white text-xs ml-2">{currentProject.role}</span>
                  </motion.div>

                  {/* Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2 pb-20"
                  >
                    {currentProject.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {link.url.includes('github.com') ? (
                          <Github className="w-3 h-3" />
                        ) : (
                          <ExternalLink className="w-3 h-3" />
                        )}
                        <span className="text-xs">{link.label}</span>
                      </a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 md:bg-white/10 md:hover:bg-white/20 md:backdrop-blur-sm md:border md:border-white/20 text-white p-2 md:p-4 md:rounded-full transition-all hover:scale-110"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-8 h-8 md:w-8 md:h-8 drop-shadow-lg" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 md:bg-white/10 md:hover:bg-white/20 md:backdrop-blur-sm md:border md:border-white/20 text-white p-2 md:p-4 md:rounded-full transition-all hover:scale-110"
        aria-label="Next project"
      >
        <ChevronRight className="w-8 h-8 md:w-8 md:h-8 drop-shadow-lg" />
      </button>

      {/* Page indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              i === currentIndex ? 'bg-white w-8 md:w-12' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Project counter */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20 text-white/60 text-sm md:text-base">
        <span className="text-white text-lg md:text-2xl">{currentIndex + 1}</span> / {projects.length}
      </div>

      {/* Additional info footer */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20 text-white/60 text-xs md:text-sm">
        <p>其他项目可访问：</p>
        <a
          href="https://flamberge-backtrace.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 hover:underline"
        >
          Itch.io
        </a>
        {' · '}
        <a
          href="https://space.bilibili.com/39686351"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 hover:underline"
        >
          Bilibili
        </a>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={() => generatePortfolioPDF(projects)}
        className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all hover:scale-105"
        aria-label="Download PDF"
      >
        <Download className="w-4 h-4 md:w-5 md:h-5" />
        <span className="text-xs md:text-sm">下载PDF</span>
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxSrc}
                alt="放大预览"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                onClick={() => setLightboxSrc(null)}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white flex items-center justify-center transition-colors"
                aria-label="关闭"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
