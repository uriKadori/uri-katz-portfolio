import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../dist/vendor/three.module.js';
import { createCoinTrail } from '../dist/coin-trail.js';

function setup(reduced = false) {
  const elements = new Map();
  globalThis.document = { getElementById(id) {
    if (!elements.has(id)) elements.set(id, { hidden: true, textContent: '', style: {}, classList: { toggle() {} } });
    return elements.get(id);
  }};
  const scene = new THREE.Scene();
  return { trail: createCoinTrail(THREE, scene, 11, 6, { matches: reduced }), elements, scene };
}

test('collects along the travelled route once, including reversals', () => {
  const { trail, elements } = setup();
  trail.update(0, .016, 0);
  assert.equal(elements.get('coin-count').textContent, '0');
  trail.update(3, .016, 1000);
  assert.equal(elements.get('coin-count').textContent, '2');
  trail.update(0, .016, 2000);
  trail.update(6, .016, 3000);
  assert.equal(elements.get('coin-count').textContent, '3');
  trail.update(6, .016, 4000);
  assert.equal(elements.get('coin-count').textContent, '3');
});

test('reduced motion fast travel collects every crossed coin and completes', () => {
  const { trail, elements, scene } = setup(true);
  trail.update(60, .016, 1000);
  assert.equal(elements.get('coin-count').textContent, '30');
  assert.equal(elements.get('coin-fill').style.width, '100%');
  assert.equal(elements.get('coin-replay').hidden, false);
  assert.match(elements.get('coin-message').textContent, /Trail complete/);
  assert.equal(scene.children.some(child => child.visible), false);
});

test('replay returns without awarding coins, then starts a fresh challenge', () => {
  const { trail, elements } = setup();
  trail.update(60, .016, 1000);
  trail.restart();
  trail.update(30, .016, 2000);
  assert.equal(elements.get('coin-count').textContent, '0');
  assert.equal(elements.get('coin-replay').hidden, true);
  trail.update(0, .016, 3000);
  assert.equal(elements.get('coin-count').textContent, '0');
  trail.update(6, .016, 4000);
  assert.equal(elements.get('coin-count').textContent, '3');
});
