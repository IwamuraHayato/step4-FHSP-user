// src/data/questDummy.ts

export const familyMembers = [
    { name: 'はせ', role: '父', steps: 5600 },
    { name: 'もりぃ', role: '母', steps: 5200 },
    { name: 'えご', role: '長女', steps: 4800 },
    { name: 'いわむ', role: '長男', steps: 4200 },
    { name: 'りじちょー', role: '次男', steps: 3310 },
  ];
  
  export const totalFamilySteps = familyMembers.reduce((sum, member) => sum + member.steps, 0);
  
  export const mySteps = 4800; // ← ログイン中のユーザーが「えご」などと想定
  
  export const currentQuest = {
    from: '久山町',
    to: '宗像市',
    progress: 38, // % で表現（歩数 or クエスト進行率）
  };
  
  export const presentRewards = [
    {
      name: 'フォレストアドベンチャー・久山 入場料ペアチケット',
      location: '久山町',
      description: '2名様分の入場チケット',
    },
    {
      name: '道の駅むなかた旬のお野菜・果物詰合せセット',
      location: '宗像市',
      description: '地元の旬な味覚がたっぷり！',
    },
  ];
  
  export const amaouBoost = {
    active: false,
    remainingTime: 0, // 分数で管理する想定。例: 25なら残り25分
    multiplier: 1.5,
  };
  
  export const questNotifications = [
    { type: 'login', message: '家族みんながログインを達成しました' },
    { type: 'qr', message: 'マチナカクエストでQRコードを取得しました' },
  ];
  
  export const dailyQuests = [
    'ログインボーナス',
    'イベントページを15秒見る',
    'CMを見る',
    'イベント情報を家族に共有する',
  ];
  
  export const familyQuests = [
    '家族みんながログインする',
    '家族みんなで次の街へ到着する',
    'メッセージスタンプを10回押す',
  ];
  
  export const specialQuests = [
    'お気に入り登録したイベントに参加してQRコードを取得する',
    'マチナカクエストでQRコードを3つ取得する',
  ];
  