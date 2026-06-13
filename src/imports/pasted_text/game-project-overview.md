项目 1：Error Echo （TapTap聚光灯Gamejam）
《Error Echo》是一款叙事驱动的2D平台冒险游戏 。
 
你将扮演一名在实验中意外觉醒自我意识的员工，在崩塌的系统与被篡改的现实中追寻真相 。
 
入侵监控、释放收容物、逃避追捕、唤醒他人——你的每一个选择都将重写未来，同时也可能在消耗你的存在本身 。
项目担任：程序+策划
TapTap 链接（含视频）：https://www.taptap.cn/app/776791?os=pc










项目 2：Pretended Collector （2026 GGJ HK站点）
Pretended Collector是一款俯视角2D轻解密游戏。
 

游戏中包含一个架空星球的食物链，需要通过了解“外星动物习性”来收集指定外星动物通关，“面具”是让主角伪装成食物链的外星动物，来影响游戏里面的动物
 

项目担任：程序+策划
GGJ官网链接（含视频）：https://globalgamejam.org/games/2026/prentened-collector-8
演示视频：
https://www.xiaohongshu.com/discovery/item/697f4b9b000000000b008e84?source=webshare&xhsshare=pc_web&xsec_token=AB0I2ClECqnH5W7ALEka9FlgdOB3ZpF_ZcWhi8-gDlyKA=&xsec_source=pc_share





项目3：Controller Liberator
Controller Liberator 是一个基于手势的游戏控制器，它使用计算机视觉和姿态检测技术将你的身体动作转换为游戏控制。通过利用 MediaPipe 的姿态估计，这个应用程序允许你通过摄像头捕获的手势和身体姿势来控制赛车游戏（或其他兼容游戏）。

 

该系统提供实时视觉反馈，带有透明叠加窗口，显示你检测到的手部位置和当前控制状态（转向、油门、刹车）。它的设计理念是有趣、易用，并且可以跨多个平台工作。

该应用程序已在 Horizon4 上测试，如果没有该游戏，可以尝试提供的示例游戏！

项目链接：https://github.com/Rostave/controller-liberator/blob/main/README_zh-CN.md
👇
👇
👇
👇
👇
👇
👇












项目 4：Punchball 2D 
游戏介绍 
《Punchball 2D》是一款简单的俯视角双人竞技游戏，目标是通过将球击入对手的球门来得分 。
此外，玩家还可以攻击对方，以阻止对手得分 。
概念设计 
 
游戏中所有的美术作品均由我独立设计并创作 。
游戏场地结合了足球场和篮球场的元素，中心融合了我设计的自定义游戏图标，构成了《Punchball 2D》的主要场景 。

玩法设计
这款游戏的灵感来源于我与朋友玩《逃脱者 2》（The Escapists 2）时的经历 。
在那个专注于越狱的游戏中，我和朋友们忽略了主要目标，反而利用游戏的友军伤害系统互相攻击，乐在其中 。
这种“非任务型”的玩法非常有趣，因此我想制作一款包含玩家对战（PvP）战斗，但不将其作为首要目标的独立游戏 。
于是《Punchball》诞生了——这是一款以进球为目标，同时允许玩家互相攻击的游戏 。
玩家可以通过击打球或对手来得分，率先达到 13 分的玩家获胜 。

项目担任：独立完成
链接：https://flamberge-backtrace.itch.io/punchball 
视频演示：
https://www.bilibili.com/video/BV1Qoo9YXExB/?spm_id_from=333.1387.homepage.video_card.click








项目 5：ShotgunMan
游戏介绍 
《Shotgunman》是一款俯视角收集类游戏，玩家必须收集足够的点数以晋级下一关，同时使用散弹枪进行自卫 。

概念设计 
 
俯视角和射击机制受《热线迈阿密》（Hotline Miami）启发，而灯光设计则汲取了《阴暗森林》（Darkwood）中阴暗压抑的氛围 。

玩法设计 
玩法灵感源自我童年玩过的许多网页游戏 。小学时，我被这些简单的得分制游戏深深吸引，常因玩得太投入被父母责备 。在《Shotgunman》中，我旨在重现得分和闯关带来的简单快乐 。敌人追逐机制类似于《吃豆人》（Pac-Man），敌人会在迷宫中追捕玩家 。不过，玩家可以使用散弹枪反击，但弹药必须在地图各处搜寻 。敌人 AI 不仅会追逐和攻击，还会进行战术机动 。

技术细节 
除了用于敌人移动的 A* 寻路算法使用了预制的 Unity 插件外，游戏中的所有其他脚本均由我独立编写 。在该项目中，玩家和敌人均使用有限状态机（FSM）实现，生命值逻辑通过我创建的通用 Character 组件计算 。敌人追逐和寻路采用 A* 算法实现，可自动选择到达目标的垂直最短路径 。
 
敌人到巡逻点的 A 寻路展示*
未来计划 
玩法扩展：我计划将《Shotgunman》转型为类似《黄金矿工》的无限关卡游戏 。
玩家将计算每关所需的点数，并决定如何分配——是升级能力、购买道具，还是保留点数以减轻下一关的收集压力 。
这些 Roguelike 元素将显著提升游戏趣味性 。
更多敌人类型：我打算增加更多种类的敌人，例如低血量高移速的敌人，或会影响玩家灯光的敌人等 。
玩家成长系统：在当前的框架下，玩家属性和散弹枪性能可轻松通过脚本修改 。
我计划在此基础上构建成长系统，包括关卡后的数值升级以及主动/被动道具的获取 。

链接：https://flamberge-backtrace.itch.io/shotgunman
注：通过提供的链接，您可以下载可玩的原型和 Unity 项目文件 。
视频演示：
https://www.bilibili.com/video/BV1Qoo9YXEFc/?spm_id_from=333.1387.homepage.video_card.click



其他项目：
其他独立游戏项目和玩法设计可见我的itch.io主页与bilibili主页
Itch：Flamberge_Backtrace - itch.io
Bilibili：https://space.bilibili.com/39686351?spm_id_from=333.1007.0.0
