// ==UserScript==
// @name         三国杀手牌花色排序
// @namespace    sanguosha_sorted-by-suit
// @version      2.1
// @description  可拖拽悬浮窗，点击按花色排序手牌
// @author       FAWEI
// @license      MIT
// @match        https://web.sanguosha.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  // =====================================================
  // 从 Laya 引擎场景树查找节点
  // =====================================================
  function findInScene(target, ...path) {
    if (!target) return null;
    const single = arr => Array.isArray(arr) && arr.length === 1 ? arr[0] : arr;

    function getChildren(obj, name) {
      if (name in obj) return obj[name];
      if (obj._children) {
        const found = obj._children.filter(c =>
          c.name === name || (c.constructor && c.constructor.name === name)
        );
        return found.length ? single(found) : [];
      }
      return [];
    }

    let cur = target;
    for (const name of path) {
      if (!cur || typeof cur !== 'object') return null;
      cur = cur instanceof Array
        ? (cur.length ? cur.flatMap(o => getChildren(o, name)) : [])
        : getChildren(cur, name);
      if (cur instanceof Array) cur = single(cur);
    }
    return cur && (cur instanceof Array ? (cur.length ? single(cur) : null) : cur) || null;
  }

  const GAME_SCENES = [
    "TableGameScene","HeroBattle1v1GameScene","ShenWuZaiShiGameScene",
    "RogueLikeGameScene","RogueLike1v1GameScene","PointRace2V2GameScene",
    "ZhuGongShaGameScene","GuanDuZhiZhanGameScene","ShiDianYanLuoGameScene",
    "HuLaoGuanGameScene","ChallengeMatchFigureGameScene","ChallengeMatch2v2GameScene",
    "GuideFiveFigureGameScene","GuideHappyGameScene","NewBieForceTrainGameScene",
    "NewBieForceGameScene","QMBZGameScene","LZHZGameScene","ShenZhiShiLianGameScene",
    "QianLiDJGameScene","DouDiZhuGameScene","GuideGameScene","New1v1GameScene",
    "TSGameScene","XzcbpGameScene","PaiWeiGameScene","GuoGameScene",
    "ChallengeMatchDouDiZhuGameScene","ChallengeMatchCountryGameScene",
    "OfflineMatch2V2GameScene","DouDiZhu2023GameScene","ObDDZGameScene",
    "ObGamePractice2v2Scene","ObGameScene"
  ];

  function getCardContainer() {
    const stage = window.Laya && window.Laya.stage;
    if (!stage) return null;
    const sceneLayer = findInScene(stage, 'SceneLayer');
    if (!sceneLayer) return null;
    for (const name of GAME_SCENES) {
      const scene = findInScene(sceneLayer, name);
      if (!scene) continue;
      const selfSeat = findInScene(scene, 'SelfSeatUi');
      if (!selfSeat) continue;
      const container = findInScene(selfSeat, 'cardContainer');
      if (container && container.cardUis && container.cardUis.length) return container;
    }
    return null;
  }

  function redrawCards(container) {
    const arr = container.cardUis;
    const len = arr ? arr.length : 0;
    for (let i = 0; i < len; i++) {
      arr[i].ClearDraw(false);
      arr[i].Draw(container);
    }
    container.invalidateLayoutHandCard();
    container.isCardCateGorizeShow = arr && arr.length >= 20;
    container.refreshCardCateGorize();
  }

  function sortBySuit() {
    const container = getCardContainer();
    if (!container) return;
    container.cardUis.sort((a, b) => a.theCard.cardFlower - b.theCard.cardFlower);
    redrawCards(container);
  }

  // =====================================================
  // 可拖拽悬浮球
  // =====================================================
  function createFloatingBall() {
    if (document.getElementById('sgs-suit-sorter')) return;

    const style = document.createElement('style');
    style.textContent = `
      #sgs-suit-sorter {
        position: fixed;
        z-index: 99999;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: rgba(35,32,29,0.88);
        border: 2px solid #5f563f;
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: #f2de9c;
        user-select: none;
        -webkit-user-select: none;
        box-shadow: 0 2px 12px rgba(0,0,0,0.5);
        transition: box-shadow 0.15s, border-color 0.15s, background 0.15s;
        left: calc(100vw - 206px);
        top: calc(100vh - 206px);
      }
      #sgs-suit-sorter:hover {
        border-color: #f2de9c;
        box-shadow: 0 4px 18px rgba(0,0,0,0.7);
        background: rgba(35,32,29,0.95);
      }
      #sgs-suit-sorter.dragging {
        cursor: grabbing;
        border-color: #e94560;
        transition: none;
      }
    `;
    document.head.appendChild(style);

    const ball = document.createElement('div');
    ball.id = 'sgs-suit-sorter';
    ball.title = '按花色排序';
    ball.textContent = '🂠';
    document.body.appendChild(ball);

    // 拖拽状态
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, startLeft, startTop;

    function onStart(e) {
      e.preventDefault();
      isDragging = true;
      hasMoved = false;
      const pt = e.touches ? e.touches[0] : e;
      startX = pt.clientX;
      startY = pt.clientY;
      startLeft = ball.offsetLeft;
      startTop = ball.offsetTop;
      ball.classList.add('dragging');
    }

    function onMove(e) {
      if (!isDragging) return;
      const pt = e.touches ? e.touches[0] : e;
      const dx = pt.clientX - startX;
      const dy = pt.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
      ball.style.left = Math.max(0, Math.min(window.innerWidth - 46, startLeft + dx)) + 'px';
      ball.style.top = Math.max(0, Math.min(window.innerHeight - 46, startTop + dy)) + 'px';
    }

    function onEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      ball.classList.remove('dragging');
      if (!hasMoved) sortBySuit();
    }

    ball.addEventListener('mousedown', onStart);
    ball.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);

    // 窗口大小变化时修正位置
    window.addEventListener('resize', () => {
      const l = ball.offsetLeft;
      const t = ball.offsetTop;
      if (l > window.innerWidth - 46) ball.style.left = (window.innerWidth - 56) + 'px';
      if (t > window.innerHeight - 46) ball.style.top = (window.innerHeight - 56) + 'px';
    });

    console.log('[花色排序] 悬浮球已就绪');
  }

  // =====================================================
  // 初始化
  // =====================================================
  function tryInit() {
    if (window.Laya && window.Laya.stage) {
      createFloatingBall();
      return true;
    }
    return false;
  }

  if (!tryInit()) {
    // 轮询等待 Laya 加载（最长等30秒）
    let tries = 0;
    const timer = setInterval(() => {
      if (tryInit() || ++tries > 60) clearInterval(timer);
    }, 500);
  }

})();
